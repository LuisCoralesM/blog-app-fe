import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout(props) {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") == null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  function logout(e) {
    e.preventDefault();

    localStorage.clear();

    setHasLoggedOut(true);
  }

  function checkLog() {
    console.log(isLogged);
    console.log(hasLoggedOut);
  }

  return (
    <>
      <h2>Logout</h2>
      {checkLog()}

      {!isLogged ? (
        <Navigate to="/auth/login" replace />
      ) : !hasLoggedOut ? (
        <form onSubmit={logout}>
          <button type="submit">Logout</button>
        </form>
      ) : (
        "You have logged out"
      )}
    </>
  );
}
