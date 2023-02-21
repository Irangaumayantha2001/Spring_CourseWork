//=========================================Regex=============================================================

function loadPendingCustomers() {
    $('#tblPendingCustomers').empty();
    $.ajax({
        url: baseUrl + "api/v1/customer/pending",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblPendingCustomers').append(row);
            }
            bindPendingCustomerTblClickEvents();
        }
    })
}

function bindPendingCustomerTblClickEvents() {
    $('#tblPendingCustomers>tr').click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();
        let email = $(this).children().eq(4).text();
        let nic = $(this).children().eq(5).text();
        let licence = $(this).children().eq(6).text();

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContactNo').val(contact);
        $('#txtCustomerEmail').val(email);
        $('#txtCustomerNICNo').val(nic);
        $('#txtCustomerLicenceNo').val(licence);

        searchAndLoadCustomerImgs(id);

    });
}

function searchAndLoadCustomerImgs(id) {
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();

    $.ajax({
        url: baseUrl + "api/v1/customer/" + id,
        method: "GET",
        success: function (res) {
            let customer = res.data;

            let nicFrontPath = customer.nicFrontImg;
            let nicFrontImg = nicFrontPath.split("D:\\GDSE\\2nd sem Final\\Easy-Car-Rent-System\\Front_End\\savedImages\\Customers\\")[1];
            let nicFrontImgSrc = "savedImages/Customers/" + nicFrontImg;
            console.log(nicFrontImgSrc);

            let nicBackPath = customer.nicBackImg;
            let nicBackImg = nicBackPath.split("D:\\GDSE\\2nd sem Final\\Easy-Car-Rent-System\\Front_End\\savedImages\\Customers\\")[1];
            let nicBackImgSrc = "savedImages/Customers/" + nicBackImg;

            let licencePath = customer.licenceImg;
            let licenceImg = licencePath.split("D:\\GDSE\\2nd sem Final\\Easy-Car-Rent-System\\Front_End\\savedImages\\Customers\\")[1];
            let licenceImgSrc = "savedImages/Customers/" + licenceImg;

            let nicfImg = `<img src=${nicFrontImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICFrontView').append(nicfImg);

            let nicbImg = `<img src=${nicBackImgSrc} alt="NIC Back" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICBackView').append(nicbImg);

            let licImg = `<img src=${licenceImgSrc} alt="Licence" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divLicenceImg').append(licImg);
        }
    })
}

$('#btnAcceptCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let id = $('#txtCustomerId').val();
        acceptCustomer(id);
        clearCustomerFields();
    } else {
        /*swal({
            title: "Error",
            text: "Customer Not Selected",
            icon: "error",
            button: "Close",
            timer: 2000
        });*/
    }
});

function acceptCustomer(id) {
    $.ajax({
        url: baseUrl + "api/v1/customer/updateStatus/" + id,
        method: "PUT",
        success: function (res) {
            console.log(res.massage);
            loadPendingCustomers();
            getRegisterCustomersCount();
            loadRegisteredCustomers();
            swal({
                title: "Confirmation!",
                text: "Customer Accepted",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        }
    })
}

function clearCustomerFields() {
    $('#txtCustomerId').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContactNo').val("");
    $('#txtCustomerEmail').val("");
    $('#txtCustomerNICNo').val("");
    $('#txtCustomerLicenceNo').val("");
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();
}

$('#btnClearFields').click(function () {
    clearCustomerFields();
    loadPendingCustomers();
    loadRegisteredCustomers();
});

$('#btnRejectCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let customerId = $('#txtCustomerId').val();
        rejectPendingCustomer(customerId);
    } else {
        /*swal({
            title: "Error",
            text: "Customer Not Selected",
            icon: "error",
            button: "Close",
            timer: 2000
        });*/
    }
});

function rejectPendingCustomer(id) {
    $.ajax({
        url: baseUrl + "api/v1/customer?id=" + id,
        method: "DELETE",
        success: function (res) {
            loadPendingCustomers();
            clearCustomerFields();
            swal({
                title: "Confirmation!",
                text: "Customer rejected",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        }
    })
}

function loadRegisteredCustomers() {
    $('#tblRegisteredCustomers').empty();
    $.ajax({
        url: baseUrl + "api/v1/customer/accepted",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                console.log(customer.status);
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblRegisteredCustomers').append(row);
            }
        }
    })
}

$('#searchCustomer').on('keyup', function (event) {
    checkSearchCustomers();
    if (event.key === "Enter") {
        searchCustomer();
    }
})

function checkSearchCustomers() {
    var customerId = $('#searchCustomer').val();
    if (regCustomerId.test(customerId)) {
        $("#searchCustomer").css('border', '3px solid green');
        return true;
    } else {
        $("#searchCustomer").css('border', '3px solid red');
        return false;
    }
}

function searchCustomer() {
    $('#tblRegisteredCustomers').empty();
    let id = $('#searchCustomer').val();
    $.ajax({
        url: baseUrl + "api/v1/customer/register/" + id,
        method: "GET",
        success: function (res) {
            console.log(res.data);
            for (const customer of res.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblRegisteredCustomers').append(row);
            }
        },
        error: function (ob) {
            loadRegisteredCustomers();
            swal({
                title: "Error",
                text: "Customer Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}

$('#txtLicenceNo').on('keyup', function (event) {
    checkLicenceNumber();
    if (regLicenceNo.test($('#txtLicenceNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverName").focus();
        }
    }
});

function checkLicenceNumber() {
    var licenceNo = $('#txtLicenceNo').val();
    if (regLicenceNo.test(licenceNo)) {
        $("#txtLicenceNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtLicenceNo").css('border', '2px solid red');
        return false;
    }
}