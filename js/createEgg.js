// случайное число до max
function random(max) {
	var rand = Math.random() * (max + 1); 
	rand = Math.floor(rand+1);	//округление до целого числа
	return rand;	//возврат случайного целого числа
}

//поворот яйца вправо
function randomPozition() {
	switch(random(3)) {
		case 1: createBall(ballTopLeft);		//вверху слева 
		break;

		case 2: createBall(ballBottomLeft);		//внизу слева
		break;

		case 3: createBall(ballTopRight);		//вверху справа
		break;

		case 4: createBall(ballBottomRight);	//внизу справа
		break;

		default:
		break;
	}	
}


/*
<div id="egg" class= соответственно месту появления >
классы: 
		"egg-left-top";
		"egg-left-bottom";
		"egg-right-top";
		"egg-right-bottom";
</div>
*/
// создаем шарики
function createBall(poz) {
//	if(quantityLifes>0) {
	var ball = document.createElement("div");	// переменная для создания блока div
	ball.id = "egg";							// присваиваем id
	ball.className = poz;						// добавляем тегу div => класс
	game.appendChild(ball);						// добавляем елемент шарик в игровое поле
	var total = 0;								// переменная для угла вращения яйца
	//==============================
	// с помощью функции интервала создаем анимацию яиц и проверку условий
	var timerBall = setInterval(function() {	// переменная интервала 
		// определяем по классу с какой стороны яйцо и меняем его позицию
		if (ball.className == "egg-left-top" || ball.className == "egg-left-bottom") {	// если слева, то
    		ball.style.top = ball.offsetTop + 3 + "px"; 				// сверху на 3px
    		ball.style.left = ball.offsetLeft + 10 + "px"; 				//слева на 10px
	        total += 45; 												// поворот вправо
	        ball.style.transform = "rotate(" + total + "deg)"; 			// применяем к стилю поворот яйца
	    } else {													// если справа, то
	        ball.style.top = ball.offsetTop + 3 + "px"; 				// сверху на 3px
	        ball.style.left = ball.offsetLeft - 10 + "px"; 				//слева на 10px
	        total -= 45; 												// поворот влево
	        ball.style.transform = "rotate(" + total + "deg)"; 			// применяем к стилю поворот яйца
	    }
		//==========================
		// для создания следующего яйца делаем проверку, чтобы с одной стороны не было больше 1 яйца
		// начальное 220 + шаг 5	400-4=399	|395 400 405|					400+6=406
		if((ball.offsetLeft >= pxLeftCreate - 1 && ball.offsetLeft <= pxLeftCreate + 6)
			// начальное 750 - шаг 5 570+1=571	|570 565 560|					570-6=564 
			|| (ball.offsetLeft <= pxRightCreate + 1 && ball.offsetLeft >= pxRightCreate - 6)) {	
				randomPozition();	//создаем шарик
		}
		//==========================
		// проверяем дошло ли яйцо до края
		if((ball.offsetLeft >= pxLeft && ball.offsetLeft <= pxLeft+10) 
			|| (ball.offsetLeft >= pxRight && ball.offsetLeft <= pxRight+10)) {
				// проверяем есть ли в это месте корзинка
			if((wolf.className == "wolf-left-top" && ball.className == "egg-left-top")
				|| (wolf.className == "wolf-left-bottom" && ball.className == "egg-left-bottom")
				|| (wolf.className == "wolf-right-top" && ball.className == "egg-right-top")
				|| (wolf.className == "wolf-right-bottom" && ball.className == "egg-right-bottom")) {
				gameScore++;	// если есть, то прибавляем очки
				score.innerText = gameScore;	// выводим на экран
				// при ловле яйца, воспроизводим звук
				music.play();
				// громкость этого звука, половина
				music.volume = 0.5;
				scoreLifes();	// тут увеличиваем жизни
			}
			else {	// если нет корзинки возле яйца, то убираем одну жизнь
				quantityLifes = quantityLifes - 1;
				// проверяем с какой стороны должен убегать цыпленок, если слева яйцо, то 
				if (ball.className == "egg-left-top" || ball.className == "egg-left-bottom") { 
					crashEgg("broken-egg-left");	// функция анимации как убегает цыпленок влево
				}
				else {								// если справа яйцо, то 
					crashEgg("broken-egg-right");	// функция анимации как убегает цыпленок влево
				}
				deleteLifes();						// функция удаления блока жизней
				createLifes();						// функция создания блока жизней
			if (quantityLifes == 0){ 				// если жизни закончились, то
				clearInterval(timerBall);			// очищаем таймер создания яиц
				gameEnd();							// запуск коцна игры
			}
		}	// после того как яйцо дошло до края - удаляем его
			ball.remove();	//удаляем яйцо
			speedGame();	//меняем скорость с каждым новым яйцом
			//=====================
		}
	}, speedEgg);	// переменная времени интервала
//	}
}


// функция анимация добавления жизни
function addLifes() {
	var chicken = document.createElement("div"); 	//создаем блок div
	chicken.id = "chicken";							// присваиваем id
	game.appendChild(chicken);						//добавляем елемент цыпленка для жизни в игровое поле
	//=====================
	// с помощью функции интервала создаем анимацию добавления жизни
	var timerChicken = setInterval(function() {		// переменная интервала
		// двигаем вправо и уменьшаем картинку
		if (chicken.offsetLeft < 935){				
			chicken.style.left = chicken.offsetLeft + 8 + "px"; 	// вправо на 8px	
			chicken.style.width = chicken.offsetWidth - 1 + "px";	// уменьшаем ширину
			chicken.style.height = chicken.offsetHeight - 1 + "px";	// уменьшаем высоту
		}
		else{
			// когда дошли до правого края - поднимаем вверх
			if (chicken.offsetTop > 15) {
				chicken.style.top = chicken.offsetTop - 2 + "px"; // сверху на 3px
			}
			else {
				clearInterval(timerChicken);	// очищаем таймер создания яиц
				chicken.remove();				// удаляем блок с цыпленком для жизни
			}
		} 
	}, 10)	// временной интервал 
}

// каждые 50 очков прибавляем жизнь и замедляем
function scoreLifes() {
	if(countEgg >= 50) {	// если досчитали до 50, то:
		countEgg = 1;		// обнуляем счетчик	
		quantityLifes++;	// прибавляем жизнь
		addLifes();			// функция анимация добавления жизни 
		deleteLifes();		// функция удаления блока жизней
		createLifes();		// функция создания блока жизней	
		speedEgg = 200;		// замедляем скорость появления яиц с помощью временного интервала
	}
	else {					// пока не досчитали до 50
		countEgg++;			// прибавляем к счетчику
	}
}

// функци анимации когда цыпленок убегает
function crashEgg(side) {
	let step = 0;									// переменная для эффекта прыжка цыпленка
	var broken = document.createElement("div"); 	//создаем блок div
	broken.className = side;						// присваиваем класс
	game.appendChild(broken);						//добавляем елемент цыпленок в игровое поле
	//=====================
	// с помощью функции интервала создаем анимацию убегания цыпленка
	var timerBroken = setInterval(function() {
		if (step == 1) {		
			broken.style.top = broken.offsetTop + 2 + "px"; //ввех на 2px
			step = 2;
		}
		else {
			broken.style.top = broken.offsetTop - 2 + "px"; //вниз на 2px
			step = 1;
		}	
		if (broken.className == "broken-egg-left") { 				// если цыпленок слева, 
			if (broken.offsetLeft > -41){							// бежит за границу левого поля игры
				broken.style.left = broken.offsetLeft - 8 + "px";	// шаг 8px	
			}
			else {
        		clearInterval(timerBroken);							// очищаем таймер создания яиц
        		broken.remove();									// удаляем элеммент цыпленка
        	}
        }
        else {														// если цыпленок слева, 
        	if (broken.offsetLeft < 1000){							// бежит за границу правого поля игры
				broken.style.left = broken.offsetLeft + 8 + "px";	// шаг 8px
			}
			else {
        		clearInterval(timerBroken);							// очищаем таймер создания яиц
        		broken.remove();									// удаляем элеммент цыпленка
        	}
        }

    }, 70)
}

// для создания нового яйца меняем растояние между ними
// и уменьшаем таймер между созданием яиц
function speedGame() {
	// уменьшаем позицию слева, в которой когда будет яйцо - мы создадим новое
	if (pxLeftCreate>270){	// минимальное расстояние между яицами 270-220=50рх
		pxLeftCreate = pxLeftCreate - 5;
	}
	else {	// если достигли минимального растояния, то меняем скорость с помощью интервала
		if (speedEgg>80) {
			speedEgg = speedEgg - 2;	
		}
	}
	// уменьшаем позицию справа, в которой когда будет яйцо - мы создадим новое
	if (pxRightCreate<700){	// минимальное расстояние между яицами 750-700=50рх
		pxRightCreate = pxRightCreate + 5;
	}
	else {	// если достигли минимального растояния, то меняем скорость с помощью интервала
		if (speedEgg>80) {
			speedEgg = speedEgg - 2;	
		}
	}	
}