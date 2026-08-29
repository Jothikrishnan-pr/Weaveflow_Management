package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Repository.WeaverRepository;
import com.weaveflow.weavers_management.Service.AdvanceService;
import com.weaveflow.weavers_management.dto.AdvanceRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdvanceController {
    @Autowired
    private AdvanceService advanceService;
    @PostMapping("weaver/add-advance")
    public String makeAdvance(@RequestBody AdvanceRequestDTO requestDTO)
    {
        return advanceService.makeAdvance(requestDTO);
    }



}
