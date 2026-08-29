package com.weaveflow.weavers_management.Entity;

import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
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
@Table(name="weaving_looms")
public class WeavingLooms {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String batchNo;
    private int loomNo;
    private Long weaverId;
    private int sareeTarget;
    private int sareeCompleted;
    private BigDecimal ratePerSaree;
    private BigDecimal totalAmount;
    private LocalDate issueDate;
    private LocalDate completedDate;
    @Enumerated(EnumType.STRING)
    private LoomStatus loomStatus;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
}
