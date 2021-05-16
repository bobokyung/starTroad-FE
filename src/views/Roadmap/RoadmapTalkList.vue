<template>
  <b-container fluid>
    <b-card no-body>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  @current-change="handleCurrentChange"
                  :data="talkLists">
            <el-table-column label="ID"
                             min-width="50px"
                             prop="id">
                <template v-slot="{row}">
                  {{row.id}}
                </template>
            </el-table-column>
            <el-table-column label="TITLE"
                             prop="title"
                             min-width="200px">
                <template v-slot="{row}">
                  {{row.name}}
                </template>
            </el-table-column>

            <el-table-column label="AUTHOR"
                             min-width="100px"
                             prop="author">
                <template v-slot="{row}">
                  {{row.talkWriter}}
                </template>
            </el-table-column>

            <el-table-column label="Time" min-width="70px">
                <template v-slot="{row}">
                  {{row.created_at}}
                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
    <b-card class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoContents()">add</div>
    </b-card>
  </b-container>
</template>

<script>
import Api from '@/api/Api'
import moment from "moment";
import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
import projects from '@/views/Tables/projects'
import users from '@/views/Tables/users'
import LightTable from "@/views/Tables/RegularTables/LightTable";

export default {
  components : {
      LightTable,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
  },
  data () {
    return {
      roadmap_id : null,
      currentRow : null,
      currentPage : 1,
      talkLists :[]
    }
  },
  // watch : {

  // },
  methods: {
    fetch(){
      this.talkLists = []
      let id = this.roadmap_id
      Api.getTalkList(id)
      .then((res)=>{
        res.data.forEach((v, i) => {
          let created_at = new Date(v.created_at)
          v.created_at = moment(created_at).format("yyyy-MM-DD HH:mm:ss")
        })
        this.talkLists = res.data
      })
    },
    handleCurrentChange(val){
      this.currentRow = val
      let roadmap_id = this.roadmap_id
      let talk_id = this.currentRow.id

      this.$router.push({path:`/roadmap/${roadmap_id}/talk/${talk_id}`, 
      params : {talk_id : talk_id, roadmap_id : roadmap_id}})
    },
    gotoContents(){
      let roadmap_id = this.roadmap_id
      this.$router.push({path:`/roadmap/${roadmap_id}/talk/talk_add`, params : {roadmap_id}})
    }
  },
  
  computed: {

  },
  mounted() {
    this.roadmap_id = this.$route.fullPath.split('/').slice()[2]
    this.fetch()
  },
  created(){
    this.roadmap_id = this.$route.fullPath.split('/').slice()[2]
    //this.fetch()
  }
  
};
</script>

<style lang="scss" scoped>
.el-table.table-dark{
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr{
  background-color: #999999;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf{
  border-bottom: none;
}

.el-table{
  cursor: pointer;
}
.btn{
  cursor : pointer;
}
</style>