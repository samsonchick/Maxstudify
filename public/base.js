let base = () => {	
	let onload = 1, lessonName = "menu", lessonLocation = [lessonName, ""], lessList = ["voda"]
	let userdata = {
		profile: {
			username: "Username",
			ava: "ava_1",
			location: lessonLocation,
		},
		lessons: {}
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
		cAud.start()
		interface.menuEntryAdaptive()
		bobatron.scanner()
		init()
		if (importUserdata) {
			userdataControl.importLink()
		}
		else {
			setTimeout(() => {
				userdataControl.locationIssuesCheck()
			}, 1000)
		}	
	})

	window.addEventListener("resize", () => {
		interface.menuEntryAdaptive()
		bobatron.scanner()
	})

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 0) { document.getElementById("header").style.zIndex = 2 }
		else { document.getElementById("header").style.zIndex = 0 }
		if (window.pageYOffset > 0 && onload == 1) { window.scrollTo(0, 0) }
	})

	let init = () => {
		document.getElementById("button_go").onclick = () => {
			interface.horisScroll("welcome_wrapper", "input_field_wrapper")
			onload = 0
		}
		let nameOK = 0, avatars = document.getElementsByClassName("small_avatar_p"), 
		nameEdit = (target, prip) => {
			document.getElementById(target + prip).oninput = () => {
				let inp = document.getElementById(target + prip)
				if (inp.value.trim() != '') {
					if (inp.value.length <= 20) {
						document.getElementById("input_name_label" + prip).innerHTML = "Username"
						document.getElementById("big_name" + prip).innerHTML = inp.value
						document.getElementById("big_name" + prip).style.color = "#000000"
						userdata.profile.username = inp.value
						nameOK = 1
					}
					if (inp.value.length == 20) {
						document.getElementById("input_name_label" + prip).innerHTML = "Username <span style='color: red'>(No more than 20 ch.)</span>"
						nameOK = 1
					}
				}
				else {
					document.getElementById("input_name_label" + prip).innerHTML = "Username <span style='color: red'>(Empty)</span>"
					document.getElementById("big_name" + prip).innerHTML = "Имя"
					document.getElementById("big_name" + prip).style.color = "#757575"
					nameOK = 0		
				}
			}
		}
		nameEdit("name", "_reg")
		nameEdit("name", "_edit")
		for (let i = 0; i < avatars.length; i++) {
			avatars[i].onclick = () => {
				let k = avatars[i].getAttribute("class").split(" ")
				document.getElementById("big_avatar_reg").setAttribute("class", `${k[0]} big_avatar`)
				document.getElementById("big_avatar_edit").setAttribute("class", `${k[0]} big_avatar`)
				userdata.profile.ava = k[0]
			}
		}
		document.getElementById("load_old_profile").onclick = () => {
			window.location.href = window.location.href.replace(/\?.*/g, '');
		}
		document.getElementById("load_imported_profile").onclick = () => {
			userdataControl.importLink("load")
		}

		document.getElementById("button_reg").onclick = () => {
			if (nameOK == 1) {
				document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
				userdataControl.write("stAnim")
			}
		}
		document.getElementById("button_settings").onclick = () => {
			userdataControl.exportLink()
			interface.callFooter("show", [0, 1])
			setTimeout(() => { document.getElementById("button_settings_save_content_state2").style.display = "flex" }, 400)
			interface.menuEntrySwitch(0, 1)
			let button_settings = document.getElementById("button_settings")
			button_settings.style.transitionDuration = "0.4s"
			button_settings.style.scale = 0
			button_settings.style.marginLeft = "-60px"
			sbros_counter = 0;
			document.getElementById("button_edit_sbros").innerHTML = "Reset!"
		}
		document.getElementById("button_settings_back").onclick = () => {
			interface.callFooter("hide", [0, 1])
			setTimeout(() => { document.getElementById("button_settings_save_content_state2").style.display = "none" }, 400)
			interface.menuEntrySwitch(1, 0)
			sbros_counter = 0;
			let button_settings = document.getElementById("button_settings")
			button_settings.style.scale = ""
			button_settings.style.marginLeft = ""
			setTimeout(() => { button_settings.style.transitionDuration = "0.2s"}, 400)
		}
		document.getElementById("button_settings_save").onclick = () => {
			userdataControl.write()
			userdataControl.alright()
			userdataControl.exportLink()
			document.getElementById("button_settings_save_content").style.transform = "translateY(80px)"
			setTimeout(() => {
				document.getElementById("button_settings_save_content").style.transform = "translateY(0)"
			}, 2000)
		}
		document.getElementById("export_data_link_buttoncopy").onclick = () => {
			document.getElementById("export_data_link_buttoncopy_ok").style.marginTop = "-37px"
			setTimeout(() => {
				document.getElementById("export_data_link_buttoncopy_ok").style.marginTop = "0px"
			}, 1500)
			let link = document.getElementById("export_data_link");
			link.select();
			link.setSelectionRange(0, 99999);
			navigator.clipboard.writeText(link.value);
		}
		let sbros_counter = 0;
		document.getElementById("button_edit_sbros").onclick = () => {
			sbros_counter += 1
			if (sbros_counter == 1) {
				document.getElementById("button_edit_sbros").innerHTML = "You sure?"
			}
			else if (sbros_counter == 2) {
				document.cookie = `u=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
				location.reload()
			}
		}
	}

	let userdataControl = {
		write: (c) => {
			document.cookie = `u=${encodeURIComponent(JSON.stringify(userdata))}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT;`
			cAud.log(`write -> ${document.cookie}`)
			if (c == "stAnim") { userdataControl.read("stAnim") }
		},
		locationIssuesCheck: () => {
			try {
				let u = JSON.parse(getCookie("u")), message = document.getElementById("location_issues_message")
				cAud.log("locationIssuesCheck -> started")
				function check() { return u.profile.location[0] != "menu" && u.profile.location[0] != window.location.href }
				if (check()) {
					interface.horisScroll("microlaba_big_logo", "location_issues_wrapper")
					message.innerHTML = `Похоже, что вы не закрыли урок <span style="font-weight: bold">«${u.profile.location[1]}»</span>.`
					cAud.log("locationIssuesCheck -> location issues!")
				}
				else {
					cAud.log("locationIssuesCheck -> location ok!")
					userdata = u
					userdata.profile.location = lessonLocation
					userdataControl.write()
					userdataControl.read("stAnim")
				}
				document.getElementById("location_issues_goback").onclick = () => {
					window.location.href = u.profile.location[0]
				}
				document.getElementById("location_issues_ignore").onclick = () => {
					document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
					interface.horisScroll("location_issues_wrapper", "microlaba_big_logo")
					userdata = u
					userdata.profile.location = lessonLocation
					userdataControl.write()
					userdataControl.read("stAnim")
				}
			}
			catch(e) { userdataControl.read("stAnim") }
		},
		read: (c) => {
			cAud.log(getCookie("u"))
			try {
				cAud.log("load -> started")
				let u = JSON.parse(getCookie("u"))
				userdata.profile = u.profile
				userdata.lessons = u.lessons
				if (c == "stAnim") { userdataControl.alright("stAnim") }
			}
			catch {
				interface.horisScroll("microlaba_big_logo", "welcome_wrapper")
				cAud.log("load -> no-user!")
			}
		},
		alright: (c) => {
			document.getElementById("header_username").innerHTML = userdata.profile.username
			document.getElementById("header_ava").setAttribute("class", `${userdata.profile.ava} small_avatar`)
			document.getElementById("big_avatar_edit").setAttribute("class", `${userdata.profile.ava} big_avatar`)
			document.getElementById("big_name_edit").innerHTML = userdata.profile.username
			document.getElementById("name_edit").value = userdata.profile.username
			interface.horisScroll("input_field_wrapper", "microlaba_big_logo")
			for (let i = 0; i < lessList.length; i++) {
				if (userdata.lessons[lessList[i]]) {
					try {
						let s = userdata.lessons[lessList[i]]
						interface.lessonStats(lessList[i], s.main.grade, s.main.progress, s.main.progressMax)
						interface.lessonStartButtons(lessList[i], s.main.progress, s.main.progressMax)
						cAud.log(`load -> ${lessList[i]} success!`)
					}
					catch(e) { cAud.log(`load -> ${lessList[i]} FAIL!`) }
				}
				else { 
					interface.lessonStartButtons(lessList[i], 0, 1)
					cAud.log(`load -> ${lessList[i]} no-data!`) 
				}
			}
			if (c == "stAnim") { setTimeout (() => { interface.loadscreen("startup") }, 2000)}
		},
		exportLink: () => {
			document.getElementById("export_data_link").value = `${window.location.href}?data=${encodeURIComponent(JSON.stringify(userdata))}`
		},
		importLink: (a) => {
			try {
				cAud.log("importLink -> start!")
				let u = JSON.parse(decodeURIComponent(importUserdata))
				try {
					let k = JSON.parse(getCookie("u"))
					document.getElementById("import_oldprofile_wrapper").style.display = "flex"
					document.getElementById("avatar_old").setAttribute("class", `${k.profile.ava} small_avatar`)
					document.getElementById("name_old").innerHTML = k.profile.username
					cAud.log("importLink -> old profile found!")
				}
				catch {
				}
				cAud.log(`p${importUserdata}`)
				document.getElementById("avatar_imported").setAttribute("class", `${u.profile.ava} small_avatar`)
				document.getElementById("name_imported").innerHTML = u.profile.username
				interface.horisScroll("microlaba_big_logo", "welcome_import_wrapper")
				if (a == "load") {
					userdata.profile = u.profile
					userdata.lessons = u.lessons
					userdataControl.write()
					window.location = window.location.href.replace(/\?.*/g, '')
				}
			}
			catch {
				cAud.log("importLink -> invalid link!")
				interface.horisScroll("microlaba_big_logo", "welcome_wrapper")
			}
		}
	}

	let interface = {
		redirect: (location) => {
			userdata.profile.location = lessonLocation
			userdata.profile.location[1] = "loading"
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
		lessonStartButtons: (target, progress, progressMax) => {
			try {
				let button = document.getElementById(`${target}_start`), msg
				if (progress == 0) { msg = "Start" }
				else if (progress == progressMax) { msg = "Repeat" }
				else if (progress != 0) { msg = "Continue" }
				button.innerHTML = `${msg}<div class="arrow_right"></div>`
				button.onclick = () => { interface.redirect(target) } 
			}
			catch (e) {}
		},
		menuEntryAdaptive: () => {
			let menuEntry = document.getElementsByClassName("menu_entry"),
			menuContainer = document.getElementsByClassName("menu_container")[0];
			for (let i = 0; i < menuEntry.length; i++) {
				menuEntry[i].style.width = (menuContainer.offsetWidth - 80) / 3 + "px"
			}
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
		horisScroll(from, to) {
			document.getElementById(from).style.transform = "translateX(-100px)"
			document.getElementById(from).style.opacity = "0"
			setTimeout(() => {
				document.getElementById(from).style.display = "none"
				document.getElementById(to).style.display = "flex"
			}, 350)
			setTimeout(() => {
				document.getElementById(to).style.transform = "translateX(0px)"
				document.getElementById(to).style.marginTop = "0"
				document.getElementById(to).style.opacity = "1"
				bobatron.scanner()
			}, 400)
		},
		menuEntrySwitch(from, to) {
			let a = document.getElementsByClassName("menu_container")[from], b = document.getElementsByClassName("menu_container")[to]
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
		}
	}
}
base()