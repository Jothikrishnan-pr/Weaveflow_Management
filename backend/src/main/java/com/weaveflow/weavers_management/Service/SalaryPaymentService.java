package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Entity.SalaryPayments;
import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.PaymentRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.PaymentRequestDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class SalaryPaymentService {
    @Autowired
    private PaymentRepository paymentRepo;
    @Autowired
    private WeaverRepository weaverRepository;
    @Autowired
    private WeavingLoomRepository loomRepo;
    @Autowired
    private AdvanceRepository advanceRepo;
    @Transactional
    public String makePayment(PaymentRequestDTO reqDto)
    {

        //Weaver Validation
        Weaver weaver=weaverRepository.findByWeaverCode(reqDto.getWeaverCode())
                .orElseThrow(()->new RuntimeException("Weaver Not Found"));

        //Active Loom Validation;
        WeavingLooms loom=loomRepo.findByWeaverIdAndPaymentStatusNot(weaver.getId(), PaymentStatus.PAID)
                .orElseThrow(()->new RuntimeException("Already paid or There is no Active Loom"));

        BigDecimal earnedSalary=loom.getRatePerSaree().multiply(new BigDecimal(loom.getSareeCompleted()));


        //Already paid amount
        BigDecimal paidAmount=paymentRepo.getTotalPaidAmount(loom.getId());

        if(paidAmount==null)
        {
            paidAmount=BigDecimal.ZERO;
        }
        BigDecimal remainingAmount=earnedSalary.subtract(paidAmount);
        BigDecimal fullSalary=loom.getRatePerSaree().multiply(new BigDecimal(loom.getSareeTarget()));

        BigDecimal requestedAmount=reqDto.getAmount();
        if(requestedAmount.compareTo(BigDecimal.ZERO)<=0)
        {
            throw new RuntimeException("Payment amount must be greater than zero");
        }

        if(requestedAmount.compareTo(remainingAmount)>0)
        {
            throw new RuntimeException("Payment exceeds remaining payable amount");
        }

        BigDecimal principalDeduction=BigDecimal.ZERO;
        BigDecimal interestDeduction=BigDecimal.ZERO;
        boolean isFinalPayment=false;

        boolean loomCompleted=loom.getSareeCompleted()==loom.getSareeTarget();
        boolean fullRemainingAmt=requestedAmount.compareTo(remainingAmount)==0;


        if(loomCompleted && fullRemainingAmt)
        {
            isFinalPayment = true;
            Advance advance = advanceRepo.findByWeaverIdAndStatus(weaver.getId(), AdvanceStatus.OPEN)
                    .orElse(null);
            if (advance != null) {
                //principal deduction
                principalDeduction = advance.getPrincipalPerLoom();

                //Monthly interest check
                long months =
                        ChronoUnit.MONTHS.between(
                                advance.getLastInterestDate(),
                                LocalDate.now()
                        );

                if(months > 0)
                {
                    interestDeduction =
                            advance.getMonthlyInterestAmount()
                                    .multiply(BigDecimal.valueOf(months));

                    advance.setLastInterestDate(LocalDate.now());
                }

                BigDecimal totalDeduction =
                        principalDeduction.add(interestDeduction);

                if(totalDeduction.compareTo(requestedAmount) > 0)
                {
                    principalDeduction = requestedAmount;
                    interestDeduction = BigDecimal.ZERO;
                }
                //Reduce advance balance

                BigDecimal newBalance = advance.getCurrentBalance().subtract(principalDeduction);

                if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
                    newBalance = BigDecimal.ZERO;
                }
                advance.setCurrentBalance(newBalance);
                if(newBalance.compareTo(BigDecimal.ZERO)==0)
                {
                    advance.setStatus(AdvanceStatus.CLOSED);
                }
                advanceRepo.save(advance);
            }
        }

        //Net Salary

        BigDecimal netAmount=requestedAmount.subtract(principalDeduction).subtract(interestDeduction);

        //check payment status
        BigDecimal totalPaidAfterPayment =
                paidAmount.add(requestedAmount);


        if(totalPaidAfterPayment.compareTo(fullSalary) < 0)
        {
            loom.setPaymentStatus(PaymentStatus.PARTIAL);
        }
        else
        {
            loom.setPaymentStatus(PaymentStatus.PAID);
        }

        // Loom completion update
        if (loomCompleted &&totalPaidAfterPayment.compareTo(fullSalary)==0)
        {
            loom.setLoomStatus(LoomStatus.COMPLETED);
            loom.setCompletedDate(LocalDate.now());
        }
        loomRepo.save(loom);



        //Update Payment Sequence
        Integer paymentSequence=paymentRepo.countByBatchId(loom.getId())+1;

        //Save Payment
        SalaryPayments payment=new SalaryPayments();
        payment.setBatchId(loom.getId());
        payment.setWeaverId(weaver.getId());
        payment.setPaymentSequence(paymentSequence);
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMode(reqDto.getPaymentMode());
        payment.setGrossAmount(requestedAmount);
        payment.setPrincipalDeduction(principalDeduction);
        payment.setInterestDeduction(interestDeduction);
        payment.setNetAmount(netAmount);
        payment.setFinalAmount(isFinalPayment);
        payment.setPaymentMode(reqDto.getPaymentMode());

        paymentRepo.save(payment);

        if(isFinalPayment)
        {
            return "Final settlement completed successfully for "
                    + weaver.getName();
        }

        return "Payment of Rs."
                + netAmount
                + " paid successfully to "
                + weaver.getName();

    }
}
