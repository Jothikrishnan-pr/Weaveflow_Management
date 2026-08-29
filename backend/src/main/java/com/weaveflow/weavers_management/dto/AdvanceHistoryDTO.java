package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdvanceHistoryDTO {
    private BigDecimal sanctionedAmount;
    private BigDecimal currentBalance;
    private BigDecimal monthlyInterestAmount;
    private LocalDate advanceOpenDate;
    private AdvanceStatus status;

}
