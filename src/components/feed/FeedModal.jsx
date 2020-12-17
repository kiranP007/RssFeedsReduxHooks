import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import './feed.css'
import Feed from './Feed'
import useOnClickOutside from "../../hooks/useOnClickOutside"
import rssFeedParser from "../../utils/rssFeedParser"
import {feedModalOutsideClick, rssFeedsReceived, rssFeedParsingFailed, refreshBtnClicked} from "../../actions/feedActions"

function FeedModal() {
    const dispatch = useDispatch()

    const feedModalRef = useRef()
    const handleFeedModalOutsideClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        dispatch(feedModalOutsideClick())
    }
    useOnClickOutside(feedModalRef,handleFeedModalOutsideClick)

    const feedsIds = useSelector(state => state.feed.entities.feeds.allIds)
    const isLoading = useSelector(state => state.feed.ui.isLoading)
    const errorMsg = useSelector(state => state.feed.ui.error)
    const refresh = useSelector(state => state.feed.ui.refresh)
    const selectedProjectUid = useSelector(state => state.home.selectedProject)
    const projectObj = useSelector(state => state.home.entities.projects.byId[selectedProjectUid]) 
    
    useEffect(() => {
        rssFeedParser(projectObj.link)
        .then(res => {
            dispatch(rssFeedsReceived(res.feeds))
        })
        .catch((errObj) => {
            dispatch(rssFeedParsingFailed(errObj.msg))
        })    
    }, [refresh, projectObj.link, dispatch])

    return  (
        <div className="feed-modal-container" >
            <div ref={feedModalRef}>
                <div>
                    <div className="feed-modal-close-icon" onClick={() => dispatch(feedModalOutsideClick())}>
                        <div>
                            <div>X</div>
                        </div>
                    </div>
                    <div className="feed-modal-refresh-icon" >
                        <div>
                            <i className="material-icons" onClick={() => dispatch(refreshBtnClicked())}>refresh</i>
                        </div>
                    </div>
                    <div className="feed-modal-title">{projectObj.name}</div>
                    {isLoading 
                        ? <div className="loader"></div>
                        : <React.Fragment>
                          {
                            errorMsg 
                                ? <div>{errorMsg}</div>
                                : <div>
                                    {feedsIds.map((link, i) => <Feed key={link ? `${link}-${i}` : i} link={link}/>)}
                                </div> 
                          }
                          </React.Fragment>
                    }    
                </div>
            </div>
        </div>
    )
}

export default FeedModal