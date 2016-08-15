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

	board = [],

	// TODO: Calculate these for each tile instead.
	playerX = 350,
	playerY = 350

for (var j = 1; j <= 10; j++) {
	styles += '.g' + j + ' use {transition:fill .2s,transform .2s;}'
	for (var i = 1; i <= 10; i++) {
		board[j] = board[j] || []
		board[j][i] = getTileForSeed(s())
		styles += `.g${j} use:nth-child(${i}){fill: #${board[j][i][0]};transform:rotate(30deg) translate(${36 * (i - 1) - 18 * j}px,${31.1736 * (j - 1)}px);}
		.g${j} use:nth-child(${i}):hover{fill:#998cd4;}
		.p${j}-${i} use{transform:translate(${playerX}px,${playerY}px);}`
	}
}


/**
 * #t - A single game tile
 * #p - Player path
 */
var board = `<style>${styles}</style><svg width="800" height="800">
<defs>
<rect id="t" x="400" y="0" width="36" height="31.1736" transform="skewX(-30)" />
<g id="p">
<path d="M10.05,12 L12.05,12 L12.05,14 L12.05,18 L14.1,18 L14.1,10 L10.05,10 L10.05,12 L10.05,12 Z M6.05,12 L6.05,10 L2,10 L2,18 L4.05,18 L4.05,14 L4.05,12 L6.05,12 L6.05,12 Z" id="Shape" fill="#E9C07F"></path>
<path d="M4.05,18 L4.05,22 L12.05,22 L12.05,18 L4.05,18 L4.05,18 Z M6.05,4 L6.05,6 L6.05,8 L2,8 L2,10 L6.05,10 L6.05,12 L4.05,12 L4.05,14 L12.05,14 L12.05,12 L10.05,12 L10.05,10 L14.1,10 L14.1,8 L10.05,8 L10.05,6 L10.05,4 L6.05,4 L6.05,4 Z" id="Shape" fill="#FFD18B"></path>
<polygon id="Shape" fill="#1EA7E1" points="4.05 14 4.05 18 12.05 18 12.05 14"></polygon>
<path d="M6.05,6 L4.05,6 L2,6 C1.43333333,6 0.966666667,6.2 0.6,6.6 C0.2,6.96666667 0,7.43333333 0,8 L0,18 C0,18.5666667 0.2,19.05 0.6,19.45 C0.966666667,19.8166667 1.43333333,20 2,20 L2.05,20 L2.05,22 C2.05,22.5666667 2.25,23.05 2.65,23.45 C3.01666667,23.8166667 3.48333333,24 4.05,24 L12.05,24 C12.6166667,24 13.1,23.8166667 13.5,23.45 C13.8666667,23.05 14.05,22.5666667 14.05,22 L14.05,20 L14.1,20 C14.6666667,20 15.15,19.8166667 15.55,19.45 C15.9166667,19.05 16.1,18.5666667 16.1,18 L16.1,8 C16.1,7.43333333 15.9166667,6.96666667 15.55,6.6 C15.15,6.2 14.7,6 14.2,6 L12.05,6 L10.05,6 L10.05,8 L14.1,8 L14.1,10 L14.1,18 L12.05,18 L12.05,22 L4.05,22 L4.05,18 L2,18 L2,10 L2,8 L6.05,8 L6.05,6 L6.05,6 Z" id="Shape" fill="#AF8F5E"></path>
<polygon id="Shape" fill="#C48647" points="6.05 2 6.05 4 10.05 4 10.05 2"></polygon>
<path d="M4.05,2 L4.05,6 L6.05,6 L6.05,4 L6.05,2 L10.05,2 L10.05,4 L10.05,6 L12.05,6 L12.05,2 C12.05,1.43333333 11.8666667,0.966666667 11.5,0.6 C11.1,0.2 10.6166667,0 10.05,0 L6.05,0 C5.48333333,0 5.01666667,0.2 4.65,0.6 C4.25,0.966666667 4.05,1.43333333 4.05,2 L4.05,2 Z" id="Shape" fill="#9A6836"></path>
</g>
</defs>`

for (var j = 1; j <= cols; j++) {
	board += `<g class="g${j}">`
	for (var i = 1; i <= rows; i++) {
		board += `<use xlink:href="#t" />`
	}
	board += `</g>`
}
board += `<g class="p5-5"><use xlink:href="#p"/></g>
</svg>`

document.body.innerHTML = board
