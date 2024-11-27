import { useState } from "react"
import Posts from "./Posts"
import Members1 from "./Members1"
import Roles from "./Roles"

const RPM = ({memPermit, postPermit}: {memPermit: string[], postPermit: string[]}) => {
    let [currPage, setPage] = useState(0)
  return (
    <div className="mt-20 mb-12 h-full w-full">
        <div className="flex flex-row w-full justify-center">
            <button onClick={() => setPage(0)} className={`px-8 py-2 text-2xl border-slate-400 ${currPage == 0 ? 'border-b-4' : ''}`}>Posts</button>
            <button onClick={() => setPage(1)} className={`border-l-2 py-2 px-8 border-slate-400 text-2xl ${currPage == 1 ? 'border-b-4' : ''}`}>Members</button>
            <button onClick={() => setPage(2)} className={`border-l-2 py-2 px-8 border-slate-400 text-2xl ${currPage == 2 ? 'border-b-4' : ''}`}>Roles</button>
        </div>
        <div className={currPage == 0 ? '': 'hidden'}>
            <Posts permissions={postPermit} />
        </div>
        <div className={currPage == 1 ? '': 'hidden'}>
            <Members1 permissions={memPermit} />
        </div>
        <div className={currPage == 2 ? '': 'hidden'}>
            <Roles permissions={memPermit} />
        </div>
    </div>
  )
}

export default RPM