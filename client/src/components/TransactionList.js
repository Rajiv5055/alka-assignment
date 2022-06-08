import React from 'react';
import { Table } from 'reactstrap'
import InsertData from './InsertData'

class TransactionList extends React.Component {
    
    transList = () => {
        return this.props.transactions.map(trans => <InsertData trans = {trans} />)
    }
    
    render() {
        return(
            <>
            {this.props.transactions === null ? "" :
            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                {this.transList()}
            </Table>}
            </>
        )
    }   
}

export default TransactionList