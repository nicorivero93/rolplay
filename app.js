var loginRouter = require('./routes/admin/login');

app.use('/admin/login', loginRouter);

secured = async (req, res, next) => {
    try {
        console.log(req.session.id_usuario);
        if (req.session.id_usuario) {
            next();
        } else {
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.log(error);
    }
}