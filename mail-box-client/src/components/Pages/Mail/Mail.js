import React from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const Mail = () => {
  const { id } = useParams(); //params.id
  const { allMails } = useSelector((state) => state.mail);

  const mail = allMails.find((emai) => emai.id === id);
  return (
    <>
      <h5 className="m-5">mail</h5>
      <div className="m-5">
        <h2>Sended by : {mail.senderMail}</h2>
        <p>subject : {mail.subject}</p>
        <p className="p-2" style={{border: '2px solid blue', height: '222px'}}>{mail.mail}</p>
      </div>
    </>
  );
};

export default Mail;
