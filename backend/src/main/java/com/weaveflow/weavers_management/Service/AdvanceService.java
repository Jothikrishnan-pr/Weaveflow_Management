package com.weaveflow.weavers_management.Service;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Entity.Weaver;
import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import com.weaveflow.weavers_management.Repository.AdvanceRepository;
import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.dto.AdvanceRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class AdvanceService {
    @Autowired
    private WeaverRepository weaverRepo;
    @Autowired
    private AdvanceRepository advanceRepo;
    public String makeAdvance(AdvanceRequestDTO reqDTO)
    {
        Weaver weaver=weaverRepo.findByWeaverCode(reqDTO.getWeaverCode())
                .orElseThrow(()->new RuntimeException("Weaver not found"));

        if(reqDTO.getAdvanceAmount().compareTo(BigDecimal.ZERO)<=0)
        {

            throw new RuntimeException("Advance amount must be positive");
        }
        Advance existingAdvance =
                advanceRepo.findByWeaverIdAndStatus(
                        weaver.getId(),
                        AdvanceStatus.OPEN
                ).orElse(null);

        if(existingAdvance != null)
        {
            throw new RuntimeException(
                    "Weaver already has an active advance"
            );
        }

            Advance advance=new Advance();
            advance.setWeaverId(weaver.getId());
            advance.setSanctionedAmount(reqDTO.getAdvanceAmount());
            advance.setCurrentBalance(reqDTO.getAdvanceAmount());
            advance.setMonthlyInterestAmount(advance.getSanctionedAmount()
                    .multiply(BigDecimal.valueOf(reqDTO.getMonthlyInterest()))
                    .divide(BigDecimal.valueOf(100)));
            advance.setStartDate(LocalDate.now());
            advance.setLastInterestDate(LocalDate.now());
            advance.setStatus(AdvanceStatus.OPEN);
            advanceRepo.save(advance);
            return "Advance added successfully for weaver " + weaver.getName();


    }
}
