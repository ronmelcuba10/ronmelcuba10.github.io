$( document ).ready(function() {

	var ships = 6;
	var size = 6;
	var enemy_board =  [['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0']];

	var home_board =   [['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0'],
						['0','0','0','0','0','0']];

	var home_div = document.getElementById("home-board");
	var pc_div = document.getElementById("pc-board");
	var clickable = "clickable";
	var new_cell = "new-cell";
	var images_path = "images/";
	var space = "space.png";
	var hit = "hit.png";
	var miss = "miss.png";
	var game_finished = false;
	
	
	/*
	var enemy_board = get2DArray(size);
	var home_board = get2DArray(size);
	console.log(home_board);
	create_boards();
	function get2DArray(the_size) {
		return Array(the_size).fill(0).map(x => Array(10).fill(0));
	}
	*/

	// initial board draw process
	draw_boards();
	// initial boards population
	fill_boards() 
	

	// draw both boards elements
	function draw_boards() {
		draw_board(pc_div);
		draw_board(home_div);
	}

	// draw the boards elements
	function draw_board(element) {
		for(var i=0; i<size; i++){
			this_row = create_row(element.id + "-" + i.toString());
			for(var j=0; j<size; j++){
				var id = element.id + "-cell_" + i.toString() + j.toString();
				this_row.appendChild(create_cell(element === pc_div,id));
			}
			element.appendChild(this_row);
		}
	}

	// creates an empty cell
	function create_cell(is_clickable, id) {
		// creates the div
		var cell_div = document.createElement("div");
		cell_div.className = "col-centered cell new-cell " + (is_clickable ? clickable : "");
		cell_div.id = id;
		// inserts a space image into the div
		cell_div.appendChild(create_image(id,"space.png"));
		return cell_div;
	}

	// creates a new image element
	function create_image(id,img_name) {
		var img = document.createElement("img");
		img.src = images_path + img_name;
		img.alt = img_name;
		img.id = "img-" + id;
		img.className = "img-responsive";
		return img;
	}

	// creates a row to insert cells
	function create_row(row_id) {
		var row_div = document.createElement("div");
		row_div.className = "row row-centered";
		row_div.id = row_id;
		return row_div;
	}

	// prepares the boards with ships
	function fill_boards() {
		fill_board(enemy_board);
		fill_board(home_board);
	}

	// prepares a board with ships
	function fill_board(board) {
		var this_ships = 1;
		console.log(typeof board);
		for (var i=0; i<ships; i++) {
			do{
				var x = Math.floor(Math.random() * 6);
				var y = Math.floor(Math.random() * 6);
			} while(board[x][y] != '0');
			board[x][y] = this_ships++;
		}
	}

	$(".cell").click(function () {
		// if the div clicked meets the following conditions then leave 
		if(game_finished) return;
        if (!$(this).hasClass(clickable)) return; // in the right board
        if (!$(this).hasClass(new_cell)) return; // in a new cell

		// once here remove the "non-clicked" class and process the cell
        $(this).removeClass(new_cell);
        var index = (this.id).indexOf("_") + 1;
        var x = parseInt((this.id).substring(index,index + 1));
        var y = parseInt((this.id).substring(index + 1,index + 2));
		var img = document.getElementById("img-" + this.id);

		// change the cell's image
		img.src = images_path + shot_a_board_cell(x,y,enemy_board);
    });

	// returns if the shot was a miss or a hit
    function shot_a_board_cell(x,y,board) {
    	var num = board[x][y];
    	board[x][y] = num == '0' ? miss : hit;
    	return board[x][y];
    };
});