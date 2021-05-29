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
                  :data="studyLists">
            <el-table-column label="Project"
                             min-width="310px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="Date"
                             prop="date"
                             min-width="140px">
            </el-table-column>
        

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
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
          //여기에서 스터디 참여 가능한지 가능하지 않은지 확인해야함.
          let created_at = new Date(v.created_at)
          v.created_at = moment(created_at).format("yyyy-MM-DD HH:mm:ss")
        })
        this.studyLists = res.data
      })

      
    },
    handleCurrentChange(val){
      this.currentRow = val
      let roadmap_id = 1
      let study_id = this.currentRow.id
      this.$router.push({path:`/roadmap/${roadmap_id}/study/${study_id}`,
      params : {study_id : study_id, roadmap_id : roadmap_id}})
    },
    gotoContents(){
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
</style>