$( document ).ready(function() {
	var ships = 6;
	var size = 6;
	var enemy_board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
	var home_board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
	var home_div = document.getElementById("home-board");
	var pc_div = document.getElementById("pc-board");
	var clickable = "clickable";
	var images_path = "images/";
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

	draw_boards();
	fill_boards();

	// draw both boards elements
	function draw_boards() {
		draw_board(pc_div);
		draw_board(home_div);
	}

	// draw the boards elements
	function draw_board(element) {
		for(var i=0; i<size; i++){
			this_row = create_row(element.id + "_" + i.toString());
			for(var j=0; j<size; j++){
				this_row.appendChild(create_cell(element === pc_div));
			}
			element.appendChild(this_row);
		}
	}

	// creates an empty cell
	function create_cell(is_clickable) {
		console.log(is_clickable);
		var cell_div = document.createElement("div");
		cell_div.className = "col-centered cell " + (is_clickable ? clickable : "");
		var img = document.createElement("img");
		img.src = images_path + "space.png";
		img.alt = "space";
		img.className = "img-responsive";
		cell_div.appendChild(img);
		return cell_div;
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
		console.log(board[0][0]);
		for (var i=0; i<ships; i++) {
			do{
				var x = Math.floor(Math.random(size) * 6);
				var y = Math.floor(Math.random(size) * 6);
			} while(board[x][y] != 0);
			board[x][y] = this_ships++;
		}
	}

	$(".cell").click(function () {
		if(game_finished) return;
        if (!$(this).hasClass(clickable)) return;
		console.log("clicked on clickable");
        }
    );
});