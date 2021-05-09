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
                  {{row.title}}
                </template>
            </el-table-column>

            <el-table-column label="AUTHOR"
                             min-width="100px"
                             prop="author">
                <template v-slot="{row}">
                  {{row.author}}
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
      currentRow : null,
      currentPage : 1,
      talkLists :[
        {   
            "title" : "CSS 내용 추가해주세요",
            "id" : 1,
            "author" : "sr",
            "created_at" : "2021-03-25 17:22:33"
        },
        {
            "title" : "REDUX 내용 삭제해주세요",
            "id" : 2,
            "author" : "es",
            "created_at" : "2021-03-27 17:22:33"
        },
        {
            "title" : "WEBPACK 내용 추가해주세요",
            "id" : 3,
            "author" : "bk",
            "created_at" : "2021-03-28 17:22:33"
        },
    ]

    }
  },
  // watch : {

  // },
  methods: {
    handleCurrentChange(val){
      this.currentRow = val
      let roadmap_id = 1
      let talk_id = this.currentRow.id
      this.$router.push({path:`/roadmap/${roadmap_id}/talk/${talk_id}`})
    },
    gotoContents(){
      this.$router.push({path:'/roadmap/${roadmap_id}/talk/talk_add'})
    }
  },
  
  computed: {

  },
  mounted() {
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