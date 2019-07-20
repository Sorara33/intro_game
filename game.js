var audioElem;

function startGame(){
  audioElem = new Audio();
  audioElem.src = "sample.mp3";
  audioElem.play;
}

function stopGame(){
  audioElem.pause();
}