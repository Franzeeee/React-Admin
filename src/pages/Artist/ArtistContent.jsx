import React, { useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';
import styles from '../../assets/css/ArtistStudio/artist-upload.module.css';
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select';
import MultiStep from 'react-multistep';
import { ContentDetails } from '../../Components/Form/ContentDetails';
import { DropZone } from '../../Components/Form/DropZone';
import { AlbumContent } from '../../Components/Form/AlbumContent';
import { Album } from '../../Components/Form/Album';

function ArtistContent() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState('');

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAlbumChange = (event) => {
        setSelectedAlbum(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check if the id of the button clicked is submitAlbum
        if (event.nativeEvent.submitter && event.nativeEvent.submitter.id === 'submitAlbum' && !!localStorage.getItem('draftData') && !!localStorage.getItem('albumDetails')) {
            // Handle submitting the album details
            const formData = new FormData();
            formData.append('title', title);
            formData.append('genre', genre);
            formData.append('album', selectedAlbum);
            formData.append('file', selectedFile);
    
            cassette_api.post('/music', formData)
                .then(response => {
                    toast.success(response.data.message);
                })
                .catch(error => {
                    toast.error('Error:', error.message);
                });
        }
    };

    // Sample object of genre options
    const genreOptions = [
        { value: 'rock', label: 'Rock' },
        { value: 'pop', label: 'Pop' },
        { value: 'hiphop', label: 'Hip Hop' },
        { value: 'rap', label: 'Rap' },
        { value: 'country', label: 'Country' },
        { value: 'classic', label: 'Classic' }
    ];

    // Sample array of album options
    const albumOptions = [
        { value: 'none', label: 'None' },
        { value: 'album1', label: 'Album 1' },
        { value: 'album2', label: 'Album 2' },
        { value: 'album3', label: 'Album 3' }
    ];

    const [activeStep, setActiveStep] = useState(0);

    const prevButton = () => {
    }

    const nextButton = () => {
        setActiveStep(activeStep + 1);
        alert()
    }

    //   Style for the prev button on multi step form
      const prevStyle = {background: 'transparent', border: '1px solid red', padding: '3px 10px', color: 'white', borderRadius: '2px', marginLeft: '40%'}
      const nextStyle ={background: 'transparent', border: '1px solid red', padding: '3px 10px', color: 'white', borderRadius: '2px', marginLeft: '5px'}

    function findDisabledNextButton() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.trim() === 'Next' && !button.disabled) {
                button.click();
                return; // Stop iterating once a disabled Next button is found
            }
        });
    }

    const steps = [
        {title: 'Add Music', component: <DropZone/>},
        {title: 'Music Details', component: <ContentDetails/>},
        {title: 'Album', component: <AlbumContent disableNext={findDisabledNextButton}/>},
        {title: 'Preview', component: <Album />},
      ];


    return (
        <ArtistLayout active={"Upload"}>
            <div className="col-10 h-100 d-flex align-align-items-center justify-content-center p-1 text-light">
                <ToastContainer />
                <form className={`w-75 d-flex flex-column gap-3 ${styles['upload-form']}`} onSubmit={handleSubmit} >
                <MultiStep activeStep={activeStep} prevButton={{title: 'Back', style: prevStyle, }} nextButton={{nextButton, title: 'Next', style: nextStyle,}} steps={steps} stepCustomStyle={{color: '#f11111'}} >
                </MultiStep>
                    {/* <div className="form-group d-flex flex-column">
                        <label htmlFor="file">Upload Music File:</label>
                        <input type="file" className="form-control-file border p-1" id="file" onChange={handleFileChange} accept=".mp3" required  multiple/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title (Required)</label>
                        <input type="text" className="form-control bg-transparent rounded-0 p-2 text-light" id="title" value={title} onChange={handleTitleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre (Required)</label>
                        <select
                            className="form-control bg-transparent rounded-0 p-2 text-light"
                            id="genre"
                            value={genre}
                            onChange={handleGenreChange}
                            required
                        >
                            <option className='bg-dark' value="">Select Genre</option>
                            {genreOptions.map((option) => (
                                <option className='bg-dark' key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="album">Album</label>
                        <select
                            className="form-control bg-transparent rounded-0 p-2 text-light"
                            id="album"
                            value={selectedAlbum}
                            onChange={handleAlbumChange}
                            required
                        >
                            <option className='bg-dark' value="">Select Album</option>
                            {albumOptions.map((option) => (
                                <option className='bg-dark' key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-outline-danger">Upload</button> */}
                </form>
            </div>
        </ArtistLayout>
    );
}

export default ArtistContent;
