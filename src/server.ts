import express, {Application} from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import methodOverride from 'method-override';

import {getConnection} from './database';
import {authenticate,authRole} from './middlewares/authenticate';

import {helpersFunctions} from './helpers';
import  './config/passport';

// Routes Imports
import authRoutes from './routes/authRoutes'
import cargosRoutes from './routes/cargosRoutes'
import tiposNominasRoutes from './routes/tiposNominasRoutes'
import departamentosRoutes from './routes/departamentosRoutes'
import sexoRoutes from './routes/sexoRoutes'
import grupoSanguineoRoutes from './routes/grupoSanguineoRoutes'
import estadoCivilRoutes from './routes/estadoCivilRoutes'

// Controllers
import {indexController} from './controllers/index.controller';

// Initialization

const app:Application = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'),'layouts'),
	partialsDir:path.join(app.get('views'),'partials'),
	extname:'.hbs',
	helpers: helpersFunctions
}));

app.set('view engine', '.hbs');


// Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());
app.use(methodOverride('_method'));

app.use(session({
	secret:`${process.env.SECRET_EXPRESS_SESSION}`,
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


// globals variables

app.use((req:express.Request, res:express.Response, next:Function):Function => {
	
	res.locals.msgSuccess = req.flash('msgSuccess');
	res.locals.msgDanger = req.flash('msgDanger');
	res.locals.msgWarning = req.flash('msgWarning');
	res.locals.user = req.user || null;
	return next();
});

// Routes

app.get('/', indexController);
app.use(authRoutes);
app.use(cargosRoutes);
app.use(tiposNominasRoutes);
app.use(departamentosRoutes);
app.use(sexoRoutes);
app.use(grupoSanguineoRoutes);
app.use(estadoCivilRoutes);

app.get('/usuarios', authenticate, authRole(['superusuario','administrador']), (req:any, res:express.Response ) => {
	res.render('usuarios');
});




// Static files

app.use('/public',express.static(path.join(__dirname,'public')));

export default app;