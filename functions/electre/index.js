import normalization from "./normalization.js"
import concordance from './concordance.js'
import discordance from "./discordance.js"

export default async function electre(globalScore){
    const globalNormalization = await normalization(globalScore)
    const concordanceResult = concordance(globalNormalization)
    const discordanceResult = discordance(globalNormalization)
    return {
        "WNormalization": globalNormalization,
        "concordance": concordanceResult,
        "discordance": discordanceResult
    }
}