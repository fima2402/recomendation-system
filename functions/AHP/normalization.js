export default function normalization(data) {
    // Step 1: Extract the values for each criterion
    const akreditasiValues = data.map(item => item.accreditation.value);
    const fasilitasValues = data.map(item => item.facility.value);
    const jarakValues = data.map(item => item.distance.value);

    // Step 2: Sum the values in each column
    const sumAkreditasi = akreditasiValues.reduce((acc, value) => acc + value, 0);
    const sumFasilitas = fasilitasValues.reduce((acc, value) => acc + value, 0);
    const sumJarak = jarakValues.reduce((acc, value) => acc + value, 0);

    // Step 3: Normalize each school's value
    const normalizedValues = data.map(item => {
        return {
            id: item.id,
            name: item.name,
            address: item.address,
            distance: item.distance,
            facility: item.facility,
            accreditation: item.accreditation,
            akreditasiNormalized: item.accreditation.value / sumAkreditasi,
            fasilitasNormalized: item.facility.value / sumFasilitas,
            jarakNormalized: item.distance.value / sumJarak
        };
    });

    // Step 4: Calculate the average of the normalized values for each criterion
    const averageAkreditasi = normalizedValues.reduce((acc, item) => acc + item.akreditasiNormalized, 0) / data.length;
    const averageFasilitas = normalizedValues.reduce((acc, item) => acc + item.fasilitasNormalized, 0) / data.length;
    const averageJarak = normalizedValues.reduce((acc, item) => acc + item.jarakNormalized, 0) / data.length;

    return {
        normalizedValues: normalizedValues,
        averages: {
            akreditasi: averageAkreditasi,
            fasilitas: averageFasilitas,
            jarak: averageJarak
        }
    };
}