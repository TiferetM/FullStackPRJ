function errorHandler(err, req, res, next) {
    console.log(err); // Log the error stack trace for debugging

    const status = res.status || err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
}
export default errorHandler;