package com.kltn.server.DTO.request.entity.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class TeacherRegisterRequest {
  @NotBlank(message = "Please fill your student ID")
  private String uniId;
  @NotBlank(message = "Password is required")
  private String password;
  @NotBlank(message = "Please enter your full name")
  private String name;
  @Email
  @NotBlank(message = "Please enter your email")
  private String email;
  @NotBlank(message = "Please enter your phone number")
  private String phoneNumber;

  public String getUniId() {
    return uniId;
  }

  public void setUniId(String uniId) {
    this.uniId = uniId;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}
