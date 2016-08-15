var $ = {}

// Seed generation
$.seed = (seed) => {
	let _seed = seed;
	return () => {
	    var rnd = Math.sin(_seed++) * 10000
	    var s = (rnd - Math.floor(rnd))
		return String(Math.floor(s*100000)).split('')
	}
}

let s = $.seed(4895745123),

	// Tiles.
	// [color, walkable]
	grass = ['27AE60', 1],
	sand = ['ECDCB8', 1]
	dirt = ['BB8044', 1]
	gravel = ['ACB8B8', 1]
	water = ['157DA8', 0]
	tileProbability = [
		grass,
		grass,
		sand,
		dirt,
		gravel,
		water
	],

	getTileForSeed = (s) => {
		return tileProbability[Math.floor(s[0] * tileProbability.length / 10)]
	},

	// Generate grid styles
	styles = 'body{text-align:center;}',

	rows = 10,

	cols = 10,

	board = []

for (var j = 1; j <= 10; j++) {
	styles += '.g' + j + ' use {transition:fill .2s,transform .2s;}'
	for (var i = 1; i <= 10; i++) {
		board[j] = board[j] || []
		board[j][i] = getTileForSeed(s())
		styles += `.g${j} use:nth-child(${i}) {fill: #${board[j][i][0]}; transform: rotate(30deg) translate(${36 * (i - 1) - 18 * j}px, ${31.1736 * (j - 1)}px);}.g${j} use:nth-child(${i}):hover{fill:#998cd4;}`
	}
}


var board = `<style>${styles}</style><svg width="800" height="800">
<defs>
  <rect id="t" x="400" y="0" width="36" height="31.1736" transform="skewX(-30)" />
</defs>`
for (var j = 1; j <= cols; j++) {
	board += `<g class="g${j}">`
	for (var i = 1; i <= rows; i++) {
		board += `<use xlink:href="#t" />`
	}
	board += `</g>`
}
board += `</svg>`

document.body.innerHTML = board
