document.addEventListener('DOMContentLoaded', function () {

    const currentAudio = document.getElementById('currentAudio');
    const currentArtist = document.getElementById('currentArtist');
    const currentAlbum = document.getElementById('currentAlbum');
    const currentGenre = document.getElementById('currentGenre');
    const currentPlaylist = document.getElementById('currentPlaylist');
    const currentThumbnail = document.getElementById('currentThumbnail');
    // const currentFile = document.getElementById('currentFile');
    // const totalFile = document.getElementById('totalFile');

    const playlistItems = document.querySelectorAll('.topu-playlist-item');

    const audio = document.getElementById('myAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const seekBar = document.getElementById('seekBar');
    const resetBtn = document.getElementById('resetBtn');
    const backwardBtn = document.getElementById('backwardBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');

    if (playlistItems) {
        playlistItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                const audioIndex = parseInt(item.getAttribute('data-audio-index'));
                setAudioInformation(audioIndex);
                audio.play();
                playPauseBtn.textContent = '❚❚';
            });
        });
    }

    // add event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    volumeSlider.addEventListener('input', setVolume);
    seekBar.addEventListener('input', setSeekBar);
    resetBtn.addEventListener('click', resetAudio);
    backwardBtn.addEventListener('click', backward);
    forwardBtn.addEventListener('click', forward);
    shuffleBtn.addEventListener('click', shuffle);


    let audioIndex = 0;

    // audio list 
    const audioList = [
        {
            title: 'Midnight Forest',
            artist: 'Topu',
            album: 'Midnight Forest',
            genre: 'Alternative',
            playlist: 'Coldplay',
            src: 'midnight-forest-184304.mp3',
            thumbnail: 'midnight-forest-184304.jpg',
        },
        {
            title: 'My Heart Will Go On',
            artist: 'Celine Dion',
            album: 'My Heart Will Go On',
            genre: 'Pop',
            playlist: 'Celine Dion',
            src: 'baby-mandala-169039.mp3',
            thumbnail: 'my-heart-will-go-on-184304.jpg',
        },
        {
            title: 'Despacito',
            artist: 'Luis Fonsi',
            album: 'Despacito',
            genre: 'Pop',
            playlist: 'Luis Fonsi',
            src: 'a-long-way-166385.mp3',
            thumbnail: 'despacito-184304.jpg',
        }
    ]

    //initialize audio
    document.addEventListener('DOMContentLoaded', setAudioInformation(audioIndex = 0));

    //set audio with information
    // using if condition to avoid error when there is no audio element and any other element is undefined
    function setAudioInformation(audioIndex) {
        // if(!audioList[audioIndex].src) {
        //     console.log('No audio found');
        //     return;
        // }
        if (currentAudio) {
            currentAudio.textContent = audioList[audioIndex].title;
        }
        if (currentArtist) {
            currentArtist.textContent = audioList[audioIndex].artist;
        }
        if (currentAlbum) {
            currentAlbum.textContent = audioList[audioIndex].album;
        }
        if (currentGenre) {
            currentGenre.textContent = audioList[audioIndex].genre;
        }
        if (currentPlaylist) {
            currentPlaylist.textContent = audioList[audioIndex].playlist;
        }
        if (currentThumbnail) {
            currentThumbnail.src = audioList[audioIndex].thumbnail;
        }
        if (audio) {
            audio.src = audioList[audioIndex].src;
        }
    }

    // play/pause button
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '❚❚';
        } else {
            audio.pause();
            playPauseBtn.textContent = '►';
        }
    }

    // play previous audio
    function playPrevious() {
        audioIndex--;
        if (audioIndex < 0) {
            audioIndex = audioList.length - 1;
        }
        // audio.src = audioList[audioIndex].src;
        setAudioInformation(audioIndex);
        audio.play();
        playPauseBtn.textContent = '❚❚';
    }

    // play next audio
    function playNext() {
        audioIndex++;
        if (audioIndex >= audioList.length) {
            audioIndex = 0;
        }
        // audio.src = audioList[audioIndex].src;
        setAudioInformation(audioIndex);
        audio.play();
        playPauseBtn.textContent = '❚❚';
    }

    // set volume
    function setVolume() {
        audio.volume = volumeSlider.value;
    }

    // reset audio
    function resetAudio() {
        audio.currentTime = 0;
    }
    // backward audio
    function backward() {
        audio.currentTime -= 10;
    }
    // forward audio
    function forward() {
        audio.currentTime += 10;
    }
    // shuffle audio
    function shuffle() {
        audioIndex = Math.floor(Math.random() * audioList.length);
        setAudioInformation(audioIndex);
        audio.play();
        playPauseBtn.textContent = '❚❚';
    }
    // update seek bar and audio time with clicked
    function setSeekBar() {
        audio.currentTime = seekBar.value;
    }

    // update seek bar
    audio.addEventListener('timeupdate', updateSeekBar);
    // update seek bar
    function updateSeekBar() {
        seekBar.value = audio.currentTime;
        seekBar.max = audio.duration;
    }
    // auto call next song
    audio.addEventListener('ended', playNext);

    // audio time format calculation function
    function timeFormat(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }
    // current time format
    function currentTime(topuAudio) {
        const formattedTime = timeFormat(topuAudio.currentTime);
        return formattedTime;
    }
    // duration time format
    function durationTime(topuAudio) {
        const formattedTime = timeFormat(topuAudio.duration);
        return formattedTime;
    }
    // update current time and duration time with audio
    function updateTime() {
        const currentTimeElement = document.getElementById('currentTime');
        const durationElement = document.getElementById('duration');
        if (currentTimeElement && durationElement) {
            currentTimeElement.textContent = currentTime(audio);
            durationElement.textContent = durationTime(audio);
        }
    }
    setInterval(updateTime, 1000);
});
