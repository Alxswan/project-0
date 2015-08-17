 //  _______ _        _______           _______         
 // |__   __(_)      |__   __|         |__   __|        
 //    | |   _  ___     | | __ _  ___     | | ___   ___ 
 //    | |  | |/ __|    | |/ _` |/ __|    | |/ _ \ / _ \
 //    | |  | | (__     | | (_| | (__     | | (_) |  __/
 //    |_|  |_|\___|    |_|\__,_|\___|    |_|\___/ \___|

var Game = {

		playerTurn: 'X',
		wins: [],
		moves: 0,
		playon: true,

		play: function() {
			$('.square').on('click', function(e) {

				if (Game.playon && $(this).text() === "") {
					var player = Game.playerTurn;			
					$(this).append($('<p>'+player+'</p>')).addClass('' + player);		
					Game.moves++;
					Game.playon = Game.checkWin(player) && Game.checkDraw();
					Game.switchTurn();
				} else {
					return;
				}
			})
		},

		switchTurn: function() {
			if (Game.playerTurn === 'X'){
				Game.playerTurn = 'O';
			} else {
				Game.playerTurn = 'X';
			}
			$('.player').toggle();
		},

		newGame: function() {
			$('.new-game').on('click', function() {
				Game.playon = true;
				$('p').remove();
				Game.wins = [];
				Game.moves = 0;
				Game.playerTurn = 'X';
				$('.square').removeClass('X');
				$('.square').removeClass('O');
				$('#draw').css('display','none');
				$('#X').css('display','none');
				$('#O').css('display','none');
				$('#player-1').css('display','block');
				$('#player-2').css('display','none');

			})
		},

		checkWin: function (player) {		
			Game.wins.push($('.col-1.'+player).length);
			Game.wins.push($('.col-2.'+player).length);
			Game.wins.push($('.col-3.'+player).length);
			Game.wins.push($('#row-1').children(""+player).length);
			Game.wins.push($('#row-2').children(""+player).length);
			Game.wins.push($('#row-3').children(""+player).length);
			Game.wins.push( $('#square1.'+player).add('#square5.'+player).add('#square9.'+player).length);
			Game.wins.push( $('#square3.'+player).add('#square5.'+player).add('#square7.'+player).length);

			for (var i = 0; i < Game.wins.length; i++) {
				if (Game.wins[i] === 3) {
					$('#'+player).css('display','block');
					return false;
				}  
			} return true;
		},

		checkDraw: function() {
			if (Game.moves === 9) {
				$('#draw').css('display','block');
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
	Game.newGame();

});