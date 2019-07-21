var audioElem;
var current_song = 'sample.mp3';
reader = new FileReader();
message = document.getElementById("message");

function onStartClicked(){
  // selectSong();
  startPlaying(current_song);
  // startPlaying(song_files[1]);
}

function onSelected(which){
  judge(which);
}

function startPlaying(song_name){
  audioElem = new Audio();
  audioElem.src = song_name;
  audioElem.play();
  console.log(song_titles[1]);
}
/*
function stopPlaying(){
  audioElem.pause();
} */

function selectSong(){
  numSongs = Object.keys(song_obj).length;
  console.log(numSongs);
  current_song = song_obj.name0;
  console.log(current_song);
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
