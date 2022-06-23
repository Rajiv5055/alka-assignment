import {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import InsertData from './InsertData';

// To get transaction list from Plaid
type AppProps = {
    accessToken : string | null;
}

function Transactions (props : AppProps) {
	const [transactions,setTransactions] = useState([]);
    

	async function getTransactions () {
		const accessToken = props.accessToken;

		const res = await axios.post('http://localhost:5000/transactions', {accessToken: accessToken});
		const transactions = res.data.transactions;

		setTransactions(transactions);
	}
	useEffect(() => {
		getTransactions();
	});

	return (
		<Switch> 
			<Route exact path="/home" render={() => <InsertData transactions={transactions}/>} />
		</Switch>
	);
}

export default Transactions;