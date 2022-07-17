import logo from '../assets/images/magister logo.png'
import React, { useEffect, useState } from "react";
import {getComments, getPhotos } from "../services/RoutesApisServices";


const MagisterMotto = () => {

    const [comments, setComments] = useState(null)
    const [photos, setPhotos] = useState(null)

    useEffect(() => {
        getPhotos()
            .then(response => {

                setPhotos(response)
                
            })
       
    }, [])

    useEffect(() => {
        getComments()
            .then(response => { setComments(response.slice(0, 10)) })
    }, [])


    return (
        <div className="container-fluid" style={{ backgroundColor: 'white', color:'black' }}>
            <div className="row align-items-start">
                <div className="col mx-3 mt-3">
                    <img src={logo} alt="" />
                </div>
                <br/>
                {photos && comments ? (
                    photos.map(photo => {
                        return (
                        <div className='card-group mt-3'  key={photo.id}>
                            <div className="card" style={{borderColor:'transparent'}}>
                                    <img src={photo.download_url} style={{height:'600px'}} className="img-fluid rounded-start" alt=" " />
                                    <div className="card-body">
                                    <h5 className="card-title">{photo.author}</h5>
                                    {comments.map(comment => {
                                        return (
                                            <p className="card-text" key={comment.id}>{comment.body}</p>
                                        )
                                    })} 
                                </div>
                            </div>
                        </div>
                        )
                    })
                ) : (
                    <h1 className='mx-3'>Loading...</h1>
                )}
            </div>
        </div>
    )

}

export default MagisterMotto
