package com.weaveflow.weavers_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdvanceRequestDTO {
    private String weaverCode;
    private BigDecimal advanceAmount;
    private int monthlyInterest;
}
