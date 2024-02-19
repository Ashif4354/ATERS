const createProfileInDB = (recaptchaRef, name, email) => {

    fetch(process.env.REACT_APP_server_url + '/createprofileindb',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, invisibleRecaptchaToken: recaptchaRef.current.getValue() })
        })
        .then(response => response.json())
        .then(response => {
            console.log("Response", response)
        })
        .catch(error => {
            console.log("Error", error)
        })
}


export default createProfileInDB;