import React from 'react';


function TransItem (props) {
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