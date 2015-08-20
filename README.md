#Project 0

##Tic Tac Toe

* This is my first game, created for General Assembly's WDI-10 in August 2015

### Technologies

HTML, CSS, Javascript, jQuery

###Process

1. Render game board 
	* Used HTML divs to create boxes
2. Style board using CSS
3. Create game play functions with javascript/jquery. Os and Xs added by appending paragraph to existing divs
4. Set up gameplay buttons
5. Add options for gameplay - images and name initials
6. Add 4x4 play - on button click append additional divs to board and add/remove classes 
7. Add scoreboard
8. Add computer player AI function
	- Created 'block' and 'win' functions where AI will move to block or win automatically if option available
	- Created 'center play', 'edge play' and 'corner play' fuctions where AI plays in first available corner
	- AI plays in this order: win, block, center, corner, edge; except in specific edge cases
9. Add CSS styling
10. Add boat - uses CSS animations

###Current problems

* AI could be more intuitive
* Currently AI wins on one (known) play. Try to find it
* Need to refresh before sailing else it won't display
