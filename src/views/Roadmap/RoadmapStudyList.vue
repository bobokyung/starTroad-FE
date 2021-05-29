<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">study</h3>
        </b-card-header>
        <b-card class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoContents()">스터디생성하기</div>
        </b-card>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="projects">
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
  </div>
</template>

<script>
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
      projects,
        users
    }
  },
  // watch : {

  // },
  methods: {
      handleCurrentChange(val){
      this.currentRow = val
      let roadmap_id = 1
      let study_id = this.currentRow.id
      this.$router.push({path:`/roadmap/${roadmap_id}/study/${study_id}`})
    },
      gotoContents(){
      this.$router.push({path:'/roadmap/${roadmap_id}/study/study_add'})
    }
  },
  computed: {

  },
  mounted() {
  }
  
};
</script>

<style lang="scss" scoped>
</style>