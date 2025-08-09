// Music Player JavaScript for Isabella's Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    initializeImageProtection();
    initializeMusicPlayer();
    console.log('🎵 Player de música carregado com sucesso!');
});

// Add image protection to all images
function initializeImageProtection() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.draggable = false;
        img.oncontextmenu = () => false;
        img.onselectstart = () => false;
        img.ondragstart = () => false;
        img.onmousedown = (e) => {
            if (e.button === 2) { // Right click
                e.preventDefault();
                return false;
            }
        };
    });
}

class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.tracks = [];
        
        this.initializeElements();
        this.loadTracksFromFolder();
        this.bindEvents();
    }
    
    initializeElements() {
        // Player controls
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        // Progress and volume
        this.progressSlider = document.getElementById('progressSlider');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progress = document.getElementById('progress');
        
        // Display elements
        this.currentSongTitle = document.getElementById('currentSongTitle');
        this.currentArtist = document.getElementById('currentArtist');
        this.currentAlbumCover = document.getElementById('currentAlbumCover');
        this.currentTime = document.getElementById('currentTime');
        this.duration = document.getElementById('duration');
        this.totalSongs = document.getElementById('totalSongs');
        this.totalDuration = document.getElementById('totalDuration');
        this.playlistTracks = document.getElementById('playlistTracks');
        
        // Set initial volume
        this.audio.volume = 0.7;
    }
    
    loadTracksFromFolder() {
        // Isabella's Ana Castela Playlist
        const trackData = [
            { title: "RAM TCHUM", artist: "Dennis, Ana Castela e MC GW", album: "Single", duration: "2:45" },
            { title: "Solteiro Forçado", artist: "Ana Castela", album: "Boiadeira", duration: "3:12" },
            { title: "Boiadeira", artist: "Ana Castela", album: "Boiadeira", duration: "2:58" },
            { title: "Lua", artist: "Ana Castela ft. Alok, Oficial Hungria", album: "Boiadeira", duration: "3:24" },
            { title: "Pipoco", artist: "Ana Castela ft. Melody e DJChrisNoBeat", album: "Boiadeira", duration: "2:36" },
            { title: "Fronteira", artist: "Ana Castela ft. Gustavo Mioto", album: "Boiadeira", duration: "3:18" },
            { title: "Saudade do Seu Love", artist: "Ana Castela e DJ Guuga", album: "Single", duration: "2:52" },
            { title: "Roça Em Mim", artist: "Zé Felipe, Ana Castela e Luan Pereira", album: "Single", duration: "3:05" },
            { title: "Palhaça", artist: "Naiara Azevedo, Ana Castela", album: "Single", duration: "3:28" },
            { title: "DONA DE MIM", artist: "Ana Castela", album: "Boiadeira", duration: "2:44" }
        ];
        
        this.tracks = trackData.map((track, index) => ({
            index: index,
            src: `../audio/song_${index + 1}.mp3`,
            cover: `../audio/covers/song_${index + 1}.webp`,
            title: track.title,
            artist: track.artist,
            album: track.album,
            duration: track.duration
        }));
        
        this.renderTracks();
        this.updateStats();
    }
    
    renderTracks() {
        this.playlistTracks.innerHTML = '';
        
        this.tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track';
            trackElement.innerHTML = `
                <div class="track-number">${index + 1}</div>
                <div class="track-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                </div>
                <div class="track-duration">${track.duration}</div>
                <button class="track-play-btn" data-index="${index}">
                    <i class="fas fa-play"></i>
                </button>
            `;
            
            // Add click events
            trackElement.addEventListener('click', (e) => {
                if (!e.target.closest('.track-play-btn')) {
                    this.playTrack(index);
                }
            });
            
            const playBtn = trackElement.querySelector('.track-play-btn');
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playTrack(index);
            });
            
            this.playlistTracks.appendChild(trackElement);
        });
    }
    
    updateStats() {
        this.totalSongs.textContent = this.tracks.length;
        
        // Calculate total duration
        let totalSeconds = 0;
        this.tracks.forEach(track => {
            const [minutes, seconds] = track.duration.split(':').map(Number);
            totalSeconds += minutes * 60 + seconds;
        });
        
        const totalMinutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        this.totalDuration.textContent = `${totalMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    bindEvents() {
        // Player controls
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Volume and progress controls
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        this.progressSlider.addEventListener('input', (e) => {
            const seekTime = (e.target.value / 100) * this.audio.duration;
            this.audio.currentTime = seekTime;
        });
        
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => this.updateDisplay());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('loadstart', () => this.showLoading());
        this.audio.addEventListener('canplaythrough', () => this.hideLoading());
        this.audio.addEventListener('error', (e) => this.handleError(e));
    }
    
    playTrack(index) {
        if (index < 0 || index >= this.tracks.length) return;
        
        this.currentTrackIndex = index;
        const track = this.tracks[index];
        
        console.log('🎵 Playing track:', track.title);
        console.log('🎵 File path:', track.src);
        
        this.audio.src = track.src;
        this.audio.load();
        
        this.currentSongTitle.textContent = track.title;
        this.currentArtist.textContent = track.artist;
        
        // Update album cover with fallback to default
        if (this.currentAlbumCover) {
            this.currentAlbumCover.src = track.cover;
            this.currentAlbumCover.onerror = () => {
                this.currentAlbumCover.src = '../img/default-album.jpg';
            };
        }
        
        // Update active track styling
        document.querySelectorAll('.track').forEach((el, i) => {
            el.classList.toggle('active', i === index);
            const playBtn = el.querySelector('.track-play-btn i');
            playBtn.className = i === index ? 'fas fa-pause' : 'fas fa-play';
        });
        
        this.play();
    }
    
    play() {
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updatePlayButtons();
            }).catch(error => {
                console.error('Reprodução falhou:', error);
                this.handleError(error);
            });
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButtons();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.audio.src) {
                this.play();
            } else if (this.tracks.length > 0) {
                this.playTrack(0);
            }
        }
    }
    
    nextTrack() {
        const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playTrack(nextIndex);
    }
    
    previousTrack() {
        const prevIndex = this.currentTrackIndex > 0 ? this.currentTrackIndex - 1 : this.tracks.length - 1;
        this.playTrack(prevIndex);
    }
    
    updatePlayButtons() {
        const playIcon = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        this.playPauseBtn.querySelector('i').className = playIcon;
        
        // Update current track play button
        const currentTrackBtn = document.querySelector(`.track:nth-child(${this.currentTrackIndex + 1}) .track-play-btn i`);
        if (currentTrackBtn) {
            currentTrackBtn.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
    
    updateDisplay() {
        if (this.audio.duration) {
            this.duration.textContent = this.formatTime(this.audio.duration);
        }
        
        // Ensure track info is displayed when metadata loads
        if (this.tracks[this.currentTrackIndex]) {
            const currentTrack = this.tracks[this.currentTrackIndex];
            this.currentSongTitle.textContent = currentTrack.title;
            this.currentArtist.textContent = currentTrack.artist;
            
            // Update album cover if available
            if (this.currentAlbumCover) {
                this.currentAlbumCover.src = currentTrack.cover;
                this.currentAlbumCover.onerror = () => {
                    this.currentAlbumCover.src = '../img/default-album.jpg';
                };
            }
        }
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progress.style.width = progressPercent + '%';
            this.progressSlider.value = progressPercent;
            this.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    showLoading() {
        this.currentSongTitle.textContent = 'Loading...';
        this.currentArtist.textContent = 'Please wait';
    }
    
    hideLoading() {
        // Loading state cleared - track info will be updated by other methods
        if (this.tracks[this.currentTrackIndex]) {
            const currentTrack = this.tracks[this.currentTrackIndex];
            this.currentSongTitle.textContent = currentTrack.title;
            this.currentArtist.textContent = currentTrack.artist;
        }
    }
    
    handleError(error) {
        console.error('Erro de áudio:', error);
        console.log('Current track path:', this.audio.src);
        
        // Provide more specific error messages
        if (error.target && error.target.error) {
            switch(error.target.error.code) {
                case 1:
                    this.currentSongTitle.textContent = 'Audio loading was aborted';
                    this.currentArtist.textContent = 'Try again';
                    break;
                case 2:
                    this.currentSongTitle.textContent = 'Network error occurred';
                    this.currentArtist.textContent = 'Check your connection';
                    break;
                case 3:
                    this.currentSongTitle.textContent = 'Audio file corrupt or unsupported';
                    this.currentArtist.textContent = 'File may be damaged';
                    break;
                case 4:
                    this.currentSongTitle.textContent = 'Audio file not found';
                    this.currentArtist.textContent = `Check: ${this.tracks[this.currentTrackIndex]?.src || 'file path'}`;
                    break;
                default:
                    this.currentSongTitle.textContent = 'Unknown audio error';
                    this.currentArtist.textContent = 'Please try another song';
            }
        } else {
            this.currentSongTitle.textContent = 'Error loading track';
            this.currentArtist.textContent = 'Please try another song';
        }
        
        this.isPlaying = false;
        this.updatePlayButtons();
    }
}

// Initialize the music player
function initializeMusicPlayer() {
    window.musicPlayer = new MusicPlayer();
    
    // Add smooth animations for page load
    setTimeout(() => {
        const playlistHeader = document.querySelector('.playlist-header');
        if (playlistHeader) {
            playlistHeader.style.opacity = '0';
            playlistHeader.style.transform = 'translateY(30px)';
            playlistHeader.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                playlistHeader.style.opacity = '1';
                playlistHeader.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate tracks
        const tracks = document.querySelectorAll('.track');
        tracks.forEach((track, index) => {
            track.style.opacity = '0';
            track.style.transform = 'translateX(-30px)';
            track.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                track.style.opacity = '1';
                track.style.transform = 'translateX(0)';
            }, 200 + (index * 100));
        });
    }, 300);
}

// Add smooth animations and hover effects
const style = document.createElement('style');
style.textContent = `
    .track {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .track:hover {
        background: rgba(218, 165, 32, 0.1);
        transform: translateX(5px);
    }
    
    .track.active {
        background: rgba(218, 165, 32, 0.2);
        border-left: 4px solid var(--accent-color);
    }
    
    .track-play-btn {
        transition: all 0.3s ease;
    }
    
    .track-play-btn:hover {
        background: var(--accent-color);
        color: white;
        transform: scale(1.1);
    }
    
    .control-btn:hover {
        background: var(--accent-color);
        color: white;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
