<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header> 
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">나의 스터디</h3>
        </b-card-header>

            <el-table class="table-responsive table"
                    header-row-class-name="thead-light"
                    @current-change="handleCurrentChange"
                    :data="projects">
                <el-table-column label="ID"
                                min-width="100px"
                                prop="id">
                </el-table-column>
                <el-table-column label="Roadmap title"
                                prop="name"
                                min-width="310px">
                </el-table-column>
                <el-table-column label="Status"
                                min-width="170px"
                                prop="status">
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
  </div>
</template>
<script>
  import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
  import Api from '@/api/Api'

  export default {
    components: {
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects : [
          // {
          //     title: 'my sql같이 공부해요~@!',
          //     date:'2020-01-01',
          //     roadmap_name:'vue.js',
          //     status: '모집중',
          //     statusType: 'success',
          //   },
          //   {
              
          //     title: 'HTML공부 할사람 있나요',
          //     date:'2020-02-01',
          //     roadmap_name:'front',
          //     status: '모집완료',
          //     statusType: 'info',
          //   },
          //   {
            
          //     title: 'web sever 공부할사람 모집',
          //     date:'2020-04-01',
          //     roadmap_name:'back',
          //     status: '모집중',
          //     statusType: 'success',
          //   },
          //   {
            
          //     title: 'React같이 공부좀 합시다',
          //     date:'2020-07-01',
          //     roadmap_name:'backend',
          //     status: '모집완료',
          //     statusType: 'info',
          //   },
          //   {
            
          //     title: 'Vue 스터디',
          //     date:'2020-08-01',
          //     roadmap_name:'frontend',
          //     status: '모집완료',
          //     statusType: 'info',
          //   },
          //   {
          
          //     title: 'CSS인원 구합니다',
          //     date:'2020-11-01',
          //     roadmap_name:'front',
          //     status: '모집완료',
          //     statusType: 'info',
          //   },
          //   {
            
          //     title: 'Devops 토요일에 공부합시다',
          //     date:'2020-11-01',
          //     roadmap_name:'dev',
          //     status: '모집완료',
          //     statusType: 'info',
          //   },
          //   {
            
          //     title: 'node.js 초보',
          //     date:'2020-12-01',
          //     roadmap_name:'front',
          //     status: '모집중',
          //     statusType: 'success',
          //   },
          //   {
            
          //     title: 'Android',
          //     date:'2020-11-12',
          //     roadmap_name:'android',
          //     status: '모집완료',
          //     statusType: 'info',
          //   }
        ]
      };
    },
    methods : {
      handleCurrentChange(val){
        this.currentRow = val
        let roadmap_id = this.currentRow.followMap
        let study_id = this.currentRow.id
        this.$router.push({path:`/roadmap/${roadmap_id}/study/${study_id}`,
        params : {study_id : study_id, roadmap_id : roadmap_id}})
      },
      fetch(){
        Api.getMyStudy()
        .then((res)=>{
          this.projects = res.data
        })
      },
    },
    mounted(){
      this.fetch()
    },
    created(){

    },
  };
</script>
<style>
.el-table.table-dark{
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr{
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf{
  border-bottom: none;
}
</style>
