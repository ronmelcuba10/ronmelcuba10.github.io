$(document).ready(function () {

	var ships = 6;  // how many ships per board initially
	var size = 6;	// board size (size X size)

	var home_div = document.getElementById("home-board");
	var pc_div = document.getElementById("pc-board");
	var clickable = "clickable";
	var new_cell = "new-cell";
	var images_path = "images/";
	var sounds_path = "sounds/";
	var backgrounds_path = "background/";
	var hit_img = "hit.gif";
	var miss_img = "miss.png";
	var space_images = ["space1.png","space2.png","space3.png","space4.png","space5.png","space6.png","space7.png"];
	var backgrounds_images = ["bk1.jpg","bk2.jpg","bk3.jpg","bk4.jpg","bk5.jpg","bk6.jpg","bk7.jpg"];
	var ships_images = ["ship1.png","ship2.png","ship3.png","ship4.png","ship5.png","ship6.png","ship7.png","ship8.png"];
	var hit_sounds = ["exp1.mp3","exp2.mp3","exp3.mp3","exp4.mp3","exp4.mp3","exp5.mp3","exp6.mp3"];
	var miss_sounds = ["miss1.mp3","miss2.mp3","miss3.mp3","miss4.mp3","miss5.mp3"];
	var hit_cell = "H";
	var miss_cell = "M"; 
	var empty_cell = "0";
	var score_id = "score"
	var game_finished = false;
	var won = 0;
	var lost = 0;
	var enemy_board;
	var home_board;
	


	function Coordinate(x,y) {
		this.x = x;
		this.y = y;
	}

	function Game_board(board) {
		this.current_ships = size;
		this.board = board;

		// prepares a board with ships
		this.fill_board = function () {
			var this_ships = 1;
			for (var i = 0; i < ships; i++) {
				var coord = this.get_empty_cell(board);
				this.board[coord.x][coord.y] = this_ships++;
			}
		}

		// returns an empty cell to fill a new board
		this.get_empty_cell = function () {
			do {
				var x = my_random(size);
				var y = my_random(size);
			} while (this.board[x][y] != empty_cell);
			return new Coordinate(x, y);
		}

		// returns an cell that hasn't been shot, this methos is used for computer's moves
		this.get_non_shot_cell = function () {
			do {
				var x = my_random(size);
				var y = my_random(size);
			} while (this.board[x][y] == miss_cell || this.board[x][y] == hit_cell);
			return new Coordinate(x, y);
		}

		// returns the image name coresponding 
		this.shot_a_board_cell = function (x, y) {
			// get the current value in the cell
			var cell_board_value = this.board[x][y];
			// depending on the current cell value(cell_value) modify to the cell value: miss or hit
			this.board[x][y] = cell_board_value == empty_cell ? miss_cell : hit_cell;
			// returns the file name for the attribute (src) of the img DOM element
			if ((board[x][y]) == hit_cell) this.current_ships--;
			return board[x][y] == miss_cell ? miss_img : hit_img;
		};

		this.get_ships_coords = function () {
			var ships_left = this.current_ships;
			var coords = [];
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					if (ships_left == 0) return coords;
					var cell = this.board[i][j];
					if (cell == empty_cell || cell == miss_cell || cell == hit_cell) continue;
					ships_left--;
					coords.push(new Coordinate(i,j));
				}
			}
			return coords;
		}

		this.game_over = function () {
			return this.current_ships == 0;
		}

	}



	// initalize boards objects
	create_boards();
	// initial board draw process
	draw_boards_DOM();
	// initial boards population
	fill_boards()

	function my_random(top) {
		return Math.floor(Math.random() * top);
	}

	function play_sound(sounds) {
		var audio = new Audio( sounds_path + sounds[my_random(sounds.length)]);
		audio.play();
	}

	// creates the 2 boards arrays 	
	function create_boards() {
		enemy_board = new Game_board(get2DArray(size));
		home_board = new Game_board(get2DArray(size));
	}

	// creates a 2D array filled with '0'
	function get2DArray(the_size) {
		return Array(the_size).fill(empty_cell).map(x => Array(the_size).fill(empty_cell));
	}

	// draw both boards elements
	function draw_boards_DOM() {
		set_background_DOM();
		draw_board_DOM(pc_div);
		draw_board_DOM(home_div);
	}

	function show_ships_DOM() {
		show_ships_in_DOM(pc_div);
		show_ships_in_DOM(home_div);
	}


	function show_ships_in_DOM(div) {
		var board = div == pc_div ? enemy_board : home_board;
		var coords = board.get_ships_coords();
		for (var i = 0; i < coords.length; i++) {
			var img_element_id = "img-" + div.id + "-cell_" + coords[i].x + coords[i].y;
			var img_element = document.getElementById(img_element_id);
			console.log(img_element_id);
			img_element.src = images_path + ships_images[my_random(ships_images.length)];
			img_element.alt = "ship image";
		}
	}



	function set_background_DOM() {
		document.body.style.backgroundImage = `url('${backgrounds_path + backgrounds_images[my_random(backgrounds_images.length)]}')`;
    	document.body.style.backgroundSize = "100% auto";
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundPosition = "top center";
	}

	// draw the boards elements
	function draw_board_DOM(element) {
		for (var i = 0; i < size; i++) {
			this_row = create_row_DOM(element.id + "-" + i.toString());
			for (var j = 0; j < size; j++) {
				var id = element.id + "-cell_" + i.toString() + j.toString();
				this_row.appendChild(create_cell_DOM(element === pc_div, id));
			}
			element.appendChild(this_row);
		}
		update_ships_left_DOM(element);
	}



	// updates the ships left for the board related to the element passed as parameter
	function update_ships_left_DOM(element) {
		var is_home_board = element === home_div;
		// get the id
		var ship_left_id = is_home_board ? "home-ships-left" : "pc-ships-left";
		// get the ships left
		var ships_left = is_home_board ? home_board.current_ships : enemy_board.current_ships;
		// update the ships value
		var ships_left_element = document.getElementById(ship_left_id);
		ships_left_element.innerHTML = `Ship(s) left: ${ships_left}`;
	}

	function update_scores_DOM() {
		document.getElementById(score_id).innerHTML = `Won ${won} -- Lost ${lost}`;
	}

	// class for a new fresh cell in the board
	function new_cell_classes(is_clickable) {
		return "col-centered cell new-cell " + (is_clickable ? clickable : "");
	}

	// creates an empty cell
	function create_cell_DOM(is_clickable, id) {
		// creates the div
		var cell_div = document.createElement("div");
		cell_div.className = new_cell_classes(is_clickable);
		cell_div.id = id;
		// inserts a space image into the div
		cell_div.appendChild(create_image_DOM(id, space_images[my_random(5)]));
		return cell_div;
	}

	// clears a board
	function clear_board_cells_DOM(board_div,is_clickable) {
		// get all the cell from the board
		var div_cells = board_div.getElementsByClassName("cell");
		// for each cell do..
		for(var i=0; i<div_cells.length; i++) {
			// clear al the classes and assign only the new cell's classes
			div_cells[i].className = new_cell_classes(is_clickable);
			// get the image inside the div: it is only one
			var elements = div_cells[i].getElementsByTagName("img");
			// change its associated image
			elements[0].src = images_path + space_images[my_random(5)];
		}
	}

	// clears both boards
	function clear_boards_cells_DOM() {
		clear_board_cells_DOM(home_div,false); 	// not clickable
		clear_board_cells_DOM(pc_div,true); 	// clickable
	}

	// creates a new image element
	function create_image_DOM(id, img_name) {
		var img = document.createElement("img");
		img.src = images_path + img_name;
		img.alt = img_name;
		img.id = "img-" + id;
		img.className = "img-responsive";
		return img;
	}

	// creates a row to insert cells
	function create_row_DOM(row_id) {
		var row_div = document.createElement("div");
		row_div.className = "row row-centered";
		row_div.id = row_id;
		return row_div;
	}

	// prepares the boards with ships
	function fill_boards() {
		enemy_board.fill_board();
		home_board.fill_board();
	}

	// user clicks on the board
	$(".cell").click(function () {
		// if the div clicked meets the following conditions then leave 
		if (home_board.game_over() || enemy_board.game_over()) {
			alert("Game finished. Press OK to reset the board");
			reset_game();
			return;
		}
		if (!$(this).hasClass(clickable)) return; // in the right board
		if (!$(this).hasClass(new_cell)) return; // in a non shot cell

		// once here remove the "non-clicked" class and process the cell
		$(this).removeClass(new_cell);
		var index = (this.id).indexOf("_") + 1;
		var x = parseInt((this.id).substring(index, index + 1));
		var y = parseInt((this.id).substring(index + 1, index + 2));

		// change the cell's image
		var img_enemy = document.getElementById("img-" + this.id);
		var enemy_cell_image = enemy_board.shot_a_board_cell(x, y);
		img_enemy.src = images_path + enemy_cell_image;
		img_enemy.alt = enemy_cell_image;
		if(enemy_cell_image == miss_img){
			play_sound(miss_sounds)
		} else {
			play_sound(hit_sounds);

		}
		update_ships_left_DOM(pc_div);
		
		// quit here if computer lost
		if (enemy_board.game_over()) {
			alert("You have won the game!! Please reset the game");
			won++;
			update_scores_DOM();
			show_ships_DOM();
			return;
		}

		// computer's turn
		var coord = home_board.get_non_shot_cell();
		var div = document.getElementById("home-board-cell_" + coord.x + coord.y);
		$(div).removeClass(new_cell);
		
		// change the cell's image
		var img_home = document.getElementById("img-home-board-cell_" + coord.x + coord.y);
		var home_cell_image = home_board.shot_a_board_cell(coord.x, coord.y);
		img_home.src = images_path + home_cell_image;
		img_home.alt = home_cell_image;

		update_ships_left_DOM(home_div);

		if (home_board.game_over()) {
			alert("You lost the game!! Please reset the game");
			lost++;
			update_scores_DOM();
			show_ships_DOM();
		}
	});

	$("#restart-game-button").click( function(){
		reset_game();
	});

	function reset_game(){
		create_boards();
		fill_boards();
		set_background_DOM();
		clear_boards_cells_DOM();
	}

	
	

});