const express = require("express");

const {
  registerUser,
  authUser,
  resetPassword,
  forgotPassword,
  findUser,
} = require("../controllers/userControllers");
const authToken = require("../middlewares/authToken");
const User = require("../models/userModel");
const Posts = require("../models/postsModel");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/resetpassword").post(forgotPassword);
router.route("/resetpassword/:userId/:token").post(resetPassword);
router.route("/explore").post(findUser);

// Fetch user data
router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(201).json({
      message: "Successfully fetch the user data",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Fetch all user data
router.get("/getUser", async (req, res) => {
  try {
    const user = await User.find();

    return res.status(201).json({
      message: "Successfully fetch the user data",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Update user Info
router.post("/editUser/:id", async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        avatarUrl: req.body.avatarUrl,
        bio: req.body.bio,
      }
    );

    return res.status(201).json({
      message: "User succesfully updated",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Send a friend request
router.put("/friendRequest", async (req, res) => {
  try {
    const getSender = await User.findById(req.body.senderID);

    const sentReqData = await User.updateOne(
      { _id: req.body.senderID },
      {
        $push: {
          "friends.sentRequest": { userID: req.body.receiverID },
        },
      }
    );
    const requestData = await User.updateOne(
      { _id: req.body.receiverID },
      {
        $push: {
          "friends.request": {
            userID: req.body.senderID,
            userName: getSender.userName,
            avatarUrl: getSender.avatarUrl,
          },
        },
      }
    );

    return res.status(201).json({
      message: "Friend request updated",
      data: {
        sender: sentReqData,
        receiver: requestData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Reject a friend request
router.put("/friendReject", async (req, res) => {
  try {
    const sentReqData = await User.updateOne(
      { _id: req.body.senderID },
      {
        $pull: {
          "friends.sentRequest": { userID: req.body.receiverID },
        },
      }
    );
    const requestData = await User.updateOne(
      { _id: req.body.receiverID },
      {
        $pull: {
          "friends.request": { userID: req.body.senderID },
        },
      }
    );

    return res.status(201).json({
      message: "Friend reject updated",
      data: {
        sender: sentReqData,
        receiver: requestData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
// Accept a friend request
router.put("/friendAccept", async (req, res) => {
  try {
    const sentReqData = await User.updateOne(
      { _id: req.body.senderID },
      {
        $pull: {
          "friends.sentRequest": { userID: req.body.receiverID },
        },
      }
    );
    const requestData = await User.updateOne(
      { _id: req.body.receiverID },
      {
        $pull: {
          "friends.request": { userID: req.body.senderID },
        },
      }
    );

    // Get info from the user
    const getSender = await User.findById(req.body.senderID);
    const getReceiver = await User.findById(req.body.receiverID);

    const senderData = await User.updateOne(
      { _id: req.body.senderID },
      {
        $push: {
          "friends.friendsList": {
            userID: req.body.receiverID,
            userName: getReceiver.userName,
            avatarUrl: getReceiver.avatarUrl,
          },
        },
      }
    );
    const receiverData = await User.updateOne(
      { _id: req.body.receiverID },
      {
        $push: {
          "friends.friendsList": {
            userID: req.body.senderID,
            userName: getSender.userName,
            avatarUrl: getSender.avatarUrl,
          },
        },
      }
    );

    return res.status(201).json({
      message: "Friend accept updated",
      data: {
        sender: sentReqData,
        receiver: requestData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Remove a friend
router.put("/friendRemove", async (req, res) => {
  try {
    const sentReqData = await User.updateOne(
      { _id: req.body.senderID },
      {
        $pull: {
          "friends.friendsList": { userID: req.body.receiverID },
        },
      }
    );
    const requestData = await User.updateOne(
      { _id: req.body.receiverID },
      {
        $pull: {
          "friends.friendsList": { userID: req.body.senderID },
        },
      }
    );

    return res.status(201).json({
      message: "Friend accept updated",
      data: {
        sender: sentReqData,
        receiver: requestData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Fetch comment user
router.post("/getCommentUser", async (req, res) => {
  try {
    const users = await User.find({ _id: { $in: req.body.users } });

    return res.status(201).json({
      message: "Successfully fetch the user data",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
