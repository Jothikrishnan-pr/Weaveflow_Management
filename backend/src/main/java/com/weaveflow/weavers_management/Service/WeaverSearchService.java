package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Repository.WeavingLoomRepository;
import com.weaveflow.weavers_management.dto.WeaverSearchResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WeaverSearchService {
    @Autowired
    private WeaverRepository weaverRepo;
    @Autowired
    private WeavingLoomRepository loomRepo;
    @Autowired
    private AdvanceRepository advanceRepo;

    public WeaverSearchResponseDTO searchWeaver(String weaverName){
        Weaver weaver=weaverRepo.findByName(weaverName).orElse(null);
        if(weaver==null)
        {
            throw new RuntimeException("Weaver Not Found");
        }

        Long weaverId=weaver.getId();
        WeaverSearchResponseDTO responseDTO=new WeaverSearchResponseDTO();
        responseDTO.setName(weaver.getName());
        responseDTO.setWeaverCode(weaver.getWeaverCode());
        responseDTO.setMobileNo(weaver.getMobileNo());
        responseDTO.setSareeType(weaver.getSareeType());

        responseDTO.setTotalLoomsWeaved(loomRepo.countByWeaverId(weaverId));
        WeavingLooms loom=loomRepo.findTopByWeaverIdOrderByIdDesc(weaverId).orElse(null);
        if(loom!=null)
        {
            responseDTO.setBatchNo(loom.getBatchNo());
            responseDTO.setSareeTarget(loom.getSareeTarget());
            responseDTO.setSareeCompleted(loom.getSareeCompleted());
            responseDTO.setLoomSts(loom.getLoomStatus());
            responseDTO.setPaymentSts(loom.getPaymentStatus());
        }
        Advance advance=advanceRepo.findByWeaverIdAndStatus(weaverId, AdvanceStatus.OPEN).orElse(null);
        if( advance != null) {
            responseDTO.setAdvanceBalance(advance.getCurrentBalance());
        }

        return responseDTO;

    }

}
