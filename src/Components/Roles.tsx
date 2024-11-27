import { useSelector } from "react-redux"
import { role } from "../types"
import { RootState } from "../data/store"

const Roles = ({permissions}: {permissions: string[]}) => {
  let roles: role[] = useSelector((state: RootState) => state.roles)
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
                  <span className="text-xl">Member Permissions</span>
                  <div className="flex flex-row">
                    { role.member_permissions.length ? 
                      role.member_permissions.map((permit, innindex) => {
                        return(
                          <span className="text-lg ml-4" key={innindex}>{permit}</span>
                        )
                      }) : 
                      <div className="text-lg ml-4">None</div>
                    }
                  </div>
                  <span className="text-xl">Post Permissions</span>
                  <div className="flex flex-row">
                    { role.post_permissions.length ?
                      role.post_permissions.map((permit, innindex) => {
                        return(
                          <span className="text-lg ml-4" key={innindex}>{permit}</span>
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
      
    </div>
  )
}

export default Roles