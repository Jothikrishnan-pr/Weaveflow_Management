package com.weaveflow.weavers_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSareeRequestDTO {
    private String weaverCode;
    private int newCompletedSaree;
}
