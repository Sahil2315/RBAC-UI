import { useDispatch, useSelector } from "react-redux"
import { post } from '../types';
import { RootState } from "../data/store"
import { useRef, useEffect, RefObject, useState } from "react"
import senderSVG from "../assets/sender.svg"
import { addComment } from "../data/postSlice"
import deleteSVG from "../assets/deleteLogo.svg"

const PostMenu = ({mVisible, toggleMenu, currPost, permissions}: {mVisible: boolean, toggleMenu: (visible:boolean) => void, currPost: number, permissions: string[]}) => {
    let posts: post[] = useSelector((state: RootState) => state.posts)
    let centerRef = useRef<HTMLDivElement>(null)
    function outsideClicker(ref: RefObject<HTMLDivElement>) {
        useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
              toggleMenu(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    outsideClicker(centerRef)
    let [newComment, setNewComment] = useState("")
    let dispatchComment = useDispatch()
    function SubmitComment(){
        setNewComment("")
        dispatchComment(addComment({
            'index': currPost,
            'content': newComment
        }))
    }
  return (
    <div className={`absolute cursor-pointer w-full h-full top-0 bg-white flex justify-center items-center bg-opacity-30 left-0 backdrop-blur-lg z-20 ${mVisible ? '' : 'hidden'}`}>
        <div ref={centerRef} className="bg-indigo-100 cursor-normal h-[900px] overflow-y-auto rounded-lg flex flex-col px-20 py-20">
            <img className="h-[600px] w-[600px] rounded-lg" src={posts[currPost].src} alt={posts[currPost].caption} />
            <span className="mt-2 text-2xl font-semibold ml-2">{posts[currPost].caption}</span>
            <div className="ml-2 flex flex-col">
                {
                    permissions.includes("Comment") ? 
                    <div className="flex flex-row mt-4">
                        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" className="rounded py-1 px-2 flex-1" placeholder="Enter Comment Here" />
                        <button onClick={SubmitComment} className="ml-1 p-1 bg-amber-200 rounded-lg hover:bg-orange-300"><img src={senderSVG} className="h-[30px]" alt="Send" /></button>
                    </div>:
                    <div />
                }
                <span className="mt-4 text-xl">Comments:</span>
                {
                    posts[currPost].comments.map((comment, index) => {
                        return(
                            <div key={index} className="flex pr-[40px] relative flex-col mt-2">
                                <button className={`absolute right-0 opacity-30 hover:opacity-100 ${permissions.includes("Edit") ? '' : 'hidden'}`}>
                                    <img src={deleteSVG} className="w-[35px]" alt="delete" />
                                </button>
                                <span className="text-sm">{comment.writer}</span>
                                <span className="text-lg">{comment.content}</span>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    </div>
  )
}

export default PostMenu