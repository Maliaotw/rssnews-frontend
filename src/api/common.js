import request from '@/utils/request'

export function getHealthz() {
    return request({
        url: '/api/v1/healthz',
        method: 'get'
    })
}


export function getNews(page,size,params) {
    return request({
        url: `/api/v1/news?offset=${page}&limit=${size}`,
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



export function getCategory() {
    return request({
        url: '/api/v1/category',
        method: 'get'
    })
}

export function getSource() {
    return request({
        url: '/api/v1/source/tree',
        method: 'get'
    })
}

export function addCategory(data) {
    return request({
        url: '/api/v1/source/create',
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