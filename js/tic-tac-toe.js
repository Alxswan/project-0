 //  _______ _        _______           _______         
 // |__   __(_)      |__   __|         |__   __|        
 //    | |   _  ___     | | __ _  ___     | | ___   ___ 
 //    | |  | |/ __|    | |/ _` |/ __|    | |/ _ \ / _ \
 //    | |  | | (__     | | (_| | (__     | | (_) |  __/
 //    |_|  |_|\___|    |_|\__,_|\___|    |_|\___/ \___|
                                                     
                                                    
//Pseudo-code

//Track player turns

//display X or O on square when player clicks

var Game = {

		playerTurn: 'X',

		play : function() {

			$('.square').on('click', function(e) {
				var player = Game.playerTurn;			
				$('#'+e.target.id).append($('<p>'+player+'</p>'));
				Game.switchTurn();
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
				$('p').remove();
			})
		},


		win : function () {

			

		}

}

//Uncover correct square

$(document).ready(function () {
	Game.play();
	Game.newGame();

});