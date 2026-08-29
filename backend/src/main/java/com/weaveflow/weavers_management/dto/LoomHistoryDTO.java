package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoomHistoryDTO {
    private String batchNo;
    private Integer loomNo;
    private int sareeTarget;
    private int sareeCompleted;
    private LoomStatus loomStatus;
    private BigDecimal ratePerSaree;
    private LocalDate issueDate;
    private LocalDate completedDate;
    private PaymentStatus paymentStatus;
}
