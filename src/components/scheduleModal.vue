<template>
  <b-modal class="modalTable" centered id="scheduleModal">
    <template slot="modal-title">Schedule job</template>

    <b-form-select
      @change="generatedDays"
      class="d-inline-block w-50"
      v-model="selectedMonth"
      :options="monthList"
    />
    <b-form-select
      @change="generatedDays"
      class="d-inline-block w-50"
      v-model="selectedYear"
      :options="yearList"
    />

    <b-table hover small class="mt-3" bordered :items="listOfDays" :fields="field">
      <span slot="activities" slot-scope="data" v-html="data.value" />
      <span slot="action" slot-scope="data" v-html="data.value" />

    </b-table>
  </b-modal>
</template>


<script>
import dayjs from "dayjs";
import "@/styles/custom.scss";
import axios from "axios";
import uiControl from "@/helperScript/uiControl.js";

export default {
  data() {
    return {
      field: {
        date: "Date",
        day: "Day",
        activities: "Activities",
        action:"Action"
      },
      monthList: [
        { value: "Jan", text: "January" },
        { value: "Feb", text: "February" },
        { value: "Mar", text: "March" },
        { value: "Apr", text: "April" },
        { value: "May", text: "May" },
        { value: "Jun", text: "June" },
        { value: "Jul", text: "July" },
        { value: "Aug", text: "August" },
        { value: "Sep", text: "September" },
        { value: "Oct", text: "October" },
        { value: "Nov", text: "November" },
        { value: "Dec", text: "December" }
      ],
      yearList: [
        { value: "2019", text: "2019" },
        { value: "2020", text: "2020" },
        { value: "2021", text: "2021" },
        { value: "2022", text: "2022" },
        { value: "2023", text: "2023" }
      ],
      selectedMonth: dayjs(new Date()).format("MMM"),
      selectedYear: dayjs(new Date()).format("YYYY"),
      listOfDays:[],
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    getIsLoading: {
      get () {
        return this.$store.getters.getIsLoading
      },
      set (value) {
        this.$store.commit('changeIsLoading', value)
      }
    }
  },
  methods: {
    dateChange() {
      console.log(this.generatedDays);
    },
    generatedDays() {
      this.listOfDays  = [];
      let date = dayjs(
        new Date(`${this.selectedYear}/${this.selectedMonth}/1`)
      );
      let selectedMonth = dayjs(
        new Date(`${this.selectedYear}/${this.selectedMonth}/1`)
      );
      let listOfDays = [];

      this.getIsLoading = true
      axios
        .get(`${this.apiUrl}biaRetrieve.php`, {
          params: {
            date: date.format("YYYY-MM-DD")
          }
        })
        .then(({ data }) => {
          let total;
          let completed;
          // console.log(data)
          while (date.isSame(selectedMonth, "month")) {

            total = data.filter((element)=>{
              return date.isSame(dayjs(new Date(element['date'])),'date')
            })

            completed = data.filter((element)=>{
              return (date.isSame(dayjs(new Date(element['date'])),'date')
              && element['status'] == 1)
            })

            this.listOfDays.push({
              date: date.format("DD"),
              day: date.format("ddd"),
              activities: total.length!=0 ? `<i  class="fas fas fa-check-circle fa-lg text-primary"></i> <mark style='background-color:#057953; color:white;'><b>${completed.length}</b></mark>
              <mark style='background-color:#4c4c4c; color:white;'><b>${total.length}</b></mark>` : '',
              action:`<button class='btn btn-sm btn-outline-primary fas fa-plus-square fa-sm'></button>`
            });
              // <i  class="fas fa-plus-square fa-lg text-primary"></i>
            date = date.add(1, "day");
          }
          this.getIsLoading = false
        })
        .catch(({data}) => {
          while(date.isSame(selectedMonth,'month')){
              this.listOfDays.push({
                date:date.format("DD"),
                day: date.format("ddd"),
                activities : '',
                 action:`<button  class="btn btn-sm btn-outline-primary fas fa-plus-square fa-sm"></button>`
              })
              date = date.add(1,'day')
            }
            this.getIsLoading = false
          
        });

      
    }
  },
  created() {
    this.generatedDays()
  }
};
</script>


<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
// .modalTable {
//   thead{
// th:nth-child(1){
//     width: 5% !important;
//   }
//   th:nth-child(2){
//     width: 5% !important;
//   }
//   th:nth-child(3){
//     width: 50% !important;
//   }
//   }

// }

// .modal-open{
//   padding-right:0 !important;
//   margin-right:0 !important;
// }
</style>


