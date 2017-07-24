// var player=require('player.js');
var showme=$('#showMe');
var audio=$('#audio');
var aud_src=$('#aud_src');
var queue=[];
var currentlyPlaying=0;
var queueView=$('#queueView');
var currId=0;
var loop=false;
$(function() {
    // var Quitem=generateQueue();

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
        // console.log('homeNav');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Favorites <i class="fa fa-heart" aria-hidden="true" style="color: #E91E63;"></i></h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/songs/library',function(data){
            console.log(data);
            for(var i in data){
                console.log(data[i].img_src);
                if(parseInt(data[i].fav)>0){
                    $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="'+data[i].img_src+'" alt="img not found" onerror=this.src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">'+data[i].name+'</div>                <div class="playButton">                    <i class="fa fa-play-circle-o " id='+data[i].song_id+' aria-hidden="true" onclick="playSong(id)"></i></div><div class="text">Artist: '+data[i].artist+'<br>Genre:'+data[i].genre+'</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: '+(parseInt(data[i].fav)>0?'#e91e63':'white')+';" href="#"><i class="fa fa-heart" '+
                'onclick=toggleFavourite('+data[i].song_id+',this)'
                +' aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul" aria-hidden="true" style="position: relative; left: 200px;" onclick=addtoqueue('+data[i].song_id+')></i></a></div></div><h3>Song Name</h3></div>')

                    }
            }// showme.html('')
        })
    });
    $('#playlistNav').click(function () {
        showme.html('');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Playlists</h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/user/playlist',{"user":"1"},function (data) {
            $('favDisp').html('');
            for(var i in data.playlists){
                $('#favDisp').append('<div id='+data.user+'_'+i+' class="col-lg-3 holder">'+
                '<div class="main">'+
                '<img src="Divide_cover.png" height="100%" width="100%;">'+
                                            '<div class="blackFrame">'+
                                            +'</div>'+
                                            '<div class="songName">'+
                                                data.playlists[i].name
                                            +'</div>'+
                                            '<div class="playButton playlist">'+
                                                '<i data-toggle="tooltip" onclick="playPlaylist('+JSON.stringify(data.playlists[i].list.map(function(x){return parseInt(x)}))+')" title="Play Playlist" class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>'+
                                            '</div>'+
                                            '<div class="options">'+
                                                '<a data-toggle="tooltip" title="Delete Playlist" onclick="deletePlaylist('+data.user+','+i+')" style="text-decoration: none; color: white;" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
                                                '<a data-toggle="tooltip" title="View Playlist" onclick="dispPlaylist('+data.user+','+i+')" style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul" aria-hidden="true" style="position: relative; left: 200px;"></i></a>'+
                                            '</div></div></div>')
            }
        })
    })
    $('#uploadNav').click(function(){
        // console.log('uploadNav');
        // showme.html('<div id="dropBox">        <img src="cloud-upload.png" id="cloud">            <h3>Drag Your mp3 To Upload</h3></div>');
        showme.html('<div id="cloudContainer"><iframe style="border:none;" width=100% height=80% src="upload.html"></iframe></div>')
        // $.getScript('dropzone.js');
    })
    $('#libraryNav').click(function(){
        showme.html('');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Library</h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/songs/library',function(data){
            // console.log(data);
            for(var i in data){
                // console.log(data[i].img_src);
                $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="'+data[i].img_src+'" alt="img not found" onerror=this.src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">'+data[i].name+'</div>                <div class="playButton">                    <i class="fa fa-play-circle-o " id='+data[i].song_id+' aria-hidden="true" onclick="playSongButton(id)"></i></div><div class="text">Artist: '+data[i].artist+'<br>Genre:'+data[i].genre+'</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: '+(parseInt(data[i].fav)>0?'#e91e63':'white')+';" href="#"><i class="fa fa-heart heartLogo" '+
                'onclick=toggleFavourite('+data[i].song_id+',this)'
                +' data-toggle="tooltip" title="Add to Favorites" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-plus-circle" data-toggle="tooltip" title="Add to Playlist" aria-hidden="true" style="position: relative; left: 92px;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul listLogo" data-toggle="tooltip" title="Add to Queue" aria-hidden="true" style="position: relative; left: 185px;" onclick=addtoqueue('+data[i].song_id+')></i></a></div></div><h3>Song Name</h3></div>')
            }
        })
    });
    $('#libraryNav').click();

    $('#finalClear').click(function(){
        queue = [];
        queueView.html('');
        if (!audio[0].paused){
            playOrPause();
        }
        $('#img-wrapper').attr("src",'');
        $('.song-name').html('');
        $('.album-name').html('');
        // aud_src.attr('src',data.location);
        aud_src.attr('src','');
        // playSong();
        audio[0].load();
    });


});

function playSongButton(id) {
    console.log(queue);
    console.log(id);
    console.log(queue.indexOf(id));
    if(queue.indexOf(parseInt(id))==-1){
        console.log("in button if");
        var quetemp=queue.splice(0,queue.length);
        // console.log(quetemp);
        queue.push(parseInt(id));
        // console.log(queue);
        queue=queue.concat(quetemp);
        // console.log(queue);
        currentlyPlaying=0;
        generateQueue();
    }
    playSong(id);
}
function toggleFavourite(id,e){
    // console.log(id);
    $.post('/songs/update/toggleFav',{'song_id':id},function(data){
        if(data!='0'){
            e.style.color='#e91e63';
        }
        else{
            e.style.color='white';
        }
    })
}
function playSong(song_id){
    console.log(song_id);
    // console.log("playing shit");
    currId=song_id;
    currentlyPlaying=queue.indexOf(parseInt(song_id));
    if(song_id!=undefined){
        $.post('/songs/data',{"song_id":song_id},function(data){
            $('#img-wrapper').attr("src",data.img_src);
            $('.song-name').html(data.name);
            $('.album-name').html(data.artist);
            aud_src.attr('src',data.location);
            // playOrPause();myTrack.play();
            audio[0].load();
            audio[0].play();
            playButton.style.display='none';
            pauseButton.style.display='inline-block';
            updateTime=setInterval(update,200);
            $('.list-group-item').removeClass("active");
            $('#q'+currId).addClass("active");
            $('.playingicon').hide()
            $('#q'+currId+' i').show();
        })
    }
}
function addtoqueue(song_id) {
    if(queue.length==0){
        playSong(song_id);
    }
    if(queue.indexOf(song_id)==-1){
        queue.push(song_id);
        // console.log(queue);
        generateQueue();
    }
    else {
        alert('song already in queue');
    }


}
function generateQueue(){
    // var data=[];
    queueView.html('');
    for(var i in queue){
        $.post('/songs/data',{"song_id":queue[i]},function(data){
            // data.push(recvData);
            if(data.song_id==currId){
                queueView.append('<a id="q'+data.song_id+'" href="#" onclick=playSong('+data.song_id+') class="list-group-item active"><img src="'+data.img_src+'" style="width: 40px; display: inline; margin-right: 10px;">'+data.name+'<i class="playingicon fa fa-volume-up" aria-hidden="true" style="font-size: 26px; float: right; position: relative; top: 8px;"></i></a>')
            }
            else{
                queueView.append('<a id="q'+data.song_id+'" href="#" onclick=playSong('+data.song_id+') class="list-group-item"><img src="'+data.img_src+'" style="width: 40px; display: inline; margin-right: 10px;">'+data.name+'<i class="playingicon fa fa-volume-up" aria-hidden="true" style="font-size: 26px; float: right; position: relative; top: 8px;"></i></a>')

            }
            $('.playingicon').hide()
            $('#q'+currId+' i').show();
        })
    }
    // return data;
}
function playPrev(){
    if(currentlyPlaying>0){
        currentlyPlaying--;
        playSong(queue[currentlyPlaying]);
    }
}
function playNext(){
    // console.log(queue);
    // console.log(queue[currentlyPlaying]);
    if(currentlyPlaying<queue.length-1){
        currentlyPlaying++;
        playSong(queue[currentlyPlaying]);
    }
}

function dispPlaylist(user,id) {
    $.post("/user/playlist",{"user":user},function(data){
        console.log(data.playlists[parseInt(id)]);
    });
}

function playPlaylist(list) {
    queue=list.map(function(x){
        return parseInt(x);
    });
    currentlyPlaying=0;
    currId=queue[0];
    generateQueue();
    playSong(queue[0]);

}


function deletePlaylist(user,id) {
    $.post("/user/playlist",{"user":user},function(data){
        data.playlists.splice(id,1);
        $.post("/user/update",{"data":data},function(data) {
            $('#'+user+'_'+id).hide();
            // console.log('#'+user+'*'+id);
        })
    })
}
