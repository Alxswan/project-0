 //  _______ _        _______           _______         
 // |__   __(_)      |__   __|         |__   __|        
 //    | |   _  ___     | | __ _  ___     | | ___   ___ 
 //    | |  | |/ __|    | |/ _` |/ __|    | |/ _ \ / _ \
 //    | |  | | (__     | | (_| | (__     | | (_) |  __/
 //    |_|  |_|\___|    |_|\__,_|\___|    |_|\___/ \___|
 var p1 = 'X';
 var p2 = 'O';

 var Game = {

     initialise: function() {
         //sets variables to initial play state
         this.playerTurn = p1;
         this.lastPlayerWins = []; //will hold the board layout of the previous player
         this.nextPlayerWins = []; //will hold the board layout of the next player
         this.moves = 0;
         this.playon = true;
         this.xWin = parseInt(localStorage.getItem('p1score')) || 0;
         this.oWin = parseInt(localStorage.getItem('p2score')) || 0;
         this.bey = false;
         this.tay = false;
         this.beyPic = '<img class="gamepic" src="images/bey.jpg" alt="">';
         this.tayPic = '<img class="gamepic" src="images/tay.jpeg" alt="">';
         this.boardSize = 3;
         this.AI = false;
         this.fourbyfour = false;
         if (localStorage.getItem('p1score') && localStorage.getItem('p2score')){
         $('#p1-total').text(localStorage.getItem('p1score'));
         $('#p2-total').text(localStorage.getItem('p2score'));
        } else {
            $('#p1-total').text('0')
            $('#p2-total').text('0')
        }

     },

     play: function() {
         //Adds 'X', 'O' or player inital as paragraph to board in square player has clicked

         $('.square').on('click', function(e) {

             if (Game.playon && ($(this).text() === "") && $(this).children('img').length === 0) {
                 var player = Game.playerTurn;

                 if (Game.tay) {
                     var add = ($(Game.tayPic)); //p1 can play as image instead of 'X'

                 } else {
                     var add = ($('<p>' + player + '</p>'))
                 }

                 $(this).append(add).addClass('' + player).hide().fadeIn();

                 Game.gameCheck(player);

                 //Run AI.play plays if Game.AI has been clicked
                 if (Game.AI) {
                     AI.play();
                     Game.switchTurn();
                 } else {
                     Game.switchTurn();
                 }

             } else {
                 return;
             }
         })
     },

     gameCheck: function(player) {
         //Checks to see if there has been a win or draw and sets Game.playon to false if so
         Game.nextPlayerWins = Game.lastPlayerWins;
         Game.lastPlayerWins = [];
         Game.moves++;
         Game.playon = Game.checkWin(player);
         if (Game.playon) {
             Game.playon = Game.checkDraw();
         }
     },

     switchTurn: function() {
         //Changes the player turn from p1 to p2, also handles display and bey/tay modes
         if (Game.playerTurn === p1) {
             Game.playerTurn = p2;
         } else {
             Game.playerTurn = p1;
         }

         if (Game.bey === true && Game.tay === false) {
             Game.bey = false;
             Game.tay = true;
         } else if (Game.tay === true && Game.bey === false) {
             Game.tay = false;
             Game.bey = true;
         }
         $('.player').toggle();
     },

     checkWin: function(player) {
         //Checks whether the current player has won
         //Looks to see how many squares a player has occupied in each 'win combination' i.e. each column, row and diagonal
         //Pushes that value to an array

         Game.lastPlayerWins.push($('.col-1.' + player).length);
         Game.lastPlayerWins.push($('.col-2.' + player).length);
         Game.lastPlayerWins.push($('.col-3.' + player).length);
         Game.lastPlayerWins.push($('#row-1').children("." + player).length);
         Game.lastPlayerWins.push($('#row-2').children("." + player).length);
         Game.lastPlayerWins.push($('#row-3').children("." + player).length);
         Game.lastPlayerWins.push($('.diag-1.' + player).length);
         Game.lastPlayerWins.push($('.diag-2.' + player).length);

         //Player has won if the length of any of the array values is equals to the size (width) of the board
         //Sets display and updates player tally counter
         for (var i = 0; i < Game.lastPlayerWins.length; i++) {
             if (Game.lastPlayerWins[i] === Game.boardSize) {
                 $('#' + player).css('display', 'block');
                 $('.player-turn').css('display', 'none');

                 $("" + AI.wins[i]).css('background-color', 'rgba(255,20,147,0.6)');

                 //Increment player's win count and update scoreboard
                 if (player === p1) {
                     Game.xWin++;
                     $('#p1-total').text("" + Game.xWin);
                     localStorage.setItem('p1score', ('' + Game.xWin))
                 } else {
                     Game.oWin++;
                     $('#p2-total').text("" + Game.oWin);
                     localStorage.setItem('p2score', ('' + Game.oWin))
                 }
                 return false;
             }
         }
         return true;
     },

     checkDraw: function() {
         //Checks if number of moves is equal to the number of squares in the board, in which case there has been a draw
         if (Game.moves === Game.boardSize * Game.boardSize) {
             $('#draw').css('display', 'block');
             $('.player-turn').hide();
             return false;
         } else {
             return true;
         }
     },

     playfourByFour: function() {
         //On click appends extra column to each 'row' div and clones the last row to make 4th row
         //Changes 'diagonal' classes to correctly reflect diagonals of 4x4
         $('.4x4').on('click', function() {
             Game.newGame();
             if (!Game.fourbyfour) {
                 Game.boardSize = 4;
                 Game.AI = false;
                 $('.board').removeClass('three').addClass('four');
                 $('.row').each(function() {
                     $(this).append($('<div class="square col-4"></div>'));
                 })
                 $('#row-3').clone().prop({
                     id: "row-4"
                 }).appendTo($('.board'));
                 $('.row').children().removeClass('diag-2');
                 $('#row-4').find($('.col-4')).addClass('diag-1');
                 $('#row-4').find($('.col-1')).addClass('diag-2');
                 $('#row-3').find($('.col-2')).addClass('diag-2');
                 $('#row-2').find($('.col-3')).addClass('diag-2');
                 $('#row-1').find($('.col-4')).addClass('diag-2');

                 Game.play();
                 Game.fourbyfour = true;
             }
         })
     },

     playNormal: function() {
         //Reverts game size and diagonals back to 3x3 grid
         $('.normal').on('click', function() {
             Game.boardSize = 3;
             $('.board').removeClass('four').addClass('three');

             $('.row').each(function() {
                 $('.col-4').remove()
             })

             $('.row').children().removeClass('diag-2');
             $('#row-3').find($('.col-1')).addClass('diag-2');
             $('#row-2').find($('.col-2')).addClass('diag-2');
             $('#row-1').find($('.col-3')).addClass('diag-2');

             $('#row-4').remove();
             Game.play();
             Game.fourbyfour = false;

         })
     },

     playBey: function() {
         //Sets a picture of Beyonce to a random winning combination because bow down bitches
         $('.bey').on('click', function() {
             $('p').remove();
             $('img').remove();
             var randomNumber = Math.floor((Math.random() * 7) + 1);
             $('' + AI.wins[randomNumber]).append($(Game.beyPic));
             $('' + AI.wins[randomNumber]).eq(0).append($('<p> Bey </p>'));
             $('' + AI.wins[randomNumber]).eq(1).append($('<p> Always </p>'));
             $('' + AI.wins[randomNumber]).eq(2).append($('<p> Wins </p>'));
             $('p').css('font-size', '50px');
             $('p').css('margin-top', '100px');
             $('.bey').html('BOW DOWN')
         })
     },

     playTay: function() {
         //On click allows for p1 to play as Taylor Swift
         $('.tay').on('click', function() {
             Game.newGame();
             Game.tay = true;
             Game.bey = false;
         })
     },

     playName: function() {
         //Prompts user for input of name and takes first initial, sets variables p1 and p2 as player initilals
         $('.names').on('click', function() {
             Game.newGame();
             Game.AI = false;

             p1 = prompt("Player 1 name:").slice(0, 1).toUpperCase();
             p2 = prompt("Player 2 name:").slice(0, 1).toUpperCase();

             while (p2 === p1) {
                 p2 = prompt("Nah, pick another name player 2! (Hint: use a different initial)").slice(0, 1).toUpperCase();
             }
             //Change id associated with player for purpose of displaying winner upon win
             $('#X').attr('id', '' + p1);
             $('#O').attr('id', '' + p2);
             Game.playerTurn = p1;
         })
     },

     playAI: function() {
         //Sets Game.AI to true if button clicked
         $('.AI').on('click', function() {
             if (!Game.fourbyfour) {
                 Game.newGame();
                 Game.AI = true;
             } else {
                 Game.AI = false;
             }
         })
     },

     playAIp1: function() {
         //Allows AI to play as player 1 by switching turns immediately after new game initiated
         $('.firstplay').on('click', function() {
             if (!Game.fourbyfour) {
                 Game.newGame();
                 Game.AI = true;
                 Game.switchTurn();
                 AI.play();

             } else {
                 Game.AI = false;
             }
         })
     },

     multiplayer: function() {
         $('.multi').on('click', function() {
             Game.AI = false;
             Game.newGame();
         })
     },

     newGame: function() {
         //Remove all plays from board and set variables to allow new play
         $('.square').removeClass('' + p1);
         $('.square').removeClass('' + p2);
         Game.playon = true;
         $('p').fadeOut(function() {
             $('p').remove();
         });
         $('img').not(".boatcontainer img").fadeOut(function() {
             $('img').not(".boatcontainer img").remove();
         });
         Game.lastPlayerWins = [];
         Game.nextPlayerWins = [];
         Game.moves = 0;
         $('#' + p1).attr('id', 'X');
         $('#O' + p1).attr('id', 'Y');
         p1 = 'X';
         p2 = 'O';
         Game.playerTurn = p1;
         $("#draw, #X, #O, #player-2").hide();
         $('.player-turn').css('display', 'inline-block');
         $('#player-1').css('display', 'block');
         Game.bey = false;
         Game.tay = false;
         $(".square").css('background-color', 'rgba(255,254,78,0)');
     },

     resetGame: function() {
         //Resets game on button click
         $('.new-game').on('click', function() {
             Game.bey = false;
             Game.tay = false;
             Game.newGame()
         })
     },

     resetScoreboard: function() {
         //Resets win tally to 0
         $('button.reset').on('click', function() {
             Game.xWin = 0;
             Game.oWin = 0;
             console.log('click')
             console.log(Game.xWin)
             console.log(Game.oWin)
             $('#p1-total').text("" + Game.xWin);
             $('#p2-total').text("" + Game.oWin);
             localStorage.setItem('p1score', '0');
             localStorage.setItem('p2score', '0');
         })
     },
 }

 var AI = {

     //Order of last and next 'player Wins' array (which holds how many occurrences of player in each 'win' combination in this order):
     wins: ['.col-1', '.col-2', '.col-3', '.row-1', '.row-2', '.row-3', '.diag-1', '.diag-2'],

     play: function() {
         //Plays AI as 'O'
         if (!Game.tay) {

             //Check through each combination to see if 'true' (i.e. move possible), do that move if possible
             //if centre is full, preference corner over edge, else preference corner

             if (Game.moves < 9 && $('.center').hasClass('X')) {
                 this.winMove() || this.blockMove() || this.centerPlay() || this.specialEdgePlay() || this.cornerPlay() || this.edgePlay();

             } else if (Game.moves < 9 && !$('.center').hasClass('X')) {
                 this.winMove() || this.blockMove() || this.centerPlay() || this.specialEdgePlay() || this.cornerPlay() || this.edgePlay();
             }
             //Allows players playing as Taylor Swift to beat AI
         } else if (Game.moves < 9 && Game.checkWin('X')) {
             this.edgePlay() || this.cornerPlay() || this.centerPlay() || this.specialEdgePlay();

         }
         Game.gameCheck('O');
         Game.switchTurn();
         return;
     },

     centerPlay: function() {
         //Play in the centre if it is emply
         if (!($('.row-2.col-2').is('.O,.X'))) {
             $('.row-2.col-2').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         }
         return false;
     },

     cornerPlay: function() {
         //Check which corners are empty, if there are 3 or more empty play in third, 
         //if there are 2 empty play in second, if there is 1 empty play in 1
         var corners = $('.corner').not('.O').not('.X')

         if ($('.row-1.col-1').hasClass('X') && $('.row-3.col-3').hasClass('X') || ($('.row-1.col-3').hasClass('X') && $('.row-3.col-1').hasClass('X'))) {
             return false;
         }

         if (corners.length === 2 || ($('.row-1.col-2').hasClass('X') && $('.row-2.col-3').hasClass('X')) || ($('.row-1.col-2').hasClass('X') && $('.row-3.col-3').hasClass('X'))) {
             corners.eq(1).append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         } else if (corners.length === 1) {
             corners.eq(0).append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         } else if (corners.length >= 3) {
             corners.eq(2).append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         }
         return false;
     },

     edgePlay: function() {
         //Play on the edge if there are two or more edges remaining
         var edges = $('.edge').not('.O').not('.X')
         if (edges.length >= 2) {
             edges.eq(0).append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         }
         return false;
     },

     specialEdgePlay: function() {

         //Special case where in particular configuration play in adjacent edge 
         if ($('.row-1.col-1').hasClass('X') && $('.row-3.col-2').hasClass('X') && !$('.row-2.col-1').hasClass('O') && !$('.row-2.col-1').hasClass('X')) {
             $('.row-2.col-1').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         } else if ($('.row-1.col-3').hasClass('X') && $('.row-3.col-2').hasClass('X') && !$('.row-2.col-3').hasClass('O') && $('.edge').not('.O').not('.X').length > 2) {
             $('.row-2.col-3').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         } else if ($('.row-1.col-3').hasClass('X') && $('.row-2.col-1').hasClass('X') && !$('.row-1.col-2').hasClass('O') && $('.edge').not('.O').not('.X').length > 2) {
             $('.row-1.col-2').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
             return true;
         }
         return false;
     },

     blockMove: function() {
         //If the oposing player can win next turn, block play
         for (var i = 0; i < Game.lastPlayerWins.length; i++) {
             if (Game.lastPlayerWins[i] === 2 && Game.nextPlayerWins[i] === 0) {
                 var move = AI.wins[i];
                 var add = $('' + move).not('.X').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
                 return true;
             }
         }
         return false;
     },

     winMove: function() {
         //If there is an opportunity to win, win
         for (var i = 0; i < Game.nextPlayerWins.length; i++) {
             if (Game.nextPlayerWins[i] === 2 && Game.lastPlayerWins[i] === 0) {
                 var move = AI.wins[i];
                 var add = $('' + move).not('.O').append($('<p>O</p>')).addClass('O').hide().fadeIn(4000);
                 return true;
             }
         }
         return false;
     },

     unrelatedBoat: function(){
         $('.sail').on('click', function() {
            Game.initialise();
        $('.boatcontainer').toggle();
         })
     }
 }

 $(document).ready(function() {
     Game.initialise();
     Game.play();
     Game.resetGame();
     Game.playBey();
     Game.playTay();
     Game.playfourByFour();
     Game.playNormal();
     Game.playName();
     Game.resetScoreboard();
     Game.playAI();
     Game.playAIp1();
     Game.multiplayer();
     AI.unrelatedBoat();
    
    
 });