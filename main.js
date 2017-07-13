
$(function() {

    $("#searchQuery").focus(function(){
        $(this).css("width", "400px");
        $(this).css("transition", "0.3s");

    });


    $("#searchQuery").focusout(function(){
        $(this).css("width", "280px");
        });


});
