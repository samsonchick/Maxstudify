let cAud = {
	inf: {
		name: "Maxstudify",
		author: "complagaet",
		ver: "0.0"
	},
	functt: {
		count: 4,
		f_0: {
			name: "hide cAud",
			func: `document.getElementById("complagaetAuditor").style.display = "none"`
		},
		f_1: {
			name: "cookie reset",
			func: `document.cookie = "u=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"`
		},
		f_2: {
			name: "userdata write",
			func: `userdataControl.write()`
		},
		f_3: {
			name: "load test profile",
			func: `window.location = "?data=%7B%22profile%22%3A%7B%22username%22%3A%22test profile%22%2C%22ava%22%3A%22icon_settings_profile%22%2C%22location%22%3A%5B%22menu%22%2C%22%22%5D%7D%2C%22lessons%22%3A%7B%22voda%22%3A%7B%22main%22%3A%7B%22grade%22%3A0%2C%22progress%22%3A39%2C%22progressMax%22%3A100%7D%2C%22theory%22%3A%7B%22open%22%3A1%2C%22grade%22%3A0%2C%22progress%22%3A20%2C%22progressMax%22%3A20%7D%2C%22test%22%3A%7B%22open%22%3A1%2C%22grade%22%3A0%2C%22progress%22%3A20%2C%22progressMax%22%3A25%7D%2C%22laba%22%3A%7B%22open%22%3A0%2C%22grade%22%3A0%2C%22progress%22%3A0%2C%22progressMax%22%3A30%7D%2C%22final%22%3A%7B%22open%22%3A0%2C%22grade%22%3A0%2C%22progress%22%3A0%2C%22progressMax%22%3A25%7D%7D%7D%7D"`
		},
	},
	fButtons: "",
	getCookie: (name) => {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},
	funcInit: () => {
		for (let i = 0; i < cAud.functt.count; i++) {
			k = cAud.functt[`f_${i}`]
			cAud.fButtons += `<div style="cursor: pointer; display: flex; height: 25px; font-family: monospace; justify-content: center; align-items: center; background-color: #6cd1ad; padding: 0 5px 0 5px" onclick='${k.func}'>${k.name}</div>` 
		}
	},
	start: () => {
		cAud.funcInit();
		let body = document.querySelectorAll("body")[0];
		body.innerHTML += `
		<style>
			#complagaetAuditor {
				z-index: 100;
				position: fixed;
				left: 0;
				top: 0;
				display: none;
				flex-direction: column;
				background-color: #AFEEEE;
				font-family: monospace;
				height: fit-content;
				min-width: 300px;
				max-width: 300px;
				padding: 10px;
				gap: 5px
			}
			#complagaetAuditorLog::-webkit-scrollbar {
				width: 3px;
				height: 3px;
				background-color: #00000000;
			}
			#complagaetAuditorLog::-webkit-scrollbar-thumb {
				background-color: #000000;
				border-radius: 5px;
			}
			#complagaetAuditorLog {
				max-height: calc(90vh - 200px);
				overflow-y: scroll;
				overflow-x: hidden;
			}
			</style>
			<div id="complagaetAuditor">
				<div style="display: flex; justify-content: space-between; gap: 50px;">
					<div style="display: flex; flex-direction: column">
						<p style="font-family: monospace; font-size: 20px">${cAud.inf.name}</p>
						<p style="font-family: monospace; font-size: 14px">${cAud.inf.author}</p>
						<p style="font-family: monospace; font-size: 14px">v${cAud.inf.ver}</p>
					</div>
					<div style="height: 45px; width: 50px; display: flex; justify-content: center; align-items: center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.55 53.03">
							<title>Element 1</title>
							<g id="Ebene_2" data-name="Ebene 2">
								<g id="svg833">
									<path d="M21.33,3.23V0h27V3.24H40.73v3h1.18c2.28,0,4.56,0,6.84,0a5.44,5.44,0,0,1,5.74,5.1,8,8,0,0,0,.21,1.3,2.36,2.36,0,0,0,2.44,1.87l6.36,0a2.12,2.12,0,0,1,.32.17v6.1h3.31v-6.1a7.6,7.6,0,0,1,.8-.14c2.72,0,5.44,0,8.16,0a1,1,0,0,1,1.15.89c.58,2.49,1.27,5,1.84,7.44a15.64,15.64,0,0,1,.39,3.2c0,3.4-.11,6.8,0,10.2a32.26,32.26,0,0,1-1.45,10.38c-.31,1.12-.53,2.26-.87,3.36-.11.34-.49.84-.75.84-3,.06-6.07,0-9.24,0V44.62h-3.4c0,1.06,0,2.05,0,3A5.38,5.38,0,0,1,58.57,53c-9.56,0-19.12,0-28.68,0a6,6,0,0,1-4.2-2c-2.1-2.08-4.24-4.13-6.31-6.23a3.32,3.32,0,0,0-2.66-1.1c-1.11,0-2.24,0-3.36,0A5.37,5.37,0,0,1,8.1,38.18c0-3.4,0-6.8,0-10.29H3.76V40.42c-2.17-.3-2.55-.72-2.55-2.66,0-3.32,0-6.64,0-10,0-.41,0-1-.3-1.21-1-.77-.9-1.78-.9-2.82C0,21,0,18.25,0,15.49A3,3,0,0,1,.8,13.75c.8-.91,1.76-1.69,2.86-2.73V24.31H8.1V19.83c0-.84,0-1.68,0-2.52a5.48,5.48,0,0,1,5.3-5.56c.36,0,.72,0,1.08,0,2.23,0,2.38-.15,3.31-2.18A5.34,5.34,0,0,1,22.88,6.2c2,0,4.06,0,6.18,0v-3ZM60.48,17.85H57.69c-3.82,0-6-2-6.5-5.74-.23-2-.84-2.54-2.88-2.54H23.72c-2,0-2.34.25-3.13,2.11a5.29,5.29,0,0,1-4.68,3.4c-.71.06-1.44,0-2.16,0a2.18,2.18,0,0,0-2.3,2.37q0,10.2,0,20.39a2.13,2.13,0,0,0,2.27,2.38c1.08.06,2.16,0,3.24,0a6.07,6.07,0,0,1,4.62,1.91c2.13,2.15,4.32,4.25,6.46,6.4a3.51,3.51,0,0,0,2.66,1.1c9,0,18,0,27,0,2,0,2.76-.77,2.77-2.73V41.28H70.53v6.26c1.19,0,2.26,0,3.33,0a1,1,0,0,0,.7-.6c.63-2.83,1.75-5.55,1.65-8.55-.12-3.35-.16-6.72,0-10.07s-.79-6.48-1.6-9.64c-.08-.29-.38-.73-.6-.75-1.13-.07-2.27,0-3.54,0V24.1h-10Z"/>
								</g>
							</g>
						</svg>
					</div>
				</div>
				<hr style="border: 0.5px #1a826f solid">
				<div style="display: flex; flex-wrap: wrap; gap: 5px">${cAud.fButtons}</div>
				<hr style="border: 0.5px #1a826f solid">
				<div id="complagaetAuditorLog"></div>
			</div>
		`
		if (new URLSearchParams(window.location.search).get("cAud") === "hide") { document.cookie = `cAud=hide; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT` }
		if (new URLSearchParams(window.location.search).get("cAud") === "show" || cAud.getCookie("cAud") === "show") {
			document.getElementById("complagaetAuditor").style.display = "flex"
			document.cookie = `cAud=show; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
		}
	},
	log: (t) => {
		try {
			let p = document.getElementById("complagaetAuditorLog"), k = document.getElementById("complagaetAuditorLog");
			p.innerHTML += `<p style="word-wrap: break-word; font-family: monospace; font-size: 12px">${t}</p>`;
			k.scrollTo(0, k.scrollHeight)
		}
		catch (e) {}
	}
}