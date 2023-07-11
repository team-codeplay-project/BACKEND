const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// nft 생성
router.post('/', async (req, res) => {
    try {
      const { tokenId , owner } = req.body;
  
      const newauction = await client.nft.create({
        data: {
          tokenId ,
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
  
  // 특정 래플 조회
  router.get('/:id', async (req, res) => {
    try {
      const tokenId = parseInt(req.params.tokenId, 10);
  
      const nft = await client.nft.findUnique({
        where: { tokenId, },
      });
      return res.json(nft);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // nft 완료
  router.put('/done', async (req, res) => {
    try {
      const { tokenId } = req.body;
  
      const nft = await client.nft.findUnique({
        where: {
          tokenId: parseInt(tokenId),
        },
      });
  
      if (!nft) {
        return res.status(400).json({ ok: false, error: "Not exist nft" });
      }
  
      await client.nft.update({
        where: {
            tokenId: parseInt(tokenId),
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
  
  module.exports = router;
  