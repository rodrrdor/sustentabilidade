const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const FPS = 60;
var trash, mouse, mouset;
var trash_cans = new Image(), red = new Image(), blue = new Image(), yellow = new Image(), green = new Image();
var colors = [red, blue, yellow, green];
var score = 0, mistakes = 0;

(function init() {
    trash_cans.src = 'images/trash_cans.png';
    red.src = 'images/red.png';
    blue.src = 'images/blue.png';
    yellow.src = 'images/yellow.png';
    green.src = 'images/green.png';
    window.addEventListener("mousedown", (e) => {
        if (trash.touched) {
            trash.x = e.clientX;
            trash.y = e.clientY;
            trash.pressed = true;
        }
    });
    window.addEventListener("mousemove", (e) => {
        mouset = true;
        mouse = {
            x: e.clientX,
            y: e.clientY,
            r: 1
        }
        if (trash.pressed) {
            trash.x = e.clientX;
            trash.y = e.clientY;
        }
    });
    window.addEventListener("mouseup", (e) => {trash.pressed = false;});
    trash = {
        x: Math.random() * (window.innerWidth - window.innerWidth / 8) + window.innerWidth / 16,
        y: Math.random() * (window.innerHeight / 3 - window.innerWidth / 8) + window.innerWidth / 16,
        r: window.innerWidth / 16,
        color: Math.ceil(Math.random() * 3),
        touched: false,
        pressed: false
    };
    setInterval(main, 1000 / FPS);
}());
function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    events();
    draw();
}
function events() {
    if (mouset) {
        let catx = mouse.x - trash.x;
        let caty = mouse.y - trash.y;
        let hipo = Math.sqrt(catx * catx + caty * caty);
        if (hipo < trash.r) {trash.touched = true;} else {trash.touched = false;}
    }
    if (!trash.pressed) {
        if (trash.x > (cnv.width / 6) && trash.x < (cnv.width / 1.2) && trash.y > (cnv.height / 2)) {
            if (trash.x < (cnv.width / 3)) {
                if (trash.color == 0) {win();} else {lose();}
            } else if (trash.x < (cnv.width / 2)) {
                if (trash.color == 1) {win();} else {lose();}
            } else if (trash.x < (cnv.width / 1.5)) {
                if (trash.color == 2) {win();} else {lose();}
            } else {
                if (trash.color == 3) {win();} else {lose();}
            }
        }
    }
    function win() {
        changeXY();
        score++
        trash.color = Math.round(Math.random() * 3);
    }
    function lose() {
        changeXY();
        mistakes++
    }
    function changeXY() {
        trash.x = Math.random() * (window.innerWidth - window.innerWidth / 8) + window.innerWidth / 16;
        trash.y = Math.random() * (window.innerHeight / 3 - window.innerWidth / 8) + window.innerWidth / 16;
    }
}
function draw() {
    for (let i = (cnv.width / 20); i < cnv.width; i += (cnv.width / 20)) {
        ctx.strokeStyle="lime";
        ctx.fillStyle="lime";
        ctx.beginPath();
        ctx.arc(i, cnv.height, (cnv.width / 10), 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    ctx.drawImage(trash_cans, (cnv.width / 6), (cnv.height / 2), (cnv.width / 1.5), (cnv.height / 2));
    ctx.drawImage(colors[trash.color], trash.x - (trash.r / 2), trash.y  - (trash.r / 2), trash.r, trash.r);

    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.font="40px Comic Sans MS";
    ctx.fillText("PONTUAÇÃO: " + score, cnv.width / 2, 40);
    ctx.fillText("ERROS: " + mistakes, cnv.width / 2, 80);
}