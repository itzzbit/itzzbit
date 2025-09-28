// Система данных для GD Demon List
window.gdData = {
    // Формула расчета очков: 1000 - (позиция - 1) * 5
    calculatePoints: function(rank) {
        return Math.max(100, 1000 - (rank - 1) * 5);
    },

    // Данные уровней
    levels: [
        {
            id: 1,
            rank: 1,
            name: "Silent Clubstep",
            gdId: "123456",
            creator: "Krmal",
            verifier: "Sunix",
            youtubeId: "dQw4w9WgXcQ",
            points: 1000 // 1000 - (1-1)*5
        },
        {
            id: 2,
            rank: 2,
            name: "Slaughterhouse",
            gdId: "234567",
            creator: "IcEDCave",
            verifier: "Zoink",
            youtubeId: "dQw4w9WgXcQ",
            points: 995 // 1000 - (2-1)*5
        },
        {
            id: 3,
            rank: 3,
            name: "Acheron",
            gdId: "345678",
            creator: "Ryamu",
            verifier: "GuitarHeroStyles",
            youtubeId: "dQw4w9WgXcQ",
            points: 990 // 1000 - (3-1)*5
        },
        {
            id: 4,
            rank: 4,
            name: "Abyss of Darkness",
            gdId: "456789",
            creator: "Exen",
            verifier: "knobbelboy",
            youtubeId: "dQw4w9WgXcQ",
            points: 985 // 1000 - (4-1)*5
        },
        {
            id: 5,
            rank: 5,
            name: "Kyouki",
            gdId: "567890",
            creator: "Demishio",
            verifier: "Waivve",
            youtubeId: "dQw4w9WgXcQ",
            points: 980 // 1000 - (5-1)*5
        }
    ],

    // Данные игроков (passedLevels содержит id уровней которые они прошли)
    players: [
        {
            id: 1,
            name: "SpaceUK",
            passedLevels: [1, 2, 3, 4, 5], // Прошёл все топ-5 уровней
            isAdmin: true
        },
        {
            id: 2,
            name: "Zoink",
            passedLevels: [1, 2, 3], // Прошёл топ-1,2,3
            isAdmin: false
        },
        {
            id: 3,
            name: "Sunix",
            passedLevels: [1, 2], // Прошёл топ-1,2
            isAdmin: false
        },
        {
            id: 4,
            name: "Riot",
            passedLevels: [1], // Прошёл только топ-1
            isAdmin: false
        },
        {
            id: 5,
            name: "Technical",
            passedLevels: [1, 3, 5], // Прошёл топ-1,3,5
            isAdmin: false
        }
    ],

    // Автоматический расчет очков для игрока
    calculatePlayerPoints: function(player) {
        return player.passedLevels.reduce((total, levelId) => {
            const level = this.levels.find(l => l.id === levelId);
            return total + (level ? level.points : 0);
        }, 0);
    },

    // Получение количества демонов (пройденных уровней)
    getPlayerDemons: function(player) {
        return player.passedLevels.length;
    },

    // Обновление всех игроков (расчет очков и демонов)
    updateAllPlayers: function() {
        this.players.forEach(player => {
            player.points = this.calculatePlayerPoints(player);
            player.demons = this.getPlayerDemons(player);
        });
        
        // Сортировка игроков по очкам (от большего к меньшему)
        this.players.sort((a, b) => b.points - a.points);
        
        // Обновление рангов
        this.players.forEach((player, index) => {
            player.rank = index + 1;
        });
    },

    // Инициализация данных
    init: function() {
        this.updateAllPlayers();
        console.log("GD Data System initialized!");
    }
};

// Автоматическая инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    window.gdData.init();
});