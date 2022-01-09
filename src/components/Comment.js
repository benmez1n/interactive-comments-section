import { useRef, useState } from "react";
import { useGlobalContext } from "../helpers/context";
import Reply from "./Reply";

const Comment = ({id,content , createdAt , score , user,replies, image,username}) => {
    const { addReply , incrementScore , decrementScore } = useGlobalContext()

    const commentCont = useRef()
    const repliesCont = useRef()
    const replyInput = useRef()
    const  commentEdit = useRef()

    const [reply,setReply] = useState("")
    const [commentEdited, setCommentEdited] = useState(content)
    const [ scoreState,setScore ] = useState(score)

    const handleClick = () => {
        setReply("")
        addReply(reply,id)
    }

    const handleEdit = () => {
        commentCont.current.classList.add("hidden")
        repliesCont.current.classList.add("hidden")
        commentEdit.current.classList.remove("hidden")
        commentEdit.current.classList.add("flex")
    }
    
    const handleEditSubmit = () => {
        commentCont.current.classList.remove("hidden")
        repliesCont.current.classList.remove("hidden")
        commentEdit.current.classList.add("hidden")
        commentEdit.current.classList.remove("flex")
    }


    return ( 
        <>
            <div ref={commentCont} className='bg-white mb-5 p-6 rounded-lg ' >
                <div>
                    <div className='flex items-center'>
                        <img className="w-8 h-8 sm:w-14 sm:h-14" src={user.image.png} alt={user.username}/>
                        <span className="mx-2 font-bold">{user.username}</span>
                        {username === user.username && <span className="h-5 px-1 mr-1 bg-blue text-white rounded-md sm:h-7 sm:px-2">
                            you
                        </span>}
                        <span className="text-gray-blue">{createdAt}</span>
                    </div>
                    <p className="text-gray-blue mt-3">{commentEdited}</p>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="flex justify-between place-items-center bg-gray-very-light w-24 px-3 py-2 rounded-lg">
                        <img className="w-3 h-3 hover:cursor-pointer" src="../images/icon-plus.svg" alt="score"
                            onClick={(e)=>{
                                if(e.target.classList.contains("incremented")){
                                    setScore(score)
                                }
                                else{
                                    setScore(incrementScore(scoreState))
                                }
                                e.target.classList.toggle("incremented")
                            }}/>
                        <span className="text-blue font-bold">{scoreState}</span>
                        <img  className="w-3 h-1 hover:cursor-pointer" src="../images/icon-minus.svg" alt="score"
                            onClick={(e)=>{
                                if(e.target.classList.contains("decremented")){
                                    setScore(score)
                                }
                                else{
                                    setScore(decrementScore(scoreState))
                                }
                                e.target.classList.toggle("decremented")
                            }}
                        />
                    </div>
                    <div className="flex">
                        {
                            username === user.username ? 
                                    <div className="flex place-items-center">
                                        <div className="flex mr-3 hover:cursor-pointer sm:mr-8 place-items-center"
                                           >
                                            <img className="h-4 mr-1 "src="../images/icon-delete.svg" alt=""/>
                                            <span className="text-red-soft font-semibold">Delete</span>
                                        </div>
                                        <div className="flex hover:cursor-pointer place-items-center" 
                                            onClick={()=>handleEdit()}>
                                            <img className="h-4 mr-1"src="../images/icon-edit.svg" alt=""/>
                                            <span className="text-blue font-semibold">Edit</span>
                                        </div>
                                    </div>
                                :
                                    <div className='flex font-bold text-blue py-2 hover:cursor-pointer'
                                        onClick={()=>replyInput.current.classList.toggle("hidden")}>
                                        <img className='w-5 mr-1' src="../images/icon-Reply.svg" alt=""/>
                                        Reply
                                    </div>
                        }
                    </div>
                </div>
            </div>
            <div ref={repliesCont} className="border-l-2 border-gray-light pl-3 sm:pl-14">
                {
                    username !== user.username && 
                    <div ref={replyInput} className={`hidden justify-between mb-4 flex`}>
                        <img className="w-8 h-8 sm:w-12 sm:h-12" src={image.png} alt=""/>
                        <input 
                            value={reply} onChange={(e)=>setReply(e.target.value)}
                            className="px-3 h-14 rounded-lg focus:outline-blue sm:w-5/6" 
                            type="text" placeholder="Add a Reply"/> 
                        <button className="h-8 bg-blue font-bold text-white py-1 px-2 tracking-wide hover:cursor-pointer rounded-lg 
                                            sm:h-12 sm:px-3"
                                onClick={()=>handleClick()}>
                            Reply
                        </button>             
                    </div>
                }
                {replies.length > 0 && 
                    replies.map(reply => {
                        return (
                            <Reply key={reply.id} {...reply} image={image} username={username} />
                        )
                    })
                }
            </div>
            {
                username === user.username && 
                <div ref={commentEdit} className="hidden justify-between mb-4 ">
                    <img className="w-8 h-8 sm:w-12 sm:h-12" src={image.png} alt=""/>
                    <input 
                        value={commentEdited} onChange={(e)=>setCommentEdited(e.target.value)}
                        className="px-3 h-14 rounded-lg focus:outline-blue sm:w-5/6" 
                        type="text" placeholder="Add a Reply"/> 
                    <button className="h-8 bg-blue font-bold text-white py-1 px-2 tracking-wide hover:cursor-pointer rounded-lg
                                        sm:h-12 sm:px-3"
                            onClick={()=>handleEditSubmit()}>
                        Update
                    </button>  
                </div>
            }
        </>
     );
}
 
export default Comment;