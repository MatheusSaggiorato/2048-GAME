document.addEventListener('DOMContentLoaded', function () {
    const currentScoreDisplay = document.getElementById('currentScore');
    const bestScoreDisplay = document.getElementById('bestScore');
    const tiles = document.querySelectorAll('.tile');
    let moved = false; // Variável para rastrear se houve movimento
    let currentScore = parseInt(localStorage.getItem('currentScore')) || 0;
    let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;

    window.onload = function () {
        // Exibe a melhor pontuação
        bestScoreDisplay.textContent = bestScore;
    }

    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    upButton.addEventListener('click', moveUp);
    downButton.addEventListener('click', moveDown);
    leftButton.addEventListener('click', moveLeft);
    rightButton.addEventListener('click', moveRight);


    function createBoard() {
        currentScore = 0;
        // Preencher apenas as células vazias com zeros
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            if (tile.textContent === '') {
                tile.textContent = '0';
            }
        });

        // Gerar os dois números aleatórios iniciais
        generateRandomTile();
        generateRandomTile();
        tiles.forEach(tile => setColor(tile));
    }

    function checkMovesAvailable() {
        // Verifica se há pelo menos uma célula vazia
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    return true; // Se houver célula vazia, ainda há movimentos possíveis
                }
            }
        }
        return false; // Se não houver células vazias, não há mais movimentos possíveis
    }

    function checkGameOver() {
        let boardFilled = true;

        // Verifica se ainda há movimentos possíveis
        if (checkMovesAvailable()) {
            return false; // Se ainda houver movimentos possíveis, o jogo não acabou
        }

        // Verifica se há dois números iguais lado a lado nas linhas ou acima e abaixo nas colunas
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                const rightTile = document.querySelector(`.row${row}.column${col + 1}`);
                const bottomTile = document.querySelector(`.row${row + 1}.column${col}`);

                if (rightTile && currentTile.textContent === rightTile.textContent) {
                    return false; // Se dois números adjacentes forem iguais na mesma linha, o jogo não acabou
                }

                if (bottomTile && currentTile.textContent === bottomTile.textContent) {
                    return false; // Se dois números adjacentes forem iguais na mesma coluna, o jogo não acabou
                }

                // Verifica se há células vazias no tabuleiro
                if (currentTile.textContent === '0') {
                    boardFilled = false;
                }
            }
        }

        // Se todas as células estiverem preenchidas e não houver movimentos possíveis, o jogo acabou
        if (boardFilled) {
            alert("Game Over. Não há mais movimentos possíveis", resetGame());
            return true;
        }

        return true; // Se nenhum dos casos acima for verdadeiro, o jogo não acabou
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

    function updateScore() {
        currentScoreDisplay.textContent = currentScore;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestScoreDisplay.textContent = bestScore;
            localStorage.setItem('bestScore', bestScore.toString());
        }
        // Atualiza o currentScore no localStorage a cada atualização
        localStorage.setItem('currentScore', currentScore.toString());
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
                tile.style.backgroundColor = '#EEE1C9';
                tile.style.color = blackColor;
                break;
            case '8':
                tile.style.backgroundColor = '#EDCC62';
                tile.style.color = blackColor;
                break;
            case '16':
                tile.style.backgroundColor = '#f5d055';
                tile.style.color = blackColor;
                break;
            case '32':
                tile.style.backgroundColor = '#f1c533';
                tile.style.color = blackColor;
                break;
            case '64':
                tile.style.backgroundColor = '#F3B27A';
                tile.style.color = blackColor;
                break;
            case '128':
                tile.style.backgroundColor = '#F69664';
                tile.style.color = blackColor;
                break;
            case '256':
                tile.style.backgroundColor = '#F77C5F';
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
                tile.style.backgroundColor = '#EDC950';
                tile.style.color = blackColor;
                break;
            default:
                break;
        }
        if (parseInt(tile.textContent) > 1024) {
            tile.style.backgroundColor = '#272625'
            tile.style.color = whiteColor
        }
    }

    function moveUp() {
        for (let col = 1; col <= 4; col++) {
            for (let row = 1; row <= 3; row++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                    let nextRow = row + 1;
                    while (nextRow <= 4) {
                        const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                        if (nextTile.textContent === '0') {
                            nextRow++;
                        } else if (nextTile.textContent === currentTile.textContent) {
                            const sum = parseInt(currentTile.textContent) * 2;
                            currentTile.textContent = sum.toString();
                            nextTile.textContent = '0';
                            // Atualiza a pontuação
                            currentScore += sum;
                            moved = true; // Marca que houve movimentocurrentTile.classList.remove('grow');

                            currentTile.classList.remove('grow');
                            currentTile.classList.add('grow'); // Adiciona a classe para animar o crescimento
                            void currentTile.offsetWidth;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
            // Movimenta os quadrados para cima
            for (let row = 1; row <= 3; row++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    let nextRow = row + 1;
                    while (nextRow <= 4 && document.querySelector(`.row${nextRow}.column${col}`).textContent === '0') {
                        nextRow++;
                    }
                    if (nextRow <= 4) {
                        const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                        currentTile.textContent = nextTile.textContent;
                        nextTile.textContent = '0';
                        moved = true; // Marca que houve movimento
                    }
                }
            }
        }

        // Verifica se houve movimento antes de gerar um novo número aleatório
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

    function moveDown() {
        for (let col = 1; col <= 4; col++) {
            for (let row = 4; row >= 2; row--) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                    let nextRow = row - 1;
                    while (nextRow >= 1) {
                        const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                        if (nextTile.textContent === '0') {
                            nextRow--;
                        } else if (nextTile.textContent === currentTile.textContent) {
                            const sum = parseInt(currentTile.textContent) * 2;
                            currentTile.textContent = sum.toString();
                            nextTile.textContent = '0';
                            // Atualiza a pontuação
                            currentScore += sum;
                            moved = true;

                            currentTile.classList.remove('grow');
                            currentTile.classList.add('grow'); // Adiciona a classe para animar o crescimento
                            void currentTile.offsetWidth;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
            // Movimenta os quadrados para baixo
            for (let row = 4; row >= 2; row--) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    let nextRow = row - 1;
                    while (nextRow >= 1 && document.querySelector(`.row${nextRow}.column${col}`).textContent === '0') {
                        nextRow--;
                    }
                    if (nextRow >= 1) {
                        const nextTile = document.querySelector(`.row${nextRow}.column${col}`);
                        currentTile.textContent = nextTile.textContent;
                        nextTile.textContent = '0';
                        moved = true;
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

    function moveRight() {
        let moved = false; // Variável para rastrear se houve movimento

        for (let row = 1; row <= 4; row++) {
            for (let col = 4; col >= 2; col--) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                    let prevCol = col - 1;
                    while (prevCol >= 1) {
                        const prevTile = document.querySelector(`.row${row}.column${prevCol}`);
                        if (prevTile.textContent === '0') {
                            prevCol--;
                        } else if (prevTile.textContent === currentTile.textContent) {
                            const sum = parseInt(currentTile.textContent) * 2;
                            currentTile.textContent = sum.toString();
                            prevTile.textContent = '0';
                            // Atualiza a pontuação
                            currentScore += sum;
                            moved = true; // Marca que houve movimento

                            currentTile.classList.remove('grow');
                            currentTile.classList.add('grow'); // Adiciona a classe para animar o crescimento
                            void currentTile.offsetWidth;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }

            for (let col = 4; col >= 2; col--) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    let prevCol = col - 1;
                    while (prevCol >= 1 && document.querySelector(`.row${row}.column${prevCol}`).textContent === '0') {
                        prevCol--;
                    }
                    if (prevCol >= 1) {
                        const prevTile = document.querySelector(`.row${row}.column${prevCol}`);
                        currentTile.textContent = prevTile.textContent;
                        prevTile.textContent = '0';
                        moved = true; // Marca que houve movimento
                    }
                }
            }
        }

        // Verifica se houve movimento antes de gerar um novo número aleatório
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

    function moveLeft() {
        let moved = false; // Variável para rastrear se houve movimento

        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 3; col++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent !== '0' && currentTile.textContent !== '') {
                    let nextCol = col + 1;
                    while (nextCol <= 4) {
                        const nextTile = document.querySelector(`.row${row}.column${nextCol}`);
                        if (nextTile.textContent === '0') {
                            nextCol++;
                        } else if (nextTile.textContent === currentTile.textContent) {
                            const sum = parseInt(currentTile.textContent) * 2;
                            currentTile.textContent = sum.toString();
                            nextTile.textContent = '0';
                            // Atualiza a pontuação
                            currentScore += sum;
                            moved = true; // Marca que houve movimento

                            currentTile.classList.remove('grow');
                            currentTile.classList.add('grow'); // Adiciona a classe para animar o crescimento
                            void currentTile.offsetWidth;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }

            for (let col = 1; col <= 3; col++) {
                const currentTile = document.querySelector(`.row${row}.column${col}`);
                if (currentTile.textContent === '0') {
                    let nextCol = col + 1;
                    while (nextCol <= 4 && document.querySelector(`.row${row}.column${nextCol}`).textContent === '0') {
                        nextCol++;
                    }
                    if (nextCol <= 4) {
                        const nextTile = document.querySelector(`.row${row}.column${nextCol}`);
                        currentTile.textContent = nextTile.textContent;
                        nextTile.textContent = '0';
                        moved = true; // Marca que houve movimento
                    }
                }
            }
        }

        // Verifica se houve movimento antes de gerar um novo número aleatório
        if (moved) {
            updateScore();
            generateRandomTile();
            moved = false;
        }
        tiles.forEach(tile => setColor(tile));
        setTimeout(() => {
            checkGameOver();
        }, 300);

    }

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            default:
                break;
        }
    });

    createBoard();
    tiles.forEach(tile => setColor(tile));

});

function resetGame() {
    location.reload();
}

function newGame() {
    // Pergunta ao jogador se ele tem certeza de que deseja iniciar um novo jogo
    const confirmReset = confirm("Tem certeza de que deseja iniciar um novo jogo?");
    // Se o jogador confirmar, inicie um novo jogo
    if (confirmReset) {
        location.reload(); // Recarrega a janela atual
    }
}

const newGameButton = document.getElementById('newGameBtn');
newGameButton.onclick = newGame;