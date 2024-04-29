/*document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.grid');
  const currentScoreDisplay = document.getElementById('currentScore');
  const bestScoreDisplay = document.getElementById('bestScore');
  let currentScore = 0;
  let bestScore = 0;

  // Função para criar o tabuleiro do jogo
  function createBoard() {
      for (let i = 0; i < 16; i++) {
          const tile = document.createElement('div');
          tile.classList.add('tile');
          grid.appendChild(tile);
      }
      generateRandomTile();
      generateRandomTile();
  }

  // Função para gerar um novo número aleatório em um quadrado vazio
  function generateRandomTile() {
      const emptyTiles = document.querySelectorAll('.tile:empty');
      if (emptyTiles.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyTiles.length);
          emptyTiles[randomIndex].textContent = Math.random() < 0.9 ? '2' : '4';
      }
  }

  // Função para atualizar a pontuação atual e melhor pontuação
  function updateScore() {
      currentScoreDisplay.textContent = currentScore;
      bestScoreDisplay.textContent = bestScore;
  }

  */
// Função para mover os números para cima
function moveUp() {
}

function moveDown() {
}

function moveRight() {
}

// Função para mover os números para a direita
function moveLeft() {
    // Loop através de cada linha
    for (let row = 1; row <= 4; row++) {
        // Loop através de cada coluna (exceto a primeira)
        for (let col = 2; col <= 4; col++) {
            const currentTile = document.querySelector(`.row${row}.column${col}`);
            if (currentTile.textContent !== '') {
                // Encontre a próxima posição vazia à esquerda
                let nextCol = col - 1;
                while (nextCol >= 1) {
                    const nextTile = document.querySelector(`.row${row}.column${nextCol}`);
                    if (nextTile.textContent === '') {
                        // Move o número para a posição vazia
                        nextTile.textContent = currentTile.textContent;
                        currentTile.textContent = '';
                        col--; // Atualiza a posição atual após o movimento
                    } else if (nextTile.textContent === currentTile.textContent) {
                        // Se os números forem iguais, soma-os
                        const sum = parseInt(nextTile.textContent) * 2;
                        nextTile.textContent = sum;
                        currentTile.textContent = '';
                        // Atualiza a pontuação
                        currentScore += sum;
                        break; // Pare de procurar após a soma
                    } else {
                        break; // Pare de procurar se encontrar um número diferente
                    }
                    nextCol--;
                }
            }
        }
    }
}










  // Event listeners para as teclas de seta
  document.addEventListener('keydown', function(event) {
      switch(event.key) {
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
 // createBoard();
//});
