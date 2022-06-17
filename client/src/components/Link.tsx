import React from "react";
import { PlaidLink } from "react-plaid-link";

type AppProps={
  token: any;
  accessToken: any;
  getAccessToken:(publicToken: any) => Promise<void>
}
// To show Plaid link.
const Link = (props:AppProps) => {
  
  const onSuccess = (token: any, metadata: any) =>{
    props.getAccessToken(token)
  }

  return (
    <>
      <PlaidLink className="CustomButton" style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }} token={props.token ? props.token : ''}
       onSuccess={onSuccess} >
        Open Link and connect your bank!
      </PlaidLink>
    </>
  );
}

export default Link;