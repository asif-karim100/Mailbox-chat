import React, {useCallback, useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
import EmailBodySent from './EmailBodySent';
// import EmailBody from './EmailBody';

const Sent =() => {

  const dispatch = useDispatch();
  
  const sent = useSelector((state) => state.mail.sent);
  const user = useSelector(state => state.auth.email);
 

  const getInboxEmails = useCallback(async() => {
    const sanitizedUser = user.replace(/[@.]/g, '');
    console.log(sanitizedUser);

    const getEmailsUrl = `https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com/${sanitizedUser}/sent.json`;
    const response = await axios(getEmailsUrl);

    if (response.data) {
      const emailArray = [];
      for (const key in response.data) {
        emailArray.push({ id: key, ...response.data[key] });
      }
      console.log(emailArray);
      dispatch(mailActions.setSentBox(emailArray));
    }


    
  },[user,dispatch]);

  useEffect(() => {
    getInboxEmails();
  }, [getInboxEmails])


  /////if use this call api every 2 sec///////////////

  // useEffect(() => {
  //   // Fetch sent emails when the component mounts
  //   getInboxEmails();

  //   // Set up interval to fetch sent emails every 2 seconds
  //   const intervalId = setInterval(() => {
  //     getInboxEmails();
  //   }, 2000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [getInboxEmails]);
  ///////////////////////////////////////////

  return (
    <div className="email-list">
      {sent.map((email) => (
        <EmailBodySent
          id={email.id}
          key={email.id}
          from={email.to}
          subject={email.subject}
          msg={email.msg}
          timeStamp={new Date(email.timeStamp).toLocaleString()}
        />
      ))}
    </div>
  );
};
export default Sent;