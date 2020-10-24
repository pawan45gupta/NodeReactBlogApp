import './App.css';
import TabPanel from './Components/TabPanel';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const serverURI = 'http://localhost:5000/blogs';

  useEffect(() => {
    axios({
      url: serverURI,
      method: 'get'
    })
    .then(function (response) {
      setBlogs(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);

  function onTabChange(event) {
    if(event.currentTarget.innerText === "ADMIN VIEW") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  function onDeleteBlog(event) {
    axios({
      url: serverURI,
      method: 'post',
      data: {id: event.currentTarget.id}
    })
    .then(function (response) {
      setBlogs(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  
  return (
    <div className="App">
      <TabPanel blogs={blogs} isAdmin={isAdmin} onTabChange={onTabChange} onDeleteBlog={onDeleteBlog}/>
    </div>
  );
}

export default App;
