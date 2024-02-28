const updateAndLoadVisitCount = (invisibleRecaptchaToken, setVisitCount) => {
    fetch(process.env.REACT_APP_server_url + '/visitcount',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invisibleRecaptchaToken: invisibleRecaptchaToken
            })
        })
        .then(response => response.json())
        .then(data => {
            setVisitCount(data.visitCount);
            // console.log('visitCount', data.visitCount)
        })
        .catch(error => {
            console.log(error);
        })
}

const getVisitCount = () => {
    const count = localStorage.getItem('visitCount');
    return count ? count : 1;
}

export { updateAndLoadVisitCount, getVisitCount }