
export const AuthLogin = (val) => {
    return({type:"LOGIN",value:val});
}

export const DelRow = (val) => {
    
    return({type:"DELETE",value:val});
}

export const ApiCall = () => {
    return({type:"APICALL",value:1});
}
export const ApiCall_Topics = () => {
    return({type:"APICALL_TOPICS",value:1});
}
export const Topiclist = (val) => {
    return({type:"TOPIC_LIST",value:val});
}

export const UpdateRow = (val) => {
    return({type:"UPDATE",value:val});
}

export const Search = (val) => {
    return({type:"SEARCH",value:val});
}
export const Comments_Details = (val) => {
    return({type:"COMMENTS",value:val});
}
export const SubmitComments = (val) => {
    return({type:"COMMENTS_SUBMIT",value:val});
}
export const fetchCommets = (val) => {
    return({type:"FETCH_COMMENTS",value:val});
}