import React from "react";
// import "./EmailDetails.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EmailDetailsSent = () => {
  const params = useParams();

  /////if used this inbox is working
//   const emails = useSelector((state) => state.mail.emails);


  // const email = emails.find((mail) => {
  //   return params.mailid === mail.id;
  // });

  //// if used this sent is working
  const sent = useSelector((state) => state.mail.sent);


  const emailsent = sent.find((mail) => {
    return params.mailidd === mail.id;
  });
  console.log(emailsent,"asif");

  return (
    <div className="emailbody__msg">
      <div className="emaildetails__middleheader">
        <div className="emaildetails__middleheaderleft">
          <Avatar />
          {/* <h4>{email.from}</h4> */}

          {/* this is for open sent */}
          
          <h4>{emailsent.to}</h4>


        </div>
      </div>

      <div className="emaildetails__header">
        <div className="emaildetails__headerleft">
          {/* <h4>{email.subject}</h4> */}

           {/* this is for open sent */}
           <h4>{emailsent.subject}</h4>

        </div>
      </div>

      <div className="emaildetails__body">
        {/* <div dangerouslySetInnerHTML={{ __html: email.msg }}></div> */}

        {/* this is for open sent */}
        <div dangerouslySetInnerHTML={{ __html: emailsent.msg }}></div>
      </div>
    </div>
  );
};

export default EmailDetailsSent;
