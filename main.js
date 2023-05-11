var loadedTracks = [];
var curr_Trackindex = 0;



var isPlaying = false;
var isloadded = false;

function loadTracks() {
  let input = document.createElement("input");
  input.type = "file";
  input.setAttribute("multiple", "");
  input.setAttribute("accept", "audio/*");
  input.onchange = () => {
    let Tracks = input.files;
    for (let tr of Tracks) {
      addtoPlaylist(tr, loadedTracks.length);
      loadedTracks.push(tr);
    }
    updateTracksinfo();
  };
  input.click();
}

function addtoPlaylist(tr, index) {
  let playlist = document.getElementById("mySidenav");
  let ele = document.createElement("a");
  let nam = tr.name.substr(0, tr.name.lastIndexOf("."));
  ele.innerHTML = nam.length > 15 ? nam.substring(0, 12) + "..." : nam;
  ele.setAttribute("index", index);
  ele.addEventListener("click", (e) => {
    let indx = e.target.getAttribute("index");
    curr_Trackindex = Number(indx);
    updateTracksinfo();
    updateTracklistStyle();
    loadaudio();
    playAudio();
  });
  document.getElementById("mySidenav").appendChild(ele);
}

function updateTracklistStyle() {
  let playlist = document.getElementById("mySidenav");
  let idx = 0;
  for (let child of playlist.children) {
    child.classList.remove("selectedtrack");
    if (idx - 1 == curr_Trackindex) {
      // close button is child
      child.classList.add("selectedtrack");
    }
    idx++;
  }
}

function updateTracksinfo() {
  let currTrname = loadedTracks[curr_Trackindex].name;
  currTrname = currTrname.substr(0, currTrname.lastIndexOf("."));
  document.querySelector(".track-name").innerHTML = currTrname;
  if (!isloadded) loadaudio();
}
function loadaudio() {
  let curraudio = document.getElementById("curr_audio");
  curraudio.src = URL.createObjectURL(loadedTracks[curr_Trackindex]);
  curraudio.load();
  curraudio.onloadeddata = () => {
    let minutes = Math.floor(curraudio.duration / 60);
    let seconds = Math.floor(curraudio.duration - minutes * 60);
    document.querySelector(".total-duration").innerHTML =
      minutes + ":" + seconds;
    document.querySelector(".seek_slider").max = Math.floor(curraudio.duration);
    isloadded = true;
  };
}
document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    let eleaction = document.querySelector(".playpause-track");
    eleaction.click();
  }
};
function playAudio() {
  let curraudio = document.getElementById("curr_audio");
  curraudio.play();
  if (!isPlaying) changePlaypausestatus(); /// click action may come from playlist not only button
}

function pauseaudio() {
  let curraudio = document.getElementById("curr_audio");
  curraudio.pause();
  if (isPlaying) changePlaypausestatus();
}
function changePlaypausestatus() {
  let eleview = document.getElementById("playpause");
  let eleaction = document.querySelector(".playpause-track");
  if (isPlaying) {
    eleview.classList.remove("fa-circle-pause");
    eleview.classList.add("fa-circle-play");
    eleaction.onclick = playAudio;
    eleaction.ke;
    isPlaying = false;
  } else {
    eleview.classList.remove("fa-circle-play");
    eleview.classList.add("fa-circle-pause");
    eleaction.onclick = pauseaudio;
    isPlaying = true;
  }
}

function nextTrack() {
  curr_Trackindex++;
  if (curr_Trackindex == loadedTracks.length) curr_Trackindex = 0;
  updateTracksinfo();
  updateTracklistStyle();
  loadaudio();
  playAudio();
}
function prevTrack() {
  curr_Trackindex--;
  if (curr_Trackindex < 0) curr_Trackindex = loadedTracks.length - 1;
  updateTracksinfo();
  updateTracklistStyle();
  loadaudio();
  playAudio();
}

function setVolume() {
  let curraudio = document.getElementById("curr_audio");
  curraudio.volume = document.querySelector(".volume_slider").value / 100;
}

function seekTo() {
  let curraudio = document.getElementById("curr_audio");
  curraudio.currentTime = document.querySelector(".seek_slider").value;
}
function updateCurrentTime() {
  let curraudio = document.getElementById("curr_audio");
  let slider = document.querySelector(".seek_slider");
  let minutes = Math.floor(curraudio.currentTime / 60);
  let seconds = Math.floor(curraudio.currentTime - minutes * 60);
  document.querySelector(".current-time").innerHTML = minutes + ":" + seconds;
  slider.value = curraudio.currentTime;
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
