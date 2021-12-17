const Posts = require("../models/postsModel.js");
const User = require("../models/userModel.js");
const router = require("../routes/userRoutes.js");

exports.postNewPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;
    const userName = req.body.userName;

    let newPost = new Posts({
      userId: userId,
      content: content,
      imageUrl: imageUrl,
      userName: userName,
    });

    const savedPosts = await newPost.save();
    if (savedPosts) {
      return res
        .status(200)
        .set("access-control-allow-origin", "http://localhost:3000")
        .json({
          data: savedPosts,
        });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.postLike = async (req, res) => {
  try {
    const updatedData = await Posts.findByIdAndUpdate(
      req.body.likedPostId,
      {
        $push: { likes: req.body.likedBy },
      },
      {
        new: true,
      }
    );
    const savedPosts = await updatedData.save();
    if (savedPosts) {
      return res
        .status(200)
        .set("access-control-allow-origin", "http://localhost:3000")
        .json({
          data: savedPosts,
        });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const updatedData = await Posts.findByIdAndUpdate(
      req.body.likedPostId,
      {
        $pull: { likes: req.body.likedBy },
      },
      {
        new: true,
      }
    );
    const savedPosts = await updatedData.save();

    if (savedPosts) {
      return res
        .status(200)
        .set("access-control-allow-origin", "http://localhost:3000")
        .json({
          data: savedPosts,
        });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.postComment = async (req, res) => {
  const comment = {
    text: req.body.comment,
    postedBy: req.body.userCommentId,
  };

  try {
    const updatedData = await Posts.findByIdAndUpdate(
      req.body._id,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    );
    updatedData.comment = [...updatedData.comment, comment];

    const savedPosts = await updatedData.save();
    if (savedPosts) {
      return res
        .status(200)
        .set("access-control-allow-origin", "http://localhost:3000")
        .json({
          data: savedPosts,
        });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
