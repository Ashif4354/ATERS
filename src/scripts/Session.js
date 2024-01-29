const createSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const getSession = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const Logout = () => {
    localStorage.removeItem('user')
}

export { createSession, getSession, Logout }