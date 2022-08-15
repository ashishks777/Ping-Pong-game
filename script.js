alert("Press Enter To start.\n Use keys 'a' and 'd' to move the rods left and right.\n Turn off caps lock. ");
var one = document.getElementById("one");
var ball = document.getElementById("ball");
var two = document.getElementById("two");

var oneOffsetleft = one.offsetLeft;
console.log(oneOffsetleft);
console.log(window.innerWidth / 2);
one.style.left = (window.innerWidth / 2 - one.offsetWidth / 2) - oneOffsetleft + "px";

var twoOffestHeight = two.offsetHeight;

let speedx = 2, speedy = 2;
two.style.top = window.innerHeight - twoOffestHeight + "px";
two.style.left = (window.innerWidth / 2 - one.offsetWidth / 2) - oneOffsetleft + "px";


let maxScore=localStorage.getItem('Max');



let oneHeight = one.offsetHeight;
let twoHeight = two.offsetHeight;
let ballDia = ball.getBoundingClientRect().width;
let oneWidth = one.offsetWidth;
let twoWidth = two.offsetWidth;
var score = 0;
var movement;
let gameon = false;
let ballx = one.getBoundingClientRect().x + oneWidth / 2 - ballDia / 2;
let bally = one.getBoundingClientRect().y + ballDia + oneHeight;

window.addEventListener("keypress", function (event) {

    var left = one.style.getPropertyValue("left");
    left = parseInt(left);
    if (event.key == 'a') {
        if (left >= 10) {
            one.style.left = left - 30 + "px";
            two.style.left = left - 30 + "px";
        }
    }
    if (event.key == 'd') {
        if (left + one.offsetWidth + 21 < this.window.innerWidth) {
            one.style.left = left + 30 + "px";
            two.style.left = left + 30 + "px";
        }
    }


    if (event.key == 'Enter' && !gameon) {

        gameon = true;
        movement = setInterval(function () {
            ballx += speedx;
            bally += speedy;

            ball.style.left = ballx + "px";
            ball.style.top = bally + 'px';

            if (ballx + 40 >= window.innerWidth || ballx <= 0) {
                speedx = -speedx;
            }
            if (bally < oneHeight) {
                if (ballx > one.getBoundingClientRect().x && ballx < oneWidth + one.getBoundingClientRect().x) {
                    speedy = -speedy;
                    score++;
                } else {
                   
                   
                    reset(one);


                }

            }
            if (bally > window.innerHeight - twoHeight - ballDia) {
                if (ballx > two.getBoundingClientRect().x && ballx < twoWidth + two.getBoundingClientRect().x) {
                    speedy = -speedy;
                    score++;
                }
                else {
                   
                    
                    reset(two);
                }

            }



        }, 10);

    }


});

let reset = function (rod) {
    if (rod == one) {
        ballx = rod.getBoundingClientRect().x + oneWidth / 2 - ballDia / 2;
        bally = rod.getBoundingClientRect().y + ballDia + oneHeight;
        if(score>maxScore){
            maxScore=score;
            localStorage.setItem("Max",maxScore);
            localStorage.setItem("rodNumber","Rod 2");

        }
        alert("Game over : your score is :" + score +" \n Max score is: "+localStorage.getItem("Max") +" by "+localStorage.getItem("rodNumber"));
    } else {
        ballx = rod.getBoundingClientRect().x + oneWidth / 2 - ballDia / 2;
        bally = rod.getBoundingClientRect().y - ballDia - oneHeight;
        if(score>maxScore){
            maxScore=score;
            localStorage.setItem("Max",maxScore);
            localStorage.setItem("rodNumber","Rod 1");

        }
        alert("Game over : your score is :" + score +" \n Max score is: "+localStorage.getItem("Max")  +" by "+localStorage.getItem("rodNumber"));
    }


    speedx = -speedx;
    speedy = -speedy;
    score=0;
    clearInterval(movement);
    gameon = false;
}


