const container = document.getElementById('container');
let currentAudioIndex = 0;
let currentAudio = null;

const images = ['https://c.saavncdn.com/990/Ainshu-Ka-Baras-Garhwali-Song--Hindi-2021-20210820053747-500x500.jpg', 'https://i.ytimg.com/vi/DPY5GxPPAz8/maxresdefault.jpg', 'https://a10.gaanacdn.com/images/albums/36/4558536/crop_480x480_4558536.jpg', 'https://a10.gaanacdn.com/gn_img/albums/2lV3dl13Rg/lV3dLoPx3R/size_l.jpg'];
const songs = ["song/Ainshu Ka Baras - Garhwali Song.mp3", "song/Bol Chudi Bol.mp3", 'song/Chaukhutiya - Garhwali Song.mp3', 'song/Genda Phool - Pahari Version.mp3'];

function playNextSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudioIndex++;
    if (currentAudioIndex < songs.length) {
        playSong(currentAudioIndex);
    } else {
        currentAudio = null;
    }
}

function playSong(index) {
    container.innerHTML = '';

    songs.forEach((item, i) => {
        let image = document.createElement('img');
        let audio = document.createElement('audio');
        let pauseButton = document.createElement('button');

        image.src = images[i];
        image.style.width = '100px';
        image.style.height = '100px';
        image.style.borderRadius = '50%';

        audio.controls = true;
        audio.src = item;
        audio.id = `audio${i}`;

        pauseButton.textContent = 'Pause';
        pauseButton.className = 'pause-btn';
        pauseButton.addEventListener('click', () => {
            audio.pause();

        });

        let songContainer = document.createElement('div');
        songContainer.appendChild(image);
        songContainer.appendChild(audio);
        songContainer.appendChild(pauseButton);

        container.appendChild(songContainer);

        if (i === index) {
            currentAudioIndex = index;
            currentAudio = audio;
            pauseButton.textContent = 'Pause';
            currentAudio.addEventListener('ended', playNextSong);
        }

        image.addEventListener('click', () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio.play();
        });
    });
}

playSong(0);
