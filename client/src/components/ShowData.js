import React from 'react';
import { supabase } from './SupabaseConnection';
import { useState } from 'react';
import TransItem from './TransItem'
import { Table } from 'reactstrap'

function ShowData () {
   const [posts, setPosts] = useState([])
    
   async function fetchPosts() {
    const { data } = await supabase.from('expenses').select()
    setPosts(data)
   }

    return(
      <div>
      <button onClick={fetchPosts}> show data </button>
      <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                { posts.map(post => <TransItem key={post.transaction_id} account_id={post.account_id} amount={post.amount} category={post.category} date={post.date} name={post.name}/>)}
            </Table>
      </div>
    )
}

export default ShowData