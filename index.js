$(".option").click(function (){
    $(".option").removeClass("whiteBlock");
    $(this).addClass("whiteBlock");
});

//CREATE PIECES
function Create(piece, position){
    var color = $("<img>").attr("src", "./images/"+ piece +".png");
    color.addClass("pieces " + piece +" ").attr("id",position);
    $("#"+position).append(color);
}

var opp;
var numPlayers;
var submitClicked = false;
var playerSelected = [];

//ASSOCIATING EACH COLOUR WITH A NUMBER TO MAKE CREATING ELEMENTS DYNAMICALLY EASIER
class setUp {
    constructor(num, color, bg) {
      this.num = num;
      this.color = color;
      this.bg = bg;
    }
};
  
var p1 = new setUp(1,"red","#e70c62");
var p2 = new setUp(2,"blue", "#49A0DF");
var p3 = new setUp(3,"green", "#49BC92");
var player = [];
player.push(p1,p2,p3);


$(".img-dice").click(function(){

    var randomNumber = Math.floor(Math.random() * 6) + 1;
    $(".img-dice").attr("src", "./images/dice" + randomNumber + ".png");


    //ACCOUNTING FOR EXTRA TURN ON 6
    if(randomNumber === 6){
        $("#extraTurn").css("display", "block");
        setTimeout(() => {
            move(playerSelected[0], randomNumber);
        }, 800);
        return;
    }

    //UPDATING INNER TEXT AND COLOR OF TURN
    setTimeout(() => {
        if(chechWinner){
            $("#turnUpdate").text("PLAYER " + playerSelected[0].num + " ROLLS");
            $("#turnColor").css("background-color", playerSelected[0].bg)
            $("#extraTurn").css("display", "none");
        }
    }, 800);
    

    move(playerSelected[0], randomNumber);

    //SO THAT PIECES GO ALTERNATIVELY IN MOVE FUNCTION
    var x = playerSelected.shift();
    playerSelected.push(x);

});


//MOVES PIECE BY DELETING FROM INITIAL AND CREATING AT FINAL POSITION
function move(player, randomNumber){
    piece = player.color;

    var currentId = Number($("."+piece).attr("id"));
    var position = currentId + randomNumber;

    if(position > 100){
        return;
    }

    $(".img-dice").css("pointer-events", "none");
    $(".img-dice").addClass("dice-disable");

    setTimeout(() => {
        $("."+piece).remove();
        Create(piece, position);
        $(".img-dice").css("pointer-events", "auto");
        $(".img-dice").removeClass("dice-disable");
    }, 800);

    chechWinner(position);

    //CLIMBING LADDER AND DESCENDING SNAKES

    if($("#"+ position).hasClass("element")){
        setTimeout(() => {
            $(".img-dice").css("pointer-events", "none");
            $(".img-dice").addClass("dice-disable");
        }, 800);
    }

    setTimeout(() => {
        if($("#"+ position).hasClass("element")){
            var pos = $("#"+ position).text();
            $("."+piece).remove();
            Create(piece, pos);
            $(".img-dice").css("pointer-events", "auto");
            $(".img-dice").removeClass("dice-disable");
        }
    }, 1500);
}

function end(){
    setTimeout(() => {
        $("#turnUpdate").text("PLAYER " + playerSelected[playerSelected.length-1].num + " WINS !!!! \n Game over");
        $("#turnColor").css("display", "none");
        $(".img-dice").css("pointer-events", "none");
        $("#extraTurn").text("Refresh to play again");
        $("#extraTurn").css("display", "block");
        $(".img-dice").off("click");
    }, 800);
}


function chechWinner(position){
    if(position == 100){
        if(playerSelected.length == 2){
            end();
            return false;
        }
        setTimeout(() => {
            $("#turnUpdate").text("PLAYER " + playerSelected[playerSelected.length-1].num + " WINS !!!! \n P" + playerSelected[0].num + " rolls");
            $("#turnColor").css("background-color", playerSelected[1].bg)
            $("#extraTurn").css("display", "none");
            var win = playerSelected.pop();
            return false;
        }, 800);
    }
}


$("#submit").click(function(){
    opp = $('#opponent').val();
    numPlayers = Number($("#numberInput").val());
    if(numPlayers !== 2 && numPlayers !== 3){
        return alert("Enter valid number of players");
    }
    $(".selection").css("display", "none");
    $(".rules").css("display", "none");
    $(".game").css("display", "flex");
    submitClicked = true;

    //CREATES AS MANY PIECES AS INPUTED AT POSITION 1
    for(i=1; i<= numPlayers; i++){
        Create(player[i-1].color, 1);
        playerSelected.push(player[i-1]);
    }
});

//NAVIGATING BETWEEN SECTIONS
$(".rule-nav").click(function(){
    $(".rules").css("display", "flex");
    if($(".selection").css("display") == "flex"){
        $(".selection").css("display", "none");
    }
    else{
        $(".game").css("display", "none");
    }
});

$(".play-nav").click(function(){
    $(".rules").css("display", "none");
    if(submitClicked){
        $(".game").css("display", "flex");
    }
    else{
        $(".selection").css("display", "flex");
    }
});