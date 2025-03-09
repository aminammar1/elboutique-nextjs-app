const isAdmin = (user) => {
    if (user === 'ADMIN'){
        return true
    }
    else {
        return false
    }
}


export default isAdmin