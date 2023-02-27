
var baseUrl="http://localhost:8080/Backend_war/"


function getRegisterCustomersCount() {
    $.ajax({
        url: baseUrl + "api/v1/customer/count",
        method: "GET",
        success: function (res) {

            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countCust').text("0" + res.data);
                } else {
                    $('#countCust').text(res.data);
                }
            } else {
                $('#countCust').text("00");
            }

        }
    })
}





//================================================Rentals==============================================================

loadAllRentals();
function loadAllRentals() {
    $('#tblCarRentals').empty();
    $.ajax({
        url: baseUrl + "api/v1/CarRent",
        method: "GET",
        success: function (res) {
            for (const carRent of res.data) {
                let row = `<tr><td>${carRent.rentId}</td><td>${carRent.date}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td><td>${carRent.car.registrationNO}</td><td>${carRent.customer.customerId}</td><td>${carRent.driver.licenceNo}</td><td>${carRent.status}</td></tr>`;
                $('#tblCarRentals').append(row);
            }
        }
    })
}

//================================================Payments==============================================================

function loadAllPayments() {
    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "api/v1/payment",
        method: "GET",
        success: function (res) {
            for (const payment of res.data) {
                let row = `<tr><td>${payment.paymentId}</td><td>${payment.date}</td><td>${payment.amount}</td><td>${payment.rental.rentId}</td><td>${payment.customer.customerId}</td></tr>`;
                $('#tblPayments').append(row);
            }
        }
    })
}

$('#btnSearchPayment').click(function () {
    if ($('#pickFromDate').val() != "") {
        if ($('#pickToDate').val() != "") {
            searchPaymentByDate();
        } else {
            alert("Please select to date");
        }
    } else {
        alert("Please select from date");
    }
})

function searchPaymentByDate() {
    let fromDate = $('#pickFromDate').val();
    let toDate = $('#pickToDate').val();

    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "api/v1/payment/" + fromDate + "/" + toDate,
        method: "GET",
        success: function (res) {
            for (const payment of res.data) {
                let row = `<tr><td>${payment.paymentId}</td><td>${payment.date}</td><td>${payment.amount}</td><td>${payment.rental.rentId}</td><td>${payment.customer.customerId}</td></tr>`;
                $('#tblPayments').append(row);
            }
        },
        error: function (ob) {
            loadAllPayments();
            clearPaymentDateFields();
            swal({
                title: "Error!",
                text: "Payments Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}