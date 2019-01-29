<template>
  <div>
    <Table stripe :columns="adminsListTitle" :data="adminList">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑信息</Button>
        <Button type="warning" size="small" style="margin-right: 5px" @click="show(index)">修改密码</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Page :total="totalNum" :page-size="pagesize" :style="{margin:'20px 0'}" @on-change="getAdminMenuList"/>
  </div>
</template>

<script>
import { getAdminList } from '@/api/data'
export default {
  name: 'manage_admin',
  data () {
    return {
      modalVisible: false,
      pagesize: 10,
      totalNum: 0,
      adminList: [],
      adminsListTitle: [
        {
          title: '管理员ID',
          key: 'id'
        },
        {
          title: '登录名',
          key: 'login_name'
        },
        {
          title: '管理员名',
          key: 'name'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    getAdminMenuList (pageNum) {
      const vm = this
      return getAdminList(pageNum, vm.pagesize)
        .then((res) => {
          vm.showList(res.data.data)
        })
    },
    showList (info) {
      const vm = this
      vm.totalNum = info.adminCountTotal
      vm.adminList = info.adminList
    }
  },
  created () {
    this.getAdminMenuList(1)
  },
  activated () {
    this.getAdminMenuList(1)
  }
}
</script>
