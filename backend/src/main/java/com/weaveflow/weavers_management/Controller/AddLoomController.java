package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.WeavingLoomService;
import com.weaveflow.weavers_management.dto.LoomRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
public class AddLoomController {
    @Autowired
    private WeavingLoomService loomService;
    @PostMapping("weaver/add_loom")
    public String addNewLoomForParticularWeaver(@RequestBody LoomRequestDTO requestDTO)
    {
        return loomService.addLoomForParticularWeaver(requestDTO);
    }

}
