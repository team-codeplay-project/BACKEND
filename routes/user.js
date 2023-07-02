const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// 유저 생성
router.post("/", async (req, res) => {
    try {
      const { test } = req.body;
      console.log(test);
      //const user = await client.user.findUnique()
  
    //   // 너무 정확한 에러 표시는 위험
    //   if (!todo) {
    //     return res.status(400).json({ ok: false, error: "Not exist todo." });
    //   }
    //   if (!userId) {
    //     return res.status(400).json({ ok: false, error: "Not exist userId" });
    //   }
  
    //   const user = await client.user.findUnique({
    //     where: {
    //       id: parseInt(userId),
    //     },
    //   });
  
    //   if (!user) {
    //     return res.status(400).json({ ok: false, error: "Not exist user." });
    //   }
  
    //   const newTodo = await client.todo.create({
    //     data: {
    //       todo,
    //       isDone: false,
    //       userId: user.id,
    //     },
    //   });
  
    //   res.json({ ok: true, todo: newTodo });
    } catch (error) {
      console.error(error);
    }
  });

// 유저 조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist user.",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;