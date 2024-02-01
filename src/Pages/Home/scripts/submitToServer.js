

const submitToServer = async (data, setPlaceData, setSubmit, setErrorMessage, recaptchaRef) => {
    const url = process.env.REACT_APP_server_url + '/setsail'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            if (res.success) {
                setPlaceData(res)
            } else {
                setSubmit(false)
                recaptchaRef.current.reset()
                setErrorMessage(res.message)
            }
            
        })
        .catch(err => console.log(err))
}

export default submitToServer