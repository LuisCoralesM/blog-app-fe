import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { URL_API } from "../../config";
import { checkLogin } from "../../utils/checkLogin";
import { fetchApi } from "../../utils/response";

export default function Logout({ props }) {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    setIsLogged(props.isLogged);
  }, [props.isLogged]);

  async function logout(e) {
    e.preventDefault();

    const response = await fetchApi(URL_API + "/auth/logout", "POST");

    if (!response.ok) return console.log(response.data.status);

    localStorage.clear();
    setHasLoggedOut(true);
    props.setIsLogged(false);
  }

  return (
    <>
      <h2>Logout</h2>
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
