module.exports.stocks_get = (req, res) => {
    res.send({ 'Got cookie': req.cookies });
}

module.exports.login_get = (req, res) => {
    res.render('login');
}