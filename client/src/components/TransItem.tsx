type AppProps = {
    key: any;
    account_id: any;
    amount: any;
    category: any;
    date: any; 
    name: any;
}
function TransItem (props: AppProps) {
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