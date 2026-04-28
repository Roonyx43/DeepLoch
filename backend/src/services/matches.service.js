import axios from "axios"
import "dotenv/config"

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export async function buscarIdsPartidasPorPUUID(puuid) {
    const response = await axios.get(
        `${API_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        {
            headers: {
                "X-Riot-Token": API_KEY
            }
        }
    )

    return response.data
}

export async function buscarInfoPartida(matchId) {
    const response = await axios.get(
        `${API_URL}/lol/match/v5/matches/${matchId}`,
        {
            headers: {
                "X-Riot-Token": API_KEY
            }
        }
    )

    return response.data
}