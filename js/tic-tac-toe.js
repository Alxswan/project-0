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
			this.playerTurn = p1;	
			this.lastPlayerWins = [];	
			this.nextPlayerWins = [];
			this.moves = 0;	
			this.playon = true;	
			this.xWin = 0;	
			this.oWin = 0;	
			this.bey = false;	
			this.tay = false;	
			this.beyPic = '<img src="images/bey.jpg" alt="">';	
			this.tayPic = '<img src="images/tay.jpeg" alt="">';	
			this.boardSize = 3;
			this.AI = false;
		},

		play: function() {
			$('.square').on('click', function(e) {	

				if (Game.playon && ($(this).text() === "") && $(this).children('img').length === 0) {
					var player = Game.playerTurn;
					
				if (Game.bey) {
					var add = ($(Game.beyPic));

				} else if (Game.tay) {
					var add = ($(Game.tayPic));

				} else {
					var add = ($('<p>'+player+'</p>'))
				}
				
				$(this).append(add).addClass('' + player).hide().fadeIn();	
				
				Game.gameCheck(player);
				
				if (Game.AI) {
					AI.play();
					Game.switchTurn();
				} else Game.switchTurn();

				} else {
					return;
				}
			})
		},

		gameCheck: function(player) {
					Game.nextPlayerWins = Game.lastPlayerWins;
					Game.lastPlayerWins = [];
					Game.moves++;
					Game.playon = Game.checkWin(player);
					if (Game.playon) {
						Game.playon = Game.checkDraw();
					} 	
					console.log("last player: "+Game.lastPlayerWins);
					console.log("next player: "+Game.nextPlayerWins);
					console.log("Game moves"+ Game.moves)			
		},

		playfourByFour: function() {
			$('.4x4').on('click', function() {
				Game.boardSize = 4;

				$('.board').removeClass('three').addClass('four');

				$('.row').each(function() {
					$(this).append($('<div class="square col-4"></div>'));
				})

				$('#row-3').clone().prop({id: "row-4"}).appendTo($('.board'));

				$('.row').children().removeClass('diag-2');

				$('#row-4').find($('.col-4')).addClass('diag-1');
				$('#row-4').find($('.col-1')).addClass('diag-2');
				$('#row-3').find($('.col-2')).addClass('diag-2');
				$('#row-2').find($('.col-3')).addClass('diag-2');
				$('#row-1').find($('.col-4')).addClass('diag-2');
			
				Game.play();

			})
		},

		playNormal: function() {
			$('.normal').on('click', function() {
				Game.boardSize = 3;
				$('.board').removeClass('four').addClass('three');

				$('.row').each( function() {
					$('.col-4').remove()
				})

				$('.row').children().removeClass('diag-2');
				$('#row-3').find($('.col-1')).addClass('diag-2');
				$('#row-2').find($('.col-2')).addClass('diag-2');
				$('#row-1').find($('.col-3')).addClass('diag-2');

				$('#row-4').remove();

				Game.play();

			})
		},

		playBey: function() {
			$('.bey').on('click', function() {
				Game.newGame();
				Game.bey = true;
				Game.tay = false;
				})
		},

		playTay: function() {
			$('.tay').on('click', function() {
				Game.newGame();
				Game.tay = true;
				Game.bey = false;
			})
		},

		playName: function() {
			$('.names').on('click', function() {
				Game.newGame();

				p1 = prompt("Player 1 name:").slice(0,1).toUpperCase();
				p2 = prompt("Player 2 name:").slice(0,1).toUpperCase();

				while (p2 === p1) {
					p2 = prompt("Nah, pick another name player 2! (Hint: use a different initial)").slice(0,1).toUpperCase();
				}
				Game.playerTurn = p1;
			})
		},

		switchTurn: function() {
			if (Game.playerTurn === p1){
				Game.playerTurn = p2;
			} else {
				Game.playerTurn = p1;
			}

			if (Game.bey === true && Game.tay === false) {
				Game.bey = false;
				Game.tay = true;
			} else if (Game.tay === true && Game.bey === false){
				Game.tay = false;
				Game.bey = true;
			}
			$('.player').toggle();
		},

		newGame: function() {

				$('.square').removeClass(''+p1);
				$('.square').removeClass(''+p2);
				Game.playon = true;
				$('p').fadeOut(function(){
					$('p').remove();
				});		
				$('img').fadeOut(function(){
					$('img').remove();
				});
				Game.lastPlayerWins = [];
				Game.nextPlayerWins = [];
				Game.moves = 0;
				p1 = 'X';
				p2 = 'O';
				Game.playerTurn = p1;
				$('#draw').css('display','none');
				$('#X').css('display','none');
				$('#O').css('display','none');
				$('.player-turn').css('display', 'inline-block');	
				$('#player-1').css('display','block');
				$('#player-2').css('display','none');
				Game.bey = false;
				Game.tay = false;
		},

		resetGame: function() { 
			$('.new-game').on('click', function() {
				Game.bey = false;
				Game.tay = false;
				Game.newGame()
			})
		},

		resetScoreboard: function() {
			$('button.reset').on('click', function() {
				Game.xWin = 0;
				Game.oWin = 0;
				console.log('click')
				console.log(Game.xWin)
				console.log(Game.oWin)
				$('#p1-total').text(""+Game.xWin);
				$('#p2-total').text(""+Game.oWin);
			})
		},

		checkWin: function (player) {	
			
			Game.lastPlayerWins.push($('.col-1.'+player).length);
			Game.lastPlayerWins.push($('.col-2.'+player).length);
			Game.lastPlayerWins.push($('.col-3.'+player).length);
			Game.lastPlayerWins.push($('#row-1').children("."+player).length);
			Game.lastPlayerWins.push($('#row-2').children("."+player).length);
			Game.lastPlayerWins.push($('#row-3').children("."+player).length);
			Game.lastPlayerWins.push($('.diag-1.'+player).length);
			Game.lastPlayerWins.push($('.diag-2.'+player).length);

			for (var i = 0; i < Game.lastPlayerWins.length; i++) {
				if (Game.lastPlayerWins[i] === Game.boardSize) {
					$('#'+player).css('display','block');

					$('.player-turn').css('display', 'none');
					
					if (player === p1){
						Game.xWin++;
						$('#p1-total').text(""+Game.xWin);
					} else {
						Game.oWin++;
						$('#p2-total').text(""+Game.oWin);
					}		
					return false;
				}  
			} 				
				return true;
		},

		checkDraw: function() {
			if (Game.moves === Game.boardSize * Game.boardSize) {
				$('#draw').css('display','block');
				$('.player-turn').css('display', 'none');
				return false;
			} else {
				return true;
			}
		},

		playAI: function() {
			$('.AI').on('click', function() {
				Game.AI = true;
				console.log(Game.AI);
			})
		}
}

var AI = {

		wins: ['.col-1','.col-2','.col-3','.row-1','.row-2','.row-3','.diag-1','.diag-2'],

		play: function() {		
			this.winMove() || this.blockMove() || this.centerPlay() || this.cornerPlay() || this.edgePlay();
			return;
		},

		centerPlay: function() {
			if (!($('.row-2.col-2').is('.O,.X'))) {
				$('.row-2.col-2').append($('<p>O</p>')).addClass('O').hide().fadeIn(5000);
				Game.gameCheck('O');
				Game.switchTurn();
				return true;
			} 	return false;
		},

		cornerPlay: function() {
				var corners = $('.corner').not('.O').not('.X')
				if (corners.length !== 0) {
				corners.eq(0).append($('<p>O</p>')).addClass('O').hide().fadeIn(5000);
				Game.gameCheck('O');
				Game.switchTurn();
				return true;
			} return false;
		},

		edgePlay: function() {
				var edges = $('.edge').not('.O').not('.X')
				if (edges.length !== 0) {
					edges.eq(0).append($('<p>O</p>')).addClass('O').hide().fadeIn(5000);
					Game.gameCheck('O');
					Game.switchTurn();
					return true;
			} return false;
		},

		blockMove: function(){
			// debugger;
			for (var i = 0; i < Game.lastPlayerWins.length; i++){
				if (Game.lastPlayerWins[i] === 2 && Game.nextPlayerWins[i] === 0){
					var move = AI.wins[i];
					var add = $(''+move).not('.X').append($('<p>O</p>')).addClass('O').hide().fadeIn(5000);
					Game.gameCheck('O');
					Game.switchTurn();
					return true;
				}
			} return false;
		},

		winMove: function() {
			for (var i = 0; i < Game.nextPlayerWins.length; i++){
				if (Game.nextPlayerWins[i] === 2 && Game.lastPlayerWins[i] === 0){
					var move = AI.wins[i];
					var add = $(''+move).not('.O').append($('<p>O</p>')).addClass('O').hide().fadeIn(5000);
					Game.gameCheck('O');
					Game.switchTurn();
					return true;
				}
			} return false; 
		},
}

// help: long version
// $('.row').each(function (rowNumber) {
//   var $cols = $(this).find('.square');
//   $cols.each(function (colNumber) {
//     $(this).html('<p>' + colNumber + ', ' + rowNumber + '</p>');
//   });
// });

$(document).ready(function () {
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

});