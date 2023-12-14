
document.addEventListener('DOMContentLoaded', function () {
    const show_Container = document.getElementById('show_Container');
    const likedSongsContainer = document.getElementById('likedSongsContainer');

    let currentAudioIndex = 0;
    let currentAudio = null;
    const likes = [0, 0, 0, 0];
    const likedSongs = getLikedSongs(); // Retrieve liked songs from local storage

    const images = ['images/fwa-baga-re-pappu-karki.jpg', 'images/sun le dagadiya.jpeg', 'https://i.scdn.co/image/ab67616d0000b273e827b77233bb5631ff8a8273', 'https://i.scdn.co/image/ab67616d0000b273d8be58d9b72aaf4530dc3a54'];
    const songs = ["song/Fwa Bagha Re.mp3", "song/Sun Le Dagadiya.mp3", 'song/Chaukote Ki Parvati - Pahadi.mp3', 'song/O Laali Ho.mp3'];

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
        if (!show_Container) {
            console.error("Container element not found");
            return;
        }

        show_Container.innerHTML = '';

        songs.forEach((item, i) => {
            let image = document.createElement('img');
            let audio = document.createElement('audio');
            let pauseButton = document.createElement('button');
            let likeButton = document.createElement('button');

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

            likeButton.textContent = `Like (${likes[i]})`;
            likeButton.className = 'like-btn';
            likeButton.addEventListener('click', () => {
                likes[i]++;
                likeButton.textContent = `Like (${likes[i]})`;
                if (!likedSongs.includes(songs[i])) {
                    likedSongs.push(songs[i]);
                    updateLikedSongs();
                }
            });

            let songContainer = document.createElement('div');
            songContainer.appendChild(image);
            songContainer.appendChild(audio);
            songContainer.appendChild(pauseButton);
            songContainer.appendChild(likeButton);

            show_Container.appendChild(songContainer);

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

    function updateLikedSongs() {
        // Calculate the total number of likes
        const totalLikes = likes.reduce((total, like) => total + like, 0);

        // Display liked songs count on the home page
        const likedSongsCountElement = document.getElementById('likedSongsCount');
        if (likedSongsCountElement) {
            likedSongsCountElement.textContent = totalLikes.toString();
        }

        // Display liked songs and total likes on the index.html page
        likedSongsContainer.innerHTML = `<h2>Liked Songs:</h2>`;
        likedSongs.forEach((likedSong, index) => {
            likedSongsContainer.innerHTML += `<p>${index + 1}. ${likedSong}</p>`;
        });

        // Update the text of the "Liked Songs" link with the total likes
        const likedSongsLink = document.querySelector('.like-button[data-song-index="0"]');
        if (likedSongsLink) {
            likedSongsLink.textContent = `Liked Songs (${totalLikes})`;
        }

        // Save liked songs to local storage
        saveLikedSongs();
    }

    function saveLikedSongs() {
        // Save liked songs to local storage
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }

    function getLikedSongs() {
        // Retrieve liked songs from local storage
        const storedLikedSongs = localStorage.getItem('likedSongs');
        return storedLikedSongs ? JSON.parse(storedLikedSongs) : [];
    }

    playSong(0);
});
