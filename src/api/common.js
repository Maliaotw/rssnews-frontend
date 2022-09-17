import request from '@/utils/request'

export function getHealthz() {
    return request({
        url: '/api/v1/healthz',
        method: 'get'
    })
}


export function getNews(page,size,params) {
    return request({
        url: `/api/v1/news?page=${page}&page_size=${size}`,
        method: 'get',
        params
    })
}

export function getNewsSelects(params) {
    return request({
        url: `/api/v1/news/selects/`,
        method: 'get',
        params
    })
}

export function getSourceSelects(params) {
    return request({
        url: `/api/v1/source/selects/`,
        method: 'get',
        params
    })
}





export function getCategory() {
    return request({
        url: '/api/v1/category',
        method: 'get'
    })
}

export function getSource(page,size,params) {
    return request({
        url: `/api/v1/source/?page=${page}&page_size=${size}`,
        method: 'get',
        params
    })
}

export function getSourceTree() {
    return request({
        url: '/api/v1/source/tree',
        method: 'get'
    })
}

export function checkSource(url) {
    return request({
        url: `/api/v1/source/check_source/`,
        method: 'post',
        data: {
            "url": url
        }
    })
}


export function SourceBatchEdit(data) {
    return request({
        url: '/api/v1/source/batch_edit/',
        method: 'post',
        data: data
    })
}



export function addCategory(data) {
    return request({
        url: '/api/v1/source/',
        method: 'post',
        data: data
    })
}

export function editCategory(id,data) {
    return request({
        url: `/api/v1/source/${id}/`,
        method: 'put',
        data: data
    })
}

export function detailCategory(id) {
    return request({
        url: `/api/v1/source/${id}`,
        method: 'get',
    })
}

export function sourceBatchEnable(data) {
    return request({
        url: '/api/v1/source/batch_enable/',
        method: 'post',
        data: data
    })
}

export function sourceBatchDelete(data) {
    return request({
        url: '/api/v1/source/batch_deleted/',
        method: 'post',
        data: data
    })
}
export function updateUserProfileSource(data) {
    return request({
        url: '/api/v1/userprofile/source/',
        method: 'post',
        data: data
    })
}

export function getUserProfile() {
    return request({
        url: '/api/v1/userprofile/',
        method: 'get',
    })
}

export function updateUserProfile(data) {
    return request({
        url: '/api/v1/userprofile/update/',
        method: 'put',
        data: data
    })
}

export function getBindToken() {
    return request({
        url: '/api/v1/userprofile/bind-token/',
        method: 'get',
    })
}

export function updateResetPassword(data) {
    return request({
        url: '/api/v1/userprofile/reset-password/',
        method: 'post',
        data: data
    })
}

export function updateResetTelegram(data) {
    return request({
        url: '/api/v1/userprofile/reset-telegram/',
        method: 'post',
        data: data
    })
}

