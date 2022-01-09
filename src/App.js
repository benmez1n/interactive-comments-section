import { useState } from 'react';
import Comment from './components/Comment';

import { useGlobalContext } from './helpers/context';
import './index.css'

function App() {
  const {currentUser,comments,addComment,stateID} = useGlobalContext()

  const [comment,setComment] = useState("")

  const handleSend  = ()=> {
    setComment("")
    addComment(comment,stateID)
  }
  const handleChange = (e) => {
    setComment(e.target.value)
  }
  return (
      <div className = "container  mx-auto py-6 text-sm sm:text-lg">
        <div className='w-5/6 mx-auto'>
          {
            comments.map(commentElement => {
                return (
                    <Comment key={commentElement.id} {...commentElement} {...currentUser}/>
                )
            })
          }
        </div>
        <div className='w-5/6 mt-20 bg-white p-3 sm:p-8  mx-auto'>
          <input 
            value={comment} onChange={(e)=>{handleChange(e)}} 
            className="px-3 h-16 w-full rounded-lg focus:outline-blue border border-gray-blue" 
            type="text" placeholder="Add a comment"/> 
          <div className='flex justify-between mt-5'>
            <img  className="w-10 sm:w-14" src = {currentUser.image.png} alt=""/>
            <button className='h-8 sm:h-12  bg-blue font-bold uppercase text-white py-1 sm:py-2 sm:px-4 px-2 tracking-wide hover:cursor-pointer rounded-lg'
                  onClick={()=>handleSend()}  >
              SEND
            </button>
          </div>
        </div>
      </div>
  );
}

export default App;
