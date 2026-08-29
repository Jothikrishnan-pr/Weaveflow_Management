package com.weaveflow.weavers_management.Repository;

import com.weaveflow.weavers_management.Entity.Advance;
import com.weaveflow.weavers_management.Enum.AdvanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdvanceRepository extends JpaRepository<Advance, Long>
{
//    Optional<Advance> findByWeaverId(Long weaverId);
    Optional<Advance> findByWeaverIdAndStatus(Long weaver, AdvanceStatus status);

    List<Advance> findByWeaverIdOrderByIdDesc(Long weaverId);

    @Query("""
            select coalesce(sum(a.currentBalance),0)
                        from Advance a where a.status='OPEN'
                                    """)
    BigDecimal getTotalAdvanceBalance();

}
