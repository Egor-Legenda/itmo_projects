package org.example.demo.dto;

import org.example.demo.utils.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {

    private String username;
    private String password;
    private List<PointDTO> points;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}

