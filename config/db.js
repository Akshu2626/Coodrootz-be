const { connect } = require('mongoose');

exports.ConnectMongo = async () => {
    try {
        await connect(`${process.env.MONGO_URI}/project`);
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}