let base = () => {
	let onload = 1,
	ontest = 0,
	onSideMenu = 0,
	userdata = {
		profile: {
			username: "Username",
			ava: "ava_1",
			location: [],
		},
		lessons: { },
	}
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
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
		interface.mainScreenNav()

		window.addEventListener("resize", () => {
			interface.menuEntryAdaptive()
			bobatron.scanner()
		})

		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 0) { document.getElementById("header").style.zIndex = 2 }
			else { document.getElementById("header").style.zIndex = 0 }
			if (window.pageYOffset > 0 && onload == 1) { window.scrollTo(0, 0) }
		})

		document.getElementById("main_screen").addEventListener("scroll", () => {
			interface.mainScreenNav()
		})

		document.getElementById("burger").onclick = () => {
			if (onSideMenu == 0) {
				for (let i of [document.getElementById("main_screen"), document.getElementById("side_menu_right"), document.getElementById("side_menu")]) {
					i.style.transitionDuration = "0.3s"
				}
				interface.menuEntrySwitch("side_menu_right", "side_menu")
				interface.menuEntrySwitch("main_screen", "side_menu")
				document.getElementById("burger").classList.add("arrow_left_b")
				document.getElementById("body").style.overflow = "overlay";
				onSideMenu = 1
			}
			else {
				if (window.innerWidth > 475) {
					interface.menuEntrySwitch("side_menu", "side_menu_right")
				}
				interface.menuEntrySwitch("side_menu", "main_screen")
				document.getElementById("burger").classList.remove("arrow_left_b")
				document.getElementById("body").style.overflow = "hidden";
				onSideMenu = 0
			}
		}

		document.getElementById("button_goback").onclick = () => {
			interface.redirect("../", ["menu", ""])
		}

		document.getElementById("microlaba_header_icon").onclick = () => {
			interface.redirect("../", ["menu", ""])
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
						setTimeout(() => { userdataControl.read("stAnim") }, 2000)
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
				if (userdata.lessons[lessonName]) {
					try {
						cAud.log(`load -> success!`)
					}
					catch(e) {
						userdata.lessons[lessonName] = foundament
						userdataControl.write()
						cAud.log(`load -> fail! reset done!`)
					}
				}
				else {
					userdata.lessons[lessonName] = foundament
					userdataControl.write()
					cAud.log(`load -> success! (new lesson started)`)
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
			interface.lessonStats("main", userdata.lessons[lessonName].main.grade, userdata.lessons[lessonName].main.progress, userdata.lessons[lessonName].main.progressMax)
			for (let i = 0; i < lessList.length; i++) {
				let k = userdata.lessons[lessonName][lessList[i]], c = contents[lessList[i]]
				interface.contentsInit(lessList[i], c.headerCategory, c.header, c.spisok, c.color)
				interface.lessonStats(lessList[i], k.grade, k.progress, k.progressMax)
				interface.lessonStartButtons(lessList[i], k.open, k.progress, k.progressMax)
			}
			if (c == "stAnim") { setTimeout (() => { interface.loadscreen("startup") }, 0)}
			bobatron.scanner()
			document.title = `Maxstudify | Lesson`
		}
	}

	let interface = {
		contentsInit: (target, headerCategory, header, spisok, color) => {
			try {
				cAud.log(`contentsInit -> ${target} ${headerCategory} ${header} ${color}`)
				let spisokContent = "", bullet = "";
				if (spisok.content.length > 1) { bullet = `<h4 style="height: 100%; color: black">•</h4>` }
				for (let i = 0; i < spisok.content.length; i++) {
					spisokContent += `
					<div class="flex" style="gap: 5px">
						${bullet}
						<h4 style="height: 100%; color: black">${spisok.content[i]}</h4>
					</div>`
				}
				let content = `
				<div class="menu_entry_mini_inside_window bobatron">
					<div class="flex flex_gap_10">
						<div class="menu_entry_mini_inside_window_icon bobatron" Bt-CM="0.7" style="background-image: url(SVG/icon_${target}.svg); background-color: ${color}"></div>
						<div class="flex flex_column">
							<h4>${headerCategory}</h4>
							<h3>${header}</h3>
						</div>
					</div>
					<div class="flex flex_column">
						<h3>${spisok.header}</h3>
						<div class="flex flex_column">${spisokContent}</div>
					</div>
					<div class="progress bobatron" Bt-CM="0.7" style="margin: 0">
						<p style="z-index: 1;" id="${target}_progress_percent">0%</p>
						<div class="progress_green" id="${target}_progress_green"></div>
					</div>
					<div class="flex flex_gap_10" style="width: 100%; justify-content: space-between">
						<div class="bobatron progress_grade" Bt-CM="0.7" id="${target}_progress_grade">0</div>
						<button class="button_lesson_start bobatron" Bt-CM="0.7" id="${target}_start">Error!</button>
					</div>
				</div>`
				document.getElementById(`menu_entry_${target}`).innerHTML = content
			}
			catch(e) { cAud.log(`contentsInit -> ${target} FAIL!`) }
		},
		redirect: (location, cookieLocation) => {
			cookieLocation[1] = "loading"
			userdata.profile.location = cookieLocation
			userdataControl.write()
			interface.loadscreen("openExp")
			setTimeout(() => {
				window.location = location;
				let timer = setInterval(() => { 
					if (JSON.parse(getCookie("u")).profile.location[1] != "loading") { 
						userdataControl.locationIssuesCheck()
						cAud.log("redirect -> loading")
						clearInterval(timer)
					} 
				}, 300)
			}, 2200)
		},
		lessonStartButtons: (target, open, progress, progressMax) => {
			try {
				let button = document.getElementById(`${target}_start`), msg,
				arrow = `<div class="arrow_right_b"></div>`
				if (open == 1) {
					if (progress == 0) { msg = `Start${arrow}` }
					else if (progress == progressMax) { msg = `Repeat${arrow}` }
					else if (progress != 0) { msg = `Continue${arrow}` }
				}
				else {
					msg = `Unavailable`
					button.style.pointerEvents = "none"
					button.style.background = "linear-gradient(65deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 65%, rgba(211,211,211,1) 100%)"
				}
				cAud.log(`lessonStartButtons -> ${target} ${msg}`)
				button.innerHTML = `${msg}`
				button.onclick = () => { interface.redirect(target, [`${window.location.href + target}/`, `${lessonName}/${target}`]) } 
			}
			catch (e) { cAud.log(`lessonStartButtons -> ${target} FAIL!`) }
		},
		menuEntryAdaptive: () => {
			let side_menu = document.getElementById("side_menu"),
			side_menu_right = document.getElementById("side_menu_right"),
			main_screen = document.getElementById("main_screen"),
			burger = document.getElementById("burger"),
			menuContainer = document.getElementsByClassName("menu_container")[0];
			document.getElementById("test_complete_overlay").style.width = main_screen.offsetWidth + "px"
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
				document.getElementById("body").style.overflow = "hidden";
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
				
				side_menu_right.style.display = "flex"
				side_menu_right.style.transform = "translateX(0)"
				side_menu_right.style.transitionDuration = "0s"
				side_menu_right.style.opacity = "1"

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
			if ((side_menu_right.children.length * 92.2 + (side_menu_right.children.length - 1) * 10) > heightWithoutHeader) { side_menu_right.style.height = heightWithoutHeader + "px" }
			else { side_menu_right.style.height = "" }
			if (window.innerWidth < 475 || onSideMenu == 1) { side_menu_right.style.display = "none"}
			else { side_menu_right.style.display = "" }
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
		lessonStats(target, grade, progress, progressMax) {
			try {
				cAud.log(`lessonStats -> ${target} ${grade} ${progress} ${progressMax}`)
				let green = document.getElementById(`${target}_progress_green`), percent_c = document.getElementById(`${target}_progress_percent`),
				percent = Math.trunc(progress / progressMax * 100)
				green.style.width = `${percent}%`
				percent_c.innerHTML = `${percent}%`
				if (percent > 0) {
					percent_c.style.color = `#000000`
				}
				try {
					let grade_c = document.getElementById(`${target}_progress_grade`)
					grade_c.innerHTML = grade
					if (grade > 0) { grade_c.style.color = `#000000` }
					if (grade == 0) { grade_c.style.backgroundColor = `#d3d3d3` }
					else if (grade > 0 && grade < 5) { grade_c.style.backgroundColor = `#FF2B2B`; grade_c.style.color = `#FFFFFF` }
					else if (grade > 4 && grade < 8) { grade_c.style.backgroundColor = `#FFCE6A` }
					else { grade_c.style.backgroundColor = `#37DB27` }
				}
				catch (e) { cAud.log(`lessonStats -> ${target} GRADING FAIL!`) }
			}
			catch (e) { cAud.log(`lessonStats -> ${target} FAIL!`) }
		},
		horisScroll(from, to, pos1, pos2) {
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
		menuEntrySwitch(from, to) {
			let a = document.getElementById(from), b = document.getElementById(to)
			a.style.transitionDuration = "0.4s"
			a.style.opacity = "0"
			a.style.transform = "translateY(30px)"
			setTimeout(() => {
				window.scrollTo(0, 0)
				a.style.display = "none"
				b.style.display = "flex"
				bobatron.scanner()
			}, 410)
			setTimeout(() => {
				b.style.transitionDuration = "0.4s"
				b.style.opacity = "1"
				b.style.transform = "translateY(0px)"
				bobatron.scanner()
			}, 415)
		},
		callFooter(state, buttons_range) {
			let footer = document.getElementById("footer"), buttons = document.getElementsByClassName("button_footer")
			if (state == "show") {
				footer.style.transform = "translateY(0)"
				for (i of buttons_range) {
					buttons[i].style.transform = "translateY(0)"
					buttons[i].style.transitionDelay = `${0.1 + 0.1 * i}s` 
				}
			}
			else if (state == "hide") {
				footer.style.transform = "translateY(100%)"
				setTimeout(() => {
					for (i of buttons_range) {
						buttons[i].style.transitionDelay = "0s" 
						buttons[i].style.transform = "translateY(100%)"
					}
				}, 300)
			}
		},
		mainScreenNav() {
			let menuEntry = document.getElementsByClassName("menu_entry_mini"),
			main_screen = document.getElementById("main_screen"),
			side_menu_right = document.getElementById("side_menu_right"), num;
			try {
				num = Math.round(main_screen.scrollTop / menuEntry[0].offsetHeight)
				for (let i = 0; i < side_menu_right.children.length; i++) {
					side_menu_right.children[i].onclick = () => {
						main_screen.scrollTo({
						  top: menuEntry[0].offsetHeight * i + 20 * i,
						  left: 100,
						  behavior: 'smooth'
						});
					}
					side_menu_right.children[i].children[0].classList.remove(`${side_menu_right.children[i].id}_icon_focused`)
				}
				side_menu_right.children[num].children[0].classList.add(`${side_menu_right.children[num].id}_icon_focused`)
			}
			catch(e) {}
		}
	}
}
base()