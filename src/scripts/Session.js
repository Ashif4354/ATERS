import { getAuth, signOut } from "firebase/auth";

const createSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const getSession = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const Logout = () => {
    signOut(getAuth())
        .then(() => {
            localStorage.removeItem('user')
        })
        .catch((error) => {
            console.log(error)
        });
}

export { createSession, getSession, Logout }