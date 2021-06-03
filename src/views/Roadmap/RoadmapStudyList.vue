<template>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-card no-body>
        <b-card class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoContents()">스터디생성하기</div>
        </b-card>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  @current-change="handleCurrentChange"
                  :data="studyLists">
            <el-table-column label="ID"
                             min-width="100px"
                             prop="id">
                <template v-slot="{row}">
                  {{row.id}}
                </template>
            </el-table-column>
            <el-table-column label="STUDY"
                             min-width="310px"
                             prop="name">
                <template v-slot="{row}">
                  {{row.name}}
                </template>
            </el-table-column>
            <el-table-column label="Date"
                             prop="date"
                             min-width="140px">
                <template v-slot="{row}">
                  {{row.created_at}}
                </template>
            </el-table-column>

            <el-table-column label="NUMBER"
                             min-width="140px">
                <template v-slot="{row}">
                  {{row.now_num}} / {{row.max_num}}
                </template>
            </el-table-column>

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.status_type}`"></i>
                        <span class="status" :class="`text-${row.status_type}`">{{row.status_text}}</span>
                    </badge>
                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
</template>

<script>
import Api from '@/api/Api'
import moment from "moment";
import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
 
export default {
  components : {
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
      studyLists : []
    }
  },
  // watch : {

  // },
  methods: {
    fetch(){
      this.studyLists = []
      let id = this.roadmap_id
      Api.getStudyList(id)
      .then((res)=>{
        res.data.forEach((v,i) => {
          if(v.status == 0){
            v.status_type = "info"
            v.status_text = "모집중"
          }else if(v.status == 1){
            v.status_type = "success"
            v.status_text = "모집완료"
          }else if(v.status == 2){
            v.status_type = "success"
            v.status_text = "진행중"
          }else if(v.status == 3){
            v.status_type = "dark"
            v.status_text = "진행종료"

          }
        })
        this.studyLists = res.data
        
      })

      
    },
    handleCurrentChange(val){
      this.currentRow = val
      let roadmap_id = this.roadmap_id
      let study_id = this.currentRow.id
      this.$router.push({path:`/roadmap/${roadmap_id}/study/${study_id}`,
      params : {study_id : study_id, roadmap_id : roadmap_id}})
    },
    gotoContents(){
      let roadmap_id = this.roadmap_id
      this.$router.push({path:`/roadmap/${roadmap_id}/study/study_add`,
      params : {roadmap_id}})
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