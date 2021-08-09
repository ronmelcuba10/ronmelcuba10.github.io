$(document).ready(function (){
    var games_path = "games/"
    var menu = document.getElementById("game-menu");
    var battleship = "battleship";
    var tictactoe = "tictactoe";
    var g2048 = "2048";
    var back = "back";
    var option_prefix = "option-";
    var option_battleship_id = option_prefix + battleship;
    var option_tictactoe_id = option_prefix + tictactoe;
    var option_2048_id = option_prefix + g2048;
    var option_back = option_prefix + back;
    var ext = ".html";
    var option_class = "option-text";
    var no_class = "";
    var games = ["Battleship", "Tic Tac Toe", "2048", "Tetris", "Back"];
    var index_URL = "https://ronmelcuba10.github.io";
    var menu_options = build_menu_options();

    addMenuItems();

    
    // build the menu variable
    function build_menu_options() {
        var options = {};
        games.forEach( function(game_name){
            console.log(`this is the game option ${game_name}`);
            var option_value = [game_name, path_to(game_name), class_to(game_name)];    // value is an ARRAY
            options[key_to(game_name)] = option_value;                                  // key -> value
            console.log(` key=${key_to(game_name)}  value=${option_value}`);
        });
        return options;
    }

    function path_to(name) {
        var clean_name = name.replace(/\s+/g,'').toLowerCase();
        var path = games_path + clean_name + "/" + clean_name + ext;
        return is_the_back_option(name) ? index_URL : path;
    }

    function class_to(name){
        return is_the_back_option(name) ? no_class : option_class;
    }

    function key_to(name) {
        return "option-" + name.replace(/\s+/g,'').toLowerCase();
    }

    function is_the_back_option(option) {
        return option == "Back";//games[games.length-1]"";
    }

    
    function addMenuItems(){

        Object.keys(menu_options).forEach(function (key) {
            option = menu_options[key];
			menu_text = option[0];
		    menu_link = option[1];
            text_class = option[2];
            

            // creating the li element
            var li = document.createElement("li");
            li.className = "list-group-item menu-option";
            li.id = key;

            console.log(`the id ${key}`);

            // creating the a element
            var a = document.createElement("a");
            a.href = menu_link;

            // creating the h3 element
            var h3 = document.createElement("h3");
            if (text_class != "") h3.className = text_class;
            h3.innerHTML = menu_text;
            a.appendChild(h3);
            li.appendChild(a)
            menu.appendChild(li);
        });
    }
    
});
