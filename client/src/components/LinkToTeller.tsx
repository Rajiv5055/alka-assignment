import axios from 'axios';
import {useEffect} from 'react';

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
declare const window:any;

function LinkToTeller() {
  //const [account,setAccount] = useState({});

 
  useEffect(() => {
    
    async function getAccountDetails(accessToken: String){
      const headers : any ={
        'Authorization' : `Bearer ${accessToken}`
      }
      await axios.get("https://api.teller.io/accounts", { headers })
            .then((response: any)=>{
                console.log(response.account);
            })
   }

    const script = document.createElement("script");
    script.src = "https://cdn.teller.io/connect/connect.js";
    script.async = true;
    document.head.appendChild(script);
    var tellerConnect = window.TellerConnect.setup({
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
