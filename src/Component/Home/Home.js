import React, { useEffect, useState } from 'react';
import BgImage from '../Image/home-bg.jpeg';
import './Home.css'
import transportInfo from '../Data/FakeData.json'
import Transport from '../Transport/Transport';

const Home = () => {
    const [transports, setTransports] = useState([])
    useEffect(() => {
        setTransports(transportInfo);
    })
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${BgImage})` }} className="BgImage">
            <div className="row transport">
                {
                    transports.map(transport => <Transport transport={transport} key={transport.key}></Transport>)
                }

            </div>
        </div>
    );
};

export default Home;







