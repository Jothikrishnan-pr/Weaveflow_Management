package com.weaveflow.weavers_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryResponseDTO
{
    private WeaverPersonalDetailsDTO personalDetails;
    private List<LoomHistoryDTO> loomHistory;
    private List<PaymentHistoryDTO> paymentHistory;
    private List<AdvanceHistoryDTO> advanceHistory;

}
