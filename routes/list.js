const router = require("express").Router();
const user = require("../modals/user.js");
const List = require("../modals/list.js");
const User = require("../modals/user.js");

//ADDTASK
router.post("/addtask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//UPDATE TASK
// router.put("/updatetask/:id", async (req, res) => {
//   try {
//     const { title, body} = req.body;
//     const { upid } = req.params.id;

//     const existingUser = await User.findOne({ upid });
//     if (existingUser) {
//       const list = await List.findByIdAndUpdate(req.params.id, { title, body });
//       list
//         .save()
//         .then(() => res.status(200).json({ message: "updated sucessfully" }));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//UPDATE TASK
router.put("/updatetask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list
      .save()
      .then(() => res.status(200).json({ message: "updated sucessfully" }));
  } catch (error) {
    console.log(error);
  }
});

// //DELETE TASK
// router.delete("/deletetask/:id", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       await List.findByIdAndDelete(req.params.id).then(() =>
//         res.status(200).json({ message: "task deleted" })
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//deletefromUserArray
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "task deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/gettask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No Task !!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
