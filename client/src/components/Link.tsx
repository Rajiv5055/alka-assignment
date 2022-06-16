import React from "react";
import { PlaidLink } from "react-plaid-link";


// To show Plaid link.
const Link = props => {
  
  const onSuccess = (token:string) =>{
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