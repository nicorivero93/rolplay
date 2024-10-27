var usuariosModel = require('./../../models/usuariosModel');

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_ususario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/rol');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});