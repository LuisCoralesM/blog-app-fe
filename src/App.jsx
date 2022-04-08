import React, { useState, Fragment } from "react";
import { ListUsers } from "./components/users/ListUser";

export function App() {
  const [users, setUsers] = useState([
    { id: 1, username: "Luis" },
    { id: 2, username: "Jose" },
  ]);

  const newUser = () => {
    setUsers((data) => {
      return [...data, { id: data[data.length - 1].id + 1, username: "A" }];
    });
  };

  return (
    <Fragment>
      <ListUsers users={users} />
      <button onClick={newUser}>Search users</button>
    </Fragment>
  );
}
