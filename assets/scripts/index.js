document.addEventListener('DOMContentLoaded', function () {
    const currentScoreDisplay = document.getElementById('currentScore');
    const bestScoreDisplay = document.getElementById('bestScore');
    const tiles = document.querySelectorAll('.tile');
    let currentScore = 0;
    let bestScore = 0;

    // Função para criar o tabuleiro do jogo
    // Função para criar o tabuleiro do jogo e preencher as células vazias com zeros
    function createBoard() {
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

    // Função para gerar um novo número aleatório em um quadrado vazio
    function generateRandomTile() {
        const emptyTiles = document.querySelectorAll('.tile');
        const zeroTiles = Array.from(emptyTiles).filter(tile => tile.textContent === '0');
        if (zeroTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * zeroTiles.length);
            zeroTiles[randomIndex].textContent = Math.random() < 0.9 ? '2' : '4';
            tiles.forEach(tile => setColor(tile));
        }
    }

    // Função para atualizar a pontuação atual e melhor pontuação
    function updateScore() {
        currentScoreDisplay.textContent = currentScore;
        bestScoreDisplay.textContent = bestScore;
    }

    function setColor(tile) {
        switch(tile.textContent) {
            case '0':
                tile.style.backgroundColor = 'white';
                break;
            case '2':
                tile.style.backgroundColor = 'green';
                break;
            case '4':
                tile.style.backgroundColor = 'yellow';
                break;
            case '8':
                tile.style.backgroundColor = 'orange';
                break;
            case '16':
                tile.style.backgroundColor = 'darkorange';
                break;
            case '32':
                tile.style.backgroundColor = 'darkred';
                break;
            case '64':
                tile.style.backgroundColor = 'dimgray';
                break;
            case '128':
                tile.style.backgroundColor = 'limegreen';
                break;
            case '256':
                tile.style.backgroundColor = 'purple';
                break;
            // Adicione mais casos para outros valores, se necessário
            default:
                tile.style.backgroundColor = 'black'; // Cor padrão para outros valores
                break;
        }
        if(tile.textContent === '0') {
            tile.style.color = 'white'
        } else {
            tile.style.color = 'black'
        }
    }

    let moved = false; // Variável para rastrear se houve movimento

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
                            moved = true; // Marca que houve movimento
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
            generateRandomTile();
            moved = false
        }
        tiles.forEach(tile => setColor(tile));
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
            generateRandomTile();
            moved = false
        }
        tiles.forEach(tile => setColor(tile));
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
            generateRandomTile();
        }
        tiles.forEach(tile => setColor(tile));
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
            generateRandomTile();
        }
        tiles.forEach(tile => setColor(tile));
    }
    

    // Event listeners para as teclas de seta
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

    // Iniciar o jogo ao carregar a página
    createBoard();
    tiles.forEach(tile => setColor(tile));

});