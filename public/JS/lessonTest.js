lessonName = `${lessonName}/test`, lessonNameL = lessonName.split("/"),
lessonLocation = [window.location.href, `${contents[lessonNameL[1]].headerCategory}: ${lessonLocation[1]}`];
let main = () => {
	let onload = 1,
	ontest = 0,
	onSideMenu = 0
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	function shuffle(arr) { return arr.map(i => [Math.random(), i]).sort().map(i => i[1]) }
	let list = window.location.search,
	parameters = new URLSearchParams(list),
	importUserdata = parameters.get("data");

	window.addEventListener("load", () => {
		document.getElementById("body").style.backgroundColor = "#eadcff"
		interface.menuEntryAdaptive()
		bobatron.scanner()
		cAud.start()
		init()
		if (importUserdata) {
			window.location.href = window.location.href.replace(/\/*/g, '')
		}
		else {
			setTimeout(() => {
				userdataControl.locationIssuesCheck()
			}, 1000)
		}	
	})

	let init = () => {
		window.addEventListener("resize", () => {
			interface.menuEntryAdaptive()
			bobatron.scanner()
		})

		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 0) { document.getElementById("header").style.zIndex = 2 }
			else { document.getElementById("header").style.zIndex = 0 }
			if (window.pageYOffset > 0 && onload == 1) { window.scrollTo(0, 0) }
		})

		document.getElementById("burger").onclick = () => {
			if (onSideMenu == 0) {
				for (let i of [document.getElementById("main_screen"), document.getElementById("side_menu")]) {
					i.style.transitionDuration = "0.3s"
				}
				interface.menuEntrySwitch("main_screen", "side_menu")
				document.getElementById("burger").classList.add("arrow_left_b")
				document.getElementById("body").style.overflow = "overlay";
				onSideMenu = 1
			}
			else {
				interface.menuEntrySwitch("side_menu", "main_screen")
				document.getElementById("burger").classList.remove("arrow_left_b")
				document.getElementById("body").style.overflow = "hidden"
				onSideMenu = 0
			}
		}

		document.getElementById("button_goback").onclick = () => {
			interface.redirect("../", ["menu", ""], "show")
		}

		document.getElementById("microlaba_header_icon").onclick = () => {
			interface.redirect("../../", ["menu", ""], "show")
		}
	}

	let userdataControl = {
		write: (c) => {
			document.cookie = `u=${encodeURIComponent(JSON.stringify(userdata))}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
			cAud.log(`write -> ${document.cookie}`)
			if (c == "stAnim") { userdataControl.alright("stAnim") }
		},
		locationIssuesCheck: () => {
			try {
				let content = `
					<div class="flex flex_alignitems_center flex_gap_10" style="width: 100%;">
						<div class="icon_warning bobatron" Bt-CM="0.5"></div>
						<h3>Внимание!</h3>
					</div>
				`
				let u = JSON.parse(getCookie("u"))
				cAud.log("locationIssuesCheck -> started")
				function check() { return u.profile.location[0] != "menu" && u.profile.location[0] != window.location.href }
				function check2() { return u.lessons[lessonNameL[0]][lessonNameL[1]].open == 0 }
				if (check()) {
					interface.horisScroll("microlaba_big_logo", "location_issues_wrapper", -100, 0)
					content += `
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Похоже, что вы не закрыли урок <span style="font-weight: bold">«${u.profile.location[1]}»</span>.</h4>
							<button class="bobatron button_go" Bt-CM="0.7" id="location_issues_goback" style="width: 100%;">Вернуться<div class="arrow_right_b"></div></button>
						</div>
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Не рекомендуется открывать несколько вкладок Микролабы одновременно.</h4>
							<button class="bobatron button_warning" Bt-CM="0.7" id="location_issues_ignore" style="width: 100%;">Проигнорировать<div class="arrow_right_b"></div></button>
						</div>
					`
					cAud.log("locationIssuesCheck -> location issues! (1)")
					document.getElementById("location_issues_wrapper").innerHTML = content					
					document.getElementById("location_issues_goback").onclick = () => {
						window.location = u.profile.location[0]
					}
					document.getElementById("location_issues_ignore").onclick = () => {
						document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
						interface.horisScroll("location_issues_wrapper", "microlaba_big_logo", -100, 0)
						userdata = u
						userdata.profile.location = lessonLocation
						userdataControl.write()
						setTimeout(() => { document.getElementById("location_issues_wrapper").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s") }, 410)
						setTimeout(() => { userdataControl.locationIssuesCheck() }, 1200)
					}
				}
				else if (check2()) {
					interface.horisScroll("microlaba_big_logo", "location_issues_wrapper", -100, 0)
					content += `
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Похоже, что урок <span style="font-weight: bold">«${lessonLocation[1]}»</span> пока вам недоступен.</h4>
							<button class="bobatron button_go" Bt-CM="0.7" id="location_issues_goback" style="width: 100%;">Главная страница<div class="arrow_right_b"></div></button>
						</div>
					`
					cAud.log("locationIssuesCheck -> location issues! (2)")
					document.getElementById("location_issues_wrapper").innerHTML = content
					document.getElementById("location_issues_goback").onclick = () => {
						document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
						interface.horisScroll("location_issues_wrapper", "microlaba_big_logo", -100, 0)
						userdata = u
						userdata.profile.location = ["menu", ""]
						userdataControl.write()
						window.location = "../../"
					}
				}
				else {
					cAud.log("locationIssuesCheck -> location ok!")
					userdata = u
					userdata.profile.location = lessonLocation
					userdataControl.write()
					userdataControl.read("stAnim")
				}
			}
			catch(e) { cAud.log(e) }
		},
		read: (c) => {
			try {
				let u = JSON.parse(getCookie("u"))
				userdata.profile = u.profile
				userdata.lessons = u.lessons
				if (userdata.lessons[lessonNameL[0]][lessonNameL[1]]) {
					try {
						cAud.log(`load -> success!`)
					}
					catch(e) {
						cAud.log(`load -> fail!`)
					}
				}
				else {
					cAud.log(`load -> no-data!`)
				}
				if (c == "stAnim") { userdataControl.alright("stAnim") }
			}
			catch(e) {
				cAud.log(e)
				console.log(e)
				//window.location.href = location.host;
			}
		},
		alright: (c) => {
			document.getElementById("main_header").innerHTML = lessonLocation[1]
			document.getElementById("header_username").innerHTML = userdata.profile.username
			document.getElementById("header_ava").setAttribute("class", `${userdata.profile.ava} small_avatar`)
			let k = userdata.lessons[lessonNameL[0]], b = k[lessonNameL[1]]
			interface.lessonStatsBlockCreate(`lesson_stats`, lessonNameL[1], contents[lessonNameL[1]].headerCategory, contents[lessonNameL[1]].header, contents[lessonNameL[1]].color)
			interface.lessonStats(`main`, k.main.grade, k.main.progress, k.main.progressMax)
			interface.lessonStats(lessonNameL[1], b.grade, b.progress, b.progressMax)
			if (c == "stAnim") { setTimeout (() => { interface.loadscreen("startup") }, 0)}
			testHandler.testLaunch()	
			bobatron.scanner()
			document.title = `Maxstudify | ${contents[lessonNameL[1]].header}`
			document.getElementById("body").style.overflow = "hidden"
		},
		lessonProgressing: (score) => {
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			userdata.lessons[lessonNameL[0]].main.progress += score
			k.progress += score
			cAud.log(`lessonProgressing -> scored +${score}`)			
			if (k.progress == k.progressMax) { 
				try { 
					userdata.lessons[lessonNameL[0]][lessList[lessList.indexOf(lessonNameL[1]) + 1]].open = 1 
					cAud.log(`lessonProgressing -> next lesson opened`)
				}
				catch(e) { cAud.log(`lessonProgressing -> no next lesson`) }
			}
			userdataControl.write()
		},
		gradeProgressing: (grade) => {
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			k.grade = grade


			userdata.lessons[lessonNameL[0]].main.grade = grade


			cAud.log(`gradeProgressing -> scored ${grade}`)
			userdataControl.write()
		}
	}

	let testHandler = {
		testLaunch: () => {
			if (userdata.lessons[lessonNameL[0]][lessonNameL[1]].data == 0) {
				cAud.log(`testLaunch -> first launch`)
				let question_count = 0, order = [], where = 0, passed = 0, answers = []; 
				while (true) {
					if (tasks[lessonNameL[1]][`q_${question_count}`]) { 
						question_count++
						answers.push(-1)
					}
					else { break }
				}
				for (let i = 0; i < question_count; i++) { order.push(i) }
				order = shuffle(order)
				order = order.slice(0, tasks[lessonNameL[1]].amount)
				answers = answers.slice(0, tasks[lessonNameL[1]].amount)
				cAud.log(`testLaunch -> order ${order}`)
				console.log(order)
				userdata.lessons[lessonNameL[0]][lessonNameL[1]].data = [order, where, answers]
				userdataControl.write()
			}
			testHandler.testRender(userdata.lessons[lessonNameL[0]][lessonNameL[1]].data[1])
			testHandler.testDashboard(tasks[lessonNameL[1]].amount)
			testHandler.testDashboardUpdate()
		},
		lastCount: () => {
			let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data, l = 0
			for (let i = 0; i < data[2].length; i++) { 
				if (data[2][i] != -1) { l++ }
			}
			return l
		},
		testHeader: (num) => {
			let header = document.getElementById("test_window_header")
			header.innerHTML = `
			<h4>Question ${num + 1}</h4>
			<h4>${testHandler.lastCount()}/${tasks[lessonNameL[1]].amount} completed</h4>`
		},
		testRender: (num) => {
			//[0 order, 1 where, 2 answers]
			let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data, q_id = data[0][num], 
			question = tasks[lessonNameL[1]][`q_${q_id}`], html_cont = document.getElementById("test_content"), buttons = "", content
			for (let i = 0; i < question.answers.length; i++) { buttons += `<button class="test_answer_button bobatron" Bt-CM="0.7">${question.answers[i]}</button>`	}
			testHandler.testHeader(num)
			content = `
			<h3 align="center">${question.question}</h3>
			<div class="flex flex_justify_center flex_gap_10" style="flex-wrap: wrap;">${buttons}</div>
			<button id="test_check_button" class="bobatron" Bt-CM="0.7" style="opacity: 0; pointer-events: none">Check</button>
			`
			html_cont.innerHTML = content
			testHandler.testNavigator(num)
			let answerButttons =  document.getElementsByClassName("test_answer_button")
			let paint = (n, q_i) => {
				let correct = tasks[lessonNameL[1]][`q_${q_i}`].correct
				if (n != correct) { answerButttons[n].style.backgroundColor = "#ff4e4e" }
				answerButttons[correct].style.backgroundColor = "#64ff5d"
			}
			let answ = -1
			if (data[2][num] == -1) {
				for (let i = 0; i < question.answers.length; i++) {
					answerButttons[i].onclick = () => {
						for (let i = 0; i < question.answers.length; i++) { answerButttons[i].style.backgroundColor = "" }
						answerButttons[i].style.backgroundColor = "#b7b7b7"
						answ = i
						document.getElementById("test_check_button").style.opacity = "1"
						document.getElementById("test_check_button").style.pointerEvents = ""
						console.log(data[2])
					}
				}
				document.getElementById("test_check_button").onclick = () => {
					data[2][num] = answ
					paint(data[2][num], q_id)
					testHandler.testHeader(num)
					testHandler.testDashboardUpdate()
					console.log(data)
					userdataControl.write()
					let d = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
					userdataControl.lessonProgressing(d.progressMax / tasks[lessonNameL[1]].amount)
					let k = userdata.lessons[lessonNameL[0]], kb = k[lessonNameL[1]]
					interface.lessonStats(lessonNameL[1], kb.grade, kb.progress, kb.progressMax)
					interface.lessonStats("main", k.main.grade, k.main.progress, k.main.progressMax)
					document.getElementById("test_check_button").style.opacity = "0"
					document.getElementById("test_check_button").style.pointerEvents = "none"
					setTimeout(() => {
						document.getElementById("test_check_button").style.display = "none"
						testHandler.testExplanatation(num)
						bobatron.scanner()
					}, 210)
					for (let i = 0; i < question.answers.length; i++) { answerButttons[i].style.pointerEvents = "none" }
					testHandler.testNavigator(num)
				}
			}
			else {
				paint(data[2][num], q_id)
				for (let i = 0; i < question.answers.length; i++) { answerButttons[i].style.pointerEvents = "none" }
				testHandler.testExplanatation(num)
				document.getElementById("test_check_button").style.display = "none"
			}
			document.getElementById("test_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px`
			bobatron.scanner()
		},
		testExplanatation: (num) => {
			let color, html_cont = document.getElementById("test_content"),
			data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data
			if (data[2][num] == tasks[lessonNameL[1]][`q_${data[0][num]}`].correct) { color = `#d9ffcf`}
			else { color = `#fae4e4`}
			html_cont.innerHTML += `
			<div class="test_explanation_completed bobatron" id="test_explanation_" style="background-color: ${color}; opacity: 0; transition-duration: 0.3s">
				<h3>Explanation</h3>
				<p>${tasks[lessonNameL[1]][`q_${data[0][num]}`].explanation}</p>
			</div>`
			setTimeout(() => { document.getElementById("test_explanation_").style.opacity = 1 }, 100)
		},
		testDashboard: (num) => {
			let content = ""
			for (let i = 0; i < num; i++) { content += `<button class="test_selector_button bobatron" Bt-CM="0.6"><span>${i + 1}</span></button>` }
			content = `
			<div class="flex flex_column" style="gap: 5px">
				<h4>Question selection</h3>
				<div class="flex flex_gap_10" style="flex-wrap: wrap;">${content}</div>
			</div>`
			document.getElementById("lessonStatsBlockCreate").innerHTML += content
			for (let i = 0; i < num; i++) {
				document.getElementsByClassName("test_selector_button")[i].onclick = () => {
					testHandler.testSwitcher(i) 
				}
			}
		},
		testDashboardUpdate: () => {
			let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data,
			button = document.getElementsByClassName("test_selector_button")
			for (let i = 0; i < tasks[lessonNameL[1]].amount; i++) {
				button[i].setAttribute("class", "test_selector_button bobatron")
				button[i].style.fontFamily = "Inter-Medium"
				button[i].style.fontSize = "20px"
				//button[i].children[0].style.filter = ""
				if (data[2][i] != -1) {
					let correct = tasks[lessonNameL[1]][`q_${data[0][i]}`].correct
					if (data[2][i] != correct) { button[i].classList.add("test_button_red") }
					else { button[i].classList.add("test_button_green") }
				}
				else { button[i].classList.add("test_button_gray") }
			}
			button[data[1]].style.fontFamily = "Inter-Bold"
			button[data[1]].style.fontSize = "26px"
			//button[data[1]].children[0].style.filter = "drop-shadow(4px 4px 9px #000000)"
		},
		testNavigator: (num) => {
			let navbar = document.getElementById("test_navigator"), content,
			data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data
			content = `
			<div class="flex flex_gap_10" style="width: 100%; justify-content: space-between">
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_go_back" style="width: fit-content; justify-content: flex-start"><div class="arrow_left_b"></div></button>
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_end" style="width: fit-content">Finish</button>
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_go_next" style="width: fit-content"><div class="arrow_right_b"></div></button>
			</div>
			`
			navbar.innerHTML = content
			if (data[1] - 1 >= 0) { document.getElementById("test_navigator_go_back").onclick = () => { testHandler.testSwitcher(num - 1) } }
			else { 
				document.getElementById("test_navigator_go_back").style.opacity = 0 
				document.getElementById("test_navigator_go_back").style.pointerEvents = "none"
			}
			if (data[1] + 1 < tasks[lessonNameL[1]].amount ) { document.getElementById("test_navigator_go_next").onclick = () => { testHandler.testSwitcher(num + 1) } }
			else {
				document.getElementById("test_navigator_go_next").style.opacity = 0 
				document.getElementById("test_navigator_go_next").style.pointerEvents = "none"
			}
			if ((tasks[lessonNameL[1]].amount - testHandler.lastCount()) == 0) { document.getElementById("test_navigator_end").onclick = () => { interface.lessonComplete() } }
			else { 
				document.getElementById("test_navigator_end").style.opacity = 0 
				document.getElementById("test_navigator_end").style.pointerEvents = "none"
			}
			
		},
		testSwitcher: (to) => {
			userdata.lessons[lessonNameL[0]][lessonNameL[1]].data[1] = to
			userdataControl.write()
			document.getElementById("test_content").style.transitionDuration = "0.4s"
			document.getElementById("test_content").style.transform = "translateY(30px)"
			document.getElementById("test_content").style.opacity = "0"
			testHandler.testDashboardUpdate()
			setTimeout(() => {
				testHandler.testRender(to)
				document.getElementById("test_content").style.transform = ""
				document.getElementById("test_content").style.opacity = ""
				setTimeout(() => { document.getElementById("test_content").style.transitionDuration = "0s"}, 410)
			}, 400) 
		}
	}

	let interface = {
		lessonComplete: () => {
			let gradeCalc = () => {
				let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data, trueAnswers = 0, gr
				for (let i = 0; i < tasks[lessonNameL[1]].amount; i++) { 
					if (data[2][i] == tasks[lessonNameL[1]][`q_${data[0][i]}`].correct) { trueAnswers++ }
				}
				gr = Math.round(trueAnswers / tasks[lessonNameL[1]].amount * 10) 
				if (gr == 0) { return 1 }
				else { return gr }
 			}
 			console.log(gradeCalc())
			interface.horisScroll("microlaba_big_logo", "lesson_complete_wrapper", -100, 0)
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			userdataControl.lessonProgressing(k.progressMax - k.progress)
			if (k.grade == 0) { userdataControl.gradeProgressing(gradeCalc()) }
			interface.loadscreen("openExp")
			let grade = userdata.lessons[lessonNameL[0]][lessonNameL[1]].grade, grade_c, grade_cFg
			if (grade >= 0 && grade < 5) { grade_c = `#FF2B2B`; grade_cFg = `#fae4e4`}
			else if (grade > 4 && grade < 8) { grade_c = `#FFCE6A`; grade_cFg = `#fefcda` }
			else { grade_c = `#37DB27`; grade_cFg = `#e9ffe3`}
			content = `
			<h1>Quiz completed!</h1>
			<br>
			<div class="flex bobatron" style="justify-content: center; align-items: center; height: 200px; width: 300px; background-color: ${grade_cFg}">
				<div class="pie animate" style="--p: ${grade / 10 * 100}; --c: ${grade_c}">${grade}</div>
			</div>
			`
			let b
			if (lessList[lessList.indexOf(lessonNameL[1]) + 1]) {
				b = lessList[lessList.indexOf(lessonNameL[1]) + 1]
				content += `
				<div class="flex flex_gap_10" style="width: 100%">
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_back" style="width: 100%; justify-content: flex-start"><div class="arrow_left_b"></div>Menu</button>
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_next" style="width: 100%">Next<div class="arrow_right_b"></div></button>
				</div>
				<div class="flex flex_alignitems_center flex_gap_10" style="width: 100%">
					<div class="bobatron" Bt-CM="0.5" style="min-height: 50px; min-width: 50px; background-size: contain; background-image: url(SVG/icon_${b}.svg); background-color: ${contents[b].color}"></div>
					<h4 style="width: 100%">Next<br><span style="font-weight: bold">${contents[b].header}</span></h4>
				</div>
				`
			}
			else {
				content += `
				<div class="flex flex_column" style="gap: 5px; width: 100%">
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_back" style="width: 100%; justify-content: flex-start"><div class="arrow_left_b"></div>Menu</button>
					<h4 style="width: 100%">Congratulations! You have completed this course.</h4>
				</div>
				`
			}
			document.getElementById("lesson_complete_wrapper").innerHTML = content
			document.getElementById("lesson_complete_go_back").onclick = () => { 
				document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
				interface.horisScroll("lesson_complete_wrapper", "microlaba_big_logo", -100, 0)
				setTimeout(() => {
					interface.redirect("../", ["menu", ""], "")
				}, 1000)
			}
			try {
				document.getElementById("lesson_complete_go_next").onclick = () => { 
					document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
					interface.horisScroll("lesson_complete_wrapper", "microlaba_big_logo", -100, 0)
					setTimeout(() => {
						interface.redirect(`${ window.location.href.replace(lessonNameL[1], b) }`, [`${window.location.href.replace(lessonNameL[1], b)}`, `${b}`], "")
					}, 1000)
				}
			}
			catch (e) {}
		},
		redirect: (location, cookieLocation, loadscreen) => {
			cookieLocation[1] = "loading"
			userdata.profile.location = cookieLocation
			userdataControl.write()
			let timeout = 0
			if (loadscreen == "show") { interface.loadscreen("openExp"); timeout = 2200 }
			setTimeout(() => {
				window.location = location;
				let timer = setInterval(() => { 
					if (JSON.parse(getCookie("u")).profile.location[1] != "loading") { 
						userdataControl.locationIssuesCheck()
						cAud.log("redirect -> loading")
						clearInterval(timer)
					} 
				}, 300)
			}, timeout)
		},
		menuEntryAdaptive: () => {
			let side_menu = document.getElementById("side_menu"),
			main_screen = document.getElementById("main_screen"),
			burger = document.getElementById("burger"),
			menuContainer = document.getElementsByClassName("menu_container")[0];
			setTimeout(() => { document.getElementById("test_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px` }, 10)
			if (window.innerWidth < 860) {
				for (let i of document.getElementsByClassName("menu_entry")) {
					i.style.width = "100%"
					i.style.maxWidth = "100%"
				}
				if (onSideMenu == 0) {
					side_menu.style.height = "100%"
					side_menu.style.display = "none"
					side_menu.style.opacity = 0
					side_menu.style.transform = "translateY(30px)"
				}
				else {
					main_screen.style.height = "100%"
				}
				side_menu.style.width = "100%"
				side_menu.style.maxWidth = "100%"
				burger.style.marginLeft = "0px"
				burger.style.opacity = "1"
			}
			else {
				onSideMenu = 0
				document.getElementById("body").style.overflow = "hidden"
				for (let i of document.getElementsByClassName("menu_entry")) {
					i.style.width = "330px"
					i.style.maxWidth = "330px"
				}
				side_menu.style.width = "330px"
				side_menu.style.maxWidth = "330px"
				side_menu.style.height = window.innerHeight - 141 + "px"
				side_menu.style.display = "flex"
				side_menu.style.transform = "translateY(0)"
				side_menu.style.transitionDuration = "0s"
				side_menu.style.opacity = "1"

				main_screen.style.transitionDuration = "0s"
				main_screen.style.display = "flex"
				main_screen.style.transform = "translateX(0)"
				main_screen.style.opacity = "1"
				burger.style.marginLeft = "-46px"
				burger.style.opacity = "0"
				burger.classList.remove("arrow_left_b")
			}
			let heightWithoutHeader = window.innerHeight - document.getElementById("header").offsetHeight - 41
			main_screen.style.height = heightWithoutHeader + "px"
		},
		loadscreen(state) {
			let loaderWindow = document.getElementById("loader_window"), loaderWrapper = document.getElementById("loader_wrapper"),
			buttonsHeader = document.getElementById("buttons_header"), microlabaHeader = document.getElementById("microlaba_header")
			if (state == "startup") {
				document.getElementById("body").setAttribute("style", "transition-duration: 0.3s; background-color: #eadcff")
				buttonsHeader.style.transitionDelay = "0.1s"
				loaderWindow.style.transitionDuration = "1.5s"
				if (document.getElementById("header").offsetHeight > 100) { loaderWindow.style.transform = `translateY(-${loaderWindow.offsetHeight - 130}px)` }
				else { loaderWindow.style.transform = `translateY(-${loaderWindow.offsetHeight - 53}px)` }
				document.getElementById("microlaba_big_logo").style.transitionDelay = "0s"
				document.getElementById("microlaba_big_logo").style.opacity = "0"
				setTimeout(() => {
					loaderWindow.style.transitionDuration = "0s"
					loaderWrapper.style.display = "none"
					microlabaHeader.style.opacity = "1"
					buttonsHeader.style.opacity = "1"
					microlabaHeader.style.transform = "translateY(0px)"
					buttonsHeader.style.transform = "translateY(0px)"
					document.getElementsByClassName("menu_container")[0].style.opacity = "1"
					document.getElementsByClassName("menu_container")[0].style.transform = "translateY(0px)"
					onload = 0
				}, 1200)
				setTimeout(() => {
					document.getElementById("body").style.transitionDuration = "0s"
					document.getElementsByClassName("menu_container")[0].style.transitionDuration = "0s"
				}, 2500)
				setTimeout(() => {
					document.getElementsByClassName("header_white_plate_shadow")[0].style.opacity = "1"
				}, 850)
			}
			else if (state == "openExp") {
				microlabaHeader.style.opacity = "0"
				microlabaHeader.style.transform = ""
				buttonsHeader.style.transitionDelay = "0s"
				buttonsHeader.style.opacity = "0"
				buttonsHeader.style.transform = ""
				document.getElementsByClassName("menu_container")[0].style.transitionDuration = "0.4s"
				document.getElementsByClassName("menu_container")[0].style.opacity = "0"
				document.getElementsByClassName("menu_container")[0].style.transform = "translateY(30px)"
				document.getElementsByClassName("header_white_plate_shadow")[0].style.opacity = "0"
				setTimeout(() => {
					window.scrollTo(0, 0)
				}, 350)
				setTimeout(() => {
					loaderWrapper.style.display = "flex"
					bobatron.scanner()
					loaderWindow.style.transitionDuration = "1.5s"
				}, 400)
				setTimeout(() => {
					loaderWindow.style.transform = "translateY(0)"
					document.getElementById("microlaba_big_logo").style.transitionDelay = "0.5s"
					document.getElementById("microlaba_big_logo").style.opacity = "1"
					onload = 1
				}, 450)
				setTimeout(() => {
					document.getElementById("body").setAttribute("style", "transition-duration: 0.3s; background-color: #FFFFFF")
				}, 1200)
			}
		},
		lessonStatsBlockCreate(mainTarget, target, headerCategory, header, color) {
			try {
				cAud.log(`lessonStatsBlockCreate -> ${target} ${headerCategory} ${header} ${color}`)
				let content = `
				<div class="flex flex_gap_10 flex_column" id="lessonStatsBlockCreate">
					<div class="flex flex_gap_10">
						<div class="menu_entry_mini_inside_window_icon bobatron" Bt-CM="0.7" style="background-image: url(SVG/icon_${target}.svg); background-color: ${color}"></div>
						<div class="flex flex_column">
							<h4>${headerCategory}</h4>
							<h3>${header}</h3>
						</div>
					</div>
					<div class="progress bobatron" Bt-CM="0.7" style="margin: 0">
						<span style="z-index: 1" id="${target}_progress_percent">0%</span>
						<div class="progress_green" id="${target}_progress_green"></div>
					</div>
				</div>
				`
				document.getElementById(mainTarget).innerHTML = content
			}
			catch (e) { cAud.log(`lessonStatsBlockCreate -> ${target} FAIL!`) }
		},
		lessonStats: (target, grade, progress, progressMax) => {
			try {
				cAud.log(`lessonStats -> ${target} ${grade} ${progress} ${progressMax}`)
				let green = document.getElementById(`${target}_progress_green`), percent_c = document.getElementById(`${target}_progress_percent`),
				percent = Math.trunc(progress / progressMax * 100)
				green.style.width = `${percent}%`
				percent_c.innerHTML = `${percent}%`
				if (percent > 0) {
					percent_c.style.color = `#000000`
				}
			}
			catch (e) { cAud.log(`lessonStats -> ${target} FAIL!`) }
		},
		horisScroll: (from, to, pos1, pos2) => {
			document.getElementById(from).style.transform = `translateX(${pos1}px)`
			document.getElementById(from).style.opacity = "0"
			setTimeout(() => {
				document.getElementById(from).style.display = "none"
				document.getElementById(to).style.display = "flex"
			}, 350)
			setTimeout(() => {
				document.getElementById(to).style.transform = `translateX(${pos2}px)`
				document.getElementById(to).style.marginTop = "0"
				document.getElementById(to).style.opacity = "1"
				bobatron.scanner()
			}, 400)
		},
		menuEntrySwitch: (from, to) => {
			let a = document.getElementById(from), b = document.getElementById(to)
			a.style.transitionDuration = "0.4s"
			a.style.opacity = "0"
			a.style.transform = "translateY(30px)"
			setTimeout(() => {
				a.style.display = "none"
				a.style.transitionDuration = "0s"
				b.style.display = "flex"
				bobatron.scanner()
			}, 410)
			setTimeout(() => {
				b.style.transitionDuration = "0.4s"
				b.style.opacity = "1"
				b.style.transform = "translateY(0px)"
				document.getElementById("test_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px`
				setTimeout(() => {
					document.getElementById("test_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px` 
					bobatron.scanner()
				}, 1000)
			}, 415)
		},
	}
}
main()