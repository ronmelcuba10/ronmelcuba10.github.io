$(document).ready(function () {

    var size = 4;
    var board_element = document.getElementById("board");
    var cell_class = "cell";
    var initial_value = 0;
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;

    
    var cell_classes = {
        "0"     : "zero",
        "2"     : "two",
        "4"     : "four",
        "8"     : "eight",
        "16"    : "sixteen",
        "32"    : "thirtytwo",
        "64"    : "sixtyfour",
        "128"   : "onehundred",
        "256"   : "twohundred",
        "512"   : "fivehundred",
        "1024"  : "onethousand",
        "2048"  : "twothousand",
        "above" : "above"
    };
    

    // helper methods and classes
    function get2DArray(the_size, value) {
        return Array(the_size).fill(value).map(x => Array(the_size).fill(value));
    }

    function my_random(top) {
        return Math.floor(Math.random() * top);
    }

    // this is the vector/action linked to the keypressed
    function Vector(x, y) {
        this.x = x;
        this.y = y;

        this.toString = function () {
            return ` x= ${this.x} y=${this.y}`;
        }

        this.jump = function () {
            return this.x == 0 ? new Vector(1, 0) : new Vector(0, 1);
        }

        this.isBackwards = function () {
            return this.x == 1 || this.y == 1;
        }
    }

    // vector selector
    function select_vector(num) {
        console.log(` key pressed ${num}`)
        switch (num) {
            case LEFT: return new Vector(-1, 0);
            case UP: return new Vector(0, -1);
            case RIGHT: return new Vector(1, 0);
            default: return new Vector(0, 1); // down
        }
    }


    // the game object
    function Gameboard(board, size) {
        this.size = size;
        this.board = board;
        this.there_was_a_movement = false;
        this.score = 0;

        // to use in the console for debugging
        this.toString = function () {
            var str = "[";
            for (var y = 0; y < size; y++ ){
                str += "[";
                for (var x = 0; x < size; x++){
                    str += this.board[y][x].toString() + ",";
                }
                str += "]";
            }
            str += "]";
            return str
        }

        // show a number in the cell(DOM) if it is different to 0
        this.adjust_cell_DOM = function (cells, x, y, cell_value) {
            var this_cell = cells[4 * y + x];
            this_cell.innerHTML = cell_value ? cell_value.toString() : "";
            this_cell.className = `${cell_class} ${cell_classes[cell_value.toString()]}`;
        }

        // show all the board's numbers in the cells(DOM)
        this.draw_cells_DOM = function () {
            var cells = document.getElementsByClassName(cell_class);
            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    this.adjust_cell_DOM(cells, x, y, this.board[y][x]);
                }
            }
        }

        // adds a random cell with a number 2
        this.add_number = function () {
            do {
                var x = my_random(size);
                var y = my_random(size);
            } while (this.board[y][x] != 0);
            this.board[y][x] = 2;
        }

        // outlines the main steps of a movement
        this.move = function (vector) {
            this.there_was_a_movement = false;
            for (var i = 0; i < size; i++) {
                console.log(`the board ${this.toString()}`);
                var line = this.get_row_col_to_slide(i, vector);
                console.log(`the board after getting the row/col ${this.toString()}`);
                var slided_line = this.slide_row_col(line, vector);
                console.log(`the line slided  ${slided_line.toString()}`);
                console.log(`the board after sliding the line ${this.toString()}`);
                this.update_board(i, vector, slided_line);
                console.log(`the board after updated ${this.toString()}`);
            }
            if (this.there_was_a_movement){
                this.add_number();
                console.log(`the board after number added ${this.toString()}`);
                this.draw_cells_DOM();
            }
            
        }

        // get the row/col to be slided
        this.get_row_col_to_slide = function (index, vector) {
            console.log(`the index is ${index} and the vector is ${vector.toString()}`)
            var line = [];
            // initial coordinate
            var x = vector.x == 0 ? index : 0;
            var y = vector.y == 0 ? index : 0;

            console.log(`the initial coord ${x},${y}`)

            for (var i = 0; i < size; i++) {
                //console.log(`pusshing cell ${x},${y}`)
                line.push(this.board[y][x]);
                x += Math.abs(vector.x);
                y += Math.abs(vector.y);
            }
            console.log(`line to be slided ${line.toString()}`);
            return line;
        }

        // update the row/col that was slided
        this.update_board = function (index, vector, slided_line) {
            // initial coordinate
            var x = vector.x == 0 ? index : 0;
            var y = vector.y == 0 ? index : 0;

            for (var i = 0; i < size; i++) {
                this.board[y][x] = slided_line[i];
                x += Math.abs(vector.x);
                y += Math.abs(vector.y);
            }
        }
      

        // select the forward/backward move in one row/col 
        this.slide_row_col = function (line, vector) {
            if (vector.isBackwards()) return this.slide_row_col_forward(line.reverse()).reverse();
            return this.slide_row_col_forward(line);
        }

        // GAME LOGIC METHOD
        // this is the method that performs the main move in a row/col
        this.slide_row_col_forward = function (line) {
            console.log(`this is the line inside the core  ${line.toString()}`);
            var i = 0;
            for (var i = 0; i < size - 1; i++) {

                // if the first is blank find the first non-blank
                var ib = i;
                while (ib<size && line[ib] == 0) {
                    ib++;
                }

                // if all are blank then nothing to do
                if(ib == size) return line;

                // found a non-blank
                if (ib != i){
                    // swap it with the first one
                    line[i] = line[ib];          
                    line[ib] = 0; 
                    // activate the movement flag               
                    this.there_was_a_movement = true;
                }

                // check for the next non-blank
                var j = ib + 1;
                while (j < size && line[j] == 0) {
                    j++;
                };

                // if reached the final then no more non-blank nothing to do
                if (j == size) return line;

                // beyond this point a non-blank was found
                // an equal number 
                if (line[i] == line[j]) {
                    // add it to the first one (the saem to multiplay by 2)
                    line[i] *= 2;
                    this.score += line[i];
                    line[j] = 0;
                    // activate the movement flag   
                    this.there_was_a_movement = true;
                    // move to the next cell, nothing more to do
                    continue;
                }

                // a different number
                // if they are not contiguous
                if (j != i + 1) {
                    // move the non-blank next to the first
                    line[i + 1] = line[j];
                    line[j] = 0;
                    // activate the movement flag  
                    this.there_was_a_movement = true;
                }
            }
            return line;
        }

        

    };


    the_board = new Gameboard(get2DArray(size, initial_value), size);
    the_board.add_number();
    the_board.add_number();
    the_board.draw_cells_DOM();

    $(document).keydown(function (event) {
        if (event.which > 36 && event.which < 41){
            the_board.move(select_vector(event.which));
            event.preventDefault();
        }
        
    });


});