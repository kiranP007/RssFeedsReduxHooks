import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProjectDashboard from './ProjectsDashboard'
import './home.css'
import '../feed/feed.css'
import {homeComponentMounted} from "../../actions/homeActions"
import FeedModal from '../feed/FeedModal'
import CreateModal from '../create/createModal'

function Home() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.home.ui.isLoading)
    useEffect(() => {
        dispatch(homeComponentMounted())    
    }, [dispatch])

    const showCreate = useSelector(state => state.home.ui.showCreate)
    const selectedProject = useSelector(state => state.home.selectedProject)
    
    return (
    <div>
        <div className="home-title">RSS Projects</div>
        <div className="home-desc">RSS Projects lets you check current rss feeds so you can stay upto date with latest development.</div>
        {isLoading 
            ? <div className="loader"></div>
            : <React.Fragment>
                <ProjectDashboard />
                {selectedProject && <FeedModal />}
                {showCreate && <CreateModal />}
              </React.Fragment>}
    </div>
    )
}

export default Home