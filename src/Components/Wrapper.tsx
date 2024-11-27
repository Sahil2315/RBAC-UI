import { useSelector } from "react-redux"
import { role } from "../types"
import { RootState } from "../data/store"
import Welcome from "./Welcome"
import Posts from "./Posts"
import PostsandMembers from "./PostsandMembers"
import RPM from "./RPM"

const Wrapper = ({currRole, setRole}: {currRole: number, setRole: (role: number) => void}) => {
  let roles: role[] = useSelector((state: RootState) => state.roles)
  if(roles[currRole].member_permissions.length == 0 && roles[currRole].post_permissions.length == 0 ){
    return(
      <Welcome setRole={setRole}/>
    )
  }
  if(roles[currRole].member_permissions.length == 0 ){
    return <Posts permissions={roles[currRole].post_permissions} />
  }
  if(roles[currRole].member_permissions.length > 0 && roles[currRole].member_permissions[0] == "Contributors"){
    return <PostsandMembers memPermit = {roles[currRole].member_permissions} postPermit = {roles[currRole].post_permissions} />
  }
  if(roles[currRole].member_permissions.length > 0 && roles[currRole].member_permissions.includes("Roles")){
    return <RPM memPermit = {roles[currRole].member_permissions} postPermit = {roles[currRole].post_permissions} />
  }
}

export default Wrapper