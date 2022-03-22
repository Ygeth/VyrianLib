import axios from '@/plugins/axiosDefault.js';


export default {
    getListaCitas(payload) {
        return axios({
            url: 'url',
            method: 'GET',
            params: payload
        })
    },
    
    downloadDocument(payload) {        
        return privateAPI({
            url: `url`,
            method: 'GET',
            params: payload,
            responseType: 'blob'
        });
    },
}