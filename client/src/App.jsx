// Bringing in the required import from 'react-router-dom'
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");

  //TODO - save the user data when logging in/signing up.
  useEffect(() => {
    const getUser = async () => {
      const testUrl = `http://localhost:5001/api/users/667b571f1bb1a8f2f85b1b75`;
      await fetch(testUrl)
        .then(function (response) {
          if (!response.ok) {
            alert("Error message");
          } else {
            return response.json();
          }
        })
        .then(function (data) {
          setUser(data);
        });
    };
    getUser();
  }, []);





  return (
    <>
      <Outlet context={[user, setUser]} />
    </>
  );
}

export default App;
