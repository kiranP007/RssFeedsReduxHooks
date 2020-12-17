import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProjectThumbnail from './ProjectThumbnail'
import { openCreateBtnClicked } from "../../actions/homeActions"
import Button from '../common/Button'

function ProjectDashboard() {
    const projectsIds = useSelector(state => state.home.entities.projects.allIds)
    const dispatch = useDispatch()
    return (
        <div className="project-dashboard-container">
            <div className="create-project-thumbnail">
                <div>Create Project</div>
                <div className="create-button-container">
                    <Button handleClick={() => dispatch(openCreateBtnClicked())}>Create</Button>
                </div>
            </div>
            {projectsIds.map((uid, i) => <ProjectThumbnail key={uid ? `${uid}-${i}` : i} uid={uid} />)}
        </div>
    )
}

export default ProjectDashboard