import express from 'express';

import { getFirestore, collection, getDoc, doc, getDocs, query, where, limit } from 'firebase/firestore';

const router = express.Router();

router.get('/', async (req,res) => {
    const db = getFirestore();
    const schools = [];

    let docs = await getDocs(collection(db, "schools"))

    docs.forEach((doc) => {
        schools.push(doc.data())
    })

    res.json({
        data: schools
    })
})

router.get('/:userId', async (req,res) => {
    const db = getFirestore();
    let school
    let distance
    
    try {
        const user_id = req.params.userId;

        let docSnap = await getDoc(doc(db, 'schools', user_id));

        if (docSnap.exists()) {
            school = docSnap.data()
        } else {
            throw 404
        }

        docSnap = await getDocs(query(collection(db, 'distance'), where('school_id', '==' , user_id)));
        docSnap.forEach((doc) => {
            distance = {
                priority_1 : doc.data().priority_1.address_id,
                priority_2 : doc.data().priority_2.address_id
            }
        });

        docSnap = await getDoc(doc(db, 'address', distance.priority_1));
        if (docSnap.exists()) {
            distance.priority_1 = docSnap.data()
        } else {
            throw 404
        }

        await Promise.all(distance.priority_2.map(async v => {
            const docSnap = await getDoc(doc(db, 'address', v));
            if (docSnap.exists()) {
                const index_to_replace = distance.priority_2.findIndex(v2 => v2 === v);
                distance.priority_2[index_to_replace] = docSnap.data();
            } else {
                throw new Error('Document not found'); // Menggunakan Error untuk penanganan yang lebih baik
            }
        }));

        res.send({
            school,
            distance
        });
    } catch(err) {
        res.send(err)
    }
})

export default router;