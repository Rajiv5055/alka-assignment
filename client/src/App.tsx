import React from 'react';
import "./App.css";
import Link from "./components/Link";
import axios from "axios";
import TransactionsContainer from './components/TransactionsContainer'
import { Route, withRouter, Switch, RouteComponentProps } from 'react-router-dom';

interface publicToken {
  publicToken: string;
}
interface accessToken {
  access_token: string | null;
  token: string| null;
}

class App extends React.Component<accessToken & RouteComponentProps> {
  state: accessToken =  {
            token: null,
            access_token: null
  }

  //connects to plaid to create temporary link token
  createLinkToken = async () => {
    const res = await axios.post('http://localhost:5000/create_link_token');
    const data = res.data.link_token
    this.setState({ token: data })
  }

  //creates user link token upon page load
  componentDidMount(){
    this.createLinkToken()
  }  

 //if link token is successfully created, user can click on button to exchange public token for an access token
  getAccessToken = async ({publicToken} : publicToken) => {

    const res = await axios.post('http://localhost:5000/get_access_token', {publicToken: publicToken})
    const data = res.data.access_token
    
    this.setState({ access_token: data})
     this.props.history.push("/home")
  }


  render(){
    return (
      <>
      <div className="App">
      {  this.state.access_token === null ? 
        <Link token={this.state.token} accessToken={this.state.access_token} getAccessToken={this.getAccessToken} /> 
        : 
        <Switch>
          <Route path="/home" render={(routerprops) =><TransactionsContainer accessToken = {this.state.access_token} />} />
        </Switch>
      } 
      </div>
      </>
    );
  }
}

export default withRouter(App);
