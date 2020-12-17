const initState = {
    entities: {
        feeds: {byId:{},allIds:[]}
    },
    ui: {
        isLoading: true,
        error: "",
        refresh: 0,
    }
}

const getNextFeeds = feedsArr => {
    let byId = {}
    let allIds = []
    feedsArr.forEach((obj) => {
        byId[obj.link] = obj
        allIds.push(obj.link)
    })
    return {byId, allIds}
}

const feedReducer = (state = initState, action) => {
    switch(action.type) {
        case "FEED/RSS_FEEDS_RECEIVED":
            let nextFeeds = getNextFeeds(action.feedsArr)
            return {
                ...state,
                entities: {
                    ...state.entities,
                    feeds: {
                        ...state.entities.feeds,
                        byId: {
                            ...state.entities.feeds.byId,
                            ...nextFeeds.byId
                        },
                        allIds: [...nextFeeds.allIds]
                    }
                },
                ui: {
                    ...state.ui,
                    isLoading: false,
                    error: ""
                }
            }
        case "HOME/VIEW_PRO_BTN_CLICKED":
        case "FEED/FEED_MODAL_OUTSIDE_CLICK":
            return {
                ...state,
                ...initState,
            }
        case "FEED/RSS_FEED_PARSING_FAILED":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isLoading: false,
                    error: action.error
                }
            }
        case "FEED/REFRESH_BTN_CLICKED":
            return {
                ...state,
                entities: {
                    ...state.entities,
                    feeds: {
                        ...state.entities.feeds,
                        byId:{}, 
                        allIds: []
                    }
                },
                ui: {
                    ...state.ui,
                    isLoading: true,
                    error: "",
                    refresh: state.ui.refresh + 1,
                }
            }
        default:
            return state
    }
}

export default feedReducer