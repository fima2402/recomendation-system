export default function discordance(data) {
    let discordance = [];
    let discordanceResult = 0;

    data.forEach((v, i) => {
        data.forEach((v2, i2) => {
            if (i !== i2) {
                discordanceResult = v.value - v2.value;
                if (discordanceResult >= 0) {
                    discordance.push({
                        alternative: v.name,
                        alternative2: v2.name,
                        discordanceIndex: discordanceResult
                    })
                }
            }
        });
    });

    return {
        result: discordance,
        length: discordance.length
    }
}