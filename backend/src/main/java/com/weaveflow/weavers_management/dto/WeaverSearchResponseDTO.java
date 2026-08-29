package com.weaveflow.weavers_management.dto;

import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import com.weaveflow.weavers_management.Enum.SareeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeaverSearchResponseDTO {
    private String name;
    private String weaverCode;
    private String mobileNo;
    private int totalLoomsWeaved;
    private SareeType sareeType;
    private String batchNo;
    private int sareeCompleted;
    private int sareeTarget;
    private BigDecimal advanceBalance;
    private LoomStatus loomSts;
    private PaymentStatus paymentSts;
}

