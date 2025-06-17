$(document).ready(function(){
    $('.menu-link').click(function(e){
        e.preventDefault();
        const url=$(this).attr('href');
        $('#content-area').load(url);
    });
})