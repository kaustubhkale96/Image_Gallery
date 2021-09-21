import React from 'react'
import "./modal.css";
import { saveAs } from 'file-saver';


export default function Download(props) {
    let modalStyles = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
    const downloadImage = (url, id) => {
        let imgExtension = url.split(".");
        imgExtension = imgExtension[imgExtension.length - 1];
        saveAs(url, `${id}.${imgExtension}`);
        console.log(imgExtension)
    }
    return (
        <div className="modal show " style={modalStyles}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <i class="bi bi-x-circle-fill" onClick={props.close}></i>
                    </div>
                    <div className="modal-body">
                        <img className="img-fluid modal-image" src={props.img} alt="flickr img" />
                    </div>
                    <div className="modal-footer">
                        <p>Download this Image </p>
                        <i class="bi bi-download" onClick={() => downloadImage(props.img, props.id)} ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
