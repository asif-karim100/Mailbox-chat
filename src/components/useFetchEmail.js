import { useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/mailSlice";
import { app, auth } from "../config/firebase";



///
function useFetchEmails() {
  const dispatch = useDispatch();
  const firestore = getFirestore(app);
  const currentUser = auth?.currentUser?.email;

  useEffect(() => {
    const fetchEmails = async () => {
      if (!currentUser) {
        return;
      }
      const emailCollection = collection(firestore, "users", currentUser, "inbox");
      const q = query(emailCollection, orderBy("timeStamp", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const emailData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          emailData.push({
            id: doc.id,
            ...data,
          });
        });

        console.log(emailData);

        dispatch(mailActions.setEmails(emailData));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails(); // Call the fetchEmails function

  }, [firestore, currentUser, dispatch]);

  return null; //
}

export default useFetchEmails;
