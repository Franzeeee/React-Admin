import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/dropzone.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export const DropZone = (props) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Check if draftFiles exists in local storage
    const draftFiles = localStorage.getItem('draftFiles');
    if (draftFiles) {
      // Parse draftFiles and set it to the files state
      setFiles(JSON.parse(draftFiles));
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const newFilesArray = Array.from(selectedFiles).map((file, index) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        location: URL.createObjectURL(file),
        uploadTimestamp: new Date().toISOString(),
        genre: [],
        userId: 1,
    }));

    // Filter out files that are not of type .mp3
    const mp3Files = newFilesArray.filter(file => file.type === 'audio/mpeg');

    // If any non-mp3 file is detected, show an alert
    const nonMp3Files = newFilesArray.filter(file => file.type !== 'audio/mpeg');
    if (nonMp3Files.length > 0) {
        alert('Please upload only .mp3 files.');
    }
    
    // Add only mp3 files to the state
    setFiles(prevFiles => [...prevFiles, ...mp3Files]);

    // Update local storage with the updated files array
    localStorage.setItem('draftFiles', JSON.stringify([...files, ...mp3Files]));
};


  return (
    <div className={`card ${styles.card}`}>
      <div className={`card-header text-center ${styles.cardHeader}`}>
        <h5 className="m-0">Add your .mp3 files here</h5>
      </div>
      <div className="card-body bg-transparent">
        <div className={`${styles.box}`}>
          <FontAwesomeIcon icon={faCloudArrowUp}/>
          <p>Click to Browse or Drag .mp3 files here</p>
          <input type="file" multiple onChange={handleFileChange}/>
        </div>
        <div>
          <h6>Added Files:<span style={{color: 'red'}}>{files.length}</span></h6>
          <ul style={{display: 'flex', flexDirection: 'column', gap: '5px', listStyleType: 'square'}}> 
            {files.map((file, index) => (
              <li style={{background: '#fdfdfd36'}} key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
