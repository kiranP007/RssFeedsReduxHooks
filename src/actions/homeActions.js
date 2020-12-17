import { ServerPath } from "../constants/common"
import { getData, deleteData } from "../utils/serviceUtils"

const getProjectsAPIStarted = () => ({
    type: "HOME/GET_PROJECTS_API_STARTED"
})

const getProjectsAPISucceed = data => ({
    type: "HOME/GET_PROJECTS_API_SUCCEED", 
    data
})

const getProjectsAPIFailed = () => ({
    type: "HOME/GET_PROJECTS_API_FAILED"
})

export const homeComponentMounted = () => {
    return (dispatch) => {
        dispatch(getProjectsAPIStarted())
        let url = `${ServerPath}/projects/list`
        const successFunc = response => {
            dispatch(getProjectsAPISucceed(response.data))
        }
        const errFunc = err => {
            dispatch(getProjectsAPIFailed())
            console.log(err)
        }
        getData(url, successFunc, errFunc)
    }
}

export const openCreateBtnClicked = () => ({
    type: "HOME/OPEN_CREATE_BTN_CLICKED"
})

export const viewProBtnClicked = uid => ({
    type: "HOME/VIEW_PRO_BTN_CLICKED",
    uid
})

const projectDeleted = uid => ({
    type: "HOME/PROJECT_DELETED",
    uid
})

export const deleteIconClicked = uid => {
    return (dispatch) => {
        let url = `${ServerPath}/projects/delete/${uid}`
        const successFunc = () => dispatch(projectDeleted(uid))
        const errFunc = (err) => console.log(err)
        deleteData(url,successFunc,errFunc)
    }
}