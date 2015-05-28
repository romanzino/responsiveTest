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

/*App.ProductInfo = function () {
	var el = document.querySelector("[data-product-info]"),
		open = false;

	document.querySelector("[data-show-info-trigger]").onclick = function (event) {
		//Is information open now?
		if (!open) {
			//Shows product information
			el.style.display = "block";
			this.innerHTML = "Hide information";
			this.className = this.className + " active";

			open = true;
		}
		else {
			//Hides product information
			el.style.display = "none";
			this.innerHTML = "Read more";
			this.className = this.className.replace(/\b active\b/,'');
			
			open = false;
		}

		event.preventDefault();
	}
}
*/
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