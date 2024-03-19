import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/Form/album-content.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export const AlbumContent = (props) => {
    const [albumDetails, setAlbumDetails] = useState(() => {
        const storedDetails = localStorage.getItem('albumDetails');
        return storedDetails ? JSON.parse(storedDetails) : {
            albumCover: null,
            albumTitle: '',
            albumDescription: '',
            albumFile: null
        };
    });

    // Function to handle file drop
    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setAlbumDetails({...albumDetails, albumFile: file})
        console.log(albumDetails.albumFile)
        if (file) {
            // Display the dropped image
            const reader = new FileReader();
            reader.onload = () => {
                setAlbumDetails({
                    ...albumDetails,
                    albumCover: reader.result,
                });
                props.updateFormData(formData, 'albumFile', file);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAlbumDetails({...albumDetails, albumFile: file})
            console.log(albumDetails.albumFile)
            // Display the selected image
            const reader = new FileReader();
            reader.onload = () => {
                setAlbumDetails({
                    ...albumDetails,
                    albumCover: reader.result,
                });
                props.formData.append('albumFile', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const { albumCover, albumTitle, albumDescription } = albumDetails;

    // Update local storage whenever album details change
    useEffect(() => {
        localStorage.setItem('albumDetails', JSON.stringify(albumDetails));
    }, [albumDetails]);

    return (
        <div className={`card ${styles.card}`}>
            <div className={`card-header d-flex justify-content-center align-content-center ${styles.cardHeader}`}>
                <h5 className='m-0'>Edit Album Details</h5>
            </div>
            <div className={`class-body d-flex flex-column align-content-center justify-content-start gap-2 overflow-auto ${styles.contentBody}`}>
                {/* Album Cover */}
                <div 
                    className={`form-group d-flex flex-column ${styles.firstInput}`}
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <label htmlFor="albumCover">Browse or Drop Image for Album Cover</label>
                    <input 
                        type="file" 
                        className="form-control-file" 
                        id="albumCover" 
                        onChange={handleFileInputChange} 
                    />
                    <FontAwesomeIcon icon={faImage} style={{fontSize: '3rem', color: 'white'}}/>

                </div>
                {albumCover && (
                    <img src={albumCover} alt="Album Cover" className={`img-fluid ${styles.cover}`} />
                )}
                {/* Album Title */}
                <div className="form-group">
                    <label htmlFor="albumTitle">Album Title</label>
                    <input 
                        type="text" 
                        className={`form-control ${styles.title}`}
                        id="albumTitle" 
                        placeholder="Enter album title" 
                        value={albumTitle}
                        required
                        onChange={(e) => setAlbumDetails({ ...albumDetails, albumTitle: e.target.value })} 
                    />
                </div>
                {/* Album Description */}
                <div className="form-group">
                    <label htmlFor="albumDescription">Album Description (Optional)</label>
                    <textarea 
                        className={`${styles.title} form-control `}
                        id="albumDescription" 
                        rows="3" 
                        placeholder="Enter album description" 
                        value={albumDescription}
                        onChange={(e) => setAlbumDetails({ ...albumDetails, albumDescription: e.target.value })} 
                    ></textarea>
                </div>
            </div>
        </div>
    );
};
