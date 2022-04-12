import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Logout } from "./components/auth/Logout";

import { Home } from "./components/Home";
import { Error } from "./components/Error";

import { Users } from "./components/Users";
import { ListUsers } from "./components/users/ListUser";
import { DeleteUser } from "./components/users/DeleteUser";
import { SearchUser } from "./components/users/SearchUser";
import { MyUser } from "./components/users/MyUser";

import { ListProfile } from "./components/profiles/ListProfile";
import { Profiles } from "./components/Profiles";
import { MyProfile } from "./components/profiles/MyProfile";
import { SearchProfile } from "./components/profiles/SearchProfile";
import { EditProfile } from "./components/profiles/EditProfile";

import { Posts } from "./components/Posts";
import { CreatePost } from "./components/posts/CreatePost";
import { DeletePost } from "./components/posts/DeletePost";
import { EditPost } from "./components/posts/EditPost";
import { MyPosts } from "./components/posts/MyPosts";
import { SearchPost } from "./components/posts/SearchPost";
import { ListPosts } from "./components/posts/ListPosts";

const KEY = "blogApp.users";

export function App() {
  const [status, setStatus] = useState(false);

  // Get status of API
  useEffect(() => {
    async function fetchStatus() {
      const response = await fetch("http://localhost:5500/status", {
        method: "GET",
      });
      setStatus(response.ok);
    }
    fetchStatus();
  }, [status]);

  return status ? (
    <>
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
          <Link to="/auth/logout">Logout</Link>

          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/profiles">Profiles</Link>
          <Link to="/dashboard/posts">Posts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/logout" element={<Logout />} />

          <Route path="/dashboard/users/" element={<Users />} />
          <Route path="/dashboard/users/myuser" element={<MyUser />} />
          <Route path="/dashboard/users/list" element={<ListUsers />} />
          <Route path="/dashboard/users/search" element={<SearchUser />} />
          <Route path="/dashboard/users/edit" element={<DeleteUser />} />

          <Route path="/dashboard/profiles/" element={<Profiles />} />
          <Route path="/dashboard/profiles/myprofile" element={<MyProfile />} />
          <Route path="/dashboard/profiles/list" element={<ListProfile />} />
          <Route
            path="/dashboard/profiles/search"
            element={<SearchProfile />}
          />
          <Route path="/dashboard/profiles/edit" element={<EditProfile />} />

          <Route path="/dashboard/posts/" element={<Posts />} />
          <Route path="/dashboard/posts/create" element={<CreatePost />} />
          <Route path="/dashboard/posts/myposts" element={<MyPosts />} />
          <Route path="/dashboard/posts/list" element={<ListPosts />} />
          <Route path="/dashboard/posts/search" element={<SearchPost />} />
          <Route path="/dashboard/posts/edit" element={<EditPost />} />
          <Route path="/dashboard/posts/delete" element={<DeletePost />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  ) : (
    <div>API down</div>
  );
}
