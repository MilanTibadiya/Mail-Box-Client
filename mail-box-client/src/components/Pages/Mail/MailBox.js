import React, { useRef, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { useNavigate } from "react-router-dom";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from './inbox.module.css';

const MailBox = () => {
  const navigate = useNavigate();

  const { sendRequest: sendTaskRequest  } = useHttp();

  const [editorState , setEditorState] = useState(()=> EditorState.createEmpty() )
  const emailRef = useRef('');
  const subjectRef = useRef('');
  // const editorRef = useRef('');

  const editorHandler=(editorState)=>{
    setEditorState(editorState)
    // console.log('editor state',editorState.getCurrentContent().getPlainText());
 }

  let myEmail = localStorage.getItem("userEmail");

  const submitHandler = () => {
    const enteredEmail = emailRef.current.value;
    const enteredSubject = subjectRef.current.value;
    // const enteredEditor = editorRef.current.value;
    const enteredEditor = editorState.getCurrentContent().getPlainText();

    // console.log(enteredEmail, enteredSubject, enteredEditor, editorState);

    const  transformTasks = () => {}

    sendTaskRequest(
      {
        url: `https://mailbox-ba4ff-default-rtdb.firebaseio.com/inbox${enteredEmail.split('@')[0]}.json`,
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: {
          senderMail: myEmail,
          subject: enteredSubject,
          mail: enteredEditor,
          isReaded : false,
        },
      },
      transformTasks
    )

    sendTaskRequest(
      {
        url: `https://mailbox-ba4ff-default-rtdb.firebaseio.com/sent${myEmail.split('@')[0]}.json`,
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: {
          senderMail: enteredEmail,
          subject: enteredSubject,
          mail: enteredEditor,
          isReaded : false,
        },
      }
    )

    emailRef.current.value = '';
    subjectRef.current.value = '';
    setEditorState('');
  };

  return (
    <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">
        Send Mail
      </h1>
      <div className={classes.menu_three_section}>
      <button className=' btn border-primary m-3 mx-5' onClick={()=>navigate('/inbox')}>Inbox</button>
      <button className=' btn border-primary m-3' onClick={()=>navigate('/sent')}>SENT</button>
      </div>
      
      <div style={{ margin: "11px 111px" }}>
        <label style={{ borderBottom: "1px solid black" }}>
          From: {myEmail}
        </label>
        <br></br>
        {/* */}
        <form>         
        <label>To</label>
        <input
          ref={emailRef}
          className=" form-control mt-1"
          placeholder="Enter Email"
          type="email"
          required
        />
        <label>Subject</label>
        <input
          ref={subjectRef}
          className=" form-control mt-1"
          placeholder="Subject"
          required
        />
        </form>
        <Editor
          editorStyle={{ border: "1px solid", padding: "27px" }}
          wrapperStyle={{ padding: "20px" }}

          editorState={editorState}
          onEditorStateChange={editorHandler}

          // onChange={(e) => console.log('editor11',e.blocks[0].text)}
          // ref={editorRef}
        />
        <div className="bORDER-secondary d-flex p-2 justify-content-center">
          <button className="btn btn-primary p-1" onClick={submitHandler}>
            SEND MAIL
          </button>
        </div>
      </div>
    </>
  );
};

export default MailBox;
