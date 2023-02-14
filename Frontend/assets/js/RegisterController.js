$('#txtUserName,#txtPassword,#txtName,#txtContact,#txtAddress,#txtEmail,#txtLicene,#txtNIC,#imgNiCFront,#imgNiCBack,#imgLicence').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

generateCustomerId();


$('#cmbType').change(function () {
    var userType = $('#cmbType').find('option:selected').text();
    if (userType === "Admin") {
        $("#txtName").prop('disabled', false);
        $("#txtAddress").prop('disabled', false);
        $("#txtContact").prop('disabled', false);
        $("#txtEmail").prop('disabled', false);
        $("#txtUserName").prop('disabled', false);
        $("#txtPassword").prop('disabled', false);
        $("#txtLicene").prop('disabled', true);
        $("#txtNIC").prop('disabled', true);
        $("#imgNiCFront").prop('disabled', true);
        $("#imgNiCBack").prop('disabled', true);
        $("#imgLicence").prop('disabled', true);
        generateAdminId();
    } else if (userType === "Customer") {
        $("#txtName").prop('disabled', false);
        $("#txtAddress").prop('disabled', false);
        $("#txtContact").prop('disabled', false);
        $("#txtEmail").prop('disabled', false);
        $("#txtUserName").prop('disabled', false);
        $("#txtPassword").prop('disabled', false);
        $("#txtLicene").prop('disabled', false);
        $("#txtNIC").prop('disabled', false);
        $("#imgNiCFront").prop('disabled', false);
        $("#imgNiCBack").prop('disabled', false);
        $("#imgLicence").prop('disabled', false);
        generateCustomerId();
    }else {
        disableAllComponents();
    }
});


function disableAllComponents() {
    $("#txtName").prop('disabled', true);
    $("#txtAddress").prop('disabled', true);
    $("#txtContact").prop('disabled', true);
    $("#txtEmail").prop('disabled', true);
    $("#txtUserName").prop('disabled', true);
    $("#txtPassword").prop('disabled', true);
    $("#txtLicene").prop('disabled', true);
    $("#txtNIC").prop('disabled', true);
    $("#imgNiCFront").prop('disabled', true);
    $("#imgNiCBack").prop('disabled', true);
    $("#imgLicence").prop('disabled', true);
    $('#txtUserID').val("");
}

// get customer and admin ids
function generateAdminId() {
    $.ajax({
    });
}

function generateCustomerId() {
    $.ajax({

    })
}

//add customer and admin ids






// Add regs
let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regEmail = /^[a-z0-9]{3,}(@)[a-z]{3,}(.)[a-z]{2,3}$/;
let regDrivingLicenceNo = /^(B)[0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;



//signUp validation
$('#txtName,#txtAddress,#txtContact,#txtNIC,#txtLicene,#txtEmail,#txtUserName,#txtPassword').on('keyup', function (event) {
    if (event.key == "Enter") {
        checkIfSignUpUserFormValid();
    }
});

function checkIfSignUpUserFormValid() {
    var name = $('#txtName').val();
    if (regName.test(name)) {
        $('#txtContact').focus();
        var contactNo = $('#txtContact').val();
        if (regContactNo.test(contactNo)) {
            $('#txtAddress').focus();
            var address = $('#txtAddress').val();
            if (regAddress.test(address)) {
                $('#txtEmail').focus();
                var email = $('#txtEmail').val();
                if (regEmail.test(email)) {
                    let usertype = $("#cmbType").find('option:selected').text();
                    if (usertype === "Customer") {
                        $('#txtLicene').focus();
                        var drivingLicence = $('#txtLicene').val();
                        if (regDrivingLicenceNo.test(drivingLicence)) {
                            $('#txtNIC').focus();
                            var nicNo = $('#txtNIC').val();
                            if (regNicNo.test(nicNo)) {
                                $('#txtUserName').focus();
                                var username = $('#txtUserName').val();
                                if (regLoginUsername.test(username)) {
                                    $('#txtPassword').focus();
                                    var password = $('#txtPassword').val();
                                    if (regLoginPassword.test(password)) {
                                        if ($('#imgNiCFront').val() != "" && $('#imgNiCBack').val() != "" && $('#imgLicence').val() != "") {
                                            let res = confirm("Do you want to add this customer?");
                                            if (res) {
                                                addCustomer();
                                            }
                                        } else {
                                            alert("Please fill all fields of customer...")
                                        }
                                    } else {
                                        $('#txtPassword').focus();
                                    }
                                } else {
                                    $('#txtUserName').focus();
                                }
                            } else {
                                $('#txtNIC').focus();
                            }
                        } else {
                            $('#txtLicene').focus();
                        }
                    } else if (usertype === "Admin") {
                        $('#txtUserName').focus();
                        var username = $('#txtUserName').val();
                        if (regLoginUsername.test(username)) {
                            $('#txtPassword').focus();
                            var password = $('#txtPassword').val();
                            if (regLoginPassword.test(password)) {
                                let res = confirm("Do you want to add this admin?");
                                if (res) {
                                    addAdmin();
                                }
                            } else {
                                $('#txtPassword').focus();
                            }
                        } else {
                            $('#txtUserName').focus();
                        }

                    }
                } else {
                    $('#txtEmail').focus();
                }
            } else {
                $('#txtAddress').focus();
            }
        } else {
            $('#txtContact').focus();
        }
    } else {
        $('#txtName').focus();
    }
}

//validation


$('#txtName').on('keyup', function () {
    checkInputName();
})

function checkInputName() {
    var name = $('#txtName').val();
    if (regName.test(name)) {
        $("#txtName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtName").css('border', '2px solid red');
        return false;
    }
}

$('#txtContact').on('keyup', function () {
    checkInputContactNo();
})

function checkInputContactNo() {
    var contactNo = $('#txtContact').val();
    if (regContactNo.test(contactNo)) {
        $("#txtContact").css('border', '2px solid green');
        return true;
    } else {
        $("#txtContact").css('border', '2px solid red');
        return false;
    }
}

$('#txtAddress').on('keyup', function () {
    checkInputAddress();
})

function checkInputAddress() {
    var address = $('#txtAddress').val();
    if (regAddress.test(address)) {
        $("#txtAddress").css('border', '2px solid green');
        return true;
    } else {
        $("#txtAddress").css('border', '2px solid red');
        return false;
    }
}

$('#txtEmail').on('keyup', function () {
    checkInputEmail();
})

function checkInputEmail() {
    var email = $('#txtEmail').val();
    if (regEmail.test(email)) {
        $("#txtEmail").css('border', '2px solid green');
        return true;
    } else {
        $("#txtEmail").css('border', '2px solid red');
        return false;
    }
}

$('#txtLicene').on('keyup', function () {
    checkInputDrivingLicence();
})

function checkInputDrivingLicence() {
    var drivingLicence = $('#txtLicene').val();
    if (regDrivingLicenceNo.test(drivingLicence)) {
        $("#txtLicene").css('border', '2px solid green');
        return true;
    } else {
        $("#txtLicene").css('border', '2px solid red');
        return false;
    }
}

$('#txtNIC').on('keyup', function () {
    checkInputNIC();
})

function checkInputNIC() {
    var nicNo = $('#txtNIC').val();
    if (regNicNo.test(nicNo)) {
        $("#txtNIC").css('border', '2px solid green');
        return true;
    } else {
        $("#txtNIC").css('border', '2px solid red');
        return false;
    }
}

$('#txtUserName').on('keyup', function () {
    checkInputUserName();
})

function checkInputUserName() {
    var userName = $('#txtUserName').val();
    if (regLoginUsername.test(userName)) {
        $("#txtUserName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtUserName").css('border', '2px solid red');
        return false;
    }
}

$('#txtPassword').on('keyup', function () {
    checkInputPassword();
})

function checkInputPassword() {
    var password = $('#txtPassword').val();
    if (regLoginPassword.test(password)) {
        $("#txtPassword").css('border', '2px solid green');
        return true;
    } else {
        $("#txtPassword").css('border', '2px solid red');
        return false;
    }
}
