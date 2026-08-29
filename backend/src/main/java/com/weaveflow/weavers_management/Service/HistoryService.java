package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Entity.SalaryPayments;
import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.PaymentRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private WeaverRepository weaverRepo;
    @Autowired
    private AdvanceRepository advanceRepo;
    @Autowired
    private PaymentRepository paymentRepo;
    @Autowired
    private WeavingLoomRepository loomRepo;

    public HistoryResponseDTO getWeaverHistory(String weaverName)
    {
        Weaver weaver=weaverRepo.findByName(weaverName)
                .orElseThrow(()->new RuntimeException("Weaver Not Found"));

        HistoryResponseDTO history=new HistoryResponseDTO();

        WeaverPersonalDetailsDTO personalDetails=new WeaverPersonalDetailsDTO();
        personalDetails.setName(weaver.getName());
        personalDetails.setWeaverCode(weaver.getWeaverCode());
        personalDetails.setAddress(weaver.getAddress());
        personalDetails.setSareeType(weaver.getSareeType());
        personalDetails.setMobileNo(weaver.getMobileNo());
        personalDetails.setActiveStatus(weaver.isActiveStatus());
        personalDetails.setAccountNo(weaver.getAccountNo());
        personalDetails.setIfscCode(weaver.getIfscCode());
        personalDetails.setJoiningDate(weaver.getJoiningDate());

        history.setPersonalDetails(personalDetails);

        List<WeavingLooms> looms=loomRepo.findByWeaverIdOrderByIdDesc(weaver.getId());
        List<LoomHistoryDTO> loomHistoryList=new ArrayList<>();

        for(WeavingLooms loom:looms)
        {
            LoomHistoryDTO loomHistory=new LoomHistoryDTO();
            loomHistory.setBatchNo(loom.getBatchNo());
            loomHistory.setLoomNo(loom.getLoomNo());
            loomHistory.setSareeTarget(loom.getSareeTarget());
            loomHistory.setSareeCompleted(loom.getSareeCompleted());
            loomHistory.setRatePerSaree(loom.getRatePerSaree());
            loomHistory.setLoomStatus(loom.getLoomStatus());
            loomHistory.setPaymentStatus(loom.getPaymentStatus());
            loomHistory.setIssueDate(loom.getIssueDate());
            loomHistory.setCompletedDate(loom.getCompletedDate());

            loomHistoryList.add(loomHistory);
        }
        history.setLoomHistory(loomHistoryList);

        List<SalaryPayments> paymentList=paymentRepo.findByWeaverIdOrderByPaymentDateDesc(weaver.getId());
        List<PaymentHistoryDTO> paymentHistoryList=new ArrayList<>();
        for(SalaryPayments payment: paymentList)
        {
            PaymentHistoryDTO paymentHistory=new PaymentHistoryDTO();
            paymentHistory.setPaymentDate(payment.getPaymentDate());
            paymentHistory.setGrossAmount(payment.getGrossAmount());
            paymentHistory.setPrincipalDeduction(payment.getPrincipalDeduction());
            paymentHistory.setInterestDeduction(payment.getInterestDeduction());
            paymentHistory.setNetAmount(payment.getNetAmount());
            paymentHistory.setPaymentMode(payment.getPaymentMode());

            paymentHistoryList.add(paymentHistory);
        }
        history.setPaymentHistory(paymentHistoryList);

        List<Advance> advanceList = advanceRepo.findByWeaverIdOrderByIdDesc(weaver.getId());
        List<AdvanceHistoryDTO> advanceHistoryList = new ArrayList<>();
        for (Advance advance : advanceList) {
            AdvanceHistoryDTO advanceHistory = new AdvanceHistoryDTO();
            advanceHistory.setSanctionedAmount(advance.getSanctionedAmount());
            advanceHistory.setMonthlyInterestAmount(advance.getMonthlyInterestAmount());
            advanceHistory.setAdvanceOpenDate(advance.getStartDate());
            advanceHistory.setCurrentBalance(advance.getCurrentBalance());
            advanceHistory.setStatus(advance.getStatus());

            advanceHistoryList.add(advanceHistory);

        }
        history.setAdvanceHistory(advanceHistoryList);



        return history;
    }

}
