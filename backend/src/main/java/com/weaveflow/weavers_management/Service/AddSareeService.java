package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.AddSareeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
@Service
public class AddSareeService {
    @Autowired
    private WeaverRepository weaverRepository;
    @Autowired
    private WeavingLoomRepository weavingLoomRepository;
    public String updateCompletedSarees(AddSareeRequestDTO reqDto)
    {
        Weaver weaver=weaverRepository.findByWeaverCode(reqDto.getWeaverCode())
                .orElseThrow(()->new RuntimeException("Weaver Not Found"));
        long weaverId=weaver.getId();


       WeavingLooms loom= weavingLoomRepository
               .findByWeaverIdAndLoomStatusNot(weaverId,LoomStatus.COMPLETED)
               .orElseThrow(()->new RuntimeException("There is no Active Loom"));

//        if(loom.getLoomStatus()==LoomStatus.COMPLETED)
//        {
//            throw new RuntimeException("There is no Active Looms");
//        }

        int newCompletedSaree= reqDto.getNewCompletedSaree();

        if(newCompletedSaree<=0)
        {
            throw new RuntimeException("Your input(Completed Saree count) must be as positive");
        }

        if(loom.getSareeCompleted()+newCompletedSaree>loom.getSareeTarget())
        {
            throw new RuntimeException("Cannot exit saree target");
        }

        loom.setSareeCompleted(loom.getSareeCompleted()+newCompletedSaree);
        if(loom.getSareeCompleted()==loom.getSareeTarget())
        {
            loom.setLoomStatus(LoomStatus.WAITING_FOR_PAYMENT);
        }
        else {
            loom.setLoomStatus(LoomStatus.IN_PROGRESS);
        }
        weavingLoomRepository.save(loom);
        String message="Updated Successfully!\nTaken Sarees: "+newCompletedSaree+"\nCompleted Sarees: "+loom.getSareeCompleted();
        return message;
    }

}

