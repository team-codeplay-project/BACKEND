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

// 래플 전체 조회
router.get("/", async (req, res) => {
    try {
      const raffles = await client.raffle.findMany();
  
      res.json(raffles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  

module.exports = router;