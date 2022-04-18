import React, { useState, useEffect } from "react";

export default function Logout(props) {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  function logout(e) {
    e.preventDefault();

    localStorage.clear();

    setHasLoggedOut(true);
  }

  return (
    <>
      <h2>Logout</h2>
      {!hasLoggedOut ? (
        <form onSubmit={logout}>
          <button type="submit">Logout</button>
        </form>
      ) : (
        "You have logged out"
      )}
    </>
  );
}
