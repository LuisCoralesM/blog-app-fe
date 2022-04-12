import React, { useState, useEffect } from "react";

export function Logout({ props }) {
  const [hasLogged, setHasLogged] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setHasLogged(false)
      : setHasLogged(true);
  }, []);

  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    setHasLogged(false);
  }

  return (
    <>
      <h2>Logout</h2>
      {!hasLogged ? (
        "You are not logged in!"
      ) : !hasLoggedOut ? (
        <form onSubmit={(e) => logout(e)}>
          <button type="submit">Logout</button>
        </form>
      ) : (
        "You have logged out"
      )}
    </>
  );
}
