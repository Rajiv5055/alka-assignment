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
declare const window : any;


function LinkToTeller() {
 // const [account,setAccount] = useState({});

/*  async function getAccountDetails(accessToken: String){
     await axios.get(`https://api.teller.io/accounts --auth ${accessToken}`)
           .then((response: any)=>{
               setAccount(response.account);
           })
           console.log(account);
  }*/
  
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
          console.log("User enrolled successfully", enrollment.accessToken);
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
    console.log(tellerConnect);
  }, []);

  return (
    <div className="App">
    <button id="myButton" >
      Open Teller
    </button>
    </div>
  );
}


export default LinkToTeller;
