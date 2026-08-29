package com.weaveflow.weavers_management.Entity;

import com.weaveflow.weavers_management.Enum.PaymentMode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="salary_payments")
public class SalaryPayments {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Long batchId;
    private Long weaverId;
    private int paymentSequence;
    private LocalDate paymentDate;
    private BigDecimal grossAmount;
    private BigDecimal interestDeduction;
    private BigDecimal principalDeduction;
    private BigDecimal netAmount;
    private boolean isFinalAmount;
    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

}