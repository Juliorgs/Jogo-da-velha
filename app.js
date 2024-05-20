document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restart-btn');
    const status = document.getElementById('status');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        if (gameState[index] !== '' || !gameActive) return;
        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            status.textContent = `O jogador ${currentPlayer} ganhou!`;
            highlightWinningCells(); 
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            status.textContent = `Empate!`;
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `É a vez do jogador ${currentPlayer}`;
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    const highlightWinningCells = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                cells[a].style.backgroundColor = 'lightblue'; 
                cells[b].style.backgroundColor = 'lightblue';
                cells[c].style.backgroundColor = 'lightblue';
                break;
            }
        }
    };

    const checkDraw = () => {
        const draw = gameState.every(cell => cell !== '');
        if (draw) {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.add('draw');
            });
            document.querySelector('.board').classList.add('draw');
        }
        return draw;
    };
    

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner', 'draw'); 
            cell.style.backgroundColor = '';
        });
        document.querySelector('.board').classList.remove('draw'); 
        status.textContent = `É a vez do jogador ${currentPlayer}`;
    };   

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});
