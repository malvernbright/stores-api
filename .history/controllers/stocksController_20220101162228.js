module.exports.stocks_get = (req, res) => {

    if (!req.cookies.jwt === '') {
        res.send('Tha\'s an authenticated request');
        res.send({ 'Got cookie': req.cookies.jwt });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}