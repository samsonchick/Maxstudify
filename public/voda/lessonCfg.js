function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
let lessonName = "voda",
lessonLocation = [window.location.href, "Everyday Idioms: Enhancing Your English"],
lessList = ["theory", "test"],
foundament = {
	main: {
		grade: 0,
		progress: 0,
		progressMax: 50,
	},
	theory: {
		open: 1,
		grade: 0,
		progress: 0,
		progressMax: 20,
	},
	test: {
		open: 0,
		grade: 0,
		progress: 0,
		progressMax: 30,
		data: 0,
	},
},
contents = {
	theory: {
		headerCategory: "Theory",
		header: "English idioms",
		color: "#b5c3fd",
		spisok: {
			header: "You will learn",
			content: ["The importance and usage of idioms in everyday English, particularly how they differ from literal language.", "How to use common idioms in sentences, with specific examples provided for clarity.", "Learning Approach and Cultural Relevance."],
		},
	},
	test: {
		headerCategory: "Quiz",
		header: "Knowledge test",
		color: "#fdbcff",
		spisok: {
			header: "Brief information",
			content: ["This quiz is designed to test students' knowledge and understanding of common English idioms, their meanings, and their appropriate usage in context. By answering multiple-choice questions, students will reinforce their comprehension and recall of these idiomatic expressions."],
		},
	}
}

let laba_data
if (window.location.href.includes("final")) { laba_data = JSON.parse(getCookie("u")).lessons[lessonName].laba.data }
else { laba_data = [0, 0, 0, 0, 0, 0, 0] }
 
let tasks = {
	test: {
		amount: 10,  q_0: {
			question: "What does the idiom “A blessing in disguise” mean?",
			answers: ["A bad thing that seemed good at first", "A good thing that seemed bad at first", "Something very common", "A very expensive item"],
			correct: 1,
			explanation: "“A blessing in disguise” means a good thing that seemed bad at first."
		},
		q_1: {
			question: "Which idiom means “Good luck”?",
			answers: ["Call it a day", "Break a leg", "Hit the sack", "Get out of hand"],
			correct: 1,
			explanation: "“Break a leg” means “Good luck”."
		},
		q_2: {
			question: "What does “Beat around the bush” mean?",
			answers: ["To get something over with", "To avoid saying what you mean", "To stop working on something", "To joke with someone"],
			correct: 1,
			explanation: "“Beat around the bush” means to avoid saying what you mean."
		},
		q_3: {
			question: "Which idiom means “It's not complicated”?",
			answers: ["Get your act together", "It's not rocket science", "Speak of the devil", "Bite off more than you can chew"],
			correct: 1,
			explanation: "“It's not rocket science” means “It's not complicated”."
		},
		q_4: {
			question: "What does “Pull someone's leg” mean?",
			answers: ["To get upset", "To do a good job", "To joke with someone", "To go to sleep"],
			correct: 2,
			explanation: "“Pull someone's leg” means to joke with someone."
		},
		q_5: {
			question: "Which idiom means “To go to sleep”?",
			answers: ["Hit the sack", "Cut corners", "Make a long story short", "Miss the boat"],
			correct: 0,
			explanation: "“Hit the sack” means to go to sleep."
		},
		q_6: {
			question: "What does “Costs an arm and a leg” mean?",
			answers: ["Very expensive", "Very common", "Very rare", "Very easy"],
			correct: 0,
			explanation: "“Costs an arm and a leg” means very expensive."
		},
		q_7: {
			question: "Which idiom means “Tell something briefly”?",
			answers: ["Hang in there", "Make a long story short", "Go back to the drawing board", "Get out of hand"],
			correct: 1,
			explanation: "“Make a long story short” means to tell something briefly."
		},
		q_8: {
			question: "What does “Get your act together” mean?",
			answers: ["To calm down", "To slow down", "To work better or leave", "To joke with someone"],
			correct: 2,
			explanation: "“Get your act together” means to work better or leave."
		},
		q_9: {
			question: "Which idiom means “It's too late”?",
			answers: ["Cut somebody some slack", "Break the ice", "Miss the boat", "Under the weather"],
			correct: 2,
			explanation: "“Miss the boat” means it's too late."
		},
		q_10: {
			question: "What does “Under the weather” mean?",
			answers: ["Out of control", "Sick", "Avoid saying what you mean", "A big issue"],
			correct: 1,
			explanation: "“Under the weather” means sick."
		},
		q_11: {
			question: "Which idiom means “Something very rare”?",
			answers: ["Bite the bullet", "Once in a blue moon", "To get bent out of shape", "To make matters worse"],
			correct: 1,
			explanation: "“Once in a blue moon” means something very rare."
		},
		q_12: {
			question: "What does “Wrap your head around something” mean?",
			answers: ["To understand something complicated", "To joke with someone", "To stop working on something", "To spoil something"],
			correct: 0,
			explanation: "“Wrap your head around something” means to understand something complicated."
		},
		q_13: {
			question: "Which idiom means “The person we were just talking about showed up”?",
			answers: ["So far so good", "The best of both worlds", "Speak of the devil", "It's not rocket science"],
			correct: 2,
			explanation: "“Speak of the devil” means the person we were just talking about showed up."
		},
		q_14: {
			question: "What does “Time flies when you're having fun” mean?",
			answers: ["Everything is going wrong at once", "You don't notice how long something lasts when it's fun", "Nothing is entirely free", "Treat people fairly"],
			correct: 1,
			explanation: "“Time flies when you're having fun” means you don't notice how long something lasts when it's fun."
		}
	}
};
//coldwater_temp, coldwater_volume, hotwater_temp, hotwater_volume, COMPLETED, volume, water_temp