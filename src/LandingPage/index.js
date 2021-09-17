import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiKey, query } from '../keys';
import './index.css';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'

export default function LandingPage() {
    const [image, setImage] = useState([]);
    const [search, setSearch] = useState([]);
    const [Data, setData] = useState(true);
    const [text, setText] = useState("");
    console.log("images", image)
    console.log("search=>", search)
    console.log("search data=>", Data)
    console.log()
    useEffect(() => {
        const getImage = () => {
            return axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=26&format=json&nojsoncallback=1&extras=url_s`)
                .then((response) => {
                    console.log(response.data.photos);
                    setImage(response.data.photos.photo);
                })
        }
        getImage();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const searchText = image.filter((value) => {
            return value.title.toLowerCase().includes(text.toLocaleLowerCase());

        });
        setSearch(searchText);
        console.log("text", text)

        if (searchText.length === 0) {
            setData(false);
        } else {
            setData(true);
        }
    }

    const searchImage = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "search") {
            setText(value);
        }
    }

    return (
        <React.Fragment>
            <div className="body">
                <div className="container">
                    <div className="appbar">
                        <a href="/">
                            <h1 className="Title">PicsLab</h1>
                        </a>
                    </div>
                    <form>
                        <div className="search">
                            <input className="searchInput" type="text" value={text} onChange={searchImage} placeholder="Search..." name="search" />
                            <SearchOutlined className="button" onClick={submit} />
                        </div>
                    </form>
                    <div>
                        {Data === false && (
                            <div >
                                <h3 className="errorSearch">Sorry! no results for: {text}</h3>
                            </div>
                        )}
                    </div>
                    <div className="gallery">
                        {search.length !== 0 ? search.map((item, index) => (
                            <div className="image" key={index}>
                                <img src={item.url_s} alt="img" style={{ width: "100%", borderRadius: "5px" }} />
                            </div>
                        )) :
                            <div>
                                {image.map((item, index) => (
                                    <div className="image" key={index}>
                                        <img src={item.url_s} alt="img" style={{ width: "100%", borderRadius: "5px" }} />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>


                </div>
            </div>
        </React.Fragment>
    )
}
