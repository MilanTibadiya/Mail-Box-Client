import React, { useRef, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";

const MailBox = () => {

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

    fetch(`https://signup-and-authentication-default-rtdb.firebaseio.com/inbox${enteredEmail.split('@')[0]}.json`,
    {
      method: 'POST',
      body: JSON.stringify({
        senderMail: enteredEmail,
        subject: enteredSubject,
        mail: enteredEditor,
        isReaded : false,
      }),
      headers: {
        'Content-Type':'application/json'
      }
    }).then((res) => {
      if(!res.ok){
        toast(res.error.message)
      }else{
        console.log('success send, mail-box')
      }
    })

    emailRef.current.value = '';
    subjectRef.current.value = '';
    setEditorState('');
  };

  return (
    <>
      <h1 className="d-flex justify-content-center display-5 border-bottom p-2 border-1 border-dark">
        Send Mail
      </h1>
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
