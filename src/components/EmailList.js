import "./EmailList.css";
import EmailBody from "./EmailBody";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { mailActions } from "../store/mailSlice";

const EmailList = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.mail.emails);
  const user = useSelector((state) => state.auth.email);

  const getInboxEmails = useCallback(async () => {
    const sanitizedUser = user.replace(/[@.]/g, "");

    const getEmailsUrl = `https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com/${sanitizedUser}/inbox.json`;
    const response = await axios(getEmailsUrl);
    

    if (response.data) {
      const emailArray = [];
      for (const key in response.data) {
        emailArray.push({ id: key, ...response.data[key] });
      }
      console.log(emailArray);
      dispatch(mailActions.setEmails(emailArray));
    }
  }, [user, dispatch]);

  useEffect(() => {
    getInboxEmails();
  }, [getInboxEmails]);

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailBody
          key={email.id}
          id={email.id}
          from={email.from}
          subject={email.subject}
          msg={email.msg}
          timeStamp={new Date(email.timeStamp).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default EmailList;
