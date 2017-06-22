$(document).ready(function () {
    var userclicked = "userclicked-cell";
    var machineclicked = "machineclicked-cell";
    var emptycell = "empty-cell";
    var cell = "cell";
    var horizontalline = "horizontal-line";
    var verticalline = "vertical-line";
    var leftdiagonal = "left-diagonal";
    var rightdiagonal = "right-diagonal";
    var winningcell = "wining-cell";
    var cells = document.getElementsByClassName("cell");
    var finalmessage = "";

    // click handler
    $(".cell").click(function () {
        if (finalmessage.length != 0) {
            final_message(finalmessage + " . Press OK to reset the game");
            reset_board();
            return;
        }
        if ($(this).hasClass(emptycell) && finalmessage.length == 0) {
            var index = place_mark($(this), false);
            finalmessage = checkgame(index, userclicked);
            if (finalmessage.length == 0) {
                index = computer_move();
                finalmessage = checkgame(index, machineclicked);
            }
        }
        if (finalmessage.length != 0) {
            $("#message").html(finalmessage + ". Please reset the game.");
        }
    });

    // reset button click
    $("#restart-game-button").click(function () {
        reset_board();
    });

    function checkgame(index, cellclass) {
        if (won(index, cellclass)) return cellclass == userclicked ? "You won!!" : "You lost!!";
        if (tied()) return "Game tied";
        return "";
    }

    // resets the board, all cells are empty now!!!
    function reset_board() {
        $.each(cells, function (i, v) {
            v.className = "";
            $(v).addClass(cell + " " + emptycell);
        });
        finalmessage = "";
        $("#message").html("Keep playing!!");
    }

    // a player's turn
    function place_mark(element, bymachine) {
        var cell_class = bymachine ? machineclicked : userclicked;
        element.removeClass(emptycell);
        element.addClass(cell_class);
        if (!bymachine) { // if it was the user then returns the element index
            var x = parseInt(element.attr("id").substring(1, 2));
            var y = parseInt(element.attr("id").substring(2));
            return y * 3 + x; // index in the HTMLCollection
        }
    }

    // machine logic
    function computer_move() {
        var index;
        var expert = ($("#expert").is(":checked"));
        if (expert) index = smart_move();
        else index = random_move();
        place_mark($(cells[index]), true);
        console.log(" expert mode? :" + expert + "    index: " + index);
        return index;
    }

    // makes the computer to play smart
    function smart_move() {
        var index = offensive_move();
        if (!isNaN(index)) return index;
        index = defensive_move();
        if (!isNaN(index)) return index;
        return random_move();
    }

    // look for any offensive play
    function offensive_move() {
        
        if ($(cells[0]).hasClass(machineclicked)) {
            if ($(cells[1]).hasClass(machineclicked) && $(cells[2]).hasClass(emptycell)) return 2;
            if ($(cells[2]).hasClass(machineclicked) && $(cells[1]).hasClass(emptycell)) return 1;
            if ($(cells[3]).hasClass(machineclicked) && $(cells[6]).hasClass(emptycell)) return 6;
            if ($(cells[6]).hasClass(machineclicked) && $(cells[3]).hasClass(emptycell)) return 3;
            if ($(cells[4]).hasClass(machineclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(machineclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }

        if ($(cells[1]).hasClass(machineclicked)) {
            if ($(cells[4]).hasClass(machineclicked) && $(cells[7]).hasClass(emptycell)) return 7;
            if ($(cells[7]).hasClass(machineclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }

        if ($(cells[3]).hasClass(machineclicked)) {
            if ($(cells[4]).hasClass(machineclicked) && $(cells[5]).hasClass(emptycell)) return 5;
            if ($(cells[5]).hasClass(machineclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }

        if ($(cells[2]).hasClass(machineclicked)) {
            if ($(cells[4]).hasClass(machineclicked) && $(cells[6]).hasClass(emptycell)) return 6;
            if ($(cells[6]).hasClass(machineclicked) && $(cells[4]).hasClass(emptycell)) return 4;
            if ($(cells[5]).hasClass(machineclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(machineclicked) && $(cells[5]).hasClass(emptycell)) return 5;
        }

        if ($(cells[6]).hasClass(machineclicked)) {
            if ($(cells[7]).hasClass(machineclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(machineclicked) && $(cells[7]).hasClass(emptycell)) return 7;
        }

        if ($(cells[0]).hasClass(emptycell)) {
            if ($(cells[1]).hasClass(machineclicked) && $(cells[2]).hasClass(machineclicked)) return 0;
            if ($(cells[4]).hasClass(machineclicked) && $(cells[8]).hasClass(machineclicked)) return 0;
            if ($(cells[3]).hasClass(machineclicked) && $(cells[6]).hasClass(machineclicked)) return 0;
        }

        if ($(cells[3]).hasClass(emptycell) &&
            $(cells[4]).hasClass(machineclicked) &&
            $(cells[5]).hasClass(machineclicked)) return 3;

        if ($(cells[1]).hasClass(emptycell) &&
            $(cells[4]).hasClass(machineclicked) &&
            $(cells[7]).hasClass(machineclicked)) return 1;

        if ($(cells[6]).hasClass(emptycell) &&
            $(cells[7]).hasClass(machineclicked) &&
            $(cells[8]).hasClass(machineclicked)) return 6;

        if ($(cells[2]).hasClass(emptycell)) {
            if ($(cells[5]).hasClass(machineclicked) && $(cells[8]).hasClass(machineclicked)) return 2;
            if ($(cells[4]).hasClass(machineclicked) && $(cells[6]).hasClass(machineclicked)) return 2;
        }
    }

    // look for any defensive play
    function defensive_move() {
        
        if ($(cells[0]).hasClass(userclicked)){
            if ($(cells[1]).hasClass(userclicked) && $(cells[2]).hasClass(emptycell)) return 2;
            if ($(cells[2]).hasClass(userclicked) && $(cells[1]).hasClass(emptycell)) return 1;
            if ($(cells[3]).hasClass(userclicked) && $(cells[6]).hasClass(emptycell)) return 6;
            if ($(cells[6]).hasClass(userclicked) && $(cells[3]).hasClass(emptycell)) return 3;
            if ($(cells[4]).hasClass(userclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(userclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }  

        if ($(cells[1]).hasClass(userclicked)){
            if ($(cells[4]).hasClass(userclicked) && $(cells[7]).hasClass(emptycell)) return 7;
            if ($(cells[7]).hasClass(userclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }  

        if ($(cells[3]).hasClass(userclicked)){
            if ($(cells[4]).hasClass(userclicked) && $(cells[5]).hasClass(emptycell)) return 5;
            if ($(cells[5]).hasClass(userclicked) && $(cells[4]).hasClass(emptycell)) return 4;
        }  

        if ($(cells[6]).hasClass(userclicked)){
            if ($(cells[7]).hasClass(userclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(userclicked) && $(cells[7]).hasClass(emptycell)) return 7;
        }  

        if ($(cells[2]).hasClass(userclicked)){
            if ($(cells[4]).hasClass(userclicked) && $(cells[6]).hasClass(emptycell)) return 6;
            if ($(cells[6]).hasClass(userclicked) && $(cells[4]).hasClass(emptycell)) return 4;
            if ($(cells[5]).hasClass(userclicked) && $(cells[8]).hasClass(emptycell)) return 8;
            if ($(cells[8]).hasClass(userclicked) && $(cells[5]).hasClass(emptycell)) return 5;
        }  

        if (($(cells[0]).hasClass(emptycell) && $(cells[1]).hasClass(userclicked) && $(cells[2]).hasClass(userclicked)) || 
            ($(cells[0]).hasClass(emptycell) && $(cells[3]).hasClass(userclicked) && $(cells[6]).hasClass(userclicked)) ||
            ($(cells[0]).hasClass(emptycell) && $(cells[4]).hasClass(userclicked) && $(cells[8]).hasClass(userclicked))) return 0;
        if ($(cells[1]).hasClass(emptycell) && $(cells[4]).hasClass(userclicked) && $(cells[7]).hasClass(userclicked)) return 1;

        if ($(cells[3]).hasClass(emptycell) && $(cells[4]).hasClass(userclicked) && $(cells[5]).hasClass(userclicked)) return 3;  

        if ($(cells[6]).hasClass(emptycell) && $(cells[7]).hasClass(userclicked) && $(cells[8]).hasClass(userclicked)) return 6;

        if (($(cells[2]).hasClass(emptycell) && $(cells[4]).hasClass(userclicked) && $(cells[6]).hasClass(userclicked)) || 
            ($(cells[2]).hasClass(emptycell) && $(cells[5]).hasClass(userclicked) && $(cells[8]).hasClass(userclicked))) return 2;
        
    }

    // selects a random cell, basic computer skills
    function random_move() {
        var index;
        do {
            index = Math.floor((Math.random() * 10));
            rnd_cell = cells[index];
        } while (!$(cells[index]).hasClass(emptycell));
        return index;
    }

    // returns true if player won
    function won(index, cellclass) {
        if (check_horizontal(index, cellclass) ||
            check_vertical(index, cellclass) ||
            check_left_diagonal(index, cellclass) ||
            check_right_diagonal(index, cellclass)) {
            gameisfinished = true;
            return true;
        }
        else return false;
    }

    // returns true if game is tied
    function tied() {
        var i = 0;
        while (i < 9) {
            if ($(cells[i++]).hasClass(emptycell)) return false;
        }
        gameisfinished = true;
        return true;
    }

    
    function final_message(msg) {
        alert(msg);
    }

    // checks if won horizontally in the last play and marks the winning cells
    function check_horizontal(index, cellclass) {
        var row = Math.floor(index / 3);
        var result = $(cells[row * 3]).hasClass(cellclass) &&
            $(cells[row * 3 + 1]).hasClass(cellclass) &&
            $(cells[row * 3 + 2]).hasClass(cellclass);

        if (result) highlight_cells([row * 3, row * 3 + 1, row * 3 + 2], winningcell);
        return result;
    }

    // checks if won vertically in the last play and marks the winning cells
    function check_vertical(index, cellclass) {
        var col = index % 3;
        var result = $(cells[col]).hasClass(cellclass) &&
            $(cells[col + 3]).hasClass(cellclass) &&
            $(cells[col + 6]).hasClass(cellclass);
        
        if (result) highlight_cells([col, col + 3, col + 6], winningcell);
        return result;
    }

    // // checks if won diagonally from left upper corner in the last play and marks the winning cells
    function check_left_diagonal(index, cellclass) {
        if (index % 4 == 0) {
            var result = $(cells[0]).hasClass(cellclass) &&
                $(cells[4]).hasClass(cellclass) &&
                $(cells[8]).hasClass(cellclass);
            
            if (result) highlight_cells([0, 4, 8], winningcell);
            return result;
        }
        return false;
    }
    function check_right_diagonal(index, cellclass) {
        if ([2, 4, 6].includes(index)) {
            var result = $(cells[2]).hasClass(cellclass) &&
                $(cells[4]).hasClass(cellclass) &&
                $(cells[6]).hasClass(cellclass);

            if (result) highlight_cells([2, 4, 6], winningcell);
            return result;
        }
        return false;
    }

    function highlight_cells(indexes, cellclass) {
        indexes.every( i => $(cells[i]).addClass(winningcell));
    }

});

