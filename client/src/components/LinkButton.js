import React from "react";
import { PlaidLink } from "react-plaid-link";
 import axios from "axios";

const LinkButton = props => {

  return (
    <>
      <PlaidLink
        className="CustomButton"
        style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Open Link and connect your bank!
      </PlaidLink>
    </>
  );
}

export default LinkButton;