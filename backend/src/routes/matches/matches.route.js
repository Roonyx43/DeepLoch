import express from 'express'
import { pegarPartidasPorPUUID, pegarInfosDePartidas } from '../../controllers/matches.controller.js'

const router = express.Router()

router.get("/partida/:matchId", pegarInfosDePartidas)
router.get("/player/:gameName/:tagLine", pegarPartidasPorPUUID)

export default router