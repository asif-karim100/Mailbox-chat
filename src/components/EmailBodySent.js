import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import LabelImportant from "@mui/icons-material/LabelImportant";
import "./EmailBody.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import { IconButton } from "@mui/material";
import { mailActions } from "../store/mailSlice";

const EmailBodySent = ({ from, subject, msg, timeStamp, id }) => {
  const user = useSelector((state) => state.auth.email);
//   const emails = useSelector((state) => state.mail.emails);
const sent = useSelector((state) => state.mail.sent);


  // const isRead = emails.find((email) =>
  //  email.id === id.isRead,
  const dispatch = useDispatch();
  // )
  const isRead = sent.find((email) => email.id === id)?.isRead;

   
  const sanitizedUser = user.replace(/[@.]/g, "");

  const navigate = useNavigate();

  const setMails = async () => {
    try {
      const sentUrl = `https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com/${sanitizedUser}/sent/${id}.json`;
      await axios.patch(sentUrl, { isRead: true });
    } catch (error) {
      console.log(error);
    }

    navigate(`/mails/sent/${id}`);
  };


  /// code
//   const handleIconButton= async (e) => {
//     // e.preventDefault();
//     e.stopPropagation();
//     try {
//       const sentUrl = `https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com/${sanitizedUser}/sent/${id}.json`;
//       await axios.delete(sentUrl);
  
//       // Dispatch an action to remove the deleted email from the state
//       dispatch(mailActions.deleteSentEmail(id));
  
//       console.log("Email sent deleted");
//     } catch (error) {
//       console.log(error);
//     }
//   };
const handleIconButton = async (e) => {
    e.stopPropagation();
    try {
      const sentUrl = `https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com/${sanitizedUser}/sent/${id}.json`;
      await axios.delete(sentUrl);

      // Dispatch an action to remove the deleted email from the state
      dispatch(mailActions.deleteEmailSent(id));

      console.log("Email sent deleted");
    } catch (error) {
      console.log(error);
    }
  };
  ///////
  
  
  
  

  return (
    <Fragment>
      <div className="email-body" onClick={setMails}>
        <div className="email-body__left">
          <div className={`dot ${isRead ? "unread" : "read"} `}></div>
          <CheckBoxOutlineBlank />
          <LabelImportant />
          <h4>{from}</h4>
          {/* <h4>{to}</h4> */}
        </div>
        <div className="email-body__middle">
          <div className="email-body-middle__msg">
            <div>
              <h4>{subject}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: msg }}></div>
          </div>
        </div>
        <div className="email-body__right">
          <IconButton onClick={handleIconButton}>
            <DeleteIcon />
          </IconButton>
          <p>{timeStamp}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailBodySent;



