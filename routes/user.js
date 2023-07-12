const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// 유저 생성
router.post('/', async (req, res) => {
  try {

    // phone_number       Int    @unique
    // address         String    @unique
    // name            String
    let { phone_number , address , name } = req.body;
    phone_number = Number( phone_number ) ;

    const user = client.user.findUnique( {
      where:{
        phone_number ,
      }
    })

    if (user) {
      return res.status(400).json({
        ok: false,
        error: "exist phone",
      });
    }

    await client.user.create({
      data: {
        phone_number ,
        address ,
        name ,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// 유저 조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params ;

    const user = await client.user.findUnique({
      where:{
        address : account ,
      }
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

// 유저 정보 변경
router.put('/:account', async (req, res) => {
  try {

    // phone_number       Int    @unique
    // address         String    @unique
    // name            String
    const { phone_number , name } = req.body;

    await client.user.update({
      where:{
        address : account ,
      },
      data: {
        phone_number ,
        name,
        },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;