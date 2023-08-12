$(() => {
    // Request the information
    $.ajax({
        url: "/info",
        type:"get",
        dataType: 'json',
        success:function(data){ 
            // Redirect to the login page
            $("input[name='name']").val(data['name']);
            $("input[name='email']").val(data['email']);
            $("input[name='signature']").val(data['signature']);
        }
    });

    $("#fnish_editing").click(function(){
        // Post the data to the server
        const name = $("input[name='name']").val();
        const email = $("input[name='email']").val();
        const signature = $("input[name='signature']").val();

        $.ajax({
            url: "/editing",
            type:"post",
            data: {"name": name, "email": email, "signature": signature},
            dataType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: 'json',
            success:function(data){ 
                // Redirect to the login page
                if(data['status'] == 'success'){
                    window.location.replace("/");
                } else {
                    alert("Failed!");
                }
            }
        });
    });
}
);