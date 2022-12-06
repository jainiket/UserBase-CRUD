const userModel = require('../model/UserModel')
const STATUS_SUCCESSFULL = 200;
const STATUS_UNSUCCESSFULL = 500;

let UserService = {};

UserService.getUser = async (userId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let userDetails = await userModel.findOne({ userId: userId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (userDetails) {
        result.status = STATUS_SUCCESSFULL;
        result.data = userDetails;
    }
    return result;
};

UserService.createUser = async (userData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let count = await userModel.countDocuments();
    userData.userId = `User${`${++count}`.padStart(5,'0')}`;
    let insertionStatus = await userModel.insertMany(userData);
    if (insertionStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = insertionStatus;
    }
    return result;
};

UserService.updateUser = async (userId, userData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let updationStatus = await userModel.updateOne({userId:userId},userData);
    if (updationStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = updationStatus;
    }
    return result;
};

UserService.removeUser = async (userId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let userDetails = await userModel.deleteOne({ userId: userId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (userDetails) {
        result.status = STATUS_SUCCESSFULL;
        result.data = userDetails;
    }
    return result;
};

UserService.getAllUser = async () => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let userDetails = await userModel.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (userDetails) {
        result.status = STATUS_SUCCESSFULL;
        result.data = userDetails;
    }
    return result;
};

module.exports = UserService;