var audioElem;
var current_song = 'sample.mp3';
reader = new FileReader();
message = document.getElementById("message");
var numSongs = song_files.length;
console.log('num of songs : ', numSongs);

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
  selectSong();
  startPlaying(current_song);
  //startPlaying(song_files[2]);
}

function onSelected(which){
  judge(which);
}

function startPlaying(file_name){
  audioElem = new Audio();
  audioElem.src = file_name;
  audioElem.play();
  console.log(song_titles[1]);
}
/*
function stopPlaying(){
  audioElem.pause();
} */

function selectSong(){
  current_num = getRandom(1, numSongs);
  current_song = song_files[current_num];
  console.log(current_num);

  var correct = getRandom(1, 4);
  var alreadyUsedNum = [correct];
  for(var i=1; i<=4; i++){
    if(i == correct){
      writeText(i, song_titles[current_num]);
    } else {
      randomNum = getRandom(1, song_files.length);
      while(randomNum in alreadyUsedNum){
        randomNum = getRandom(1, song_files.length);
      }
      alreadyUsedNum.push(randomNum);
      writeText(i, song_titles[randomNum]);
    }
  }
}

function judge(which){
  if (which == correct){
    correct();
  }
}

function correct(){
}

function next(){
}

function getRandom(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);
}
