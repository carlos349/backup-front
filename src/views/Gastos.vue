<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Sección de gastos</h1>
                        <p class="text-white  mb-2">Esta es la sección de gastos del negocio, aquí podrás registrar, y visualizar todos tus gastos.</p>
                        <base-button v-if="validRoute('gastos', 'registrar')" type="success" v-on:click="modals.modal2 = true">Registrar gasto</base-button>
                    </div>
                </div>
            </div>
        </base-header>
        <vue-bootstrap4-table :rows="expenses" :columns="columns" :classes="classes" :config="config">
            <template slot="date-format" slot-scope="props">
                {{formatDate(props.row.date)}}
            </template>
            <template slot="figure-format" slot-scope="props">
                {{formatPrice(props.row.figure)}}
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                  
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
        <modal :show.sync="modals.modal1"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        <h3>Datos del gasto</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                         <base-input alternative
                            class="mb-3"
                            placeholder="Razón"
                            v-model="dataExpense.reason"
                            v-on:keyup="validRegister()"
                            addon-left-icon="ni ni-single-02"
                            addon-right-icon="fa fa-asterisk text-danger" >
                        </base-input>
                        <currency-input
                            v-model="dataExpense.amount"
                            locale="de"
                            placeholder="Monto"
                            v-on:keyup="validRegister()"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                        />	
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker 
                                    slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDate"
                                    class="form-control datepicker"
                                    aria-placeholder="Seleccione una fecha"
                                    v-model="dates.simple">
                            </flat-picker>
                        </base-input>
                        <div class="text-center">
                            <base-button type="default" v-if="!dataExpense.valid" disabled>
                                Registrar
                            </base-button>  
                            <base-button type="default" v-if="dataExpense.valid" v-on:click="registerExpense">
                                Registrar
                            </base-button>  
                        </div>
                    </form>
                </template>
            </card>
        </modal>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
// COMPONENTS
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
    components: {
        VueBootstrap4Table,
        flatPicker
    },
    data(){
        return {
            auth:[],
            dataExpense: {
                reason: '',
                amount: 0,
                valid: false
            },
            configDate: {
                allowInput: true, 
                minDate: new Date(),
            },
            dates: {
                simple: new Date()
            },
            modals: {
                modal1: false,
                modal2: false,
                message: "",
                icon: '',
                type:''
            },
            columns: [{
                    label: "Razón",
                    name: "expense",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Tipo",
                    name: "type",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Monto",
                    name: "figure",
                    slot_name:"figure-format",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "Enter first name"
                    // },
                    sort: true,
                },
                {
                    label: "fecha",
                    name: "date",
                    slot_name:'date-format',
                    sort: true,
                }
            ],
            config: {
                card_title: "Tabla de gastos",
                checkbox_rows: false,
                rows_selectable : true,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                global_search: {
                    placeholder: "Enter custom Search text",
                    visibility: false,
                    case_sensitive: false
                },
                show_refresh_button: false,
                show_reset_button: false,  
                selected_rows_info: true,
                preservePageOnDataChange : true,
                pagination_info : true
            },
            classes: {
                table: "table-bordered table-striped"
            },
            expenses:[]
        }
    },
    beforeCreate(){
        if (!localStorage.getItem('userToken')) {
          this.$swal({ 
              type: 'error',
              title: 'URL restringida',
              showConfirmButton: false,
              timer: 1500
          })
            router.push({name: 'login'})
		}
    },
    created(){
        this.getExpenses()
        this.getToken()
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        registerExpense(){
            axios.post(endPoint.endpointTarget+'/expenses', {
                reason: this.dataExpense.reason,
                amount: this.dataExpense.amount,
                dateSelect: this.dates.simple
            })
            .then(res => {
                if (res.data.status === 'ok') {
                   this.modals = {
                        modal1: true,
                        message: "Se registro el gasto",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                    }, 1500);
                    this.dataExpense.reason = ''
                    this.dataExpense.amount = ''
                    this.dates.simple = new Date()
                    this.getExpenses()
                }else{
                    this.$swal({
                        type: 'error',
                        title: 'Hubo un problema tecnico :(',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                this.$swal({
                    type: 'error',
                    title: 'Hubo un problema tecnico :(',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        getExpenses(){
            axios.get(endPoint.endpointTarget+'/expenses')
            .then(res => {
                this.expenses = res.data
            })
        },
        validRegister(){
            this.dataExpense.valid = this.dataExpense.reason != '' && this.dataExpense.amount > 0 ? true : false
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+' ('+dateFormat.getHours()+":"+('0'+dateFormat.getMinutes()).slice(-2)+")"
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        validRoute(route, type){
            for (let index = 0; index < this.auth.length; index++) {
                const element = this.auth[index];
                if (element.ruta == route) {
                    for (let i = 0; i < element.validaciones.length; i++) {
                        if (type == element.validaciones[i]) { 
                            return true
                        } 
                    }
                }
            }
        }
    }
}
</script>
<style>

</style>