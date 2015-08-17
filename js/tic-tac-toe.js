 //  _______ _        _______           _______         
 // |__   __(_)      |__   __|         |__   __|        
 //    | |   _  ___     | | __ _  ___     | | ___   ___ 
 //    | |  | |/ __|    | |/ _` |/ __|    | |/ _ \ / _ \
 //    | |  | | (__     | | (_| | (__     | | (_) |  __/
 //    |_|  |_|\___|    |_|\__,_|\___|    |_|\___/ \___|


var p1 = 'X';
var p2 = 'O';

var Game = {

		playerTurn: p1,
		wins: [],
		moves: 0,
		playon: true,
		xWin: 0,
		oWin: 0,
		bey: false,
		tay: false,
		beyPic: '<img src="images/bey.jpg" alt="">',
		tayPic: '<img src="images/tay.jpeg" alt="">',

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
					p2 = prompt("Nah, pick another name player 2!").slice(0,1).toUpperCase();
				}
				Game.playerTurn = p1;
			})
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
					$(this).append(add).addClass('' + player);		
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
				$('p').remove();
				$('img').remove()
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
			$('.reset').on('click', function() {
				Game.xwin = 0;
				Game.ywin = 0;
				$('#p1-total').text(""+Game.xWin);
				$('#p2-total').text(""+Game.oWin);
			})
		},

		checkWin: function (player) {		
			Game.wins.push($('.col-1.'+player).length);
			Game.wins.push($('.col-2.'+player).length);
			Game.wins.push($('.col-3.'+player).length);
			Game.wins.push($('#row-1').children("."+player).length);
			Game.wins.push($('#row-2').children("."+player).length);
			Game.wins.push($('#row-3').children("."+player).length);
			Game.wins.push( $('#square1.'+player).add('#square5.'+player).add('#square9.'+player).length);
			Game.wins.push( $('#square3.'+player).add('#square5.'+player).add('#square7.'+player).length);

			for (var i = 0; i < Game.wins.length; i++) {
				if (Game.wins[i] === 3) {
					$('#'+player).css('display','block');

					$('.player-turn').css('display', 'none');
					
					if (player === p1){
						Game.xWin++;
						console.log(Game.xWin);
						console.log(player)
						console.log(p1)
						$('#p1-total').text(""+Game.xWin);
					} else {
						Game.oWin++;
						$('#p2-total').text(""+Game.oWin);
					}		
					return false;
				}  

			} return true;
		},

		checkDraw: function() {
			if (Game.moves === 9) {
				$('#draw').css('display','block');
				$('.player-turn').css('display', 'none');
				return false;
			} else {
				return true;
			}
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
	Game.play();
	Game.resetGame();
	Game.playBey();
	Game.playTay();
	Game.playName();

});