import React from 'react'
import { useHistory } from 'react-router-dom'
import './Transport.css'

const Transport = (props) => {

    const { transportImage, transportName, transportId } = props.transport;
    const history = useHistory()
    const choseDestination = transportId => {
        const url = `destination/${transportId}`
        history.push(url)
    }
    return (
        <div style={{ textAlign: 'center' }} className="col-md-3 container">
            <div className="card transport-div">
                <div className="card-body">
                    <img className="card-img-top" src={transportImage} alt="" />
                    <div className="card-title title">{transportName}
                    </div>
                    <button className="btn btn-secondary" onClick={() => choseDestination(transportId)}>Chose Destination</button>
                </div>
            </div>
        </div>
    );
};

export default Transport;