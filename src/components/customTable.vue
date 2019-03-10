<template>
<!-- <b-container fluid> -->
  <b-table striped small :tbody-tr-class="rowClicked" @row-clicked="populateForm" hover stacked="md" :items="item" bordered :fields="fields"></b-table>
<!-- </b-container> -->

</template>

<script>
import dayjs from 'dayjs'
import '@/styles/custom.scss'
import { mapActions } from 'vuex'
name = 'customTable'
export default {
  data () {
    return {
      fields: [
        { key: 'fmNo', label: 'FM No', sortable: true },
        { key: 'wTitle', label: 'Work Title', sortable: true },
        { key: 'prio', label: 'Priority', sortable: true },
        { key: 't1', label: 'Type 1', sortable: true },
        { key: 'loca', label: 'Location', sortable: true },
        { key: 'stat', label: 'Status', sortable: true },
        { key: 'comp', label: 'Company', sortable: true },
        { key: 'reqBy', label: 'Request By', sortable: true },
        { key: 'reqD', label: 'Request Date', formatter: 'dateFormat', sortable: true },
        { key: 'closD', label: 'Complete Date', formatter: 'dateFormat', sortable: true }
      ],
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  computed: {
    item: {
      get () {
        return this.$store.getters.getTableTtems
      }

    },
    getIsLoading: {
      get () {
        return this.$store.getters.getIsLoading
      },
      set (value) {
        this.$store.commit('changeIsLoading', value)
      }
    },
    getFormState () {
      return this.$store.getters.getFormState
    },
    getClickedRow () {
      return this.$store.getters.getClickedRow
    },
    getEditClicked () {
      return this.$store.getters.getEditClicked
    }
  },
  methods: {
    ...mapActions(['updateFormData', 'changeClickedRow']),
    populateForm (item, index) {
      // Do nothing if form is in NEW mode
      if (!this.getFormState) {
        return
      }

      if (this.getEditClicked) {
        return
      }

      // If clicked is same, deselect elem.
      if (this.getClickedRow == item.fmNo) {
        this.$store.dispatch('resetForm')
        this.changeClickedRow('')
        return
      }

      this.getIsLoading = true
      axios.get(`${this.apiUrl}selectedRetrieve.php`,
        {
          params: {
            dataId: item.fmNo
          }
        })
        .then(({ data }) => {
          let payload
          for (let column in data) {
            payload = {
              field: column,
              data: data[column]
            }

            this.updateFormData(payload)
          }
          this.changeClickedRow(item.fmNo)
          this.getIsLoading = false
        }).catch(error => {
          console.log(error)
          this.getIsLoading = false
        })
    },
    dateFormat (value) {
      if (value) {
        return dayjs(new Date(value)).format('DD-MM-YYYY')
      } else {

      }
    },
    rowClicked (item, type) {
      if (this.getClickedRow == item.fmNo) {
        return 'selected'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
