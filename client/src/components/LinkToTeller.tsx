import axios from 'axios';
import {useState,useEffect} from 'react';

type enrollment = {
  id: string;
}
type institution = {
  name: string;
}
type user = {
  id: string;
}

type enrollments = {
  accessToken: string;
  enrollment: enrollment;
  institution: institution;
  signatures: [];
  user: user;
}
type Acc_institution ={
  id: string | null;
  name: string | null;
}
type links = {
  balances: string | null;
  self: string | null;
  transactions : string | null;
}
type accounts = {
  currency: string | null;
  enrollment_id: string | null;
  id: string | null;
  institution: Acc_institution;
  last_four: string | null;
  links: links;
  name: string | null;
  status: string | null;
  subtype: string | null;
  type: string | null;
}

declare const window:any;

function LinkToTeller() {
  const [accounts,setAccounts] = useState<accounts[]|null>([]);

  async function getAccountDetails(accessToken: string|null){

    const res = await axios.get('http://localhost:5000/accounts', {
     params:{
      accessToken:accessToken
     } 
    })
       setAccounts(res.data);
       console.log(res.data);
       console.log(accounts);
 }


  useEffect(() => {
    
    const script = document.createElement("script");
    script.src = "https://cdn.teller.io/connect/connect.js";
    script.async = true;
    document.head.appendChild(script);
    var tellerConnect: any = window.TellerConnect.setup({
        applicationId: "app_o2qpi4tealt28kqksq000",
        environment: "sandbox",
        onInit: function() {
          console.log("Teller Connect has initialized");
        },
        // Part 3. Handle a successful enrollment's accessToken
        onSuccess: function(enrollment:enrollments) {
          console.log("User enrolled successfully ->", enrollment.accessToken);
          getAccountDetails(enrollment.accessToken);
        },
        onExit: function() {
          console.log("User closed Teller Connect");
        }

    });

    
    var el = document.getElementById("myButton");
    if(el !== null)
    el.addEventListener("click", function() {
       tellerConnect.open();
    });

  }, []);


  return (
    <div className="App">
    <button id="myButton" >
      Open Teller
    </button>
    </div>
  );
}


export default LinkToTeller
