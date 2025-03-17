import normalization from "./normalization.js"

export default async function saw(globalScore){
    const result = await normalization(globalScore)
    return {
        result: result,
        length: result.length
    }
}