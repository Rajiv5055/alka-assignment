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
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const plaid = require('plaid');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.sandbox
});
const PORT = 5000;
app.post('/create_link_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.createLinkToken({
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
        return res.send({ link_token: response.link_token });
    }
    catch (err) {
        return res.send({ err: err.message });
    }
}));
app.post('/get_link_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.getLinkToken(linkToken).catch((err) => {
        if (!linkToken) {
            return "no link token";
        }
    });
}));
app.post('/get_access_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicToken } = req.body;
    const response = yield client
        .exchangePublicToken(publicToken)
        .catch((err) => {
        if (!publicToken) {
            return "no public token";
        }
    });
    const itemId = response.item_id;
    return res.send({ access_token: response.access_token });
}));
app.post('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.body;
    const response = yield client
        .getTransactions(accessToken, '2020-01-01', '2021-01-31', {
        count: 250,
        offset: 0,
    })
        .catch((err) => {
        if (!accessToken) {
            return "no access token";
        }
    });
    const transactions = response.transactions;
    return res.send({ transactions: transactions });
}));
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
