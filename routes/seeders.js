import express from 'express';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { seeders } from '../database/index.js';

const router = express.Router();
const dataSeeders = seeders();

router.post('/schools', async(req, res) => {
    try {
        const db = getFirestore();

        for (const value of dataSeeders.schools) {
            await setDoc(doc(db, "schools", value.school_id), {
                id: value.school_id,
                name: value.name,
                type: value.type,
                accreditation: value.akreditasi,
                facility: value.fasilitas,
                link_profile: value.link_profile,
            })

            console.log(`data ${value.school_id} berhasil ditambahkan!`)
        }
        
        res.status(200).send({
            message: 'seeders schools succsess!'
        });
    } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).send('Error seeding data');
    }
})

router.post('/address', async(req, res) => {
    try {
        const db = getFirestore();

        for (const value of dataSeeders.address) {
            await setDoc(doc(db, "address", value.id), {
                id: value.id,
                name: value.name
            })

            console.log(`data ${value.id} berhasil ditambahkan!`)
        }
        
        res.status(200).send({
            message: 'seeders schools succsess!'
        });
    } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).send('Error seeding data');
    }
})

router.post('/distance', async(req, res) => {
    try {        
        const db = getFirestore();
        for (const value of dataSeeders.distance) {
            await setDoc(doc(db, "distance", value.distance_id), {
                school_id: value.school_id,
                priority_1: {
                    address_id: value.priority_1,
                    value: 3
                },
                priority_2: {
                    address_id: value.priority_2,
                    value: 2
                }
            })

            console.log(`data ${value.distance_id} berhasil ditambahkan!`)
        }

        res.status(200).send({
            message: 'seeders distance succsess!'
        });
    }catch(error) {
        console.error('Error seeding data:', error);
        res.status(500).send('Error seeding data');
    }
})

export default router;