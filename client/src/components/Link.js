import React from "react";
import { PlaidLink } from "react-plaid-link";


// To show Plaid link.
const Link = props => {
  const onExit = (error, metadata) => console.log('onExit', error, metadata);
  
  const onEvent = (eventName, metadata) => {
  }
  
  const onSuccess = (token, metadata) =>{
    props.getAccessToken(token)
  }

  return (
    <>
      <PlaidLink className="CustomButton" style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }} token={props.token ? props.token : ''}
        onExit={onExit} onSuccess={onSuccess} onEvent={onEvent} >
        Open Link and connect your bank!
      </PlaidLink>
    </>
  );
}

export default Link;