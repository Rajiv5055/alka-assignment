import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InsertData from './InsertData';

// To get transaction list from Plaid
type AppProps = {
    accessToken : string | null;
}

function Transactions (props : AppProps) {
   const [transactions,setTransactions] = useState([]);
    

    async function getTransactions () {
        const accessToken = props.accessToken;

        const res = await axios.post('http://localhost:5000/transactions', {accessToken: accessToken})
        let transactions = res.data.transactions

        setTransactions(transactions)
    }
    useEffect(() => {
         getTransactions();
    });

        return (
         <InsertData transactions={transactions}/>
        )
    }

export default Transactions