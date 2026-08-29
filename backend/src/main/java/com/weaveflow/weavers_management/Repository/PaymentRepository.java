package com.weaveflow.weavers_management.Repository;

import com.weaveflow.weavers_management.Entity.SalaryPayments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
@Repository
public interface PaymentRepository extends JpaRepository<SalaryPayments,Long> {

    @Query("""
            SELECT SUM(p.grossAmount)
            FROM SalaryPayments p
            WHERE p.batchId = :batchId
            """)

//    Optional<Weaver> findByWeaverCode(String weaverCode);


    BigDecimal getTotalPaidAmount(Long batchId);

    int countByBatchId(Long batchId);

    // List<SalaryPayments> findByBatchId(String batchId);
    List<SalaryPayments> findByBatchId(long batchId);

    List<SalaryPayments>  findByWeaverIdOrderByPaymentDateDesc(Long weaverId);

    @Query("""
           select coalesce(sum(p.netAmount),0)
           from SalaryPayments p  
           where p.paymentDate=CURRENT_DATE""")
    BigDecimal getTodayPayments();
}
