const initState = {
    selectedProject: null,
    entities: {
        projects: {byId:{},allIds:[]}
    },
    ui: {
        isLoading : true,
        showCreate: false
    }    
}

const getNextProjects = projects => {
    let byId = {}
    let allIds = []
    projects.forEach((obj) => {
        byId[obj.uid] = obj
        allIds.push(obj.uid)
    })
    return {byId, allIds}
}

const getProjectsAfterDeletion = (uid, projects) => {
    let byId = {...projects.byId}
    let allIds = [...projects.allIds]
    delete byId[uid]
    allIds.splice(allIds.indexOf(uid),1)
    return {byId,allIds}
}

const homeReducer = (state = initState, action) => {
    switch(action.type) {
        case "HOME/GET_PROJECTS_API_STARTED":
            return {
                ...state, 
                ui: {
                    ...state.ui,
                    isLoading: true
                }
            }
        case "HOME/GET_PROJECTS_API_SUCCEED":
            let nextProjects = getNextProjects([...action.data])
            return {
                ...state, 
                entities: {
                    ...state.entities,
                    projects: {
                        ...state.entities.projects,
                        ...nextProjects
                    }
                },
                ui: {
                    ...state.ui,
                    isLoading: false,
                    showCreate: false 
                }
            }
        case "HOME/GET_PROJECTS_API_FAILED":
            return {
                ...state, 
                ui: {
                    ...state.ui,
                    isLoading: false 
                }
            }
        case "CREATE/CREATE_MODAL_OUTSIDE_CLICK":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showCreate: false
                }
            }
            
        case "HOME/OPEN_CREATE_BTN_CLICKED":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showCreate: true
                }
            }
            
        case "HOME/VIEW_PRO_BTN_CLICKED":
            return {
                ...state,
                selectedProject: action.uid
            }
            
        case "HOME/PROJECT_DELETED":
            let projectsAfterDeletion = getProjectsAfterDeletion(action.uid, {...state.entities.projects})
            return {
                ...state,
                entities: {
                    ...state.entities,
                    projects: {
                        ...state.entities.projects,
                        byId: {
                            ...state.entities.projects.byId,
                            ...projectsAfterDeletion.byId
                        },
                        allIds: [...projectsAfterDeletion.allIds]
                    }
                }
            }
            
        case "FEED/FEED_MODAL_OUTSIDE_CLICK":
            return {
                ...state,
                selectedProject: null
            }
            
        default:
            return state
    }
}

export default homeReducer