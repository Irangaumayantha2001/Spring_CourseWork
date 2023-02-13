function loginUser(){
    var username=$('#userName').val();
    var password=$('#password').val();
    var userType = $('#cmbType').find('option:selected').text();

    console.log(userType);
}