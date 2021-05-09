// 파일경로: src/api/api.js

// 작성한 axios 인터셉터를 가져옵니다.
import Send from '../util/Send.js'
import store from '../store'
import qs from 'qs';
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
            url : `/user`,
            method : 'get'
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
        return Send({
            url : `/roadmap/search`,
            method : 'get',
            params : params
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
    likeRoadmap(data){
        //로드맵 좋아요 누르기
        return Send({
            url : `/roadmap/like`,
            method : 'post',
            data : data
        })
    },
    unlikeRoadmap(data){
        //로드맵 좋아요 누르기 취소
        return Send({
            url : `/roadmap/unlike`,
            method : 'post',
            data : data
        })
    },
    forkRoadmap(data){
        //로드맵 포크
        return Send({
            url : `/roadmap/fork`,
            method : 'post',
            data : data
        })
    },
    editRoadmap(roadmap_id, data){
        //로드맵 수정
        return Send({
            url : `/roadmap/modify/${roadmap_id}`,
            method : 'put',
            data : data
        })
    },
}

