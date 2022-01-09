import moment from 'moment';
export const reducer = (state,action) => {
    const comments = state.comments
    const {image , username } = state.currentUser
    if(action.type === "ADD_COMMENT"){
        if(action.payload.value === ""){
            return {
                ...state,
            }
        }
        else{
            return {
                ...state,
                comments:[
                    ...comments,
                    {
                        id:state.stateID+1,
                        content:action.payload.value,
                        createdAt:moment().startOf(new Date().now).fromNow(),
                        score:0,
                        user:{
                            image:{png:image.png},
                            username:username
                        },
                        replies:[]
                    }
                ],
                stateID:state.stateID+1
            }
        }
    }

    else if(action.type === "ADD_REPLY"){
        
        if(action.payload.value === ""){
            return {
                ...state,
            }
        }
        else{
            const tempComment = comments.map(comment => {
                if(action.payload.id === comment.id){
                    return {...comment,
                        replies:[...comment.replies,{
                            id: state.stateID+1,
                            content:action.payload.value,
                            createdAt:moment().startOf(new Date().now).fromNow(),
                            score:0,
                            replyingTo:comment.user.username,
                            user:{
                                image:{
                                    png:image.png,
                                    webp:"",
                                },
                                username:username
                                }
                            }
                        ]
                    }
                }
                else{
                    return {...comment}
                }
            })
            return {
                ...state,
                comments:[...tempComment],
                stateID:state.stateID+1
            }
        }
    }

    else if(action.type === "ADD_TO_REPLY"){
        if(action.payload.value === ""){
            return {
                ...state,
            }
        }
        else{
        let reply
        const tempComment = comments.map(comment => {
            if(comment.replies.length > 0 ) {
                reply = comment.replies.filter(reply=> reply.id === action.payload.id)
                if(action.payload.id === reply[0].id){
                    return {...comment,
                        replies:[...comment.replies,{
                            id: state.stateID+1,
                            content:action.payload.value,
                            createdAt:moment().startOf(new Date().now).fromNow(),
                            score:0,
                            replyingTo:reply[0].user.username,
                            user:{
                                image:{
                                    png:image.png,
                                    webp:"",
                                },
                                username:username
                                }
                            }
                        ]
                    }
                }
                else{
                    return {...comment}
                }
            }
            else{
                return {...comment}
            }
        })
        return {
            ...state,
            comments:[...tempComment],
            stateID:state.stateID+1
            }
        }
    }

    // else if (action.payload.type === "DELETE_COMMENT"){

    // }
}