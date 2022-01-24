(function(){
	const startTime = document.getElementById('slider1'),
	      startTimeGraphic = document.getElementById('start-time-graphic'),
		  dispenseTime = document.getElementById('slider2'),
		  dispenseTimeGraphic = document.getElementById('dispense-time-graphic'),
		  endTime = document.getElementById('slider3'),
		  endTimeGraphic = document.getElementById('end-time-graphic'),
		  rangeGraphic = document.getElementById('range-graphic'),
		  totalMins = 1440,
		  startTimeSign = document.getElementById('start-time-sign'),
		  dispenseTimeSign = document.getElementById('dispense-time-sign'),
		  endTimeSign = document.getElementById('end-time-sign');;


	startTime.value = 1440 * .25;
	dispenseTime.value = 1440 * .50;
	endTime.value = 1440 * .75;



	for (let i = 1; i < 24; i ++) {
		let div = document.createElement('div');
		div.classList.add("time-marker");
		document.getElementById('slider-distance').appendChild(div);
		div.style.left = `${(i / 24)*100}%`
	}

	let min = startTime.value,
		max = endTime.value;

	startTimeGraphic.style.left = `${perc(startTime.value)}%`;
	dispenseTimeGraphic.style.left = `${perc(dispenseTime.value)}%`;
	endTimeGraphic.style.left = `${perc(endTime.value)}%`;


	rangeGraphic.style.width = percString(+max - +min);
	rangeGraphic.style.left = percString(min);

	startTimeSign.style.left = percString(startTime.value);
	startTimeSign.querySelector('span').innerText = createText('start time', startTime.value);

	dispenseTimeSign.style.left = percString(dispenseTime.value);
	dispenseTimeSign.querySelector('span').innerText = createText('dispense time', dispenseTime.value);

	endTimeSign.style.left = percString(endTime.value);
	endTimeSign.querySelector('span').innerText = createText('end time', endTime.value);

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

	function slider1 () {
		if (this.value >= (+max - 2)) {
			this.value = Math.min(this.value, +max - 2);
		}
		startTimeSign.style.left = percString(this.value);
		startTimeSign.querySelector('span').innerText = createText('start time',this.value);
		startTimeGraphic.style.left = percString(this.value);
		min = this.value;
		rangeGraphic.style.left = percString(min);
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value >= +dispenseTime.value) {
			dispenseTime.value = +this.value + 1;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			dispenseTimeSign.style.left = percString(dispenseTime.value);
			dispenseTimeSign.querySelector('span').innerText = createText('dispense time',dispenseTime.value);
		}
	}

	function slider2 () {
		if (+this.value > +max) {
			this.value = +max - 3;
		} else if (+this.value < +min ) {
			this.value = +min + 3;
		}
		dispenseTimeGraphic.style.left = percString(this.value);
		dispenseTimeSign.style.left = percString(this.value);
		dispenseTimeSign.querySelector('span').innerText = createText('dispense time',this.value);
	}
	function slider3 () {
		
		if (this.value <= (+min + 2) ) {
			this.value = +min + 2;
		}
		endTimeGraphic.style.left = percString(this.value);
		endTimeSign.style.left = percString(this.value);
		endTimeSign.querySelector('span').innerText = createText('end time',this.value);
		max = this.value;
		rangeGraphic.style.width = percString(+max - +min);

		if (+this.value <= +dispenseTime.value) {
			dispenseTime.value = +this.value - 1;
			dispenseTimeGraphic.style.left = percString(dispenseTime.value);
			dispenseTimeSign.style.left = percString(dispenseTime.value);
			dispenseTimeSign.querySelector('span').innerText = createText('dispense time',dispenseTime.value);
		}
	}

	document.getElementById('slider1').addEventListener('input', slider1)
	document.getElementById('slider2').addEventListener('input', slider2)
	document.getElementById('slider3').addEventListener('input', slider3)

})()