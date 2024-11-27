import { useSelector } from "react-redux"
import { role } from "../types"
import { RootState } from "../data/store"

const Roles = ({permissions}: {permissions: string[]}) => {
  let roles: role[] = useSelector((state: RootState) => state.roles)
  return (
    <div className={permissions.includes("Roles") ? 'flex flex-col' : 'hidden'}>
      {
        roles.map((role, index) => {
          return(
            <span key={index}>{role.name}</span>
          )
        })
      }
    </div>
  )
}

export default Roles