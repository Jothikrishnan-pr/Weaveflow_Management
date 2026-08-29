package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.AddSareeService;
import com.weaveflow.weavers_management.dto.AddSareeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddSareeController {
    @Autowired
    private AddSareeService sareeService;
    @PostMapping("weaver/add_sarees")
    public String UpdateCompletedSaree(@RequestBody AddSareeRequestDTO reqDto)
    {
        return sareeService.updateCompletedSarees(reqDto);
    }

}
