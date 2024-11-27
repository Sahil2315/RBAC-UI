import { useDispatch, useSelector } from "react-redux"
import { role } from "../types"
import { RootState } from "../data/store"
import minusLogo from "../assets/minusLogo.svg"
import plusLogo from "../assets/pluslogo.svg"
import { addPermission, deleteMembPerm, deletePostPerm } from "../data/roleSlice"
import { useState } from "react"

const Roles = ({permissions}: {permissions: string[]}) => {
  let roles: role[] = useSelector((state: RootState) => state.roles)
  let roleDispatch = useDispatch()
  function removeMemberPermit(index: number, innerIndex: number){
    if(confirm("Confirm Deletion of Permission for the Role")){
      roleDispatch(deleteMembPerm({
        'outer': index,
        'inner': innerIndex
      }))
    }
  }
  function removePostPermit(index: number, innerIndex: number){
    if(confirm("Confirm Deletion of Permission for the Role")){
      roleDispatch(deletePostPerm({
        'outer': index,
        'inner': innerIndex
      }))
    }
  }
  function addPermit(permit: string, type: string, index: number){
    if(confirm("Confirm Adding Permission for the Role")){
      roleDispatch(addPermission({
        permit: permit,
        type: type,
        index: index
      }))
      toggleOverlay(false)
    }
  }
  let [overlay, toggleOverlay] = useState(false)
  let [currPermit, setCurrPermit] = useState({
    "type": "member",
    "index": 0
  })
  let maxMemberPermit = ["Members", "Roles", "Contributors"]
  let maxPostPermit = ["Create", "Delete", "Edit", "Comment", "Read"]
  return (
    <div className={permissions.includes("Roles") ? 'flex flex-col mt-6 items-center' : 'hidden'}>
      <span className="text-2xl pb-2 border-b-2">Roles: </span>
      {
        roles.map((role, index) => {
          return(
            <div className="border mt-4 p-8 rounded-lg border-indigo-200" key={index}>
              <div className="flex flex-row items-center">
                <span className="text-xl w-[120px] border-r-2 border-slate-300">{role.name}</span>
                <div className="flex flex-col ml-16 w-[550px]">
                  <div className="flex flex-row items-center">
                    <span className="text-xl w-[210px]">Member Permissions</span>
                    <button onClick={() => {
                      setCurrPermit({"type": "member", "index": index})
                      toggleOverlay(true)
                    }} className="flex flex-row ml-12 items-center opacity-40 hover:opacity-90">
                      <span className="text-sm text-emerald-500">Add</span>
                      <img src={plusLogo} alt="add" className="w-[25px] ml-1"/>
                    </button>
                  </div>
                  <div className="flex flex-row mt-2">
                    { role.member_permissions.length ? 
                      role.member_permissions.map((permit, innindex) => {
                        return(
                          <div className="text-lg ml-4 flex flex-row items-center" key={innindex}>
                            <span>{permit}</span>
                            <button onClick={() => {removeMemberPermit(index, innindex)}}><img src={minusLogo} alt="remove" className="w-[25px] ml-1 opacity-35 hover:opacity-70" /></button>
                          </div>
                        )
                      }) : 
                      <div className="text-lg ml-4">None</div>
                    }
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="text-xl w-[210px] mt-4">Post Permissions</span>
                    <button onClick={() => {
                      setCurrPermit({"type": "post", "index": index})
                      toggleOverlay(true)
                    }} className="flex flex-row ml-12 mt-4 items-center opacity-40 hover:opacity-90">
                      <span className="text-sm text-emerald-500">Add</span>        
                      <img src={plusLogo} alt="add" className="w-[25px] ml-1"/>
                    </button>
                  </div>
                  <div className="flex flex-row mt-2">
                    { role.post_permissions.length ?
                      role.post_permissions.map((permit, innindex) => {
                        return(
                          <div className="text-lg ml-4 flex flex-row items-center" key={innindex}>
                            <span>{permit}</span>
                            <button onClick={() => {removePostPermit(index, innindex)}}><img src={minusLogo} alt="remove" className="w-[25px] ml-1 opacity-35 hover:opacity-70" /></button>
                          </div>
                        )
                      }):
                      <div className="text-lg ml-4">None</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    <div className={`w-full h-full backdrop-blur flex justify-center items-center fixed top-0 left-0 z-30 ${overlay ? '': 'hidden'}`}>
      <div className="bg-slate-300 relative p-24 rounded-lg ">
        <button className="absolute top-2 right-2 opacity-50 hover:opacity-90" onClick={() => toggleOverlay(false)}><img src={minusLogo} className="w-[40px]" alt="close" /></button>
        <span>Remaining Permissions:</span>
        {
          currPermit.type == "member" ? 
          maxMemberPermit.map((permit, index) => {
            if(!roles[currPermit.index].member_permissions.includes(permit)){
              return(
                <button className="ml-4 bg-indigo-500 py-1 px-4 text-white opacity-60 hover:opacity-100" key={index} onClick={() => addPermit(permit, "member", currPermit.index)}>
                  {permit}
                </button>
              )
            }
          }):
          maxPostPermit.map((permit, index) => {
            if(!roles[currPermit.index].post_permissions.includes(permit)){
              return(
                <button className="ml-4 bg-indigo-500 py-1 px-4 text-white opacity-60 hover:opacity-100" key={index} onClick={() => addPermit(permit, "post", currPermit.index)}>
                  {permit}
                </button>
              )
            }
          })

        }
      </div>
    </div>
    </div>
  )
}

export default Roles