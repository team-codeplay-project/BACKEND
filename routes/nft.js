const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// nft 생성
router.post('/', async (req, res) => {
    try {
      const { day , type , owner } = req.body;
  
      await client.nft.create({
        data: {
          day ,
          type ,
          owner , 
          isUsed : false ,
        },
      });
  
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  });

  
// nft 조회
router.get('/', async (req, res) => {
    try {
      const nfts = await client.nft.findMany();
      return res.json(nfts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // 특정 nft 조회
router.get('/:id', async (req, res) => {
    try {
      const tokenId = parseInt(req.params.tokenId, 10);
  
      const nft = await client.nft.findMany({
        where: {
          day: parseInt(day, 10),
          type: parseInt(type , 10),
        },
      });
      return res.json(nft);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
  
  // nft 사용 완료
router.put('/done', async (req, res) => {
    try {
      const { day , type } = req.body;
  
      const nft = await client.nft.findMany({
        where: {
          day: parseInt(day, 10),
          type: parseInt(type , 10),
        },
      });
  
      if (!nft) {
        return res.status(400).json({ ok: false, error: "Not exist nft" });
      }
  
      await client.nft.updateMany({
        where: {
          day: parseInt(day , 10),
          type: parseInt(type , 10),
        },
        data: {
            isUsed : true ,
        },
      }) ;
  
      res.json( { ok: true } ) ;
  
    } catch (error) {
      console.error(error);
    }
  });

  // 환불 = 삭제

  router.delete('/', async (req, res) => {
    try {
      const { day , type } = req.body;
      
      const nft = await client.nft.findMany({
        where: {
          day : parseInt(day, 10),
          type : parseInt(type , 10),
        },
      });
  
      if (!nft) {
        return res.status(400).json({ ok: false, error: "Not exist nft" });
      }
  
      await client.nft.deleteMany({
        where: {
          day: parseInt(day , 10),
          type: parseInt(type , 10),
        },
      }) ;
  
      res.json( { ok: true } ) ;
  
    } catch (error) {
      console.error(error);
    }
  });
  
  module.exports = router;
