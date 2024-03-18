import styles from '../../assets/css/Form/content-details.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause,faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { musicGenres } from '../../assets/data/genres';
import { customStyle } from '../../assets/css/Form/select';
import { ToastContainer, toast } from 'react-toastify';

export const ContentDetails = () => {
    const [musicData, setMusicData] = useState(JSON.parse(localStorage.getItem('draftFiles')));
    const [playing, setPlaying] = useState();
    const [editingIndex, setEditingIndex] = useState(null); // State to track the index being edited
    const [audioSource, setAudioSource] = useState()
    const [startPlay, setStartPlay] = useState(true)

    // Function to handle play/pause for the targets
    const handleControl = (id, index) => {
        setAudioSource(musicData[index].location);
        const audio = document.querySelector('#audio')
    
        if(index === playing){
            setPlaying();
            audio.pause();
        }else {
            setPlaying(index);
            if(audio.paused){
                audio.play()
            }
        }
    };

    // Function to handle double click on music title
    const handleDoubleClick = (index) => {
        setEditingIndex(index); // Set the index being edited
    };

    // Function to handle input change for editing the music title
    const handleInputChange = (e, index) => {
        const updatedMusicData = [...musicData];
        updatedMusicData[index].name = e.target.value;
        setMusicData(updatedMusicData);
        localStorage.setItem('draftFiles', JSON.stringify(musicData));
    };

    // Function to handle blur event on the input
    const handleInputBlur = () => {
        setEditingIndex(null); // Reset editing index when blurring out of the input

    };

    const handleSelect = (selectedOptions, index) => {
        const updatedMusicData = [...musicData];
        
        // Check if the index is within the bounds of the array
        if (index >= 0 && index < updatedMusicData.length) {
            const selectedValues = selectedOptions.map(option => option.value);
            // Assign selected genres to the corresponding music file
            updatedMusicData[index].genre = selectedValues;
            setMusicData(updatedMusicData); // Update music data state
    
            // Update local storage with the updated music data
            localStorage.setItem('draftFiles', JSON.stringify(updatedMusicData));
        } else {
            console.error('Invalid index:', index);
        }
    };
    
        // Function to handle deletion of a music file
        const handleDelete = (index) => {
            const updatedMusicData = [...musicData];
            updatedMusicData.splice(index, 1); // Remove the music file at the specified index
            setMusicData(updatedMusicData); // Update music data state
            localStorage.setItem('draftFiles', JSON.stringify(updatedMusicData)); // Update local storage
            toast.success("Deleted Successfully");
        };

        //Format the duration to mm:ss
        const formatDuration = (durationInSeconds) => {
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        // Function to fetch the duration of an audio file
        const getAudioDuration = async (url) => {
            try {
                const audio = new Audio(url);
                await new Promise((resolve, reject) => {
                    audio.addEventListener('loadedmetadata', () => {
                        resolve();
                    });
                    audio.addEventListener('error', (error) => {
                        reject(error);
                    });
                });
                return formatDuration(audio.duration);
            } catch (error) {
                console.error('Error fetching duration:', error);
                return 0; // Return 0 if there's an error
            }
        };
        

        useEffect(() => {
            // Fetch duration for each music file in musicData
            const fetchDurationForAllFiles = async () => {
                const updatedMusicData = [...musicData];
                for (let i = 0; i < updatedMusicData.length; i++) {
                    const duration = await getAudioDuration(updatedMusicData[i].location);
                    updatedMusicData[i].duration = duration;
                }
                setMusicData(updatedMusicData);
                localStorage.setItem('draftFiles', JSON.stringify(updatedMusicData));
            };

            fetchDurationForAllFiles();
        }, []);

    return (
        <div className={`card ${styles.card}`}>
            <ToastContainer />
        {/* Audio Element */}
        <audio
            controls
            src={audioSource}
            autoPlay={true}
            id="audio"
            style={{ display: "none" }}
        ></audio>
            <div className={`card-header d-flex align-items-center justify-content-start ${styles.cardHeader}`}>
                <h5 className="m-0">Add Music Information</h5>
            </div>
            <div className={`class-body d-flex flex-column align-content-center justify-content-start gap-1 overflow-auto ${styles.contentBody}`}>
                {musicData.map((file, index) => (
                    <div key={index} className={`text-white ${styles.content}`}>
                        <FontAwesomeIcon
                            icon={playing == index ? faPause : faPlay}
                            onClick={() => handleControl(`target${index + 1}`, index)}
                        />
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={file.name}
                                onChange={(e) => handleInputChange(e, index)}
                                onBlur={handleInputBlur}
                            />
                        ) : (
                            <div
                                title='Double Click To Edit'
                                onDoubleClick={() => handleDoubleClick(index)}
                                className={`${styles.title}`}
                            >
                                {file.name}
                            </div>
                        )}
                        <FontAwesomeIcon icon={faTrash} title='Delete' onClick={handleDelete}/>
                        <div className={`${styles.secondRow}`}>
                        <Select
                            isMulti
                            name="genre"
                            defaultValue={file.genre.map(genre => ({ value: genre, label: genre }))}
                            options={musicGenres}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customStyle}
                            onChange={(selectedOptions) => handleSelect(selectedOptions, index)}
                        />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
