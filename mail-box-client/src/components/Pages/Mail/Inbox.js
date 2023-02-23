import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/MailSlicer";
import { useNavigate } from "react-router-dom";

import { RxDotFilled } from 'react-icons/rx'
import {AiFillDelete } from 'react-icons/ai'
import { IconName } from "react-icons/rx";

const Inbox = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { allMails } = useSelector(state => state.mail);
  // console.log('slice', allMails)

  const sum = allMails.map((x) => x.isReaded)

  let count = 0;
sum.forEach(element => {
  if(element !== true){
    count++;
  }
  // console.log(count)
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

  const deleteMail = async (id) => {
    const userEmail = localStorage.getItem('userEmail');

    const res = await fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}/${id}.json`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    },
    )
    getMails();
  }
  
    return (
        
        <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">Inbox</h1>
      <button className=' btn border-primary m-3' onClick={()=>navigate('/sendmail')}>COMPOESE</button>
       <span>Inbox : {count} Unread </span>
        <div className="m-5">
          {allMails?.map((email) => (
            <div className='d-flex gap-3'>
            <div
              key={email.id}
              onClick={() => {readHandler(email.id);
                navigate(`/inbox/${email.id}`)
              }}
              style={{cursor : 'pointer', width: '90%'}}
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
                <span className=' fw-light px-2'> {email.mail}</span>
              </div>
            </div>
            <button
                onClick={() => deleteMail(email.id)}
                className="btn btn-sm border-danger "
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      </>
    );
};

export default Inbox;