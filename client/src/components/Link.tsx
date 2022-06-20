import { PlaidLink } from "react-plaid-link";

type AppProps={
  token: string | null;
  accessToken: string | null;
  getAccessToken:(publicToken: string ) => Promise<void>
}
// To show Plaid link.
function Link(props:AppProps) {
  
  const onSuccess = (token: string, metadata: any) =>{
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