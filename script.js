const songsFolder = [
  {
    songName: "After Dark",
    mp3: "./music/After Dark.mp3",
    artist: "0pWwt5vGNzezEhfAcc420Y",
    pic: "./picfolder/After Dark.jpg",
  },
  {
    songName: "Another Love",
    mp3: "./music/Another Love.mp3",
    artist: "2txHhyCwHjUEpJjWrEyqyX",
    pic: "./picfolder/Another Love.jpg",
  },
  {
    songName: "let me down slowly",
    mp3: "./music/let me down slowly.mp3",
    artist: "5IH6FPUwQTxPSXurCrcIov",
    pic: "./picfolder/let me down slowly.jpg",
  },
  {
    songName: "loneliness",
    mp3: "./music/loneliness.mp3",
    artist: "1q4hWErLtwYQIca9js6NgP",
    pic: "./picfolder/loneliness.jpg",
  },
  {
    songName: "Metamorphosis",
    mp3: "./music/Metamorphosis.mp3",
    artist: "5hKGLu4Ik88FzWcTPhWNTN",
    pic: "./picfolder/metamorphosis.jpg",
  },
  {
    songName: "oneheart-apathy",
    mp3: "./music/oneheart-apathy.mp3",
    artist: "0dgJbQ0bKPyUXco8hEXN7X",
    pic: "./picfolder/aphaty.jpg",
  },
  {
    songName: "perfect girl",
    mp3: "./music/perfect girl.mp3",
    artist: "7riQPkkGZBnTh9ve5qIhYo",
    pic: "./picfolder/perfect girl.jpg",
  },
  {
    songName: "Snowfall",
    mp3: "./music/Snowfall.mp3",
    artist: "6SdlxyPsQ3B0yYncFmDULP",
    pic: "./picfolder/snowfall.jpg",
  },
];
//SPOTIFY API for artist info************************

async function Artist_info(songCounter) {
  let pic, name, uriof, followers, genre, type;
  let id = songsFolder[songCounter].artist; //this will give id of artist
  const url = `https://spotify23.p.rapidapi.com/artists/?ids=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "18af9de346msh587f4d30b99da36p1efba8jsn0094cf2a7eef",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    name = result.artists[0].name;
    pic = result.artists[0].images[1].url;
    uriof = result.artists[0].uri;
    console.log(uri);
    followers = result.artists[0].followers.total;
    genre = result.artists[0].genres[0];
    type = result.artists[0].type;
  } catch (error) {
    console.error(error);
  }
  const nameofmusic = document.getElementById("music-name");
  nameofmusic.innerText = songsFolder[songCounter].songName;
  const bgpic = document.getElementById("background-pic");
  bgpic.src = songsFolder[songCounter].pic;
  const artistPic = document.getElementById("artistPic");
  artistPic.src = pic;
  const artistname = document.getElementById("artistname");
  artistname.innerText = name;
  const artisturi = document.getElementById("urianchor");
  artisturi.textContent = uriof;
  artisturi.href = uriof;
  const artistfollowers = document.getElementById("followers");
  artistfollowers.innerText = `Followers: ${followers}`;
  const artistgenre = document.getElementById("genre");
  artistgenre.innerText = `Genre: ${genre}`;
  const artistType = document.getElementById("artistType");
  artistType.innerText = `Type: ${type}`;
}
//*********************************************************/
let size = songsFolder.length;
let songCounter = 0;
let song = new Audio(songsFolder[songCounter].mp3);

const pauseplay = document.getElementById("pause-play");
const back = document.getElementById("back");
const forward = document.getElementById("forward");
const durationslider = document.getElementById("duration-slider");
const volume = document.getElementById("volume-slider");
const timestamp = document.getElementById("timestamp");
song.volume = 0.5; //its value ranges bw 0 and 1

const musicList = document.getElementById("musiclist");

// Play/Pause function
function playpause() {
  console.log("playpause");
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}
// Since the pauseplay function always refers to the global song variable, it will always control the currently playing song. When a new song is selected, the song variable is updated, and the pauseplay function will now control this new song.

// Music play function
function musicPlay(nextprev) {
  song.pause(); // Pause the current song
  song.currentTime = 0; // Reset the current song

  if (nextprev === "next") {
    console.log("next");
    if (songCounter === size - 1) {
      songCounter = 0;
    } else {
      songCounter++;
    }
  } else if (nextprev === "back") {
    console.log("back");
    if (songCounter === 0) {
      songCounter = size - 1;
    } else {
      songCounter--;
    }
  }
  Artist_info(songCounter);
  song = new Audio(songsFolder[songCounter].mp3);
  song.play();
  song.addEventListener("timeupdate", updateTimestamp);
  song.addEventListener("ended", () => musicPlay("next"));
  song.addEventListener("timeupdate", updateSlider);
  song.addEventListener("ended", () => {
    musicPlay("next");
  });
}
// Sliders
volume.addEventListener("input", () => {
  song.volume = volume.value / 100;
});

// Change song position with slider
durationslider.addEventListener("input", () => {
  song.currentTime = song.duration * (durationslider.value / 100);
});

// Update the slider as the audio plays
function updateSlider() {
  if (song.duration > 0) {
    durationslider.value = (song.currentTime / song.duration) * 100;
  }
}

// Update the timestamp
function updateTimestamp() {
  if (song.duration > 0) {
    let duration = song.duration;
    let currentTime = song.currentTime;

    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    durationMin = durationMin < 10 ? `0${durationMin}` : durationMin;
    durationSec = durationSec < 10 ? `0${durationSec}` : durationSec;
    currentMin = currentMin < 10 ? `0${currentMin}` : currentMin;
    currentSec = currentSec < 10 ? `0${currentSec}` : currentSec;

    timestamp.innerText = `${currentMin}:${currentSec} / ${durationMin}:${durationSec}`;
  }
}
//song name
function music_in_playlist_Name() {
  songsFolder.forEach((music, index) => {
    let text = music.songName; // This works as text content
    let songselected = document.createElement("div");
    songselected.id = "songs";
    songselected.innerText = text;
    const guitarIcon = document.createElement("i");
    guitarIcon.classList.add("fa-solid", "fa-guitar");
    songselected.append(guitarIcon);
    musicList.append(songselected);

    songselected.addEventListener("click", () => {
      songselected.style.backgroundColor = "#393838";
      songselected.style.color = "#7e10f5";
      songCounter = index; // Update the song counter
      song.pause(); // Pause the current song
      song.currentTime = 0; // Reset the current song
      Artist_info(songCounter);
      song = new Audio(songsFolder[songCounter].mp3); // Load the new song
      song.play(); // Play the new song
      song.addEventListener("timeupdate", updateTimestamp); // Add event listeners
      song.addEventListener("ended", () => {
        musicPlay("next");
        songselected.style.backgroundColor = "transparent";
      });
      song.addEventListener("pause", () => {
        songselected.style.backgroundColor = ""; //this Syntex removes previos inline css of JS
        songselected.style.color = "";
      });
      song.addEventListener("timeupdate", updateSlider);
      song.addEventListener("loadedmetadata", updateTimestamp); // Update timestamp when metadata is loaded
    });
  });
}

music_in_playlist_Name();
// Event listeners of song
pauseplay.addEventListener("click", playpause);
back.addEventListener("click", () => musicPlay("back"));
forward.addEventListener("click", () => musicPlay("next"));
song.addEventListener("ended", () => {
  //when song ended so next is called
  musicPlay("next");
});
//event listeners of sliders
song.addEventListener("timeupdate", updateSlider);
song.addEventListener("timeupdate", updateTimestamp); // Ensure timestamp is updated
song.addEventListener("loadedmetadata", updateTimestamp); // Update timestamp when metadata is loaded
