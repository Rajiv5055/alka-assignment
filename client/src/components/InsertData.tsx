import { supabase } from './SupabaseConnection';
import ShowData from './ShowData';

// To insert data into Supabase(database)
type location = {
  address: any;
  city: any;
  country: any;
  lat: any;
  lon: any;
  postal_code: any;
  region: any;
  store_number: any;
}
type payment = {
  by_order_of: any;
  payee: any;
  payer: any;
  payment_method: any;
  payment_processor: any;
  ppd_id: any;
  reason: any;
  reference_number: any;
}

type transaction ={
  account_id: string;
account_owner: any;
amount: number;
authorized_date: any;
authorized_datetime: any;
category: string[];
category_id: string;
check_number: any;
date: any;
datetime: any;
iso_currency_code: string;
location: location;
merchant_name: string;
name: string;
payment_channel: string;
payment_meta: payment;
pending: boolean;
pending_transaction_id: any;
personal_finance_category: any;
transaction_code: any;
transaction_id: string;
transaction_type: string;
unofficial_currency_code: any;
}

type AppProps = {
   transactions: transaction[]
}


function InsertData (props: AppProps) {

   async function insertPosts() {
     const len = props.transactions.length

     for(let i=0; i<len; i++){
       const { data } = await supabase.from('expenses').select('transaction_id').match({transaction_id: props.transactions[i].transaction_id})

       if(data === null){
       	await supabase.from('expenses').insert([{
       		transaction_id: props.transactions[i].transaction_id,
       		account_id: props.transactions[i].account_id,
       		amount: props.transactions[i].amount,
       		category: props.transactions[i].category[0],
       		date: props.transactions[i].date,
       		name: props.transactions[i].name,
       		description: props.transactions[i].payment_channel,
       	}])
       }
     }

  };
   
    return (
        <div>
            <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={insertPosts}> save to database </button>
            <ShowData />
        </div>
    )
}

export default InsertData;