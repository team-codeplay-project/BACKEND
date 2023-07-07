const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const client = new PrismaClient();

// 래플 생성
router.post('/', async (req, res) => {
  try {
    const { URL, start_block } = req.body;

    const newRaffle = await client.raffle.create({
      data: {
        URL,
        start_block,
        isEnd: false,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// 래플 전체 조회
router.get('/', async (req, res) => {
  try {
    const raffles = await client.raffle.findMany();
    return res.json(raffles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 특정 래플 조회
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const raffle = await client.raffle.findUnique({
      where: { id },
    });
    return res.json(raffle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 특정 래플 완료
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const raffle = await client.raffle.findUnique({
      where: { id },
    });
    return res.json(raffle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 래플 완료
router.put('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;
    const { end_block } = req.body;

    const existTodo = await client.raffle.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const updatedRaffle = await client.raffle.update({
      where: {
        id: parseInt(id),
      },
      data: {
        end_block,
        isEnd: true,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
