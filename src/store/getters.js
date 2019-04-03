const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  avatartype: state => state.user.avatartype,
  name: state => state.user.name,
  roles: state => state.user.roles,
  routes: state => state.app.routers,
  userlist: state => state.user.userlists,
  usertype: state => state.user.usertype,
  addRouters: state => state.app.addRouters
}
export default getters
