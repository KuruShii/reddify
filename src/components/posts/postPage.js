import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { store } from "../../app/store";
import { getP0st } from "../../features/post/postSlice";
const showdown = require('showdown');

function Post() {
    const { sub } = useParams();
    const { id } = useParams();

    const [comments, setComments] = useState([]);


    useEffect(() => {
        async function getData() {
            store.dispatch(getP0st({ subreddit: sub, id: id }))
            .then((action) => {
                console.log(action.payload)
                setComments(action.payload)
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching post:', error);
            });
        }
        getData();
    }, [])

    useEffect(() => {
        console.log(comments);
    }, [comments])

    function markDownConversion(markdown) {
        const html = new showdown.Converter();
        return html.makeHtml(markdown);
    }

    function video(html) {
        let e = document.createElement('div');
        e.innerHTML = html;
        return e.childNodes[0].nodeValue;
    }

    const post = comments[0]?comments[0].data.children[0]:'';
    const comment = comments[1]?comments[1].data.children:'';

    try {
        return (
            <div>
                {comments[0] ? 
                <div>
                    <article style={{marginTop: 115}}>
                        <div> 
                            <h2>{post.data.title}</h2> 
                            {!post.data.is_self && !post.data.media_embed.content ? <img src={post.data.thumbnail} alt={post.data.title} /> : post.data.media_embed.content ? <div style={{boxShadow: "0 0 0 transparent", backgroundColor: "transparent"}} dangerouslySetInnerHTML={{__html: video(post.data.media_embed.content)}} /> : ""}
                            <p dangerouslySetInnerHTML={{__html: markDownConversion(post.data.selftext)}}></p>
                            <h4>&uarr; {post.data.ups - post.data.downs}  &#128488; {post.data.num_comments}</h4><br />
                        </div>
                    </article>
                    <article>
                        {comment.map(com => (
                            <div>
                                <h3>{com.data.author}</h3><br />
                                <p>{com.data.body}</p>
                            </div>
                        ))}
                    </article>
                </div>
                
                : 
                
                <h1 style={{width: "90%", margin: "45vh auto", textAlign: "center"}}>STOP WAIT A MINUTE! CURRENTLY LOADING GIMME A SECOND</h1>
                }
            </div>
            
        )
    } catch {
        window.location.href = "/404";
    }
}

export default Post