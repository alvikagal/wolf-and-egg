var speedEgg = 200;
var ballTopLeft = "egg-left-top";
var ballBottomLeft = "egg-left-bottom";
var ballTopRight = "egg-right-top";
var ballBottomRight = "egg-right-bottom";
var timerBall = null;
var pxLeft = 410;
var pxRight = 550;
var pxLeftCreate = 400;
var pxRightCreate = 570;
var music = new Audio('audio/click.mp3');

// случайное число до max
function random(max) {
	var rand = Math.random() * (max + 1); 
  rand = Math.floor(rand+1);	//округление до целого числа
  return rand;	//возврат случайного целого числа
}

//поворот яйца вправо
function randomPozition() {
	var napravlenie = random(3);
	if (napravlenie == 1) {				//если 1, то 
		createBall(ballTopLeft);	//вверху слева
	}
	if (napravlenie == 2) {				//если 2, то
		createBall(ballBottomLeft);	//внизу слева
	}
	if (napravlenie == 3) {				//если 3, то
		createBall(ballTopRight);	//вверху справа
	}
	if (napravlenie == 4) {				//если 1, то
		createBall(ballBottomRight);	//внизу справа
	}	
}