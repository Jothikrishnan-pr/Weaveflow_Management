package com.weaveflow.weavers_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponseDTO {
    private long totalWeavers;
    private long activeLooms;
    private long completedLooms;
    private long pendingPayments;
    private BigDecimal totalAdvanceBalance;
    private BigDecimal todayPayments;
    private int waitingForPayments;

}
