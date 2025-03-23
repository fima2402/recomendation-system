import { ahp } from '../../database/index.js';

const dataAhp = ahp()

export default function normalization(data){
    const ahpData = dataAhp.criteria;

    const highestGlobalScore = data.reduce((max, current) => {
        return (current.global_score > max.global_score) ? current : max;
    }).global_score;

    const normalization = data.map(item => {
        return {
            id: item.id,
            name: item.name,
            address: item.address,
            type: item.type,
            distance: item.distance,
            facility: item.facility,
            accreditation: item.accreditation,
            link_profile: item.link_profile,
            value: item.global_score / highestGlobalScore
        }
    })

    const Wmatrix = normalization.map(item => {
        return {
            ...item,
            value: item.value * ahpData.akreditas
        }
    })

    return Wmatrix;
}