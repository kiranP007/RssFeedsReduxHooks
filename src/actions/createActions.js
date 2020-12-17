import { ServerPath } from "../constants/common"
import { postData } from "../utils/serviceUtils"
import { homeComponentMounted } from "./homeActions"
import { createModalErrObj } from "../constants/errorMessages/create"

export const createModalOutsideClick = () => ({
    type: "CREATE/CREATE_MODAL_OUTSIDE_CLICK"
})

export const createFormFailed = error => ({
    type: "CREATE/CREATE_FORM_FAILED",
    error
})

export const rssLinkValidated = (name, link) => {
    return (dispatch) => {
        let url = `${ServerPath}/projects/create`
        let params = {name, link}
        const successFunc = response => {
            if(response.data.error) {
                dispatch(createFormFailed(createModalErrObj.somethingWentWrong))
            } else {
                dispatch(homeComponentMounted())
            }
        }
        const errFunc = err => {
            dispatch(createFormFailed(createModalErrObj.somethingWentWrong))
        }
        postData(url,params,successFunc,errFunc)
    }
}