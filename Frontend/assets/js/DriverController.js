let baseUrl2 = "http://localhost:8080/Back_End_war/";

let regDrivingLicenceNo = /^(B)[0-9]{7}$/;
let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;

$('#txtLicenceNo').on('keyup', function (event) {
    checkDriverLiceneNo();
    if (regDrivingLicenceNo.test($('#txtLicenceNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverName").focus();
        }
    }
});

function checkDriverLiceneNo() {
    var name = $('#txtLicenceNo').val();
    if (regDrivingLicenceNo.test(name)) {
        $("#txtLicenceNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtLicenceNo").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverName').on('keyup', function (event) {
    checkDriverName();
    if (regName.test($('#txtDriverName').val())) {
        if (event.key === "Enter") {
            $("#txtDriverAddress").focus();
        }
    }
});

function checkDriverName() {
    var name = $('#txtDriverName').val();
    if (regName.test(name)) {
        $("#txtDriverName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverName").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverAddress').on('keyup', function (event) {
    checkDriverAddress();
    if (regAddress.test($('#txtDriverAddress').val())) {
        if (event.key === "Enter") {
            $("#txtDriverContactNo").focus();
        }
    }
});

function checkDriverAddress() {
    var address = $('#txtDriverAddress').val();
    if (regAddress.test(address)) {
        $("#txtDriverAddress").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverAddress").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverContactNo').on('keyup', function (event) {
    checkDriverContact();
    if (regAddress.test($('#txtDriverContactNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverNICNo").focus();
        }
    }
});

function checkDriverContact() {
    var contact = $('#txtDriverContactNo').val();
    if (regContactNo.test(contact)) {
        $("#txtDriverContactNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverContactNo").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverNICNo').on('keyup', function (event) {
    checkDriverNIC();
    if (regNicNo.test($('#txtDriverNICNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverUserName").focus();
        }
    }
});

function checkDriverNIC() {
    var nic = $('#txtDriverNICNo').val();
    if (regNicNo.test(nic)) {
        $("#txtDriverNICNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverNICNo").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverUserName').on('keyup', function (event) {
    checkDriverUsername();
    if (regLoginUsername.test($('#txtDriverUserName').val())) {
        if (event.key === "Enter") {
            $("#txtDriverPassword").focus();
        }
    }
});

function checkDriverUsername() {
    var username = $('#txtDriverUserName').val();
    if (regLoginUsername.test(username)) {
        $("#txtDriverUserName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverUserName").css('border', '2px solid red');
        return false;
    }
}

$('#txtDriverPassword').on('keyup', function (event) {
    checkDriverPassword();
});

function checkDriverPassword() {
    var password = $('#txtDriverPassword').val();
    if (regLoginPassword.test(password)) {
        $("#txtDriverPassword").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverPassword").css('border', '2px solid red');
        return false;
    }
}

function clearDriverFields() {
    $('#txtLicenceNo').val("");
    $('#txtDriverName').val("");
    $('#txtDriverAddress').val("");
    $('#txtDriverContactNo').val("");
    $('#txtDriverNICNo').val("");
    $('#txtDriverUserName').val("");
    $('#txtDriverPassword').val("");
    $('#searchDriver').val("");

    $('#txtLicenceNo').css('border', '1px solid #ced4da');
    $('#txtDriverName').css('border', '1px solid #ced4da');
    $('#txtDriverAddress').css('border', '1px solid #ced4da');
    $('#txtDriverContactNo').css('border', '1px solid #ced4da');
    $('#txtDriverNICNo').css('border', '1px solid #ced4da');
    $('#txtDriverUserName').css('border', '1px solid #ced4da');
    $('#txtDriverPassword').css('border', '1px solid #ced4da');
    $('#searchDriver').css('border', '1px solid #ced4da');

    $('#btnUpdateDriver').prop('disabled', true);
    $('#btnDeleteDriver').prop('disabled', true);
    $('#btnSaveDriver').prop('disabled', false);

    loadAvailableDrivers();
    loadNonAvailableDrivers();
    loadAllDrivers();
}

$('#btnSaveDriver').click(function () {
   saveDriver();
});

loadAllDrivers();
loadAvailableDrivers();
loadNonAvailableDrivers();

function saveDriver() {
    let id = $('#txtLicenceNo').val();
    let name = $('#txtDriverName').val();
    let address = $('#txtDriverAddress').val();
    let contactNo = $('#txtDriverContactNo').val();

    let nicNo = $('#txtDriverNICNo').val();
    let username = $('#txtDriverUserName').val();
    let password = $('#txtDriverPassword').val();

    var driver = {
        licenceNo: id,
        name: name,
        address: address,
        contactNo: contactNo,
        nicNo: nicNo,
        username: username,
        password: password
    }

    console.log(driver);

    $.ajax({
        url: baseUrl2 + "api/v1/driver",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (resp) {
            if (resp.data === true) {
                loadAllDrivers();
                alert(resp.massage);
                console.log("Success");
            }
        },
        error: function (ob) {
            alert(ob.massage);
            console.log("Error");
        }
    })
}

function loadAvailableDrivers() {
    $('#tblAvailableDrivers').empty();
    $.ajax({
        url: baseUrl2 + "api/v1/driver/getAllAvailableDrivers",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblAvailableDrivers').append(row);
            }
        }
    })
}

function loadNonAvailableDrivers() {
    $('#tblNonAvailableDrivers').empty();
    $.ajax({
        url: baseUrl2 + "api/v1/driver/getAllNonAvailableDrivers",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblNonAvailableDrivers').append(row);
            }
        }
    })
}

function loadAllDrivers() {
    $('#tblRegisteredDrivers').empty();
    $.ajax({
        url: baseUrl2 + "api/v1/driver",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblRegisteredDrivers').append(row);
            }
            bindRegisterDriversClickEvents();
        }
    })
}

function bindRegisterDriversClickEvents() {
    $('#tblRegisteredDrivers>tr').click(function () {
        let licenceNo = $(this).children().eq(0).text();
        findDriver(licenceNo);
        $('#btnUpdateDriver').prop('disabled', false);
        $('#btnDeleteDriver').prop('disabled', false);
        $('#btnSaveDriver').prop('disabled', true);
    })
}

function findDriver(licenceNo) {
    $.ajax({
        url: baseUrl2 + "api/v1/driver/" + licenceNo,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            $('#txtLicenceNo').val(driver.licenceNo);
            $('#txtDriverName').val(driver.name);
            $('#txtDriverAddress').val(driver.address);
            $('#txtDriverContactNo').val(driver.contactNo);
            $('#txtDriverNICNo').val(driver.nicNo);
            $('#txtDriverUserName').val(driver.username);
            $('#txtDriverPassword').val(driver.password);
        }
    })
}

$('#btnClearDriver').click(function () {
    clearDriverFields();
})

$('#btnDeleteDriver').click(function () {
    if ($('#txtLicenceNo').val() != "") {
        let res = "Do you want to delete this driver?";
        if (res) {
            deleteDriver();
            clearDriverFields();
        }
    }
})

function deleteDriver() {
    let licenceNo = $('#txtLicenceNo').val();
    $.ajax({
        url: baseUrl2 + "api/v1/driver?licenceNo=" + licenceNo,
        method: "DELETE",
        success: function (res) {
            loadAvailableDrivers();
            loadNonAvailableDrivers();
            loadAllDrivers();

            alert(res.message());
        },
        error: function (ob) {
            alert(ob.message());
        }
    })
}

$('#btnUpdateDriver').click(function () {
    if ($('#txtLicenceNo').val() != "") {
        if ($('#txtDriverName').val() != "") {
            if ($('#txtDriverAddress').val() != "") {
                if ($('#txtDriverContactNo').val() != "") {
                    if ($('#txtDriverNICNo').val() != "") {
                        if ($('#txtDriverUserName').val() != "") {
                            if ($('#txtDriverPassword').val() != "") {
                                let res = confirm("Do you want to update this driver?");
                                if (res) {
                                    updateDriver();
                                    clearDriverFields();
                                }
                            } else {
                                alert("Please enter password");
                            }
                        } else {
                            alert("Please enter username");
                        }
                    } else {
                        alert("Please enter your NIC No");
                    }
                } else {
                    alert("Please enter your contact no");
                }
            } else {
                alert("Please enter your address");
            }
        } else {
            alert("Please enter your name");
        }
    } else {
        alert("Please enter licence No");
    }
})

function updateDriver() {
    var licenceNo = $('#txtLicenceNo').val();
    var name = $('#txtDriverName').val();
    var address = $('#txtDriverAddress').val();
    var contact = $('#txtDriverContactNo').val();
    var nic = $('#txtDriverNICNo').val();
    var username = $('#txtDriverUserName').val();
    var password = $('#txtDriverPassword').val();

    var driver = {
        licenceNo: licenceNo,
        name: name,
        address: address,
        contactNo: contact,
        nicNo: nic,
        username: username,
        password: password
    }

    $.ajax({
        url: baseUrl2 + "api/v1/driver",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (res) {
            loadAllDrivers();
            loadAvailableDrivers();
            loadNonAvailableDrivers();

            alert(res.message());
        },
        error: function (ob) {
            alert(ob.message());
        }
    })
}

$('#searchDriver').on('keyup', function (event) {
    checkSearchDriver();
    if (event.key === "Enter") {
        searchDriverDetails();
    }
})

function checkSearchDriver() {
    var search = $('#searchDriver').val();
    if (regDrivingLicenceNo.test(search)) {
        $("#searchDriver").css('border', '2px solid green');
        return true;
    } else {
        $("#searchDriver").css('border', '2px solid red');
        return false;
    }
}

function searchDriverDetails() {
    let licenceNo = $('#searchDriver').val();
    $.ajax({
        url: baseUrl2 + "api/v1/driver/" + licenceNo,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            $('#tblRegisteredDrivers').empty();
            let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
            $('#tblRegisteredDrivers').append(row);
        },
        error: function (ob) {
            loadAllDrivers();

            alert(ob.message())
        }
    })
}

$('#btnSearchDriver').click(function () {
    if ($('#searchDriver').val() != "") {
        searchDriverDetails();
    }
});