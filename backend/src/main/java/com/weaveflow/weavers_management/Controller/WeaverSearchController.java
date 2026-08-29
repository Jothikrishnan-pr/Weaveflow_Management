package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.WeaverSearchService;
import com.weaveflow.weavers_management.dto.WeaverSearchResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeaverSearchController {
    @Autowired
    private WeaverSearchService search;
    @GetMapping("/search/{weaverName}")
    public WeaverSearchResponseDTO searchWeaver(@PathVariable String weaverName)
    {
        return search.searchWeaver(weaverName);
    }

}
