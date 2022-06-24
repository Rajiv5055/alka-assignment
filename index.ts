import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
dotenv.config();
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = 5000;

app.post('/create_link_token', async (req:any, res:any) => {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: '123-test-user-id',
      },
      client_name: 'Plaid Test App',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://sample-web-hook.com',
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings'],
        },
      },
    })
    return res.send({link_token: response.data.link_token}) 
});

// eslint-disable-next-line no-unused-vars
/*app.post('/get_link_token', async(req:any, res:any) => {
  // eslint-disable-next-line no-unused-vars
  const response = await client.getLinkToken(linkToken).catch((_err) => {
    if(!linkToken){
        return "no link token"
    }
  });
})*/

app.post('/get_access_token', async(req:any, res:any) => {

  const {publicToken} = req.body
  const response = await client
    .itemPublicTokenExchange({
      public_token: publicToken
    });
  return res.send({access_token: response.data.access_token}) 
})

app.post('/transactions', async(req, res) =>{
  const {accessToken} = req.body
  const response = await client
    .transactionsGet({
      access_token: accessToken,
      start_date: '2020-01-01',
      end_date: '2021-01-31',
    });
  const transactions = response.data.transactions;
  return res.send({transactions: transactions}) 
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));

/*app.get('/accounts', async(req,res)=>{
  const accessToken = req.query.accessToken;
  try {
    const response = await axios("https://api.teller.io/accounts", {
      auth : {
        username : accessToken,
        password : ""
      }
    });
     res.status(200).json(response.data);
  }
  catch(err){
    res.status(500).json({meassage:err});
  }   
});


app.get('/getTransactions', async(req,res)=>{
 const id = req.query.accountid;
 const url = `https://api.teller.io/accounts/${id}/transactions`
 console.log(url);
  try{
    const response = await axios.get(url);
    res.status(200).json(response.data);
    console.log(res); 
   }
   catch(err){
    res.status(500).json({message:err});
    console.log(err);
   }
});*/