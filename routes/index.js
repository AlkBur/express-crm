import ui from './ui.js'
import crypto from 'crypto'

const sha1 = crypto.createHash('sha1')

export default app => {
    app.get('/', async (req, res) => {
        res.render('pages/login');
    })


    app.post('/login', async (req, res) => {
        let bCheck = false;
        try {
            const { username, password } = req.body;
            const db = req.context.db;
            try {
                let userDB = await db.InfoBaseUsersManager.FindByName(username)
                if (!userDB) {
                    userDB = await db.InfoBaseUsersManager.GetUsers();
                    if (userDB.length == 0) {
                        bCheck = (username == password && username == 'admin')
                        console.log(bCheck)
                    } else {
                        let password1 = sha1.update(password)
                        let password2 = sha1.update(password.toUpperCase())

                        password1 = Buffer.from(password1, 'base64');
                        password2 = Buffer.from(password2, 'base64');

                        bCheck = (userDB.password === password1 + ',' + password2)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } catch (e) {
            res.status(400)
        }
        if (bCheck)
            res.redirect("/ui")
        else
            res.redirect("/")
    })

    app.use('/ui', ui);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error');
    });
}