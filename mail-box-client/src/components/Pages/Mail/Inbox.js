import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/MailSlicer";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

import { RxDotFilled } from 'react-icons/rx';
import {AiFillDelete } from 'react-icons/ai';
import classes from './inbox.module.css';

const Inbox = () => {
  const { sendRequest } = useHttp();

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
    const timeInt = setInterval(() => {
      getMails()
      // console.log('time out $ clear'
    }, 3000)
    return () => clearInterval(timeInt)
  }, [])

  const getMails = async () => {
    const userEmail = localStorage.getItem('userEmail');

    const res = await  fetch(`https://mailbox-ba4ff-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}.json`);
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

    sendRequest(
      {
        url: `https://mailbox-ba4ff-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}/${id}.json`,
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: {
          isReaded : true,
        },
      }
    )
    // console.log('sum', res)
    getMails();
  }

  const deleteMail = async (id) => {
    const userEmail = localStorage.getItem('userEmail');

    sendRequest(
      {
        url: `https://mailbox-ba4ff-default-rtdb.firebaseio.com/inbox${userEmail.split('@')[0]}/${id}.json`,
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        },
      }
    )
    getMails();
  }
  
    return (  
        <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">Inbox</h1>
      
      <div className={classes.menu_three_section}>
      <button className=' btn border-primary m-3 mx-5' onClick={()=>navigate('/sendmail')}>COMPOESE</button>
      <button className=' btn border-primary m-3' onClick={()=>navigate('/sent')}>SENT</button>        
      {/* <button className=' btn border-primary m-3' onClick={()=>navigate('/inbox')}>INBOX</button>         */}

      </div>

       <div className="mx-5 mt-3 mb-2"><span>recieved  ||</span> <span>   Inbox : {count} Unread </span></div>
        <div className="mx-5">
          {allMails?.map((email) => (
            <div key={email.id} className='d-flex gap-3'>
            <div
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