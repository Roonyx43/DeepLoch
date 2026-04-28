import express from 'express'
import matches from './matches/matches.route.js'

const router = express.Router()

router.use("/matches", matches)

export default router;