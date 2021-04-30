<template>
    <div>
       <base-header class="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Reporte del cierre ({{closedInfo.date}})</h1>
                        <base-button v-if="validRoute('caja', 'editar')" @click="modals.modal1 = true" type="success">Editar montos manuales</base-button> <br>
                        <a v-on:click="back" class="btn btn-primary text-white cursor-pointer mt-1">Regresar</a>
                    </div>
                </div>
            </div>
        </base-header> 
        <div class="col-12 mt-3 mx-auto">
            <div class="row mx-auto text-center">
                <div class="col-4 mx-auto">
                    <dt class="" type="success">Ingresos mensuales</dt>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Fondo de caja</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manual)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Efectivo</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Egreso de caja</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualEgress)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Total efectivo</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.totalManualCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Crédito</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualCredit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Débito</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualDebit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Transferencia</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualTransfer)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Otros</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.manualOthers)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="default">
                        <span class="float-left">Total</span>
                        <badge style="font-size:1em !important" class="float-right" type="white">$ {{formatPrice(closedInfo.manualTotal)}}</badge>
                    </base-button>
                </div>
                <div class="col-4 mx-auto">
                    <dt class="" type="default">Ingresos sistema</dt>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Fondo de caja</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.foundEntrySystem)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Efectivo</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Egreso de caja</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemEgress)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Total efectivo</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.totalSystemCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Crédito</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemCredit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Débito</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemDebit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Transferencia</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemTransfer)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <span class="float-left">Otros</span>
                        <badge style="font-size:1em !important" class="float-right text-default" type="success">$ {{formatPrice(closedInfo.systemOther)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="default">
                        <span class="float-left">Total</span>
                        <badge style="font-size:1em !important" class="float-right" type="white">$ {{formatPrice(closedInfo.systemTotal)}}</badge>
                    </base-button>
                </div>
                <div class="col-2 mx-auto">
                    <dt class="" type="warning">Diferencia</dt>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manual - closedInfo.foundEntrySystem)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualCash - closedInfo.systemCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualEgress - closedInfo.systemEgress)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.totalManualCash - closedInfo.totalSystemCash)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualCredit - closedInfo.systemCredit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualDebit - closedInfo.systemDebit)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualTransfer - closedInfo.systemTransfer)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="secondary">
                        <badge style="font-size:1em !important" class="text-default" type="success">$ {{formatPrice(closedInfo.manualOthers - closedInfo.systemOther)}}</badge>
                    </base-button>
                    <base-button class="col-12 mt-1" type="default">
                        <badge style="font-size:1em !important" class="" type="white">$ {{formatPrice(closedInfo.manualTotal - closedInfo.systemTotal)}}</badge>
                    </base-button>
                </div>
            </div>
        </div>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes=""
                  class="border-0">
                <template>
                    <div style="margin-top:-20% !important" class="text-center text-muted mb-2">
                        <small>Ingresos manuales</small>
                    </div>
                    <div class="text-left text-muted">
                        <small>Fondo de caja</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manual"
                        locale="de"
                        class="form-control"
                        v-on:keyup="totalCash()"
                    />
                    <div class="text-left text-muted">
                        <small>Efectivo</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualCash"
                        locale="de"
                        class="form-control"
                        v-on:keyup="totalCash()"
                    />
                    <div class="text-left text-muted">
                        <small>Egreso de caja</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualEgress"
                        locale="de"
                        class="form-control"
                        v-on:keyup="totalCash()"
                    />
                    <div class="text-left text-muted">
                        <small>Total efectivo</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.totalManualCash"
                        locale="de"
                        class="form-control "
                    />
                    <div class="text-left text-muted">
                        <small>Crédito</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualCredit"
                        locale="de"
                        class="form-control "
                    />
                    <div class="text-left text-muted">
                        <small>Débito</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualDebit"
                        locale="de"
                        class="form-control "
                    />
                    <div class="text-left text-muted">
                        <small>Transferencia</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualTransfer"
                        locale="de"
                        class="form-control "
                    />
                    <div class="text-left text-muted">
                        <small>Otros</small>
                    </div>
                    <currency-input
                        v-model="closedInfo.manualOthers"
                        locale="de"
                        class="form-control "
                    />
                    <div class="text-center">
                        <base-button type="default" v-on:click="editEntry" class="my-2">Editar</base-button>
                    </div>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               gradient="success"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i class="ni ni-check-bold ni-3x"></i>
                <h4 class="heading mt-4">¡Actualizado!</h4>
            </div>
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
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default {
    components: {
        VueBootstrap4Table 
    },
    data(){
        return {
            auth:[],
            id: localStorage.getItem('reportID'),
            closedInfo:{
                manual:0,
                manualCash:0,
                totalManualCash:0,
                manualDebit:0,
                manualCredit:0,
                manualTransfer:0,
                manualOthers:0,
                manualTotal:0,
                manualEgress:0,
                foundEntrySystem:0,
                systemCash:0,
                totalSystemCash:0,
                systemDebit:0,
                systemCredit:0,
                systemTransfer:0,
                systemOther:0,
                systemTotal:0,
                systemEgress:0,
                closeId:0,
                code:0,
                date:'Error de fecha'
            },
            modals: {
                modal1:false,
                modal2:false
            }
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
        this.getClosing()
        this.getToken()
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
        back(){
            window.history.go(-1);
        },
        getClosing(){
            const id = this.id
            axios.get(endPoint.endpointTarget+'/ventas/getClosing/'+id)
            .then(res => {
                const date = new Date(res.data.fecha)    
                console.log(date)
                this.closedInfo = {
                    manual:res.data.manual.ingresoFondo,
                    manualCash:res.data.manual.efectivo,
                    totalManualCash:res.data.manual.totalEfectivo,
                    manualDebit:res.data.manual.debito,
                    manualCredit:res.data.manual.credito,
                    manualTransfer:res.data.manual.transferencia,
                    manualOthers:res.data.manual.otros,
                    manualTotal:res.data.manual.total,
                    manualEgress:res.data.manual.egreso,
                    foundEntrySystem:res.data.sistema.ingresoFondo,
                    systemCash:res.data.sistema.efectivo,
                    totalSystemCash:res.data.sistema.totalEfectivo,
                    systemDebit:res.data.sistema.debito,
                    systemCredit:res.data.sistema.credito,
                    systemTransfer:res.data.sistema.transferencia,
                    systemOther:res.data.sistema.otros,
                    systemTotal:res.data.sistema.total,
                    systemEgress:res.data.sistema.egreso,
                    closeId:res.data.identificacionCierre,
                    code:res.data._id,
                    date: moment(date).format('DD-MM-YYYY')
                } 
                console.log(this.closedInfo.date)
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        totalCash(){
            this.closedInfo.totalManualCash = this.closedInfo.manual + this.closedInfo.manualCash - this.closedInfo.manualEgress
        },
        editEntry(){
            console.log(this.closedInfo.date)
            axios.put(endPoint.endpointTarget+'/ventas/editarIngManual/'+this.closedInfo.code, {
                fondo:this.closedInfo.manual,
                efectivo:this.closedInfo.manualCash,
                egreso:this.closedInfo.manualEgress,
                totalEfectivo:this.closedInfo.totalManualCash,
                credito:this.closedInfo.manualCredit,
                debito: this.closedInfo.manualDebit,
                transferencia: this.closedInfo.manualTransfer,
                otros:this.closedInfo.manualOthers,
                total: this.closedInfo.manualTotal
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    this.modals.modal2 = true
                    setTimeout(() => {
                        this.modals.modal1 = false
                        this.modals.modal2 = false
                        this.getClosing()
                    }, 1000); 
                }
            })
        },
        validRoute(route, type){
            for (let index = 0; index < this.auth.length; index++) {
                const element = this.auth[index];
                if (element.ruta == route) {
                    for (let i = 0; i < element.validaciones.length; i++) {
                        if (type == element.validaciones[i]) { 
                            console.log(true)
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