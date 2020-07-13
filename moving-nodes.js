const CONFIG = {
    numNodes: 40,
    minRad: 3,
    maxRad: 5
};
const COLOR = {
    r: 156,
    g: 156,
    b: 156
};

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let points = [];

// Class definitions
function Point(ctx) {
    // Random initialize x, y, and radius
    this.radius = Math.random() * (CONFIG.maxRad - CONFIG.minRad) + CONFIG.minRad;
    this.x = Math.random() * ((canvas.width - this.radius) - this.radius) + this.radius;
    this.y = Math.random() * ((canvas.height - this.radius) - this.radius) + this.radius;
    this.vel = {
        x: Math.random() * 4,
        y: Math.random() * -2
    };

    this.isXCollision = function () {
        return this.x + this.vel.x > canvas.width - this.radius || this.x + this.vel.x < this.radius;
    };
    this.isYCollision = function () {
        return this.y + this.vel.y > canvas.height - this.radius || this.y + this.vel.y < this.radius;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(" + COLOR.r + ", " + COLOR.g + ", " + COLOR.b + ", 1)";
        ctx.fill();
        ctx.closePath();
    };

    this.update = function () {
        if (this.isXCollision()) {
            this.vel.x = -this.vel.x;
        }
        if (this.isYCollision()) {
            this.vel.y = -this.vel.y;
        }

        this.x += this.vel.x;
        this.y += this.vel.y;
    }
}

function initializePoints() {
    points = [];
    for (let i = 0; i < CONFIG.numNodes; i++) {
        let o = new Point(ctx);
        points.push(o);
    }
}

function drawRelationLine(i, numberRelations) {
    if (i >= numberRelations) {

        for (let y = 1; y <= numberRelations; y++) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i-y].x, points[i-y].y);
            ctx.strokeStyle = "rgba(" + COLOR.r + ", " + COLOR.g + ", " + COLOR.b + ", .2)";
            ctx.stroke();
        }
    }
}

function createCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw();

        this.drawRelationLine(i, 2);
    }

    requestAnimationFrame(createCanvas);
}

// Listener config
const numNodes = document.getElementById("numNodes");
const minRad = document.getElementById("minRad");
const maxRad = document.getElementById("maxRad");

function setConfig(evt) {
    const elId = evt.target.id;
    CONFIG[elId] = Number(evt.target.value);

    console.log(CONFIG)

    initializePoints();
};

numNodes.addEventListener("input", setConfig);
minRad.addEventListener("input", setConfig);
maxRad.addEventListener("input", setConfig);

initializePoints();
createCanvas();