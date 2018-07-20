import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as types from './types'
import $http from './api'
import util from './storage'

const state = {
    active: 0,   // 导航
}

const mutations = {
    [types.ACTIVE](state,res){
        state.active = res
    }
}

const actions = {
    // ACTIVE({commit}){
    //     commit('ACTIVE', )
    // }
}

const getters ={

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})