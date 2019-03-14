import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: false,
    clickedRow: '',
    isLoading: false,
    editClicked: false,
    tableFilter: '',
    tableCurrentPage: 1,
    formData: {
      wTitle: '',
      prio: '',
      t1: '',
      t2: '',
      desc: '',
      loca: '',
      stat: 'New',
      comp: '',
      sapS: '',
      sapN: '-',
      reqBy: '',
      reqD: dayjs(new Date()).format('YYYY-MM-DD'),
      closBy: '',
      closD: ''
    },
    tableItems: []

  },
  getters: {
    getFormData: (state) => {
      return state.formData
    },
    getFormState: (state) => {
      return state.formState
    },
    getClickedRow: (state) => {
      return state.clickedRow
    },
    getIsLoading: (state) => {
      return state.isLoading
    },
    getTableTtems: (state) => {
      return state.tableItems
    },
    getEditClicked: (state) => {
      return state.editClicked
    },
    getTableFilter: (state) => {
      return state.tableFilter
    },
    getTableCurrentPage: (state) => {
      return state.tableCurrentPage
    }

  },
  mutations: {
    changeFormState (state, payload) {
      state.formState = payload
    },
    updateFormData (state, { field, data }) {
      state.formData[field] = data
    },
    submitFormData (state, payload) {
      state.tableItems.push(payload)
    },
    searchDataResult (state, payload) {
      state.tableItems = payload
    },
    changeIsLoading (state, payload) {
      state.isLoading = payload
    },
    changeClickedRow (state, payload) {
      state.clickedRow = payload
    },
    changeEditClicked (state, payload) {
      state.editClicked = payload
    },
    updateTableItem (state, { index, data }) {
      Object.assign(state.tableItems[index], data)
      // state.tableItems[index]
    },
    deleteTableItem (state, { index }) {
      state.tableItems.splice(index, 1)
    },
    changeTableFilter (state, payload) {
      state.tableFilter = payload
    },
    changeTableCurrentPage (state, payload) {
      state.tableCurrentPage = payload
    },
    updateJobStatus(state,{data,index}){
      state.tableItems[index].stat = data
    }

  },
  actions: {
    changeFormState ({ commit }, payload) {
      commit('changeFormState', payload)
    },
    async updateFormData ({ commit, getters }, payload) {
      payload.data = payload.data.trim()
      await commit('updateFormData', payload)
      // }
    },
    async submitFormData ({ dispatch, commit, state, getters }, payload) {
      let newData = {
        ...state.formData,
        fmNo: payload

      }
      await commit('submitFormData', newData)
      const form = document.querySelector('form')
      form.reset()
      dispatch('resetForm')
    },
    async saveSearchData ({ commit, dispatch }, payload) {
      commit('searchDataResult', payload)
      dispatch('changeTableFilter', '')
      dispatch('changeTableCurrentPage', 1)
    },
    changeIsLoading ({ commit }, payload) {
      commit('changeIsLoading', payload)
    },
    changeClickedRow ({ commit }, payload) {
      commit('changeClickedRow', payload)
    },
    resetForm ({ commit, getters, dispatch }, payload) {
      for (let field in getters.getFormData) {
        switch (field) {
          case 'reqD':
            if (getters.getFormState) {
              payload = {
                field: field,
                data: ''
              }
            } else {
              payload = {
                field: field,
                data: dayjs(new Date()).format('YYYY-MM-DD')
              }
            }
            dispatch('updateFormData', payload)
            break
          case 'stat':
            if (!getters.getFormState) {
              payload = {
                field: field,
                data: 'New'
              }
            } else {
              payload = {
                field: field,
                data: ''
              }
            }
            dispatch('updateFormData', payload)
            break
          case 'sapN':
            if (getters.getFormState) {
              payload = {
                field: field,
                data: ''
              }
            } else {
              payload = {
                field: field,
                data: '-'
              }
            }
            dispatch('updateFormData', payload)

            break
          default:
            payload = {
              field: field,
              data: ''
            }
            dispatch('updateFormData', payload)
        }
      }
      // Remove clickedRow
      dispatch('changeClickedRow', '')
      dispatch('changeEditClicked', false)
    },
    changeEditClicked ({ commit }, payload) {
      commit('changeEditClicked', payload)
    },
    async updateTableItem ({ dispatch, state, commit, getters }) {
      let data = getters.getFormData

      let index = state.tableItems.findIndex((row) => {
        return row.fmNo == getters.getClickedRow
      })

      let payload = {
        data: data,
        index: index
      }

      await commit('updateTableItem', payload)
      dispatch('resetForm')
    },
    deleteTableItem ({ state, dispatch, commit, getters }) {
      let index = state.tableItems.findIndex((row) => {
        return row.fmNo == getters.getClickedRow
      })
      commit('deleteTableItem', { index: index })
      dispatch('resetForm')
    },
    changeTableFilter ({ dispatch, commit }, payload) {
      commit('changeTableFilter', payload)
    },
    changeTableCurrentPage ({ commit, dispatch }, payload) {
      commit('changeTableCurrentPage', payload)
    },
    updateJobStatus({commit,state,getters}){

      let index = state.tableItems.findIndex((row) => {
        return row.fmNo == getters.getClickedRow
      })

      let payload = {
        data : "Scheduled",
        index:index
      }

      commit("updateJobStatus",payload)
    }
  }
})
