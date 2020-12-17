import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../common/Button'
import {viewProBtnClicked, deleteIconClicked} from "../../actions/homeActions" 

function ProjectThumbnail({uid}) {
    const projectObj = useSelector(state => state.home.entities.projects.byId[uid])
    const dispatch = useDispatch()

    return (
        <div className="project-thumbnail-container">
            <div className="delete-icon" onClick={() => dispatch(deleteIconClicked(uid))}><span className="material-icons">delete_outline</span></div>
            <span className="ellipsis inline-block thumbail-title">{projectObj.name}</span>
            <div className="view-button-container"><Button handleClick={() => dispatch(viewProBtnClicked(uid))}>View</Button></div>
        </div>
    )
}

export default ProjectThumbnail