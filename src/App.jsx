import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Logout } from "./components/auth/Logout";

const Home = React.lazy(() => import("./page/Home"));
import { Error } from "./page/not-found";

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
import { DeletePostMenu } from "./components/posts/DeletePostMenu";
import { MyPosts } from "./components/posts/MyPosts";
import { SearchPost } from "./components/posts/SearchPost";
import { ListPosts } from "./components/posts/ListPosts";
import { EditPostMenu } from "./components/posts/EditPostMenu";
import { URL_API_STATUS, URL_BACK } from "./config";

export function App() {
  const [loading, setLoadingApi] = useState(true);
  const [status, setStatus] = useState(false);

  // Get status of API
  useEffect(() => {
    async function fetchStatus() {
      try {
        setLoadingApi(true);
        const response = await fetch(URL_API_STATUS, {
          method: "GET",
        });
        setStatus(response.ok);
      } catch (error) {
        console.log("ocurrio un error");
      } finally {
        setLoadingApi(false);
      }
    }
    fetchStatus();
  }, []);

  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  if (loading) {
    return <div>Cargando..</div>;
  }
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

          {isLogged ? (
            <>
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
              <Route
                path="/dashboard/profiles/list"
                element={<ListProfile />}
              />
              <Route
                path="/dashboard/profiles/search"
                element={<SearchProfile />}
              />
              <Route
                path="/dashboard/profiles/edit"
                element={<EditProfile />}
              />
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
    </>
  ) : (
    <div>API down</div>
  );
}
