const createError = require('http-errors');
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback-exclusions');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/routes');

const app = express();
app.use(history({
    //add exclutions to Vue router for api get requests
    exclusions: [
        '/api/*'
    ]
}));

const frontendRoot = "../frontend"


// view engine setup
app.set('views', path.join(__dirname, `views`));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `${frontendRoot}/dist`)));

app.use('/', indexRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
