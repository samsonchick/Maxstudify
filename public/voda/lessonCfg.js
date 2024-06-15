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
		header: "Teplo govna",
		color: "#b5c3fd",
		spisok: {
			header: "You will learn",
			content: ["Говно", "Залупа", "Пенис"],
		},
	},
	test: {
		headerCategory: "Quiz",
		header: "MCQ",
		color: "#fdbcff",
		spisok: {
			header: "Каво",
			content: ["Дада", "Умом"],
		},
	}
}

let laba_data
if (window.location.href.includes("final")) { laba_data = JSON.parse(getCookie("u")).lessons[lessonName].laba.data }
else { laba_data = [0, 0, 0, 0, 0, 0, 0] }
 
let tasks = {
	test: {
		amount: 1,
		q_0: {
			question: "Я курю байрактар",
			answers: ["Да", "Нет"],
			correct: 0,
			explanation: "Пизда."
		}
	}
};
//coldwater_temp, coldwater_volume, hotwater_temp, hotwater_volume, COMPLETED, volume, water_temp