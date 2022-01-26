(function(){
	const startTime = document.getElementById('start-time-slider'),
	      startTimeGraphic = document.getElementById('start-time-graphic'),
		  dispenseTime = document.getElementById('dispense-time-slider'),
		  dispenseTimeGraphic = document.getElementById('dispense-time-graphic'),
		  endTime = document.getElementById('end-time-slider'),
		  endTimeGraphic = document.getElementById('end-time-graphic'),
		  rangeGraphic = document.getElementById('range-graphic'),
		  acceleratedRangeGraphic = document.getElementById('accelerated-range-graphic'),
		  missedDoseRangeGraphic = document.getElementById('missed-dose-range-graphic'),
		  totalMins = 1440,
		  startTimeSign = document.getElementById('start-time-sign'),
		  dispenseTimeSign = document.getElementById('dispense-time-sign'),
		  endTimeSign = document.getElementById('end-time-sign'),
		  acceleratedSlider = document.getElementById('accelerated-slider'),
		  missedDoseSlider = document.getElementById('missed-dose-slider'),
		  missedDoseSign = document.getElementById('missed-dose-sign'),
		  acceleratedGraphic = document.getElementById('accelerated-graphic'),
		  acceleratedSign = document.getElementById('accelerated-sign'),
		  missedDoseGraphic = document.getElementById('missed-dose-graphic'),
		  startTimeValueSign = document.getElementById('start-time-value'),
		  endTimeValueSign = document.getElementById('end-time-value'),
		  dispenseTimeValueSign = document.getElementById('dispense-time-value'),
		  acceleratedTimeValueSign = document.getElementById('accelerate-value'),
		  missedDoseValueSign = document.getElementById('missed-dose-value'),
		  timeAdjust = 10,
		  spacer = 5,
		  errorDiv = document.getElementById('error-window');


	startTime.value = 1440 * .45;
	dispenseTime.value = 1440 * .50;
	endTime.value = 1440 * .55;
	acceleratedSlider.value = 1440 * .65;
	missedDoseSlider.value = 1440 * .70;
	

	for (let i = 1; i < 24; i ++) {
		let div = document.createElement('div');
		div.classList.add("time-marker");
		document.getElementById('slider-distance').appendChild(div);
		div.style.left = `${(i / 24)*100}%`
	}

	let min = startTime.value,
		max = endTime.value;

	let sliders = [startTime, endTime, dispenseTime, acceleratedSlider, missedDoseSlider];

	function guanteeNoOverlap() {
		// sliders.sort((a,b) => a.value - b.value)
		// for (let i = 1; i < sliders.length; i++) {
		// 	if (Math.abs(sliders[i-1].value - sliders[i].value) < 5) {
		// 		sliders[i].value += spacer;
		// 	}
		// }
	}

	startTimeGraphic.style.left = percString(startTime.value - returnGraphicAdjustValue(startTime.value));
	dispenseTimeGraphic.style.left = percString(dispenseTime.value - returnGraphicAdjustValue(dispenseTime.value));
	endTimeGraphic.style.left = percString(endTime.value - returnGraphicAdjustValue(endTime.value));
	acceleratedGraphic.style.left = percString(acceleratedSlider.value - returnGraphicAdjustValue(acceleratedSlider.value));
	missedDoseGraphic.style.left = percString(missedDoseSlider.value - returnGraphicAdjustValue(missedDoseSlider.value));

	rangeGraphic.style.width = percString(+max - +min);
	rangeGraphic.style.left = percString(min);

	acceleratedRangeGraphic.style.width = percString(+acceleratedSlider.value - +dispenseTime.value);
	acceleratedRangeGraphic.style.left = percString(+dispenseTime.value);

	missedDoseRangeGraphic.style.width = percString(+missedDoseSlider.value - +acceleratedSlider.value);
	missedDoseRangeGraphic.style.left = percString(+acceleratedSlider.value);

	let otherRanges = [[300, 120], [1380, 1200]];
	document.querySelector('.range-graphic-other:nth-child(1)').style.width = percString(300 - 120);
	document.querySelector('.range-graphic-other:nth-child(1)').style.left = percString(120);
	document.querySelector('.range-graphic-other:nth-child(2)').style.width = percString(1380 - 1200);
	document.querySelector('.range-graphic-other:nth-child(2)').style.left = percString(1200);

	function errorHandler() {
		let test = otherRanges.find(item => (+startTime.value > item[1] && +startTime.value < item[0]) || (+endTime.value > item[1] && +endTime.value < item[0]));
		if (test) {
			displayError("This would overlap with range named XXXXXXXX.", true)
		} else {
			displayError("", false)
		}
	}

	function returnGraphicAdjustValue(val){
		return Math.floor(10 * (+val / 1440));
	}

	function displayError(error, bool) {
		if (bool) {
			errorDiv.classList.add('show');
		} else {
			errorDiv.classList.remove('show');
		}
		errorDiv.innerText = error;
	}

	handleSigns (startTimeValueSign, startTimeSign, startTime.value)
	handleSigns (dispenseTimeValueSign, dispenseTimeSign, dispenseTime.value)
	handleSigns (endTimeValueSign, endTimeSign, endTime.value)
	handleSigns (acceleratedTimeValueSign, acceleratedSign, acceleratedSlider.value)
	handleSigns (missedDoseValueSign, missedDoseSign, missedDoseSlider.value)

	function percString(num) {
		return `${(num / totalMins) * 100}%`
	}

	function createTimeString(val) {
		let valNumber = +val;
		let minutes = valNumber % 60;
		let hours = (valNumber - minutes) / 60;

		return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
	}
	function addLeadingZero(num) {
		num = +num;
		return num < 10 ? `0${num}` : num;
	}

	function handleSigns (timeSign, labelSign, value) {
		timeSign.innerText = createTimeString(value);
	}

	function adjustRangeSliders(){
		acceleratedRangeGraphic.style.width = percString(+acceleratedSlider.value - +dispenseTime.value);
		acceleratedRangeGraphic.style.left = percString(+dispenseTime.value);
		missedDoseRangeGraphic.style.width = percString(+missedDoseSlider.value - +acceleratedSlider.value);
		missedDoseRangeGraphic.style.left = percString(+acceleratedSlider.value);
	}

	

	function startTimeHandler () {
		if (this.value >= (+max - spacer)) {
			this.value = Math.min(this.value, +max - spacer);
		}

		handleSigns (startTimeValueSign, startTimeSign, this.value)
    	let adjust = Math.floor(10 * (+this.value / 1440));
		startTimeGraphic.style.left = percString(this.value - adjust);

		min = this.value;
		rangeGraphic.style.left = percString(min);
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value >= +dispenseTime.value - spacer) {
			dispenseTime.value = +this.value + spacer;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			handleSigns (dispenseTimeValueSign, dispenseTimeSign, dispenseTime.value)
			adjustRangeSliders();
			guanteeNoOverlap()
		}

		if (+this.value >= +acceleratedSlider.value - (spacer * 2)) {
			acceleratedSlider.value = +this.value + (spacer * 2);
			acceleratedGraphic.style.left = percString(acceleratedSlider.value);
			handleSigns (acceleratedTimeValueSign, acceleratedSign, acceleratedSlider.value)
		}

		if (+this.value >= +missedDoseSlider.value- (spacer * 3)) {
			missedDoseSlider.value = +this.value + (spacer * 3);
			missedDoseGraphic.style.left = percString(missedDoseSlider.value);
			handleSigns (missedDoseValueSign, missedDoseSign, missedDoseSlider.value)
		}

		errorHandler();
		guanteeNoOverlap()
	}

	function dispenseTimeHandler () {
		if (+this.value > +max) {
			this.value = +max - 3;
		} else if (+this.value < +min ) {
			this.value = +min + 3;
		}

		let adjust = Math.floor(10 * (+this.value / 1440));
		dispenseTimeGraphic.style.left = percString(this.value - adjust);

		handleSigns (dispenseTimeValueSign, dispenseTimeSign, this.value)

		if (+this.value >= +acceleratedSlider.value) {
			acceleratedSlider.value = +this.value - 1;
			acceleratedGraphic.style.left = percString(acceleratedSlider.value);
			handleSigns (acceleratedTimeValueSign, acceleratedSign, acceleratedSlider.value)

		}
		if (+this.value >= +missedDoseSlider.value) {
			missedDoseSlider.value = +this.value - 1;
			missedDoseGraphic.style.left = percString(missedDoseSlider.value);
			handleSigns (missedDoseValueSign, missedDoseSign, missedDoseSlider.value)
		}
		adjustRangeSliders()
		guanteeNoOverlap()
	}
	function endTimeHandler () {
		
		if (this.value <= (+min + 2) ) {
			this.value = +min + 2;
		}
		

		let adjust = Math.floor(10 * (+this.value / 1440));
		endTimeGraphic.style.left = percString(this.value - adjust);
		
		handleSigns (endTimeValueSign, endTimeSign, this.value)

		max = this.value;
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value <= +dispenseTime.value) {
			dispenseTime.value = +this.value - 1;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			handleSigns (dispenseTimeValueSign, dispenseTimeSign, dispenseTime.value)
			acceleratedRangeGraphic.style.width = percString(+acceleratedSlider.value - +dispenseTime.value);
			acceleratedRangeGraphic.style.left = percString(+dispenseTime.value);
		}
		errorHandler();
		guanteeNoOverlap()
	}
	function acceleratedHandler () {
		if (this.value <= (+dispenseTime.value + 2)) {
			this.value = +dispenseTime.value + 2;
		} 

		let adjust = Math.floor(10 * (+this.value / 1440));
		acceleratedGraphic.style.left = percString(this.value - adjust);
		handleSigns (acceleratedTimeValueSign, acceleratedSign, this.value)


		if (+this.value >= +missedDoseSlider.value) {
			missedDoseSlider.value = +this.value - 1;
			missedDoseGraphic.style.left = percString(missedDoseSlider.value);
			handleSigns (missedDoseValueSign, missedDoseSign, missedDoseSlider.value)

		}

		acceleratedRangeGraphic.style.width = percString(+acceleratedSlider.value - +dispenseTime.value);
		acceleratedRangeGraphic.style.left = percString(+dispenseTime.value);
		missedDoseRangeGraphic.style.width = percString(+missedDoseSlider.value - +acceleratedSlider.value);
		missedDoseRangeGraphic.style.left = percString(+acceleratedSlider.value);
		guanteeNoOverlap()
	}
	function missedDoseHandler () {
		if (this.value <= (+acceleratedSlider.value + 2)) {
			this.value = +acceleratedSlider.value + 2;
		} 

		let adjust = Math.floor(10 * (+this.value / 1440));
		missedDoseGraphic.style.left = percString(this.value - adjust);
		handleSigns (missedDoseValueSign, missedDoseSign, this.value)


		acceleratedRangeGraphic.style.width = percString(+acceleratedSlider.value - +dispenseTime.value);
		acceleratedRangeGraphic.style.left = percString(+dispenseTime.value);
		missedDoseRangeGraphic.style.width = percString(+missedDoseSlider.value - +acceleratedSlider.value);
		missedDoseRangeGraphic.style.left = percString(+acceleratedSlider.value);
		guanteeNoOverlap()
	}



	document.getElementById('start-time-slider').addEventListener('input', startTimeHandler)
	document.getElementById('dispense-time-slider').addEventListener('input', dispenseTimeHandler)
	document.getElementById('end-time-slider').addEventListener('input', endTimeHandler)
	document.getElementById('accelerated-slider').addEventListener('input', acceleratedHandler)
	document.getElementById('missed-dose-slider').addEventListener('input', missedDoseHandler)
	document.getElementById('open-manual').addEventListener('click', openManual)

	function openManual() {
		if (document.getElementById('manual-entry').classList.contains('open')) {
			document.getElementById('manual-entry').classList.remove('open');
			document.getElementById('open-manual').innerText = "manual input";
		} else {
			document.getElementById('manual-entry').classList.add('open');
			document.getElementById('open-manual').innerText = "close manual input";
		}
		
	}


})()