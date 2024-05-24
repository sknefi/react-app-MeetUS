const InfoAboutServer = () => {
    const portVal = 3001;
    const gatewayUrl = `http://localhost:${portVal}`;

    // /public sme nastavili v server.js na serveri ako staticky endpoint (moze posielat subory)
    const userPhotosPath = `${gatewayUrl}/public/UserPhotos`
    const eventPhotosPath = `${gatewayUrl}/public/EventPhotos`

    // Return an object containing the server information
    return {
        port: portVal,
        gateway: gatewayUrl,
        userPhotosPath: userPhotosPath,
        eventPhotosPath: eventPhotosPath,
    };
};

export default InfoAboutServer;
