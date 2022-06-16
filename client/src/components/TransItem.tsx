import React from 'react';

interface prop{
    key:string;
    account_id: string;
    amount: number;
    category: string;
    date: string;
    name: string;
}

function TransItem (props:prop) {
    return(
        <tbody>
           <tr>
               <td>{props.date}</td>
               <td>{props.category}</td>
               <td>{props.name}</td>
               <td>{props.amount}</td>
            </tr> 
        </tbody>
    )
}

export default TransItem