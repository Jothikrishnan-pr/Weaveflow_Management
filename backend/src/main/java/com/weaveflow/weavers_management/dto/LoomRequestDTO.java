package com.weaveflow.weavers_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoomRequestDTO
{

    private String weaverCode;
    private BigDecimal ratePerSaree;

}
