package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.SareeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class WeaverRequestDTO {

    private String name;
    @NotBlank
    @Pattern(regexp="[0-9]{10}")
    private String mobileNo;
    private String address;
    private String accountNo;
    private String ifscCode;
    private SareeType sareeType;
    private BigDecimal advance;
    private int monthlyInterestRate;
    private String photoPath;

}
