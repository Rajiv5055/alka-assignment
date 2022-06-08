import React from 'react';
import axios from 'axios';
import { Route, withRouter, Switch } from 'react-router-dom';
//import TransactionList from './TransactionList';
//import ShowData from './ShowData';
import InsertData from './InsertData';


class Transactions extends React.Component {
    state = {transactions: []}
    
    componentDidMount(){
        this.getTransactions()
    }  

    getTransactions = async () => {
        const accessToken = this.props.accessToken
        const res = await axios.post('http://localhost:5000/transactions', {accessToken: accessToken})
        let transactions = res.data.transactions
        this.setState({ transactions: transactions })

    }

    render(){
        return (
            <Switch> 
                <Route exact path="/home" render={() => <InsertData transactions={this.state.transactions}/>} />
            </Switch>
        )
    }
}

export default withRouter(Transactions)