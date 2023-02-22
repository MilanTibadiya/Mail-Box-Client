import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const navigate = useNavigate()

  const [Mails, setMails] = useState([])

  useEffect(() => {
    getMails()
  }, [])

  const getMails = async () => {
    const userEmail = localStorage.getItem('userEmail');

    const res = await  fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}.json`);
    const data = await res.json();
    console.log('get', data);

    let result = []
    for(let key in data){
      result.push({...data[key], id: key})
    }
    setMails(result);
  }
// console.log(Mails)
  
    return (
        
        <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">Inbox</h1>
      <button className=' btn border-primary m-3' onClick={()=>navigate('/sendmail')}>COMPOESE</button>
       
        <div className="m-5">
          {Mails.map((email) => (
            <div
              key={email.id}
              className="shadow p-2 d-flex justify-content-between"
            >
              <div>
                <b>{email.senderMail}</b>
              </div>
              <div>
                <b className=" m-2 px-2">{email.subject}</b>
                <span className="px-5">-{email.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};

export default Inbox;