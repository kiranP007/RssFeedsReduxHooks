export const feedModalOutsideClick = () => ({
    type: "FEED/FEED_MODAL_OUTSIDE_CLICK"
})

export const rssFeedsReceived = (feedsArr) => ({
    type: "FEED/RSS_FEEDS_RECEIVED",
    feedsArr
})

export const rssFeedParsingFailed = (error) => ({
    type: "FEED/RSS_FEED_PARSING_FAILED",
    error
})

export const refreshBtnClicked = () => ({
    type: "FEED/REFRESH_BTN_CLICKED"
})