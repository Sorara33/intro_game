var audioElem;
var current_song;
var correct_btn;
var numSongs = song_files.length;
var _canStart = true;
var _nowPlaying = false;
var _nowSelected = false;
var time_obj, time_start, time_end;

window.onload = function(){
  btn1 = document.getElementById('btn1');
  btn2 = document.getElementById('btn2');
  btn3 = document.getElementById('btn3');
  btn4 = document.getElementById('btn4');
  messageBox = document.getElementById('message');
  timeBox = document.getElementById('time');
}

function writeText(i, str){
  if(i == 1){
    btn1.innerText = str;
  } else if (i == 2){
    btn2.innerText = str;
  } else if (i == 3){
    btn3.innerText = str;
  } else if (i == 4){
    btn4.innerText = str;
  }
}

function onStartClicked(){
  if(_canStart){
    time_obj = new Date();
    time_start = time_obj.getTime();
    _canStart = false;
    if(_nowPlaying) stopPlaying();
    _nowPlaying = true;
    _nowSelected = false;
    document.getElementById('message').innerText = '';
    selectSong();
    console.log('play ', song_titles[current_num])
    startPlaying(current_num);
    refresh();
  }
}

function onSelected(selected_btn){
  if(!_nowSelected){
    time_obj = new Date();
    time_end = time_obj.getTime();
    _nowSelected = true;
    judge(selected_btn);
    _canStart = true;
  }
}

function startPlaying(file_num){
  audioElem = new Audio();
  audioElem.src = song_files[file_num];
  audioElem.play();
  console.log(song_titles[file_num]);
}

function stopPlaying(){
  audioElem.pause();
}

function selectSong(){
  current_num = getRandom(0, numSongs-1);
  console.log('current num : ', current_num);
  correct_btn = getRandom(1, 4);
  console.log('correct button : ', correct_btn);
  var alreadyUsedNum = [current_num];
  for(var i=1; i<=4; i++){
    if(i == correct_btn){
      writeText(i, song_titles[current_num]);
    } else {
      randomNum = getRandom(0, numSongs-1);
      while(alreadyUsedNum.indexOf(randomNum) >= 0){ 
        randomNum = getRandom(0, numSongs-1);
      }
      alreadyUsedNum.push(randomNum);
      writeText(i, song_titles[randomNum]);
    }
  }
  console.log(alreadyUsedNum);
}

function judge(selected_btn){
  if (selected_btn == correct_btn){
    correct();
  } else {
    incorrect();
  }
  time = time_end - time_start;
  console.log(time);
  timeBox.innerText = String(time/1000) + '秒';
}

function correct(){
  messageBox.innerText = '正解！';
  checkBoxColor(true);
}

function incorrect(){
  messageBox.innerText = '残念！';
  checkBoxColor(false);
}

function checkBoxColor(_isCorrect){
  if(_isCorrect){
    switch(correct_btn){
      case 1 : btn1.style.backgroundColor = 'lightgreen';  btn1.style.color = 'white'; break;
      case 2 : btn2.style.backgroundColor = 'lightgreen';  btn2.style.color = 'white'; break;
      case 3 : btn3.style.backgroundColor = 'lightgreen';  btn3.style.color = 'white'; break;
      case 4 : btn4.style.backgroundColor = 'lightgreen';  btn4.style.color = 'white'; break;
    }
  } else {
    switch(correct_btn){
      case 1 : btn1.style.backgroundColor = 'red';  btn1.style.color = 'white'; break;
      case 2 : btn2.style.backgroundColor = 'red';  btn2.style.color = 'white'; break;
      case 3 : btn3.style.backgroundColor = 'red';  btn3.style.color = 'white'; break;
      case 4 : btn4.style.backgroundColor = 'red';  btn4.style.color = 'white'; break;
    }
  }
}

function refresh(){
  btn1.style.backgroundColor = 'white';  btn1.style.color = '#67c5ff';
  btn2.style.backgroundColor = 'white';  btn2.style.color = '#67c5ff';
  btn3.style.backgroundColor = 'white';  btn3.style.color = '#67c5ff';
  btn4.style.backgroundColor = 'white';  btn4.style.color = '#67c5ff';
  messageBox.innerText = '';
  timeBox.innerText = '';
}

function getRandom(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);
}

document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  switch(keyName){
    case 'f' : onSelected(1); break;
    case 'v' : onSelected(3); break;
    case 'n' : onSelected(4); break;
    case 'j' : onSelected(2); break;
    default : onStartClicked();
  }
  console.log(`keydown:${keyName}`);
});
