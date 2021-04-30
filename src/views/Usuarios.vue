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
                        <h1 class="display-2 text-white">Sección de usuarios</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus usuarios, aquí podrás registrar, editar y visualizar todos tus usuarios.</p>
                        <base-button v-if="validRoute('usuarios', 'registrar')" @click="modals.modal1 = true , initialState(2)" type="success">Registrar un usuario</base-button>
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
                        Datos del usuario
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre"
                                    v-model="registerUser.name"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Apellido"
                                    v-model="registerUser.lastname"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger"   >
                        </base-input>
                        <input type="file" id="fileProfile" ref="file" v-on:change="handleFileUpload()" class="form-control mb-3" >
                        <base-input alternative
                                    type="text"
                                    placeholder="Correo"
                                    v-model="registerUser.correo"
                                    addon-left-icon="ni ni-email-83"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    :valid="registerUser.c"
                                    v-on:keyup="validFields('c')"
                                    placeholder="Confirmar correo"
                                    v-model="registerUser.correoConfirm"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    placeholder="Contraseña"
                                    v-model="registerUser.password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    :valid="registerUser.p"
                                    v-on:keyup="validFields('p')"
                                    placeholder="Confirmar contraseña"
                                    v-model="registerUser.passwordConfirm"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerUser.valid == false" disabled class="my-4">Registrar</base-button>
                            <base-button type="primary" v-on:click="registerUsers()" v-else class="my-4">Registrar</base-button>
                        </div>
                        
                    </form>
            </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal3"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Administre las rutas de acceso</h3>
                    </div>
                </template>
                <template>
                    <vue-custom-scrollbar ref="tableItem" class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="routes" :columns="columnsRoutes" :classes="classes" :config="configRoutes">
                            <template slot="name" slot-scope="props">
                                <b class="text-uppercase">{{props.row.route}}</b>
                            </template>
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" type="success" v-if="props.row.valid" v-on:click="selectedItem(props.row.route, props.row.valid, props.row.vbt_id)">Editar</base-button>
                                <base-button class="w-100" disabled size="sm" type="danger" v-else v-on:click="selectedItem(props.row.route, props.row.valid, props.row.vbt_id)">Editar</base-button>
                            </template>
                            <template slot="active" slot-scope="props">
                                <base-button v-on:click="addRoute(props.row.vbt_id, props.row.route, props.row.valid)" class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                </base-button>
                                <base-button v-on:click="addRoute(props.row.vbt_id, props.row.route, props.row.valid)" class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-4" type="default" v-on:click="editRoutesAccess()">
                            Realizar cambios
                        </base-button>
                    </center>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Vincular prestador</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                        <vue-single-select
                            v-model="linkLender"
                            :options="lenderNames"
                            placeholder="Prestadores"
                        ></vue-single-select>
                        <base-button type="default" v-on:click="estatusEdit(idSelect, 3, 'no-prestador')">
                            Vincular
                        </base-button>  
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Habilite las funciones de la ruta</h3>
                    </div>
                </template>
                <template>
                    <vue-custom-scrollbar class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="functions" :columns="columnsFunctions" :classes="classes" :config="configFunctions">
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid" v-on:click="selected(props.row.vbt_id, props.row.valid, props.row.function)">
                                </base-button>
                                <base-button class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else v-on:click="selected(props.row.vbt_id,props.row.valid, props.row.function)"></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-2" type="default" v-on:click="finalyFunctions(modals.modal5 = false)">
                            Finalizar
                        </base-button>
                    </center>
                </template>
            </card>
        </modal>
        <!-- TABLA DE CLIENTES -->
        <vue-bootstrap4-table class="text-left" :rows="users" :columns="columns" :classes="classes" :config="config">
            <template slot="date-format" class="text-left" slot-scope="props">
                {{formatDate(props.row.LastAccess)}}
            </template>
            <template slot="status-format" slot-scope="props">
                <base-dropdown class="w-100" v-if="validRoute('usuarios', 'editar')">
                    <base-button size="sm" v-if="props.row.status == 1" slot="title" type="primary" class="dropdown-toggle w-100">
                        Gerente
                    </base-button>
                    <base-button size="sm" v-if="props.row.status == 2" slot="title" type="success" class="dropdown-toggle w-100">
                        Cajero (a)
                    </base-button>
                    <base-button size="sm" v-if="props.row.status == 3" slot="title" type="default" class="dropdown-toggle w-100">
                        Prestadora
                    </base-button>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 1, 'no-prestador')">Gerencia</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 2, 'no-prestador')">Personal de caja</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 3, 'prestador')">Prestador</a>
                </base-dropdown>
                <base-dropdown v-else class="w-100" >
                    <base-button disabled size="sm" v-if="props.row.status == 1" slot="title" type="primary" class="dropdown-toggle w-100">
                        Gerente
                    </base-button>
                    <base-button disabled size="sm" v-if="props.row.status == 2" slot="title" type="success" class="dropdown-toggle w-100">
                        Cajero (a)
                    </base-button>
                    <base-button disabled size="sm" v-if="props.row.status == 3" slot="title" type="default" class="dropdown-toggle w-100">
                        Prestadora
                    </base-button>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 1, 'no-prestador')">Gerencia</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 2, 'no-prestador')">Personal de caja</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 3, 'prestador')">Prestador</a>
                </base-dropdown>
            </template>
            <template slot="access" class="text-left" slot-scope="props" >
                <center>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>Agregar accesos</span>
                        </template>
                        <base-button v-if="validRoute('usuarios', 'editar')" icon="ni ni-fat-add" v-on:click="dataEdit(props.row.access, props.row._id, props.row.email)" size="sm"  type="success" class="mx-auto">
                            
                        </base-button>
                        <base-button v-else size="sm"  type="success" disabled class="mx-auto">
                            
                        </base-button>
                    </a-tooltip>
                </center>
                
                
            </template>
            <template slot="Administrar" slot-scope="props">
                <center>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>Eliminar</span>
                        </template>
                        <base-button v-if="validRoute('usuarios', 'eliminar')"  size="sm" v-on:click="deleteClient(props.row._id, props.row.status)" type="warning" icon="fas fa-trash"></base-button>     
                        <base-button v-else size="sm" slot="title" type="warning" icon="fas fa-trash" disabled>
                            
                        </base-button> 
                    </a-tooltip>
                </center>
                
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
import jwtDecode from 'jwt-decode'
import EventBus from '../components/EventBus'
// COMPONENTS
import VueBootstrap4Table from 'vue-bootstrap4-table'
import vueCustomScrollbar from 'vue-custom-scrollbar'
  export default {
    components: {
        VueBootstrap4Table,
        vueCustomScrollbar
    },
    data() {
      return {
        radio: {
            radio1: false
        },
        auth: [],
        registerUser: {
            name:null,
            lastname:null,
            image:null,
            correo:null,
            correoConfirm:null,
            password:null,
            passwordConfirm:null,
            valid:false,
            valid2:false,
            date:null,
            c:null,
            p:null
        },
        routes: [
            {route: 'procesar', valid: false},
            {route: 'metricas', valid: false},
            {route: 'usuarios', valid: false},
            {route: 'ventas', valid: false},
            {route: 'servicios', valid: false},
            {route: 'empleados', valid: false},
            {route: 'clientes', valid: false},
            {route: 'inventario', valid: false},
            {route: 'gastos', valid: false},
            {route: 'agendamiento', valid: false},
            {route: 'caja', valid: false},
            {route: 'pedidos', valid: false}
        ],
        functions: [],
        linkLender:'',
        lenderNames: [],
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            message: "",
            icon: '',
            type:''
        },
        users: [],
        columns: [{
                label: "Nombre",
                name: "first_name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Apellido",
                name: "last_name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Correo",
                name: "email",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Ultimo acceso",
                name: "LastAccess",
                slot_name:'date-format',
                sort: true,
            },
            {
                label: "Estado",
                name: "status",
                slot_name:"status-format",
                sort: false,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Accesos",
                name: "Accesos",
                slot_name:"access",
                sort: false,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Eliminar",
                name: "_id",
                sort: false,
                slot_name: "Administrar"
            },
        ],
        config: {
            card_title: "Tabla de usuarios",
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
        columnsFunctions: [
            {
                label: "functions",
                name: "name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false
            },
            {
                label: "",
                name: "valid",
                slot_name: "validation",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false
            }
        ],
        columnsRoutes: [
            {
                label: "Rutas",
                name: "route",
                slot_name:"name",
                // filter: {
                    //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            },
            {
                label: "",
                name: "valid",
                slot_name:"active",
                // filter: {
                    //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            },
            {
                label: "",
                name: "valid",
                slot_name:"validation",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            }
        ],
        configRoutes: {
            card_title: "Tabla de rutas",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por nombre",
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
        configFunctions: {
            card_title: "Tabla de funciones",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por nombre",
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
        classes: {
            table: "table-bordered table-striped"
        },
        idSelect: '',
        file: '',
        routesSelecteds: [],
        position:0,
        mail: ''
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
		this.getUsers();
        this.getLenders()
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
            this.emailUser = decoded.email
        },
        dataEdit(access, id, mail){ 
            this.routes = [
                {route: 'procesar', valid: false},
                {route: 'metricas', valid: false},
                {route: 'usuarios', valid: false},
                {route: 'ventas', valid: false},
                {route: 'servicios', valid: false},
                {route: 'empleados', valid: false},
                {route: 'clientes', valid: false},
                {route: 'inventario', valid: false},
                {route: 'gastos', valid: false},
                {route: 'agendamiento', valid: false},
                {route: 'caja', valid: false},
                {route: 'pedidos', valid: false}
            ]
            this.mail = mail 
            this.idAccess = id
            this.routesSelecteds = []
            for (let index = 0; index < access.length; index++) {
                const element = access[index];
                for (let indexTwo = 0; indexTwo < this.routes.length; indexTwo++) {
                    const elementTwo = this.routes[indexTwo];
                    if (elementTwo.route == element.ruta) {
                        elementTwo.valid = true
                    }
                }
                this.routesSelecteds.push(element)
            }
            console.log(this.routesSelecteds)
             this.modals = {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: true,
                modal5: false,
                message: "",
                icon: '',
                type:''
            }
        },
        selectedItem(route, valid, index){
            for (let i = 0; i < this.routesSelecteds.length; i++) {
                const element = this.routesSelecteds[i];
                if (route == element.ruta) {
                    this.position = i
                }
            }
            this.modals = {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: true,
                modal5: true,
                message: "",
                icon: '',
                type:''
            }
            if (route == 'metricas') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false}
                ]
            }else if (route == 'usuarios') {
                this.functions = [
                    {function: 'registrar', name:'Registar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            }else if (route == 'ventas') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'anular', name:'Anular', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                ]
            }else if (route == 'servicios') {
                this.functions = [
                    {function: 'ingresar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'activaciones', name:'Activar o Desactivar', valid: false},
                ]
            }else if (route == 'empleados') {
                this.functions = [
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'reportes', name:'Ver reporte', valid: false},
                    {function: 'cerrar ventas', name:'Cerrar ventas', valid: false},
                    {function: 'eliminar', name: 'Eliminar', valid: false},
                    {function: 'adelantos', name: 'Adelantos o Bonos', valid: false},
                    {function: 'correos', name: 'Envio de correos', valid: false},
                ]
            }else if (route == 'clientes') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            }else if (route == 'pedidos') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            }else if (route == 'inventario') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            }else if (route == 'gastos') {
                this.functions = [
                    {function: 'registrar', name:'Registrar', valid: false},
                ]
            }else if (route == 'agendamiento') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'agendar', name:'Agendar', valid: false},
                    {function: 'todas', name:'Ver todas las agendas', valid: false},
                    {function: 'editar', name:'Editar cita', valid: false},
                    {function: 'eliminar', name:'Eliminar cita', valid: false},
                    {function: 'cerrar', name:'Cerrar cita', valid: false},
                    {function: 'finalizar', name:'Finalizar cita', valid: false},
                    {function: 'procesar', name:'Procesar', valid: false}
                ]
            }else if (route == 'caja') {
                this.functions = [
                    {function: 'visualizar', name:'Ver cierres', valid: false},
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'cerrar', name:'hacer cierre', valid: false},
                    {function: 'fondo', name:'Ingresar fondos', valid: false},
                    {function: 'reporte', name:'Ver reporte del cierre', valid: false},
                    {function: 'editar', name:'Editar cierre', valid: false},
                ]
            }else if (route == 'procesar') {
                this.functions = [
                    {function: 'editar', name:'Editar cliente', valid: false},
                    {function: 'nuevo_cliente', name:'Registrar cliente', valid: false},
                    {function: 'nuevo_servicio', name:'Registrar servicio', valid: false},
                    {function: 'descuento', name:'Ingresar descuento', valid: false},
                ]
            }
            for (let index = 0; index < this.functions.length; index++) {
                const element = this.functions[index];
                for (let indexTwo = 0; indexTwo < this.routesSelecteds[this.position].validaciones.length; indexTwo++) {
                    const elementTwo = this.routesSelecteds[this.position].validaciones[indexTwo];
                    if (element.function == elementTwo) {
                        element.valid = true
                    }
                }
            }
        },
        addRoute(index, route, valid){
            const position = index - 1
            if (valid == true) {
                console.log(position)
                this.routes[position].valid = false
                for (let index = 0; index < this.routes.length; index++) {
                    const element = this.routes[index];
                    for (let indexTwo = 0; indexTwo < this.routesSelecteds.length; indexTwo++) {
                        const elementTwo = this.routesSelecteds[indexTwo];
                        if (route == elementTwo.ruta) {
                            this.routesSelecteds.splice(indexTwo, 1)
                        }
                    }
                }

            }else{
                this.routes[position].valid = true
                this.routesSelecteds.push({ruta: route, validaciones: []})
            }
        },
        finalyFunctions(){
            this.modals.modal5 = false  
        },
        selected(vbt_id, valid, func){
            if (valid) {
                this.functions[vbt_id - 1].valid = false
                for (let index = 0; index < this.routesSelecteds[this.position].validaciones.length; index++) {
                    const element = this.routesSelecteds[this.position].validaciones[index];
                    if (element == func) {
                        this.routesSelecteds[this.position].validaciones.splice(index, 1)
                    }
                }
            }else{
                this.functions[vbt_id - 1].valid = true
                this.routesSelecteds[this.position].validaciones.push(func)
            }
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0]
            console.log(this.file)
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
        editRoutesAccess(){
            const configToken = {headers: {'x-access-token': localStorage.userToken}}
            axios.put(endPoint.endpointTarget+'/users/editAccess/'+this.idAccess,{
                access: this.routesSelecteds,
                email: this.mail
            }, configToken)
            .then(res => {
                if (res.data.status == 'ok') {
                    this.getUsers();
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: true,
                        modal4: false,
                        modal5: false,
                        message: "Accesos actualizados con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                    const token = localStorage.userToken
                    const decoded = jwtDecode(token)
                    if (this.mail == decoded.email) {
                        EventBus.$emit('loggedin-user', this.routesSelecteds)
                    }
                    localStorage.setItem('userToken', res.data.token)
                    this.routesSelecteds = []
                }else{
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: true,
                        modal4: false,
                        modal5: false,
                        message: "No se pudo relizar la acción",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                }
            })
        },
        registerUsers(){
            let formData = new FormData();
            formData.append('image', this.file)
            const configToken = {headers: {'x-access-token': localStorage.userToken}}
            axios.post(endPoint.endpointTarget+'/users/register',{
                first_name: this.registerUser.name,
                last_name: this.registerUser.lastname,
                email: this.registerUser.correo,
                password: this.registerUser.password,
            }, configToken)
            .then(res => {
                this.modals.modal1 = false
                this.modals.modal3 = true
                this.modals.message = '¡Usuario registrado con exito!',
                this.modals.icon = 'ni ni-check-bold ni-5x',
                this.modals.type = 'success'
                setTimeout(() => {
                    this.modals.modal3 = false
                    this.modals.message = '',
                    this.modals.icon = '',
                    this.modals.type = ''
                    this.initialState(1)
                    this.getUsers()
                    const id = res.data.status
                    const config = {headers: {'Content-Type': 'multipart/form-data', 'x-access-token': localStorage.userToken}}
                    axios.post(endPoint.endpointTarget+`/users/registerImage/${id}`, formData, config)
                    .then(resData => {
                        console.log(resData)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }, 1500);
            })
        },
        getUsers(){
			const config = {headers: {'x-access-token': localStorage.userToken}}
			axios.get(endPoint.endpointTarget+'/users', config)
			.then(res => {
			    this.users = res.data
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'Login'})
			})
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                console.log(res.data)
                for (let index = 0; index < res.data.length; index++) {
                    this.lenderNames.push(res.data[index].nombre + " / " + res.data[index].documento)
                }
            })
        },
        validRegister(){
            this.registerUser.valid = this.registerUser.name != '' && this.registerUser.lastname && this.registerUser.c == true && this.registerUser.p == true ? true : false
        },
        validFields(field){
            if (field == 'c') {
                this.registerUser.c = this.registerUser.correo == this.registerUser.correoConfirm ? true : false
                this.validRegister()
            }
            if (field == 'p') {
                this.registerUser.p = this.registerUser.password == this.registerUser.passwordConfirm ? true : false
                this.validRegister()
            } 
        },
        initialState(val){
            this.registerUser = {
                name:null,
                lastname:null,
                image:null,
                correo:null,
                correoConfirm:null,
                password:null,
                passwordConfirm:null,
                valid:false,
                valid2:false,
                date:null,
                c:null,
                p:null
            }
            if (val == 1) {
                this.modals.modal1 = false
            }
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+' ('+dateFormat.getHours()+":"+('0'+dateFormat.getMinutes()).slice(-2)+")"
        },
        deleteClient(id, admin){
			this.$swal({
				title: '\n¿Está seguro de borrar usuario?',
				text: 'No puedes revertir esta acción',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Estoy seguro',
				cancelButtonText: 'No, evitar acción',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
				if(result.value) {
					if(admin == 1){
						this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: true,
                            modal4: false,
                            modal5: false,
                            message: "No puede borrar un gerente",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal1: false,
                                modal2: false,
                                modal3: false,
                                modal4: false,
                                modal5: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
					}else{
						const configToken = {headers: {'x-access-token': localStorage.userToken}}
						axios.delete(endPoint.endpointTarget+'/users/' + id, configToken)
						.then(res => {
                            this.modals = {
                                modal1: false,
                                modal2: false,
                                modal3: true,
                                modal4: false,
                                modal5: false,
                                message: res.data.first_name+' '+res.data.last_name+' ha sido Borrado',
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3: false,
                                    modal4: false,
                                    modal5: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
							this.getUsers()
						})
						.catch(err => {
							this.$swal({
								type: 'error',
								title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
								showConfirmButton: false,
								timer: 2500
							})
							router.push({name: 'login'})
						})
					}
				} else {
					this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: true,
                        modal4: false,
                        modal5: false,
                        message: "Acción cancelada",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
				}
			})
		},
        estatusEdit(id, status, type){
			const token = localStorage.userToken
			const decoded = jwtDecode(token)
			const idDecoded = decoded._id
			const ifStatus = decoded.status
			if (idDecoded == id && ifStatus == 1) {
				this.$swal({
					title: '¿Está seguro de cambiarse el estado?',
					text: '¡Si no hay otro gerente registrado, no podrás regresar tu estado!',
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Estoy seguro',
					cancelButtonText: 'No, evitar acción',
					showCloseButton: true,
					showLoaderOnConfirm: true
				}).then(result => {
					if (result.value) {
						if (type == 'prestador') {
							this.modals.modal2 = true
							this.idSelect = id
						}else{
							const config = {headers: {'x-access-token': localStorage.userToken}}
							axios.put(endPoint.endpointTarget+'/users/'+id, {
								status: status,
								employe: this.linkLender
							}, config)
							.then(res => {
								// if (idDecoded == id) {
								// 	EventBus.$emit('change-status', status)
								// 	localStorage.setItem('logged-in', status)
								// 	setTimeout(() => {
								// 		router.push({name: 'Agendamiento'})
								// 	}, 1000);
								// }
								this.getUsers()
								this.linkLender = ''
								this.modals.modal2 = false
							})
							.catch(err => {
								this.$swal({
									type: 'error',
									title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
									showConfirmButton: false,
									timer: 2500
								})
								router.push({name: 'Login'})
							})
						}
					}else{
						this.$swal({
							type: 'info',
							title: 'Acción cancelada',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				if (type == 'prestador') {
                    console.log('entre aqui')
					this.modals.modal2 = true
					this.idSelect = id
				}else{
					const config = {headers: {'x-access-token': localStorage.userToken}}
					axios.put(endPoint.endpointTarget+'/users/'+id, {
						status: status,
						employe: this.linkLender
					}, config)
					.then(res => {
						if (idDecoded == id) {
							EventBus.$emit('change-status', status)
							localStorage.setItem('logged-in', status)
							router.push({name: 'Citas'})
						}
						this.getUsers()
						this.linkLender = ''
						this.modals.modal2 = false
					})
					.catch(err => {
						this.$swal({
							type: 'error',
							title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
							showConfirmButton: false,
							timer: 2500
						})
						router.push({name: 'login'})
					})
				}
			}
		},
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
    .maxHeightRoutes{
        max-height: 450px;
        overflow: scroll;
    }
    // .maxHeightRoutes th .custom-checkbox{
    //     display: none;
    // }
    .maxHeightRoutes .card-header{
        display:none;
    }
    .maxHeightRoutes .card-footer{
        display:none;
    }
</style>