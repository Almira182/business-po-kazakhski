// Main JavaScript file for Monopoly Game

// Store game state
const gameState = {
    playerCount: 2, // Default to 2 players
    selectedColors: {
        1: 'red',
        2: 'red',
        3: 'red',
        4: 'red'
    }, // Will store player colors
    currentPlayer: 1,
    availableColors: ['red', 'blue', 'green', 'yellow']
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons
    const playButton = document.getElementById('play-button');
    const rulesButton = document.getElementById('rules-button');
    const backToMenuButton = document.getElementById('back-to-menu');
    const goButton = document.getElementById('go-button');
    
    // Player count options
    const playerCountOptions = document.querySelectorAll('.player-count-option');
    
    // Color selection options
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Game board buttons
    const rollDiceButton = document.getElementById('roll-dice-button');
    const buyButton = document.getElementById('buy-button');
    const endTurnButton = document.getElementById('end-turn-button');
    
    // Player cards
    const playerCards = document.querySelectorAll('.player-card');
    
    // Initialize the game
    initGame();
    
    // Set up event listeners
    setupEventListeners();
    
    // Functions
    function initGame() {
        // Set default player count and select the corresponding option
        selectPlayerCount(2);
        if (playerCountOptions[1]) {
            playerCountOptions[1].classList.add('selected'); // Select the second option (2 players)
        }
        
        // Initialize player colors
        initializePlayerColors();
    }
    
    function initializePlayerColors() {
        // Set initial colors for player squares
        colorOptions.forEach((option, index) => {
            if (index < gameState.playerCount) {
                // Make visible
                option.style.display = 'block';
                
                // Set initial color (red)
                option.setAttribute('data-color', 'red');
                
                // Store in game state
                const playerNumber = option.getAttribute('data-player');
                gameState.selectedColors[playerNumber] = 'red';
            } else {
                // Hide options for players beyond the count
                option.style.display = 'none';
            }
        });
    }
    
    function setupEventListeners() {
        // Main menu navigation
        if (playButton) {
            playButton.addEventListener('click', () => {
                switchScreen('main-menu', 'preparation');
            });
        }
        
        if (rulesButton) {
            rulesButton.addEventListener('click', () => {
                switchScreen('main-menu', 'game-rules');
            });
        }
        
        // Back to menu from rules
        if (backToMenuButton) {
            backToMenuButton.addEventListener('click', () => {
                switchScreen('game-rules', 'main-menu');
            });
        }
        
        // Go button to start game
        if (goButton) {
            goButton.addEventListener('click', () => {
                switchScreen('preparation', 'game-board');
                updatePlayerCardsVisibility();
            });
        }
        
        // Player count selection
        playerCountOptions.forEach(option => {
            option.addEventListener('click', () => {
                const count = parseInt(option.getAttribute('data-count'));
                selectPlayerCount(count);
                
                // Update UI to show selection
                playerCountOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
            });
        });
        
        // Color selection
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Get current color
                const currentColor = option.getAttribute('data-color');
                
                // Get player number
                const playerNumber = option.getAttribute('data-player');
                
                // Cycle to next color
                const nextColor = getNextColor(currentColor);
                
                // Update color
                option.setAttribute('data-color', nextColor);
                updateColorOptionAppearance(option, nextColor);
                
                // Store in game state
                gameState.selectedColors[playerNumber] = nextColor;
            });
        });
        
        // Game board buttons
        if (rollDiceButton) {
            rollDiceButton.addEventListener('click', () => {
                // Simulate dice roll (not implemented in this prototype)
                console.log('Dice rolled');
            });
        }
        
        if (buyButton) {
            buyButton.addEventListener('click', () => {
                // Simulate property purchase (not implemented in this prototype)
                console.log('Buy property');
            });
        }
        
        if (endTurnButton) {
            endTurnButton.addEventListener('click', () => {
                // End current player's turn (not implemented in this prototype)
                console.log('End turn');
            });
        }
    }
    
    function switchScreen(fromScreenId, toScreenId) {
        const fromScreen = document.getElementById(fromScreenId);
        const toScreen = document.getElementById(toScreenId);
        
        if (fromScreen && toScreen) {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
        }
    }
    
    function selectPlayerCount(count) {
        gameState.playerCount = count;
        
        // Show/hide color options based on player count
        colorOptions.forEach((option, index) => {
            if (index < count) {
                option.style.display = 'block';
                
                // Make sure the color is set
                const playerNumber = option.getAttribute('data-player');
                const currentColor = gameState.selectedColors[playerNumber] || 'red';
                option.setAttribute('data-color', currentColor);
                updateColorOptionAppearance(option, currentColor);
            } else {
                option.style.display = 'none';
            }
        });
    }
    
    function getNextColor(currentColor) {
        const colorIndex = gameState.availableColors.indexOf(currentColor);
        const nextIndex = (colorIndex + 1) % gameState.availableColors.length;
        return gameState.availableColors[nextIndex];
    }
    
    function updateColorOptionAppearance(option, color) {
        // Update the fill color of the SVG using CSS filters
        switch(color) {
            case 'red':
                option.style.filter = 'none'; // Original red color
                break;
            case 'blue':
                option.style.filter = 'hue-rotate(240deg)';
                break;
            case 'green':
                option.style.filter = 'hue-rotate(120deg)';
                break;
            case 'yellow':
                option.style.filter = 'hue-rotate(60deg) saturate(2)';
                break;
        }
    }
    
    function updatePlayerCardsVisibility() {
        // Show/hide player cards based on player count
        for (let i = 1; i <= 4; i++) {
            const playerCard = document.getElementById(`player${i}-card`);
            if (playerCard) {
                if (i <= gameState.playerCount) {
                    playerCard.style.display = 'block';
                    
                    // Apply color filter if a color was selected
                    const selectedColor = gameState.selectedColors[i];
                    if (selectedColor) {
                        switch(selectedColor) {
                            case 'red':
                                playerCard.style.filter = 'none';
                                break;
                            case 'blue':
                                playerCard.style.filter = 'hue-rotate(240deg)';
                                break;
                            case 'green':
                                playerCard.style.filter = 'hue-rotate(120deg)';
                                break;
                            case 'yellow':
                                playerCard.style.filter = 'hue-rotate(60deg) saturate(2)';
                                break;
                        }
                    }
                } else {
                    playerCard.style.display = 'none';
                }
            }
        }
    }
});
