package com.weaveflow.weavers_management.Repository;

import com.weaveflow.weavers_management.Entity.WeavingLooms;
import com.weaveflow.weavers_management.Enum.LoomStatus;
import com.weaveflow.weavers_management.Enum.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface WeavingLoomRepository extends JpaRepository<WeavingLooms, Long> {
   int countByWeaverId(Long weaverId);

   boolean existsByWeaverIdAndLoomStatusIsNot(Long weaverId, LoomStatus status);

   Optional<WeavingLooms> findByWeaverIdAndPaymentStatusNot(Long weaverId, PaymentStatus paymentStatus);

   Optional<WeavingLooms> findTopByWeaverIdOrderByIdDesc(Long weaverId);

   List<WeavingLooms> findByWeaverId(Long weaverId);

   Optional<WeavingLooms> findByWeaverIdAndLoomStatusNot(Long weaverId, LoomStatus loomStatus);

   List<WeavingLooms> findByWeaverIdOrderByIdDesc(Long weaverId);

   int countByLoomStatus(LoomStatus loomStatus);

   int countByPaymentStatus(PaymentStatus paymentStatus);
   



}
