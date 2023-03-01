package org.example.controller;

import org.example.dto.LoginDTO;
import org.example.service.LoginService;
import org.example.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/login")
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService service;

    @GetMapping(path = "/getLastLogin",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastLoginId(){
        LoginDTO dto = service.searchLogin(service.getLastLoginId());
        return new ResponseUtil(200,"done",dto);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveLogin(@RequestBody LoginDTO dto){
        service.saveLogData(dto);
        return new ResponseUtil(200,"saved",true);
    }

    @GetMapping(path = "/generateLogId",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateLogId(){
        return new ResponseUtil(200,"ok",service.generateLoginId());
    }
}
