<template>
  <b-modal ref="scheduleModal" class="modalTable" centered id="scheduleModal">
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
      <span slot="activities" slot-scope="data" v-html="data.value"/>
      <template v-if="data.item.total!=0" slot="activities" slot-scope="data">
        <i class="fas fas fa-check-circle fa-lg text-primary"></i>
        <mark style="background-color:#057953; color:white;">
          <b v-text="data.item.completed"></b>
        </mark>
        <mark style="background-color:#4c4c4c; color:white;">
          <b v-text="data.item.total"></b>
        </mark>
      </template>
      <template slot="action" slot-scope="data">
        <!-- <i class="fas fa-plus-circle"></i> -->
        <button @click="scheduleJob(data.item,data.value)" class="btn btn-sm btn-outline-primary">
          <i class="fas fa-plus-circle"></i>
        </button>
      </template>
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
        action: "Action"
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
      listOfDays: [],
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    getIsLoading: {
      get() {
        return this.$store.getters.getIsLoading;
      },
      set(value) {
        this.$store.commit("changeIsLoading", value);
      }
    },
    getClickedRow() {
      return this.$store.getters.getClickedRow;
    },
    getEditClicked: {
      get () {
        return this.$store.getters.getEditClicked
      }
    },
    getFormState: {
      get () {
        return this.$store.getters.getFormState
      }
      
    }
  },
  methods: {
    dateChange() {
      console.log(this.generatedDays);
    },
    generatedDays() {
      let date = dayjs(
        new Date(`${this.selectedYear}/${this.selectedMonth}/1`)
      );
      let selectedMonth = dayjs(
        new Date(`${this.selectedYear}/${this.selectedMonth}/1`)
      );
      let listOfDays = [];

      this.getIsLoading = true;
      axios
        .get(`${this.apiUrl}biaRetrieve.php`, {
          params: {
            date: date.format("YYYY-MM-DD")
          }
        })
        .then(({ data }) => {
          this.listOfDays = [];
          let total;
          let completed;
          // console.log(data)
          while (date.isSame(selectedMonth, "month")) {
            total = data.filter(element => {
              return date.isSame(dayjs(new Date(element["date"])), "date");
            });

            completed = data.filter(element => {
              return (
                date.isSame(dayjs(new Date(element["date"])), "date") &&
                element["status"] == 1
              );
            });

            this.listOfDays.push({
              fullDate: date.format("YYYY-MM-DD"),
              date: date.format("DD"),
              day: date.format("ddd"),
              completed: completed.length,
              total: total.length != 0 ? total.length : 0
            });
            // <i  class="fas fa-plus-square fa-lg text-primary"></i>
            date = date.add(1, "day");
          }
          this.getIsLoading = false;
        })
        .catch(({ data }) => {
          this.listOfDays = [];
          while (date.isSame(selectedMonth, "month")) {
            this.listOfDays.push({
              fullDate: date.format("YYYY-MM-DD"),
              date: date.format("DD"),
              day: date.format("ddd"),
              completed: "",
              total: ""
            });
            date = date.add(1, "day");
          }
          this.getIsLoading = false;
        });
    },
    scheduleJob(item, value) {
      this.getIsLoading = true;

      axios
        .get(`${this.apiUrl}scheduleJob.php`, {
          params: {
            date: item.fullDate,
            fmNo: this.getClickedRow
          }
        })
        .then(({ data }) => {
          // If success
          console.log(data);
          if (data==1) {
            this.generatedDays();

            this.$store.dispatch("updateJobStatus");

            uiControl.displayMessage("Job scheduled");
          } else if (data==0) {
            uiControl.displayMessage("Failed to schedule job");
          }

          if (this.getEditClicked && this.getFormState) {
           uiControl.editReset()
          }

          this.$store.dispatch("resetForm");
          this.$refs.scheduleModal.hide();
          this.getIsLoading = false;
        })
        .catch((response) => {
          console.log(response)
          this.$refs.scheduleModal.hide();
          uiControl.displayMessage("Connection Error");
          this.getIsLoading = false;
        });

      
    }
  },
  created() {
    this.generatedDays();
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


