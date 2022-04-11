import React, { useState, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./components/Home";
import { Error } from "./components/Error";
import { Users } from "./components/Users";
import { ListUsers } from "./components/users/ListUser";
import { DeleteUser } from "./components/users/DeleteUser";
import { SearchUser } from "./components/users/SearchUser";

const KEY = "blogApp.users";

export function App() {
  return (
    <Fragment>
      <Router>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "auto",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/auth/signup">Signup</Link>
          <Link to="/auth/login">Login</Link>
          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/profiles">Profiles</Link>
          <Link to="/dashboard/posts">Posts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/users/list" element={<ListUsers />} />
          <Route path="/dashboard/users/search" element={<SearchUser />} />
          <Route path="/dashboard/users/edit" element={<DeleteUser />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Fragment>
  );
}
