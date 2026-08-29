package com.weaveflow.weavers_management.Entity;

import com.weaveflow.weavers_management.Enum.SareeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="weaver")
public class Weaver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String weaverCode;
    private String name;
    private String photoPath;
    private String mobileNo;
    private String address;
    private String accountNo;
    private String ifscCode;
    @Enumerated(EnumType.STRING)
    @Column(name="design_type")  //for different column name in db and variable name
    private SareeType sareeType;
    private LocalDate joiningDate ;
    private boolean activeStatus;

}
