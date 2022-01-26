(function(){
	const startTime = document.getElementById('start-time-slider'),
	      startTimeGraphic = document.getElementById('start-time-graphic'),
		  dispenseTime = document.getElementById('dispense-time-slider'),
		  dispenseTimeGraphic = document.getElementById('dispense-time-graphic'),
		  endTime = document.getElementById('end-time-slider'),
		  endTimeGraphic = document.getElementById('end-time-graphic'),
		  rangeGraphic = document.getElementById('range-graphic'),
		  totalMins = 1440,
		  startTimeSign = document.getElementById('start-time-sign'),
		  dispenseTimeSign = document.getElementById('dispense-time-sign'),
		  endTimeSign = document.getElementById('end-time-sign'),
		  acceleratedSlider = document.getElementById('accelerated-slider'),
		  missedDoseSlider = document.getElementById('missed-dose-slider'),
		  missedDoseSign = document.getElementById('missed-dose-sign'),
		  acceleratedGraphic = document.getElementById('accelerated-graphic'),
		  acceleratedSign = document.getElementById('accelerated-sign'),
		  missedDoseGraphic = document.getElementById('missed-dose-graphic');


	startTime.value = 1440 * .25;
	dispenseTime.value = 1440 * .50;
	acceleratedSlider.value = 1440 * .60;
	missedDoseSlider.value = 1440 * .65;
	endTime.value = 1440 * .75;

	for (let i = 1; i < 24; i ++) {
		let div = document.createElement('div');
		div.classList.add("time-marker");
		document.getElementById('slider-distance').appendChild(div);
		div.style.left = `${(i / 24)*100}%`
	}

	let min = startTime.value,
		max = endTime.value;

	startTimeGraphic.style.left = percString(startTime.value);
	dispenseTimeGraphic.style.left = percString(dispenseTime.value);
	endTimeGraphic.style.left = percString(endTime.value);
	acceleratedGraphic.style.left = percString(acceleratedSlider.value);
	missedDoseGraphic.style.left = percString(missedDoseSlider.value);

	rangeGraphic.style.width = percString(+max - +min);
	rangeGraphic.style.left = percString(min);

	startTimeSign.style.left = percString(startTime.value);
	startTimeSign.querySelector('span').innerText = createText('start time', startTime.value);

	dispenseTimeSign.style.left = percString(dispenseTime.value);
	dispenseTimeSign.querySelector('span').innerText = createText('dispense time', dispenseTime.value);

	endTimeSign.style.left = percString(endTime.value);
	endTimeSign.querySelector('span').innerText = createText('end time', endTime.value);

	acceleratedSign.style.left = percString(acceleratedSlider.value);
	acceleratedSign.querySelector('span').innerText = createText('accelerated time', acceleratedSlider.value);

	missedDoseSign.style.left = percString(missedDoseSlider.value);
	missedDoseSign.querySelector('span').innerText = createText('missed dose time', missedDoseSlider.value);

	function perc(num) {
		return (num / totalMins) * 100
	}

	function percString(num) {
		return `${(num / totalMins) * 100}%`
	}

	function createText(str, val) {
		let valNumber = +val;
		let minutes = valNumber % 60;
		let hours = (valNumber - minutes) / 60;

		return `${str}: ${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
	}
	function addLeadingZero(num) {
		num = +num;
		return num < 10 ? `0${num}` : num;
	}

	function startTimeHandler () {
		if (this.value >= (+max - 2)) {
			this.value = Math.min(this.value, +max - 2);
		}
		handleSign(startTimeSign, this, 'start time')
		startTimeGraphic.style.left = percString(this.value);
		min = this.value;
		rangeGraphic.style.left = percString(min);
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value >= +dispenseTime.value) {
			dispenseTime.value = +this.value + 1;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			handleSign(dispenseTimeSign, dispenseTime, 'dispense time')
		}

		if (+this.value >= +acceleratedSlider.value) {
			acceleratedSlider.value = +this.value + 1;
			acceleratedGraphic.style.left = percString(acceleratedSlider.value);
			handleSign(acceleratedSign, acceleratedSlider, 'accelerated time')
		}

		if (+this.value >= +missedDoseSlider.value) {
			missedDoseSlider.value = +this.value + 1;
			missedDoseGraphic.style.left = percString(missedDoseSlider.value);
			handleSign(missedDoseSign, missedDoseSlider, 'accelerated time')
		}
	}

	function dispenseTimeHandler () {
		if (+this.value > +max) {
			this.value = +max - 3;
		} else if (+this.value < +min ) {
			this.value = +min + 3;
		}
		dispenseTimeGraphic.style.left = percString(this.value);

		handleSign(dispenseTimeSign, this, 'dispense time')
	}
	function endTimeHandler () {
		
		if (this.value <= (+min + 2) ) {
			this.value = +min + 2;
		}
		endTimeGraphic.style.left = percString(this.value);
		
		handleSign(endTimeSign, this, 'end time')
		max = this.value;
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value <= +dispenseTime.value) {
			dispenseTime.value = +this.value - 1;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			handleSign(dispenseTimeSign, dispenseTime, 'dispense time')
		}
	}
	function acceleratedHandler () {
		if (this.value <= (+dispenseTime.value + 2)) {
			this.value = +dispenseTime.value + 2;
		} 
		acceleratedGraphic.style.left = percString(this.value);
		handleSign(acceleratedSign, this, 'accelerated time');

	}
	function missedDoseHandler () {
		if (this.value <= (+acceleratedSlider.value + 2)) {
			this.value = +acceleratedSlider.value + 2;
		} 
		missedDoseGraphic.style.left = percString(this.value);
		handleSign(missedDoseSign, this, 'missed dose time')
	}

	function handleSign(sign, ref, str) {
		sign.style.left = percString(ref.value);
		sign.querySelector('span').innerText = createText(str, ref.value);
	}

	document.getElementById('start-time-slider').addEventListener('input', startTimeHandler)
	document.getElementById('dispense-time-slider').addEventListener('input', dispenseTimeHandler)
	document.getElementById('end-time-slider').addEventListener('input', endTimeHandler)
	document.getElementById('accelerated-slider').addEventListener('input', acceleratedHandler)
	document.getElementById('missed-dose-slider').addEventListener('input', missedDoseHandler)

})()