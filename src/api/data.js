import axios from '@/libs/api.request'

// 获取管理员列表
export const getAdminList = (pageNum, limit) => {
  return axios.request({
    url: `getAdminList/${limit}/${pageNum}`,
    method: `get`
  })
}

// 编辑管理员资料
export const editAdmin = (adminInfo) => {
  return axios.request({
    url: `editAdmin`,
    method: `patch`,
    data: adminInfo
  })
}

// 修改管理员密码
export const changePassWord = (changePassObj) => {
  return axios.request({
    url: `changeAdminPassword`,
    method: `patch`,
    data: changePassObj
  })
}

// 删除管理员
export const deleteAdmin = (aid) => {
  return axios.request({
    url: `delAdmin/${aid}`,
    method: `delete`
  })
}

// 新增管理员
export const addAdmin = (addAdminObj) => {
  return axios.request({
    url: `addAdmin`,
    method: `put`,
    data: addAdminObj
  })
}

// 获取考试分类
export const getExamCategoryList = () => {
  return axios.request({
    url: `/getExamCategoryList`,
    method: `get`
  })
}

// 新增考试分类
export const addExamCategory = (addExamCategoryInfo) => {
  return axios.request({
    url: `/addExamCategory`,
    method: `put`,
    data: addExamCategoryInfo
  })
}

// 删除考试分类
export const deleteCategory = (categoryId) => {
  return axios.request({
    url: `/delExamCategory/${categoryId}`,
    method: `delete`
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
