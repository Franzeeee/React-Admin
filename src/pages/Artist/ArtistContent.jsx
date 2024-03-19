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
    const formData = new FormData();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle submitting the album details
        // Get album details from localStorage
        const albumDetails = JSON.parse(localStorage.getItem('albumDetails'));
        const tracks = JSON.parse(localStorage.getItem('draftFiles'))

        if(event.nativeEvent.submitter.id === 'submitAlbum' && !!albumDetails && !!tracks){
            formData.append('albumTitle', albumDetails.albumTitle);
            formData.append('albumDescription', albumDetails.albumDescription);
            // formData.append('tracks', tracks);
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            cassette_api.post('/music', formData)
                .then(response => {
                    toast.success("Album Successfully Uploaded");
                    localStorage.removeItem('albumDetails')
                    localStorage.removeItem('draftFiles')
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


    //   Style for the prev button on multi step form
      const prevStyle = {background: 'transparent', border: '1px solid red', padding: '3px 10px', color: 'white', borderRadius: '2px', marginLeft: '40%'}
      const nextStyle ={background: 'transparent', border: '1px solid red', padding: '3px 10px', color: 'white', borderRadius: '2px', marginLeft: '5px'}

    const updateFormData = (formData, key, value) => {
        formData.append(key, value);
    };

    const steps = [
        {title: 'Add Music', component: <DropZone/>},
        {title: 'Music Details', component: <ContentDetails/>},
        {title: 'Album', component: <AlbumContent formData={formData} updateFormData={updateFormData} />},
        {title: 'Preview', component: <Album />},
      ];


    return (
        <ArtistLayout active={"Upload"}>
            <div className="col-10 h-100 d-flex align-align-items-center justify-content-center p-1 text-light">
                <ToastContainer />
                <form className={`w-75 d-flex flex-column gap-3 ${styles['upload-form']}`} onSubmit={handleSubmit} >
                <MultiStep activeStep={0} prevButton={{title: 'Back', style: prevStyle, }} nextButton={{title: 'Next', style: nextStyle,}} steps={steps} stepCustomStyle={{color: '#f11111'}} >
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
