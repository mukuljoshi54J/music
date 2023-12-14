const container = document.getElementById('container');
let currentAudioIndex = 0;
let currentAudio = null;

const images = ['https://i.scdn.co/image/ab67616d0000b27317c8b293deaa9f7606ce94b9', 'https://i.scdn.co/image/ab67616d0000b2735fddec373c732b3493a2eab1', 'https://i.scdn.co/image/ab67616d0000b2735f78f5dc2453e4a3bfb4143d', 'https://i.scdn.co/image/ab67616d0000b2735fddec373c732b3493a2eab1'];
const songs = ["song/Gulabi Sharara.mp3", "song/Mathu Mathu - Uttrakhandi.mp3", 'song/Mero Lehanga.mp3', 'song/Photo Teri - Kumaoni.mp3'];

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
