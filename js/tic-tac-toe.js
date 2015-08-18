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
			this.wins = [];	
			this.moves = 0;	
			this.playon = true;	
			this.xWin = 0;	
			this.oWin = 0;	
			this.bey = false;	
			this.tay = false;	
			this.beyPic = '<img src="images/bey.jpg" alt="">';	
			this.tayPic = '<img src="images/tay.jpeg" alt="">';	
			this.boardSize = 3;
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
					Game.moves++;
					Game.playon = Game.checkWin(player);
					if (Game.playon){
						Game.playon = Game.checkDraw();
					} 
					
					Game.switchTurn();
				} else {
					return;
				}
			})
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
				Game.wins = [];
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
			Game.wins = [];	
			Game.wins.push($('.col-1.'+player).length);
			Game.wins.push($('.col-2.'+player).length);
			Game.wins.push($('.col-3.'+player).length);
			Game.wins.push($('#row-1').children("."+player).length);
			Game.wins.push($('#row-2').children("."+player).length);
			Game.wins.push($('#row-3').children("."+player).length);
			Game.wins.push($('.diag-1.'+player).length);
			Game.wins.push($('.diag-2.'+player).length);

			for (var i = 0; i < Game.wins.length; i++) {
				if (Game.wins[i] === Game.boardSize) {
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
		}
}

var AI = {

	block: function(){

	},

	win: function() {
		//if Game.checkWin
	}
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

});