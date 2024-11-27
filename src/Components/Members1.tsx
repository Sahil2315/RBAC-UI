import { useDispatch, useSelector } from "react-redux"
import { member } from "../types"
import { RootState } from "../data/store"
import { useEffect } from "react"
import minusLogo from "../assets/minusLogo.svg"
import plusLogo from "../assets/pluslogo.svg"
import { addContributor, addModerator, deleteContributor, deleteMember } from "../data/memberSlice"

const Members1 = ({permissions}: {permissions: string[]}) => {
  let members: member[] = useSelector((state: RootState) => state.members)
  useEffect(() => {
    localStorage.setItem("members-local", JSON.stringify(members))
  }, [members])
  let dispatchMembers = useDispatch()
  function removeContributor(index: number){
    if(confirm("Please Confirm your Action")) {
      dispatchMembers(deleteContributor(index))
    }
  }
  function promoteContributor(index: number){
    if(confirm("Please Confirm your Action")){
      dispatchMembers(addContributor(index))
    }
  }
  function promoteModerator(index: number){
    if(confirm("Please Confirm your Action")){
      dispatchMembers(addModerator(index))
    }
  }
  function removeMember(index: number){
    if(confirm("Please Confirm your Action")){
      dispatchMembers(deleteMember(index))
    }
  }
  return (
    <div className="flex flex-col overflow-y-auto h-full w-full items-center">
      <div className={permissions.includes("Members") ? 'flex flex-col' : 'hidden'}>
        <span className="mt-12 text-2xl">Moderators:</span>
          {
            members.map((member, index) => {
              if(member.role == "Moderator"){
                return (
                  <div key={index} className="flex w-[450px] text-xl relative flex-row bg-slate-100 px-12 py-2 mt-4">
                    <span>{member.name}</span>
                    <span className={`ml-16 ${member.status == "Active" ? 'text-green-400' : 'text-slate-400'}`}>{member.status}</span>
                    <button onClick={() => promoteContributor(index)} className={permissions.includes("Contributors") ? 'absolute right-2 top-2 opacity-40 hover:opacity-80 flex flex-row items-center' : 'hidden'}>
                      <span className="text-sm text-rose-400">Demote</span>
                      <img className="w-[30px]" src={minusLogo} alt="remove" />
                    </button>
                  </div>
                )
              }
            })
          }
      </div>
      <div className={permissions.includes("Contributors") ? 'flex flex-col' : 'hidden'}>
        <span className="mt-12 text-2xl">Contributors:</span>
        {
          members.map((member, index) => {
            if(member.role == "Contributor"){
              return (
                <div key={index} className="flex w-[550px] text-xl relative flex-row bg-slate-100 px-12 py-2 mt-4">
                  <span>{member.name}</span>
                  <span className={`ml-16 ${member.status == "Active" ? 'text-green-400' : 'text-slate-400'}`}>{member.status}</span>
                  <button onClick={() => promoteModerator(index)} className={permissions.includes("Contributors") ? 'absolute right-2 top-2 opacity-40 hover:opacity-80 flex flex-row items-center' : 'hidden'}>
                    <span className="text-emerald-400 text-sm">Promote</span>
                    <img className="w-[30px]" src={plusLogo} alt="prmote" />
                  </button>
                  <button onClick={() => removeContributor(index)} className={permissions.includes("Contributors") ? 'absolute right-[100px] top-2 opacity-40 hover:opacity-80 flex flex-row items-center' : 'hidden'}>
                    <span className="text-sm text-rose-400">Demote</span>
                    <img className="w-[30px]" src={minusLogo} alt="remove" />
                  </button>
                </div>
              )
            }
          })
        }
        <span className="mt-12 text-2xl">Non Contributors:</span>
        {
          members.map((member, index) => {
            if(member.role == "Member"){
              return (
                <div key={index} className="flex w-[550px] text-xl relative flex-row bg-slate-100 px-12 py-2 mt-4">
                  <span>{member.name}</span>
                  <span className={`ml-16 ${member.status == "Active" ? 'text-green-400' : 'text-slate-400'}`}>{member.status}</span>
                  <button onClick={() => promoteContributor(index)} className={permissions.includes("Contributors") ? 'absolute right-2 top-2 opacity-40 hover:opacity-80 flex flex-row items-center' : 'hidden'}>
                    <span className="text-emerald-400 text-sm">Promote</span>
                    <img className="w-[30px]" src={plusLogo} alt="prmote" />
                  </button>
                  <button onClick={() => removeMember(index)} className={permissions.includes("Members") ? 'absolute right-[100px] top-2 opacity-40 hover:opacity-80 flex flex-row items-center' : 'hidden'}>
                    <span className="text-rose-400 text-sm">Remove</span>
                    <img className="w-[30px]" src={minusLogo} alt="prmote" />
                  </button>
                </div>
              )
            }
          })
        }
      </div>
      <div className={permissions.includes("Members") ? 'flex flex-col' : 'hidden'}>
        <span className="mt-12 text-2xl">Non Members:</span>
          {
            members.map((member, index) => {
              if(member.role == "User"){
                return (
                  <div key={index} className="flex w-[450px] text-xl relative flex-row bg-slate-100 px-12 py-2 mt-4">
                    <span>{member.name}</span>
                    <span className={`ml-16 ${member.status == "Active" ? 'text-green-400' : 'text-slate-400'}`}>{member.status}</span>
                    <button onClick={() => removeContributor(index)} className={permissions.includes("Members") ? 'absolute right-2 top-2 flex flex-row items-center opacity-40 hover:opacity-80' : 'hidden'}>
                      <span className="text-emerald-500">Add</span>
                      <img className="w-[30px]" src={plusLogo} alt="remove" />
                    </button>
                  </div>
                )
              }
            })
          }
      </div>
    </div>
  )
}

export default Members1