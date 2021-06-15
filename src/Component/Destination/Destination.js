import React from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router';
import fakeData from '../Data/FakeData.json';
import './Destination.css'

const Destination = () => {
    const { transportId } = useParams();
    const transportDetails = fakeData.find(data => data.transportId == transportId);
    return (
        <div className="d-flex">
            <Card style={{ width: '28rem' }}>
                <Card.Body>
                    <Form>
                        <Form.Label>Search Destination</Form.Label>
                        <Form.Control type="text" placeholder="Your location" />
                        <br />
                        <button className="search-btn" type="submit">
                            Search
                        </button>
                    </Form>
                </Card.Body>
                <Card.Body>
                    <div className="transport-details">
                        <img src={transportDetails.transportImage} alt="" />
                        <span className="transportName">{transportDetails.transportName}</span>
                        <span className="transportCapacity">{transportDetails.transportCapacity}</span>
                        <span className="transportRate">{transportDetails.transportRate}</span>
                    </div>

                    <div className="transport-details">
                        <img src={transportDetails.transportImage} alt="" />
                        <span className="transportName">{transportDetails.transportName}</span>
                        <span className="transportCapacity">{transportDetails.transportCapacity}</span>
                        <span className="transportRate">{transportDetails.transportRate}</span>

                    </div>

                    <div className="transport-details">
                        <img src={transportDetails.transportImage} alt="" />
                        <span className="transportName">{transportDetails.transportName}</span>
                        <span className="transportCapacity">{transportDetails.transportCapacity}</span>
                        <span className="transportRate">{transportDetails.transportRate}</span>

                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" />

            </Card>
        </div>
    );
};

export default Destination;