package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.PaymentRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.DashboardResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    @Autowired
    private WeaverRepository weaverRepo;
    @Autowired
    private WeavingLoomRepository loomRepo;
    @Autowired
    private PaymentRepository paymentRepo;
    @Autowired
    private AdvanceRepository advanceRepo;

    public DashboardResponseDTO getDashboardDetails()
    {
        DashboardResponseDTO details=new DashboardResponseDTO();

        details.setTotalWeavers(weaverRepo.count());

        long activeLooms=(loomRepo.countByLoomStatus(LoomStatus.OPEN)+loomRepo.countByLoomStatus(LoomStatus.IN_PROGRESS)+loomRepo.countByLoomStatus(LoomStatus.WAITING_FOR_PAYMENT));

        details.setActiveLooms(activeLooms);

        details.setCompletedLooms(loomRepo.countByLoomStatus(LoomStatus.COMPLETED));
        details.setPendingPayments(loomRepo.countByPaymentStatus(PaymentStatus.PENDING)+loomRepo.countByPaymentStatus(PaymentStatus.PARTIAL));
        details.setTotalAdvanceBalance(advanceRepo.getTotalAdvanceBalance());
        details.setTodayPayments(paymentRepo.getTodayPayments());
        details.setWaitingForPayments(loomRepo.countByLoomStatus(LoomStatus.WAITING_FOR_PAYMENT));
        return details;
    }


}
