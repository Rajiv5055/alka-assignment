/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type AppProps = {
    key: number;
    account_id: string;
    amount: string;
    category: string;
    date: any; 
    name: string;
}
function TransItem (props: AppProps) {
	return (
		<tbody>
			<tr>
				<td>{props.date}</td>
				<td>{props.category}</td>
				<td>{props.name}</td>
				<td>{props.amount}</td>
			</tr>
		</tbody>
	);
}

export default TransItem;