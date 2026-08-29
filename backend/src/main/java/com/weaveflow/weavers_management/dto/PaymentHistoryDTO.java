package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.PaymentMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistoryDTO {
    private LocalDate paymentDate;
    private BigDecimal grossAmount;
    private BigDecimal principalDeduction;
    private BigDecimal interestDeduction;
    private BigDecimal netAmount;
    private PaymentMode paymentMode;


}
