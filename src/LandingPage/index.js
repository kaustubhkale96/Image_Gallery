import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiKey } from '../keys';
import './index.css';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

export default function LandingPage() {
    const [image, setImage] = useState([]);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [tags, setTags] = useState("");
    const [text, setText] = useState("");

    const TAGS = ["Abstract", "Flower", "Nature", "Car"]

    console.log("images", image)
    console.log("pages=>", pages)
    console.log("pageNumber", pageNumber)
    console.log("text", text)
    console.log("tags", tags)


    useEffect(() => {
        getImage();
    }, []);

    const getImage = (from = "default", tagsText) => {
        let URL = "";
        if (from === "default") {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=23&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        } else if (tagsText === "tags") {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=23&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        } else {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=23&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        }


        axios.get(URL)
            .then((res) => {
                console.log('URL data=>', res)
                setImage(res.data.photos.photo);
                setPages(res.data.photos.pages);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleClick = (e) => {
        e.preventDefault();
        const { id } = e.target;
        setTags({ tags: id === "clear" ? "" : id, pageNumber: 2 })
        if (tags !== "") {
            getImage("filter", "tags");
            console.log("tags image", image)
        } else {
            getImage();
            console.log("tags image", image)
        }

    }
    const searchImage = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "search") {
            setText(value);
        }
    }
    const submit = (e) => {
        e.preventDefault();
        if (text !== "") {
            setPageNumber(1);
            getImage("search", "text");
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
                    <form onSubmit={submit}>
                        <div className="search">
                            <input className="searchInput" type="text" value={text} onChange={searchImage} placeholder="Search..." name="search" />
                            <span><SearchOutlined className="button" onClick={submit} /></span>
                        </div>
                    </form>
                    <div>
                        {TAGS.map((item) => (
                            <button id={item} onClick={handleClick}>{item}</button>
                        ))}
                        <button onClick={handleClick} id="clear">Clear</button>

                    </div>
                    {/* <div>
                        {Data === false && (
                            <div className="errorSearch">
                                <h3>Sorry! no results for: {text}</h3>
                            </div>
                        )}
                    </div> */}
                    <div>
                        <div className="gallery">
                            {/* {search.length !== 0 ? search.map((item, index) => (
                                <div className="image" key={index}>
                                    <img src={item.url_s} alt="img" style={{ width: "100%", borderRadius: "5px" }} />
                                </div>
                            )) : */}
                            <div>
                                {image.map((item, index) => (
                                    <div className="image" key={index}>
                                        <img src={item.url_s} alt="img" style={{ width: "100%", borderRadius: "5px" }} />
                                    </div>
                                ))}
                            </div>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
