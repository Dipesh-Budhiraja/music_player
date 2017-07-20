
var showme=$('#showMe');
$(function() {

    $("#searchQuery").focus(function(){
        $(this).css("width", "400px");
        $(this).css("transition", "0.3s");

    });

    $("#searchQuery").focusout(function(){
        $(this).css("width", "280px");
        });

    $("nav li").click(function(){
        $("nav li").removeClass("active");
        $(this).addClass("active");
    })

    $("#favoritesNav").click(function(){
        console.log('homeNav');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Favorites <i class="fa fa-heart" aria-hidden="true" style="color: #E91E63;"></i></h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">                    SONGNAME                </div>                <div class="playButton">                    <i class="fa fa-play-circle-o " aria-hidden="true"></i></div><div class="text">Artist:<br>Genre:</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul" aria-hidden="true" style="position: relative; left: 200px;"></i></a></div></div><h3>Song Name</h3></div>')
        // showme.html('')
    })
    $('#uploadNav').click(function(){
        console.log('uploadNav');
        showme.html('<div id="dropBox">        <img src="cloud-upload.png" id="cloud">            <h3>Drag Your mp3 To Upload</h3></div>');
    })
    $('#libraryNav').click(function(){
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Library</h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">                    SONGNAME                </div>                <div class="playButton">                    <i class="fa fa-play-circle-o " aria-hidden="true"></i></div><div class="text">Artist:<br>Genre:</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul" aria-hidden="true" style="position: relative; left: 200px;"></i></a></div></div><h3>Song Name</h3></div>')
    })
});
