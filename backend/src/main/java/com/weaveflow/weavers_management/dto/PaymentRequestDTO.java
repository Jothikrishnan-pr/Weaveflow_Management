package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.PaymentMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDTO {
    private String weaverCode;
    private PaymentMode paymentMode;
    private BigDecimal amount;
}

