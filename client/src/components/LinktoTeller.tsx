import axios from 'axios';
import {useEffect,useState} from 'react';

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
  
declare const window: any;

function LinkToTeller() {
    const [accountid, setAccountid] = useState<accounts['id']>('');
    const [transactionlink, setTransactionlink] = useState<string | null>('');

    async function getTransactions(accountid:string|null){
        const res = await axios.get('http://localhost:5000/getTransactions', {
            params: {
                accountid : accountid
            }
        });
       console.log(res);
    };
  async function getAccountDetails(accessToken: string|null){
      const res = await axios.get('http://localhost:5000/accounts', {
          params:{
              accessToken:accessToken
          } 
      });
      setAccountid(res.data[0].id);
      setTransactionlink(res.data[0].links.transactions);
      getTransactions(accountid);
    };
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.teller.io/connect/connect.js";
    script.async = true;
    document.head.appendChild(script);
    const tellerConnect = window.TellerConnect.setup({
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
         <button id="myButton" > Open Teller </button>
    </div>
  );
}


export default LinkToTeller;
