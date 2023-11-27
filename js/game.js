'use strict';

(() => {
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const game = (language) => {
    const result = {
      player: 0,
      computer: 0,
    };

    const lang = language === 'EN' || language === 'ENG' ?
      FIGURES_ENG : FIGURES_RUS;

    const indexOfFirstElem = lang.indexOf(lang[0]);
    const indexOfLastElem = lang.indexOf(lang[lang.length - 1]);

    return function start() {
      const computer =
        lang[getRandomIntInclusive(indexOfFirstElem, indexOfLastElem)];
      let player;
      let resOfGame;

      player = prompt(lang.join(', '));

      if (player === '') {
        return start();
      }

      if (player === null) {
        const isGoOut = confirm('Вы точно хотите покинуть игру?');

        if (isGoOut) {
          alert(`
        Результат:
          Компьютер ${result.computer}
          Игрок ${result.player}`);
          return;
        } else {
          return start();
        }
      }

      player = lang.find(item => item.startsWith(player.toLowerCase()));
      if (!player) {
        return start();
      }

      if (player[0] === computer[0]) {
        resOfGame = 'Ничья';
      } else if (player[0] && computer[1] ||
        player[1] && computer[2] ||
        player[2] && computer[0]) {
        result.player++;
        resOfGame = 'Вы выйграли';
      } else {
        result.computer++;
        resOfGame = 'Компьютер выйграл';
      }

      alert(`
        Компьютер: ${computer}
        Вы: ${player}
        ${resOfGame}`);

      if (resOfGame === 'Ничья') {
        return start();
      }

      const isContinue = confirm('Еще?');

      if (isContinue) {
        return start();
      } else {
        alert(`
        Результат:
          Компьютер ${result.computer}
          Игрок ${result.player}`);
      }
    };
  };

  window.rps = game;
})();
