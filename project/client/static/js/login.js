function login(){
    // Get username and password
    const username = $("input[name='username']").val();
    const password = $("input[name='password']").val();
    if(username.length == 0 || password.length == 0){
        $("#error_msg").html("username or password is empty");
        return;
    }
    
    // login
    $.ajax({
        url: "/login",
        type:"post",
        data: {"username": username,"password": password},
        dataType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: 'json',
        success:function(data){ 
            // Redirect to the homepage
            if(data['status'] == 'success'){
                window.location.replace("/");
            } else {
                $("#error_msg").html("username or password is incorrect");
            }
        }
    });

}

function register(){
    // Redirect to the registration page
    window.location.href = "/register";
}
