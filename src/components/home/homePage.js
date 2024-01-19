import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { getPosts } from "../../features/posts/postsSlice";
import { store } from "../../app/store";
import { Link } from "react-router-dom";
import styles from '../../index.module.css'
const showdown = require('showdown');

function Home() {
    const [posts, setPosts] = useState([]);
    const [option, setOption] = useState("");
    
    useEffect(()=> {
        async function as() { 
            setPosts( await( await store.dispatch(getPosts({subreddit: "r/learnprogramming", option}))).payload);
        }
        as()
    }, [option])

    function markDownConversion(markdown) {
        const html = new showdown.Converter();
        return html.makeHtml(markdown);
    }

    function handleChange({target}) {
        setOption(target.value);
    }

    function markDownConversion(markdown) {
        const html = new showdown.Converter();
        return html.makeHtml(markdown);
    }

    function video(html) {
        let e = document.createElement('div');
        e.innerHTML = html;
        return e.childNodes[0].nodeValue;
    }

    const postStyle = {
        width: '90%',
        maxHeight: '500px',
        backgroundColor: '#343F71'
    }


    return (
        <main>
            <select onChange={handleChange}>
                <option value="hot">Hot</option>
                <option value="new">New</option>
            </select>
            {posts?.map(post => (
                <div>
                    <Link to={`/${post.data.subreddit_name_prefixed}/${post.data.id}`} style={{width: '100%', height: '100%', zIndex: '1'}}>
                        <h3>{post.data.author}</h3><br />
                        <h2>{post.data.title}</h2>
                        {!post.data.is_self && !post.data.media_embed.content ? <img src={post.data.thumbnail} alt={post.data.title} /> : post.data.media_embed.content ? <div style={{boxShadow: "0 0 0 transparent", backgroundColor: "transparent"}} dangerouslySetInnerHTML={{__html: video(post.data.media_embed.content)}} /> : <p dangerouslySetInnerHTML={{__html: markDownConversion(post.data.selftext)}}></p>}
                        <h4>&uarr; {post.data.ups - post.data.downs}  &#128488; {post.data.num_comments}</h4><br />
                        <h5 style={{textAlign: "center", fontSize: "1.1rem"}}>View More</h5>
                    </Link>
                </div>
            ))}
            <Outlet />
        </main>
    )
}

export default Home;