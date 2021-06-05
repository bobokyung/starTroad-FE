// 파일경로: src/api/api.js

// 작성한 axios 인터셉터를 가져옵니다.
import Send from '../util/Send.js'
import store from '../store'
import qs from 'qs';
import { identity } from 'lodash';
//params나 query는 모두 javascript object 형태로 넘겨줘야 합니다.

/*
const headers = {
    'Authorization' : `Bearer ${store.state.accessToken}`
}
*/


export default {
    //sample
    requireAuth(){
        let auth = store.getters.isAuthenticated
        const headers = {
            'Authorization' : `Bearer ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return headers
    },
    getNews() {
        // axios 요청을 생성합니다.
        /*
        axios 요청을 생성합니다.
        https://github.com/axios/axios axios API 챕터
        인터셉터를 안썼으면 다음과 같습니다.
        axios({
            baseURL: 'https://api.hnpwa.com',
            url: '/news/1.json',
            method: 'get'  
        })
        */          
        return Send({
                // baseURL설정되어 있기 때문에 그 뒤의 URL만 작성합니다.
                url: '/news/1.json',
                method: 'get'
            })
    },
    googleLogin(data){
        return Send({
            url : `/auth/google`,
            method : 'post',
            data : data
        })
    },
    googleLoginDirect(data){
        return Send({
            url : `/auth/google/token`,
            method : 'post',
            data : data,
        })
    },
    getHome(){
        //홈화면
        return Send({
            url: `/home/`,
            method: 'get',
            headers : this.requireAuth()
            
        })
    },
    getMyroadMap(){
        return Send({
            url: `/roadmap/myroadmap`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    addInfo(data){
        //로그인 추가정보
        return Send({
            url : `/user/login/add`,
            method : 'post',
            data : data
        })
    },
    updateProfile(data){
        //프로필 수정
        return Send({
            url : `/user`,
            method : 'put',
            data : data
        })
    },
    getProfile(){
        //프로필 조회
        return Send({
            url : `/user/`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    makeRoadmap(data){
        //로드맵 만들기(생성)
        return Send({
            url : `/roadmap/generate`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    searchRoadmap(params){
        //로드맵 검색
        console.log("여기가 params")
        console.log(params)
        return Send({
            url : `/roadmap/search`,
            method : 'get',
            params : params,
            headers : this.requireAuth()
        })
    },
    getRoadmap(roadmap_id){
        //로드맵 조회
        return Send({
            url : `/roadmap/${roadmap_id}`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    deleteRoadmap(roadmap_id){
        //로드맵 조회
        return Send({
            url : `/roadmap/delete/${roadmap_id}`,
            method : 'delete',
            headers : this.requireAuth()
        })
    },
    likeRoadmap(roadmap_id){
        //로드맵 좋아요 누르기
        return Send({
            url : `/roadmap/like/${roadmap_id}`,
            method : 'post',
            // data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    unlikeRoadmap(roadmap_id){
        //로드맵 좋아요 누르기 취소
        return Send({
            url : `/roadmap/unlike/${roadmap_id}`,
            method : 'post',
            // data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    forkRoadmap(data){
        //로드맵 포크
        return Send({
            url : `/roadmap/fork`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    editRoadmap(roadmap_id, data){
        //로드맵 수정
        return Send({
            url : `/roadmap/modify/${roadmap_id}`,
            method : 'put',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    getTalkList(roadmap_id){
        return Send({
            url : `/roadmap/talk/${roadmap_id}`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    addTalkList(roadmap_id, data){
        return Send({
            url : `/roadmap/talk/${roadmap_id}`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    getTalk(roadmap_id, talk_id){
        return Send({
            url : `/roadmap/talk/${roadmap_id}/${talk_id}`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    editTalk(roadmap_id, talk_id, data){
        return Send({
            url:`/roadmap/talk/modify/${roadmap_id}/${talk_id}`,
            method : 'put',
            data : qs.stringify(data),
            headers : this.requireAuth(),
        })
    },
    deleteTalk(roadmap_id, talk_id){
        return Send({
            url : `/roadmap/talk/delete/${roadmap_id}/${talk_id}`,
            method : 'delete',
            headers : this.requireAuth()
        })

    },
    addComment(roadmap_id, talk_id, data){
        return Send({
            url:`/roadmap/talk/${roadmap_id}/${talk_id}`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth(),
        })
    },
    editComment(roadmap_id, talk_id, comment_id, data){
        return Send({
            url:`/roadmap/talk/modify/${roadmap_id}/${talk_id}/${comment_id}`,
            method : 'put',
            data : qs.stringify(data),
            headers : this.requireAuth(),
        })
    },
    deleteComment(roadmap_id, talk_id, comment_id){
        return Send({
            url : `/roadmap/talk/delete/${roadmap_id}/${talk_id}/${comment_id}`,
            method : 'delete',
            headers : this.requireAuth()
        })
    },
    getStudyList(roadmap_id){
        return Send({
            url : `/roadmap/study/${roadmap_id}`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    addStudyList(roadmap_id, data){
        return Send({
            url : `/roadmap/study/${roadmap_id}`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    modifyStudyList(roadmap_id, study_id, data){
        return Send({
            url : `/roadmap/study/modify/${roadmap_id}/${study_id}`,
            method : 'put',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    getStudy(roadmap_id, study_id){
        return Send({
            url : `/roadmap/study/${roadmap_id}/${study_id}`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    getMyStudy(){
        return Send({
            url: `/study/mystudy`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    getRequestList(){
        return Send({
            url:`/study/requestlist`,
            method : 'get',
            headers : this.requireAuth()
        })
    },
    joinStudy(roadmap_id, study_id){
        return Send({
            url : `/roadmap/study/ask/${roadmap_id}/${study_id}`,
            method : 'post',
            headers : this.requireAuth()
        })
    },
    deleteStudy(roadmap_id, study_id){
        return Send({
            url : `/roadmap/study/delete/${roadmap_id}/${study_id}`,
            method : 'delete',
            headers : this.requireAuth()
        })
    },
    withdrawStudy(roadmap_id, study_id){
        return Send({
            url : `/roadmap/study/quit/${roadmap_id}/${study_id}`,
            method : 'post',
            headers : this.requireAuth()
        })
    },
    postStudyAccept(roadmap_id, study_id, data){
        return Send({
            url:`/roadmap/study/accept/${roadmap_id}/${study_id}`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
    postStudyDeny(roadmap_id, study_id, data){
        return Send({
            url:`/roadmap/study/deny/${roadmap_id}/${study_id}`,
            method : 'post',
            data : qs.stringify(data),
            headers : this.requireAuth()
        })
    },
}

