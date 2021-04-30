<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                
                <div class="row">
                    <div class="col-lg-12 col-md-12" style="display:inline-block">
                        <span>{{  }}</span>
                        <h1 class="display-2 text-white w-100">Sección de ventas</h1>
                        <label class="text-white" v-if="validRoute('ventas', 'filtrar')">Filtra tus ventas</label>
                        <div class="row">
                            <div class="col-md-6">
                                <base-input v-if="validRoute('ventas', 'filtrar')" addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="configDatePicker"
                                        class="form-control datepicker"
                                        v-model="dates.range">
                                    </flat-picker>
                                </base-input>
                            </div>
                            <div class="col-md-2">
                                <base-button v-if="validRoute('ventas', 'filtrar')"  type="default" v-on:click="filterSale">Filtrar</base-button>
                            </div>
                            <div class="col-md-2">
                                <base-button v-if="inspectorFilter"  type="secondary" v-on:click="getSales('button')">
                                    <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
                                </base-button>
                            </div>
                            <div class="col-md-4">
                                <base-button title="Generar excel" icon="ni ni-book-bookmark" class="excel-generate" v-if="validRoute('ventas', 'filtrar')"  type="default" v-on:click="modals.modal3 = true"> </base-button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Detalle de la venta</h3> 
                    </div>
                </template>
                
                <template>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-cloud-upload-96"></i>
                                    Básicos
                                </span>
                                <div class="text-muted text-left">
                                    <h3><strong>Fecha: </strong>{{formatDate(arreglo.fecha)}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>N° de Venta: </strong>V-{{arreglo.count}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Prestador/es: <br/></strong><span v-for="lender of arreglo.EmployeComision" :key="lender">{{lender.employe}}  <br/></span></h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Cliente/s: <br/></strong><span v-for="client of arreglo.cliente" :key="client">{{client}} <br/></span></h3> 
                                </div>
                                <hr>
                                <div class="text-muted mt-2">
                                    <h2 class="text-center">Metodos de pago </h2>
                                    <div class="row">
                                       <h3 class="col-4 mx-auto" v-if="arreglo.pagoEfectivo >0"><strong class="text-left"><base-button class="col-12" type="secondary">Efectivo <badge type="success" class="text-default">{{formatPrice(arreglo.pagoEfectivo)}}</badge></base-button></strong><span class="float-right pr-5"> </span></h3> 

                                        <h3 class="col-4 mx-auto" v-if="arreglo.pagoRedCDebito > 0"><strong class="text-left"><base-button class="col-12" type="secondary">Débito <badge type="success" class="text-default">{{formatPrice(arreglo.pagoRedCDebito)}}</badge></base-button> </strong><span class="float-right pr-5"> </span></h3>

                                        <h3 class="col-4 mx-auto" v-if="arreglo.pagoRedCCredito > 0"><strong class="text-left"><base-button class="col-12" type="secondary">Crédito <badge type="success" class="text-default">{{formatPrice(arreglo.pagoRedCCredito)}}</badge></base-button></strong><span class="float-right pr-5"> </span></h3>


                                        <h3 class="col-4 mx-auto" v-if="arreglo.pagoOtros > 0"><strong class="text-left"><base-button class="col-12" type="secondary">Otras <badge type="success" class="text-default">{{formatPrice(arreglo.pagoOtros)}}</badge></base-button></strong><span class="float-right pr-5"> </span></h3>

                                        <h3 class="col-6 mx-auto" v-if="arreglo.pagoTransf > 0"><strong class="text-left"><base-button class="col-12" type="secondary">Transferencia <br> <badge type="success" class="text-default">{{formatPrice(arreglo.pagoTransf)}}</badge></base-button> </strong><span class="float-right pr-5"></span></h3>

                                        <h3 class="col-6 mx-auto" v-if="arreglo.pagoOrder > 0"><strong class="text-left"><base-button class="col-12" type="secondary">Pago por pedido <badge type="success" class="text-default">{{formatPrice(arreglo.pagoOrder)}}</badge> </base-button></strong><span class="float-right pr-5"> </span></h3> 
                                    </div>
                                    
                                </div>
                            </tab-pane>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-bell-55 mr-2"></i>
                                    Avanzados
                                </span>
                                <!-- <template>
                                    <a-descriptions title="Detalles avanzados" :column="5" size="small" layout="vertical" bordered>
                                        <a-descriptions-item label="Servicio">
                                            <span v-for="services of arreglo.servicios" :key="services">-{{services.servicio}} <br> </span>
                                        </a-descriptions-item>
                                        <a-descriptions-item label="Precio">
                                            <span v-for="services of arreglo.servicios" :key="services">{{formatPrice(services.precio)}} <br> </span>
                                        </a-descriptions-item>
                                        <a-descriptions-item label="%">
                                            <span v-for="discounts of arreglo.descuento" :key="discounts" >{{discounts.split(" / ")[1]}}<br> </span>
                                        </a-descriptions-item>
                                        <a-descriptions-item label="Total">
                                        $60.00
                                        </a-descriptions-item>
                                    </a-descriptions>
                                </template> -->
                                <div class="text-muted text-left">
                                    <h3><strong>Servicio(s): </strong><span v-for="services of arreglo.servicios" :key="services"> <br> {{services.servicio}}  </span></h3> 
                                     <h3><strong class="text-left">Diseño: </strong><span >{{formatPrice(arreglo.design)}} </span></h3>
                                     <h3><strong class="text-left">Descuento: </strong><span v-for="discounts of arreglo.descuento" :key="discounts" >{{discounts}}%<br> </span></h3> 
                                </div>
                                <div class="text-muted">
                                    <h2 class="text-center">Montos</h2>
                                    
                                    <base-button class="w-100 text-left" type="secondary"><span class="text-left">Comisión total:</span><badge type="success" class="text-default float-right">{{formatPrice(arreglo.comision)}}</badge></base-button>

                                    <base-button class="w-100 text-left" type="secondary"><span class="text-left">Local:</span><badge type="success" class="text-default float-right">{{formatPrice(arreglo.ganancialocal)}}</badge></base-button>

                                    <base-button class="w-100 text-left" type="secondary"><span class="text-left">Total:</span><badge type="success" class="text-default float-right">{{formatPrice(arreglo.total)}}</badge></base-button>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                    <template v-if="validRoute('ventas', 'filtrar')">
                        <base-button block class="mt-2" v-if="arreglo.status" type="default" v-on:click="cancelSale(arreglo._id,arreglo.servicios)">Anular venta</base-button>
                    </template>
                    <template v-else>
                        <base-button disabled block class="mt-2" v-if="arreglo.status" type="default">Anular venta</base-button>
                    </template>
                    
                </template>
            </card>
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
                       <h3>Aplica filtros para tu reporte {{dates.rangeExcel}}</h3> 
                    </div>
                </template>
                <template>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="date">Filtra por fecha</label>
                            <base-input addon-left-icon="ni ni-calendar-grid-58">
                                <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDatePicker"
                                    class="form-control datepicker"
                                    v-model="dates.rangeExcel">
                                </flat-picker>
                            </base-input>
                        </div>
                        <div class="col-md-6">
                            <label for="lender">¿Filtrar por prestadora en específico?</label>
                            <div v-on:click="chooseLender"> 
                                <vue-single-select v-if="validClient"
                                v-model="lenderSelect"
                                :options="lenderNames"
                                placeholder="Prestadoras"
                                ></vue-single-select> 
                                <vue-single-select v-else
                                v-model="lenderSelect"
                                :options="lenderNames"
                                placeholder="Prestadoras"
                                class="bgcolor-danger"
                                disabled
                                ></vue-single-select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="lender">¿Filtrar por cliente en específico?</label>
                            <div v-on:click="chooseClient">
                                <vue-single-select v-if="validLender"
                                v-model="clientSelect"
                                :options="clientNames"
                                placeholder="Clientes"
                                ></vue-single-select>  
                                <vue-single-select v-else
                                v-model="clientSelect"
                                :options="clientNames"
                                placeholder="Clientes"
                                class="bgcolor-danger"
                                disabled
                                ></vue-single-select> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <center>
                                <base-button type="default" v-on:click="generateExcel()"> Generar
                                </base-button>
                            </center>
                        </div>
                    </div>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table v-if="progress" :rows="sales" :columns="columns" :classes="classes" :config="configTable">
            <template slot="date-format" slot-scope="props">
                {{formatDate(props.row.fecha)}}
            </template>
            <template slot="lenderName" slot-scope="props">
                {{justName(props.row.manicurista)}}
            </template>
            <template slot="comission" slot-scope="props">
                {{formatPrice(props.row.comision)}}
            </template>
            <template slot="localGain" slot-scope="props">
                {{formatPrice(props.row.ganancialocal)}}
            </template>
            
            <template slot="totalGain" slot-scope="props">
                {{formatPrice(props.row.total)}}
            </template>
            <template slot="reportSale" slot-scope="props">
                <center v-if="validRoute('ventas', 'detalle')" >
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>Ver detalles</span>
                        </template>
                        <base-button v-if="props.row.status" icon="ni ni-fat-add" size="sm" type="default" v-on:click="dataReport(props.row._id)"></base-button>
                    <base-button v-else icon="ni ni-fat-add" size="sm" type="danger" v-on:click="dataReport(props.row._id)"></base-button>
                    </a-tooltip>
                    
                </center>
                <center v-else >
                    <base-button v-if="props.row.status" icon="ni ni-fat-add" disabled size="sm" type="default" v-on:click="dataReport(props.row._id)"></base-button>
                    <base-button v-else icon="ni ni-fat-add" disabled size="sm" type="danger" v-on:click="dataReport(props.row._id)"></base-button>
                </center>
               
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
        </vue-bootstrap4-table>
        <center v-else>
            <loading-progress
                
                :progress="progress"
                :indeterminate="true"
                class="text-center"
                :hide-background="true"
                shape="circle"
                size="100"
                fill-duration="2"
            />
        </center>
        <modal :show.sync="modals.modal2"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import EventBus from '../components/EventBus'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {Spanish} from 'flatpickr/dist/l10n/es.js';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode'
import XLSX from 'xlsx'
import VueMoment from 'vue-moment'
var moment = require('moment'); // require
const dateNew = new Date()


export default {
    components: {
        flatPicker,
        VueBootstrap4Table
    },
    data() {
        return {
            progress:false,
            auth: [],
            socket: io(endPoint.endpointTarget),
            modals: {
                modal1: false,
                modal2: false,
                modal3:false,
                message: "",
                icon: '',
                type:''
            },
            dates: {
                range:   dateNew.getDate()+ "-" +  (dateNew.getMonth()+ 1) +"-"+dateNew.getFullYear(),
                rangeExcel: dateNew.getDate()+ "-" +  (dateNew.getMonth()+ 1) +"-"+dateNew.getFullYear()
            },
            configDatePicker: {
                allowInput: true, 
                mode: 'range',
                dateFormat: 'd-m-Y',
                locale: Spanish, // locale for this instance only          
            }, 
            columns: [{
                label: "Fecha",
                name: "fecha",
                slot_name: "date-format",
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                slot_name: "comission",
            },
            {
                label: "Total local",
                name: "ganancialocal",
                slot_name: "localGain",
            },
            {
                label: "Total",
                name: "total",
                slot_name: "totalGain",
            },
            {
                label: "Cliente",
                name: "cliente",
                slot_name: "client",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Prestadoras",
                name: "manicurista",
                slot_name:"lenderName",
                sort: true,
            },
            {
                label: "Acciones",
                name: "_id",
                slot_name: "reportSale",
            }],
            configTable: {
                card_title: "Tabla de ventas",
                checkbox_rows: false,
                rows_selectable : true,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                num_of_visibile_pagination_buttons: 7,
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
            sales: [],
            arreglo: [],
            successAlert: false,
            errorAlert: false,
            messageSuccess: '',
            messageError: '',
            inspectorFilter: false,
            lenderSelect: '',
            lenderNames: [],
            clientSelect: '',
            clientNames: [],
            paySelect: '',
            payNames: ['Efectivo', 'Transferencia', 'Débito', 'Crédito', 'Otros'],
            validLender: true,
            validClient: true,
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
        this.getSales('no-button')
        this.getToken()
        this.getClient()
        this.getLenders()
        $(document).ready(function(){
            setTimeout(() => {
               $("input[placeholder='Go to page']").hide(); 
            }, 200);
            
        });
        
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        getClient(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
                this.clientNames = []
                for (let index = 0; index < res.data.length; index++) {
                    this.clientNames.push(res.data[index].nombre+ ' / ' +res.data[index].identidad)
                }
            })
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                this.lenderNames = []
                for (let index = 0; index < res.data.length; index++) {
                    this.lenderNames.push(res.data[index].nombre)
                }
            })
        },
        async filterSale(){
            console.log(this.dates.range)
            this.progress = false
            this.inspectorFilter = true
            const splitDate = this.dates.range.split(' a ')
            if (splitDate.length > 1) {
                var f1 = splitDate[0].split("-")
                var f2 = splitDate[1].split("-")
                var Dates = f1[1]+"-"+f1[0]+"-"+f1[2]+":"+f2[1]+"-"+f2[0]+"-"+f2[2]
                
                try {
                    const sales = await axios.get(endPoint.endpointTarget+'/ventas/findSalesByDate/'+Dates)
                    if (sales.data.status == 'no Sales') {
                        this.progress = true
                        this.modals = {
                            modal2: true,
                            message: "No hay ventas en las fechas seleccionadas",
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
                        }, 2000);
                    }else{
                        this.progress = true
                        this.sales = sales.data.status
                    }
                }catch(error){
                    console.log(error)
                }
            }else{
                
                var f1 = this.dates.range.split("-")
                var newsD = f1[1]+"-"+f1[0]+"-"+f1[2]
                var dateDesde = new Date(newsD)
                const formatDesde =(dateDesde.getMonth() + 1) + "-" + dateDesde.getDate()+"-"+dateDesde.getFullYear() 
                dateDesde.setDate(dateDesde.getDate() + 1)
                const formatHasta = (dateDesde.getMonth() + 1)+"-" + dateDesde.getDate()+"-"+dateDesde.getFullYear()
                const Dates = formatDesde+':'+formatHasta
                console.log(Dates)
                try {
                    const sales = await axios.get(endPoint.endpointTarget+'/ventas/findSalesByDay/'+Dates)
                    if (sales.data.status == 'no Sales') {
                        this.progress = true
                        this.modals = {
                            modal2: true,
                            message: "No hay ventas en la fecha seleccionada",
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
                        }, 2000);
                    }else{
                        this.progress = true
                        this.sales = sales.data.status
                    }
                }catch(err){
                    console.log(err)
                }
            }
        },
        getSales(button){
            if(button == 'button'){
                this.dates.range = ''
            }
            this.inspectorFilter = false
            const config = {headers: {'x-access-token': localStorage.userToken}}
            axios.get(endPoint.endpointTarget+'/ventas', config)
            .then(res => {
                this.sales = res.data
                
                
                this.progress = true
            }).catch(err => {
                this.modals = {
                    modal2: true,
                    message: "Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio",
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
                }, 2000);
                router.push({name: 'login'})
            })
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return moment(dateFormat).format("DD-MM-YYYY")
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        justName(value){
            if(value){
                const split = value.split(' / ')
                var goBack = ''
                for (let index = 0; index < split.length; index++) {
                    goBack = goBack +'\n '+ split[index]
                }
                return goBack
            }
        },
        async dataReport(id){
            try {
                const sale = await axios.get(endPoint.endpointTarget+'/ventas/getSale/'+id)
                this.arreglo = sale.data
                this.arreglo.cliente = this.arreglo.cliente.split(' - ')
                this.arreglo.manicurista = this.arreglo.manicurista.split(' / ')
                this.arreglo.descuento = this.arreglo.descuento.split(' - ')
                this.modals.modal1 = true
            } catch(err) {
                this.messageError = 'error técnico'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
                this.modals = {
                    modal2: true,
                    message: "Error técnico",
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
                }, 2000);
            }
        },
        async cancelSale(id,servicios){
            const cancelSale = await axios.put(endPoint.endpointTarget+'/ventas/'+id, {
                employeComision: this.arreglo.EmployeComision
            })
            if (cancelSale.data.status == 'ok') {
                axios.post(endPoint.endpointTarget+'/inventario/nullSale', {
                    array:servicios
                })
                this.modals = {
                    modal2: true,
                    message: "¡Venta anulada!",
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
                        type: ''
                    }
                }, 2000);
                this.getSales('no-button')
                this.arreglo.status = false
                const notify = await axios.post(endPoint.endpointTarget+'/notifications', {
                    userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                    userImage:localStorage.getItem('imageUser'),
                    detail:'Anuló una venta del día '+this.formatDate(this.arreglo.fecha),
                    link: 'Ventas'
                })
                console.log(notify)
                if (notify) {
                    this.socket.emit('sendNotification', notify.data)
                }   
            }
            else{
                this.modals = {
                    modal2: true,
                    message: "¡Error al anular!",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: true,
                        modal2: false,
                        modal3:false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 2000);
            }
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
        generateExcel(){
            console.log(this.dates.rangeExcel.length)
            var valid = this.dates.rangeExcel
            var f = this.dates.rangeExcel.split("-")
            var dates = f[1]+"-"+f[0]+"-"+f[2]+':not'
            if (this.dates.rangeExcel.length > 12) {
                const split = this.dates.rangeExcel.split(' a ')
                var f1 = split[0].split("-")
                var f2 = split[1].split("-")
                dates = f1[1]+"-"+f1[0]+"-"+f1[2]+" a "+f2[1]+"-"+f2[0]+"-"+f2[2]
                valid = split[0]
            }
            if (this.lenderSelect == null) {
                this.lenderSelect = ''
            }
            if (this.clientSelect == null) {
                this.clientSelect = ''
            }
            axios.post(endPoint.endpointTarget+'/ventas/generateDataExcel', {
                rangeExcel:dates, 
                lenderSelect: this.lenderSelect, 
                clientSelect: this.clientSelect,
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    var Datos = XLSX.utils.json_to_sheet(res.data.dataTable) 
                    var wb = XLSX.utils.book_new() 
                    XLSX.utils.book_append_sheet(wb, Datos, 'Datos') 
                    XLSX.writeFile(wb, 'Ventas del '+valid+'.xlsx') 
                    this.lenderSelect = ''
                    this.clientSelect = ''
                    this.validLender = true
                    this.validClient = true
                    this.dates.rangeExcel = (dateNew.getMonth() + 1)+'-'+dateNew.getDate()+'-'+dateNew.getFullYear()
                    this.modals.modal3 = false
                }else{
                    this.modals = {
                        modal2: true,
                        message: "¡No se encontraron ventas!",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:true,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                }
            })
        },
        chooseLender(){
            if (this.lenderSelect == '' || this.lenderSelect == null) {
                this.validLender = true
            }else{
                this.validLender = false
            }
        },
        chooseClient(){
            if (this.clientSelect == '' || this.clientSelect == null) {
                this.validClient = true
            }else{
                this.validClient = false
            }
        }
    },
    mounted (){
        EventBus.$on('reloadSales', status => {
            this.getSales('no-button')
        })
    }
}
</script>
<style>
    .vue-progress-path path {
        stroke-width: 12;
    }
    .vue-progress-path .progress {
        stroke:#00768c;
    }
    .vue-progress-path .background {
        stroke: transparent;
    }
    /* .excel-generate{
        position:absolute;
        right:2%;
        top:30%;
        z-index: 10;
    } */
    .bgcolor-danger #single-select{
        border-color:red;
    }
</style>