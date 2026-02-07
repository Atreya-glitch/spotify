let songs = [
    { songName: "Those Eyes", filePath: "New_West_-_Those_Eyes_CeeNaija.com_.mp3", coverPath: "those_eyes.jpg" },
    { songName: "Rana Kumbha", filePath: "Rana_Kumbha_-_M_M_Keeravaani.mp3", coverPath: "maharana_kumbha.jpg" },
    { songName: "Rana Sangha", filePath: "Shoorveer - Rapperiya Baalam _ Maharana Pratap.mp3", coverPath: "rana_sanga.jpg" }
];
let audio= new Audio('file_example_MP3_1MG.mp3');
let songIndex=0;
let masterplay= document.getElementById('masterPlay');
let myprogressbar= document.getElementById('progressbar');
let songItems= Array.from(document.getElementsByClassName('songItem'))
masterplay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        document.getElementById("gif").style.opacity=1;
    } else {
        audio.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        document.getElementById("gif").style.opacity=0;
    }
});

audio.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress= parseInt((audio.currentTime/audio.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    audio.currentTime=  (myprogressbar.value * audio.duration) / 100;
})
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('SongItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

let songItemPlays = Array.from(document.getElementsByClassName('SongItemplay'));
songItemPlays.forEach((element,i) => {
    element.addEventListener('click', (e) => {
        if (songIndex === i && !audio.paused) {
            audio.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            return;
        }
        makeAllPlay();
        songIndex = i;
        audio.src = songs[i].filePath;
        audio.currentTime = 0;
        audio.play();

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    });
});
const playSong = (index) => {
    makeAllPlay();

    songIndex = index;
    audio.src = songs[songIndex].filePath;
    audio.currentTime = 0;
    audio.play();

    // update song list icon
    songItemPlays[songIndex].classList.remove('fa-play-circle');
    songItemPlays[songIndex].classList.add('fa-pause-circle');

    // update master play
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');

    gif.style.opacity = 1;
};
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});
audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});