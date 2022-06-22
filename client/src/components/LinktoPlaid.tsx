import React from 'react';
import Link from "./Link";
import axios from "axios";
import TransactionsContainer from './TransactionsContainer'
import { withRouter,RouteComponentProps } from 'react-router-dom';

interface accesstoken {
  access_token: string | null;
  token: string | null;
}

class LinktoPlaid extends React.Component<RouteComponentProps> {
  state:accesstoken = {
            token: null, 
            access_token: null
          }
        
        _isMounted = false;

  //connects to plaid to create temporary link token
  createLinkToken = async () => {
    const res = await axios.post('http://localhost:5000/create_link_token');
    const data = res.data.link_token
    if(this._isMounted)
    this.setState({ token: data })
  }
  //creates user link token upon page load
  componentDidMount(){
    this._isMounted = true;
    this.createLinkToken()
  }  
  componentWillUnmount(){
    this._isMounted = false;
  }

 //if link token is successfully created, user can click on button to exchange public token for an access token
  getAccessToken = async (publicToken:string) => {
  
    const res = await axios.post('http://localhost:5000/get_access_token', {publicToken: publicToken})
    const data = res.data.access_token
    if(this._isMounted){
      this.setState({ access_token: data})
    }
    this.props.history.push("/home")
  }


  render(){
    return (
      <>
      <div>
      { // <LinktoTeller/>
      this.state.access_token === null ? 
        <Link token={this.state.token} accessToken={this.state.access_token} getAccessToken={this.getAccessToken} /> 
        : 
        <TransactionsContainer accessToken={this.state.access_token} />
      } 
      </div>
      </>
    );
  }
}

export default withRouter(LinktoPlaid);
