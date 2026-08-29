package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.LoomRequestDTO;
import com.weaveflow.weavers_management.dto.WeaverRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class WeavingLoomService {
    @Autowired
    private WeaverRepository weaverRepository;
    @Autowired
    private WeavingLoomRepository weavingLoomRepository;
    public String addLoomForParticularWeaver(LoomRequestDTO reqDto)
    {
        System.out.println(reqDto.getWeaverCode());
        Weaver weaver= weaverRepository.findByWeaverCode(reqDto.getWeaverCode())
                .orElseThrow(()->new RuntimeException("Weaver not found"));



        Long weaverId=weaver.getId();

        boolean hasActiveLoom=weavingLoomRepository.existsByWeaverIdAndLoomStatusIsNot(weaverId, LoomStatus.COMPLETED);
        if(hasActiveLoom)
        {
            throw new RuntimeException("Weaver already has an active loom");
        }
        WeavingLooms loom=new WeavingLooms();
        loom.setWeaverId(weaverId);
        long loomCount= weavingLoomRepository.count();

        loom.setBatchNo("L"+String.format("%03d",loomCount+1));
        loom.setLoomNo(weavingLoomRepository.countByWeaverId(weaverId)+1);
        loom.setRatePerSaree(reqDto.getRatePerSaree());
        loom.setSareeTarget(10);
        loom.setSareeCompleted(0);
        loom.setTotalAmount(reqDto.getRatePerSaree().multiply(new BigDecimal("10")));
        loom.setIssueDate(LocalDate.now());
        loom.setLoomStatus(LoomStatus.OPEN);
        loom.setPaymentStatus(PaymentStatus.PENDING);
        weavingLoomRepository.save(loom);
        String message="Loom assigned successfully!\nWeaver Name: "+weaver.getName()+"\nBatchNo: "+loom.getBatchNo();
        return message;
    }


}
