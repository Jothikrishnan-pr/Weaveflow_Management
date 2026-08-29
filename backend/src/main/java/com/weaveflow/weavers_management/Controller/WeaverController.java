package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.WeaverService;
import com.weaveflow.weavers_management.dto.WeaverRequestDTO;
import com.weaveflow.weavers_management.dto.WeaverResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeaverController {
    @Autowired
    private WeaverService service;
    @PostMapping("/addWeaver")
    public WeaverResponseDTO addWeaver(@RequestBody WeaverRequestDTO reqDTO) {
        return service.addWeaver(reqDTO);
    }
}
