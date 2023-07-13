const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const client = new PrismaClient();

// 옥션 생성
router.post('/', async (req, res) => {
  try {
    const { name, url, start_block } = req.body;

    const newauction = await client.auction.create({
      data: {
        name,
        url,
        start_block,
        isEnd: false,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// 옥션 조회 ( 종료 여부 )
router.get('/', async (req, res) => {
  try {
    const { isEnd } = req.body;
    const auctions = await client.auction.findMany(
      {
        where:{
          isEnd ,
        }
      }
    );
    return res.json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 특정 옥션 조회
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const auction = await client.auction.findUnique({
      where: { id },
    });
    return res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 옥션 완료
router.put('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;
    const { end_block, winner } = req.body;

    const auction = await client.auction.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!auction) {
      return res.status(400).json({ ok: false, error: 'Not exist auction' });
    }

    await client.auction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        end_block,
        isEnd: true,
        winner,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
