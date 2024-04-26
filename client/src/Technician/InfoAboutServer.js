import React from 'react';

const InfoAboutServer = () => {
    const portVal = 3001;
    const gatewayUrl = `http://localhost:${portVal}`;

    // Return an object containing the server information
    return {
        port: portVal,
        gateway: gatewayUrl
    };
};

export default InfoAboutServer;
