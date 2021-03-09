#  Lotto Game

## Notes
- React.StrictMode is Disabled:  
  https://dev.to/mccoyrjm/double-invoke-of-state-functions-in-react-5cl0



## Instructions:

Create a game client for Lotto as described :
- [X] 3 initial boards (tabs) will be preloaded and player can add up to 6.
- [X] An area with the total and per board cost, init value is 0$.
- [X] An area for system
- [X] A play all button.
- [X] An error/info message area.
- [X] Clear and Clear all button 
- [X] Quick Pick and Quick Pick All buttons
 
## Game criteria:
- [X] Every board is a matrix of 49 numbers (1 to 49).
- [X] In each board retailer can select exactly 6 numbers. Every number can be selected or de-selected by pressing on it.
- [X] If the selected numbers are not matching (less or more than 6) an error message must be thrown informing the player to add or remove numbers.
- [X] The game is valid when one or more boards have the correct numbers selected and no errors occurred to the other boards (tabs).
- [X] Clear button reset the tab to initial state, no numbers selected
- [X] Clear all button reset all tabs to initial state, no numbers selected
- [X] Quick Pick button select randomly numbers accordingly for the current board
- [X] Quick Pick All button select randomly numbers accordingly for all boards
 

## Additional Information:
- [X] The requested numbers that win the lottery is 6
- [X] Column Price for each valid board/tab (6 numbers selected) is 1, e.g. 3 valid boards 3
- [?] **Changed the Logic** When the game is valid then the play all button will turn into green in any other cases will remain grey.
- [X] When the game is valid the total and per board cost area will show the correct cost.
- [X] UI attachments is only indicative and no need the client that you create to be exactly the same
- [X] Reuse code and use same component more than one time if its applicable. Try not to duplicate components and code.
 

## For developing the Lotto game client must use:
- [X] https://reactjs.org/
- [X] State management (if needed) of your choice
- [X] Any other framework that can help you
