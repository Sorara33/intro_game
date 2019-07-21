var audioElem;
var current_song = 'sample.mp3';
var correct_btn;
var numSongs = song_files.length;
console.log('num of songs : ', numSongs);
var _nowPlaying = false;
var _nowSelected = false;

function writeText(i, str){
  if(i == 1){
    document.getElementById('btn1').innerText = str;
  } else if (i == 2){
    document.getElementById('btn2').innerText = str;
  } else if (i == 3){
    document.getElementById('btn3').innerText = str;
  } else if (i == 4){
    document.getElementById('btn4').innerText = str;
  }
}

function onStartClicked(){
  if(!_nowPlaying){
    _nowPlaying = true;
    next();
    selectSong();
    startPlaying(current_num);
  }
}

function onSelected(selected_btn){
  if(!_nowSelected){
    _nowSelected = true;
    stopPlaying();
    judge(selected_btn);
    _nowPlaying = false;
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
}

function correct(){
  document.getElementById('message').innerText = '正解！';
}

function incorrect(){
  document.getElementById('message').innerText = '残念！';
}

function next(){
  document.getElementById('message').innerText = '';
  _nowPlaying = false;
  _nowSelected = false;
}

function getRandom(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);
}
