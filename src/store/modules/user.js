import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    // token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    avatar404: '',
    roles: [],
    userlists: [],
    usertype: '',
    avatartype: [
      {
        'type': '省公司管理',
        'avatar': 'avatar3.png'
      },{
        'type': '市公司管理',
        'avatar': 'avatar2.png'
      },{
        'type': '施工',
        'avatar': 'avatar1.png'
      },{
        'type': '监理',
        'avatar': 'avatar1.png'

      },{
        'type': '业主',
        'avatar': 'avatar1.png'
      }
    ]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // xia
    SET_TYPE: (state, type) => {
      state.usertype = type
    },
    SET_USERLIST: (state, userlist) => {
      state.userlists[0] = userlist
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
         
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // xiaxia
    // 获取用户信息
    GetuserInfo ({ commit, state}) {
      const data = JSON.parse(localStorage.getItem('user'))
      commit('SET_TYPE', data.userType)
      commit('SET_USERLIST', data)
      commit('SET_NAME', data.userName)
      let avatar = null;
      let dataurl = data.archives_photo_ur
      if(dataurl) {
        avatar= 'tianyujia/ArchivesAction!downloadFile.action?gspw_archives.archives_photo_ur=' + dataurl
      }else {
        avatar = ''
      }
      commit('SET_AVATAR', avatar)
    },
    // xiaxia

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
