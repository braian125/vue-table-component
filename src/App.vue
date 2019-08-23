<template>
  <div id="app">
    <h3>Table Component using vue slots</h3><br>
    <table-component :data="users" @click-event="clickEvent" :perPage="5" pagination>
      <table-column slot="label" :label="'ID'" v-bind:value="'id'"></table-column>
      <table-column slot="label" :label="'Nombres'" v-bind:value="'name'"></table-column>
      <table-column slot="label" :label="'Apellidos'" v-bind:value="'last_name'"></table-column>
      <table-column slot="label" :label="'Empresa'" v-bind:value="'company.name'"></table-column>
      <table-column slot="label" :label="'Acciones'" :icon="'fa'">
        <template slot="icon" :icon="'fa fa-search'" :class="'btn btn-sm btn-info'" :slug="''" :tooltip="'Ver Usuario'"></template>
        <!--template slot="icon" :icon="'fa fa-dollar'" :class="'btn btn-sm btn-info'" :slug="'abono'" :tooltip="'Ver Abonos'"></template>
        <template slot="icon" :icon="'fa fa-file-o'" :class="'btn btn-sm btn-info dropdown-toggle'" :slug="''" :tooltip="''"></template-->
      </table-column>
    </table-component>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'app',
  data: () => {
    return {
      users: []
    }
  },
  components: {
    TableComponent: () => import(/* webpackChunkName: "TableComponent" */ "@/components/TableComponent"),
    TableColumn: () => import(/* webpackChunkName: "TableColumn" */ "@/components/TableColumn")
  },
  methods: {
    clickEvent() {
      console.log('go to user detail')// eslint-disable-line no-console
    },
    fetchData() {
      axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
          this.users = response.data;
      })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style lang="scss" src="./assets/scss/app.scss"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
