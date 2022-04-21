import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import { fetchApi } from "./utils/response";

import { URL_API_STATUS } from "./config";

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
import { checkLogin } from "./utils/checkLogin";
import Nav from "./components/nav/Nav";

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  // Get status of API
  useEffect(() => {
    async function fetchStatus() {
      try {
        setIsLoading(true);
        const response = await fetchApi(URL_API_STATUS);
        setStatus(response.ok);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  useEffect(() => {
    setIsLogged(checkLogin());
  }, []);

  if (isLoading) return <p>Loading..</p>;

  return status ? (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/signup"
          element={<Signup props={{ isLogged, setIsLogged }} />}
        />
        <Route
          path="/auth/login"
          element={<Login props={{ isLogged, setIsLogged }} />}
        />

        {isLogged ? (
          <>
            <Route
              path="/auth/logout"
              element={<Logout props={{ isLogged, setIsLogged }} />}
            />

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
