import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import { fetchApi } from "./utils/response";

import { URL_API_STATUS, URL_API } from "./config";

import Home from "./views/Home";
import Users from "./views/Users";
import Profiles from "./views/Profiles";
import Error from "./views/Error";

import MyUser from "./components/users/MyUser";
import DeleteUser from "./components/users/DeleteUser";
import ListUsers from "./components/users/ListUser";
import SearchUser from "./components/users/SearchUser";

import Posts from "./views/Posts";
import ListPosts from "./components/posts/ListPosts";
import MyPosts from "./components/posts/MyPosts";
import DeletePostMenu from "./components/posts/DeletePostMenu";
import EditPostMenu from "./components/posts/EditPostMenu";
import CreatePost from "./components/posts/CreatePost";
import SearchPost from "./components/posts/SearchPost";

import MyProfile from "./components/profiles/MyProfile";
import ListProfile from "./components/profiles/ListProfile";
import SearchProfile from "./components/profiles/SearchProfile";
import EditProfile from "./components/profiles/EditProfile";

// const Error = React.lazy(() => import("./views/Error"));

// const Users = React.lazy(() => import("./views/Users"));
// const ListUsers = React.lazy(() => import("./components/users/ListUser"));
// const DeleteUser = React.lazy(() => import("./components/users/DeleteUser"));
// const SearchUser = React.lazy(() => import("./components/users/SearchUser"));
// const MyUser = React.lazy(() => import("./components/users/MyUser"));

// const Profiles = React.lazy(() => import("./views/Profiles"));
// const ListProfile = React.lazy(() =>
//   import("./components/profiles/ListProfile")
// );
// const MyProfile = React.lazy(() => import("./components/profiles/MyProfile"));
// const SearchProfile = React.lazy(() =>
//   import("./components/profiles/SearchProfile")
// );
// const EditProfile = React.lazy(() =>
//   import("./components/profiles/EditProfile")
// );

// const Posts = React.lazy(() => import("./views/Posts"));
// const CreatePost = React.lazy(() => import("./components/posts/CreatePost"));
// const DeletePostMenu = React.lazy(() =>
//   import("./components/posts/DeletePostMenu")
// );
// const MyPosts = React.lazy(() => import("./components/posts/MyPosts"));
// const SearchPost = React.lazy(() => import("./components/posts/SearchPost"));
// const ListPosts = React.lazy(() => import("./components/posts/ListPosts"));
// const EditPostMenu = React.lazy(() =>
//   import("./components/posts/EditPostMenu")
// );

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  // Get status of API
  useEffect(() => {
    async function fetchStatus() {
      try {
        // setIsLoading(false);
        const response = await fetchApi(URL_API_STATUS);
        // setStatus(response.ok);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStatus();
  }, []);

  useEffect(() => {
    localStorage.getItem("token") == null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  if (isLoading) return <p>Loading..</p>;

  return status ? (
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

        {isLogged ? (
          <>
            <Route path="/auth/logout" element={<Logout />} />

            <Route path="/dashboard/users/" element={<Users />} />
            <Route path="/dashboard/users/myuser" element={<MyUser />} />
            <Route path="/dashboard/users/list" element={<ListUsers />} />
            <Route path="/dashboard/users/search" element={<SearchUser />} />
            <Route path="/dashboard/users/edit" element={<DeleteUser />} />
            <Route path="/dashboard/profiles/" element={<Profiles />} />
            <Route
              path="/dashboard/profiles/myprofile"
              element={<MyProfile />}
            />
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
            <Route path="/dashboard/posts/edit" element={<EditPostMenu />} />
            <Route path="/dashboard/posts/myposts" element={<MyPosts />} />
            <Route
              path="/dashboard/posts/delete"
              element={<DeletePostMenu />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  ) : (
    <p>API down</p>
  );
}
