<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">나의 스터디</h3>
        </b-card-header>

        <b-table 
            header-row-class-name="thead-light"
            id="제발"
            :items="projects"
            :per-page="perPage"
            :current-page="currentPage"
            
            >              
        </b-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="제발"
                ></b-pagination>
            </b-card-footer>
    </b-card>
</template>
<script>
  
  import { Table, TableColumn, Pagination} from 'element-ui'
 
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        
        perPage: 5,
        currentPage: 1,
        
        projects:[
            {
                title: 'my sql같이 공부해요~@!',
                date:'2020-01-01',
                roadmap_name:'vue.js',
                status: '모집중',
                statusType: 'success',
            },
            {
                
                title: 'HTML공부 할사람 있나요',
                date:'2020-02-01',
                roadmap_name:'front',
                status: '모집완료',
                statusType: 'info',
            },
            {
            
                title: 'web sever 공부할사람 모집',
                date:'2020-04-01',
                roadmap_name:'back',
                status: '모집중',
                statusType: 'success',
            },
            {
            
                title: 'React같이 공부좀 합시다',
                date:'2020-07-01',
                roadmap_name:'backend',
                status: '모집완료',
                statusType: 'info',
            },
            {
            
                title: 'Vue 스터디',
                date:'2020-08-01',
                roadmap_name:'frontend',
                status: '모집완료',
                statusType: 'info',
            },
            {
            
                title: 'CSS인원 구합니다',
                date:'2020-11-01',
                roadmap_name:'front',
                status: '모집완료',
                statusType: 'info',
            },
            {
            
                title: 'Devops 토요일에 공부합시다',
                date:'2020-11-01',
                roadmap_name:'dev',
                status: '모집완료',
                statusType: 'info',
            },
            {
                title: 'node.js 초보',
                date:'2020-12-01',
                roadmap_name:'front',
                status: '모집중',
                statusType: 'success',
            },
            {
            
                title: 'Android',
                date:'2020-11-12',
                roadmap_name:'android',
                status: '모집완료',
                statusType: 'info',
            },
            {
                title: 'Android',
                date:'2020-11-12',
                roadmap_name:'android',
                status: '모집완료',
                statusType: 'info',
            },
            {
                title: 'Android',
                date:'2020-11-12',
                roadmap_name:'android',
                status: '모집완료',
                statusType: 'info',
            },
            {
                title: 'web sever 공부할사람 모집',
                date:'2020-04-01',
                roadmap_name:'back',
                status: '모집중',
                statusType: 'success',
            },
            {
                title: 'web sever 공부할사람 모집',
                date:'2020-04-01',
                roadmap_name:'back',
                status: '모집중',
                statusType: 'success',
            },
            {
                title: 'web sever 공부할사람 모집',
                date:'2020-04-01',
                roadmap_name:'back',
                status: '모집중',
                statusType: 'success',
            },
        ]

      };
    },
    computed: {
      rows() {
        return this.projects.length
      },
    },
    methods: {
        handleCurrentChange(val) {
        this.page = val;
        },
    }
  }
</script>
