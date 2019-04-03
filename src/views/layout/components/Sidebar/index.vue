<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'routes'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    // isCollapse() {
    //   return !this.sidebar.opened
    // }
  }
}
</script>
