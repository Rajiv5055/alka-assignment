"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const plaid_1 = require("plaid");
const configuration = new plaid_1.Configuration({
    basePath: plaid_1.PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});
const client = new plaid_1.PlaidApi(configuration);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const PORT = 5000;
app.post('/create_link_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.linkTokenCreate({
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
    });
    return res.send({ link_token: response.data.link_token });
}));
// eslint-disable-next-line no-unused-vars
/*app.post('/get_link_token', async(req:any, res:any) => {
  // eslint-disable-next-line no-unused-vars
  const response = await client.getLinkToken(linkToken).catch((_err) => {
    if(!linkToken){
        return "no link token"
    }
  });
})*/
app.post('/get_access_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicToken } = req.body;
    const response = yield client
        .itemPublicTokenExchange({
        public_token: publicToken
    });
    return res.send({ access_token: response.data.access_token });
}));
app.post('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.body;
    const response = yield client
        .transactionsGet({
        access_token: accessToken,
        start_date: '2020-01-01',
        end_date: '2021-01-31',
    });
    const transactions = response.data.transactions;
    return res.send({ transactions: transactions });
}));
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
