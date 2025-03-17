import normalization from "./normalization.js"
import concordance from './concordance.js'
import discordance from "./discordance.js"

export default async function electre(globalScore){
    const globalNormalization = normalization(globalScore)
    const concordanceResult = concordance(globalNormalization.result)
    const discordanceResult = discordance(globalNormalization.result)

    const result = {
        "WNormalization": {
            result : globalNormalization.result,
            length: globalNormalization.length
        },
        "concordance": {
            result : concordanceResult.result.slice(0,5),
            length: concordanceResult.length
        },
        "discordance": {
            result : discordanceResult.result.slice(0,5),
            length: discordanceResult.length
        }
    }
    
    return result
}