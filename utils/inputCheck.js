const checkInputs = (user_name, password) => {
    if (user_name == '') {
        alert('Username');
    } if (password == '') {
        alert('Password');
    }
}

module.exports = checkInputs;