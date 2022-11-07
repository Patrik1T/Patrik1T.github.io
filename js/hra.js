const dice = document.getElementById('dice');
const playButton = document.getElementById('play');
const playsButton = document.getElementById('plays');
const play1Button = document.getElementById('play1');
const play2Button = document.getElementById('play2');
const play3Button = document.getElementById('play3');
const play4Button = document.getElementById('play4');
const resetButton = document.getElementById('reset');
const result = document.getElementById('result');
let turn = [];
let timer = false;
let timers = false;
let timer1 = false;
let timer2 = false;
let timer3 = false;
let timer4 = false;
let rounds = [];
rounds[0] = [];
rounds[1] = [];
rounds[2] = [];
rounds[3] = [];
rounds[4] = [];
rounds[5] = [];
rounds[6] = [];
rounds[7] = [];
rounds[8] = [];
rounds[9] = [];
rounds[10] = [];
rounds[11] = [];
rounds[12] = [];
rounds[13] = [];
rounds[14] = [];
rounds[15] = [];
rounds[16] = [];
rounds[17] = [];
rounds[18] = [];
rounds[19] = [];


function animation() {
    turn[0] = Math.ceil(Math.random() * 9);
    dice1.src = `img/kostka${turn[0]}.png`;
    turn[1] = Math.ceil(Math.random() * 9);
    dice2.src = `img/kostka${turn[1]}.png`;
    turn[2] = Math.ceil(Math.random() * 9);
    dice3.src = `img/kostka${turn[2]}.png`;
    turn[3] = Math.ceil(Math.random() * 9);
    dice4.src = `img/kostka${turn[3]}.png`;
}


function animations() {
    turn[4] = Math.ceil(Math.random() * 9);
    dice5.src = `img/kostka${turn[4]}.png`;

}


function animation1() {
    turn[5] = Math.ceil(Math.random() * 9);
    dice6.src = `img/kostka${turn[5]}.png`;
    turn[6] = Math.ceil(Math.random() * 9);
    dice7.src = `img/kostka${turn[6]}.png`;
    turn[7] = Math.ceil(Math.random() * 9);
    dice8.src = `img/kostka${turn[7]}.png`;
    turn[8] = Math.ceil(Math.random() * 9);
    dice9.src = `img/kostka${turn[8]}.png`;

}


function animation2() {
    turn[9] = Math.ceil(Math.random() * 9);
    dice10.src = `img/kostka${turn[9]}.png`;
    turn[10] = Math.ceil(Math.random() * 9);
    dice11.src = `img/kostka${turn[10]}.png`;
    turn[11] = Math.ceil(Math.random() * 9);
    dice12.src = `img/kostka${turn[11]}.png`;

}

function animation3() {
    turn[12] = Math.ceil(Math.random() * 9);
    dice13.src = `img/kostka${turn[12]}.png`;
    turn[13] = Math.ceil(Math.random() * 9);
    dice14.src = `img/kostka${turn[13]}.png`;
}

function animation4() {
    turn[14] = Math.ceil(Math.random() * 9);
    dice15.src = `img/kostka${turn[14]}.png`;
    turn[15] = Math.ceil(Math.random() * 9);
    dice16.src = `img/kostka${turn[15]}.png`;
    turn[16] = Math.ceil(Math.random() * 9);
    dice17.src = `img/kostka${turn[16]}.png`;
    turn[17] = Math.ceil(Math.random() * 9);
    dice18.src = `img/kostka${turn[17]}.png`;
    turn[18] = Math.ceil(Math.random() * 9);
    dice19.src = `img/kostka${turn[18]}.png`;
    turn[19] = Math.ceil(Math.random() * 9);
    dice20.src = `img/kostka${turn[19]}.png`;
}

function sum(index) {
    let s = 0;
    for (i = 0; i < rounds[index].length; i++) {
        s += rounds[index][i];
    }
    return s;
}

function max(index) {
   let mx = 1;
   rounds[index].forEach(function(value) {
       if (value > mx) mx = value;
   }) 
   return mx;
}
function min(index) {
    let mn = 9;
    rounds[index].forEach(function(value) {
        if (value < mn) mn = value;
    }) 
    return mn;
 }

function stats(index) {
    player1.style.left = `${sum(0) * 10}px`;
    player2.style.left = `${sum(1) * 10}px`;
    player3.style.left = `${sum(2) * 10}px`;
    player4.style.left = `${sum(3) * 10}px`;
    let results = `<h3>Aktuální hod: ${turn[index]}</h3>`;
    results += `<h4>Hody: ${rounds[index]}</h4>`;
    results += `<h4>Počet hodů: ${rounds[index].length}</h4>`;
    results += `<p>Součet hodů: ${sum(index)}</p>`;
    results += `<p>Průměr hodů: ${(sum(index)/rounds[index].length).toFixed(2)}</p>`;
    results += `<p>Počet a součet: ${(sum(index)+rounds[index].length).toFixed(2)}</p>`;
    results += `<p>Nejvyšší hod: ${(max(index))}</p>`;
    results += `<p>Nejnižší hod: ${(min(index))}</p>`;
    return results;
}


function playMusic(){
 let audio = new Audio("sound.mp4");
 audio.play()
}

plays.addEventListener("click", playMusic);
play1.addEventListener("click", playMusic);
play2.addEventListener("click", playMusic);
play3.addEventListener("click", playMusic);
play4.addEventListener("click", playMusic);

playButton.addEventListener('click', function() {
    if (!timer) {
        timer = setInterval(animation, 40);
        playButton.innerText = 'STOP';
    } else {
        clearInterval(timer);
        timer = false;
        playButton.innerText = 'HREJ';
        rounds[0].push(turn[0]);
        rounds[1].push(turn[1]);
        rounds[2].push(turn[2]);
        rounds[3].push(turn[3]);
        result1.innerHTML = stats(0);
        result2.innerHTML = stats(1);
        result3.innerHTML = stats(2);
        result4.innerHTML = stats(3);
        console.log(rounds);
    }
});


playsButton.addEventListener('click', function() {
    if (!timers) {
        timers = setInterval(animations, 40);
        playsButton.innerText = 'STOP';
    } else {
        clearInterval(timers);
        timers = false;
        playsButton.innerText = 'HREJ';
        rounds[4].push(turn[4]);
        result5.innerHTML = stats(4);
        let audio = new Audio("sound.mp4");
        audio.play()
        console.log(rounds);
    }
});


play1Button.addEventListener('click', function() {
    if (!timer1) {
        timer1 = setInterval(animation1, 40);
        play1Button.innerText = 'STOP';
    } else {
        clearInterval(timer1);
        timer1 = false;
        play1Button.innerText = 'HREJ';
        rounds[5].push(turn[5]);
        rounds[6].push(turn[6]);
        rounds[7].push(turn[7]);
        rounds[8].push(turn[8]);
        result6.innerHTML = stats(5);
        result7.innerHTML = stats(6);
        result8.innerHTML = stats(7);
        result9.innerHTML = stats(8);
        console.log(rounds);
    }
});


play2Button.addEventListener('click', function() {
    if (!timer2) {
        timer2 = setInterval(animation2, 40);
        play2Button.innerText = 'STOP';
    } else {
        clearInterval(timer2);
        timer2 = false;
        play2Button.innerText = 'HREJ';
        rounds[9].push(turn[9]);
        rounds[10].push(turn[10]);
        rounds[11].push(turn[11]);
        result10.innerHTML = stats(9);
        result11.innerHTML = stats(10);
        result12.innerHTML = stats(11);
        console.log(rounds);
    }
});



play3Button.addEventListener('click', function() {
    if (!timer3) {
        timer3 = setInterval(animation3, 40);
        play3Button.innerText = 'STOP';
    } else {
        clearInterval(timer3);
        timer3 = false;
        play3Button.innerText = 'HREJ';
        rounds[12].push(turn[12]);
        rounds[13].push(turn[13]);
        result13.innerHTML = stats(12);
        result14.innerHTML = stats(13);
        console.log(rounds);
    }
});



play4Button.addEventListener('click', function() {
    if (!timer4) {
        timer4 = setInterval(animation4, 40);
        play4Button.innerText = 'STOP';
    } else {
        clearInterval(timer4);
        timer4 = false;
        play4Button.innerText = 'HREJ';
        rounds[14].push(turn[14]);
        rounds[15].push(turn[15]);
        rounds[16].push(turn[16]);
        rounds[17].push(turn[17]);
        rounds[18].push(turn[18]);
        rounds[19].push(turn[19]);
        result15.innerHTML = stats(14);
        result16.innerHTML = stats(15);
        result17.innerHTML = stats(16);
        result18.innerHTML = stats(17);
        result19.innerHTML = stats(18);
        result20.innerHTML = stats(19);
        console.log(rounds);
    }
});






