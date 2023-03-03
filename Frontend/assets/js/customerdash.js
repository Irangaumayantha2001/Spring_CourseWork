let baseUrl = "http://localhost:8080/Backend_war/";

$('#cmbCusRegistrationNo').change(function () {
    let registrationNo = $('#cmbCusRegistrationNo').find('option:selected').text();
    $.ajax({
        url: baseUrl + "api/v1/customer/" + registrationNo,
        method: "GET",
        success: function (res) {
            let cus = res.data;
            console.log(cus);
            setCusDataToFields(cus);
        },
        error: function (ob) {
            clearRentalFields();
        }
    })
});

function setCusDataToFields(cus) {
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();

    $('#txtCustomerName').val(cus.name);
    $('#txtCustomerAddress').val(cus.address);
    $('#txtCustomerContactNo').val(cus.contactNo);
    $('#txtCustomerEmail').val(cus.email);
    $('#txtCustomerNICNo').val(cus.nicNo);
    $('#txtCustomerLicenceNo').val(cus.licenceNo);


    let frontViewPath = cus.frontViewImg;
    console.log(frontViewPath);
    let frontViewImg = frontViewPath.split("")[1];
    let FrontViewImgSrc = "savedImages\\Cars\\" + frontViewImg;

    let backViewPath = cus.backViewImg;
    let backViewImg = backViewPath.split("")[1];
    let backViewImgSrc = "savedImages\\Cars\\" + backViewImg;
    console.log(backViewImgSrc);

    let sideViewPath = cus.sideViewImg;
    let sideViewImg = sideViewPath.split("")[1];
    let sideViewImgSrc = "savedImages\\Cars\\" + sideViewImg;



    let fvImg = `<img src=${FrontViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divNICFrontView').append(fvImg);

    let bvImg = `<img src=${backViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divNICBackView').append(bvImg);

    let svImg = `<img src=${sideViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divLicenceImg').append(svImg);


}

function clearRentalFields() {
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();


    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCarFuel').val("");
    $('#txtCustomerContactNo').val("");
    $('#txtCustomerEmail').val("");
    $('#txtCustomerNICNo').val("");
    $('#txtCustomerLicenceNo').val("");

}
