const index = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Welcome !!!'
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    index
}
