package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.DashboardService;
import com.weaveflow.weavers_management.dto.DashboardResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashBoardController {
    @Autowired
    private DashboardService service;
    @GetMapping("/home")
    public DashboardResponseDTO homePage()
    {
        return service.getDashboardDetails();
    }

}
