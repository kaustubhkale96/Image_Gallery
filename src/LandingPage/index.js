import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiKey, query } from '../keys';
import './index.css';

export default function LandingPage() {
    const [image, setImage] = useState([]);
    console.log(image)
    useEffect(() => {
        const getImage = () => {
            return axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=&format=json&nojsoncallback=1&extras=url_s`)
                .then((response) => {
                    console.log(response.data.photos.photo);
                    setImage(response.data.photos.photo);
                })
        }
        getImage();
    }, []);

    return (
        <React.Fragment>
            <div className="body">
                <div className="container">
                    <div className="appbar">
                        <h1 className="Title">PicsLab</h1>
                    </div>
                    <form>
                        <div className="search">
                            <input className="searchInput" type="text" placeholder="Search..." />
                            <button>Search</button>
                        </div>
                    </form>
                    <div className="gallery" >
                        {image.map((item, index) => (
                            <div className="image" key={index}>
                                <img src={item.url_s} alt="img" style={{ width: "100%", borderRadius: "5px" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
