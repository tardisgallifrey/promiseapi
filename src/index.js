import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from 'react';
import './index.css';

//A faked API list of userf from mocki.io
const url = 'https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8';

const App = () => {
  const [users, setUsers] = useState([]);  //default is empty array


  useEffect( () => { 

    //Writing fetch as what it is, a PROMISE returning method
    //when a promise returns, we handle them with .then
    //Because the Resolved value returned and the error value
    //returned can optionally be resolved in the .then
    //our code often doesn't look like a Promise
    //This should clear that up.
    fetch(url)    //fetch returns promise, is producing code
      .then( (fetchResolved) => { return fetchResolved.json()}, 
              (fetchErrored) => { alert(fetchErrored)}
              )
      .then( (jsonParseResolved) => { setUsers(jsonParseResolved)},
              (jsonParseError) => { alert(jsonParseError) }
              )
      .catch( (finalError) => { console.log(finalError)});
      //.catch just doesn't need the resolve.  No use writing it.
  },[]);

  const userlist = users.map( (user, index) => <li key={index}>
    {user.name},{user.city}
  </li>)

  return(
    <div>
      <h1>A Promise method API</h1>
      <ul>
        {userlist}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


