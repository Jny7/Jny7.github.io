$(() => {
    $("#search_bar").click(function(){
        window.location.href = "/search";
    });
    $("#personal_info").click(function(){
        window.location.href = "/personal";
    });
}
);

function home(){
    $('.home').show();
    $('.aboutUs').hide();
}

function aboutUs(){
    $('.home').hide();
    $('.aboutUs').show();
}
