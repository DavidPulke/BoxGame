const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
let winFlag = document.querySelector('.winFlag');
let winButton = document.querySelector('.threeD-link');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

function openSettings() {
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.title').style.display = 'none';
}

function closeSettings() {
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.title').style.display = 'block';
}

function openMap() {
    document.querySelector('.map').style.display = 'block';
    document.querySelector('.title').style.display = 'none';
}

function closeMap() {
    document.querySelector('.map').style.display = 'none';
    document.querySelector('.title').style.display = 'block';
}

class Player {
    constructor() {
        this.speed = 8;
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        };
        this.width = 30;
        this.height = 30;
        this.jumpCount = 0;
        this.maxJumps = 2;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }

    jump() {
        if (this.jumpCount < this.maxJumps && this.position.y < 440) {
            this.velocity.y = -10;
            this.jumpCount++;
            document.querySelector('.welcome').style.display = 'none';
        } else if (this.position.y > 435) {
            document.querySelector('.welcome').style.display = 'block';
            this.jumpCount = 0;
            console.log('false jump');
        }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

function createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

let platformImage = createImage('../gallery/Platform.png');
let winingBoxImage = createImage('../gallery/Mario-Wining-Box.jpg');
let background = createImage('../gallery/Background-Game.png');

class GenricObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

let genricObject = [
    new GenricObject({
        x: 0, y: 0, image: background
    })
];

let player = new Player();
let platforms = [
    new Platform({ x: -3, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 5 + 500, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width * 5 + 370, y: 350, image: winingBoxImage }),
    new Platform({ x: platformImage.width * 5 + 500, y: 350, image: platformImage })
];

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
};

player.update();

let scrollOffSet = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    genricObject.forEach(genricObject => {
        genricObject.draw();
    });

    platforms.forEach(platform => {
        platform.draw();
    });

    player.update();

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            scrollOffSet += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            });
            genricObject.forEach(genricObject => {
                genricObject.position.x -= player.speed * 0.66;
            });
        } else if (keys.left.pressed && scrollOffSet > 0) {
            scrollOffSet -= player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            });
            genricObject.forEach(genricObject => {
                genricObject.position.x += player.speed * 0.66;
            });
        }
    }

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width + player.velocity.x >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    });

    if (scrollOffSet > 2000) {
        player.position.x = 350;
        player.position.y = platform.height;
        keys.right.pressed = false;
        removeEventListener('keydown', (keys));
        document.querySelector(".winFlag").style.display = 'block';
        winButton.style.display = 'block';
        document.querySelector('.welcome').style.display = 'none';
        document.querySelector('.title').classList.add('fade');
        setTimeout(function () {
            document.querySelector('.title').style.display = 'none';
        }, 2000);
    }

    if (player.position.y > canvas.height) {
        init();
    }
}

function init() {
    platformImage = createImage('../gallery/Platform.png');
    winingBoxImage = createImage('../gallery/Mario-Wining-Box.jpg');
    background = createImage('../gallery/Background-Game.png');

    genricObject = [
        new GenricObject({
            x: 0, y: 0, image: background
        })
    ];

    player = new Player();
    platforms = [
        new Platform({ x: -3, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 5 + 500, y: 470, image: platformImage }),
        new Platform({ x: platformImage.width * 5 + 370, y: 350, image: winingBoxImage }),
        new Platform({ x: platformImage.width * 5 + 500, y: 350, image: platformImage })
    ];

    scrollOffSet = 0;
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('Left');
            keys.left.pressed = true;
            break;
        case 'd':
            console.log('Right');
            keys.right.pressed = true;
            break;
        case ' ':
            console.log('Up');
            keys.up.pressed = true;
            player.jump();
            break;
        case 'w':
            console.log('Up');
            keys.up.pressed = true;
            player.jump();
            break;
        default:
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.left.pressed = false;
            break;
        case 'd':
            keys.right.pressed = false;
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
});
