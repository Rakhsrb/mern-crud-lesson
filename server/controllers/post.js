const PostSchema = require("../models/post");

const GetOnePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const choosenPost = await PostSchema.findById(postId);
    if (!choosenPost) {
      return res.json({ message: "Post not found!" });
    }
    return res.json({ data: choosenPost });
  } catch (error) {
    return res.json({ message: "Something went wrong!" });
  }
};

const GetAllPosts = async (_, res) => {
  try {
    const posts = (await PostSchema.find()).reverse();
    if (!posts) {
      return res.json({ message: "No data!" });
    }
    return res.json({ data: posts, total: posts.length });
  } catch (error) {
    console.log(error);
  }
};

const CreateNewPost = async (req, res) => {
  const { title, decription } = req.body;
  try {
    if (req.body) {
      if (title && decription) {
        const newPost = new PostSchema(req.body);
        newPost.save();
        return res.json({ message: "Yangi post yaratildi!" });
      } else {
        return res.json({ message: "Malumotlarni to'ldiring!" });
      }
    } else {
      return res.json({ message: "Notog'ri sorov!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const UpdatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const choosenPost = await PostSchema.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (!choosenPost) {
      return res.json({ message: "Post not found!" });
    }
    return res.json({ data: choosenPost });
  } catch (error) {
    return res.json({ message: "Something went wrong!" });
  }
};

const DeletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await PostSchema.findByIdAndDelete(postId);
    return res.json({ message: "Post muvaffaqiyatli o'chirildi" });
  } catch (error) {
    return res.json({ message: "Error" });
  }
};

module.exports = {
  GetAllPosts,
  GetOnePost,
  UpdatePost,
  CreateNewPost,
  DeletePost,
};
