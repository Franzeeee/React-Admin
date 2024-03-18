import { useState } from 'react'
import styles from '../../assets/css/Form/album.module.css'
import defaultImage from '../../assets/img/artist-img.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export const Album = () => {

    const { albumCover, albumTitle, albumDescription } = JSON.parse(localStorage.getItem('albumDetails'));
    const musicData = JSON.parse(localStorage.getItem('draftFiles'));

    const [hoveredItemId, setHoveredItemId] = useState(null);

    const handleItemHover = (id) => {
        setHoveredItemId(id);
    };
    const handleItemOut = () => {
        setHoveredItemId(-1);
        alert(hoveredItemId)
    }

  return (
    <div className={`card ${styles.card}`}>
        <div className={`card-header ${styles.cardHeader}`}>
            <h5 className="m-0 text-center ">Preview Album</h5>
        </div>
        <div className={`card-body`}>
            <div className={`${styles['album-details']}`}>
                <img src={albumCover} />
                <div className={`${styles['details-text']}`}>
                    <h6>Title:<span>{albumTitle}</span></h6>
                    <p>Description (Optional): <span>{albumDescription}</span></p>
                </div>
            </div>
            <div className={`${styles.tracks}`}>
                <div className={`${styles.music}`}>
                    <table>
                        <thead>
                            <tr className={`${styles.headerTable}`}>
                                <th>#</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add musicData.map make the duarion static like 69:69 here */}
                            {musicData.map((musicItem, index) => (
                                    <tr key={index} className={`${styles.musicRow}`} onMouseEnter={() => handleItemHover(index)} onMouseLeave={() => handleItemHover(index)}>
                                        <td className='px-1'>{index + 1}
                                        </td>
                                        <td>{musicItem.name}</td>
                                        <td style={{minWidth: '100px'}}>Dnel</td>
                                        <td style={{width: '80px'}}>{musicItem.duration}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button id='submitAlbum' type='submit'>Submit</button>
        </div>
    </div>
  )
}
