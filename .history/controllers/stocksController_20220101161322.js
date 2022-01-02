module.exports.stocks_get = (req, res) => {
    res.send({ 'Got cookie': res.cookies });
}

module.exports.login_get = (req, res) => {
    res.render('login');
}