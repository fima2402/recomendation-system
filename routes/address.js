import express from 'express';

import { getFirestore, collection, getDoc, doc, getDocs, query, where, limit } from 'firebase/firestore';

const router = express.Router();

router.get('/', async (req,res) => {
    const db = getFirestore();
    const address = [];

    let docs = await getDocs(collection(db, "address"))

    docs.forEach((doc) => {
        address.push(doc.data())
    })

    res.json({
        data: address
    })
})

export default router;