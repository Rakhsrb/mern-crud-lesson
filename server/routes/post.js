const exress = require("express");
const {
  GetAllPosts,
  GetOnePost,
  CreateNewPost,
  UpdatePost,
  DeletePost,
} = require("../controllers/post");

const router = exress.Router();

router.get("/", GetAllPosts);
router.get("/:id", GetOnePost);
router.post("/", CreateNewPost);
router.put("/:id", UpdatePost);
router.delete("/:id", DeletePost);

module.exports = router;
