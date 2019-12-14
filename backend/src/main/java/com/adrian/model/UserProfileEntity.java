package com.adrian.model;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "user-profile")
public class UserProfileEntity {


    @Id
    @Column(name="id_user")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;
    private String password;

    private String email;

    private String profileName;
    public UserProfileEntity(String profileName, String email, String password) {
        this.password = password;
        this.email = email;
        this.profileName = profileName;
    }

}
