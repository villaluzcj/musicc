const songs = [
  {
    title: "You walk in slow like the world holds its breath",
    artist: "Alluring",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Binhi",
    artist: "Alluring",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "Pagsamo",
    artist: "Alluring",
    src: "music/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const playlistDiv = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  highlightSong();
}

function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

function buildPlaylist() {
  playlistDiv.innerHTML = "";
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `
      <img src="${song.cover}">
      <div>
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
      </div>
    `;
    div.onclick = () => {
      currentSong = index;
      loadSong(index);
      audio.play();
      isPlaying = true;
      playBtn.textContent = "⏸";
    };
    playlistDiv.appendChild(div);
  });
}

function highlightSong() {
  document.querySelectorAll(".song").forEach((el, i) => {
    el.classList.toggle("active", i === currentSong);
  });
}

loadSong(currentSong);
buildPlaylist();
