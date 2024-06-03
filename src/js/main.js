const board = document.querySelector(".board")
console.log(board)
const title = document.getElementById("title__1")
const level = document.getElementById("level")
const score = document.getElementById("score")

const randomPosition = () => ~~(Math.random() * 15) + 1
let config = {
    speed: 250,
    level: 1,
    player: {
        x: randomPosition(),
        y: randomPosition(),
    },
    food: {
        x: randomPosition(),
        y: randomPosition(),
    },
    velocity: {
        x: 0,
        y: 0,
    },
    showTitle() {
        title.style.opacity = "1"
        title.style.visibility = "visible"
        title.style.zIndex = "1"
        setTimeout(function () {
            title.style.opacity = "0"
            title.style.visibility = "hidden"
            title.style.zIndex = "-1"
            title.style.transition = "0.5s"
        }, 3000)
    },
    EatFood: 0,
}
const games = {
    createFood() {
        board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x} "></div>`
    },
    createPlayer() {
        board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x} "></div>`
    },
    movePlayer() {
        config.player.x += config.velocity.x
        config.player.y += config.velocity.y

    },
    resetPlayerPosition() {
        if (config.player.x <= 0) {
            config.player.x = 1;
            config.velocity.x = 1;
        }
        if (config.player.x > 15) {
            config.player.x = 15;
            config.velocity.x = -1;
        }
        if (config.player.y <= 0) {
            config.player.y = 1;
            config.velocity.y = 1;
        }
        if (config.player.y > 15) {
            config.player.y = 15;
            config.velocity.y = -1;
        }
    },
    levelUp() {
        config.level += 1;
        level.innerHTML = "Level : " + config.level

        if (config.level == 2) {
            title.innerHTML = "Welcome!"
            config.showTitle()
        }
        if (config.level == 3) {
            title.innerHTML = "To My Website"
            config.showTitle()
        }
        if (config.level == 4) {
            title.innerHTML = "My Name Is Andri"
            config.showTitle()
        }
        if (config.level == 5) {
            title.innerHTML = '<a href="#">My Instagram</a>'
            config.showTitle()
        }

    },
    isWin() {
        if (config.player.x == config.food.x && config.player.y == config.food.y) {
            config.EatFood += 1
            score.innerHTML = "Score : " + config.EatFood
            if (config.EatFood % 2 == 0) {
                this.levelUp()
            }
            return true
        }
        return false
    },
    randomFoodPosition() {
        config.food.x = randomPosition()
        config.food.y = randomPosition()
    },

}

function movement(listen) {
    switch (listen.code) {
        case "KeyW":
            config.velocity.y = -1 // Y = Vertikal ; X = Horizontal
            config.velocity.x = 0
            break
        case "KeyS":
            config.velocity.y = 1
            config.velocity.x = 0

            break
        case "KeyA":
            config.velocity.y = 0
            config.velocity.x = -1
            break
        case "KeyD":
            config.velocity.y = 0
            config.velocity.x = 1
            break
    }
    games.movePlayer()
}
function movementMobile(btn) {
    console.log(config.velocity.x)
    switch (btn) {
        case "up":
            config.velocity.y = -1 // Y = Vertikal ; X = Horizontal
            config.velocity.x = 0
            break
        case "down":
            config.velocity.y = 1
            config.velocity.x = 0

            break
        case "left":
            config.velocity.y = 0
            config.velocity.x = -1
            break
        case "right":
            config.velocity.y = 0
            config.velocity.x = 1
            break
    }
    games.movePlayer()
}
function headMovement() {
    const playerStyle = document.getElementById('player')
    if (config.velocity.x == 1) {
        playerStyle.style.transform = "scaleX(-1)"
    }
    if (config.velocity.y == 1) {
        playerStyle.style.transform = "rotate(-90deg)"
    }
    if (config.velocity.y == -1) {
        playerStyle.style.transform = "rotate(90deg)"
    }

}

function start() {
    games.createFood()
    games.createPlayer()
    games.movePlayer()
    headMovement()
    games.resetPlayerPosition()

    const win = games.isWin()
    if (win) games.randomFoodPosition()

}
games.createPlayer()
setInterval(start, config.speed)
document.addEventListener("keydown", movement)