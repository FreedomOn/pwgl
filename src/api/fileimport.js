import qs from 'qs'
import request from '@/utils/request'

// 查询市公司
export const xiaxia = (user_orgCode, userType, user_orgname,checkType) => {
    // 查询部门
    //  let that = this
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'tianyujia/ArchivesAction!getFirstOrg.action',
       data: qs.stringify({'userOrg': user_orgCode,'userType':userType, 'userOrgName': user_orgname,'checkType': checkType})
     })
       .then((res) => {
       
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
  }