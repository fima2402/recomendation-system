import express from 'express';
import AHP from '../functions/AHP/index.js'
import electre from '../functions/Electre/index.js';
import saw from '../functions/SAW/index.js';
import { getFirestore, collection, getDoc, doc, getDocs, query, where, limit } from 'firebase/firestore';
import schoolData from '../database/school.json' assert { type: 'json' };

const router = express.Router();

// Definisikan rute di sini
router.get('/', (req, res) => {
    const ahpResult = AHP(schoolData.school);
    const electreResult = electre(ahpResult);
    const sawResult = saw(ahpResult);

    const rankingByAhp = ahpResult.sort((a, b) => b.global_score - a.global_score);
    const rankingBySaw = sawResult.result.sort((a, b) => b.value - a.value);

    const rankingAhp = rankingByAhp.map((item) => {
        return {
            id: item.id,
            name: item.name
        }
    })

    const rankingSaw = rankingBySaw.map((item) => {
        return {
            id: item.id,
            name: item.name
        }
    })
    
    const isRankingEqual = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every((item1) =>
            arr2.some((item2) => item1 === item2)
        );
    };

    res.json({
        ahp: ahpResult,
        electre: electreResult,
        saw: sawResult,
        ranking: isRankingEqual ? rankingAhp : rankingSaw
    });
});

router.get('/listSchool', async (req, res) => {
    try {
        const db = getFirestore();
        const colRef = collection(db, 'direction');
        const snapshot = await getDocs(colRef);

        const data = await Promise.all(snapshot.docs.map(async (doc) => {
            const docData = doc.data();
            
            // Ambil data dari referensi sekolah
            if (docData.school) {
                const schoolRef = docData.school; // Ini adalah referensi
                const schoolDoc = await schoolRef.get();
                console.log(schoolDoc.data());
                docData.school = schoolDoc.exists ? schoolDoc.data() : null; // Ambil data sekolah
            }
        
            return docData;
        }));

        res.send({
            data
        })
    } catch (error) {
        res.status(500
            ).json({ error: error.message });
    }
})

// Ekspor router sebagai default
export default router;
