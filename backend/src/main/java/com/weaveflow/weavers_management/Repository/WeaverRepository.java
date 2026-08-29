package com.weaveflow.weavers_management.Repository;

import com.weaveflow.weavers_management.Entity.Weaver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeaverRepository extends JpaRepository<Weaver, Long> {
    Optional<Weaver> findByWeaverCode(String weaverCode);

    // for name search

    List<Weaver> findByNameContainingIgnoreCase(String name);

    Optional<Weaver> findByName(String name);

}
