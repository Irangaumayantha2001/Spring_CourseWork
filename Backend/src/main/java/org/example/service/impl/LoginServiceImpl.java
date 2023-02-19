package org.example.service.impl;

import org.example.dto.LoginDTO;
import org.example.entity.Login;
import org.example.repo.LoginRepo;
import org.example.service.LoginService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    @Autowired
    LoginRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveLogData(LoginDTO dto) {
        if (!repo.existsById(dto.getLoginId())) {
            repo.save(mapper.map(dto, Login.class));
        } else {
            throw new RuntimeException("Login Already Exists");
        }
    }

    @Override
    public String generateLoginId() {
        String lastId = repo.getLastLoginId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "Log-000" + tempId;
            } else if (tempId <= 99) {
                id = "Log-00" + tempId;
            } else if (tempId <= 999) {
                id = "Log-0" + tempId;
            } else if (tempId <= 9999) {
                id = "Log-" + tempId;
            }
        } else {
            id = "Log-0001";
        }
        return id;
    }

    @Override
    public String getLastLoginId() {
        return repo.getLastLoginId();
    }

    @Override
    public LoginDTO searchLogin(String loginId) {
        if (repo.existsById(loginId)) {
            return mapper.map(repo.findById(loginId).get(), LoginDTO.class);
        } else {
            throw new RuntimeException("Login Not Found...");
        }
    }
    }

