
    for (let col = 4; col >= 2; col--)
          } else if (nextTile.textContent === currentTile.textContent) {
            // Funde os números iguais
            const sum = parseInt(nextTile.textContent) * 2;
            nextTile.textContent = sum;
            currentScore += sum;
            currentTile.textContent = '';
            break;
          } else {
            // Não é possível mover o número
            break;
          }
          i++;
        }
      }
    }
  }
}