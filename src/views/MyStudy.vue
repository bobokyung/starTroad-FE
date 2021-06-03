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

            <b-table 
                    header-row-class-name="thead-light"
                    id="studytable"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                    :per-page="perPage"
                    :items="projects">

                <b-tr label="ID"
                                min-width="100px"
                                prop="id">
                </b-tr>
                <b-tr label="Roadmap title"
                                prop="name"
                                min-width="310px">
                </b-tr>
                <b-tr label="Status"
                                min-width="170px"
                                prop="status">
                </b-tr>

            </b-table>

            <b-card-footer class="py-4 d-flex justify-content-end">
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="studytable"></b-pagination>
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
        perPage: 5,
        currentPage:1,
        projects : [
          
        ]
      };
    },
    computed: {
      rows() {
        return this.projects.length
      },
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
