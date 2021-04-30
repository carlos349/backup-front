<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Sección de clientes</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus clientes, aquí podrás registrar, editar y visualizar todos tus clientes.</p>
                        <base-button v-if="validRoute('clientes', 'registrar')" @click="modals.modal1 = true , initialState(2)" type="success">Registrar un cliente</base-button>
                        <base-button icon="ni ni-email-83" v-if="validRoute('clientes', 'correos')" type="success" @click="modals.modal3 = true">Enviar correos</base-button>
                        <base-button v-if="validRoute('clientes', 'filtrar')" @click="showFilter" type="default">Filtrar</base-button>
                        <base-button @click="generateExcel" type="default" icon="ni ni-book-bookmark"></base-button>
                    </div>
                </div>
            </div>
        </base-header>
        

        <!-- MODAL REGISTRAR -->

        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        Datos del cliente
                    </div>
                </template>
                <template>
                    <tabs v-if="registerClient.valid2 == true" fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane>
                                <span v-if="registerClient.valid2 == true" slot="title">
                                    <i class="ni ni-collection"></i>
                                    Basicos
                                </span>
                                <form role="form">
                                    <base-input alternative
                                                class="mb-3"
                                                placeholder="Nombre"
                                                v-model="registerClient.name"
                                                v-on:keyup="validRegister()"
                                                addon-left-icon="ni ni-single-02"
                                                addon-right-icon="fa fa-asterisk text-danger">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Correo"
                                                v-model="registerClient.id"
                                                v-on:keyup="validRegister()"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fa fa-asterisk text-danger">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactOne"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fas fa-plus text-default">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactTwo"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fas fa-plus text-default">
                                    </base-input>
                                    <div class="text-center">
                                        <base-button type="primary" v-if="registerClient.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                                        <base-button type="primary" v-on:click="clientEdit()" v-else class="my-4">{{tipeForm}}</base-button>
                                    </div>
                                    
                                </form>                                
                            </tab-pane>

                            <tab-pane v-if="registerClient.valid2 == true">
                                <span slot="title">
                                    <i class="ni ni-chart-bar-32"></i>
                                    Avanzados
                                </span>
                                <div class="row">
                                    <base-button v-if="registerClient.birthday" class="col-12 mt-1" type="primary">
                                        <span class="text-left">Fecha de nacimiento</span>
                                        <badge class="text-default" type="secondary">{{formatDateTwo(registerClient.birthday)}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Participación</span>
                                        <badge class="text-default" type="secondary">{{registerClient.participation}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span class="text-left">Recomendaciones</span>
                                        <badge class="text-default" type="secondary">{{registerClient.recommenders}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span class="text-left">Recomendador</span>
                                        <badge class="text-default" type="secondary">{{registerClient.recommender}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Cliente desde</span>
                                        <badge class="text-default" type="secondary">{{registerClient.date}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Ultima atención</span>
                                        <badge class="text-default" type="secondary">{{registerClient.lastDate}}</badge>
                                    </base-button>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                    <form v-else role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre"
                                    v-model="registerClient.name"
                                    v-on:keyup="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Correo"
                                    v-model="registerClient.id"
                                    v-on:keyup="validRegister()"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <div class="row">
                            <div class="col-md-3">
                                <base-input alternative
                                    type="text"
                                    value="+56"
                                    readonly="true">
                                </base-input>
                            </div>
                            <div class="col-md-9">
                                <base-input alternative
                                    type="text"
                                    placeholder="Teléfono"
                                    v-on:input="formatPhone"
                                    maxlength="9"
                                    v-model="registerClient.contactOne"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
                                </base-input>
                            </div>
                        </div>
                        
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactTwo"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
                        </base-input>
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker 
                                    slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDate"
                                    class="form-control datepicker"
                                    placeholder="Seleccione una fecha"
                                    v-model="registerClient.birthday">
                            </flat-picker>
                        </base-input>
                        <base-checkbox v-model="registerClient.discount" class="mb-3">
                            Descuento de nuevo cliente
                        </base-checkbox>
                        <vue-single-select
                            v-model="registerClient.recommender"
                            :options="clientsNames"
                            placeholder="Recomendador"
                        ></vue-single-select>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerClient.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                            <base-button type="primary" v-on:click="registerClients()" v-else class="my-4">{{tipeForm}}</base-button>
                        </div>
                        
                    </form>
            </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        Elija la plantilla de diseño para su correo
                    </div>
                </template>
                <template>
                    <div class="row p-3">
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(1)">
                                <img src="../assets/template-1.png" style="width:100%;" alt="">
                            </div>
                        </div>
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(2)">
                                <img src="../assets/template-2.png" style="width:100%;" alt="">
                            </div>
                        </div>
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(3)">
                                <img src="../assets/template-3.png" style="width:100%;" alt="">
                            </div>
                        </div>
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(4)">
                                <img src="../assets/template-4.png" style="width:100%;" alt="">
                            </div>
                        </div>
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(5)">
                                <img src="../assets/template-5.png" style="width:100%;" alt="">
                            </div>
                        </div>
                        <div class="col-4 p-1">
                            <div class="template" v-on:click="selectTemplate(6)">
                                <img src="../assets/template-6.png" style="width:100%;" alt="">
                            </div>
                        </div>
                    </div>
                </template>
            </card>
        </modal>
        <base-alert class="positionAlert" type="success" v-if="successRegister">
            <strong>Registrado!</strong> Has registrado al cliente con exito!
        </base-alert>

        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table v-if="progress" class="tableClient" :rows="rows" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <center>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Detalles / Editar</span>
                            </template>
                            <base-button v-if="validRoute('clientes', 'detalle')" size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row.participacion, props.row.recomendacion, props.row.recomendaciones, props.row.ultimaFecha, props.row.fecha, props.row._id, props.row.birthday)" icon="ni ni-bullet-list-67"></base-button>
                            <base-button disabled v-else size="sm" type="default" icon="ni ni-bullet-list-67"></base-button>
                        </a-tooltip>
                        
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Eliminar</span>
                            </template>
                            <base-button v-if="validRoute('clientes', 'eliminar')" size="sm" v-on:click="deleteClient(props.row._id)" type="warning" icon="fas fa-trash"></base-button>
                            <base-button disabled v-else size="sm" type="warning" icon="fas fa-trash"></base-button>
                        </a-tooltip>
                        
                    </center>
                    
                </b>
            </template>
            <template slot="birthday-format" slot-scope="props">
                <span v-if="props.row.birthday">{{formatDateTwo(props.row.birthday)}}</span>
                <span v-else>Sin fecha de nacimiento</span>
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
        <center v-else>
            <loading-progress
                :progress="progress"
                :indeterminate="indeterminate"
                class="text-center"
                :hide-background="hideBackground"
                shape="circle"
                size="100"
                fill-duration="2"
            />
        </center>

        <!-- END -->

    </div> 
</template>

<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'
import router from '../router'
import XLSX from 'xlsx'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import VueMoment from 'vue-moment'
var moment = require('moment');
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table,
        flatPicker
    },
    data() {
      return {
        progress:false,
        auth: [],
        successRegister:false,
        clientsNames: [],
        clientIds:[],
        tipeForm: '',
        configDate: {
            allowInput: true, 
            dateFormat: 'd-m-Y',
        },
        registerClient: {
            name:'',
            id:'',
            contactOne:'',
            contactTwo:'',
            birthday: '',
            recommender:null,
            discount:false,
            valid:false,
            valid2:false,
            recommenders:'',
            lastDate:'',
            date:'',
            participation:0
        },
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            message: "",
            icon: '',
            type:''
        },
        rows: [],
        columns: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Contacto principal",
                name: "identidad",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Contacto adicional",
                name: "correoCliente",
                sort: true,
            },
            {
                label: "Fecha de cumpleaños",
                name: "birthday",
                slot_name: 'birthday-format',
                sort: true,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Administrar",
                name: "_id",
                sort: false,
                slot_name: "Administrar"
            },
            ],
        config: {
            card_title: "Tabla de clientes",
            checkbox_rows: false,
            rows_selectable : true,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            rows_selectable: true,
            per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
            global_search: {
                placeholder: "Filtre sus clientes",
                visibility: true,
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
        }     
      };
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
		this.getClients();
        this.getToken();
        $(document).ready(function(){
    $(".page-link").click(function(){
      console.log("asdasd")
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  });
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        getClients(){
            this.progress = false
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
				
                this.rows = res.data
                for (let index = 0; index < res.data.length; index++) {
                    this.clientsNames.push(res.data[index].nombre + " / " + res.data[index].identidad)
                    this.clientIds.push(res.data[index].nombre + " / " + res.data[index].identidad + "-" + res.data[index]._id)
                }
                this.progress = true
            })
        },
        generateExcel(){
            var Data = []
            for (let index = 0; index < this.rows.length; index++) {
                const element = this.rows[index];
                Data.push({Nombre: element.nombre, 'Contacto principal': element.identidad, 'Contacto adicional': element.correoCliente,'Contacto adicional 2°': element.instagramCliente, Atenciones: element.participacion, Recomendador: element.recomendacion, Recomendaciones: element.recomendaciones, 'Ultima atencion': this.formatDate(element.ultimaFecha), Fecha: this.formatDate(element.fecha)})
            }
            var Datos = XLSX.utils.json_to_sheet(Data) 
            var wb = XLSX.utils.book_new() 
            XLSX.utils.book_append_sheet(wb, Datos, 'Datos') 
            XLSX.writeFile(wb, 'Clientes.xlsx') 
        },
        registerClients(){
            var ifCheck = this.registerClient.discount ? 0 : 1
            var idRecomender = ''
            if (this.registerClient.recommender != null) {
                for (let i = 0; i < this.clientIds.length; i++) {
                    const spId = this.clientIds[i].split("-")
                    if (spId[0] == this.registerClient.recommender) {
                        idRecomender = spId[1]
                    } 
                }
            }
            var date = this.registerClient.birthday
            if (this.registerClient.birthday.split('-')[1]) {
                var split = this.registerClient.birthday.split('-')
                date = split[1]+'-'+split[0]+'-'+split[2]
            }
            const phone = this.registerClient.contactOne.length > 0 ? '+56 '+this.registerClient.contactOne : ''
            axios.post(endPoint.endpointTarget+'/clients', {
                nombre:this.registerClient.name,
                identidad:this.registerClient.id,
                recomendador:this.registerClient.recommender,
                idRecomender:idRecomender,
                correoCliente:phone,
                birthday: date,
                instagramCliente:this.registerClient.contactTwo,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'Registrado') {
                    this.modals = {
                        modal2: true,
                        message: "Se registro el cliente con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.initialState(1)
                        this.getClients()
                        EventBus.$emit('reloadClients', 'reload')
                    }, 1500);
                    
                }else{
                    this.modals = {
                        modal2: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        validRegister(){
            if (this.registerClient.name != '' && this.registerClient.id != '') {
                if (this.registerClient.id.split('@').length == 2) {
                    if (this.registerClient.id.split('@')[1].split('.').length == 2) {
                        this.registerClient.valid = true
                    }else{
                        this.registerClient.valid = false
                    }
                }else{
                    this.registerClient.valid = false
                }
            }
            else {
                this.registerClient.valid = false
            }
        },
        formatPhone(){
            var number = this.registerClient.contactOne.replace(/[^\d]/g, '')
            if (number.length == 9) {
                number = number.replace(/(\d{1})(\d{4})/, "$1-$2-");
            } else if (number.length == 10) {
                number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            }
            this.registerClient.contactOne = number
        },
        MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
        },
        initialState(val){
            this.registerClient= {
                name:'',
                id:'',
                contactOne:'',
                discount:false,
                birthday: '',
                contactTwo:'',
                recommender:null,
                valid:false
            }
            if (val == 1) {
                this.modals = {
                    modal1: false,
                    modal2:false,
                    modal3:false,
                }
            }
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        pushData(nombre,id,correo,ig,participacion,recomendacion,recomendaciones,ultimaFecha,fecha,_id, birthday){
            this.registerClient= {
                name:nombre,
                id:id,
                contactOne:correo,
                discount:false,
                contactTwo:ig,
                birthday: birthday,
                recommender:recomendacion,
                valid:true,
                valid2:true,
                recommenders:recomendaciones,
                lastDate:this.formatDate(ultimaFecha),
                date:this.formatDate(fecha),
                participation:participacion,
                _id:_id
            }

        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return moment(dateFormat).format("DD-MM-YYYY HH:mm")
        },
        formatDateTwo(date) {
            let dateFormat = new Date(date)
			return moment(dateFormat).format("MMMM Do YYYY")
        },
        deleteClient(id){
			this.$swal({
				title: '¿Está seguro de borrar el cliente?',
				text: 'No puedes revertir esta acción',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Estoy seguro',
				cancelButtonText: 'No, evitar acción',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
				if(result.value) {
					axios.put(endPoint.endpointTarget+'/clients/deleteClient/'+id)
					.then(res => {
                        if (res.data.status == 'ok') {
                            this.modals = {
                                modal2: true,
                                message: "Cliente borrado con exito",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3:false,
                                    message: "",
                                    icon: '',
                                    type:''
                                }
                                this.getClients()
                                EventBus.$emit('reloadClients', 'reload')
                            }, 1500);
							// this.getClientsThree()
							// this.ServicesQuantityChartFunc();
							// this.emitMethodTwo()
						}
					})
				}
				else{
					this.modals = {
                        modal2: true,
                        message: "Acción cancelada",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type:''
                        }
                    }, 1500);
				}
			})
        },
        clientEdit(){
            axios.put(endPoint.endpointTarget+'/clients/'+this.registerClient._id, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                console.log(res)
                if (res.data.status == 'Servicio actualizado') {
                    this.modals = {
                        modal2: true,
                        message: "el cliente editó con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.getClients();
                        this.initialState(1)
                        EventBus.$emit('reloadClients', 'reload')
                    }, 1500);
                }else{
                    this.modals = {
                        modal2: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        showFilter(){
            $('.tableClient .vbt-table-tools').toggle()
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
        },
        selectTemplate(select){
            this.modals = {
                modal1: false,
                modal2: false,
                modal3:false,
                message: "",
                icon: '',
                type: ''
            }
            setTimeout(() => {
               localStorage.setItem('selectTemplate', select)
                router.push({path: 'Correo'}) 
            }, 200);
			
		}
    }
  };
</script>
<style lang="scss">
    .card-header{
        font-size: 2.5vw;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .positionAlert{
        position: absolute;
        top:14%;
        left: 32%;
        z-index: 100000;
    }
    .tableClient .vbt-table-tools{
        display:none;
    }
    .tableClient .vbt-table-tools .vbt-global-search .form-group{
        width: 30%;
    }
    .template{
		padding: 2px;
		// background-color: #e4e8ec;
		cursor: pointer;
		-webkit-transition: all 0.5s ease-out;
        opacity:.6;
	}
	.template:hover{
		background-color: rgb(90, 90, 90);
        opacity:1;
	}
    .vue-progress-path path {
        stroke-width: 12;
    }
    .vue-progress-path .progress {
        stroke:#00768c;
    }
    .vue-progress-path .background {
        stroke: transparent;
    }
</style>