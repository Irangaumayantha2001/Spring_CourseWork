


var baseUrl1="http://localhost:8080/Backend_war/api/v1/maintenance"
var baseUrl2="http://localhost:8080/Backend_war/api/v1/car"
var baseUrl="http://localhost:8080/Backend_war/"



$('#btnAddToMaintenance').click(function () {
    $('#cmbCarRegistrationNo').change(function () {
        let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
        $.ajax({
            url: baseUrl + "api/v1/car/" + registrationNo,
            method: "GET",
            success: function (res) {
                let car = res.data;
                console.log(car);
                setCarDataToFields(car);
            },
            error: function (ob) {
            }
        })
    });
});

function setCarDataToFields() {
    $('#txtCarBrand').val(car.brand);
    $('#txtSearchColor').val(car.color);
    $('#txtCarFuel').val(car.fuelType);
    $('#txtSearchTransmission').val(car.fuelType);
    $('#txtSearchStatus').val(car.status)
}






generateMaintainsId();
genarateRegistrationNo();

('#btnAddToMaintenance').click(function () {
    addMaintain();
    function addMaintain() {
        let maintainNo = $('#txtMaintenanceId').val();
        let Regtype = $('#cmbRegistrationNo').find('option:selected').text();
        let date = $('#txtToday').val();
        let cost = $('#txtCost').val();
        let detail = $('#txtMaintenanceDetails').val();



        var maintain = {
            maintenanceId: maintainNo,
            date: date,
            cost: cost,
            details:detail

        }
        console.log(maintain);

        $.ajax({
            url: baseUrl + "api/v1/car",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(maintain),
            success: function (res) {
                loadAllMaintains()
                addMaintain()
                alert(res.massage);
            },
            error: function (ob) {
                alert(ob.message("Already Exists.."));
            }
        })
    }

});






function generateMaintainsId() {

    $.ajax({
        url: baseUrl1 + "/generateMaintenanceId",
        method: "GET",
        success: function (res) {
            $('#txtMaintenanceId').val(res.data);
        }
    });
}


function genarateRegistrationNo() {
    $('#cmbRegistrationNo').change(function () {
        let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
        $.ajax({
            url: baseUrl + "api/v1/car/" + registrationNo,
            method: "GET",
            success: function (res) {
                let car = res.data;
                console.log(car);
            },
            error: function (ob) {
            }
        })
    });
}



function loadAllMaintains() {
    $('#tblAllMaintenances').empty();
    $.ajax({
        url: baseUrl2 + "api/v1/maintenance",
        method: "GET",
        success: function (res) {
            for (const maintains of res.data) {
                let row = `<tr><td>${maintains.maintenanceId}</td><td>${maintains.date}</td><td>${maintains.cost}</td><td>${maintains.details}</td><td>`;
                $('#tblAllMaintenances').append(row);
            }
        }
    })
}



