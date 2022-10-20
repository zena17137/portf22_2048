const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const resultDisplay = document.querySelector('#result');
const width = 4;
let squares = [];

//create a playing board
function createBoard() {
	for (let i = 0; i < width * width; i++) {
		let square = document.createElement('div');
		square.innerHTML = 0;
		gridDisplay.appendChild(square);
		squares.push(square);
	}
	generate();
	generate();
}
createBoard();

//generate a number randomly
function generate() {
	let randomNumber = Math.floor(Math.random() * squares.length);
	if (squares[randomNumber].innerHTML == 0) {
		squares[randomNumber].innerHTML = 2;
	} else generate();
	console.log('generated!');
}

//swipe right
function moveRight() {
	for (let i = 0; i < 16; i++) {
		if (i % 4 === 0) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + 1].innerHTML;
			let totalThree = squares[i + 2].innerHTML;
			let totalFour = squares[i + 3].innerHTML;
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

			//console.log(row);

			let filteredRow = row.filter((num) => num);
			//console.log(filteredRow);
			let missing = 4 - filteredRow.length;
			let zeros = Array(missing).fill(0);
			//console.log(zeros);
			let newRow = zeros.concat(filteredRow);
			//console.log(newRow);

			squares[i].innerHTML = newRow[0];
			squares[i + 1].innerHTML = newRow[1];
			squares[i + 2].innerHTML = newRow[2];
			squares[i + 3].innerHTML = newRow[3];
		}
	}
}

//moveRight();

//swipe left
function moveLeft() {
	for (let i = 0; i < 16; i++) {
		if (i % 4 === 0) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + 1].innerHTML;
			let totalThree = squares[i + 2].innerHTML;
			let totalFour = squares[i + 3].innerHTML;
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

			//console.log(row);

			let filteredRow = row.filter((num) => num);
			//console.log(filteredRow);
			let missing = 4 - filteredRow.length;
			let zeros = Array(missing).fill(0);
			//console.log(zeros);
			let newRow = filteredRow.concat(zeros);
			//console.log(newRow);

			squares[i].innerHTML = newRow[0];
			squares[i + 1].innerHTML = newRow[1];
			squares[i + 2].innerHTML = newRow[2];
			squares[i + 3].innerHTML = newRow[3];
		}
	}
}

//moveLeft();


//swipe down
function moveDown() {
	for (let i = 0; i < 4; i++) {
		let totalOne = squares[i].innerHTML;
		let totalTwo = squares[i + width].innerHTML;
		let totalThree = squares[i + width * 2].innerHTML;
		let totalFour = squares[i + width * 3].innerHTML;
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

		let filteredColumn = column.filter((num) => num);
		let missing = 4 - filteredColumn.length;
		let zeros = Array(missing).fill(0);
		let newColumn = zeros.concat(filteredColumn);

		squares[i].innerHTML = newColumn[0];
		squares[i + width].innerHTML = newColumn[1];
		squares[i + width * 2].innerHTML = newColumn[2];
		squares[i + width * 3].innerHTML = newColumn[3];
	}
}

//swipe up
function moveUp() {
	for (let i = 0; i < 4; i++) {
		let totalOne = squares[i].innerHTML;
		let totalTwo = squares[i + width].innerHTML;
		let totalThree = squares[i + width * 2].innerHTML;
		let totalFour = squares[i + width * 3].innerHTML;
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

		let filteredColumn = column.filter((num) => num);
		let missing = 4 - filteredColumn.length;
		let zeros = Array(missing).fill(0);
		let newColumn = filteredColumn.concat(zeros)

		squares[i].innerHTML = newColumn[0];
		squares[i + width].innerHTML = newColumn[1];
		squares[i + width * 2].innerHTML = newColumn[2];
		squares[i + width * 3].innerHTML = newColumn[3];
	}
}

function combineRow() {
	for (let i = 0; i < 15; i++) {
		if (squares[i].innerHTML === squares[i + 1].innerHTML) {
			let combineTotal = parseInt(squares[i].innerHTML) + parseInt([squares[i + 1].innerHTML]);
			squares[i].innerHTML = combineTotal;
			squares[i + 1].innerHTML = 0;
		}
	}
}

function combineColumn() {
	for (let i = 0; i < 12; i++) {
		if (squares[i].innerHTML === squares[i + width].innerHTML) {
			let combineTotal = parseInt(squares[i].innerHTML) + parseInt([squares[i + width].innerHTML]);
			squares[i].innerHTML = combineTotal;
			squares[i + width].innerHTML = 0;
		}
	}
}

//assign keycodes

function control(e) {
	if (e.keyCode === 39) {
		keyRight();
	}
	if (e.keyCode === 37) {
		keyLeft();
	}
	if (e.keyCode === 38) {
		keyUp();
	}
	if (e.keyCode === 40) {
		keyDown();
	}
}

function keyRight() {
	moveRight();
	combineRow();
	moveRight();
	generate();
}
function keyLeft() {
	moveLeft();
	combineRow();
	moveLeft();
	generate();
}
function keyDown() {
	moveDown();
	combineRow();
	moveDown();
	generate();
}
function keyUp() {
	moveUp();
	combineRow();
	moveUp();
	generate();
}

document.addEventListener('keydown', control);
