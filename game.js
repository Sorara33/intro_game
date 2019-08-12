var audioElem = new Audio();
var current_song, current_num;
var correct_btn;
var numSongs = song_files.length;
var _canStart = true;
var _nowPlaying = false;
var _nowSelected = false;
var time_obj, time_start, time_end;
var numCorrect = 0, numIncorrect = 0;
var sumCorrectTime = 0;
var globalNumPlayed = 0;
var table = document.createElement("table");


window.onload = function(){
  btn1 = document.getElementById('btn1');
  btn2 = document.getElementById('btn2');
  btn3 = document.getElementById('btn3');
  btn4 = document.getElementById('btn4');
  messageBox = document.getElementById('message');
  timeBox = document.getElementById('time');
  showBattleTable();
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
    _canStart = false;
    if(_nowPlaying) stopPlaying();
    _nowPlaying = true;
    _nowSelected = false;
    document.getElementById('message').innerText = '';
    selectSong();
    console.log('play ', song_titles[current_num])
    startPlaying();
    refresh();
  }
}

function showAlert(){
  alert('10回中の正解数：' + numCorrect + '回\n10回中の不正解数：'
  + numIncorrect + '回\n\n正解時の平均タイム：' + sumCorrectTime/numCorrect + '秒');
  numCorrect = 0;
  numIncorrect = 0;
  sumCorrectTime = 0;
}
/*
setInterval(function(){
  alert('1分間での正解数：' + numCorrect + '回\n1分間での不正解数：'
   + numIncorrect + '回\n\n正解時の平均タイム：' + sumCorrectTime/1000/numCorrect + '秒');
  numCorrect = 0;
  numIncorrect = 0;
  sumCorrectTime = 0;
}, 1000*60);
*/

function onSelected(selected_btn){
  if(!_nowSelected){
    time_end = audioElem.currentTime;
    _nowSelected = true;
    judge(selected_btn);
    globalNumPlayed++;
    if (globalNumPlayed % 10 == 0)
      showAlert();
    _canStart = true;
  }
}

function startPlaying(){
  audioElem.src = song_files[current_num];
  audioElem.load();
  // console.log(song_titles[current_num]);
}
audioElem.addEventListener('loadedmetadata',function(e) {
  // console.log('audio duration : ' + audioElem.duration);
  audio_duration = parseInt(audioElem.duration)-20; // あまり終盤だとすぐに終わってしまうので。
  randomNum = getRandom(0, audio_duration);
  //audioElem.src = song_files[current_num] + '#t=' + String(randomNum) + ',' + String(audio_duration);
  //console.log(song_files[current_num] + '#t=' + String(randomNum) + ',' + String(audio_duration));
  audioElem.currentTime = randomNum;
  audioElem.play();
  time_start = audioElem.currentTime;
});

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
  // console.log(alreadyUsedNum);
}

function judge(selected_btn){
  if (selected_btn == correct_btn){
    correct();
  } else {
    incorrect();
  }
  time = time_end - time_start;
  // console.log(time);
  timeBox.innerText = String(time) + '秒';
  sumCorrectTime += time;
}

function correct(){
  messageBox.innerText = '正解！';
  checkBoxColor(true);
  numCorrect++;
}

function incorrect(){
  messageBox.innerText = '残念！';
  checkBoxColor(false);
  numIncorrect++;
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
  // console.log(`keydown:${keyName}`);
});




function showBattleTable(){
  // テキストファイルからデータを読み込む
  var fileName = 'battledata.txt';
  var battleDataObj = new XMLHttpRequest();
  battleDataObj.open('GET',fileName, true);
  battleDataObj.onreadystatechange = function(){
    if ( (battleDataObj.readyState == 4) && (battleDataObj.status == 200) ){
       console.log(httpObj.responseText);
       console.log('tt');
    }else{
      console.log('ff');
    }
 }

  // 表を作ってデータを表示

}