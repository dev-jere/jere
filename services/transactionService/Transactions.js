//Import Transaction Models
//import { result } from 'lodash'
const { date } = require('joi')
const transactions = require ('../../models/transaction')

exports.monthlyTranactions = [async (req, res) => {
    const info = await transactions.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: '1-1-2023',
                    $lte:'10-11-2023'
                }
            }
        },
       {
        $group: {
            _id: null,
            totalSale: { $sum: '$amount'}
        }
       }
    ])
    if(!info) {
        res.status(500).send(err)
        console.log(err)
    } else {
        res.status(200).send(info)
    }
}]