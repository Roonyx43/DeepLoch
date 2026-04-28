import axios from 'axios'
import 'dotenv/config'

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function buscarPUUID(gameName, tagLine) {
    try {
        const response = await axios.get(
            `${API_URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
            {
                headers: {
                    "X-Riot-Token": API_KEY
                }
            }
        );

        return response.data.puuid

    } catch (error) {
        throw error
    }
}

export async function buscarNomePorPUUID(puuid){
    try {
        const response = await axios.get(`${API_URL}/riot/account/v1/accounts/by-puuid/${puuid}`, {
            headers: {
                "X-Riot-Token": API_KEY
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}