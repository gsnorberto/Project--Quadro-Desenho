let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScreen);

function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    canDraw = true;

    //Pega a posição do mouse
    mouseX = e.pageX - screen.offsetLeft;// subtrai as margens laterais e do topo para que a área de desenho seja contada a partir da posição 0 0 
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent(e){
    canDraw = false;
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //Fazendo o desenho...
    ctx.beginPath(); //começou a desenhar
    ctx.lineWith = 5;
    ctx.lineJoin = 'round'; //Bolinhas contínuas para criação do desenho
    ctx.moveTo(mouseX, mouseY); //Mova para posição inicial
    ctx.lineTo(pointX, pointY); //Desenhe do ponto X até o ponto y
    ctx.closePath(); //Fecha o processo de desenho
    ctx.strokeStyle = currentColor; //Cor da Linha
    ctx.stroke(); //Finalizat todo processo

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    ctx.setTransform(1,0,0,1,0,0); //Zera cursor e processo de desenho.
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
}