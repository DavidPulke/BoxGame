let platform = document.images.namedItem = './gallery/Platform.png' // the regular platform
let background = document.images.namedItem = './gallery/Background-Game.png' // the game background
let winingBox = document.images.namedItem = './gallery/Mario-Wining-Box.jpg' // mario wining box
let shortPlatform = document.images.namedItem = './gallery/shortPlatform.png' // short platform
let miniPlatform = document.images.namedItem = './gallery/miniPlatform.png' // mini platform
let tree = document.images.namedItem = './gallery/tree.png' // mini platform
let endText = document.images.namedItem = './gallery/endText.png' // mini platform
let man = document.images.namedItem = './gallery/man.png' // mini platform



const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
let winFlag = document.querySelector('.winFlag');
let winButton = document.querySelector('.threeD-link');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;






let user = {
    name: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
}
let checkbox = document.getElementById("checkbox");


if (user.name == undefined && user.password == undefined) {
    document.getElementById("login").style.display = "none"
    document.getElementById("signup").style.display = "block"
} else if (user.name != '' && user.password != '') {
    document.getElementById("signup").classList.add('old')
    document.getElementById("login").classList.add('new')
    setTimeout(() => {
        document.getElementById("signup").style.display = "none"
    }, 1700)
}
if (localStorage.getItem("rememberMe") == "true" && user.name != '' && user.password != '') {
    document.getElementById("login").style.display = "none"
    document.getElementById("signup").style.display = "none"
    canvas.style.display = "block";
    document.querySelector('.title').innerHTML = user.name;
    document.querySelector('.title').style.display = 'block';
    document.getElementById("settingsBox").style.display = "block";
    document.getElementById("distance").style.display = "flex"
}



function signup() {
    let username = document.getElementById("name").value
    let password = document.getElementById("pass").value
    let email = document.getElementById("mail").value
    if (username != "" && password.length > 7) {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        alert('Signup successful. Please login.')
    } else {
        alert("Please provide a valid username and password (minimum 8 characters).")
    }

    if (email != "" && email.includes("@")) {
        localStorage.setItem("email", email)
    }

}

function login() {
    let username = document.getElementById("login-name").value
    let password = document.getElementById("login-pass").value



    if (username == localStorage.getItem("username") && password == localStorage.getItem("password")) {

        document.getElementById("login").style.display = "none"
        canvas.style.display = "block";
        document.querySelector('.title').innerHTML = username;
        document.querySelector('.title').style.display = 'block';
        document.getElementById("settingsBox").style.display = "block";
        document.getElementById("distance").style.display = "flex"
    } else {
        alert("username or password are incorrect")
    }

    if (checkbox.checked === true && username == localStorage.getItem("username") && password == localStorage.getItem("password")) {
        checkbox = true
        localStorage.setItem("rememberMe", checkbox)

    }


}











function openSettings() {
    document.querySelector('.settings').style.display = 'block'
    document.querySelector('.title').style.display = 'none'
}
function closeSettings() {
    document.querySelector('.settings').style.display = 'none'
    document.querySelector('.title').style.display = 'block'
}


function openMap() {
    document.querySelector('.map').style.display = 'block'
    document.querySelector('.title').style.display = 'none'
}


function closeMap() {
    document.querySelector('.map').style.display = 'none'
    document.querySelector('.title').style.display = 'block'
}






class Player {
    constructor() {
        this.speed = 8
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
        this.jumpCount = 0;
        this.maxJumps = 2;
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.position.y + this.height + this.velocity.y <= canvas.height ?
            this.velocity.y += gravity : this.velocity.y

    }

    jump() {
        if (this.jumpCount < this.maxJumps && this.position.y < 440) {
            this.velocity.y = -10; // Jump force
            this.jumpCount++;
            document.querySelector('.welcome').style.display = 'none'
        } else if (this.position.y > 435 && user.name == localStorage.getItem("username") && user.password == localStorage.getItem("password")) {
            document.querySelector('.welcome').style.display = 'block'
            this.jumpCount = 0;
        }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


// the image creation
let platformImage = createImage(platform)
let shortPlatformImage = createImage(shortPlatform)
let miniPlatformImage = createImage(miniPlatform)
let winingBoxImage = createImage(winingBox)
let treeImage = createImage(tree)
let endTextImage = createImage(endText)
let manImage = createImage(man)


class GenricObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}



let genricObject = [
    new GenricObject({
        x: 0, y: 0, image: createImage(background)
    })]

function createImage(imageSrc) {
    let image = new Image()
    image.src = imageSrc
    return image
}



let player = new Player()
let platforms = [
    new Platform({ x: -3, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 5 + 500, y: 300, image: shortPlatformImage }),

    new Platform({ x: platformImage.width * 6 + 300, y: 300, image: shortPlatformImage }),

    new Platform({ x: platformImage.width * 6 + 600, y: 470, image: miniPlatformImage }),

    new Platform({ x: platformImage.width * 6 + 700, y: 470, image: miniPlatformImage }),

    new Platform({ x: platformImage.width * 7 + 600, y: 470, image: miniPlatformImage }),

    new Platform({ x: platformImage.width * 8 + 560, y: 470, image: miniPlatformImage }),

    new Platform({ x: platformImage.width * 8 + 700, y: 470, image: miniPlatformImage }),

    new Platform({ x: platformImage.width * 9 + 735, y: 222, image: winingBoxImage }),

    new Platform({ x: platformImage.width * 10 + 530, y: 222, image: treeImage }),

    new Platform({ x: platformImage.width * 10 + 630, y: 222, image: treeImage }),

    new Platform({ x: platformImage.width * 10 + 730, y: 222, image: treeImage }),

    new Platform({ x: platformImage.width * 9 + 930, y: 210, image: endTextImage }),

    new Platform({ x: platformImage.width * 9 + 870, y: 300, image: manImage }),

    new Platform({ x: platformImage.width * 9 + 500, y: 350, image: platformImage })
]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }

}


let scrollOffSet = 0




function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genricObject.forEach(genricObject => {
        genricObject.draw()
    })

    platforms.forEach(platforn => {
        platforn.draw()
    })
    player.update()


    // התזוזה של השחקן
    if (keys.right.pressed && player.position.x < 400) { player.velocity.x = player.speed } // בלחיצה על הכפתור הימני
    else if (keys.left.pressed && player.position.x > 100) { player.velocity.x = -player.speed } // בלחיצה על הכפתור השמאלי
    else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffSet += player.speed
            platforms.forEach(platforn => {
                platforn.position.x -= player.speed
            })
            genricObject.forEach(genricObject => {
                genricObject.position.x -= player.speed * 0.66
            })

        }
        else if (keys.left.pressed && scrollOffSet > 0) {
            scrollOffSet -= player.speed
            platforms.forEach(platforn => {
                platforn.position.x += player.speed
            })
            genricObject.forEach(genricObject => {
                genricObject.position.x += player.speed * 0.66
            })
        }
    } // כאשר אני מרים את האצבע מהמקש או לא לוחץ

    // זה בשביל שברגע שהקופסה מגיעה לחפץ מסויים שתתייחס אליו בתור החפץ ולא תעבור דרכו
    platforms.forEach(platforn => {
        if (player.position.y + player.height <= platforn.position.y && player.position.y + player.height + player.velocity.y >= platforn.position.y && player.position.x + player.width + player.velocity.x >= platforn.position.x && player.position.x <= platforn.position.x + platforn.width) {
            player.velocity.y = 0
        }
    })

    /* distance made */
    let distance = document.getElementById("distance-counter");
    distance.innerHTML = `${scrollOffSet} <span class="orange">M</span>`

    //  נקודת ניצחון
    if (scrollOffSet > 4000) {
        player.position.x = 350
        player.position.y = platform.height
        keys.right.pressed = false
        removeEventListener('keydown', (keys))
        document.querySelector(".winFlag").style.display = 'block'
        document.querySelector('.welcome').style.display = 'none'
        document.querySelector('.title').classList.add('fade')
        setTimeout(function () {
            document.querySelector('.title').style.display = 'none'
        }, 2000)
        document.getElementById("last-attempt").style.display = "none"
        distance.innerHTML = ""
        localStorage.setItem("Distance", scrollOffSet)
    }


    // נקודת הפסד
    if (player.position.y > canvas.height) {
        init()
    }


    if (localStorage.getItem("Distance") != undefined) {
        document.getElementById("last-attempt").innerHTML = `<span class="green">Last Attempt:</span> ${localStorage.getItem("Distance")} <span class="green">M</span>`
    }
}
let scrollOffSetLeft = 0

animate()
setTimeout(() => {
    init()
}, 80)




function init() {
    localStorage.setItem("Distance", scrollOffSet)
    document.querySelector('.welcome').style.display = 'none'
    platformImage = createImage(platform)

    class GenricObject {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y
            }
            this.image = image
            this.width = image.width
            this.height = image.height
        }

        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }



    genricObject = [
        new GenricObject({
            x: 0, y: 0, image: createImage(background)
        })]

    function createImage(imageSrc) {
        const image = new Image()
        image.src = imageSrc
        return image
    }

    player = new Player()
    platforms = [
        new Platform({ x: -3, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 5 + 500, y: 300, image: shortPlatformImage }),

        new Platform({ x: platformImage.width * 6 + 300, y: 300, image: shortPlatformImage }),

        new Platform({ x: platformImage.width * 6 + 600, y: 470, image: miniPlatformImage }),

        new Platform({ x: platformImage.width * 6 + 700, y: 470, image: miniPlatformImage }),

        new Platform({ x: platformImage.width * 7 + 600, y: 470, image: miniPlatformImage }),

        new Platform({ x: platformImage.width * 8 + 560, y: 470, image: miniPlatformImage }),

        new Platform({ x: platformImage.width * 8 + 700, y: 470, image: miniPlatformImage }),

        new Platform({ x: platformImage.width * 9 + 735, y: 222, image: winingBoxImage }),

        new Platform({ x: platformImage.width * 10 + 530, y: 222, image: treeImage }),

        new Platform({ x: platformImage.width * 10 + 630, y: 222, image: treeImage }),

        new Platform({ x: platformImage.width * 10 + 730, y: 222, image: treeImage }),

        new Platform({ x: platformImage.width * 9 + 930, y: 210, image: endTextImage }),

        new Platform({ x: platformImage.width * 9 + 870, y: 300, image: manImage }),

        new Platform({ x: platformImage.width * 9 + 500, y: 350, image: platformImage })
    ]

    scrollOffSet = 0
}








addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'a':
            keys.left.pressed = true
            scrollOffSetLeft--
            break;
        case 'd':
            keys.right.pressed = true
            scrollOffSetLeft++
            break;
        case ' ':
            keys.up.pressed = true
            player.jump();
            break;
        case 'w':
            keys.up.pressed = true
            player.jump();
            break;

        default:
            break;
    }
})
addEventListener('keyup', ({ key }) => {

    switch (key) {
        case 'a':
            keys.left.pressed = false
            break;
        case 'd':
            keys.right.pressed = false
            break;
        case ' ':
            keys.up.pressed = false;

            break;
        case 'w':
            keys.up.pressed = false;

            break;

        default:
            break;
    }
})





