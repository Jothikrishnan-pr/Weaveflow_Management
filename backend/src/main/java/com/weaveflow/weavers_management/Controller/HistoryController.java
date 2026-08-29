package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.HistoryService;
import com.weaveflow.weavers_management.dto.HistoryResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistoryController {
    @Autowired
    private HistoryService service;

    @GetMapping("/history/{weaverName}")
    public HistoryResponseDTO getWeaverHistory(@PathVariable String weaverName)
    {
        return service.getWeaverHistory(weaverName);
    }
}
