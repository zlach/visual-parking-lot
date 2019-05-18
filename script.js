let start_button = document.getElementById('start-button');
start_button.addEventListener('click', commence);
var interval_create;
var interval_move_down;
var interval_move_up;
let bod = document.querySelector('body');

var car_array_down = [];
var car_array_right = [];
var car_array_up = [];

function commence(){
    start_button.style.display = "none";
    createCars();
    moveCarsDown();
    moveCarsRight();
    moveCarsUp();
}

function createCars(){
    interval_create = setInterval(carQ, 1000);
}

let car_number = 1;

function carQ() {
    var car = document.createElement('img');
    car.setAttribute("src", randomImage());
    // car.setAttribute("class", "car");
    car.style.position = "absolute";
    car.style.top = "-100px";
    car.style.left = "100px";
    car.style.width = "50px";
    car.style.height = "100px";
    car.style.transition = "transform .6s";
    car.setAttribute = ("id", `car${car_number}`);
    car_array_down.push(car);
    bod.append(car);
    car_number += 1;
}

function randomImage(){
    var images = ["img/car-aqua.png", "img/car-blue.png", "img/car-dragon.png", "img/car-green.png", "img/car-grey.png", "img/car-hot-pink.png", "img/car-lime-green.png", "img/car-orange.png", "img/car-pink.png", "img/car-purple.png", "img/car-red-stripes.png", "img/car-red.png", "img/car-white.png", "img/car-yellow.png"];
    return images[Math.floor(Math.random() * 14)];
}

function moveCarsDown() {
    interval_move_down = setInterval(moveDown, 30);
}

function moveDown() {
    for (let item of car_array_down){
        item.style.top = `${parseInt(item.style.top.replace('px','')) + 4}px`;
    }
    for (let i = 0; i < car_array_down.length; i++){
        let position = parseInt(car_array_down[i].style.top.replace("px", ""));
        if (position > 620){
            car_array_down[i].style.transform = "rotate(-90deg)";
        }
        if (position > 670){
            let car = car_array_down.splice(i, 1)[0];
            car_array_right.push(car);
        }
    }
}

function moveCarsRight() {
    interval_move_down = setInterval(moveRight, 30);
}

function moveRight() {
    // console.log(car_array_right);
    for (let item of car_array_right){
        item.style.left = `${parseInt(item.style.left.replace('px','')) + 4}px`;
    }
    for (let i = 0; i < car_array_right.length; i++){
        let position = parseInt(car_array_right[i].style.left.replace("px", ""));
        if (position > 420){
            car_array_right[i].style.transform = "rotate(-180deg)";
        }
        if (position > 470){
            let car = car_array_right.splice(i, 1)[0];
            car_array_up.push(car);
        }
    }
}

function moveCarsUp() {
    interval_move_up = setInterval(moveUp, 30);
}

function moveUp() {
    for (let item of car_array_up){
        item.style.top = `${parseInt(item.style.top.replace('px','')) - 4}px`;
    }
}    

let zone_one = [{top: 19, occupied: false}, {top: 87, occupied: false}, {top: 155, occupied: false}, {top: 223, occupied: false}, {top: 291, occupied: false}, {top: 359, occupied: false}, {top: 427, occupied: false}, {top: 495, occupied: false}, {top: 563, occupied: false}];

