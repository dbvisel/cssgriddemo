import '../scss/styles.scss';

// throttle resize – from https://developer.mozilla.org/en-US/docs/Web/Events/resize

(function() {
	var throttle = function(type, name, obj) {
		obj = obj || window;
		var running = false;
		var func = function() {
			if (running) {
				return;
			}
			running = true;
			requestAnimationFrame(function() {
				obj.dispatchEvent(new CustomEvent(name));
				running = false;
			});
		};
		obj.addEventListener(type, func);
	};

	throttle('resize', 'optimizedResize');
})();

let data = {
	currentPanel: 0,
	panels: 0
};

const navigation = {
	setup: function() {
		let panels = document.querySelectorAll('article');
		data.panels = panels.length;
		let numbers = document.querySelector('#mainnav #numbers');
		while (numbers.firstChild) {
			numbers.removeChild(numbers.firstChild);
		}
		for (let i = 0; i < data.panels; i++) {
			let newLink = document.createElement('a');
			newLink.href = '#';
			newLink.id = `go_${i}`;
			newLink.innerHTML = i + 1;
			numbers.appendChild(newLink);
			newLink.onclick = function() {
				navigation.goToPanel(parseInt(this.id.substring(3), 10));
			};
		}
		document.querySelector('#goleft').onclick = function() {
			if (data.currentPanel > 0) {
				navigation.goToPanel(data.currentPanel - 1);
			}
		};
		document.querySelector('#goright').onclick = function() {
			if (data.currentPanel + 1 < data.panels) {
				navigation.goToPanel(data.currentPanel + 1);
			}
		};
		window.addEventListener('keydown', event => {
			// handle keyboard
			if (event.keyCode === 37 && data.currentPanel > 0) {
				navigation.goToPanel(data.currentPanel - 1);
			}
			if (event.keyCode === 39 && data.currentPanel + 1 < data.panels) {
				navigation.goToPanel(data.currentPanel + 1);
			}
		});

		this.goToPanel(data.currentPanel);
		window.addEventListener('optimizedResize', function() {
			// handle resize
			navigation.goToPanel(data.currentPanel);
		});
	},
	goToPanel(wantedPanel) {
		const section = document.querySelector('main section');
		const myWidth = section.clientWidth;
		section.scrollLeft = myWidth * wantedPanel;
		data.currentPanel = wantedPanel;
		let numbersLinks = document.querySelectorAll('#numbers a');
		document.querySelector('#goleft').classList = wantedPanel === 0 ? 'off' : '';
		document.querySelector('#goright').classList = wantedPanel === data.panels - 1 ? 'off' : '';
		for (let i = 0; i < numbersLinks.length; i++) {
			numbersLinks[i].classList = '';
			if (i === wantedPanel) {
				numbersLinks[i].classList = 'on';
			}
		}
	}
};

navigation.setup();
