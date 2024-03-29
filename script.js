
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist")
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const controls = document.querySelector(".player-controls")
const playBtn = document.getElementById("play")


const songs = [
    
    {
        name:"song-1",
        displayName:"Water",
        artist:"Tyla"
    },
    {
        name:"song-2",
        displayName:"Tejano blue",
        artist:"Cigarettes After Ss"
    },
    {
        name:"song-3",
        displayName:"Armagedon",
        artist:"Moonpie"
    },
]

//Check if playing
let isPlaying = false;

//Play, Pause
const playSong = ()=>{
    isPlaying = true;
    playBtn.setAttribute('title','Pause')
    playBtn.classList.replace('fa-play','fa-pause')
    music.play() 
} 
const pauseSong = ()=> {
    isPlaying = false;
    playBtn.setAttribute('title','Play')
    playBtn.classList.replace('fa-pause','fa-play')
    music.pause()
}

//Play or pause event 
playBtn.addEventListener('click',()=>isPlaying ? pauseSong(): playSong())

//Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//On load - Select first song
loadSong(songs[songIndex])

//Next and prev
const nextSong = ()=>{
    if(songIndex > songs.length-1)songIndex = 0;
    else songIndex += 1;
    loadSong(songs[songIndex])
    playSong()
}
const prevSong = ()=>{
    if(songIndex > 0)songIndex -=1;
    else songIndex = songs.length-1
    loadSong(songs[songIndex])
    playSong()
}

//Update Progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        //Update progress bar width;
        const progressPercent = (currentTime/duration)*100;
        // console.log(progressPercent)
        progress.style.width = `${progressPercent}%`
        //Calc display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        //Delay switching duration el to avoid NAN
        if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

//Set ProgressBar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration
}

//Event Listeners
prevBtn.addEventListener("click",prevSong)
nextBtn.addEventListener("click",nextSong)
music.addEventListener("ended",nextSong)
music.addEventListener("timeupdate",updateProgressBar);
progressContainer.addEventListener("click",setProgressBar)