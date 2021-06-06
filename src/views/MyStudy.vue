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
                                min-width="50px"
                                prop="id">
                </el-table-column>
                <el-table-column label="Roadmap title"
                                prop="name">
                </el-table-column>
             <el-table-column label="Status"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.status_type}`"></i>
                        <span class="status" :class="`text-${row.status_type}`">{{row.status_text}}</span>
                    </badge>
                    <span class="num-bagde">{{row.now_num}} / {{row.max_num}}</span>
                    <b-icon v-if="row.valid==`yes`" class="manage" icon="gear"></b-icon>
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
        projects : []
      };
    },
    methods : {
      handleCurrentChange(val){
        this.currentRow = val
        let roadmap_id = this.currentRow.follow_map
        let study_id = this.currentRow.id
        this.$router.push({path:`/roadmap/${roadmap_id}/study/${study_id}`,
        params : {study_id : study_id, roadmap_id : roadmap_id}})
      },
      fetch(){
        Api.getMyStudy()
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
<style lang="scss" scoped>
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
.el-table{
  cursor: pointer;
}
.manage{
  float : right;
}

</style>
