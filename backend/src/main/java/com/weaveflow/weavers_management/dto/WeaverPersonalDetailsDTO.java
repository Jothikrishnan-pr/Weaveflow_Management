package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.SareeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeaverPersonalDetailsDTO
{
    private String weaverCode;
    private String name;
    private String mobileNo;
    private String address;
    private SareeType sareeType;
    private LocalDate joiningDate;
    private boolean activeStatus;
    private String accountNo;
    private String ifscCode;

}

