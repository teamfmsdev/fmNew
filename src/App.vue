<template>
  <div id="app">

    <div id="nav">
      <h1 class="mb-0 p-0" v-text="'PCOGD Facilities Management'"></h1>
      <h2 class="p-0 mt-0 text-white">
        <strong v-text="'Request and Reporting'"></strong>
      </h2>
      <a href="/pcogdccfm" v-text="'Planning & Scheduling'"></a>
      <!-- <router-link to="/">Home</router-link>| -->
    </div>
    <customForm></customForm>
    <customTable></customTable>

  </div>
</template>

<script>
import '@/styles/globalStyle.css'
import customForm from '@/components/customForm.vue'
import customTable from '@/components/customTable.vue'
export default {
  name: 'app',
  components: {
    customForm,
    customTable
  }
}
</script>

<style lang="scss">

$mobile : 768px;

@mixin mobile{
  @media(max-width: #{$mobile}){
    @content
  }
}

#app {
  // background-color: rgb(36, 34, 34) !important;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(36, 34, 34) ;
  // color: white;
}
body{

}
#nav {
  margin-bottom: 2%;
  background-color: rgb(0, 177, 169);
  // padding: 1rem;
  h1 {
    font-weight: bold;
    color: white;
  }
  a {
    font-weight: bold;
    // color: white;
  }

  @include mobile{
    h1{
      font-size: 1.5em;
    }
    h2 strong{
      font-size: .8em;
    }
  }
}
</style>
