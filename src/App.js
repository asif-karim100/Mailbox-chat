import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import Sent from './components/Sent';
import EmailList from './components/EmailList';
import Folders from './components/Folders';



///////////////install all packages like reacticon,bootstrap and see the package have to
// install first //

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/mails/*' element={<Welcome />}>
        <Route path='inbox' element={<EmailList />} />
        <Route path='sent' element={<Sent />} />
        <Route path='starred' element={<Folders />} />
        <Route path='important' element={<Folders />} />
        <Route path='drafts' element={<Folders />} />
      </Route>
      </Routes>
      
  );
}

export default App;