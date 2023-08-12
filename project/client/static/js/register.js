$(() => {
    $("#cancel").click(function(){
        window.location.replace("/login");
    });
    $("#done").click(function(){
        // Get username and password
        const username = $("input[name='username']").val();
        const password = $("input[name='password']").val();
        const repassword = $("input[name='repassword']").val();
        if(username.length == 0 || password.length == 0){
            $("#error_msg").html("username or password is empty");
            return;
        }
        if(password != repassword){
            $("#error_msg").html("Entered passwords differ!");
            return;
        }

        // Register
        $.ajax({
            url: "/register",
            type:"post",
            data: {"username": username, "password": password},
            dataType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: 'json',
            success:function(data){ 
                // Redirect to the login page
                if(data['status'] == 'success'){
                    window.location.replace("/login");
                } else {
                    $("#error_msg").html(data['msg']);
                }
            }
        });
    });
});