package com.weaveflow.weavers_management.Controller;

import com.weaveflow.weavers_management.Service.SalaryPaymentService;
import com.weaveflow.weavers_management.dto.PaymentRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SalaryController {
    @Autowired
    SalaryPaymentService paymentService;
    @PostMapping("/weaver/payment")
    public String updateSalary(@RequestBody PaymentRequestDTO reqDto)
    {
        return paymentService.makePayment(reqDto);
    }




}
