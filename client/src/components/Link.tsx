/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlaidLink } from 'react-plaid-link';

type AppProps={
  token: string | null;
  accessToken: string | null;
  getAccessToken:(publicToken: string ) => Promise<void>
}
// To show Plaid link.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Link (props: AppProps) {
  
	const onSuccess = (token: string, metadata: unknown) => {
		props.getAccessToken(token);
	};

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