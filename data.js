// Система данных для GD Demon List и Challenge List
window.gdData = {
    // Формула расчета очков для демонов: 1000 - (позиция - 1) * 5
    calculateDemonPoints: function(rank) {
        return Math.max(100, 1000 - (rank - 1) * 5);
    },

    // Формула расчета очков для челленджей: 500 - (позиция - 1) * 3
    calculateChallengePoints: function(rank) {
        return Math.max(50, 500 - (rank - 1) * 3);
    },

    // Данные Extreme Demon уровней
    levels: [
        {
            id: 1,
            rank: 1,
            name: "Silent Clubstep",
            gdId: "123456",
            creator: "Krmal",
            verifier: "Sunix",
            youtubeId: "dQw4w9WgXcQ",
            points: 1000,
            type: "extreme"
        },
        {
            id: 2,
            rank: 2,
            name: "Slaughterhouse",
            gdId: "234567",
            creator: "IcEDCave",
            verifier: "Zoink",
            youtubeId: "dQw4w9WgXcQ",
            points: 995,
            type: "extreme"
        },
        {
            id: 3,
            rank: 3,
            name: "Acheron",
            gdId: "345678",
            creator: "Ryamu",
            verifier: "GuitarHeroStyles",
            youtubeId: "dQw4w9WgXcQ",
            points: 990,
            type: "extreme"
        },
        {
            id: 4,
            rank: 4,
            name: "Abyss of Darkness",
            gdId: "456789",
            creator: "Exen",
            verifier: "knobbelboy",
            youtubeId: "dQw4w9WgXcQ",
            points: 985,
            type: "extreme"
        },
        {
            id: 5,
            rank: 5,
            name: "Kyouki",
            gdId: "567890",
            creator: "Demishio",
            verifier: "Waivve",
            youtubeId: "dQw4w9WgXcQ",
            points: 980,
            type: "extreme"
        }
    ],

    // Данные Challenge уровней
    challenges: [
        {
            id: 101,
            rank: 1,
            name: "The Lightning Road",
            gdId: "111111",
            creator: "Timeless",
            verifier: "Multiple",
            youtubeId: "dQw4w9WgXcQ",
            points: 500,
            type: "challenge"
        },
        {
            id: 102,
            rank: 2,
            name: "Speed Racer",
            gdId: "222222",
            creator: "ZenthicAlpha",
            verifier: "Multiple",
            youtubeId: "dQw4w9WgXcQ",
            points: 497,
            type: "challenge"
        },
        {
            id: 103,
            rank: 3,
            name: "X",
            gdId: "333333",
            creator: "TriAxis",
            verifier: "Multiple",
            youtubeId: "dQw4w9WgXcQ",
            points: 494,
            type: "challenge"
        },
        {
            id: 104,
            rank: 4,
            name: "Death Moon",
            gdId: "444444",
            creator: "Caustic",
            verifier: "Multiple",
            youtubeId: "dQw4w9WgXcQ",
            points: 491,
            type: "challenge"
        },
        {
            id: 105,
            rank: 5,
            name: "Problematic",
            gdId: "555555",
            creator: "Dhafin",
            verifier: "Multiple",
            youtubeId: "dQw4w9WgXcQ",
            points: 488,
            type: "challenge"
        }
    ],

    // Данные игроков
    players: [
        {
            id: 1,
            name: "SpaceUK",
            passedLevels: [1, 2, 3, 4, 5],
            passedChallenges: [101, 102, 103, 104, 105],
            isAdmin: true
        },
        {
            id: 2,
            name: "Zoink",
            passedLevels: [1, 2, 3],
            passedChallenges: [101, 102, 103],
            isAdmin: false
        },
        {
            id: 3,
            name: "Sunix",
            passedLevels: [1, 2],
            passedChallenges: [101, 102],
            isAdmin: false
        },
        {
            id: 4,
            name: "Riot",
            passedLevels: [1],
            passedChallenges: [101],
            isAdmin: false
        },
        {
            id: 5,
            name: "Technical",
            passedLevels: [1, 3, 5],
            passedChallenges: [101, 103, 105],
            isAdmin: false
        }
    ],

    // Автоматический расчет очков для игрока (демоны)
    calculatePlayerDemonPoints: function(player) {
        return player.passedLevels.reduce((total, levelId) => {
            const level = this.levels.find(l => l.id === levelId);
            return total + (level ? level.points : 0);
        }, 0);
    },

    // Автоматический расчет очков для игрока (челленджи)
    calculatePlayerChallengePoints: function(player) {
        return player.passedChallenges.reduce((total, challengeId) => {
            const challenge = this.challenges.find(c => c.id === challengeId);
            return total + (challenge ? challenge.points : 0);
        }, 0);
    },

    // Получение количества демонов
    getPlayerDemons: function(player) {
        return player.passedLevels.length;
    },

    // Получение количества челленджей
    getPlayerChallenges: function(player) {
        return player.passedChallenges.length;
    },

    // Обновление всех игроков
    updateAllPlayers: function() {
        this.players.forEach(player => {
            player.demonPoints = this.calculatePlayerDemonPoints(player);
            player.challengePoints = this.calculatePlayerChallengePoints(player);
            player.totalPoints = player.demonPoints + player.challengePoints;
            player.demons = this.getPlayerDemons(player);
            player.challenges = this.getPlayerChallenges(player);
        });
        
        // Сортировка для демон-листа
        this.players.sort((a, b) => b.demonPoints - a.demonPoints);
        this.players.forEach((player, index) => {
            player.demonRank = index + 1;
        });
        
        // Сортировка для челлендж-листа
        this.players.sort((a, b) => b.challengePoints - a.challengePoints);
        this.players.forEach((player, index) => {
            player.challengeRank = index + 1;
        });
        
        // Сортировка по общим очкам
        this.players.sort((a, b) => b.totalPoints - a.totalPoints);
        this.players.forEach((player, index) => {
            player.rank = index + 1;
        });
    },

    // Функции поиска и фильтрации
    searchLevels: function(query) {
        const searchTerm = query.toLowerCase();
        return this.levels.filter(level => 
            level.name.toLowerCase().includes(searchTerm) ||
            level.creator.toLowerCase().includes(searchTerm) ||
            level.verifier.toLowerCase().includes(searchTerm)
        );
    },

    searchChallenges: function(query) {
        const searchTerm = query.toLowerCase();
        return this.challenges.filter(challenge => 
            challenge.name.toLowerCase().includes(searchTerm) ||
            challenge.creator.toLowerCase().includes(searchTerm) ||
            challenge.verifier.toLowerCase().includes(searchTerm)
        );
    },

    searchPlayers: function(query) {
        const searchTerm = query.toLowerCase();
        return this.players.filter(player => 
            player.name.toLowerCase().includes(searchTerm)
        );
    },

    // Инициализация данных
    init: function() {
        this.updateAllPlayers();
        console.log("GD Data System initialized with Challenge List!");
    }
};

// Автоматическая инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (window.gdData) {
        window.gdData.init();
    }
});
