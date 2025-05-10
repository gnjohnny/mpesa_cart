import moment from 'moment';
import axios
    from 'axios';
import { getMpesaAuthToken } from '../helpers/mpesaToken.helper.js';

export const makeMpesaPayment = async (req, res) => {
    const { MPESA_SHORT_CODE, MPESA_PASS_KEY, MPESA_ENV, MPESA_CALLBACK_URL } =
        process.env;

    const BASE_URL =
        MPESA_ENV === 'sandbox'
            ? 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
            : 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    try {
        const token = await getMpesaAuthToken();
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const password = Buffer.from(
            `${MPESA_SHORT_CODE}${MPESA_PASS_KEY}${timestamp}`,
        ).toString('base64');

        const response = await axios.post(
            BASE_URL,
            {
                BusinessShortCode: MPESA_SHORT_CODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerBuyGoodsOnline',
                Amount: 1,
                PartyA: req.body.phoneNumber,
                PartyB: MPESA_SHORT_CODE,
                PhoneNumber: req.body.phoneNumber,
                CallBackURL: MPESA_CALLBACK_URL,
                AccountReference: 'Test',
                TransactionDesc: 'Test',
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        res.status(200).json({
            success: true,
            message: 'Mpesa payment successful',
            data: response.data,
        });
    } catch (error) {
        console.log('Error in mpesa payment controller', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: error.response ? error.response.data : error.message,
        });
    }
};
