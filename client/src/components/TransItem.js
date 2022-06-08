import React from 'react';
// import { supabase } from './SupabaseConnection';

function TransItem (props) {
    return(
        <tbody>
           <tr>
               <td>{props.date}</td>
               <td>{props.category[0]}</td>
               <td>{props.name}</td>
               <td>{props.amount}</td>
            </tr> 
        </tbody>
    )
}

export default TransItem