import { useState } from 'react';
import Comment from './components/Comment';

import { useGlobalContext } from './helpers/context';
import './index.css'

function App() {
  const {currentUser,comments,addComment,stateID} = useGlobalContext()

  const [comment,setComment] = useState("")
  return (
      <div className = "container  mx-auto py-6 text-sm sm:text-lg">
        <div className='w-5/6 mx-auto'>
          {
            comments.map(commentElement => {
                return (
                    <Comment key={commentElement.id} {...commentElement} {...currentUser} setComment={setComment} comment={comment}/>
                )
            })
          }
        </div>
        <div className='w-5/6 sm:w-full mx-auto'>
          <input 
            value={comment} onChange={(e)=>{setComment(e.target.value)}} 
            className="px-3 h-16 w-full rounded-lg focus:outline-blue" type="text" placeholder="Add a comment"/> 
          <div className='flex justify-between mt-5'>
            <img  className="w-10" src = {currentUser.image.png} alt=""/>
            <button className='h-8 bg-blue font-bold uppercase text-white py-1 px-2 tracking-wide hover:cursor-pointer rounded-lg'
                  onClick={()=>{
                        setComment("")
                        addComment(comment,stateID)
                      }
                    }  >
              SEND
            </button>
          </div>
        </div>
      </div>
  );
}

export default App;
