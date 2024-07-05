const { INTERNAL_SERVER_ERROR } = require("http-status");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
exports.login = async (req, res) => {
  try {
    let body = req.body;
    if (!body.mobile) {
      return res
        .status(httpStatus)
        .json({ message: "Mobile number is required" });
    } else {
      let validUser = await User.findOne({ mobile: parseInt(body.mobile) });
      if (validUser) {
        return res
          .status(httpStatus.OK)
          .json({ message: "Please verify OTP", status: true });
      } else {
        return res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ message: "Not Registered", status: false });
      }
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Please try again", status: false });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let body = req.body;
    if (!body.mobile || !body.otp) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Required details missing", status: false });
    } else {
      let validUser = await User.findOne({ mobile: parseInt(body.mobile) });
      if (validUser) {
        if (body.otp === "1234") {
          let token = jwt.sign(validUser.toJSON(), "secret");
          return res
            .status(httpStatus.OK)
            .json({ message: "Logged in successfully", status: true, token });
        } else {
          return res
            .status(httpStatus.OK)
            .json({ message: "Invalid OTP", status: false });
        }
      } else {
        return res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ message: "Invalid User", status: false });
      }
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", err: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    let body = req.body;
    if (!body.mobile || !body.userName || !body.email) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Required fields are mandatory", status: false });
    } else {
      let user = await User.create(body);
      if (user) {
        return res
          .status(httpStatus.OK)
          .json({ message: "Successfully registered", status: true });
      } else {
        return res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ message: "Please try again", status: false });
      }
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message, status: false });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let mobile = req.params.mobile;
    let users = await User.find({});
    let filter = users.filter((a) => a.mobile !== parseInt(mobile));
    return res
      .status(httpStatus.OK)
      .json({ message: "Users List", users: filter });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    let body = req.body;
    let number = body.mobile;
    if (number) {
      User.findOne({ mobile: number }, (err, result) => {
        for (let key in body) {
          if (body[key]) {
            if (err) {
              return res
                .status(httpStatus.UNPROCESSABLE_ENTITY)
                .json({ message: "User not found", status: false });
            }
            result[key] = body[key];
            result.save((err, response) => {
              if (err) {
                return res
                  .status(httpStatus.UNPROCESSABLE_ENTITY)
                  .json({ message: "Something went wrong", status: false });
              } else {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                  message: "Something went wrong",
                  status: true,
                  data: response,
                });
              }
            });
          } else {
            return res
              .status(httpStatus.UNPROCESSABLE_ENTITY)
              .json({ message: "Something went wrong", status: false });
          }
        }
      });
    } else {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Mobile number is required", status: false });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, status: false });
  }
};
