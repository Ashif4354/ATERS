

const submitToServer = async (data, setPlaceData) => {
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
            setPlaceData(res)
        })
        .catch(err => console.log(err))
}

export default submitToServer