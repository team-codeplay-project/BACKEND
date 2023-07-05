const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// 래플 생성
router.post("/", async (req, res) => {
    try {
      const test = req.body;

      console.log(typeof(test[1]));
    /*5
    id              Int       @default(autoincrement()) @id
    createdAt       DateTime  @default(now())
    updatedAt       DateTime  @updatedAt
    URL             String
    start_block     Int    
    end_block       Int?
    winner          Int?
  */
  
      // const newRaffle = await client.raffle.create({
      //      data: {
      //        start_block : test[0],
      //        URL : test[1],
      //      },
      //    });
  
       console.log('!!!');
       res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  });

// 래플 전체 조회
router.get("/", async (req, res) => {
    try {
      const raffles = await client.raffle.findMany();
      return res.json(raffles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
});

// 특정 래플 조회
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id ,10);

    const raffle = await client.raffle.findUnique({
     where: { id, },
     });
     return res.json(raffle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;