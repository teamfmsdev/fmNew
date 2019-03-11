<template>
  <div class="container sticky-top mb-1 mt-3 p-0 mainArea">
    <form class="form-group p-3" @submit.prevent="saveData">
      <div class="row justify-content-center no-gutters">
        <div class="col-md d-flex justify-content-end align-items-center formSwitch">
          <label>New</label>

          <label class="switch mx-3">
            <input type="checkbox" v-model="getFormState" @change="switchState">

            <span class="slider round"></span>
          </label>
          <label>Update</label>
        </div>

        <div class="col-md-5 d-flex justify-content-end align-item-center p-0 m-0 h-50 helpBtn">
          <input type="button" value="Help" class="btn p-0 m-0 helpButton" id="popOverHelp">
        </div>
      </div>

      <div class="row text-center justify-content-center no-gutters mb-1">
        <label for="wTitleBox" class="col-md-2 col-form-label">Work Title</label>
        <input
          id="wTitleBox"
          class="form-control col-md-5"
          v-model="wTitle"
          type="text"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          :required="!getFormState"
        >

        <label class="col-1 col-form-label" for="priorityBox">Priority</label>

        <select
          class="form-control col-md-1"
          v-model="prio"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          :required="(!getFormState) || getClickedRow && getEditClicked"
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        <label class="col-md-1 col-form-label" for="type1Box">Type</label>

        <select
          class="form-control col-md-1"
          v-model="t1"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          :required="!getFormState"
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option value="PM">PM</option>
          <option value="RM">RM</option>
          <option value="SM">SM</option>
        </select>

        <select
          class="form-control col-md-1"
          v-model="t2"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          :required="!getFormState"
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option value="VI">VI</option>
          <option value="RS">RS</option>
          <option value="RP">RP</option>
          <option value="PR">PR</option>
          <option value="HK">HK</option>
          <option value="UC">UC</option>
          <option value="PT">PT</option>
          <option value="SL">SL</option>
        </select>
      </div>
      <div class="row justify-content-center no-gutters mb-1">
        <label
          id="Description"
          class="col-md-2 col-form-label text-center"
          for="descriptionBox"
        >*Description</label>
        <textarea
          :required="!getFormState"
          v-model="desc"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          rows="5"
          cols="50"
          class="form-control col-md"
        ></textarea>
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label id="Location" class="col-md-2 col-form-label" for="locationBox">*Location</label>
        <input
          v-model="loca"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          class="form-control col-md-4"
          type="text"
          :required="!getFormState"
        >
        <label id="Status" class="col-md-2 col-form-label" for="statusBox">*Status</label>
        <select
          v-model="stat"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          class="form-control col-md-4"
          :required="(!getFormState) || (getFormState && getEditClicked && getClickedRow && (closBy || closD)) "
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option selected="selected" value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label id="Company" class="col-md-2 col-form-label" for="companyBox">Company</label>
        <input
          v-model="comp"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          class="form-control col-md-4"
          type="text"
        >
        <label id="SAP#" class="col-md-2 col-form-label" for="sapBox">SAP#</label>
        <transition name="buttonDisplay" mode="out-in">
          <select
            v-model="sapS"
            :disabled="getFormState && getClickedRow!='' && !getEditClicked"
            id="sapC"
            class="form-control sapC col-md-1"
          >
            <option selected></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </transition>
        <!-- <transition name="sapNDisplay" mode="out-in"> -->
        <input
          v-model="sapN"
          class="form-control sapN col-md-4"
          id="sapN"
          :disabled="(getFormState && sapS!='Yes') || (getFormState && getClickedRow!='' && !getEditClicked ) "
          type="text"
          :required="!getFormState"
        >
        <!-- </transition> -->
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label class="col-md-2 col-form-label" for="requestbyBox">*Request By</label>
        <select
          v-model="reqBy"
          :disabled="(getFormState && getClickedRow!='') || getEditClicked"
          class="form-control col-md-4"
          type="text"
          :required="!getFormState"
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
          <option value="Support Team">Support Team</option>
        </select>
        <label class="col-md-2 col-form-label" for="requestdateBox">*Request Date</label>
        <input
          :required="!getFormState"
          :disabled="(getFormState && getClickedRow!='') || getEditClicked"
          v-model="reqD"
          id="requestdateBox"
          class="form-control col-md-4"
          type="Date"
        >
      </div>
      <div
        :class="{displayClosed:(!getFormState && stat!='Closed')}"
        class="row text-center justify-content-center no-gutters closedByLine"
      >
        <label class="col-md-2 col-form-label" for="closedbyBox">Closed By</label>
        <select
          v-model="closBy"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          class="form-control col-md-4"
          type="text"
          :required="(!getFormState && stat=='Closed') || this.getEditClicked && this.getClickedRow && stat=='Closed'"
        >
          <option :disabled="!this.getFormState||(this.getEditClicked && this.getClickedRow!='')" selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
          <option value="Support Team">Support Team</option>
        </select>

        <label class="col-md-2 col-form-label" for="completiondateBox">Completion Date</label>
        <input
          v-model="closD"
          :disabled="getFormState && getClickedRow!='' && !getEditClicked"
          class="form-control col-md-4"
          type="date"
          :required="(!getFormState && stat=='Closed') || this.getEditClicked && this.getClickedRow && stat=='Closed'"
          :min="getFormState==false && stat=='Closed'?reqD:getFormState==true && getClickedRow!='' && getEditClicked?reqD:''"
        >
      </div>

      <div
        class="row text-center my-3 no-gutters d-flex align-content-center justify-content-center flex-column flex-md-row flex-sm-column"
      >
        <!-- <input
          class="btn mx-1"
          type="button"
          id="searchBtn"
          value="SEARCH "
          v-show="getFormState"
          @click="searchData"
        >

        <input class="btn mx-1" type="button" id="editBtn" value="EDIT" v-show="getFormState">

        <input
          class="btn mx-1"
          type="button"
          id="deleteBtn"
          value="DELETE"
          v-show="getFormState && getClickedRow"
        >

        <input class="btn mx-1" type="submit" id="saveBtn" value="SAVE" v-show="!getFormState">
        <input
          class="btn mx-1"
          type="button"
          id="resetBtn"
          value="RESET"
          v-show="!getFormState || getFormState"
        >-->
        <input class="btn mx-1" type="button" id="searchBtn" value="SEARCH " @click="searchData">

        <input class="btn mx-1" type="button" id="editBtn" value="EDIT" @click="editMode">

        <input class="btn mx-1" type="button" id="deleteBtn" value="DELETE" @click="deleteData">

        <input class="btn mx-1" type="submit" id="saveBtn" value="SAVE">
        <input
          class="btn mx-1"
          type="button"
          id="resetBtn"
          :value="getEditClicked==true?'CANCEL':'RESET'"
          @click="resetForm"
        >
      </div>
    </form>
    <b-popover target="popOverHelp" triggers="hover">
      <template slot="title">Help</template>PM : Preventative Maintenance
      <br>RM : Reactive Maintenance
      <br>SM : Support Maintenance
      <br>VI : Visual Inspection
      <br>RS: Repair & Service
      <br>RP : Replace
      <br>PR : Project
      <br>HK : Housekeeping
      <br>UC : Unclogging
      <br>PT : Painting
      <br>SL : Sealing
    </b-popover>
    <div class="container card alertMsg justify-content-center text-center" id="alertMsg"></div>

    <!-- <div v-show="getIsLoading" class="d-inline-block" style=" bottom:10%;"> -->
    <div class="loadingBar" v-show="getIsLoading">
      <b-spinner
        variant="warning"
        type="grow"
        label="Spinning"
        style="bottom:10%;width:3rem;height:3rem;"
      />
      <b-spinner
        variant="warning"
        type="grow"
        label="Spinning"
        style=" bottom:10%;width:3rem;height:3rem;"
      />
      <b-spinner
        variant="warning"
        type="grow"
        label="Spinning"
        style=" bottom:10%;width:3rem;height:3rem;"
      />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import '@/styles/customForm.css'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import axios from 'axios'
import uiControl from '@/helperScript/uiControl.js'
import { error } from 'util'

export default {
  name: 'mainForm',
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_URL
      // formState: false,
      // reqDate: dayjs(new Date()).format("YYYY-MM-DD")
    }
  },
  computed: {
    getFormState: {
      get () {
        return this.$store.getters.getFormState
      },
      set (value) {
        this.changeFormState(value)
      }
    },
    getClickedRow: {
      get () {
        return this.$store.getters.getClickedRow
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
    getEditClicked: {
      get () {
        return this.$store.getters.getEditClicked
      }
    },
    wTitle: {
      get () {
        return this.$store.getters.getFormData['wTitle']
      },
      set (value) {
        let payload = {
          field: 'wTitle',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    prio: {
      get () {
        return this.$store.getters.getFormData['prio']
      },
      set (value) {
        let payload = {
          field: 'prio',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    t1: {
      get () {
        return this.$store.getters.getFormData['t1']
      },
      set (value) {
        let payload = {
          field: 't1',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    t2: {
      get () {
        return this.$store.getters.getFormData['t2']
      },
      set (value) {
        let payload = {
          field: 't2',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    desc: {
      get () {
        return this.$store.getters.getFormData['desc']
      },
      set (value) {
        let payload = {
          field: 'desc',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    loca: {
      get () {
        return this.$store.getters.getFormData['loca']
      },
      set (value) {
        let payload = {
          field: 'loca',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    stat: {
      get () {
        return this.$store.getters.getFormData['stat']
      },
      set (value) {
        let payload = {
          field: 'stat',
          data: value
        }
        this.updateFormData(payload)
        // If user is editing exisiting record and change status to closed
        if (value == 'Closed' && this.getEditClicked && this.getClickedRow) {
          // Set closed date to current day
          payload = {
            field: 'closD',
            data: dayjs(new Date()).format('YYYY-MM-DD')
          }
          this.updateFormData(payload)
          // Set closed by to who requested it
          payload = {
            field: 'closBy',
            data: this.reqBy
          }
          this.updateFormData(payload)
        }
        // If user choose other than "CLOSED", clear closBy and closD
        if (value != 'Closed' && !this.getFormState) {
          payload = {
            field: 'closBy',
            data: ''
          }
          this.updateFormData(payload)

          payload = {
            field: 'closD',
            data: ''
          }
          this.updateFormData(payload)
        } else if (value == 'Closed' && !this.getFormState) {
          payload = {
            field: 'closBy',
            data: this.reqBy
          }
          this.updateFormData(payload)

          payload = {
            field: 'closD',
            data: dayjs(new Date()).format('YYYY-MM-DD')
          }
          this.updateFormData(payload)
        }
      }
    },
    comp: {
      get () {
        return this.$store.getters.getFormData['comp']
      },
      set (value) {
        let payload = {
          field: 'comp',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    sapS: {
      get () {
        return this.$store.getters.getFormData['sapS']
      },
      set (value) {
        let payload = {
          field: 'sapS',
          data: value
        }

        this.updateFormData(payload)

        if (value != 'Yes' && this.getFormState && !this.getClickedRow) {
          payload = {
            field: 'sapN',
            data: ''
          }
          this.updateFormData(payload)
        }
      }
    },
    sapN: {
      get () {
        return this.$store.getters.getFormData['sapN']
      },
      set (value) {
        let payload = {
          field: 'sapN',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    reqBy: {
      get () {
        return this.$store.getters.getFormData['reqBy']
      },
      set (value) {
        let payload = {
          field: 'reqBy',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    reqD: {
      get () {
        return this.$store.getters.getFormData['reqD']
      },
      set (value) {
        let payload = {
          field: 'reqD',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    closBy: {
      get () {
        return this.$store.getters.getFormData['closBy']
      },
      set (value) {
        let payload = {
          field: 'closBy',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    closD: {
      get () {
        return this.$store.getters.getFormData['closD']
      },
      set (value) {
        let payload = {
          field: 'closD',
          data: value
        }
        this.updateFormData(payload)
      }
    }
  },
  methods: {
    ...mapActions([
      'changeFormState',
      'updateFormData',
      'submitFormData',
      'saveSearchData',
      'changeEditClicked',
      'updateTableItem',
      'deleteTableItem'
    ]),
    switchState () {
      const searchBtn = document.querySelector('#searchBtn')
      const editBtn = document.querySelector('#editBtn')
      const deleteBtn = document.querySelector('#deleteBtn')
      const saveBtn = document.querySelector('#saveBtn')
      const resetBtn = document.querySelector('#resetBtn')
      const sapN = document.querySelector('#sapN')
      const sapC = document.querySelector('#sapC')

      // if form is in UPDATE mode
      if (this.getFormState) {
        uiControl.updateMode()
        this.resetForm()
      }

      // if form is in NEW mode
      else if (!this.getFormState) {
        // If edit was clicked before switching mode
        if (this.getEditClicked) {
          uiControl.newMode(true)
          this.resetForm()
        } else {
          uiControl.newMode()
          this.resetForm()
        }
      }
    },
    resetForm () {
      // If reset was clicked while form is in UPDATE mode and there is a clicked row
      if (this.getEditClicked && this.getFormState) {
        uiControl.editReset()
      }
      this.$store.dispatch('resetForm')
    },
    saveData () {
      // If it is editing mode
      if (this.getEditClicked && this.getClickedRow && this.getFormState) {
        if(confirm("Confirm to edit this entry ?")){
            this.getIsLoading = true
        axios
          .get(`${this.apiUrl}update.php`, {
            params: {
              'Work Title': this.wTitle,
              Priority: this.prio,
              'Type 1': this.t1,
              'Type 2': this.t2,
              Description: this.desc,
              Location: this.loca,
              Status: this.stat,
              Company: this.comp,
              'SAP Choice': this.sapS,
              'SAP#': this.sapN,
              'Request By': this.reqBy,
              'Request Date': this.reqD,
              'Closed By': this.closBy,
              'Completion Date': this.closD,
              dataID: this.getClickedRow
            }
          })
          .then(async ({ data }) => {
            this.updateTableItem()
            this.getIsLoading = false
            uiControl.editReset()
            uiControl.displayMessage(data)
          })
          .catch(error => {
            this.getIsLoading = false
            uiControl.displayMessage('Failed to Update')
          })
        }
        else{
          return
        }
      } else {
        let closedDate = dayjs(this.closD)
        let requestDate = dayjs(this.reqD)
        let errorMsg = ''
        if (closedDate.isBefore(requestDate)) {
          errorMsg += 'Error, Closed date is earlier than start date \n'
        }

        // if(this.stat!='Closed' && this.closD!="" || this.reqD!="" ){
        //   alertMsg+="Error, Status must be CLOSED for closed record \n"
        // }

        if (errorMsg) {
          alert(errorMsg)
          return
        }

        this.getIsLoading = true
        axios
          .get(`${this.apiUrl}save.php`, {
            params: {
              'Work Title': this.wTitle,
              Priority: this.prio,
              'Type 1': this.t1,
              'Type 2': this.t2,
              Description: this.desc,
              Location: this.loca,
              Status: this.stat,
              Company: this.comp,
              'SAP Choice': this.sapS,
              'SAP#': this.sapN,
              'Request By': this.reqBy,
              'Request Date': this.reqD,
              'Closed By': this.stat == 'Closed' ? this.closBy : '',
              'Completion Date': this.stat == 'Closed' ? this.closD : ''
            }
          })
          .then(({ data }) => {
            // this.saveSearchData(data);
            this.$store.dispatch('submitFormData', data.row)
            this.getIsLoading = false

            uiControl.displayMessage(data['serverMessage'])
          })
          .catch(error => {
            this.getIsLoading = false
            uiControl.displayMessage('Failed to save')
          })
      }
    },
    searchData () {
      this.getIsLoading = true
      axios
        .get(`${this.apiUrl}retrieve.php`, {
          params: {
            'Work Title': this.wTitle,
            Priority: this.prio,
            'Type 1': this.t1,
            'Type 2': this.t2,
            Description: this.desc,
            Location: this.loca,
            Status: this.stat,
            Company: this.comp,
            'SAP Choice': this.sapS,
            'SAP#': this.sapN,
            'Request By': this.reqBy,
            'Request Date': this.reqD,
            'Closed By': this.closBy,
            'Completion Date': this.closD
          }
        })
        .then(({ data }) => {
          this.saveSearchData(data)
          this.getIsLoading = false
        })
        .catch(() => {
          this.getIsLoading = false
          uiControl.displayMessage('Failed to retrieve data')
        })
    },
    editMode () {
      const searchBtn = document.querySelector('#searchBtn')
      const editBtn = document.querySelector('#editBtn')
      const deleteBtn = document.querySelector('#deleteBtn')
      const saveBtn = document.querySelector('#saveBtn')
      const resetBtn = document.querySelector('#resetBtn')
      const sapN = document.querySelector('#sapN')
      const sapC = document.querySelector('#sapC')
      if (this.getClickedRow) {
        this.changeEditClicked(true)
        uiControl.editClicked()
      } else {
      }
    },
    deleteData () {
      if (!this.getClickedRow && !this.getEditClicked) {
        return
      }


      if(confirm("Do you want to delete this record ?")){
          this.getIsLoading = true
      axios
        .get(`${this.apiUrl}delete.php`, {
          params: {
            dataId: this.getClickedRow
          }
        })
        .then(({ data }) => {
          this.deleteTableItem()
          uiControl.editReset()
          this.getIsLoading = false
          uiControl.displayMessage(data)
        })
        .catch(error => {
          this.getIsLoading = false
          uiControl.displayMessage('Error in deleting')
        })
      }
      
      
    }
  },
  created () {
    // console.log(this.apiUrl);
    // console.log(process.env.VUE_APP_API_URL);
  }
}
</script>

<style lang="scss" scoped>
$mobile: 768px;

@mixin mobile {
  @media (max-width: #{$mobile}) {
    @content;
  }
}

#searchBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#editBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#deleteBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#sapC {
  display: none;
}

.displayClosed {
  opacity: 0;
  transition: opacity 1s;
  visibility: hidden;
}

.closedByLine {
  transition: all 1s;
}

.btn {
  background-color: rgb(0, 177, 169);
  border: 1px solid rgb(0, 177, 169);
  width: 150px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-family: verdana;
  box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  // letter-spacing: .15em;

  @include mobile {
    width: 75px;
  }
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

.helpButton {
  width: 80px;
}

// .btn {
//   -moz-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   -webkit-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   background-color: rgb(0, 177, 169);
//   -moz-border-radius: 25px;
//   -webkit-border-radius: 25px;
//   border-radius: 25px;
//   display: inline-block;
//   cursor: pointer;
//   color: #ffffff;
//   font-family: Verdana;
//   font-size: 15px;
//   padding: 5px 20px;
//   text-decoration: none;
//   width: 15%;
//   // min-width: 15%;
//   max-width: 18%;
//   font-weight: bold;
//   position: relative;
//   // width: 200px;
// }
// .btn:hover {
//   background-color: #ffffff;
//   color:rgb(0, 177, 169);
//   border: 1.5px solid rgb(0, 177, 169);
//   // transition: background-color 5s;
//   // transition: color .5s;
//   // transition: border .5s;
// }
// .btn:active {
//   position: relative;
//   top: 1px;
// }

/* Alert div */
.alertDiv {
  /* background-color: rgba(58, 84, 65, 0.507); */
  min-height: 25px;
  border-radius: 25px;
  width: 50%;
  color: black;
}

.alertMsg {
  min-height: 25px;
  width: 25%;
  font-weight: bold;
  border: 1px solid rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: none;
  position: absolute;
  top: 105%;
  left: 25%;
  right: 25%;
}

.loadingBar {
  // min-height: 50px;
  position: absolute;
  top: 100%;
  left: 25%;
  right: 25%;
}

@media (max-width: 768px) {
  .mainArea {
    position: static;
  }
  .formSwitch {
    justify-content: center !important;
  }
  .helpBtn {
    justify-content: center !important;
  }
}
</style>
