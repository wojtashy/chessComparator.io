var pfp;
var p1 = document.getElementById("playerInfo1");

function getPlayer(username,id){

    var player = document.getElementById(id);

    document.getElementById("loading").style.display = "block";
    fetch(`https://api.chess.com/pub/player/${username}`)
    .then( res => res.json(),console.log(Error))
    .then(data => {
        // if(data.code===0){
            
        // }
        
        console.log(data);

        //Get user pfp
        if(data["avatar"]==null){
            player.innerHTML='<a href="'+data["url"]+'" target="blank"><img class="pfp" src="resources/user.svg"></a>';
        }
        else{
            player.innerHTML='<a href="'+data["url"]+'" target="blank"><img class="pfp" src="'+data["avatar"]+'"></a>';
        }

        //Get user username
        player.innerHTML+= '<p class="username">'+data["username"]+'</p>';

        document.getElementById("loading").style.display = "none";
    } )

    fetch(`https://api.chess.com/pub/player/${username}/stats`)
    .then( res => res.json(),console.log(Error))
    .then(data => {
        console.log(data);

        player.innerHTML+= '<p class="stats">Blitz: '+data["chess_blitz"]["last"]["rating"]+'</p>';
        player.innerHTML+= '<p class="stats">Rapid: '+data["chess_rapid"]["last"]["rating"]+'</p>';
        player.innerHTML+= '<p class="stats">Bullet: '+data["chess_bullet"]["last"]["rating"]+'</p>';

    } )

    .catch(console.log(Error))
}

function checkName(name){
    return name.trim() != "" ;
}

function compare(){

    var player_1 = document.querySelector(".inputs input:nth-of-type(1)").value;
    var player_2 = document.querySelector(".inputs input:nth-of-type(2)").value;
    
    
    if(checkName(player_1) && checkName(player_2)){
        getPlayer(player_1,"playerInfo1");
        getPlayer(player_2,"playerInfo2");
        nameAlert(false);
    }
    else if(checkName(player_1)){
        nameAlert(2);
    }
    else if(checkName(player_2)){
        nameAlert(1);
    }
    else{
        nameAlert(null);
    }
   
}

function nameAlert(player){
    switch (player) {
        case 1:
            document.querySelector(".inputs input:nth-of-type(1)").classList.add("invalidName");
            document.querySelector(".inputs input:nth-of-type(2)").classList.remove("invalidName");
            break;
        case 2:
            document.querySelector(".inputs input:nth-of-type(2)").classList.add("invalidName");
            document.querySelector(".inputs input:nth-of-type(1)").classList.remove("invalidName");
            break;
        case false:
            document.querySelector(".inputs input:nth-of-type(1)").classList.remove("invalidName");
            document.querySelector(".inputs input:nth-of-type(2)").classList.remove("invalidName");
            break;
        default:
            document.querySelector(".inputs input:nth-of-type(1)").classList.add("invalidName");
            document.querySelector(".inputs input:nth-of-type(2)").classList.add("invalidName");
            break;
    }
}