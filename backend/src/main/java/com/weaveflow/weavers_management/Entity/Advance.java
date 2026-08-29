package com.weaveflow.weavers_management.Entity;

import com.weaveflow.weavers_management.Enum.AdvanceStatus;
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
@Table(name="advances")
public class Advance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long weaverId;
    private BigDecimal sanctionedAmount;
    private BigDecimal currentBalance;
    @Column(name = "monthly_interest")
    private BigDecimal monthlyInterestAmount;
    private BigDecimal principalPerLoom ;
    private LocalDate startDate;
    private LocalDate lastInterestDate;
    @Enumerated(EnumType.STRING)
    private AdvanceStatus status;
}