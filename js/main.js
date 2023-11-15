
/*
*	For single page application, Get page on link click and load in content-area.
*/
var loader = '<img src="img/hexagon.gif" alt="loading page" style="margin-left: 27%;max-width: 50%;">'
function getPageByAjax(page){
    $('.footer').hide();
	$('.content-area').html(loader);
	$.ajax({
        method: "GET",
        dataType: "text/html",
        url: page,
        success: function (response, textStatus, xhr) {
            // Check the HTTP status code
            if (xhr.status === 200) {
                // Success (200 OK)
                $('.content-area').html(response).hide().fadeIn(2000);
                $('.footer').fadeIn(2000);
            } else if (xhr.status === 304) {
                // Not Modified (304)
                // Handle this case if needed
                $('.content-area').html(response).hide().fadeIn(2000);
                $('.footer').fadeIn(2000);
            }
        },
        error: function (xhr) {
            // Check the HTTP status code
            if (xhr.status === 404) {
                // Not Found (404)
                $('.content-area').html(`<div style="text-align: center;"><img src="img/404.png" alt="Not Found" style="max-width: 50%; height: auto; display: inline-block; margin-top: 50vh; transform: translateY(-50%);"></div>`).hide().fadeIn(2000);
            } else {
                // Handle other error cases
                $('.content-area').html(xhr.responseText).hide().fadeIn(2000);
                $('.footer').fadeIn(2000);
            }
        } 
    });
    
}

$(document).ready(function(){

    $('#page-links li a').on('click',function(e){
        //$('#page-links li a').css('color','#fff');
        var page = $(this).attr('page');
        localStorage.setItem('page',page);
        //$(this).css('color','#0175c6');
        getPageByAjax('pages/'+page);
        // if($(window).width() <= 1024){
        //     $('.nav-sidebar-area').toggleClass('open');
        // } 
    });

	if (localStorage.getItem('page') != null) {
        getPageByAjax('pages/'+localStorage.getItem('page'));
        $('#page-links li a').each(function(e){
            if($(this).attr('page') == localStorage.getItem('page')){
               //$(this).css('color','#0175c6'); 
            }
        });
    }

    $('.color-selector span i').on('click',function(){
        var colorToSet = $(this).attr('style').trim();
        colorToSet = colorToSet.split(':')[1].slice(0,-1).trim();
        $('.nav-sidebar-area').css('background',colorToSet);
        $('body > .wrapper').css('background',colorToSet);
        localStorage.setItem('background-color',colorToSet);
        $('.color-selector span').css('border','0');
        $(this).parent().css('border','2px solid #fff');
        localStorage.setItem('selected-color','2px solid #fff');
    });
    if (localStorage.getItem('background-color') != null) {
        $('.nav-sidebar-area').css('background',localStorage.getItem('background-color'));
        $('body > .wrapper').css('background',localStorage.getItem('background-color'));
            ;
        $('.color-selector span i').each(function(e){
            var selectedColor = $(this).attr('style').trim();
            selectedColor = selectedColor.split(':')[1].slice(0,-1).trim();
            if(selectedColor == localStorage.getItem('background-color')){
                $(this).parent().css('border','2px solid #fff');
            }
        });
    }
});

function loadMainPage(){
    localStorage.removeItem('page');
    //window.location.href = window.location.href;
    localStorage.setItem('page','intro.html');
    getPageByAjax('pages/intro.html');
}