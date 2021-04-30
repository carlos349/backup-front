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
                        <h1  class="display-2 text-white w-100">Sección de servicios</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección de servicios de tu negocio, aquí podrás registrar, editar y visualizar todos tus servicios.</p>
                        <base-button v-tooltip="'You have new messages.'" v-if="validRoute('servicios', 'ingresar')" @click="modals.modal1 = true, clean()"  type="success">Ingrese un servicio</base-button>
                        <base-button v-tooltip="'You have new messages.'" v-else disabled  type="success">Ingrese un servicio</base-button>
                        <base-button v-tooltip="'You have new messages.'" v-if="validRoute('servicios', 'ingresar')" @click="modals.modal5 = true" type="default">Categorias</base-button>
                        <base-button v-tooltip="'You have new messages.'" v-else disabled  type="default">Categorias</base-button>
                    </div>
                </div>
            </div>
        </base-header>
        <!-- MODAL REGISTRAR -->

        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Datos del servicio </h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <div class="row m-0">
                            <base-input alternative
                                class="col-sm-12 mb-3"
                                placeholder="Nombre"
                                addon-left-icon="ni ni-single-copy-04"
                                v-model="serviceRegister"
                                addon-right-icon="fa fa-asterisk text-danger" >
                            </base-input>
                            <div class="col-md-4">
                                <base-input alternative
                                    v-on:keyup="pruebameEste()"
                                    max-count="100"
                                    placeholder="Comisión (%)"
                                    addon-left-icon="ni ni-money-coins"
                                    v-model="comissionRegister"
                                    addon-right-icon="fa fa-asterisk text-danger" >
                                </base-input>
                            </div>
                            <div class="col-md-4">
                                <currency-input
                                    v-model="priceRegister"
                                    locale="de"
                                    placeholder="Costo"
                                    class="form-control w-100   "
                                    style=""
                                />

                            </div>
                            <div class="col-md-4">
                                <select class="form-control mb-3" v-model="categoryRegister">
                                    <option style="color:black;">Categoria</option>
                                    <option style="color:black;" v-for="category of categories" :key="category.name">{{category.name}}</option>
                                </select>
                            </div>
                            <div class="col-md-6"> 
                                <select class="form-control mb-3" v-model="timeRegister">
                                    <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                    <option style="color:black;" value="15">15 Minutos</option>
                                    <option style="color:black;" value="30">30 Minutos</option>
                                    <option style="color:black;" value="45">45 Minutos</option>
                                    <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                                    <option style="color:black;" value="75">75 Minutos (1:15 Hr)</option>
                                    <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                                    <option style="color:black;" value="105">105 Minutos (1:45 Hr)</option>
                                    <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                                    <option style="color:black;" value="135">135 Minutos (2:15 Hr)</option>
                                    <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                                    <option style="color:black;" value="165">165 Minutos (2:45 Hr)</option>
                                    <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                                    <option style="color:black;" value="195">195 Minutos (3:15 Hr)</option>
                                    <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                                    <option style="color:black;" value="225">225 Minutos (3:45 Hr)</option>
                                    <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                                </select>

                            </div>
                            <div style="margin-top:-10px" class="row col-sm-6 mx-auto">
                                <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                                <base-radio name="false" value="true" inline class="mb-3 mx-auto" v-model="addDiscount"> <b>Si</b> </base-radio>
                                <base-radio name="true" value="false" checked inline class="mb-3 mx-auto" v-model="addDiscount"> <b>No</b> </base-radio> 
                            </div>
                        </div>
                        <tabs fill class="flex-column flex-md-row">
                            <tab-pane>
                                <span slot="title">
                                    <i class="fa fa-user-check">
                                        Empleados
                                    </i>
                                </span>
                                <vue-custom-scrollbar ref="tableC" class="maxHeight">
                                    <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" >
                                        <template slot="validationnnn" slot-scope="props">
                                            <center>
                                                <base-button v-on:click="unSelected(props.row._id, props.row.vbt_id)" class="w-25" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid == true">
                                                </base-button>
                                                <base-button v-on:click="selected(props.row._id, props.row.vbt_id)" class="w-25" size="sm" type="danger" icon="fa fa-ban" v-else>
                                                </base-button>
                                            </center>
                                         </template>
                                    </vue-bootstrap4-table>
                                </vue-custom-scrollbar >
                            </tab-pane>

                            <tab-pane title="Profile">
                                <span slot="title">
                                    <i class="fa fa-box-open">
                                        Productos
                                    </i>
                                </span>
                                <vue-custom-scrollbar class="maxHeight">
                                    <div class="p-4">
                                        <base-button v-for="(data , index) in rowsItems" v-on:click="elegirCantidad(index,1)" class="col-12 mb-1" type="secondary">
                                            <div class="row">
                                                <div class="col-8">
                                                    <base-checkbox  class="float-left" v-model="itemsBox[index].check">{{data.producto}}</base-checkbox>
                                                </div>
                                                <div class="col-4">
                                                    <badge v-if="itemsBox[index].count != ''" style="font-size:.8em !important" class="float-right text-default" type="success">{{itemsBox[index].count}} {{data.type}}</badge>
                                                </div>
                                            </div>
                                        </base-button>
                                    </div>
                                </vue-custom-scrollbar>
                            </tab-pane>
                        </tabs>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="registerService">Registrar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Datos del servicio</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="serviceEdit"
                            addon-right-icon="fa fa-asterisk text-danger" >
                        </base-input>
                        <div class="row">
                            <base-input alternative
                                type="text"
                                placeholder="Comisión"
                                class="col-sm-4 "
                                addon-left-icon="ni ni-money-coins"
                                v-model="comissionEdit"
                                addon-right-icon="fa fa-asterisk text-danger" >
                            </base-input>
                            <currency-input 
                                v-model="priceEdit"
                                locale="de"
                                addon-left-icon="ni ni-time-alarm"
                                class="form-control mx-auto col-sm-3 mb-3"
                                
                                addon-right-icon="fa fa-asterisk text-danger" 
                            />	
                            <select class="form-control mb-3 col-sm-4 mx-auto" v-model="editCategoryServicer">
                                <option style="color:black;" v-for="category of categories" :key="category.name">{{category.name}}</option>
                            </select>
                            <select class="form-control col-sm-5 mx-auto mb-3" v-model="timeEdit">
                                <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                    <option style="color:black;" value="15">15 Minutos</option>
                                    <option style="color:black;" value="30">30 Minutos</option>
                                    <option style="color:black;" value="45">45 Minutos</option>
                                    <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                                    <option style="color:black;" value="75">75 Minutos (1:15 Hr)</option>
                                    <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                                    <option style="color:black;" value="105">105 Minutos (1:45 Hr)</option>
                                    <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                                    <option style="color:black;" value="135">135 Minutos (2:15 Hr)</option>
                                    <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                                    <option style="color:black;" value="165">165 Minutos (2:45 Hr)</option>
                                    <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                                    <option style="color:black;" value="195">195 Minutos (3:15 Hr)</option>
                                    <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                                    <option style="color:black;" value="225">225 Minutos (3:45 Hr)</option>
                                    <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                            </select>
                            <div class="row mx-auto col-sm-6" style="margin-top:-2%">
                                <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                                <base-radio name="false"  inline class="mb-3 mx-auto" v-model="addDiscountEdit"> <b>Si</b> </base-radio>
                                <base-radio name="true"  inline class="mb-3 mx-auto" v-model="addDiscountEdit"> <b>No</b> </base-radio> 
                            </div>
                        </div>
                        
                        <tabs fill class="flex-column flex-md-row">
                            <tab-pane>
                                <span slot="title">
                                    <i class="fa fa-user-check">
                                        Empleados
                                    </i>
                                </span>
                                <vue-custom-scrollbar ref="table" class="maxHeight">
                                    <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" >
                                        <template slot="validationnnn" slot-scope="props">
                                            <center>
                                                <base-button v-on:click="unSelected(props.row._id, props.row.vbt_id)" class="w-25" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                                </base-button>
                                                <base-button v-on:click="selected(props.row._id, props.row.vbt_id)" class="w-25" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                                            </center>
                                         </template>
                                        <!-- <base-button v-on:click="addService(props.row.vbt_id)" class="w-25" size="sm" type="danger" icon="fa fa-ban" v-else></base-button> -->
                                    </vue-bootstrap4-table>
                                </vue-custom-scrollbar >
                            </tab-pane>

                            <tab-pane title="Profile">
                                <span slot="title">
                                    <i class="fa fa-box-open">
                                        Productos
                                    </i>
                                </span>

                                <vue-custom-scrollbar class="maxHeight">
                                    <div class="p-4">
                                        <base-button v-for="(data , index) in rowsItems" v-on:click="elegirCantidad(index,2)" class="col-12 mb-1" type="secondary">
                                            <div class="row">
                                                <div class="col-8">
                                                    <base-checkbox  class="float-left" v-model="itemsBox[index].check">{{data.producto}}</base-checkbox>
                                                </div>
                                                <div class="col-4">
                                                    <badge v-if="itemsBox[index].count != ''" style="font-size:.8em !important" class="float-right text-default" type="success">{{itemsBox[index].count}} {{data.type}}</badge>
                                                </div>
                                            </div>
                                        </base-button>
                                    </div>
                                    <!-- <vue-bootstrap4-table :rows="rowsItems" :columns="columnsItem" :classes="classes" :config="configLender" v-on:on-select-row="selectedItem" v-on:on-all-select-rows="selectedAllItem" v-on:on-unselect-row="unSelectedItem" v-on:on-all-unselect-rows="unSelectedAllItem" >
                                    </vue-bootstrap4-table> -->
                                </vue-custom-scrollbar > 
                            </tab-pane>
                        </tabs>
                        <div class="text-center">
                            
                            <base-button type="primary" class="my-4" v-on:click="editService">Editar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table :rows="services" :columns="columns" :classes="classes" :config="config">
            <template slot="actionButtons" class="mx-auto" slot-scope="props">
                <center>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>Editar</span>
                        </template>
                        <base-button v-if="validRoute('servicios', 'editar')" icon="fa fa-edit" size="sm" type="default" class="text-center" v-on:click="dataEdit(props.row._id, props.row.prestadores, props.row.nombre, props.row.tiempo, props.row.descuento, props.row.comision, props.row.precio,props.row.productos,props.row.category)"></base-button>
                        <base-button v-else icon="ni ni-fat-add" size="sm" type="default" disabled class="text-center" ></base-button>
                    </a-tooltip>
    
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>Activar / Desactivar</span>
                        </template>
                        <template v-if="validRoute('servicios', 'activaciones')">
                             <base-button class="text-center" v-if="props.row.active" icon="ni ni-check-bold" size="sm" type="success" v-on:click="changeStatus(props.row._id)"></base-button>
                            <base-button class="text-center" v-else icon="ni ni-fat-remove" size="sm" type="danger" v-on:click="changeStatus(props.row._id)"></base-button> 
                  
                        </template>
                        <template v-else>
                            <base-button class="text-center" v-if="props.row.active" icon="ni ni-check-bold" size="sm" type="success" disabled></base-button>
                            <base-button class="text-center" v-else icon="ni ni-fat-remove" size="sm" type="danger" disabled></base-button> 
                        </template>
                    </a-tooltip>
                    
                </center>
            </template>
            <template slot="price" slot-scope="props">
                {{formatPrice(props.row.precio)}}
            </template>
            <template slot="time" slot-scope="props">
                {{props.row.tiempo}}Min
            </template>
            <template slot="comission" slot-scope="props">
                {{props.row.comision}}%
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
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
               modal-classes="modal-dialog-centered modal-lg">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <small>Cantidad</small>
                    </div>
                </template>
                <template>
                    <div class="row mx-auto">
                     <div class="col-7">
                        <base-input  alternative
                                placeholder="Cantidad por uso"
                                v-model="countModal"
                                addon-left-icon="fa fa-list-ol">
                        </base-input>
                      </div>
                      <div class="col-5 text-center mt-2">
                        {{unitPerItem}}
                      </div>
                   </div>
                        <div class="text-center">
                            <base-button type="primary" v-on:click="selectedItem" class="my-4">Registrar</base-button>
                            
                        </div>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Categorias</h3> 
                    </div>
                </template>
                <template>
                    <vue-bootstrap4-table :rows="categories" :columns="columnsCategories" class="class_categories" :classes="classes" :config="configCategories">
                        <template slot="deleteCat" slot-scope="props">
                            <base-button class="text-center float-right mr-2" icon="ni ni-fat-remove" size="sm" type="danger" v-on:click="deleteCategory(props.row._id)">Borrar</base-button> 
                        </template>
                    </vue-bootstrap4-table>
                    <base-button type="success" class="mt-1 float-right" @click="modals.modal6 = true">Nueva categoria
                    </base-button>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal6"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Registre una categoria</h3> 
                    </div>
                </template>
                <template>
                    <base-input  
                        alternative
                        placeholder="nombre de la categoria"
                        v-model="nameCategory"
                        addon-left-icon="fa fa-list-ol">
                    </base-input>
                    <base-button type="success" class="mt-1 float-right" v-on:click="newCategory">Registrar categoria
                    </base-button>
                </template>
            </card>
        </modal>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import router from '../router'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'
import VTooltip from 'v-tooltip'
 

// COMPONENTS
import Modal from '@/components/Modal'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
    components: {
        VueBootstrap4Table,
        Modal,
        vueCustomScrollbar,
        VTooltip
    },
    data(){
        return {
            auth: [],
            categoryRegister: 'Categoria',
            unitPerItem: '',
            countModal:'',
            typeItemModal:'',
            itemUses:'',
            modals: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                message: "",
                icon: '',
                type:''
            },
            nameCategory: '',
            categories: [],
            serviceRegister: '',
            priceRegister: '',
            comissionRegister: '',
            timeRegister: 'Seleccione el tiempo',
            services: [],
            columnsLender: [
                {
                    label: "Nombre",
                    name: "nombre",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Acciones",
                    name: "valid",
                    slot_name:"validationnnn",
                    sort: false,
                }
            ],
            columnsItem: [{
                label: "Nombre",
                name: "producto",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            }],
            columnsCategories: [{
                    label: "Nombre",
                    name: "name",
                    sort: true,
                },
                {
                    label: "Borrar",
                    name: "name",
                    slot_name: "deleteCat",
                    sort: false,
                },
            ],
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
                label: "Costo",
                name: "precio",
                slot_name: "price",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Tiempo",
                name: "tiempo",
                slot_name: "time",
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                slot_name: "comission",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Acciones",
                name: "_id",
                slot_name: "actionButtons",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            }],
            config: {
                card_title: "Tabla de servicios",
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
            configCategories: {
                card_title: "",
                checkbox_rows: false,
                rows_selectable : false,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: false,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                global_search: {
                    placeholder: "Enter custom Search text",
                    visibility: false,
                    case_sensitive: false
                },
                show_refresh_button: false,
                show_reset_button: false,  
                selected_rows_info: false,
                preservePageOnDataChange : false,
                pagination_info : false,
                pagination: false
            },
            configLender: {
                checkbox_rows: false,
                rows_selectable : false,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                show_refresh_button: false,
                show_reset_button: false,  
                selected_rows_info: false,
                preservePageOnDataChange : false,
                pagination_info : false,
                pagination: false,
                global_search: {
                    placeholder: "Busque el prestador",
                    visibility: true,
                    case_sensitive: false,
                    showClearButton: true,
                    searchOnPressEnter: false,
                    searchDebounceRate: 200,                      
                },
            },
            classes: {
                table: "table-bordered table-striped"
            },
            lenders: [],
            lenderSelecteds: [],
            addDiscount: false,
            idServiceEdit: '',
            EditlenderSelecteds: [],
            serviceEdit: '',
            priceEdit: 0,
            comissionEdit: 0,
            timeEdit: '',
            addDiscountEdit: '',
            prueba:'false',
            rowsItems:[],
            itemSelected:[],
            EdititemSelected:[],
            itemsBox:[],
            itemIndex:'',
            editCategoryServicer:''
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
        this.getServices();
        this.getLenders()
        this.getProducts()
        this.getToken()
        this.getCategories()
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
        getServices(){
            
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
				this.services = res.data
            })
        },
        getProducts() {
            
            axios.get(endPoint.endpointTarget+'/inventario')
            .then(res => {
                this.rowsItems = res.data 
                for (let index = 0; index < this.rowsItems.length; index++) {
                    this.itemsBox.push({check:false,count:''})
                    
                }
            })
            
            console.log(this.itemsBox)
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    res.data[index].valid = false
                }
                this.lenders = res.data
            })
        },
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.lenderSelecteds.push(value.selected_items[index]._id)
                this.EditlenderSelecteds.push(value.selected_items[index]._id)
            }
        },
        unSelectedAll(value){
            this.lenderSelecteds = []
            this.EditlenderSelecteds = []
        },
        selectedItem(value){
            if (this.countModal != '') {
                this.itemsBox[this.itemIndex].check = true
                this.itemsBox[this.itemIndex].count = this.countModal
                if (this.typeItemModal == 1) {
                    this.itemSelected.push({id:this.rowsItems[this.itemIndex]._id,count:this.itemsBox[this.itemIndex].count})
                }
                if (this.typeItemModal == 2) {
                    this.EdititemSelected.push({id:this.rowsItems[this.itemIndex]._id,count:this.itemsBox[this.itemIndex].count})
                }
                
                    this.modals.modal4 =false
                    this.modals.modal3 = true
                    this.modals.message = "Registro existoso"
                    this.modals.icon = 'ni ni-check-bold ni-5x'
                    this.modals.type = 'success'
                setTimeout(() => {
                        this.modals.modal3 = false
                        this.modals.message = ""
                        this.modals.icon = ''
                        this.modals.type = ''
                }, 1500);
            }
            else{
                this.modals = {
                    modal3: true,
                    message: "Debe rellenar los datos",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:false,
                        modal2:false,
                        modal3: false,
                        modal4:false,
                        modal5: false,
                        modal6: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }
        },
        unSelectedItem(value){
            for (let i = 0; i < this.itemSelected.length; i++) {
                if (this.itemSelected[i] == value.unselected_item._id) {
                    this.itemSelected.splice(i, 1)
                    break
                }
            }
            for (let i = 0; i < this.EdititemSelected.length; i++) {
                if (this.EdititemSelected[i] == value.unselected_item._id) {
                    this.EdititemSelected.splice(i, 1)
                    break
                }
            }
        },
        
        selectedAllItem(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.itemSelected.push(value.selected_items[index]._id)
                this.EdititemSelected.push(value.selected_items[index]._id)
            }
        },
        unSelectedAllItem(value){
            this.itemSelected = []
            this.EdititemSelected = []
        },
        registerService(){
            if (this.serviceRegister == '' || this.priceRegister == 0 || this.timeRegister == '' || this.comissionRegister == '') {
                this.modals = {
                    modal3: true,
                    message: "Debe rellenar los datos",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:true,
                        modal2:false,
                        modal3: false,
                        modal4: false,
                        modal5: false,
                        modal6: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }else{
                if (this.lenderSelecteds.length == 0) {
                    this.modals = {
                        modal3: true,
                        message: "Debe seleccionar almenos un prestador",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:true,
                            modal2:false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            modal6: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }else{
                    
                    axios.post(endPoint.endpointTarget+'/servicios', {
                        nombreServicio: this.serviceRegister,
                        precioServicio: this.priceRegister,
                        comisionServicio: this.comissionRegister,
                        tiempoServicio: this.timeRegister,
                        prestadores: this.lenderSelecteds,
                        productos:this.itemSelected,
                        categoryRegister: this.categoryRegister,
                        descuento: this.addDiscount
                    }).then(res => {
                        if (res.data.status == 'Servicio creado') {
                            this.modals = {
                                modal3: true,
                                message: "El servicio se registro con exito",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1:false,
                                    modal2:false,
                                    modal3: false,
                                    modal4: false,
                                    modal5: false,
                                    modal6: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
                            this.initialState()
                            this.getServices()
                            EventBus.$emit('reloadServices', 'reload')
                        }else{
                            this.modals = {
                                modal3: true,
                                message: "El servicio ya existe",
                                icon: 'ni ni-fat-remove ni-5x',
                                type: 'danger'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1:false,
                                    modal2:false,
                                    modal3: false,
                                    modal4: false,
                                    modal5: false,
                                    modal6: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
                        }
                    })
                }
            }
        },
        initialState(){
            this.serviceRegister = ''
            this.priceRegister = 0
            this.comissionRegister = ''
            this.timeRegister = 'Seleccione el tiempo'
            this.lenderSelecteds = []
            this.addDiscount = false
            this.modals.modal1 = false
            $('.maxHeight  thead .vbt-checkbox').click()
            $('.maxHeight  thead .vbt-checkbox').prop('checked', false)
        },
        selected(value, id){
            this.lenders[id - 1].valid = true
            console.log(this.lenders)
            this.lenderSelecteds.push(value)
            this.EditlenderSelecteds.push(value)
            console.log(this.lenderSelecteds)
        },
        unSelected(value, id){
            this.lenders[id - 1].valid = false
            for (let i = 0; i < this.lenderSelecteds.length; i++) {
                if (this.lenderSelecteds[i] == value) {
                    this.lenderSelecteds.splice(i, 1)
                    break
                }
            }
            for (let i = 0; i < this.EditlenderSelecteds.length; i++) {
                if (this.EditlenderSelecteds[i] == value) {
                    this.EditlenderSelecteds.splice(i, 1)
                    break
                }
            }
        },
        dataEdit(id, lenders, name, time, discount, comission, price,items, category){
            console.log(items)
            this.itemsBox = []
            for (let index = 0; index < this.rowsItems.length; index++) {
                this.itemsBox.push({check:false,count:''})
            }
            this.EditlenderSelecteds = []
            this.EdititemSelected = []
            const discountFinal = discount ? false : true
            this.idServiceEdit = id
            this.EditlenderSelecteds = lenders
            this.EdititemSelected = items
            this.serviceEdit = name
            this.priceEdit = price
            this.editCategoryServicer = category
            this.comissionEdit = comission
            this.timeEdit = time
            this.addDiscountEdit = discount
            this.modals.modal2 = true
            this.EditlenderSelecteds = []
            console.log(lenders)
            for (let index = 0; index < this.lenders.length; index++) {
                const element = this.lenders[index];
                this.lenders[index].valid = false
                for (let j = 0; j < lenders.length; j++) {
                    const elementTwo = lenders[j];
                    if (elementTwo == element._id) {
                        this.EditlenderSelecteds.push(element._id)
                        this.lenders[index].valid = true
                    }
                }
            }
            console.log(this.lenders)
            console.log(this.EditlenderSelecteds)
        },
        clean(){
            this.lenderSelecteds = []
            this.EditlenderSelecteds = []
            for (let index = 0; index < this.lenders.length; index++) {
                const element = this.lenders[index];
                element.valid = false
            }
        },
        editService(){
            if (this.serviceEdit == '' || this.priceEdit == '' || this.timeEdit == '' || this.comissionEdit == '') {
                this.modals = {
                    modal3: true,
                    message: "Debe rellenar los datos",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:false,
                        modal2:false,
                        modal3: false,
                        modal4: false,
                        modal5: false,
                        modal6: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }else{
                if (this.EditlenderSelecteds.length == 0) {
                    this.modals = {
                        modal3: true,
                        message: "Debe seleccionar almenos un prestador",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:false,
                            modal2:false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            modal6: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }else{
                    console.log(this.EdititemSelected)
                    var ifCheck = this.addDiscountEdit ? false : true
					const id = this.idServiceEdit
					axios.put(endPoint.endpointTarget+'/servicios/' + id, {
						nombreServicio: this.serviceEdit,
						tiempoServicio: this.timeEdit,
						precioServicio: this.priceEdit,
						comisionServicio: this.comissionEdit,
                        prestadores: this.EditlenderSelecteds,
                        productos: this.EdititemSelected,
                        descuento: this.addDiscountEdit,
                        editCategoryServicer: this.editCategoryServicer
					}).then(res => {
                        this.modals = {
                            modal3: true,
                            message: "¡Servicio actualizado!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.getServices();
                            this.modals = {
                                modal1: false,
                                modal2: false,
                                modal3: false,
                                modal4: false,
                                modal5: false,
                                modal6: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                        EventBus.$emit('reloadServices', 'reload')
                    })
                }
            }
        },
        changeStatus(id){
            axios.put(endPoint.endpointTarget+'/servicios/changeActive/' + id)
            .then(res => {
                this.getServices();
                // this.emitMethod()
            })
            .catch(err => {
                this.messageError = 'Error con la consulta'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            })
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
        elegirCantidad(i,e){
            if (this.itemsBox[i].count == '') {
                this.typeItemModal = e
                this.countModal = ''
                this.modals.modal4 = true
                this.itemsBox[i].check = false
                this.itemIndex = i
                this.unitPerItem = this.rowsItems[i].type
            }
            else{
                this.itemsBox[i].count = ''
                this.itemsBox[i].check = false
                for (let e = 0; e < this.itemSelected.length;e++) {
                    if (this.itemSelected[e].id == this.rowsItems[i]._id) {
                        this.itemSelected.splice(e, 1)
                        break
                    }
                }
                for (let e = 0; e < this.EdititemSelected.length; e++) {
                    if (this.EdititemSelected[e].id == this.rowsItems[i]._id) {
                        this.EdititemSelected.splice(e, 1)
                        break
                    }
                }
                console.log(this.EdititemSelected)
            }
        },
        async getCategories(){
            const categories = await axios.get(endPoint.endpointTarget+'/servicios/getCategory')
            console.log(categories)
            if (categories.data.length > 0) {
                this.categories = categories.data
            }
        },
        newCategory(){
            axios.post(endPoint.endpointTarget+'/servicios/newCategory', {
                name: this.nameCategory
            })
            .then(res => {
                console.log(res)
                if (res.data.status == 'ok') {
                    this.getCategories()
                    this.nameCategory = ''
                    this.modals.modal6 = false
                }
            })
        },
        deleteCategory(id){
            axios.delete(endPoint.endpointTarget+'/servicios/deleteCategory/'+id)
            .then(res => {
                if (res.data.status == 'ok') {
                    this.getCategories()
                }
            })
        },
        pruebameEste(e){
            
        }
    }
}
</script>
<style>
    .maxHeight{
        max-height: 300px;
        overflow: scroll;
    }
    .vbt-table-tools th{
        padding: 5px !important;
        max-height: 20px !important;
        overflow: hidden !important;
    }
    .vbt-table-tools th div .col-md-8{
        display:none !important;
    }
    .vbt-table-tools th div .col-md-4{
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .col-md-6{
        display:none;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search{
        display:block !important;
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group{
        margin-bottom: 2px !important;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group input{
       border-left: 1px solid #cad1d7;
       padding-left: 5px;
    }
    .maxHeight .card .card-header{
        display:none ;
    }
    .maxHeight .table td {
        padding: 5px;
        padding-bottom: 5px;
    }
    .card-header{
        font-size: 2.5vw;
    }
    .class_categories .card-header{
        display: none;
    }
    .class_categories .card-footer{
        display: none;
    }
    .tooltip {
    display: block !important;
    z-index: 10000;
    }
    
    .tooltip .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
    }
    
    .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
    }
    
    .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
    }
    
    .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    }
    
    .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
    }
    
    .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    }
    
    .tooltip[x-placement^="right"] {
    margin-left: 5px;
    }
    
    .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
    }
    
    .tooltip[x-placement^="left"] {
    margin-right: 5px;
    }
    
    .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
    }
    
    .tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, .1);
    }
    
    .tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
    }
    
    .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
    }
    
    .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
    }
</style>