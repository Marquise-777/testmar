const User = require('../model/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}
module.exports.postRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const regUser = await User.register(user, password);
        req.login(regUser, err => {
            if (err) return next(err);
            req.flash('success', 'Riahbuk ah kalo lawm a che');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.postLogin = (req, res) => {
    req.flash('success', `Welcome back ${req.body.username}`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye');
    res.redirect('/campgrounds');
}