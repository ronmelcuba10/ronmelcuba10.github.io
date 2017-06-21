$(document).ready(function () {
		var levels = {
			"csharp-bar": 		["CSharp"	,"60","images/csharp.png"],
			"java-bar": 		["Java"		,"55","images/java.png"],
			"delphi-bar": 		["Delphi"	,"80","images/delphi.png"],
			"python-bar": 		["Python"	,"50","images/python.png"],
			"htmlcss-bar": 		["Html-CSS3","75","images/html5-css3.png"],
			"javascript-bar": 	["JS"		,"40","images/js.png"],
			"jquery-bar": 		["JQuery"	,"40","images/jquery.png"],
			"php-bar": 			["PHP"		,"30","images/php.png"],
			"laravel-bar": 		["Laravel"	,"40","images/laravel.png"],
			"angular-bar": 		["Angular"	,"55","images/angular.png"],
			"bootstrap-bar": 	["Bootstrap","70","images/Boostrap.png"],
			"mysql-bar": 		["MySQL"	,"50","images/mysql.png"]
		};


		$("#all-skills").append(function(){
			var elements = ""
			var value;
			Object.keys(levels).forEach(function(key) {
				value = levels[key];
				bar_name = value[0];
				bar_level = value[1];
				bar_image = value[2];
			    column ='<div class="col-md-1">' 
			    	+ 		'<div class="progress progress-bar-vertical">' 
					+ 			'<div class="progress-bar progress-bar-striped active skill-bar" '
					+ 					' id="' +  key + '"'
					+ 					' style= "height:' + bar_level + '%;"'
					+ 					' role="progressbar">' + bar_level 
					+ 			'</div>' 
					+ 		'</div>' 
					+ 		'<div class="image">' 
					+ 			'<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes top-space-up"'
					+ 					' src="'+ bar_image + '" />' 
					+ 		'</div>' 
					+ 		'<h6 class="text-center">' + bar_name + '</h6>' 
					+ 	'</div>';

					console.log(column)
	 			elements += column;
			});
			return elements
		});

		var main_skills = {
			"csharp-img": 		["CSharp"	,"images/csharp.png"],
			"python-img": 		["Python"	,"images/python.png"],
			"java-img": 		["Java"		,"images/java.png"],
			"delphi-img": 		["Delphi"	,"images/delphi.png"]
		};


		$("#skills-section").append(function(){
			var elements = ""
			var value;
			Object.keys(main_skills).forEach(function(key) {
				value = main_skills[key];
				skill_name = value[0];
				skill_image = value[1];
			    skills = 	'<div class="col-md-3 skill" id="' +  key + '">'
						+ 		'<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes" src="' + skill_image + '" /> '
						+ 		' <h3>' + skill_name + '</h3> ' 
						+ 	'</div>';
				elements += skills;
			});
			return elements
		});

		$("#csharp-img").fadeIn( 1500 );
		$("#python-img").fadeIn( 1500 );
		$("#java-img").fadeIn( 1500 );
		$("#delphi-img").fadeIn( 1500 );


		var hobbies = {
			"Family": 			"images/family.png",
			"Sports": 		 	"images/basketball.png",
			"Food &amp; Wine": 	"images/food_and_wine.png",
			"Video games": 		"images/video_game.png",
			"Learn &amp; Read": "images/glasses.png",
			"Lego blocks": 		"images/LEGO.png"
		};


		$("#hobbies").append(function(){
			var elements = '<div class="col-md-3"></div>'
			var value;
			Object.keys(hobbies).forEach(function(key) {
				hobby_image = hobbies[key];
			    hobb = 	'<div class="col-md-1 image">' 
			    	+ 		'<img alt="Responsive image" class="img-responsive img-circle center-block shadowboxes"'
			    	+ 		'src="' + hobby_image + '" />'
			    	+ 		'<h4>' + key + '</h4>' 
			    	+ '</div>';
				elements += hobb;
			});
			return elements
		});
	});
