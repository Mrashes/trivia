var trivia = {
	//storage of questions.  Its an array so questions[x] is which question you have.
	questions:  [
		//video games first topic
		[
		{
			question: "Which of these games star a bear and a bird",
			answers: ["Banjo-Kazooie", "Crash Bandicoot", "Street Fighter III", "Lion King",],
			right: "Banjo-Kazooie"
		},
		{
			question: "This dragon starred in a hit video game franchise",
			answers: ["Crash Bandicoot", "Spyro", "Lara Croft", "Solid Snake",],
			right: "Spyro"
		},
		{
			question: "Which system came first?",
			answers: ["Playstation", "Dreamcast", "Genesis", "Xbox",],
			right: "Playstation"
		},
		{
			question: "This company started as a playing card manufacturer",
			answers: ["Nintendo", "Sony", "Microsoft", "Sega",],
			right: "Nintendo"
		},
		{
			question: "This company created 'The Game and Watch' handheld system",
			answers: ["Nintendo", "Sony", "Microsoft", "Sega",],
			right: "Nintendo"
		},
		{
			question: "This game series stars Nathan Drake",
			answers: ["Uncharted", "Dark Souls", "Pokemon", "Animal Crossing",],
			right: "Uncharted"
		},
		{
			question: "Who created the Legend of Zelda?",
			answers: ["Satoru Iwata", "David Cage", "Shigeru Miyamoto", "Yuji Naka",],
			right: "Shigeru Miyamoto"
		},
		{
			question: "Which company had the slogan 'Genesis does what Nintendon't'?",
			answers: ["Oculus", "Sony", "Microsoft", "Sega",],
			right: "Sega"
		},
		{
			question: "Which system came first?",
			answers: ["Xbox 360", "Wii U", "PS4", "Oculus",],
			right: "Xbox 360"
		},
		{
			question: "This fighting game series is famous for line 'Finish Him'",
			answers: ["Injustice", "Street Fighter", "Clay Fighter 63.5", "Mortal Kombat",],
			right: "Mortal Kombat"
		}
		],

		//second topic cant decide what it should be
		[{
			question: "Chicago?",
			answers: ["Chicago", "Chicago", "Chicago", "Chicago",],
			right: "Chicago"
		},],
		[{
			question: "I haven't decided on this topic",
			answers: ["Oh Really?", "Try chicago", "Or science", "Or TV shows",],
			right: "Oh Really?"
		},],
		[{
			question: "I haven't decided on this topic. either",
			answers: ["Oh Really?", "Comeon bro", "Dummy", "ugh",],
			right: "Oh Really?"
		},]
	],

	//declaration of variables

	usedQuestions: [],
	currentQuestion: "",
	timer: 10,
	score: 0,
	randomQ: [],
	referenceQ: [0,1,2,3],
	currentTopic: 0,

	//functions
	//random number generator (non-inclusive)
	randomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	//Draw new question
	newQuestion: function() {
		//choose which question
		trivia.currentQuestion = trivia.questions[trivia.currentTopic][trivia.randomNumber(0, trivia.questions[trivia.currentTopic].length)];
		if (trivia.currentQuestion.length === 0){
			alert("out of questions.  Sorry")
			console.log('newQuestion');
		}
		else {
			return trivia.currentQuestion
		}
	},

	printScore: function() {
		//on timer while I have the time taken out
		$('#timer').text(trivia.score);
	},

	//prints trivia question and answers
	printCurrentTrivia: function(){
		trivia.randomizeQuestion()
		$('#question').html("<h3 class=\"text-center\">" + trivia.currentQuestion.question + "</h3>");
		$('#answer1').text(trivia.currentQuestion.answers[trivia.randomQ[0]]);
		$('#answer2').text(trivia.currentQuestion.answers[trivia.randomQ[1]]);
		$('#answer3').text(trivia.currentQuestion.answers[trivia.randomQ[2]]);
		$('#answer4').text(trivia.currentQuestion.answers[trivia.randomQ[3]]);
	},

	printCorrect: function() {
		$("#replacer").html("<p>Congrats!  You got the question right! </p>");
		// setTimeout(trivia.printReset, 2900)
		setTimeout(trivia.nextQuestion, 3000)
	},

	printIncorrect: function() {
		$("#replacer").html("<p>Sorry, the correct answer was " + trivia.currentQuestion.right +"</p>");
		// setTimeout(trivia.printReset, 2900)
		setTimeout(trivia.nextQuestion, 3000)
	},			

	printTimeout: function() {
		$("#replacer").html("<p>Sorry, you ran out of time.  The correct answer was " + trivia.currentQuestion.right +"</p>");
		// setTimeout(trivia.printReset, 2900)
		setTimeout(trivia.nextQuestion, 3000)
	},

	// If I mess with page layout this will not work right so I'm leaving it for now
	printReset: function() {
		$("#replacer").html("<div class=\"col-lg-5\" ><div class=\"row\"><h3 class=\"text-center\">Question</h3></div><div id=\"question\" class=\"question\"></div></div><div class=\"col-lg-7\"><div class=\"panel panel-default\"><div class=\"panel-body text-center\" id=\"answer1\">Answer 1</div></div><div class=\"panel panel-default\"><div class=\"panel-body text-center\" id=\"answer2\">Answer2</div></div><div class=\"panel panel-default\"><div class=\"panel-body text-center\" id=\"answer3\">Answer 3</div></div><div class=\"panel panel-default\"><div class=\"panel-body text-center\" id=\"answer4\">Answer 4</div></div><div><div class=\"panel panel-default\"><div class=\"panel-body text-center\" id=\"timer\">timer</div></div></div></div>")

		// <button class=\"center-block btn btn-danger\" id=\"vg\">Video Games</button><button class=\"center-block btn btn-danger\" id=\"ot\">Other Topic</button>  Removed for clarity
	},

	printInit: function() {
		$("#replacer").html("<h3 class=\"text-center\" id=\"topic1\">Video Games</h3> <h3 class=\"text-center\" id=\"topic2\">Chicago</h3> <h3 class=\"text-center\" id=\"topic3\">Knots (broken)</h3> <h3 class=\"text-center\" id=\"topic4\">Nots (broken)</h3>")
	},

	printWin: function() {
		$("#replacer").html("<p class='text-center'>Congrats on finishing!  Your score was " + trivia.score + " out of " + trivia.usedQuestions.length + ".  Refresh to try again</p> <p class='text-center' id='win'>The game will reset in 10 seconds</p>");
		setTimeout(trivia.printUpdate1, 5000)
		setTimeout(trivia.printInit, 10000)
	},

	printUpdate1: function() {
		$("#win").text("The game will reset in 5 seconds")
	},

	//removes current question from the question pool
	removeQuestion: function() {
		trivia.usedQuestions.push(trivia.currentQuestion)
		trivia.questions[trivia.currentTopic].splice(trivia.questions[trivia.currentTopic].indexOf(trivia.currentQuestion), 1);		
	},

	nextQuestion: function() {
		if (trivia.questions[trivia.currentTopic].length > 0){
			trivia.printReset();
			trivia.newQuestion();
			trivia.printCurrentTrivia();
			trivia.printScore();
			trivia.removeQuestion();
			trivia.perSecond();
		}
		else {
			//have it create screen of score and time?
			trivia.printWin()
		}
	},

	point: function() {
		trivia.score += 1;
	},

	randomizeQuestion: function() {
		trivia.randomQ = [];
		trivia.referenceQ = [0,1,2,3];
		for (var i=0; i<4; i++){
			var a = trivia.randomNumber(0, trivia.referenceQ.length);
			trivia.randomQ.push(trivia.referenceQ[a]);
			trivia.referenceQ.splice(a, 1);
		}
	},

	checkAnswer: function(answer) {
		if (answer == trivia.currentQuestion.right) {
			console.log("winner!");
			trivia.point();
			trivia.printCorrect();
			// trivia.nextQuestion();
		}
		else {
			console.log("Wrong, next question")
			trivia.printIncorrect();
			// trivia.nextQuestion();
		}
	},

	clock: function() {
		trivia.timer -= 1
		trivia.printTime()
		
		if (trivia.timer <= 0) {
			trivia.clearTime();
			trivia.printTimeout();
		}
	},

	perSecond: function() {
		for (var i = 10; i>=1; i--) {
			if (trivia.timer===0){
				//find a way to break this all
			}
			else {
				trivia.printTime()
				setTimeout(trivia.clock, 1000*i);
			}
		}
	},

	printTime: function() {
		$('#timer').text(trivia.timer)
	},

	clearTime: function() {
		var id = window.setTimeout(function() {}, 0);

		while (id--) {
		    window.clearTimeout(id); // will do nothing if no timeout with id is present
		    console.log("cleared time")
		}

		trivia.timer = 10;
	},
}

//activating scripts
document.onload 
	trivia.printInit();

//topic selector
document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'topic1' ) {
	trivia.currentTopic = 0;
	trivia.nextQuestion();
  };
} );

document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'topic2' ) {
	trivia.currentTopic = 1;
	trivia.nextQuestion();
  };
} );

document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'topic3' ) {
	trivia.currentTopic = 2;
	trivia.nextQuestion();
  };
} );

document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'topic4' ) {
	trivia.currentTopic = 3;
	trivia.nextQuestion();
  };
} );

//answer check
document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'answer1' ) {
  	var answer = $('#answer1').text();
    trivia.clearTime();
	trivia.checkAnswer(answer);
  };
} );
document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'answer2' ) {
  	var answer = $('#answer2').text();
    trivia.clearTime();
	trivia.checkAnswer(answer);
  };
} );
document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'answer3' ) {
  	var answer = $('#answer3').text();
    trivia.clearTime();
	trivia.checkAnswer(answer);
  };
} );
document.body.addEventListener( 'click', function ( event ) {
  if( event.srcElement.id == 'answer4' ) {
  	var answer = $('#answer4').text();
    trivia.clearTime();
	trivia.checkAnswer(answer);
  };
} );