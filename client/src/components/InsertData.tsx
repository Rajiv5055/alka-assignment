import { supabase } from './SupabaseConnection';
import ShowData from './ShowData';

// To insert data into Supabase(database)
type location = {
  address: string | null;
  city: string | null;
  country: string | null;
  lat: unknown;
  lon: unknown;
  postal_code: unknown;
  region: string | null;
  store_number: unknown;
}
type payment = {
  by_order_of: string | null;
  payee: string | null;
  payer: string | null;
  payment_method: string | null;
  payment_processor: string | null;
  ppd_id: string | null;
  reason: string | null;
  reference_number: string | null;
}

type transaction ={
  account_id: string;
account_owner: string;
amount: number;
authorized_date: unknown;
authorized_datetime: unknown;
category: string[];
category_id: string;
check_number: unknown;
date: unknown;
datetime: unknown;
iso_currency_code: string;
location: location;
merchant_name: string;
name: string;
payment_channel: string;
payment_meta: payment;
pending: boolean;
pending_transaction_id: string | null;
personal_finance_category: string | null;
transaction_code: unknown;
transaction_id: string;
transaction_type: string;
unofficial_currency_code: unknown;
}

type AppProps = {
   transactions: transaction[]
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function InsertData (props: AppProps) {

	async function insertPosts() {
		const len = props.transactions.length;
		console.log(len);
		for(let i=0; i<len; i++){
			const { data } = await supabase.from('expenses').select('transaction_id').match({ transaction_id: props.transactions[i].transaction_id });

			if(data === null){
				await supabase.from('expenses').insert([{
					transaction_id: props.transactions[i].transaction_id,
					account_id: props.transactions[i].account_id,
					amount: props.transactions[i].amount,
					category: props.transactions[i].category[0],
					date: props.transactions[i].date,
					name: props.transactions[i].name,
					description: props.transactions[i].payment_channel,
				}]);
			}
		}

	}
   
	return (
		<div>
			<button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={insertPosts}> save to database </button>
			<ShowData />
		</div>
	);
}

export default InsertData;