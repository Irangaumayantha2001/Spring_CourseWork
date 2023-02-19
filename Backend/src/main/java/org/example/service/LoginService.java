package org.example.service;

import org.example.dto.LoginDTO;

public interface LoginService {
    void saveLogData(LoginDTO dto);

    String generateLoginId();

    String getLastLoginId();

    LoginDTO searchLogin(String loginId);
}
