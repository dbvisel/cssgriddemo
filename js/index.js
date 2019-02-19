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

// test for localstorage

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0
		);
	}
}

let data = {
	currentPanel: 0,
	panels: 0,
	localStorage: false,
	isNarrow: false,
	isSuperNarrow: false,
	isSuperWide: false
};

const navigation = {
	setup: function() {
		let panels = document.querySelectorAll('article');
		data.panels = panels.length;
		let numbers = document.querySelector('#mainnav #numbers');
		if (storageAvailable('localStorage')) {
			data.localStorage = true;
			if (localStorage.getItem('currentPage')) {
				data.currentPanel = parseInt(localStorage.getItem('currentPage'), 10);
			}
		}
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
		section.querySelector(`article#panel_${data.currentPanel}`).style.opacity = 0;
		section.querySelector(`article#panel_${wantedPanel}`).style.opacity = 1;
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
		if (document.querySelector(`article#panel_${wantedPanel} .demoresize`)) {
			// first, delete all existing resizearrow elements
			const resizeArrows = document.getElementsByClassName('resizearrow');
			while (resizeArrows[0]) {
				resizeArrows[0].parentNode.removeChild(resizeArrows[0]);
			}
			navigation.setupDemoResize(document.querySelector(`article#panel_${wantedPanel} .demoresize`));
		}
		if (data.localStorage) {
			localStorage.setItem('currentPage', wantedPanel);
		}
	},
	setupDemoResize(element) {
		// mostly from here: https://stackoverflow.com/questions/8960193/how-to-make-html-element-resizable-using-pure-javascript
		let resizer = document.createElement('div');
		resizer.innerHTML = '⇲';
		resizer.classList = 'resizearrow';
		element.appendChild(resizer);
		resizer.addEventListener('mousedown', initResize, false);

		function initResize(e) {
			window.addEventListener('mousemove', startResize, false);
			window.addEventListener('mouseup', stopResize, false);
		}
		function startResize(e) {
			element.style.width = e.clientX - element.getBoundingClientRect().x + 'px';
			element.style.height = e.clientY - element.offsetTop + 'px';
		}
		function stopResize(e) {
			window.removeEventListener('mousemove', startResize, false);
			window.removeEventListener('mouseup', stopResize, false);
			element.style.width = '100%';
			element.style.height = '100%';
		}
	}
};

navigation.setup();

document.querySelector('a#narrow').onclick = function() {
	data.isSuperNarrow = false;
	data.isSuperWide = false;
	document.querySelector('a#supernarrow').innerHTML = 'show supernarrow version';
	document.querySelector('a#superwide').innerHTML = 'show superwide version';
	document.querySelector('#panel_6 #example1').classList = data.isNarrow ? 'demo_document' : 'demo_document narrow';
	document.querySelector('a#narrow').innerHTML = data.isNarrow ? 'Show narrow version' : 'Show normal version';
	data.isNarrow = !data.isNarrow;
};

document.querySelector('a#supernarrow').onclick = function() {
	data.isNarrow = false;
	data.isSuperWide = false;
	document.querySelector('a#narrow').innerHTML = 'Show narrow version';
	document.querySelector('a#superwide').innerHTML = 'show superwide version';
	document.querySelector('#panel_6 #example1').classList = data.isSuperNarrow
		? 'demo_document'
		: 'demo_document supernarrow';
	document.querySelector('a#supernarrow').innerHTML = data.isSuperNarrow
		? 'show supernarrow version'
		: 'show normal version';
	data.isSuperNarrow = !data.isSuperNarrow;
};

document.querySelector('a#superwide').onclick = function() {
	data.isNarrow = false;
	data.isSuperNarrow = false;
	document.querySelector('a#narrow').innerHTML = 'Show narrow version';
	document.querySelector('a#supernarrow').innerHTML = 'show supernarrow version';

	document.querySelector('#panel_6 #example1').classList = data.isSuperWide
		? 'demo_document'
		: 'demo_document superwide';
	document.querySelector('a#superwide').innerHTML = data.isSuperWide
		? 'show superwide version'
		: 'show normal version';
	data.isSuperWide = !data.isSuperWide;
};
