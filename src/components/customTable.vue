<template>
  <b-container fluid>
    <div class="d-flex justify-content-between mb-3" style="min-height:30px">
      <div class="perPage">
        <span>Show</span>
        <select class="mx-1" v-model="perPage" @change="resetPage">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span>Entries</span>
        <button class="btn" @click="csvPrint()" v-text="'Excel'"></button>
      </div>
      <div v-show="!getEditClicked" class="perPage">
        <span class="mr-1">Search</span>
        <input type="text" v-model="getTableFilter">
      </div>
    </div>

    <b-table
      @filtered="changeFilteredItems"
      :sort-by="'fmNo'"
      :sort-desc="true"
      :current-page="getTableCurrentPage"
      :filter="getTableFilter"
      :per-page="perPage"
      small
      :tbody-tr-class="rowClicked"
      @row-clicked="populateForm"
      hover
      stacked="md"
      :items="item"
      bordered
      :fields="fields"
    ></b-table>
    <div class="d-flex justify-content-between text-white" style="min-height:54px">
      <span
        v-text="getTableFilter?`Showing total of ${getFilteredItems.length} Entries` :`Showing total of ${item.length} Entries`"
      ></span>
      <b-pagination
        v-show="!getEditClicked"
        :total-rows="getTableFilter?getFilteredItems.length:item.length"
        :per-page="perPage"
        v-model="getTableCurrentPage"
      ></b-pagination>
    </div>
  </b-container>
</template>

<script>
import dayjs from 'dayjs'
import '@/styles/custom.scss'
import { mapActions } from 'vuex'
import papaParse from 'papaparse'
import uiControl from '@/helperScript/uiControl.js'
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
        {
          key: 'reqD',
          label: 'Request Date',
          formatter: 'dateFormat',
          sortable: true
        },
        {
          key: 'closD',
          label: 'Complete Date',
          formatter: 'dateFormat',
          sortable: true
        }
      ],
      apiUrl: process.env.VUE_APP_API_URL,
      perPage: 25,
      filter: '',
      currentPage: 1,
      filteredItems: ''
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
    },
    getTableFilter: {
      get () {
        return this.$store.getters.getTableFilter
      },
      set (value) {
        this.changeTableFilter(value)
        this.changeTableCurrentPage(1)
      }
    },
    getTableCurrentPage: {
      get () {
        return this.$store.getters.getTableCurrentPage
      },
      set (value) {
        this.changeTableCurrentPage(value)
      }
    },
    getFilteredItems: {
      get () {
        return this.filteredItems
      }
    },
    // Format item to export to csv
    getCsvPrintFormattedItem () {
      let formattedData = {
        // Define header
        fields: [
          'FM#',
          'Work Title',
          'Priority',
          'Type 1',
          'Type 2',
          'Description',
          'Location',
          'Status',
          'Company',
          'SAP#',
          'Request By',
          'Request Date',
          'Closed by',
          'Closed Date'
        ],
        data: []
      }
      // Convert item object into array of arrays
      for (let row in this.item) {
        formattedData['data'][row] = Object.values(this.item[row])
      }

      // Format request date and complete date in the array of arrays
      for (let row in formattedData['data']) {
        for (let column in formattedData['data'][row]) {
          switch (column) {
            case '11':
            case '13':
              if (formattedData['data'][row][column]) {
                formattedData['data'][row][column] = dayjs(
                  new Date(formattedData['data'][row][column])
                ).format('DD-MM-YYYY')
              } else {
                break
              }

              break
            default:
              ''
          }
        }
      }
      return formattedData
    }
  },
  methods: {
    ...mapActions([
      'updateFormData',
      'changeClickedRow',
      'changeTableFilter',
      'changeTableCurrentPage'
    ]),
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
      axios
        .get(`${this.apiUrl}selectedRetrieve.php`, {
          params: {
            dataId: item.fmNo
          }
        })
        .then(({ data }) => {
          let payload
          // Fill up form input based on data
          for (let column in data) {
            payload = {
              field: column,
              data: data[column]
            }

            this.updateFormData(payload)
          }
          // Change sapChoice based on SAP#
          if (data.sapN == '-' || data.sapN == '') {
            payload = {
              field: 'sapS',
              data: 'No'
            }
            this.updateFormData(payload)
          } else {
            payload = {
              field: 'sapS',
              data: 'Yes'
            }
            this.updateFormData(payload)
          }

          this.changeClickedRow(item.fmNo)
          this.getIsLoading = false
        })
        .catch(error => {
          this.getIsLoading = false
          uiControl.displayMessage('Error! Connection Failed')
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
    },
    resetPage () {
      this.changeTableCurrentPage(1)
    },
    csvPrint (
      data = papaParse.unparse(this.getCsvPrintFormattedItem),
      filename = 'PCOGD FM.csv',
      mimetype
    ) {
      if (!data) return

      var blob =
        data.constructor !== Blob
          ? new Blob([data], { type: mimetype || 'application/octet-stream' })
          : data

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename)
        return
      }

      var lnk = document.createElement('a')
      var url = window.URL
      var objectURL

      if (mimetype) {
        lnk.type = mimetype
      }

      lnk.download = filename || 'untitled'
      lnk.href = objectURL = url.createObjectURL(blob)
      lnk.dispatchEvent(new MouseEvent('click'))
      setTimeout(url.revokeObjectURL.bind(url, objectURL))
    },
    changeFilteredItems (resultItems) {
      this.filteredItems = resultItems
    }
  }
}
</script>

<style lang="scss" scoped>
.perPage {
  color: white;
}

.btn {
  box-sizing: border-box;
  background-color: rgb(0, 177, 169);
  border: 1px solid rgb(0, 177, 169);
  width: 75px;
  padding: 0;
  margin-left: 20px;
  border-radius: 35px;
  color: white;
  font-weight: bold;
  font-family: verdana;
  box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  // letter-spacing: .15em;
}

.btn:hover {
  color: White;
  background-color: white;
  background-color: #00b151;
  transition: background-color 0.5s;
  // border-radius: 25%
}

.btn:active {
  transform: translateY(2px);
  transition: transform 0.1s;
}
</style>
