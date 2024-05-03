//462 linhas sem fatoração e comentários

document.addEventListener('DOMContentLoaded', function () {

    const currentScoreDisplay = document.getElementById('currentScore');
    const bestScoreDisplay = document.getElementById('bestScore');
    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const tiles = document.querySelectorAll('.tile');
    const confirmation = document.getElementById('confirmation');
    let winChecked = false;
    let gameOver = false;
    let moved = false;
    let currentScore = parseInt(localStorage.getItem('currentScore')) || 0;
    let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;

    window.onload = function () {
        bestScoreDisplay.textContent = bestScore;
    }

    function updateScore() {
        currentScoreDisplay.textContent = currentScore;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestScoreDisplay.textContent = bestScore;
            localStorage.setItem('bestScore', bestScore.toString());
        }
        localStorage.setItem('currentScore', currentScore.toString());
    }

    function generateRandomTile() {
        const emptyTiles = document.querySelectorAll('.tile');
        const zeroTiles = Array.from(emptyTiles).filter(tile => tile.textContent === '0');
        if (zeroTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * zeroTiles.length);
            zeroTiles[randomIndex].textContent = Math.random() < 0.9 ? '2' : '4';
            tiles.forEach(tile => setColor(tile));
        }
    }

    function createBoard() {
        currentScore = 0;
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            if (tile.textContent === '') {
                tile.textContent = '0';
            }
        });

        generateRandomTile();
        generateRandomTile();
        tiles.forEach(tile => setColor(tile));
    }

    function checkMovesAvailable() {
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    return true;
                }
            }
        }
        return false;
    }

    async function checkWin() {
        if (!winChecked) {
            for (const tile of tiles) {
                if (tile.textContent === '2048') {
                    showConfirmation();
                    winChecked = true;
                }
            }
        }
    }
    function checkGameOver() {
        // Se o jogo já terminou, retorna
        if (gameOver) {
            return;
        }

        // Verifica se o jogador ganhou
        checkWin();

        // Verifica se ainda há movimentos disponíveis
        if (!checkMovesAvailable()) {
            // Verifica se o tabuleiro está completamente preenchido
            let boardFilled = true;
            for (let row = 1; row <= 4; row++) {
                for (let col = 1; col <= 4; col++) {
                    const currentTile = document.querySelector(`.row${row}.column${col}`);
                    const rightTile = document.querySelector(`.row${row}.column${col + 1}`);
                    const bottomTile = document.querySelector(`.row${row + 1}.column${col}`);

                    if ((rightTile && currentTile.textContent === rightTile.textContent) ||
                        (bottomTile && currentTile.textContent === bottomTile.textContent)) {
                        // Se houver dois blocos adjacentes com o mesmo valor, o jogo não acabou
                        return;
                    }

                    if (currentTile.textContent === '0') {
                        // Se houver algum bloco vazio, o jogo não acabou
                        boardFilled = false;
                    }
                }
            }

            // Se o tabuleiro estiver completamente preenchido, exibe o alerta de game over
            if (boardFilled) {
                alert("Game Over. Não há mais movimentos possíveis");
                gameOver = true; // Atualiza a variável de controle
                resetGame();
            }
        }
    }

    function setColor(tile) {
        const whiteColor = "#ececec";
        const blackColor = "#414141";
        switch (tile.textContent) {
            case '0':
                tile.style.backgroundColor = whiteColor;
                tile.style.color = whiteColor;
                break;
            case '2':
                tile.style.backgroundColor = '#EEE4DA';
                tile.style.color = blackColor;
                break;
            case '4':
                tile.style.backgroundColor = '#dcd0c4';
                tile.style.color = blackColor;
                break;
            case '8':
                tile.style.backgroundColor = '#f8e8b3';
                tile.style.color = blackColor;
                break;
            case '16':
                tile.style.backgroundColor = '#EDCC62';
                tile.style.color = blackColor;
                break;
            case '32':
                tile.style.backgroundColor = '#f1c533';
                tile.style.color = blackColor;
                break;
            case '64':
                tile.style.backgroundColor = '#F69664';
                tile.style.color = blackColor;
                break;
            case '128':
                tile.style.backgroundColor = '#F77C5F';
                tile.style.color = blackColor;
                break;
            case '256':
                tile.style.backgroundColor = '#fe9233';
                tile.style.color = blackColor;
                break;
            case '512':
                tile.style.backgroundColor = '#F75F3B';
                tile.style.color = blackColor;
                break;
            case '1024':
                tile.style.backgroundColor = '#c44427';
                tile.style.color = whiteColor;
                break;
            case '2048':
                tile.style.backgroundColor = '#E7B51E';
                tile.style.color = blackColor;
                break;
            default:
                break;
        }
        if (parseInt(tile.textContent) > 2048) {
            tile.style.backgroundColor = '#272625'
            tile.style.color = whiteColor
        }
    }

    function showConfirmation() {
        confirmation.classList.remove('hidden');
    }

    function hideConfirmation() {
        confirmation.classList.add('hidden');
    }

    document.getElementById('confirmOk').addEventListener('click', resetGame);
    document.getElementById('confirmCancel').addEventListener('click', hideConfirmation);


    function move(direction) {

        const startRow = (direction === 'up') ? 1 : 4;
        const startCol = (direction === 'left') ? 1 : 4;
        const rowIncrement = (direction === 'up') ? 1 : -1;
        const colIncrement = (direction === 'left') ? 1 : -1;
        const endRow = (direction === 'up') ? 4 : 1;
        const endCol = (direction === 'left') ? 4 : 1;

        if (direction === 'up' || direction === 'down') {
            for (let col = 1; col <= 4; col++) {
                for (let row = startRow; (direction === 'up') ? row <= 3 : row >= 2; row += rowIncrement) {
                    const currentTile = document.querySelector(`.row${row}.column${col}`);
                    if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                        let nextRow = row + rowIncrement;
                        while (nextRow >= 1 && nextRow <= 4) {
                            const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                            if (nextTile.textContent === '0') {
                                nextRow += rowIncrement;
                            } else if (nextTile.textContent === currentTile.textContent) {
                                const sum = parseInt(currentTile.textContent) * 2;
                                currentScore += sum
                                currentTile.textContent = sum.toString();
                                nextTile.textContent = '0';
                                moved = true;
                                currentTile.classList.remove('grow');
                                currentTile.classList.add('grow');
                                void currentTile.offsetWidth;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                for (let row = startRow; (direction === 'up') ? row <= 3 : row >= 2; row += rowIncrement) {
                    const currentTile = document.querySelector(`.row${row}.column${col}`);
                    if (currentTile.textContent === '0') {
                        let nextRow = row + rowIncrement;
                        while (nextRow >= 1 && nextRow <= 4 && document.querySelector(`.row${nextRow}.column${col}`).textContent === '0') {
                            nextRow += rowIncrement;
                        }
                        if (nextRow >= 1 && nextRow <= 4) {
                            const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                            currentTile.textContent = nextTile.textContent;
                            nextTile.textContent = '0';
                            moved = true;
                        }
                    }
                }
            }
        } else if (direction === 'left' || direction === 'right') {

            for (let row = 1; row <= 4; row++) {
                for (let col = startCol; (direction === 'left') ? col <= 3 : col >= 2; col += colIncrement) {
                    const currentTile = document.querySelector(`.row${row}.column${col}`);
                    if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                        let nextCol = col + colIncrement;
                        while (nextCol >= 1 && nextCol <= 4) {
                            const nextTile = document.querySelector(`.row${row}.column${nextCol}`);
                            if (nextTile.textContent === '0') {
                                nextCol += colIncrement;
                            } else if (nextTile.textContent === currentTile.textContent) {
                                const sum = parseInt(currentTile.textContent) * 2;
                                currentScore += sum
                                currentTile.textContent = sum.toString();
                                nextTile.textContent = '0';
                                moved = true;
                                currentTile.classList.remove('grow');
                                currentTile.classList.add('grow');
                                void currentTile.offsetWidth;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                for (let col = startCol; (direction === 'left') ? col <= 3 : col >= 2; col += colIncrement) {
                    const currentTile = document.querySelector(`.row${row}.column${col}`);
                    if (currentTile.textContent === '0') {
                        let nextCol = col + colIncrement;
                        while (nextCol >= 1 && nextCol <= 4 && document.querySelector(`.row${row}.column${nextCol}`).textContent === '0') {
                            nextCol += colIncrement;
                        }
                        if (nextCol >= 1 && nextCol <= 4) {
                            const nextTile = document.querySelector(`.row${row}.column${nextCol}`);
                            currentTile.textContent = nextTile.textContent;
                            nextTile.textContent = '0';
                            moved = true;
                        }
                    }
                }
            }
        }

        if (moved) {
            updateScore();
            generateRandomTile();
            moved = false;
        }

        tiles.forEach(tile => setColor(tile));
        setTimeout(() => {
            checkGameOver();
        }, 350);
    }

    document.addEventListener('keydown', function (event) {

        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
            default:
                break;
        }
    });

    upButton.addEventListener('click', () => move('up'));
    downButton.addEventListener('click', () => move('down'));
    leftButton.addEventListener('click', () => move('left'));
    rightButton.addEventListener('click', () => move('right'));

    createBoard();
    tiles.forEach(tile => setColor(tile));

});

function resetGame() {
    location.reload();
}

function newGame() {
    const confirmReset = confirm("Tem certeza de que deseja iniciar um novo jogo?");
    if (confirmReset) {
        location.reload();
    }
}

const newGameButton = document.getElementById('newGameBtn');
newGameButton.onclick = newGame;