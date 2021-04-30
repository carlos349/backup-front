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
                        <h1 class="display-2 text-white">Sección de empleados</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus empleados, aquí podrás registrar, editar y visualizar todos tus empleados.</p>
                        <base-button v-if="validRoute('empleados', 'registrar')" @click="modals.modal1 = true , initialState(2)" type="success">Registrar un empleado</base-button>
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
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        Datos del empleado
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre del empleado"
                                    v-model="registerEmploye.name"
                                    v-on:keyup="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Documento"
                                    v-model="registerEmploye.id"
                                    v-on:keyup="validRegister()"
                                    v-on:change="registerEmploye.id = formatRut(registerEmploye.id)"
                                    addon-left-icon="ni ni-key-25"
                                     addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <template>
                            <div class="text-muted text-center mb-3">Tabla de días</div>
                        </template>
                        <vue-bootstrap4-table class="text-left styleDays" :rows="days" :columns="columnsDays" :classes="classes" :config="configDays">
                            <template slot="name" slot-scope="props">
                                <b class="text-uppercase ml-2">{{props.row.name}}</b>
                            </template>
                            <template slot="validation" slot-scope="props">
                                <center>
                                    <base-button v-on:click="addDay(props.row.vbt_id, props.row.value, props.row.valid)" class="w-25" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                    </base-button>
                                    <base-button v-on:click="addDay(props.row.vbt_id, props.row.value, props.row.valid)" class="w-25" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                                    <base-button class="w-50" size="sm" type="success" v-if="props.row.valid" v-on:click="selectHour(props.row.vbt_id, props.row.value)">Horarios</base-button>
                                    <base-button class="w-50" disabled size="sm" type="danger" v-else v-on:click="selectHour(props.row.vbt_id, props.row.value)">Horarios</base-button>
                                </center>
                            </template>
                        </vue-bootstrap4-table>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerEmploye.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                            <base-button type="primary" v-on:click="proccess()" v-else class="my-4">{{tipeForm}}</base-button>
                        </div>
                        
                    </form>
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
                        Horarios a bloquear
                    </div>
                </template>
                <template>
                    <div class="row">
                        <div class="col-6">
                            <a-select class="w-100" v-model="from">
                                <a-select-option v-for="i in fromArray" :key="i">
                                    {{i}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="col-6">                
                            <a-select class="w-100" v-model="to">
                                <a-select-option v-for="i in toArray" :key="i">
                                    {{i}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <base-button type="primary" v-on:click="selectHourFinaly()" class="mt-4 mx-auto">Seleccionar horas</base-button>
                    </div>
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
        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table :rows="employes" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <center>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Detalles</span>
                            </template>
                            <base-button v-if="validRoute('empleados', 'detalle')" size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(props.row.nombre, props.row.documento, props.row.days, props.row._id,props.row.comision)" icon="ni ni-bullet-list-67"></base-button>
                            <base-button v-else disabled size="sm" type="default" icon="ni ni-bullet-list-67"></base-button>
                        </a-tooltip>
                        
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Reporte</span>
                            </template>
                            <base-button v-if="validRoute('empleados', 'reportes')" size="sm" v-on:click="reportEmploye(props.row._id)" type="primary" icon="ni ni-align-center"></base-button>
                            <base-button v-else size="sm" disabled type="primary" icon="ni ni-align-center"></base-button>
                        </a-tooltip>
                        
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Eliminar</span>
                            </template>
                            <base-button v-if="validRoute('empleados', 'eliminar')" size="sm" v-on:click="deleteEmploye(props.row._id)" type="warning" icon="fas fa-trash"></base-button>
                            <base-button v-else size="sm" disabled type="warning" icon="fas fa-trash"></base-button>
                        </a-tooltip>
                        
                    </center>
                    
                </b>
            </template>
            <template slot="total" slot-scope="props">
                <b>
                   {{formatPrice(props.row.comision - props.row.advancement + props.row.bonus)}}
                </b>
            </template>
            <template slot="comision" slot-scope="props">
                <b>
                   {{formatPrice(props.row.comision)}}
                </b>
            </template>
            <template slot="bono" slot-scope="props">
                <b>
                   {{formatPrice(props.row.bonus)}}
                </b>
            </template>
            <template slot="advancement" slot-scope="props">
                <b>
                   {{formatPrice(props.row.advancement)}}
                </b>
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
               
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'

// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        auth: [],
        tipeForm:'',
        registerEmploye: {
            name:'',
            id:'',
            days: [],
            _id:'',
            comision:'',
            valid:false,
            valid2:false,
        },
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            message: "",
            icon: '',
            type:''
        },
        columnsDays: [
            {
                label: "Día",
                name: "name",
                slot_name:"name",
                sort: false,
            },
            {
                label: "Acciones",
                name: "valid",
                slot_name:"validation",
                sort: false,
            }
        ],
        configDays: {
            card_title: "Tabla de días",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por día",
                visibility: true,
                case_sensitive: false
            },
            show_refresh_button: false,
            show_reset_button: false,  
            selected_rows_info: false,
            preservePageOnDataChange : false,
            pagination_info : false,
            pagination:false
        },
        days: [
            {
                name: 'Lunes',
                value: 1,
                valid: false
            },
            {
                name: 'Martes',
                value: 2,
                valid: false
            },
            {
                name: 'Miercoles',
                value: 3,
                valid: false
            },
            {
                name: 'Jueves',
                value: 4,
                valid: false
            },
            {
                name: 'Viernes',
                value: 5,
                valid: false
            },
            {
                name: 'Sabado',
                value: 6,
                valid: false
            },
            {
                name: 'Domingo',
                value: 0,
                valid: false
            }
        ],
        employes: [],
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
                label: "Identidad",
                name: "documento",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
                slot_name : "comision"
            },
            {
                label: "Bonos",
                name: "bonus",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
                slot_name : "bono"
            },
            {
                label: "Avances",
                name: "advancement",
                sort: true,
                slot_name: "advancement"
            },
            {
                label: "Total",
                name: "status",
                sort: true,
                slot_name: "total"
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
            card_title: "Tabla de empleados",
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
        selectedDays: [],
        from: 'Seleccione un horario',
        to: 'Seleccione un horario',
        fromArray: [
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
        ],
        toArray: [
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30'
        ],
        editHourIndex: 0
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
        this.getEmployes();
        this.getToken()
        console.log(this.auth)
    },
    methods: {
        addDay(id, value, valid){
            if (valid) {
                this.days[id - 1].valid = false
                for (let index = 0; index < this.days.length; index++) {
                    const element = this.days[index];
                    for (let indexTwo = 0; indexTwo < this.selectedDays.length; indexTwo++) {
                        const elementTwo = this.selectedDays[indexTwo];
                        if (value == elementTwo.day) {
                            this.selectedDays.splice(indexTwo, 1)
                        }
                    }
                }
                console.log(this.selectedDays)
                this.validRegister()
            }else{
                this.days[id - 1].valid = true
                this.selectedDays.push({day: value, hours: []})
            }
        },
        selectHour(id, value){
            console.log(this.selectedDays)
            this.modals.modal1 = false
            this.modals.modal3 = true
            for (let j = 0; j < this.selectedDays.length; j++) {
                const elementTwo = this.selectedDays[j];
                if (value == elementTwo.day) {
                    this.editHourIndex = j
                }
            }
            console.log(this.selectedDays)
            if (this.selectedDays[this.editHourIndex].hours.length > 0) {
                console.log(this.selectedDays[this.editHourIndex].hours)
                this.from = this.selectedDays[this.editHourIndex].hours[0]
                this.to = this.selectedDays[this.editHourIndex].hours[1]    
            }
        },
        selectHourFinaly(){
            this.selectedDays[this.editHourIndex].hours = [this.from, this.to]
            this.modals.modal3 = false
            this.modals.modal1 = true
            this.from  = "Seleccione un horario"
            this.to = "Seleccione un horario"
            this.validRegister()
            console.log(this.selectedDays)
        },
        getEmployes(){
			axios.get(endPoint.endpointTarget+'/manicuristas')
			.then(res => {
                this.employes = res.data
                
			})
        },
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        reportEmploye(id){
            localStorage.setItem('idReportEmploye', id)
            router.push({path: '/reporteEmpleado'})
        },
        proccess(){
            if (this.tipeForm == "Registrar") {
                this.registerEmployes()
            }
            else{
                this.updateEmploye()
            }
        },
        registerEmployes(){
			const nombre = this.registerEmploye.name.replace(/\s*$/,"");
			const documento = this.registerEmploye.id.replace(/\s*$/,"");
			axios.post(endPoint.endpointTarget+'/manicuristas', {
				nombreManicurista: nombre,
				documentoManicurista:documento,
				days: this.selectedDays
			})
			.then(res => {
				if(res.data.status == 'Manicurista ingresada'){
                    this.modals = {
                        modal2: true,
                        message: "¡Empleado registrado con exito!",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.initialState(1)
                        this.getEmployes()
                        EventBus.$emit('reloadLenders', 'reload')
                    }, 1500);
				}else{
					this.modals = {
                        modal2: true,
                        message: "¡El empleado ya se encuentra registrado!",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                       this.modals = {
                         modal2: false,  
                         modal1: true,
                         message: "",
                         icon: '',
                         type: ''
                       } 
                    }, 1500);
				}
			})
			
        },
        updateEmploye(){
			const nombre = this.registerEmploye.name.replace(/\s*$/,"");
			const documento = this.registerEmploye.id.replace(/\s*$/,"");
				axios.put(endPoint.endpointTarget+'/manicuristas/' + this.registerEmploye._id, {
					nombre: nombre,
					documento: documento,
					days: this.selectedDays,
					comision: this.registerEmploye.comision
				})
				.then(res => {
					if(res.data.status == "Manicurista Editada"){
						this.modals = {
                            modal2: true,
                            message: "¡Empleado editado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.initialState(1)
                            this.getEmployes()
                            EventBus.$emit('reloadLenders', 'reload')
                        }, 2000);
						// this.emitMethod()
					}else{
						this.$swal({
							type: 'error',
							title: 'Prestador ya existe',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
		},
        deleteEmploye(id){
		    this.$swal({
                title: '¿Seguro que desea eliminar?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then(result => {
                if (result.value) {
                    axios.delete(endPoint.endpointTarget+'/manicuristas/' + id)
                    .then(res => {
                        if(res.data.status = 'Prestador borrado'){
                            this.modals = {
                                modal2: true,
                                message: "¡Empleado eliminado!",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.initialState(1)
                                this.getEmployes()
                                EventBus.$emit('reloadLenders', 'reload')
                            }, 2000);
                            // this.emitMethod()
                        }
                    })
                    .catch(err => {
                        this.$swal({
                            type: 'error',
                            title: 'Hubo un problema',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                }
            })	
		},
        pushData(nombre,id,days,_id,comision){
            this.registerEmploye= {
                name:nombre,
                id:id,
                days: days,
                _id:_id,
                comision:comision
            }
            this.selectedDays = days
            for (let index = 0; index < this.days.length; index++) {
                const element = this.days[index];
                for (let j = 0; j < days.length; j++) {
                    const elementTwo = days[j];
                    if (element.value == elementTwo.day) {
                        element.valid = true
                    }
                }
            }
        },
        validFields(field){
            console.log("y entonces?")
            if (field == 'c') {
                if (this.registerUser.correo == this.registerUser.correoConfirm) {
                this.registerUser.c = true
                console.log("y entonces?")
                }
                else{
                    this.registerUser.c = false
                }
            }
            
            if (field == 'p') {
                if (this.registerUser.password == this.registerUser.passwordConfirm) {
                this.registerUser.p = true
                }
                else{
                    this.registerUser.p = false
                }
            } 
        },
        initialState(val){
            this.registerEmploye = {
                name:'',
                id:'',
                timeRestOne:"Seleccione el tiempo",
                timeRestTwo:"Seleccione el tiempo",
                dayFree:[],
                _id:'',
                comision:'',
                valid:false,
                valid2:false,
            }
            this.selectedDays = []
            for (let index = 0; index < this.days.length; index++) {
                this.days[index].valid = false
            }
            if (val == 1) {
                this.modals = {
                        modal1: false,
                        modal2: false,
                        message: "",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
            }
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        validRegister(){
            if (this.registerEmploye.name != '' && this.registerEmploye.id != '' && this.selectedDays.length > 0) {
                console.log('entre aqui')
                this.registerEmploye.valid = this.selectedDays[0].hours.length > 0 ? true : false
            }
            else{
                this.registerEmploye.valid = false
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatRut(value) {
			let around = value.length - 2
			let concat = ''
			for (let index = 0; index < value.length; index++) {
				concat = concat + value[index]
				if (around == index) {
					concat = concat + '.'
				}
			} 
			let val = concat.replace('.', '-')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
  };
</script>
<style lang="scss">
    .card-header{
        font-size: 2.5vw;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .styleDays .card-header{
        display: none;
    }
    .styleDays .footer-header{
        display: none;
    }
    .styleDays .vbt-table-tools{
        display: none;
    }
</style>