

const submitToServer = async (data, setResultID, setSubmit, setErrorMessage, recaptchaRef) => {
    const url = process.env.REACT_APP_server_url + '/setsail'
    // const url = 'http://localhost:5000/setsail'
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
                setResultID(res.id)
            } else {
                setSubmit(false)
                recaptchaRef.current.reset()
                setErrorMessage(res.message)
            }
            
        })
        .catch(err => console.log(err))
}

export default submitToServer