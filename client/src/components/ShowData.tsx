import React from 'react';
import { supabase } from './SupabaseConnection';
import { useState } from 'react';
import TransItem from './TransItem'
import { Table } from 'reactstrap'

interface user {
    account_id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    id: number;
    name: string;
    transaction_id: string;
}
// To fetch and show data from supabase(database)
function ShowData () {
   const [posts, setPosts] = useState<user[]>([]);
   const [showtable, setShowtable] = useState<boolean>(false);;

   function disableTable(){
     setShowtable(false)
   }
  
   async function fetchPosts() {
    const data:user[]  = await supabase.from('expenses').select()
    setPosts(data)
    setShowtable(true);
   }

    return(
      <div style={{margin:'20px'}}>
      { showtable === false ?
         <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={fetchPosts}> show data </button>
         : 
        <div>
         <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                {posts.map(post => <TransItem key={post.transaction_id} account_id={post.account_id} amount={post.amount} category={post.category} date={post.date} name={post.name}/>)}
         </Table>
         <button onClick={disableTable} style={{ paddingLeft: '20px',paddingRight: '20px', fontSize: '16px', cursor: 'pointer' }}> back </button>
        </div>

      }
    
      </div>

    )
}

export default ShowData