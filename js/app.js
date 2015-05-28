'use strict';

var App = {
	init: function () {
		//when window is ready start our App
		App.ColorSelect();
		App.Slider.init();
	}
}

App.ColorSelect = function () {
	var selectEls = document.querySelectorAll("[data-color-select]"),
		selectElsLength = selectEls.length,
		i = 0,
		k,
		currentEl;

	for (i; i < selectElsLength; i++)  {
		selectEls[i].onclick = function () {
			k = 0;

			for (k; k < selectElsLength; k++) {
				currentEl = selectEls[k];
				currentEl.className = currentEl.className.replace(/\b active\b/,'');
			}

			this.className = this.className + " active";
			//Remove attr "checked" from old input:radio
			document.querySelector("[data-color-variants] [checked]").removeAttribute("checked");
			//Add attr "checked" for new input:radio
			document.getElementById(this.getAttribute("for")).setAttribute("checked", "checked");
		}
	}
}

App.Slider = {
	init: function () {
		this.current = 0,
		this.viewport = document.querySelector("[data-viewport]");

		var allSlides = document.querySelectorAll("[data-slide]").length,
			context = this;

		document.querySelectorAll("[data-slide-prev]").onclick = function (event) {
			context.move('prev');
			event.preventDefault();
		}

		document.querySelector("[data-slide-next]").onclick = function (event) {
			context.move('next');
			event.preventDefault();
		}
	},
	move: function (direction) {
		if (direction === 'next') {
			this.current++;
			if (this.current > 2) {
				this.current = 0;
			}

		}
		else {
			this.current--;
			if (this.current == 0) {
				this.current = 2;
			}
		}

		this.viewport.style.left = - this.current * 100 + "%";
	}
}

window.onload = App.init;