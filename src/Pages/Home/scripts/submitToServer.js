

const submitToServer = async (data, setPlaceData) => {
    const url = 'http://localhost:5000/setsail'
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