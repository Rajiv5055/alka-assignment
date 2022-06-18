import { useEffect } from 'react';

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
type setup = {
  setup: (arg0: any)=> any;
  version: string;
}
declare global {
  interface Window { 
    TellerConnect: setup;
   }
}

function LinktoTeller() {
  
  useEffect(() => {
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
        onSuccess: function(enrollment: enrollments) {
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
  }, []);



  return (
    <div className="App">
    <button id = "myButton" style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}>
      Open Teller
    </button>
    </div>
  );
}

export default LinktoTeller;
