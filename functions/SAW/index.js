import normalization from "./normalization.js"

export default async function saw(globalScore){
    return {
        result: await normalization(globalScore)
    }
}