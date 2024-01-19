import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { store } from "../../app/store";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";
import { getAbout } from "../../features/about/aboutSlice";
import { Link } from "react-router-dom";
const showdown = require("showdown");

function Sub() {
    const { sub } = useParams();
    const [posts, setPosts] = useState([]);
    const [about, setAbout] = useState([]);
    const [option, setOption] = useState("");

    useEffect(() => {
        console.log(sub);
        async function getPostInfo() {
            setPosts( await( await store.dispatch(getPosts({subreddit: "r/" + sub, option}))).payload);
            setAbout( await( await store.dispatch(getAbout({subreddit: 'r/' + sub}, option))).payload);
        }
        getPostInfo();
    }, [sub, option]);

    function markDownConversion(markdown) {
        const html = new showdown.Converter();
        return html.makeHtml(markdown);
    }

    function video(html) {
        let e = document.createElement('div');
        e.innerHTML = html;
        return e.childNodes[0].nodeValue;
    }

    function handleChange({target}) {
        setOption(target.value);
    }

    const imgStyle = {
        width: 100,
        height: 100
    }

    const postStyle = {
        width: '90%',
        maxHeight: '500px',
        backgroundColor: '#343F71'
    }
    try {
        return (
            <main> 
                <select onChange={handleChange}>
                    <option value="hot">Hot</option>
                    <option value="new">New</option>
                </select>
                <div style={{width: "25%", display: "block", justifyContent: "center", textAlign: "center" }}>
                    <img src={about.icon_img ? about.icon_img : "https://art.ngfiles.com/images/895000/895418_rj-ng_reddit-robot.png?f1557034796"} alt={about.title} style={imgStyle} />
                    <br />
                    <h2>{about.display_name}</h2>
                </div>
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
    } catch {
        window.location.href = "/404";
    }
    
}

export default Sub;