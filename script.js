let start_button = document.getElementById('start-button');
start_button.addEventListener('click', commence);
var interval_create;
var interval_move_down;
var interval_move_up;
var interval_move_right;
var interval_move_zone2;
let bod = document.querySelector('body');

var all_cars = [];

var car_array_down = [];
var car_array_right = [];
var car_array_up = [];
var car_array_zone2 = [];

var qPaused = false;




function commence(){
    start_button.style.display = "none";
    createCars();
    moveCarsDown();
    moveCarsRight();
    moveCarsUp();
    moveCarsZone2();

}

function createCars(){
    interval_create = setInterval(carQ, 1100);
}

let car_number = 1;


function carQ() {
    if (car_number == 15){
        return;
    } else if (qPaused == true){
        return;
    } else {
        var car = document.createElement('img');
        car.setAttribute("src", randomImage());
        // car.setAttribute("class", "car");
        car.style.position = "absolute";
        car.style.top = "-100px";
        car.style.left = "100px";
        car.style.width = "50px";
        car.style.height = "100px";
        car.style.transition = "transform .6s";
        car.setAttribute("id", `car${car_number}`);

        car.parkTime = randomTime();
        car.parked = false;
        car.zone = "";

        car_array_down.push(car);
        all_cars.push(car);
        bod.append(car);
        car_number += 1;
    }
}

function randomTime(){
    return Math.floor((Math.random() * 15000) + 5000);
}

function randomImage(){
    var images = ["img/car-aqua.png", "img/car-blue.png", "img/car-dragon.png", "img/car-green.png", "img/car-grey.png", "img/car-hot-pink.png", "img/car-lime-green.png", "img/car-orange.png", "img/car-pink.png", "img/car-purple.png", "img/car-red-stripes.png", "img/car-red.png", "img/car-white.png", "img/car-yellow.png"];
    return images[Math.floor(Math.random() * 14)];
}

function moveCarsDown() {
    if (qPaused == true){
        return;
    }
    interval_move_down = setInterval(moveDown, 30);
}

function moveDown() {
    if (qPaused == true){
        return;
    }
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
    interval_move_right = setInterval(moveRight, 30);
}

function moveRight() {
    if (qPaused == true){
        return;
    }
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
    checkZone1();
    for (let item of car_array_up){
        item.style.top = `${parseInt(item.style.top.replace('px','')) - 4}px`;
        var position = parseInt(item.style.top.replace('px', ''));
        if (position > 258){
            item.zone = "a";
        } else {
            item.zone = "b";
        }
    }
}    

let zone1 = [{top: 15, open: true}, {top: 82, open: true}, {top: 150, open: true}, {top: 223, open: true}, {top: 291, open: true}, {top: 359, open: true}, {top: 427, open: true}, {top: 495, open: true}, {top: 563, open: true}];

let zone1_parked = 0;

function checkZone1() {
    if (zone1_parked == 9){
        parkZone2();
    } else {
        for (let i = 0; i < car_array_up.length; i++){
            var item_top = parseInt(car_array_up[i].style.top.replace('px', ''));
            for (let spot of zone1){
                if (item_top < spot.top && spot.open == true){
                    let car = car_array_up.splice(i, 1)[0];
                    spot.open = false;
                    zone1_parked += 1;
                    parkZone1(car);
                }
            }
        }
    }    
}

function parkZone1(car){
    car.zone = "";
    car.style.transition = "left .6s linear, transform .3s";
    car.style.transform = "rotate(-270deg)";
    car.style.left = "338px";
    var position = parseInt(car.style.top.replace("px", ""));
    if (position > 258){
        setTimeout(function(){leaveZoneA(car)}, car.parkTime);
    }
}

// var intervalId_zoneA;




function leaveZoneA(car){

    console.log(car.parkTime, car);
    car.parked = true;
    qPaused = true;
    // zone1_parked -= 1;
    // intervalId_zoneA = setInterval(() => {checkZoneA(car)}, 100);

    var position_parked = parseInt(car.style.top.replace('px', ''));

    for (let item of all_cars){
        var position_lane = parseInt(car.style.top.replace('px', ''));
        console.log(position_lane, position_parked);
        if (item.zone == 'a' || position_parked > position_lane){
            setTimeout(() => {leaveZoneA(car)}, 1000);
            return;
        }
    }

    car.zone = "a";
    car.style.transition = "left .6s linear, transform .6s";
    car.style.left = "470px";
    setTimeout(() => {
        car_array_up.push(car);
        qPaused = false;
        car.style.transform = "rotate(-180deg)";
        car.style.transition = "transform .3s";
    }, 600);
    // clearInterval(intervalId_zoneA);
}

function parkZone2(){
    for (let i = 0; i < car_array_up.length; i++){
        var item_top = parseInt(car_array_up[i].style.top.replace('px', ''));
        if (item_top < 180){
            let car = car_array_up.splice(i, 1)[0];
            car.style.transform = "rotate(-90deg)";
            car_array_zone2.push(car);
        }
    }
}

function moveCarsZone2() {
    interval_move_zone2 = setInterval(moveZone2, 30);
}

function moveZone2() {
    checkZone2();
    for (let item of car_array_zone2){
        item.style.left = `${parseInt(item.style.left.replace('px','')) + 4}px`;
    }
}

let zone2 = [{top: 270, left: 563, open: true}, {top: 155, left: 633, open: true}, {top: 270, left: 633, open: true}, {top: 155, left: 701, open: true}, {top: 270, left: 701, open: true}, {top: 155, left: 772, open: true}, {top: 270, left: 772, open: true}, {top: 155, left: 841, open: true}, {top: 270, left: 841, open: true}];

let zone2_parked = 0;

function checkZone2(){
    for (let i = 0; i < car_array_zone2.length; i++){
        var item_left = parseInt(car_array_zone2[i].style.left.replace('px', ''));
        for (let spot of zone2){
            if (item_left > spot.left && spot.open == true){
                if (spot.top == 270){
                    let car = car_array_zone2.splice(i, 1)[0];
                    spot.open = false;
                    zone2_parked += 1;
                    parkZone2Right(car);
                    break;
                } else if (spot.top == 155){
                    let car = car_array_zone2.splice(i, 1)[0];
                    spot.open = false;
                    zone2_parked += 1;
                    parkZone2Left(car);
                    break;
                }
            }
        }
    }
}

function parkZone2Right(car){
    car.style.transition = "top .4s linear, transform .3s";
    car.style.transform = "rotate(0deg)";
    car.style.top = "275px";
}

function parkZone2Left(car){
    car.style.transition = "top .4s linear, transform .3s";
    car.style.transform = "rotate(-180deg)";
    car.style.top = "25px";
}