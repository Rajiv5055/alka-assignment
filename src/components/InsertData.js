import { supabase } from './SupabaseConnection';
import ShowData from './ShowData';

// To insert data into Supabase(database)
function InsertData (props) {

   async function insertPosts() {
     const len = props.transactions.length

     for(let i=0; i<len; i++){
       const { data } = await supabase.from('expenses').select('transaction_id').match({transaction_id: props.transactions[i].transaction_id})

       if(data.length === 0){
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

   }
   
    return (
        <div>
            <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={insertPosts}> save to database </button>
            <ShowData />
        </div>
    )
}

export default InsertData