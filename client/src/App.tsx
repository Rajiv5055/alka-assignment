import {useState} from 'react';
import './App.css';
import LinktoPlaid from './components/LinktoPlaid';
import { withRouter } from 'react-router-dom';
import LinkToTeller from './components/LinkToTeller';

function App() {  
	const [where, setWhere] = useState<string>('');
	function startPlaid(): void{
		setWhere('Plaid');
	}
	function startTeller(){
		setWhere('Teller');
	}
    
	return (
		<div className="App">
			{ where === '' ?
				<div>
					<button onClick = {startPlaid} style={{padding: '20px', fontSize: '16px', cursor: 'pointer',borderRadius:'10px' }}> Open Plaid </button>
					<button onClick = {startTeller} style={{padding: '20px', fontSize: '16px', cursor: 'pointer',borderRadius:'10px' }}> Open Teller </button>
				</div>
				:
				where === 'Plaid' 
					?  <LinktoPlaid /> : 
					where==='Teller'
						?  <LinkToTeller/> :
						<div></div>
			}     
		</div>
	);
}

export default withRouter(App);
