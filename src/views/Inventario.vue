<template>
  <div>
    <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center" style="min-height: 50px; background-image: url(img/theme/inventario.jpg); background-size: cover; background-position: center top;">
        <!-- Mask -->
        <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center">
            <div class="row">
                <div class="col-12">
                    <h1 class="display-2 text-white">Sección de inventario</h1>
                    <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tu inventario, aquí podrás registrar, editar y visualizar todos tus productos.</p>
                    <a @click="modals.modal1 = true ,validForm = 1, initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un producto</a>
                    <a @click="modals.modal3 = true, providerSup.typeProvider = 'Registrar', initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un provedor</a>
                    <a @click="modals.modal4 = true" class="btn btn-danger text-white cursor-pointer">Cerrar inventario</a>
                </div>
            </div>
        </div>
    </base-header>
    <tabs fill class="flex-column flex-md-row inventory inventoryTabs">
        <card shadow>
            <tab-pane>
                <span class="p-2" slot="title">
                    <i class="fa fa-box-open"></i>
                    Tabla de productos
                </span>
                <vue-bootstrap4-table class="tableClient" card_title="Hola" :rows="rows" :columns="columns" :classes="classes" :config="config">
                  <template slot="edit" slot-scope="props">
                      <b>
                        <center>
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Anexar productos</span>
                            </template>
                            <base-button  title="Compras" size="sm" type="success" @click="modals.modal1 = true,validForm = 3,dataProduct.entry = '',unit = props.row.type, dataProduct.name = props.row.producto,initialState(1,props.row._id)" icon="fa fa-plus"></base-button>
                          </a-tooltip>

                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Alerta de productos</span>
                            </template>
                            <base-button v-if="parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume) <= props.row.alertTotal" title="Alerta producto" size="sm" type="danger" icon="ni ni-bell-55" @click="dataStock(props.row._id, props.row.alertTotal, props.row.type)"></base-button>
                            <base-button v-else title="Alerta producto" size="sm" type="success" icon="ni ni-bell-55" @click="dataStock(props.row._id, props.row.alertTotal, props.row.type)"></base-button>
                          </a-tooltip>  

                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Eliminar</span>
                            </template>
                            <base-button  title="Eliminar" size="sm" type="danger" @click="deleteItem(props.row._id)" icon="fa fa-trash"></base-button>
                          </a-tooltip>  
                            
                        </center>
                      </b>
                  </template>
                  <template slot="totalIdeal" slot-scope="props">
                    <span v-if="parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume) <= props.row.alertTotal" style="color:#f5365c">
                      {{parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume)}}
                    </span>
                    <span v-else>
                      {{parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume)}}
                    </span>
                  </template>
                  <template slot="price" slot-scope="props">
                    $ {{formatPrice(props.row.monto)}}
                  </template>
                  <template slot="pagination-info" slot-scope="props">
                      Actuales {{props.currentPageRowsLength}} | 
                         
                      Registros totales {{props.originalRowsLength}}
                  </template>
                  <template slot="selected-rows-info" slot-scope="props">
                      Total Number of rows selected : {{props.selectedItemsCount}}
                  </template>
              </vue-bootstrap4-table>
            </tab-pane>

            <tab-pane title="Profile">
                <span id="provedorBtn" slot="title">
                    <i class="fa fa-user-tie"></i>
                    Tabla de provedores
                </span>
                <vue-bootstrap4-table class="tableClient" :rows="providerTable" :columns="columProvider" :classes="classes" :config="config">
                  <template slot="edit" slot-scope="props">
                      <b>
                        <center>
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Editar</span>
                            </template>
                            <base-button size="sm" type="default" @click="modals.modal3 = true, providerSup.typeProvider = 'Editar', pushDataProvider(props.row.nombre, props.row.rut, props.row.contacto,props.row.contactoAdicional,props.row.ubicacion,props.row._id)" icon="fas fa-edit"></base-button>
                            
                          </a-tooltip>

                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Eliminar</span>
                            </template>
                            <base-button size="sm" type="danger" @click="deleteProvider(props.row._id)" icon="fa fa-trash"></base-button>
                          </a-tooltip>
                            
                        </center>
                      </b>
                  </template>
                  <template slot="totalIdeal" slot-scope="props">
                    {{parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume)}}
                  </template>
                  <template slot="price" slot-scope="props">
                    $ {{formatPrice(props.row.monto)}}
                  </template>
                  
                  <template slot="pagination-info" slot-scope="props">
                      Actuales {{props.currentPageRowsLength}} | 
                         
                      Registros totales {{props.originalRowsLength}}
                  </template>
                  <template slot="selected-rows-info" slot-scope="props">
                      Total Number of rows selected : {{props.selectedItemsCount}}
                  </template>
              </vue-bootstrap4-table>
            </tab-pane>

            <tab-pane>
                <span slot="title">
                  <i class="ni ni-calendar-grid-58"></i>
                  Historial
                </span>
                <tabs fill class="flex-column flex-md-row">
                    <card shadow>
                        <tab-pane>
                            <span slot="title">
                                <i class="fa fa-money-check-alt"></i>
                                Historial de compras
                            </span>
                            <vue-bootstrap4-table class="tableClient" card_title="Hola" :rows="history" :columns="columHistory" :classes="classes" :config="config">
                              <!-- <template slot="edit" slot-scope="props">
                                  <b>
                                    <center>
                                        <base-button size="sm" type="default" @click="deleteSale(props.row.id,props.row.entry)" icon="fa fa-ban">Anular</base-button>
                                    </center>
                                  </b>
                              </template> -->
                              <template slot="totalIdeal" slot-scope="props">
                                {{parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume)}}
                              </template>
                              <template slot="costo" slot-scope="props">
                                $ {{formatPrice(props.row.precio)}}
                              </template>
                              
                              <template slot="pagination-info" slot-scope="props">
                                  Actuales {{props.currentPageRowsLength}} | 
                                     
                                  Registros totales {{props.originalRowsLength}}
                              </template>
                              <template slot="selected-rows-info" slot-scope="props">
                                  Total Number of rows selected : {{props.selectedItemsCount}}
                              </template>
                          </vue-bootstrap4-table>
                        </tab-pane>

                        <tab-pane title="Profile">
                            <span slot="title">
                                <i class="fa fa-file-contract"></i>
                                Historial de cierres
                            </span>
                            <vue-bootstrap4-table class="tableClient" :rows="historyClosed" :columns="columHistoryClosed" :classes="classes" :config="config">
                              <template slot="edit" slot-scope="props">
                                  <b>
                                    <center>
                                      <a-tooltip placement="top">
                                        <template slot="title">
                                          <span>Ver informe</span>
                                        </template>
                                        <base-button size="sm" type="default" @click="modals.modal5 = true ,validForm = 2, reports = props.row.array" icon="ni ni-bullet-list-67"></base-button>
                                      </a-tooltip>
                                        
                                        <!-- <base-button size="sm" type="danger" @click="deleteItem(props.row._id)" icon="fa fa-trash">Anular</base-button> -->
                                    </center>
                                  </b>
                              </template>
                              <template slot="date" slot-scope="props">
                                {{formatDate(props.row.fecha)}}
                              </template>
                              
                              <template slot="pagination-info" slot-scope="props">
                                  Actuales {{props.currentPageRowsLength}} | 
                                     
                                  Registros totales {{props.originalRowsLength}}
                              </template>
                              <template slot="selected-rows-info" slot-scope="props">
                                  Total Number of rows selected : {{props.selectedItemsCount}}
                              </template>
                          </vue-bootstrap4-table>
                        </tab-pane>
                    </card>
                </tabs>
            </tab-pane>
        </card>
    </tabs>
    <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
        <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template>
            </template>
            <template>
                <div v-if="validForm != 3" style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Datos del producto</small>
                </div>
                <div v-else style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Anexa mas productos a {{dataProduct.name}}</small>
                </div>
                <form role="form">
                   <div class="row" v-if="validForm == 3">
                     <div class="col-7">
                        <base-input v-on:keyup="valid"  alternative
                                placeholder="Cantidad"
                                v-model="dataProduct.entry"
                                addon-left-icon="fa fa-box-open">
                        </base-input>
                      </div>
                      <div class="col-5 mt-2">
                        {{unit}}
                      </div>
                   </div>
                    
                    <base-input v-on:change="valid" v-if="validForm == 3" addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDatePicker"
                                    class="form-control datepicker"
                                    v-model="dateAdd"
                                    placeholder="Seleccione una fecha de compra">
                        </flat-picker>
                    </base-input>
                    
                    <base-input v-if="validForm != 3" alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="dataProduct.name"
                                addon-left-icon="fa fa-edit">
                    </base-input>
                    <select v-if="validForm != 3" class="form-control mb-3"  v-model="unit">
                      <option style="color:black;" selected value="">Seleccione el tipo de medida</option>
                      <option style="color:black;" value="Gramo(s)">Gramo(s)</option>
                      <option style="color:black;" value="Kilogramo(s)">Kilogramo(s)</option>
                      <option style="color:black;" value="Litro(s)">Litro(s)</option>
                      <option style="color:black;" value="Mililitro(s)">Mililitro(s)</option>
                      <option style="color:black;" value="Unidad">Unidad</option>
                    </select>
                    <base-input v-if="validForm != 3" alternative
                                placeholder="Cantidad"
                                v-model="dataProduct.initial"
                                addon-left-icon="fa fa-box-open">
                    </base-input>
                    <base-input v-if="validForm == 1" alternative
                          placeholder="Numero para alerta"
                          v-model="dataProduct.alert"
                          addon-left-icon="fa fa-bell">
                    </base-input>
                    <currency-input
                        v-on:keyup="valid"
                        locale="de"
                        placeholder="Precio por unidad"
                        addon-left-icon="ni ni-money-coins"
                        v-model="dataProduct.price"
                        class="form-control mb-3"
                        style="margin-top:-10px;"
                    />	
                    <base-button icon="fa fa-plus" @click="modals.modal3 = true" v-if="validForm == 3" class="mb-2" size="sm" type="success">Registrar provedor</base-button>
                    <div v-on:click="valid" v-on:keyup="valid">
                      <vue-single-select
                        v-if="validForm == 3"
                        v-model="provider"
                        :options="providers"
                      placeholder="Provedor"
                      ></vue-single-select>
                    </div>
                    
                    <div class="text-center">
                        <base-button v-on:click="addProduct()" v-if="validForm == 1" type="default">Registrar</base-button>
                        <base-button v-on:click="updateProducts()" v-if="validForm == 2" type="default">Editar</base-button>
                        <base-button  v-on:click="addMore(dataProduct.id)" v-if="validForm == 3" type="success">Agregar</base-button>
                    </div>
                </form>
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
                <div style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Edite el total para que le sistema alerte cuando este próximo a acabarse ({{typeStock}})</small>
                </div>
                <form role="form">
                    <base-input alternative
                      placeholder="Total alarma"
                      v-model="stockTotal"
                      addon-left-icon="fa fa-bell">
                    </base-input>
                </form>
            </template>
            <div class="text-center">
              <base-button v-on:click="editStock()" type="default">Editar</base-button>
            </div>
        </card>
    </modal>
    <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
        <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template>
                <div style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Datos del provedor</small>
                </div>
                <form role="form">
                    <base-input  alternative
                                placeholder="Nombre de la empresa"
                                v-model="provider.name"
                                v-on:keyup="validProviders()"
                                addon-left-icon="fa fa-user-tie"
                                addon-right-icon="fa fa-asterisk text-danger">
                    </base-input>
                    <base-input  alternative
                                placeholder="RUT de la empresa"
                                v-model="provider.rut"
                                v-on:change="provider.rut = formatRut(provider.rut)"
                                addon-left-icon="fa fa-key"
                                addon-right-icon="fas fa-plus text-default">
                    </base-input>
                    <base-input  alternative
                                placeholder="Contacto de la empresa"
                                v-model="provider.contact"
                                v-on:keyup="validProviders()"
                                addon-left-icon="fa fa-address-book"
                                addon-right-icon="fa fa-asterisk text-danger"
                                >
                    </base-input>
                    <base-input  alternative
                                placeholder="Contacto adicional"
                                v-model="provider.contactPlus"
                                addon-left-icon="fa fa-address-book"
                                addon-right-icon="fas fa-plus text-default">
                    </base-input>
                    <base-input  alternative
                                placeholder="Dirección de la empresa"
                                v-model="provider.direction"
                                v-on:keyup="validProviders()"
                                addon-left-icon="fas fa-route"
                                addon-right-icon="fa fa-asterisk text-danger">
                    </base-input>
                </form>
            </template>
            <div class="text-center">
              <base-button v-on:click="providerFunction()"  :disabled="providerSup.validProvider" type="default">{{providerSup.typeProvider}}</base-button>
            </div>
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
    <modal :show.sync="modals.modal4" modal-classes="modal-dialog-centered modal-lg">
      <h6 slot="header" class="modal-title" id="modal-title-default">Cierre de inventario</h6>
      <vue-custom-scrollbar style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
        <div class="row p-2 m-2">
          <div class="col-7">
            Nombre del producto
          </div>
          <div class="col-5 text-left">
            Total real
          </div>
        </div> 
        <div v-for="(data, index) in rows" class="row p-2 m-2">
          <dt class="col-7 mt-2">{{data.producto}}</dt>

          <base-input class="col-5" v-model="countProduct[index].count" :placeholder="'Ingrese cantidad en '+data.type"></base-input>
        </div>
      </vue-custom-scrollbar> 
      
      <template slot="footer">
          <base-button v-on:click="closeInventory" type="default">Cerrar inventario</base-button>
          <base-button type="link" class="ml-auto" @click="modals.modal4 = false">Salir
          </base-button>
      </template>
    </modal>
    <modal  modal-classes="modal-dialog-centered modal-xl" :show.sync="modals.modal5">
        <h6 slot="header" class="modal-title" id="modal-title-default">Informe de cierre</h6>

        <vue-bootstrap4-table class="tableClient" :rows="reports" :columns="columHistoryReport" :classes="classes" :config="config">
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                   
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>

        <template slot="footer">
            
            <base-button type="link" class="ml-auto" @click="modals.modal5 = false">Cerrar
            </base-button>
        </template>
    </modal>

  </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import EventBus from '../components/EventBus'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {Spanish} from 'flatpickr/dist/l10n/es.js';
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table,
        flatPicker,
        vueCustomScrollbar
    },
    data() {
      return {
        countProduct:[],
        reports:[],
        usuario: localStorage.nombre + ' ' + localStorage.apellido,
        myId:null,
        historyClosed:[],
        validForm:0,
        providerSup:{
          validProvider:false,
          typeProvider:'',
        }, 
        history:[],
        provider:{
          name:'',
          rut:'',
          contact:'',
          contactPlus:'',
          direction:'',
        },
        providers:[],
        providerTable:[],
        unit:"",
        dateAdd:'',
        stockTotal: '',
        idToStock: '',
        typeStock: '',
        addValid:true,
        configDatePicker: {
          allowInput: true,
          dateFormat: 'm-d-Y',
          locale: Spanish, // locale for this instance only
          minDate: new Date(),         
        },
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
        dataProduct:{
          name:'',
          price:0,
          initial:'',
          entry:'',
          alert:'',
          id:null
        },
        rows: [],
        columns: [
          {
            label: "Producto",
            name: "producto",
            sort: true,
          },
          {
            label: "precio",
            name: "monto",
            slot_name: "price",
            sort: true
          },
          {
            label: "Tipo de medida",
            name: "type",
            sort: true,
          },
          {
            label: "Cantidad inicial",
            name: "cantidad",
            sort: true,
          },
          {
            label: "Cantidad ingresada",
            name: "entry",
            sort: false,
            
          },
          {
            label: "Consumo",
            name: "consume",
            sort: false,
            
          },
          {
            label: "Total",
            name: "",
            sort: false,
            slot_name: "totalIdeal"
          },
          {
            label: "Administrar",
            name: "_id",
            sort: false,
            slot_name: "edit"
          },
        ],
        columProvider:[
          {
            label: "Nombre de la empresa",
            name: "nombre",
            sort: true
          },
          {
            label: "RUT",
            name: "rut",
            sort: true
          },
          {
            label: "Contacto",
            name: "contacto",
            sort: true
          },
          {
            label: "Contacto adicional",
            name: "contactoAdicional",
            sort: true
          },
          {
            label: "Ubicación",
            name: "ubicacion",
            sort: true
          },
          {
            label: "Administrar",
            name: "_id",
            sort: false,
            slot_name: "edit"
          },
        ],
        columHistory:[
          {
            label: "Fecha",
            name: "fecha",
            sort: true
          },
          {
            label: "Producto",
            name: "producto",
            sort: true
          },
          {
            label: "Anexado",
            name: "entry",
            sort: true
          },
          {
            label: "Medida",
            name: "unit",
            sort: true
          },
          {
            label: "Costo",
            name: "precio",
            sort: true,
            slot_name: "costo"
          },
          {
            label: "Provedor",
            name: "provedor",
            sort: true
          },
          // {
          //   label: "Administrar",
          //   name: "_id",
          //   sort: false,
          //   slot_name: "edit"
          // },
        ],
        columHistoryClosed:[
          {
            label: "Fecha",
            name: "fecha",
            sort: true,
            slot_name: "date"
          },
          {
            label: "Encargado del cierre",
            name: "user",
            sort: true,
            slot_name: "costo"
          },
          {
            label: "Productos totales",
            name: "totalProduct",
            sort: true
          },
          {
            label: "Administrar",
            name: "_id",
            sort: false,
            slot_name: "edit"
          },
        ],
        columHistoryReport:[
          {
            label: "Producto",
            name: "name",
            sort: true,
            slot_name: "date"
          },
          {
            label: "Medida",
            name: "medida",
            sort: true,
            slot_name: "costo"
          },
          {
            label: "Total ideal",
            name: "ideal",
            sort: true
          },
          {
            label: "Total real",
            name: "count",
            sort: true
          },
          {
            label: "Diferencia",
            name: "diferencia",
            sort: true
          },
        ],
        config: {
          checkbox_rows: false,
          rows_selectable : true,
          highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
          rows_selectable: true,
          per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
          global_search: {
              placeholder: "Filtrar productos",
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
      this.getProducts();
      this.getProviders();
      this.getHistoryClosed();
    },
    methods: {
      getProducts() {
        this.countProduct = []
        axios.get(endPoint.endpointTarget+'/inventario')
        .then(res => {
          this.rows = res.data
          this.history = []
          for (let i = 0; i < res.data.length; i++) {
            for (let e = 0; e < res.data[i].history.length; e++) {
              
              this.history.push(res.data[i].history[e])
            }
          }
          for (let index = 0; index < this.rows.length; index++) {
              var ideal = (this.rows[index].cantidad + this.rows[index].entry) - this.rows[index].consume
              this.countProduct.push({id:this.rows[index]._id,count:'',ideal:ideal,medida:this.rows[index].type,name:this.rows[index].producto,diferencia:''})
          } 
        })
      },
      getProviders() {
        axios.get(endPoint.endpointTarget+'/inventario/getProvider')
        .then(res => {
          this.providerTable = res.data
          for (let i = 0; i < res.data.length; i++) {
            this.providers.push(res.data[i].nombre)
          }
        })
      },
      getHistoryClosed() {
        axios.get(endPoint.endpointTarget+'/inventario/getHistory')
        .then(res => {
          this.historyClosed = res.data
        })
      },
      addProduct(){
        axios.post(endPoint.endpointTarget+'/inventario', {
          product: this.dataProduct.name,
          type: this.unit,
          quantity: this.dataProduct.initial,
          price: this.dataProduct.price,
          alert:this.dataProduct.alert
        })
        .then(res => {
          if (res.data.status === 'ok') {
            this.modals = {
                    modal2: true,
                    message: "¡Producto registrado con exito!",
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
                        modal6: false,
                        message: "",
                        icon: '',
                        type:''
                    }
                    this.getProducts();
                    this.initialState(3)
                }, 1500);
            
          }else{
            this.modals = {
                modal2: true,
                message: "¡Producto ya existe!",
                icon: 'ni ni-fat-remove ni-5x',
                type: 'danger'
            }
            setTimeout(() => {
                this.modals = {
                    modal1: true,
                    modal2: false,
                    modal3: false,
                    modal4: false,
                    modal5: false,
                    modal6: false,
                    message: "",
                    icon: '',
                    type:''
                }
                this.getProducts();
            }, 1500);
          }
        })
        .catch(err => {
          this.$swal({
            type: 'error',
            title: 'Problemas con el servidor',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
      },
      addProvider(){
        axios.post(endPoint.endpointTarget+'/inventario/addProvider', {
          name: this.provider.name,
          rut:this.provider.rut,
          contacto:this.provider.contact,
          contactoPlus:this.provider.contactPlus,
          direccion:this.provider.direction
        })
        .then(res => {
          if (res.data.status === 'ok') {
            this.$swal({
              type: 'success',
              title: 'Provedor registrado',
              showConfirmButton: false,
              timer: 1500
            })
            this.provider = {
              name:'',
              rut:'',
              contact:'',
              contactPlus:'',
              direction:'',
            }
            this.modals = {
              modal1: false,
              modal2: false,
              modal3: false,
              modal4: false,
              modal5: false,
              modal6: false,
              message: "",
              icon: '',
              type:''
            }
            document.getElementById("provedorBtn").click()
            this.getProducts();
            this.getProviders();
          }else{
            this.$swal({
              type: 'error',
              title: 'Provedor existe',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          this.$swal({
            type: 'error',
            title: 'Problemas con el servidor',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
      },
      initialState(type,id){
        if (type == 1) {
          this.myId = id
          this.provider = ''
          this.dateAdd = ''
          this.dataProduct.price = ''
          console.log(this.myId)
        }
        if (type == 2) {
          this.provider = {
            name:'',
            rut:'',
            contact:'',
            contactPlus:'',
            direction:'',
          }
          this.providerSup.validProvider = true
        }
        if(type == 3){
          console.log("No entre aqui")
          this.dataProduct = {
            name:'',
            price:0,
            initial:'',
            add:'',
            alert: '',
            id:''
          }
          this.unit = ''
        }
      },
      pushData(name,cantidad,precio,id,type){
        this.validForm = 2
        this.unit = ''
        this.dataProduct = {
          name:name,
          price:precio,
          initial:cantidad,
          id:id
        }
        this.unit = type
      },
      formatDate(date) {
        let dateFormat = new Date(date)
        return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
      formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      updateProducts(){
        axios.put(endPoint.endpointTarget+'/inventario/'+this.dataProduct.id, {
          product:this.dataProduct.name,
          type: this.unit,
          cantidad:this.dataProduct.initial,
          monto:this.dataProduct.price,
        })
        .then(res => {
          this.modals = {
                    modal2: true,
                    message: "¡Producto actualizado con exito!",
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
                        modal6: false,
                        message: "",
                        icon: '',
                        type:''
                    }
                    this.getProducts();
                    this.initialState(2)
                }, 1500);
        })
        .catch(err => {
          this.modals = {
              modal2: true,
              message: "¡Error al actualizar el producto!",
              icon: 'ni ni-fat-remove ni-5x',
              type: 'danger'
          }
          setTimeout(() => {
              this.modals = {
                  modal1: true,
                  modal2: false,
                  modal3: false,
                  modal4: false,
                  modal5: false,
                  modal6: false,
                  message: "",
                  icon: '',
                  type:''
              }
          }, 1500);
        })
      },
      updateProvider(){
        axios.put(endPoint.endpointTarget+'/inventario/updateProvider/'+this.provider.id, {
          name:this.provider.name,
          rut: this.provider.rut,
          contact:this.provider.contact,
          contactoPlus:this.provider.contactPlus,
          ubicacion:this.provider.direction
        })
        .then(res => {
          this.$swal({
              type: 'success',
              title: 'Provedor Actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProviders();
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'El provedor no fue actualizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      addMore(){
        
        axios.put(endPoint.endpointTarget+'/inventario/add/'+this.myId, {
          entry:this.dataProduct.entry,
          history:{id:this.myId,fecha:this.dateAdd,producto:this.dataProduct.name,entry:this.dataProduct.entry,unit:this.unit,precio:this.dataProduct.price,provedor:this.provider, status:true}
        })
        .then(res => {
          this.modals = {
              modal2: true,
              message: "¡Producto actualizado con exito!",
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
                  modal6: false,
                  message: "",
                  icon: '',
                  type:''
              }
              this.getProducts();
          }, 1500);

        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'El producto no fue actualizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      valid(){
        if (this.unit != '' && this.dateAdd != '' && this.dataProduct.price != '' && this.provider != '') {
          this.addValid = false
        }
        else{
          this.addValid = true
        }
      },
      deleteProvider(id){
        this.$swal({
          title: '¿Está seguro de borrar el provedor?',
          text: 'No puedes revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy seguro',
          cancelButtonText: 'No, evitar acción',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            axios.delete(endPoint.endpointTarget+'/inventario/deleteProvider/'+id)
            .then(res => {
              if (res.data.status == 'ok') {
                this.modals = {
                    modal2: true,
                    message: "Provedor borrado con exito",
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
                        modal6: false,
                        message: "",
                        icon: '',
                        type:''
                    }
                    this.getProviders()
                }, 1500);
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
                    modal3: false,
                    modal4: false,
                    modal5: false,
                    modal6: false,
                    message: "",
                    icon: '',
                    type:''
                }
            }, 1500);
          }
        })
      },
      deleteItem(id){
        this.$swal({
          title: '¿Está seguro de borrar el producto?',
          text: 'No puedes revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy seguro',
          cancelButtonText: 'No, evitar acción',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            axios.put(endPoint.endpointTarget+'/inventario/deleteItem/'+id)
            .then(res => {
              if (res.data.status == 'ok') {
                this.modals = {
                    modal2: true,
                    message: "Producto borrado con exito",
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
                        modal6: false,
                        message: "",
                        icon: '',
                        type:''
                    }
                    this.getProducts()
                }, 1500);
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
                    modal3: false,
                    modal4: false,
                    modal5: false,
                    modal6: false,
                    message: "",
                    icon: '',
                    type:''
                }
            }, 1500);
          }
        })
      },
      closeInventory(){
        console.log(this.countProduct)
        axios.post(endPoint.endpointTarget+'/inventario/closeInventory', {
          user:this.usuario,
          array:this.countProduct
        })
        .then(res => {
          if (res.data.status === 'ok') {
            this.modals = {
              modal2: true,
              message: "¡Cierre realizado!",
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
                  modal6: false,
                  message: "",
                  icon: '',
                  type:''
              }
              this.getProducts();
            this.getHistoryClosed()
          }, 1500);
            
          }
          else{
            this.$swal({
              type: 'success',
              title: 'Ya se hizo un cierre este mes',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'Cierre NO realizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      validProviders(){
        if (this.provider.name == '' || this.provider.contact == '' || this.provider.direction == '') {
          this.providerSup.validProvider = true
        }
        else{
          this.providerSup.validProvider = false
        }
      },
      pushDataProvider(name,rut,contact,contactPlus,direccion,id){
        this.provider = {
          name:name,
          rut:rut,  
          contact:contact,
          contactPlus:contactPlus,
          direction:direccion,
          id:id
        }
      },
      providerFunction(){
        if (this.providerSup.typeProvider == 'Registrar') {
          this.addProvider()
        }
        else{
          this.updateProvider()
        }
      },
      deleteSale(id,entry){
        axios.post(endPoint.endpointTarget+'/inventario/deleteSale/'+id, {
          user:this.usuario,
          array:this.countProduct
        })
        .then(res => {
          if (res.data.status === 'ok') {
            this.$swal({
              type: 'success',
              title: 'Cierre realizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProducts();
            this.getHistoryClosed()
          }
          else{
            this.$swal({
              type: 'success',
              title: 'Ya se hizo un cierre este mes',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'Cierre NO realizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      dataStock(id, alert, type){
        this.modals.modal6 = true
        this.idToStock = id
        this.typeStock = type
        this.stockTotal = alert
      },
      editStock(){
        axios.put(endPoint.endpointTarget+'/inventario/editStockAlarm/'+this.idToStock, {
          stockTotal:this.stockTotal
        })
        .then(res => {
          if (res.data.status == 'ok') {
            this.modals = {
                modal2: true,
                message: "Alarma actualizada",
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
                    modal6: false,
                    message: "",
                    icon: '',
                    type:''
                }
                this.getProducts();
            }, 1500);
          }else{
            this.$swal({
              type: 'error',
              title: 'Hubo un problema',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
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
        }
    }
  }
</script>
<style lang="scss">
  .card-header{
    font-size: 2.5vw;
  }
  .cursor-pointer{
    cursor: pointer;
  }
  .inventory .nav-item .active{
    background-color:#172b4d !important;
    color: white !important;
  }
  .inventory .nav-link {
    color: #172b4d !important;
  }
  .inventory .card-header{
    display:none;
  }
  .nav-item{
    padding-left: 1rem;
  }
  .inventoryTabs .nav-item:last-child{
    padding-right: 1rem !important;
  }
</style>