import React from "react";
import "./EmailDetails.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EmailDetails = () => {
  const params = useParams();
  const emails = useSelector((state) => state.mail.emails);

  const email = emails.find((mail) => {
    return params.mailid === mail.id;
  });

  return (
    <div className="emailbody__msg">
      <div className="emaildetails__middleheader">
        <div className="emaildetails__middleheaderleft">
          <Avatar />
          <h4>{email.from}</h4>
        </div>
      </div>

      <div className="emaildetails__header">
        <div className="emaildetails__headerleft">
          <h4>{email.subject}</h4>
        </div>
      </div>

      <div className="emaildetails__body">
        <div dangerouslySetInnerHTML={{ __html: email.msg }}></div>
      </div>
    </div>
  );
};

export default EmailDetails;
