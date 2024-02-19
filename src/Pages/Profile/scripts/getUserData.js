const getUserData = (email, recaptchaToken, setUserData) => {
    fetch(process.env.REACT_APP_server_url + '/userprofile',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, invisibleRecaptchaToken: recaptchaToken })
        })
        .then(res => res.json())
        .then(data => {
            setUserData(data)
        })
        .catch(err => {
            console.log(err);

        })
}

export default getUserData;