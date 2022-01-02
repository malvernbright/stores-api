module.exports.stocks_get = (req, res) => {

    if (!req.cookies.jwt === '') {
        res.send({ "That's an authenticated request" });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}