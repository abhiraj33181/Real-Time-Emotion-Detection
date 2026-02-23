import './css/SongTrack.css';
import { Play, Pause } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const SongTracks = ({ songs }) => {
    const audioRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePlay = (song, index) => {
        if (currentIndex !== index) {
            audioRef.current.src = song.audio;
            setCurrentIndex(index);
        }

        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        const percent =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent);
    };

    const handleSeek = (e) => {
        const seekTime =
            (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
    };


    return (
        <div className='song-section'>
            <h1>Recommended Songs</h1>

            {songs.length > 0 ? (
                songs.map((song, index) => (
                    <div key={index} className="song-card">

                        <div className="song-info">
                            <h3>{song.title}</h3>
                            <p>Artist: {song.artist}</p>

                            {currentIndex === index && (
                                <input
                                    type="range"
                                    className="brutalist-slider"
                                    value={progress}
                                    onChange={handleSeek}
                                    min="0"
                                    max="100"
                                />
                            )}
                        </div>

                        <div className="buttons">
                            {currentIndex === index && isPlaying ? (
                                <button onClick={handlePause}>
                                    <Pause />
                                </button>
                            ) : (
                                <button onClick={() => handlePlay(song, index)}>
                                    <Play />
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-songs">No songs available for the detected mood.</p>
            )}

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
};

export default SongTracks;