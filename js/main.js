//Это самый главный файл

// Это функция для запуска игры, она создает поле старта игры
function start(){
	//Вызываем функцию создания стартового блока
	createStartGameBlock();
	// Создаем блок правил
	createRules();
	// создаем блок выключения музыки
	createSoundBlock();
	// при клике на кнопку запускаем игру (функцию создания игры)
	startBtn.onclick = createGame;
}

// функция старта игры
function createGame(){
	// запускаем музыку игры
	musicOn("audio/pole.mp3");
	// удаляем блок начала игры
	deleteStartBlock();
	// создаем счет
	createScore();
	// создаем таймер
	createTimer();
	// создаем жизни
	createLifes();
	// создаем волка
	createWolf();
	// создаем блок куриц
	createHens();
	// запускаем таймер
	startTimer();

	startPause();
	// считываем кнопки с клавы (при нажатии на клавишу вызыем функцию)
	document.onkeydown = checkKey;
}

// функция конца игры
function gameEnd(){
	// удаляем счет
	deleteScore();
	// удаляем таймер
	deleteTimer();
	// удаляем жизни
	deleteLifes();
	// удаляем волка
	deleteWolf();
	// удаляем блок куриц
	deleteHen();
	// очищаем поле от яиц
	gameFild();
	// выключаем звук который создан для игры
	musicOff();
	// заново созаем кнопку музыки
	createSoundBlock();
	// Создаем блок правил
	createRules();
	// передаем в функцию музыку для конца игры
	musicOn("audio/end.mp3");
	// создаем блок конца игры
	createEndGameBlock();
	// при клике на рестарт вызываем функцию рестарта
	restartBtn.onclick = restartGame;
}

// функция перезапуска игры
function restartGame(){
	// выключаем музыку конца
	musicOff();
	// удаляем блок конца
	deleteEndGameBlock();
	// обнуляем переменные
	recountVariables();
	// Создаем блок правил
	createRules();
	// запускаем старт
	createGame();
}

// запуск таймера
function startTimer(){
	// запускаем интервал в 1 сек
	var t = setInterval(function(){
		if(pause == 0) {
			// отнимем 1 каждую секунду
			time.innerText -= 1;
			// если время 0, вызываем конец игры
			if(time.innerText == 0){
				// очищаем интервал
				clearInterval(t);
				// запуск коцна игры
				gameEnd();
			}
		} // если нет паузы, то
		
		// интервал 1 сек
	}, 1000);
}

// запускаем старт
start();