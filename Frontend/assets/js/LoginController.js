function loginUser(){
    var username=$('#userName').val();
    var password=$('#password').val();
    var userType = $('#cmbType').find('option:selected').text();

    console.log(userType);


    if (userType === "Admin") {
        searchAdmin(userType, username, password);
    } else if (userType === "Customer"){
        searchCustomer(userType, username, password);
    } else if (userType === "Driver"){
        searchDriver(userType,username,password);
    }

}

function loginSave(userType, username, password) {
    let logId = $('#txtLogId').val();
    console.log(logId);
    $.ajax({
        url: baseUrl + "api/v1/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(
            {
                loginId: logId,
                username: username,
                password: password,
                role: userType
            }
        ),
        success: function (res) {
            console.log("Login data saved");
        }
    })
}
$(function () {
    getNewLoginId();
});
function getNewLoginId() {
    $.ajax({
        url: baseUrl + "api/v1/login/generateLogId",
        method: "GET",
        success: function (res) {
            $('#txtLogId').val(res.data);
        }
    });
}

function searchAdmin(userType, username, password) {
    if (userType === "Admin") {
        $.ajax({
            url: baseUrl1 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                if (res.data === true) {
                    loginSave(userType,username,password);
                    location.replace("AdminDashBoard.html");
                } else {

                    alert(res.massage);
                }
            }
        });
    }
}
function searchDriver(userType, username, password) {
    if (userType === "Driver") {
        $.ajax({
            url: baseUrl2 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                if (res.data === true) {
                    loginSave(userType,username,password);
                    location.replace("DriverPage.html");
                } else {
                    /*swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'User Name or Password Not matching!' + '\n' +
                            ' Please use the Register Button to create a new account',
                    })*/
                    alert(res.massage);
                }
            }
        });
    }
}

$('#btnLogin').click(function () {

    if ($('#userName').val() != "" && $('#password').val() != "") {
        loginUser();
    }
});

$('#userName,#password').on('blur', function () {
    addLoginFormValidation();
});

function addLoginFormValidation() {
    var username = $("#userName").val();
    if (regLoginUsername.test(username)) {
        $("#userName").css('border', '2px solid green');
        var password = $('#password').val();
        if (regLoginPassword.test(password)) {
            $("#password").css('border', '2px solid green');
            return true;
        } else {
            $("#password").css('border', '2px solid red');
            return false;
        }
    } else {
        $("#userName").css('border', '2px solid red');
        return false;
    }
}
