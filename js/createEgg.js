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
	if(quantityLifes>0) {
		var ball = document.createElement("div"); //создаем блок div
		ball.id = "egg";	// присваиваем id
		ball.className = poz;	//добавляем тегу div => класс
		game.appendChild(ball);//добавляем елемент шарик в игровое поле
		var total = 0;
		timerBall = setInterval(function() {
			
			if (ball.className == "egg-left-top" || ball.className == "egg-left-bottom") {
        		ball.style.top = ball.offsetTop + 3 + "px"; // сверху на 3px
        		ball.style.left = ball.offsetLeft + 10 + "px"; //слева на 10px
		        total += 45; // поворот вправо
		        ball.style.transform = "rotate(" + total + "deg)"; // применяем к стилю поворот яйца
		    } else {
		        ball.style.top = ball.offsetTop + 3 + "px"; // сверху на 3px
		        ball.style.left = ball.offsetLeft - 10 + "px"; //слева на 10px
		        total -= 45; // поворот влево
		        ball.style.transform = "rotate(" + total + "deg)"; // применяем к стилю поворот яйца
		    }

			//==========================
			// для создания следующего яйца делаем проверку, чтобы с одной стороны не было больше 1 яйца
			if((ball.offsetLeft >= pxLeftCreate && ball.offsetLeft <= pxLeftCreate + 5) 
				|| (ball.offsetLeft <= pxRightCreate && ball.offsetLeft >= pxRightCreate - 5)) {	
					randomPozition();	//создаем шарик
			}
			// проверяем дошло ли яйцо до края
			if((ball.offsetLeft >= pxLeft && ball.offsetLeft <= pxLeft + 10) 
				|| (ball.offsetLeft >= pxRight && ball.offsetLeft <= pxRight + 10)) {
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
			}
			else {	// если нет, то убираем одну жизнь
				quantityLifes = quantityLifes - 1;
				deleteLifes();
				createLifes();
				if (quantityLifes == 0){ // если жизни закончились, то
					clearInterval(timerBall);	// очищаем таймер создания яиц
					gameEnd();	// запуск коцна игры
				}
			}
				ball.remove();	//удаляем шарик
				speedGame();	//меняем скорость
				//=====================
			}
		}, speedEgg);
	}
}

// для создания нового яйца меняем растояние между ними
// и уменьшаем таймер между созданием яиц
function speedGame() {
	if (pxLeftCreate > 270){
		pxLeftCreate = pxLeftCreate - 5;
	}
	else {
		if (speedEgg > 80) {
			speedEgg = speedEgg - 2;	
		}
	}
	if (pxRightCreate < 700){
		pxRightCreate = pxRightCreate + 5;
	}
	else {
		if (speedEgg > 80) {
			speedEgg = speedEgg - 2;	
		}
	}	
}