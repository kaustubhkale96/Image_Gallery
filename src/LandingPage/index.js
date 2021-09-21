import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiKey } from '../keys';
import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import Download from './modal';

const TAGS = ["Abstract", "Flower", "Nature", "Car"]
export default function LandingPage() {
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [tags, setTags] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        if (text === "" && tags === "") {
            getImage();
        } else if (text !== "" && tags === "") {
            getImage("search", "text");
        } else if (text === "" && tags !== "") {
            getImage("search", "tags");
        }
    }, [pageNumber, tags]);

    const getImage = (from = "default", tagsText) => {
        let URL = "";
        if (from === "default") {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=25&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        } else if (tagsText === "tags") {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=25&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        } else {
            URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=25&page=${pageNumber}&format=json&nojsoncallback=1&extras=url_s`
        }
        axios.get(URL)
            .then((res) => {
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
        setPageNumber(1);
        setText("");
        if (tags !== id) {
            setTags(id === "clear" ? "" : id);
        }
    }

    const searchImage = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "search" && value !== text) {
            setText(value);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        if (text !== "") {
            getImage("search", "text");
            setPageNumber(1);
            setTags("");
        }

    }
    const pageChange = (from) => {
        if (pageNumber + from > 0 && pageNumber + from <= pages) {
            setPageNumber(pageNumber + from)
        }
    }
    const handleImageClick = (img, title, id) => {
        let img_data = [img, title, id]
        setImageData(item => [1, ...img_data])
        return setOpen(true);
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
                    <form onSubmit={submit} style={{ width: '75%', }}>
                        <div className="search">
                            <input className="searchInput" type="text" value={text} onChange={searchImage} placeholder="Search..." name="search" />
                            <span><SearchOutlined className="button" onClick={submit} /></span>
                        </div>
                    </form>
                    <div className="tags-container">
                        {TAGS.map((item) => (
                            <button className={tags === item ? "tags-buttons active-tags-buttons" : "tags-buttons"} id={item} onClick={handleClick}>{item}</button>
                        ))}
                        <button className="clear-button" onClick={handleClick} id="clear">Clear</button>
                    </div>
                    <hr style={{ borderBottom: '1px solid black', width: '95%', }} />
                    <div>
                        <div className="gallery">
                            {image.map((item, index) => (
                                <div>
                                    <div className="image" key={index} onClick={() => handleImageClick(item.url_s, item.title, item.id)}>
                                        <img className="img-thumbnail" src={item.url_s} alt="img" style={{ width: "inherit", height: 'inherit', }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <hr style={{ borderTop: '1px solid black', width: '95%', margin: 0 }} />
                    <div className="pagination-container">
                        <div className="page-btns">
                            <i className={pageNumber === 1 ? "bi bi-chevron-left disabled" : "bi bi-chevron-left"} onClick={() => pageChange(-1)}></i>
                            <span className="pageNumber" style={{ color: "white", fontSize: "1.5rem" }}>{pageNumber}</span>
                            <i className="bi bi-chevron-right" onClick={() => pageChange(1)}></i>

                        </div>
                    </div>
                    <hr style={{ borderTop: '1px solid black', width: '95%', margin: "0 0 10px 0" }} />
                </div>
                {open === true ? <Download img={imageData[1]} title={imageData[2]} id={imageData[3]} close={() => setOpen(false)} /> : ""}
            </div>
        </React.Fragment>
    )
}
