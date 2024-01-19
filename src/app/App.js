import React, { useEffect, useState } from "react";
import  { Route, createRoutesFromElements } from "react-router"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../components/home/homePage";
import Post from "../components/posts/postPage";
import Sub from "../components/subreddit/subPage";
import styles from '../index.module.css';
import { Link } from 'react-router-dom';
import { getTopSubs } from '../features/topSubs/topSubsSlice';
import { store } from './store'
import ErrorPage from "../components/error/errorPage";
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/r/:sub" element={<Sub />} errorElement={<ErrorPage />} />
      <Route path="/r/:sub/:id" element={<Post />} errorElement={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  ))
  
  const [input, setInput] = useState("");
  const [subReddits, setSubReddits] = useState([]);

  useEffect(() => {
    async function getSubredditsList() {    
      setSubReddits(await(await store.dispatch(getTopSubs())).payload);
    }
    getSubredditsList()
  }, [])
  
  function handleMenuClick() {
    let aside = document.querySelector("#menu");
    if(document.querySelector("aside").style.display === "none") {
      document.querySelector("aside").style.display = "block";
    } else {
      document.querySelector("aside").style.display = "none";
    }
  }
  
  function handleInput({target}) {
    setInput(target.value);
  }
  
  function handleSubredditChange(e) {
    e.preventDefault();
    document.querySelector("aside").style.display = "none";
    window.location.href = "/r/" + input;
  }

  function goHome() {
    window.location.href = "/";
  }

  return (
    <>
      <BrowserRouter>
        <header style={styles.header}>
              <ul onClick={handleMenuClick}>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            <h1 onClick={goHome}>Reddify</h1>
          </header>
          <aside style={styles.aside}>
            <button onClick={handleMenuClick}>X</button>
            <form onSubmit={handleSubredditChange}>
              <input type="text" autoComplete="off" onChange={handleInput} />
            </form>
            <h2>Top Subreddits</h2>
            {subReddits.map(subReddit => (
              <><a href={"/r/" + subReddit.data.display_name}>{subReddit.data.display_name}</a><br /></>
            ))}
          </aside>
      </BrowserRouter>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
