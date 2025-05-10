import { Router } from 'express';
import { makeMpesaPayment } from '../controllers/mpesa.controller.js';

const router = Router();

router.post('/pay', makeMpesaPayment);
router.post('/callback', (req, res) => {
    try {
        console.log(
            'Mpesa callback',
            JSON.stringify(req.body, null, 2).toString(),
        );
        res.sendStatus(200);
    } catch (error) {
        console.log("Error in mpesa callback", error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

export default router;
