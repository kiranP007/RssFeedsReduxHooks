import React from 'react'
import { useSelector } from 'react-redux'

function Feed({link}) {
    const feed = useSelector(state => state.feed.entities.feeds.byId[link])
    return (
        <div className="feed-container">
            <div>{feed.title}</div>
            {feed.author && <div className="author">- {feed.author}</div>}
            {feed.content && <div className="content">{feed.content}</div>}
            {feed.link && <a href={feed.link} target="_blank" rel="noreferrer" >View more</a>}
        </div>
    )
}

export default Feed