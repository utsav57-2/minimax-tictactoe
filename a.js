$(document).ready(function(){
         var player;
         var turn=0;
         resetall();
        $("#x").click(function(){
          selectsym("X");
          player="X";
          main(player);
          //turn=1;
        });
        $("#o").click(function(){
          selectsym("O");
          player="O";

        });

         $(".button3").click(function(){
           location.reload();
         });

         $(".button2").click(function(){
           $(this).text(player);
           $(this).attr("disabled",true);
           test();
           main(player);

         });
});
function selectsym(sym){
  $(".game").show();
  $(".result").show();
  $(".rule").hide();
  $(".selector").hide();
  $("#reset").show();
  $("#status-text").text("You have selected "+sym);
}
function resetall(){

  $("#status-text").text("Select");
  $(".game").hide();
  $("#reset").hide();
  $(".result").hide();
}


function getScore(game){
    //rows
    var i=0;
      for(i=0;i<3;i++){
        if(game[i][0]==game[i][1]&&game[i][1]==game[i][2]){
           if(game[i][0]=='X'){
            return 10;
           }
           else if (game[i][0]=='O') {
            return -10;
           }
         }
        }
        //columns
      for(i=0;i<3;i++){
        if(game[0][i]==game[1][i]&&game[1][i]==game[2][i]){
           if(game[0][i]=='X'){
            return 10;
           }
           else if (game[0][i]=='O') {
            return -10;
           }
         }
      }
      //diagonals
      if (game[0][0]==game[1][1] && game[1][1]==game[2][2]){
            if (game[0][0]=='X')
                return 10;
            else if (game[0][0]=='O')
                return -10;
        }

        if (game[0][2]==game[1][1] && game[1][1]==game[2][0]){
            if (game[0][2]=='X')
                return 10;
            else if (game[0][2]=='O')
                return -10;
        }
}

    function moveleft(game){
      var i=0,j=0;
      for(i=0;i<3;i++)
        for(j=0;j<3;j++)
          if(game[i][j]=='-')
            return true;
        return false;
    }
    function Minimax(game,depth,maxm,player){

      if(getScore(game)==10){
        if(player=="X")
         return 10-depth;
         else
         return -10+depth
      }
      if(getScore(game)==-10){
      if(player=="X")
       return -10+depth;
       else
       return 10-depth
      }
      if(!moveleft(game)){
        return 0;
      }
      var opponent;
      if(player=='X')
       opponent='O';
      else {
       opponent='X';
      }
      if (maxm)
        {
            var best = -1000;
                for (var i = 0; i<3; i++)
            {
                for (var j = 0; j<3; j++)
                {
                    if (game[i][j]=='-')
                    {
                      game[i][j] = player;
                        best = Math.max( best,
                            Minimax(game, depth+1, !maxm,player));
                        game[i][j] = '-';
                    }
                }
            }
            return best;
        }
        else
        {
            var best = 1000;
            for (var i = 0; i<3; i++)
            {
                for (var j = 0; j<3; j++)
                {
                    if (game[i][j]=='-')
                    {
                        game[i][j] = opponent;

                        best = Math.min(best,
                               Minimax(game, depth+1, !maxm,player));
                        game[i][j] = '-';
                    }
                }
            }
            return best;
        }
    }

    function findbestmove(game,player){

    var i=0,j=0;
    var move;
    var best=-1000;
    var row=-1,col=-1;
    for(i=0;i<3;i++){
       for(j=0;j<3;j++){
         if(game[i][j]=='-'){
            game[i][j]=player;

             move=Minimax(game,0,false,player);

          game[i][j]='-';
         if(move>best){
           row=i;col=j;best=move;
         }

        }
    }
    }


    print(row,col,player);
}
function print(row,col,player){
        var map=[["#gb1","#gb2","#gb3"],["#gb4","#gb5","#gb6"],["#gb7","#gb8","#gb9"]];
        $(map[row][col]).text(player);
         $(map[row][col]).attr("disabled",true);
         test();

    }
function test(){
  var game=[[$("#gb1").text(),$("#gb2").text(),$("#gb3").text()],[$("#gb4").text(),$("#gb5").text(),$("#gb6").text()],[$("#gb7").text(),$("#gb8").text(),$("#gb9").text()]];
  if(!moveleft(game)){
    $(".result").text("draw!game will reload in 4 seconds");
    $(".button2").attr("disabled",true);
    setTimeout(function(){ location.reload()},4000);
  }
  if(getScore(game)==10)
  {
    $(".result").text("X wins!game will reload in 6 seconds");
    $(".button2").attr("disabled",true);
    setTimeout(function(){ location.reload()},6000);
  }
  else {
    if(getScore(game)==-10)
    {
      $(".result").text("O wins!game will reload in 6 seconds");
      $(".button2").attr("disabled",true);
      setTimeout(function(){ location.reload()},6000);
    }
  }

}
function main(player){
//Minimax Algorithm gameased Tictac

    var game=[[$("#gb1").text(),$("#gb2").text(),$("#gb3").text()],[$("#gb4").text(),$("#gb5").text(),$("#gb6").text()],[$("#gb7").text(),$("#gb8").text(),$("#gb9").text()]];
    $(".result1").text(game);
    var opponent;
    if(player=='X')
     opponent='O';
    else {
     opponent='X';
    }
findbestmove(game,opponent);

}
