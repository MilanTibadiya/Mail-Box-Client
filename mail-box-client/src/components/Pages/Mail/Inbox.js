import React, { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/MailSlicer";
import { useNavigate } from "react-router-dom";

import { RxDotFilled } from 'react-icons/rx'
import { IconName } from "react-icons/rx";

const Inbox = () => {
  let count = 0;
  const [num, setNum] = useState(count)
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { allMails } = useSelector(state => state.mail);
  console.log('slice', allMails)

  const sum = allMails.map((x) => x.isReaded)
console.log('count',sum)

sum.forEach(element => {
  if(element !== true){
    count++;
  }
  console.log(count)
});

  useEffect(() => {
    getMails()
  }, [])

  const getMails = async () => {
    const userEmail = localStorage.getItem('userEmail');

    const res = await  fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}.json`);
    const data = await res.json();
    // console.log('get', data);

    let result = []
    for(let key in data){
      result.push({...data[key], id: key})
    }
    // setMails(result);
    dispatch(mailAction.setMail(result))
  };

  const readHandler = async (id) => {
    const userEmail = localStorage.getItem('userEmail');

    const res = await  fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}/${id}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        isReaded : true,
      }),
      headers: {
        'Content-Type':'application/json'
      }
    })
    // console.log('sum', res)
    getMails();
  }
  
    return (
        
        <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">Inbox</h1>
      <button className=' btn border-primary m-3' onClick={()=>navigate('/sendmail')}>COMPOESE</button>
       <span>Inbox : {count} Unread </span>
        <div className="m-5">
          {allMails?.map((email) => (
            
            <div
              key={email.id}
              onClick={() => {readHandler(email.id);
                navigate(`/inbox/${email.id}`)
              }}
              style={{cursor : 'pointer'}}
              className="shadow p-2 d-flex justify-content-between"
            >
              <div>
                 {
                    !email.isReaded && <RxDotFilled className='mt-1 text-primary' style={{fontSize : '20px'}} />
                  }
                <b className={email.isReaded?'fw-normal px-2' : 'fw-bold px-2'} >{email.senderMail}</b>
              </div>
              <div>
                <b  className={email.isReaded?'fw-normal m-2' : 'fw-bold m-2'}>{email.subject}</b>
                <span className=' fw-light px-2'>{email.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};

export default Inbox;