import { useSelector } from "react-redux";
import randomImg from "../data/postimages/img1.jpg"
import { post } from '../types';
import { RootState } from "../data/store";
import PostMenu from "./PostMenu";
import { useState, useEffect } from "react";

const Posts = ({permissions}: {permissions: string[]}) => {
  let posts: post[] = useSelector((state: RootState) => state.posts)
    useEffect(() => {
      localStorage.setItem('posts-local', JSON.stringify(posts))
  }, [posts])
  let [mVisible, toggleMenu] = useState(false)
  let [currPost, setCurrPost] = useState(0)
  console.log(randomImg)
  return (
    <div className="h-full mx-56 mt-16 overflow-y-auto ">
      <span className="ml-12 text-2xl border-b-2 text-center">Posts:</span>
      <div className="flex flex-col m-8">
        {
          posts.map((post, index) => {
            return(
              <button onClick={() => {
                setCurrPost(index)
                toggleMenu(true)
              }} key={index} className="flex flex-row m-2 p-4 border-2 rounded-lg outline-none border-indigo-200 hover:drop-shadow-md hover:bg-neutral-50">
                <img className="h-[200px] rounded-lg" src={post.src} alt={post.caption} />
                <div className="ml-16 h-full flex flex-col items-start">
                  <span className="mt-8 text-2xl">{post.caption}</span>
                  <span className="mt-4 text-xl">Posted By User101</span>
                  <span className="mt-2 text-xl">{post.comments.length} Comments</span>
                </div>
                <div className="flex flex-col mt-8 ml-8 border-l-2 pl-8 items-start justify-center">
                  <span className="text-xl mb-2">Comments:</span>
                  {
                    post.comments.map((comment, cindex) => {
                      if(cindex < 2){
                        return(
                          <div key={cindex} className="flex items-start flex-col mt-2">
                            <span className="text-xs">{comment.writer}</span>
                            <span>{comment.content}</span>
                          </div>
                        )
                      }
                    })
                  }
                  <span>...</span>
                </div>
              </button>
            )
          })
        }
      </div>
      <PostMenu permissions={permissions} mVisible={mVisible} toggleMenu={toggleMenu} currPost={currPost} />
    </div>
  )
}

export default Posts