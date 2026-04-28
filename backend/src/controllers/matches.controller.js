import { buscarNomePorPUUID, buscarPUUID } from "../services/players.service.js"
import {
    buscarIdsPartidasPorPUUID,
    buscarInfoPartida
} from "../services/matches.service.js"

export async function pegarPartidasPorPUUID(req, res) {
    try {
        const { gameName, tagLine } = req.params

        const puuid = await buscarPUUID(gameName, tagLine)

        const partidas = await buscarIdsPartidasPorPUUID(puuid)

        res.json(partidas)

    } catch (error) {
        res.status(500).json({
            erro: error.response?.data || error.message
        })
    }
}

export async function pegarInfosDePartidas(req, res) {
    try {
        const { matchId } = req.params;

        const infoPartida = await buscarInfoPartida(matchId);

        const puuids = infoPartida.metadata.participants;
        const infos = infoPartida.info.participants;

        const jogadores = await Promise.all(
            puuids.map(async (puuid) => {
                const nome = await buscarNomePorPUUID(puuid);
                return {
                    nome: nome.gameName,
                    tag: nome.tagLine,
                    puuid: puuid
                };
            })
        );

        const infosOrganizada = infos.reduce((acc, item) => {
            acc[item.puuid] = item;
            return acc;
        }, {});

        const resultado = jogadores.reduce((acc, jogador, index) => {
            const info = infosOrganizada[jogador.puuid];

            console.log(info);

            const chave = `player_${index + 1}`;

            acc[chave] = {
                ...jogador,
                champion: info.championName,
                championId: info.championId,
                kills: info.kills,
                deaths: info.deaths,
                assists: info.assists,
                kda: info.challenges.kda,
                goldEarned: info.goldEarned,
                goldSpent: info.goldSpent,
                magicDamage: info.magicDamageDealtToChampions,
                physicalDamage: info.physicalDamageDealtToChampions,
                trueDamage: info.trueDamageDealtToChampions,
                totalDamage: info.totalDamageDealtToChampions,
                mitigatedDamage: info.damageSelfMitigate,
                profileIcon: info.profileIcon,
                build: {
                    item_0: info.item0,
                    item_1: info.item1,
                    item_2: info.item2,
                    item_3: info.item3,
                    item_4: info.item4,
                    item_5: info.item5,
                    item_6: info.item6
                },
                playerSubteamId: info.playerSubteamId,
                placement: info.placement,
                subteamPlacement: info.subteamPlacement,
                win: info.win,
            };

            return acc;
        }, {});

        res.json({
            matchId: matchId,
            gameDuration: infoPartida.info.gameDuration,
            gameMode: infoPartida.info.gameMode,
            gameType: infoPartida.info.gameType,
            data: resultado

        });

    } catch (error) {
        res.status(500).json({
            erro: error.response?.data || error.message
        });
    }
}