package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.dto.WeaverRequestDTO;
import com.weaveflow.weavers_management.dto.WeaverResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class WeaverService
{
    @Autowired
    private WeaverRepository weaver_repo;
    @Autowired
    private AdvanceRepository adv_repo;
    public WeaverResponseDTO addWeaver(WeaverRequestDTO reqDTO)
    {
        Weaver weaver=new Weaver();
        long count=weaver_repo.count()+1;

        weaver.setWeaverCode("WV"+String.format("%03d",count));
        weaver.setName(reqDTO.getName());
        weaver.setMobileNo(reqDTO.getMobileNo());
        weaver.setAddress(reqDTO.getAddress());
        weaver.setAccountNo(reqDTO.getAccountNo());
        weaver.setIfscCode(reqDTO.getIfscCode());
        weaver.setSareeType(reqDTO.getSareeType());
        weaver.setJoiningDate(LocalDate.now());
        weaver.setActiveStatus(true);
        weaver_repo.save(weaver);
        if(reqDTO.getAdvance().compareTo(BigDecimal.ZERO)>0)
        {
            Advance advance=new Advance();
            advance.setWeaverId(weaver.getId());
            advance.setSanctionedAmount(reqDTO.getAdvance());
            advance.setCurrentBalance(reqDTO.getAdvance());
            advance.setPrincipalPerLoom(BigDecimal.valueOf(1000));
            advance.setMonthlyInterestAmount(advance.getSanctionedAmount()
                    .multiply(BigDecimal.valueOf(reqDTO.getMonthlyInterestRate()))
                    .divide(BigDecimal.valueOf(100)));
            advance.setStartDate(LocalDate.now());
            advance.setLastInterestDate(LocalDate.now());
            advance.setStatus(AdvanceStatus.OPEN);
            adv_repo.save(advance);
        }
        WeaverResponseDTO responseDTO=new WeaverResponseDTO();
        responseDTO.setWeaverCode(weaver.getWeaverCode());
        responseDTO.setName(weaver.getName());
        responseDTO.setMessage("Successfully Created a new Weaver!");
        return responseDTO;

    }
}
