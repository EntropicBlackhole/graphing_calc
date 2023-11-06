const Canvas = require("canvas");
const express = require("express");
const favicon = require("serve-favicon");

let canvasSideLength = 500;

const canvas = Canvas.createCanvas(canvasSideLength, canvasSideLength);
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.fillStyle = "white";

redraw();

const app = express();

console.log(
	"Listening on port 3000\nhttp://localhost:3000\nExample of usage: http://localhost:3000/x**2+5*x-10"
);

app.use(favicon("./src/localhost/favicon.ico"));
// app.use()

app.get("/:equation", function (req, res) {
    const equation = req.params.equation;
    redraw();
	console.log(equation);
	// if (equation == "") return res.send("No equation");

	let x = (-1 * canvasSideLength) / 2;
	let y = -1 * eval(equation);

	ctx.beginPath();
	ctx.moveTo(x + canvasSideLength / 2, y + canvasSideLength / 2);
	for (let x = (-1 * canvasSideLength) / 2; x < canvasSideLength / 2; x++) {
		y = -1 * eval(equation);
		ctx.lineTo(x + canvasSideLength / 2, y + canvasSideLength / 2);
		// console.log(x, y)
		// break
	}
	ctx.stroke();
	const image = canvas.toBuffer("image/png");
	// res.writeHead(200, {
	//     'Content-Type': 'image/png',
	//     'Content-Length': image.length
	// });
	res.end(image);
	// res.send(image)
});

app.listen(3000);

function redraw() {
    ctx.lineWidth = 1;
	ctx.fillRect(0, 0, canvasSideLength, canvasSideLength);

	ctx.beginPath();
	ctx.moveTo(canvasSideLength / 2, 0);
	ctx.lineTo(canvasSideLength / 2, canvasSideLength);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, canvasSideLength / 2);
	ctx.lineTo(canvasSideLength, canvasSideLength / 2);
    ctx.stroke();
    ctx.lineWidth = 2;
}
