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
    var option_text_class = "option-text"

    var menu_options = {
        "option-battleship"     :["Battleship",     games_path + battleship + "/" + battleship + ext,  option_text_class],
        "option-tictactoe"      :["Tic Tac Toe",    games_path + tictactoe + "/" + tictactoe + ext,    option_text_class],
        "option-2048"           :["2048",           games_path + g2048 + "/" + g2048 + ext,            option_text_class],
        "option-back"           :["Back to my page","https://ronmelcuba10.github.io",   ""]
    };

    addMenuItems();

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
