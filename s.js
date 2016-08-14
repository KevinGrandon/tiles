var $ = {}

// Seed generation
$.seed = (seed) => {
	let _seed = seed;
	return () => {
	    var rnd = Math.sin(_seed++) * 10000
		return rnd - Math.floor(rnd)
	}
}

let s = $.seed(1234);

// Generate grid styles
var styles = '';
var rows = 10
var cols = 10
for (var j = 1; j <= 10; j++) {
	styles += '.g' + j + ' use {transition:fill .2s,transform .2s;}'
	for (var i = 1; i <= 10; i++) {
		styles += `.g${j} use:nth-child(${i}) {fill: #606EC3; transform: rotate(30deg) translate(${36 * (i - 1) - 18 * j}px, ${31.1736 * (j - 1)}px);}.g${j} use:nth-child(${i}):hover{fill:#998cd4;}`
	}
}


var board = `<style>${styles}</style><svg width="800" height="800" viewBox="0 0 800 800">
<defs>
  <rect id="basic" x="400" y="0" width="36" height="31.1736" transform="skewX(-30)" />
</defs>`
for (var j = 1; j <= cols; j++) {
	board += `<g class="g${j}">`
	for (var i = 1; i <= rows; i++) {
		board += `<use xlink:href="#basic" />`
	}
	board += `</g>`
}
board += `</svg>`

document.body.innerHTML = board
