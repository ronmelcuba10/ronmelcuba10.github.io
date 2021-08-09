$(document).ready(function () {
	var images_path = "images/"
	var levels = {
		"csharp-bar": ["CSharp", "80", images_path + "csharp.png"],
		"java-bar": ["Java", "75", images_path + "java.png"],
		"delphi-bar": ["Delphi", "80", images_path + "delphi.png"],
		"python-bar": ["Python", "70", images_path + "python.png"],
		"htmlcss-bar": ["Html-CSS3", "75", images_path + "html5-css3.png"],
		"javascript-bar": ["JS", "80", images_path + "js.png"],
		"jquery-bar": ["JQuery", "70", images_path + "jquery.png"],
		"php-bar": ["PHP", "50", images_path + "php.png"],
		"laravel-bar": ["Laravel", "40", images_path + "laravel.png"],
		"angular-bar": ["Angular", "55", images_path + "angular.png"],
		"bootstrap-bar": ["Bootstrap", "70", images_path + "Boostrap.png"],
		"mysql-bar": ["MySQL", "70", images_path + "mysql.png"]
	};

	var profile_image_path = images_path + "profileimage.png"

	document.getElementById("profile-image").src = profile_image_path;


	$("#all-skills").append(function () {
		var elements = ""
		var value;
		Object.keys(levels).forEach(function (key) {
			value = levels[key];
			bar_name = value[0];
			bar_level = value[1];
			bar_image = value[2];
			column = '<div class="col-md-1">'
				+ '<div class="progress progress-bar-vertical">'
				+ '<div class="progress-bar progress-bar-striped active skill-bar" '
				+ ' id="' + key + '"'
				+ ' style= "height:' + bar_level + '%;"'
				+ ' role="progressbar">' + bar_level
				+ '</div>'
				+ '</div>'
				+ '<div class="image">'
				+ '<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes top-space-up"'
				+ ' src="' + bar_image + '" />'
				+ '</div>'
				+ '<h6 class="text-center">' + bar_name + '</h6>'
				+ '</div>';

			console.log(column)
			elements += column;
		});
		return elements
	});

	var main_skills = {
		"csharp-img": ["CSharp", "images/csharp.png"],
		"python-img": ["Python", "images/python.png"],
		//"java-img": ["Java", "images/java.png"],
		"delphi-img": ["Delphi", "images/delphi.png"]
	};


	$("#skills-section").append(function () {
		var elements = `<div class="col-md-3"></div>`;
		var value;
		Object.keys(main_skills).forEach(function (key) {
			value = main_skills[key];
			skill_name = value[0];
			skill_image = value[1];
			skills = '<div class="col-md-2 skill" id="' + key + '">'
				+ '<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes" src="' + skill_image + '" /> '
				+ ' <h3>' + skill_name + '</h3> '
				+ '</div>';
			elements += skills;
		});
		return elements + `<div class="col-md-3"></div>`;
	});

	$("#csharp-img").fadeIn(1500);
	$("#python-img").fadeIn(1500);
	$("#java-img").fadeIn(1500);
	$("#delphi-img").fadeIn(1500);


	var hobbies = {
		"Family": ["images/family.png", "#", ""],
		"Sports": ["images/basketball.png", "#", ""],
		"Food &amp; Wine": ["images/food_and_wine.png", "#", ""],
		"Video games": ["images/video_game.png", "#", ""],
		"Learn &amp; Read": ["images/glasses.png", "#", ""],
		"Lego blocks": ["images/LEGO.png", "#", ""],
		"My Games": ["images/TicTacToe.png", "games/games.html", "Games I've developed in JS"]
	};


	$("#hobbies").append(function () {
		var elements = "";
		var hobby;
		Object.keys(hobbies).forEach(function (key) {
			hobby = hobbies[key];
			hobby_image = hobby[0];
			hobby_source = hobby[1];
			hobby_title = hobby[2];
			hobb = `<div class="col-md-1 col-centered image">`
				+ `<a href="${hobby_source}">`
				+ `<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes"`
				+ `src="${hobby_image}" title="${hobby_title}"/>`
				+ '</a>'
				+ `<h4>${key}</h4>`
				+ '</div>';
			elements += hobb;
		});
		return elements
	});
});
