if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
};

const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');

const rideShare = require("./models/rideShare");
const Review = require('./models/review');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const AppError = require("./utilities/appError");
const asyncCatcher = require("./utilities/asyncCatcher");
const {rideShareSchema, reviewSchema} = require("./joiSchema");
const session = require("express-session");

const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/users');
const rideShareRoutes = require("./routes/rideShares");

const flash = require("connect-flash");
const passport = require('passport');
const PassportLocal = require('passport-local');
const User = require('./models/user');

const MongoStore = require("connect-mongo");

//process.env.DB_STRING
//'mongodb://localhost:27017/rideShareCapstone'
//DB_STRING=mongodb+srv://Erika_20:Losangeles2020@capstonedev.ofcmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const url = process.env.DB_STRING || 'mongodb://localhost:27017/rideShareCapstone'

//Mongoose connecting to Mongo
mongoose
.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));

    
//setting up ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);


//parsing the form body
app.use(express.urlencoded({extended: true}));

// Making public folder available
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

const secret = process.env.SECRET || "drake";

const store = MongoStore.create({
	mongoUrl: url,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret,
	},
});

// This checks for any errors that may occur.

store.on('error', (e) => {
	console.log('Store Error', e);
});

const sessionConfig = {
	store,
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// --------Middle Ware ---------------
app.use((req, res, next) => {
    res.locals.user = req.user;
	res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

	next();
});

//-------------ROUTES------------

// setting up server
app.get('/', (req, res) => {
    res.render('home');
});

// RIDESHARE CARD ROUTES ----------------------------

app.use("/rideShares", rideShareRoutes);

 // -------------REVIEW Routes -------------------
 
 app.use('/rideShares/:id/reviews', reviewRoutes);

// -------------------AUTH ROUTES -----------
app.use("/", authRoutes)


 app.use("*", (req, res, next) => {
    next(new AppError("Page not found", 404));
});
    //Error MiddleWARE-----

    app.use((err, req, res, next) => {
        const { status = 500 } = err;
        const { message = 'I am in danger' } = err;
        res.status(status).render("error", {err});
    });
    
const port = process.env.PORT || 3000

app.listen(port, () => {
	 console.log(`Listening on port ${port}`);
});