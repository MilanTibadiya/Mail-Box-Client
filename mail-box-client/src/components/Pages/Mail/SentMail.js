import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/MailSlicer";
import {AiFillDelete } from 'react-icons/ai'

const SentMail = () => {
    const { sendRequest } = useHttp();
    const dispatch = useDispatch();
    const sentmail = useSelector((state) => state.mail.sentMails)
    // console.log('is in sent-box',sentmail);

    const navigate = useNavigate();

    useEffect(() => {
      const timeInt = setInterval(() => {
        getMails()
      }, 2000);
      return () => clearInterval(timeInt)
      }, [])
    
      const getMails = async () => {
        const userEmail = localStorage.getItem('userEmail');
    
        const res = await  fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/sent${userEmail.split('@')[0]}.json`);
        const data = await res.json();
        // console.log('sent', data);
    
        let result = []
        for(let key in data){
          result.push({...data[key], id: key})
        }
        dispatch(mailAction.sentMail(result))
      };

      const deleteMail = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
    
        sendRequest(
          {
            url: `https://signup-and-authentication-default-rtdb.firebaseio.com/sent${userEmail.split('@')[0]}/${id}.json`,
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
        <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">Sent</h1>
        <button className=' btn border-primary m-3 mx-5' onClick={()=>navigate('/sendmail')}>COMPOESE</button>
        <button className=' btn border-primary m-3' onClick={()=>navigate('/inbox')}>Inbox</button>     
          <div className="mx-5">
            {sentmail?.map((email) => (
              <div  key={email.id} className='d-flex gap-3'>
              <div
                onClick={() => {  //navigate is not working because i am sending fetch req.
                  navigate(`/inbox/${email.id}`)
                }}
                style={{cursor : 'pointer', width: '90%'}}
                className="shadow p-2 d-flex justify-content-between"
              >
                <div>
                   {/* {
                      !email.isReaded && <RxDotFilled className='mt-1 text-primary' style={{fontSize : '20px'}} />
                    } */}
                  <b className={!email.isReaded?'fw-normal px-2' : 'fw-bold px-2'} >To-{email.senderMail}</b>
                </div>
                <div>
                  <b  className={!email.isReaded?'fw-normal m-2' : 'fw-bold m-2'}>{email.subject}</b>
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

export default SentMail;