<template>
    <a-spin size="large" :spinning="spinning">
        <div class="row spin-content">
            <div class="col-6 mb-3">
                <a-select
                    show-search
                    placeholder="Clientes"
                    option-filter-prop="children"
                    style="width: 100%"
                    :filter-option="filterOption"
                    :allowClear="true"
                    :value="clientSelect"
                    @change="chooseClient">
                    <a-select-option v-for="client of clients" :key="client._id" :value="client.identidad">
                        {{client.nombre}} / {{client.identidad}}
                    </a-select-option>
                </a-select>
            </div>
            <div class="col-6 mb-3">
                <!-- <div v-on:click="chooseLender"> 
                    <vue-single-select
                    v-model="lenderSelect"
                    :options="lenderNames"
                    placeholder="Prestadoras"
                    ></vue-single-select> 
                </div> -->
                <a-select
                    show-search
                    placeholder="Prestadoras"
                    option-filter-prop="children"
                    style="width: 100%"
                    :filter-option="filterOption"
                    :allowClear="true"
                    :value="lenderSelect"
                    ref="lenderRef"
                    @change="chooseLender">
                    <a-select-option v-for="lender of registerService.lenders" :key="lender._id" :value="lender._id+'/'+lender.nombre">
                        {{lender.nombre}}
                    </a-select-option>
                </a-select>
            </div>
            <div class="col-12">
                <table class="table" v-bind:style="{ 'background-color': '#172b4d', 'border-radius' : '10px', 'border':'none !important'}" >
                    <thead>
                        <tr>
                            <th style="border-radius:15px !important;border:none">
                                <input class="w-75 inputFilter" id="myInputProccess" v-on:keyup="myFunction()" type="text" placeholder="Filtre servicios">
                            </th>
                            <th style="color:white;border:none" class="text-center pb-2">
                                Precio 
                            </th>
                        </tr>
                    </thead>
                </table>
                <vue-custom-scrollbar ref="scroll" class="ps-container ListaProcesar p-2 ps ps--active-y">
                    <table class="table tableBg" id="myTableProcess">
                        
                            <tr v-for="(servicio, index) in services" class="soy" v-bind:key="servicio._id">
                                <td style="border:none;padding:5px;" v-if="servicio.active" class="font-weight-bold" >
                                    <base-button size="sm" :disabled="validator"  type="default" class="w-75" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio, servicio.comision, servicio.descuento, servicio.productos), countServices[index].count++">
                                        <span class="float-left">{{servicio.nombre}}</span>
                                        <badge class="badgeClass badgeServices float-right" style="font-size: .9em;color:#4b4b4b" type="secondary" :id="servicio._id">{{countServices[index].count}}</badge>
                                    </base-button>
                                    <base-button size="sm" type="default" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio, servicio.descuento)">
                                        <font-awesome-icon icon="times"/>
                                    </base-button>
                                </td>
                                <td style="border:none" v-if="servicio.active" class="font-weight-bold text-center">
                                    {{formatPrice(servicio.precio)}}
                                </td>
                            </tr>
                            
                        
                    </table>
                </vue-custom-scrollbar>
                <div class="row pt-3 shadowTop">
                    <div class="col-sm-5">
                        <div class="input-group">
                            <a-tooltip placement="top">
                                <template slot="title">
                                <span>Sub Total</span>
                                </template>
                                <base-input alternative
                                    type="text"
                                    class="align"
                                    placeholder=""
                                    addon-left-icon="ni ni-money-coins"
                                    v-model="price"
                                    disabled
                                ></base-input>
                            </a-tooltip>
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <a-tooltip v-if="validRoute('procesar', 'descuento')" placement="topLeft">
                                <template slot="title">
                                    <span>{{discountSelect}}</span>
                                </template>
                                <base-input  alternative
                                    type="text"
                                    class="align"
                                    placeholder="0%"
                                    addon-left-icon="ni ni-tag"
                                    v-on:change="descuentoFunc(true)"
                                    v-model="discount"
                                ></base-input>
                            </a-tooltip>
                            
                            <base-input v-else disabled 
                                alternative
                                title="Descuento deshabilitado"
                                type="text"
                                class="align"
                                placeholder="Descuento"
                                addon-left-icon="ni ni-tag"
                                v-model="discount"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Adicional por diseño</span>
                            </template>
                            <currency-input
                            
                            v-model="design"
                            placeholder="Diseño"
                            locale="de"
                            class="form-control"
                            v-on:keyup="addDesign()"/>
                        </a-tooltip>
                        
                    </div>
                </div>
                <div class="text-muted text-center mb-1" style="margin-top:-15px;">
                    Medios de pago
                </div>
                <div class="row">
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Efectivo</span>
                            </template>
                            <div class="input-group mb-2">
                                <div  v-on:click="hundredPorcent('efectivo')" v-on:mouseenter="hundredMouseOver('efectivo')" v-on:mouseleave="hundredMouseNonOver('efectivo')" class="input-group-prepend text-center w-25 hundred">
                                    <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <b class="efectivo" style="font-size:0.6em;display:none">100%</b>
                                    <font-awesome-icon  class="efectivo" style="font-size:1em; color:#6BB2E5" icon="money-bill-wave"/>	
                                    </span>
                                    
                                </div>
                                <currency-input
                                    v-model="payCash"
                                    locale="de"
                                    placeholder="Efectivo"
                                    class="form-control"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Transferencia</span>
                            </template>
                            <div class="input-group mb-2">
                                <div  v-on:click="hundredPorcent('trasnferencia')" v-on:mouseenter="hundredMouseOver('trasnferencia')" v-on:mouseleave="hundredMouseNonOver('trasnferencia')" class="input-group-prepend text-center w-25 hundred">
                                    <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <b class="trasnferencia" style="font-size:0.6em;display:none">100%</b>
                                    <font-awesome-icon  class="trasnferencia" style="font-size:1em; color:#6BB2E5" icon="money-check-alt"/>	
                                    </span>
                                </div>
                                <currency-input
                                    v-model="payTransfer"
                                    locale="de"
                                    placeholder="Transferencia"
                                    class="form-control"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Otros</span>
                            </template>
                            <div  class="input-group mb-2">
                                <div v-on:click="hundredPorcent('others')" v-on:mouseenter="hundredMouseOver('others')" v-on:mouseleave="hundredMouseNonOver('others')" class="input-group-prepend text-center w-25 hundred">
                                    <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <b class="others" style="font-size:0.6em;display:none">100%</b>
                                    <font-awesome-icon  class="others" style="font-size:1em; color:#6BB2E5" icon="hand-holding-usd"/>	
                                    </span>
                                </div>
                                <currency-input
                                    v-model="payOthers"
                                    locale="de"
                                    placeholder="Otros"
                                    class="form-control"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Código de pedido</span>
                            </template>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend w-25 text-center hundred">
                                    <span style="background-color: #e9ecef;" class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <font-awesome-icon  class="others" style="font-size:1em; color:#6BB2E5" icon="shopping-cart"/>	
                                    </span>
                                </div>
                                <currency-input
                                    v-model="payOrder"
                                    locale="de"
                                    readonly
                                    placeholder="Código pedido"
                                    class="form-control pl-1"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Débito</span>
                            </template>
                            <div class="input-group mb-2">
                                <div v-on:click="hundredPorcent('debit')" v-on:mouseenter="hundredMouseOver('debit')" v-on:mouseleave="hundredMouseNonOver('debit')" class="input-group-prepend text-center w-25 hundred">
                                    <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <b class="debit" style="font-size:0.6em;display:none">100%</b>
                                        <img style="width:98%;padding-left:1px" class="debit"  src="../assets/trans1.png" alt="">	
                                    </span>
                                </div>
                                <currency-input
                                    v-model="payDebit"
                                    locale="de"
                                    placeholder="Débito"
                                    class="form-control"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    <div class="col-6">
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Crédito</span>
                            </template>
                            <div class="input-group mb-2">
                                <div v-on:click="hundredPorcent('credit')" v-on:mouseenter="hundredMouseOver('credit')" v-on:mouseleave="hundredMouseNonOver('credit')" class="input-group-prepend text-center w-25 hundred">
                                    <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                        <b class="credit" style="font-size:0.6em;display:none">100%</b>
                                        <img class="credit" style="width:98%;padding-left:1px"  src="../assets/trans1.png" alt="">	
                                    </span>
                                </div>
                                <currency-input
                                    v-model="payCredit"
                                    locale="de"
                                    placeholder="Crédito"
                                    class="form-control"
                                />
                            </div>
                        </a-tooltip>
                        
                    </div>
                    
                    
                </div>
                <div class="row">
                    <div class="col-6">
                        <h1 class="pt-2">Total: {{total}}</h1>
                    </div>
                    <div class="col-6">
                        <base-button size="lg" :disabled="validatorBtn" class="float-right w-75" type="success" v-on:click="processSale">
                            Procesar
                        </base-button>
                    </div>
                </div>
            </div>
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
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5"
                    class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h1>Datos del cliente</h1> 
                    </div>
                </template>
                <template>
                    <form role="form">
                            <base-input alternative
                                        class="mb-3"
                                        placeholder="Nombre"
                                        v-model="registerClient.name"
                                        v-on:keyup="validRegister(2)"
                                        addon-left-icon="ni ni-single-02">
                            </base-input>
                            <base-input alternative
                                        type="text"
                                        placeholder="Correo"
                                        v-model="registerClient.id"
                                        v-on:keyup="validRegister(2)"
                                        addon-left-icon="fa fa-address-card">
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
                                        addon-left-icon="fa fa-address-card">
                                    </base-input>
                                </div>
                            </div>
                            
                            <base-input alternative
                                        type="text"
                                        placeholder="Contacto adicional"
                                        v-model="registerClient.contactTwo"
                                        addon-left-icon="fa fa-address-card">
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
                            <base-checkbox v-if="!ifEdit" v-model="registerClient.discount" class="mb-3">
                                Descuento de nuevo cliente
                            </base-checkbox>
                            <vue-single-select 
                                v-if="!ifEdit"
                                v-model="registerClient.recommender"
                                :options="clientNames"
                                placeholder="Recomendador"
                            ></vue-single-select>
                            <div class="text-center">
                                <base-button type="default" v-if="!registerClient.valid" disabled class="my-4">Registrar</base-button>
                                <base-button type="default" v-on:click="registerClients()" v-if="registerClient.valid && !ifEdit" class="my-4">Registrar</base-button>
                                <base-button type="default" v-on:click="editClient()" v-if="registerClient.valid && ifEdit" class="my-4">Editar</base-button>
                            </div> 
                        </form>
                </template>
            </card>
            </modal>
            <modal :show.sync="modals.modal3"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5"
                    class="border-0">
                <template>
                    <div style="margin-top:-15%" class="text-muted text-center mb-3">
                        <h1>Nuevo servicio</h1> 
                    </div>
                </template>
                <template>
                        <form role="form">
                            <base-input alternative
                                v-on:change="validRegister(1)"
                                class="mb-3"
                                placeholder="Nombre"
                                addon-left-icon="ni ni-single-copy-04"
                                v-model="registerService.serviceRegister">
                            </base-input>
                            <base-input alternative
                                v-on:change="validRegister(1)"
                                type="number"
                                max-count="100"
                                placeholder="comision (%)"
                                addon-left-icon="ni ni-money-coins"
                                v-model="registerService.comissionRegister">
                            </base-input>
                            <currency-input
                                v-on:change="validRegister(1)"
                                v-model="registerService.priceRegister"
                                locale="de"
                                placeholder="Costo"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                            />	
                            <select class="form-control mb-3" v-on:change="validRegister(1)" v-model="registerService.timeRegister">
                                <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                <option style="color:black;" value="15">15 Minutos</option>
                                <option style="color:black;" value="30">30 Minutos</option>
                                <option style="color:black;" value="45">45 Minutos</option>
                                <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                                <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                                <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                                <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                                <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                                <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                                <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                            </select>
                            <div  class="row mx-auto mt-2">
                                <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                                <base-radio name="false" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>Si</b> </base-radio>
                                <base-radio name="true" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>No</b> </base-radio> 
                            </div>
                            <vue-custom-scrollbar class="maxHeight">
                                <vue-bootstrap4-table :rows="registerService.lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                                </vue-bootstrap4-table>
                            </vue-custom-scrollbar >
                            <div class="text-center">
                                <base-button v-if="!registerService.valid" type="default" class="my-4" v-on:click="registerServiceProcess()" disabled>Registrar</base-button>
                                <base-button v-else type="default" class="my-4" v-on:click="registerServiceProcess()" >Registrar</base-button>
                            </div>
                        </form>
                </template>
            </card>
            </modal>
            <modal :show.sync="modals.modal4"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">
                    <template>
                        <div class="text-muted text-center mb-3">
                            <h3>Registrar monto de apertura</h3>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input 
                                alternative
                                class="mb-3"
                                placeholder="Nombre el cajero"
                                v-on:keyup="validRegister(3)"
                                v-model="cashFunds.cashName"
                                addon-left-icon="ni ni-circle-08">
                            </base-input>
                            <currency-input
                                v-model="cashFunds.cashAmount"
                                v-on:keyup="validRegister(3)"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                            />	
                            <base-button v-if="!cashFunds.valid" type="default" disabled>
                                Ingresar fondo
                            </base-button>
                            <base-button v-else type="default" v-on:click="registerFund">
                                Ingresar fondo
                            </base-button> 
                        </form>
                </template>
                </card>
            </modal>
            <modal :show.sync="modals.modal5"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 "
                    class="border-0">
                    <template>
                        <div style="margin-top:-10%" class="text-muted text-center mb-3">
                            <h3>Validación de código</h3>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input 
                                alternative
                                class="mb-3"
                                placeholder="Código"
                                v-model="codeArticulo"
                                addon-left-icon="ni ni-key-25">
                            </base-input>
                            
                            
                            <base-button type="default" v-on:click="validCode()">
                                Verificar
                            </base-button> 
                        </form>
                </template>
                </card>
            </modal>
            <modal :show.sync="modals.modal6"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">
                    
                    <template>
                        <div class="col-sm-12">
                                    <base-button class="col-12  p-2 mt-1" type="secondary">
                                        <span class="text-center"> Comprador <br> </span>
                                        <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{compradorArticulo}}</badge>
                                    </base-button>
                                    <base-button class="col-12  p-2 mt-1" type="secondary">
                                        <span class="text-center"> Medio de pago <br> </span>
                                        <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{medioPagoArticulo}}</badge>
                                    </base-button>
                                    <base-button class="col-12  p-2 mt-1" type="secondary">
                                        <span class="text-center"> Articulo <br> </span>
                                        <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{articulo}}</badge>
                                    </base-button>
                                    <base-button class="col-12  p-2 mt-1" type="secondary">
                                        <span class="text-center"> Monto del pedido <br> </span>
                                        <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{totalArticulo}}</badge>
                                    </base-button>
                                    <base-button class="col-12  p-2 mt-1" type="secondary">
                                        <span class="text-center"> Estado <br> </span>
                                        <badge v-if="estadoArticulo == 'Nconfirmado'" style="font-size:0.8em !important" type="danger" class="text-default mt-2">Sin confirmar</badge>
                                        <badge v-else-if="estadoArticulo == 'confirmado'" style="font-size:0.8em !important" type="success" class="text-default mt-2">confirmado</badge>
                                        <badge v-else style="font-size:0.8em !important" type="default" class="text-default mt-2">Usado</badge>
                                    </base-button>
                                    
                                </div>
                                <center>
                                    <base-button v-if="estadoArticulo == 'confirmado'" type="success" class="mt-5" v-on:click="verifyCode()">
                                        Validar
                                    </base-button>
                                    <base-button v-else type="default" disabled class="mt-5">
                                        Validar
                                    </base-button> 
                                </center>
                                
                </template>
                </card>
            </modal>
            <div v-if="validRoute('procesar', 'nuevo_cliente')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal2 = true" class="p-2 menuVerVentas navSVenta" v-on:mouseenter="mouseOverVenta(newClient)" v-on:mouseleave="mouseLeaveVenta(newClient)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#172b4d;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#172b4d;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSVenta">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#f5365c;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#f5365c;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-if="validRoute('procesar', 'nuevo_servicio')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal3 = true" class="p-2 menuVerServi navSServi" v-on:mouseenter="mouseOverVenta(newService)" v-on:mouseleave="mouseLeaveVenta(newService)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newService.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSServi">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#f5365c;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newService.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="initialState()" class="p-2 menuVerRedo navSRedo" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
                    </div>
                    <div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
                        <b style="font-size:14px;">{{reloadSales.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-bind:style="{  'height': '42px', 'z-index' : '1000' }" v-on:click="modals.modal5 = true, codeArticulo = ''" class="p-2 menuVerRedo navSCode" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="pager" />
                    </div>
                    <div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
                        <b style="font-size:14px;">Validar código</b>	
                    </div>
                </div>
            </div>
        </div>
    </a-spin>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
import io from 'socket.io-client';
import EventBus from './EventBus'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
    components: {
        vueCustomScrollbar,
        VueBootstrap4Table,
        flatPicker
    },
    data(){
        return {
            socket: io(endPoint.endpointTarget),
            auth: [],
            validator:true,
            validatorBtn:true,
            spinning:false,
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
            configDate: {
                allowInput: true, 
                dateFormat: 'd-m-Y',
            },
            registerClient: {
                name: '',
                id: '',
                contactOne: '',
                contactTwo: '',
                birthday: '',
                discount: false,
                recommender: '',
                valid: false,
            },
            articulo:'',
            compradorArticulo:'',
            medioPagoArticulo:'',
            estadoArticulo:'',
            idArticulo:'',
            codeArticulo:'',
            totalArticulo:'',
            cashFunds: {
                cashName: '',
                cashAmount: 0,
                valid: false,
            },
            registerService: {
                serviceRegister: '',
                comissionRegister: '',
                priceRegister: 0,
                timeRegister: 'Seleccione el tiempo',
                addDiscount: false,
                lenderSelecteds: [],
                lenders: [],
                valid:false
            },
            columnsLender: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            }],
            configLender: {
                checkbox_rows: true,
                rows_selectable : true,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                show_refresh_button: false,
                show_reset_button: false,  
                selected_rows_info: false,
                preservePageOnDataChange : true,
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
            clientNames: [],
            clients: [],
            clientSelect: '',
            lenderNames: [],
            lenderSelect: '',
            services: [],
            inspector: false,
            countServices: [],
            price: 0,
            discount: '',
            design: 0,
            payCash: 0,
            payTransfer: 0,
            payOthers: 0,
            payDebit: 0,
            payCredit: 0,
            payOrder:0,
            haveCode:false,
            subTotal: 0,
            total: 0,
            discountSelect: "Descuento",
            totalSinFormato:0,           
            serviciosSelecionados:[],
            resto: 0,
            dates: {
                dateSale: new Date()
            },
            idProcess: '',
            docLender: '',
            newClient: {
                valid: false,
                text: 'Nuevo cliente'
            },
            newService: {
                valid: false,
                text: 'Nuevo servicio'
            },
            reloadSales: {
                valid: false,
                text: 'Reiniciar datos'
            },
            ifEdit: false, 
            inspectorDate: false,
            editClientId: '',
            ifrecomend: false
        }
    },
    created(){
        this.getClient()
        this.getLenders()
        this.getServices()
        this.getToken()
        setTimeout(() => {
            $('.anticon-close-circle').click()
        }, 1000);
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        changeDate(){
            this.inspectorDate = true
        },
        selected(value){
            this.registerService.lenderSelecteds.push(value.selected_item._id)
            this.validRegister(1)
        },
        unSelected(value){
            for (let i = 0; i < this.registerService.lenderSelecteds.length; i++) {
                if (this.registerService.lenderSelecteds[i] == value.unselected_item._id) {
                    this.registerService.lenderSelecteds.splice(i, 1)
                    break
                }
            }
            this.validRegister(1)
        },
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.registerService.lenderSelecteds.push(value.selected_items[index]._id)
            }
            this.validRegister(1)
        },
        unSelectedAll(value){
            this.registerService.lenderSelecteds = []
            this.validRegister(1)
        },
        validRegister(valid){
            if (valid == 1) {
                this.registerService.valid = this.registerService.lenderSelecteds.length > 0 && this.registerService.serviceRegister != '' && this.registerService.priceRegister > 0 && this.registerService.timeRegister != 'Seleccione el tiempo' && this.registerService.comissionRegister != '' ? true : false
            }else if (valid == 2) {
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
                }else{
                    this.registerClient.valid = false
                }
            }else{
                this.cashFunds.valid = this.cashFunds.cashName != '' && this.cashFunds.cashAmount > 0 ? true : false
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
        registerFund(){
			axios.post(endPoint.endpointTarget+'/ventas/registerFund', {
				userRegister: this.cashFunds.cashName,
				amount: this.cashFunds.cashAmount
			}).then(res => {
				if (res.data.status == 'ok') {
					this.modals = {
                        modal1: true,
                        message: "Cliente registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                    this.cashFunds.cashName = ''
                    this.cashFunds.cashAmount = ''
                    this.cashFunds.valid = false
				}
			})
        },
        editClient(){
            axios.put(endPoint.endpointTarget+'/clients/'+this.editClientId, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                if (res.data.status == 'Servicio actualizado') {
                    this.modals = {
                        modal1: true,
                        message: "el cliente editó con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.clientSelect = this.registerClient.name+ ' / '+this.registerClient.id
                        this.registerClient.name = ''
                        this.registerClient.id = ''
                        this.registerClient.contactOne = ''
                        this.registerClient.contactTwo = ''
                        this.ifEdit = false
                        this.newClient.text = "Nuevo cliente"
                        this.getClient()
                    }, 1500);
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        registerClients(){
            var date = this.registerClient.birthday
            if (this.registerClient.birthday.split('-')[1]) {
                var split = this.registerClient.birthday.split('-')
                date = split[1]+'-'+split[0]+'-'+split[2]
            }
            var ifCheck = this.registerClient.discount ? 0 : 1
            const phone = this.registerClient.contactOne.length > 0 ? '+56 '+this.registerClient.contactOne : ''
            axios.post(endPoint.endpointTarget+'/clients', {
                nombre:this.registerClient.name,
                identidad:this.registerClient.id,
                recomendador:this.registerClient.recommender,
                correoCliente:phone,
                birthday: date,
                instagramCliente:this.registerClient.contactTwo,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'Registrado') {
                    this.modals = {
                        modal1: true,
                        message: "Cliente registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                        this.getClient()
                    }, 1500);
                    this.registerClient = {
                        name: '',
                        id: '',
                        contactOne: '',
                        contactTwo: '',
                        discount: false,
                        recommender: '',
                        valid: false,
                    }
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        mouseOverVenta(objectType){
            setTimeout(() => {
               objectType.valid = true 
            }, 500);
             
		},
		mouseLeaveVenta(objectType){
            objectType.valid = false
		},
        registerServiceProcess(){
            var ifCheck = this.registerService.addDiscount ? false : true
            axios.post(endPoint.endpointTarget+'/servicios', {
                nombreServicio: this.registerService.serviceRegister,
                precioServicio: this.registerService.priceRegister,
                comisionServicio: this.registerService.comissionRegister,
                tiempoServicio: this.registerService.timeRegister,
                prestadores: this.registerService.lenderSelecteds,
                descuento: ifCheck

            })
            .then(res => {
                if(res.data.status == 'Servicio creado'){
                    this.modals = {
                        modal1: true,
                        message: "Servicio registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                    this.registerService = {
                        serviceRegister: '',
                        comissionRegister: '',
                        priceRegister: 0,
                        timeRegister: 'Seleccione el tiempo',
                        addDiscount: false,
                        lenderSelecteds: [],
                        lenders: [],
                        valid:false
                    }
                    this.getServices();
                    
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El servicio ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
		},
        getClient(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
                this.clients = res.data
                this.clientNames = []
                for (let index = 0; index < res.data.length; index++) {
                    
                    this.clientNames.push(res.data[index].nombre+ ' / ' +res.data[index].identidad)
                }
            })
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                this.registerService.lenders = res.data
                
            })
        },
        getServices(){
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
                this.services = res.data
                this.countServices = []
                for (let index = 0; index < this.services.length; index++) {
                    this.countServices.push({count: 0})
                }
            })
        },
        conteoServicio(_id, nombre, precio, comision, discount, items){
            console.log(discount)
            const descuento = parseFloat(this.discount) / 100
			const porcentaje = 1 - parseFloat(descuento)
            const precioTotal = parseFloat(this.subTotal) + parseFloat(precio)
            const totalWithoutFormat = parseFloat(this.totalSinFormato) + parseFloat(precio)
			this.price = this.formatPrice(precioTotal)
			this.subTotal = precioTotal
			
			
			if(this.discount == '' || discount == true){
                this.total = this.formatPrice(totalWithoutFormat+ this.design)
                this.totalSinFormato = totalWithoutFormat+ this.design
            }
            else{
                const precioConDescuento = parseFloat(precio) * parseFloat(porcentaje)
                const totalConDescuento = parseFloat(this.totalSinFormato) + parseFloat(precioConDescuento) 
                this.total =  this.formatPrice(totalConDescuento + this.design)
                this.totalSinFormato = totalConDescuento + this.design
			}
			const servicios = {'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': discount, productos:items}
			this.serviciosSelecionados.push(servicios)
			axios.put(endPoint.endpointTarget+'/ventas/updateServicesMonth/' + nombre)
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'experimentamos problemas :(',
					showConfirmButton: false,
					timer: 1500
				})
			})
			
        },
        borrarServicio(nombre, index, _id, precio, descuento){
            for (var i = 0; i < this.serviciosSelecionados.length; i++) {
				if (this.serviciosSelecionados[i].servicio == nombre ) {
					this.serviciosSelecionados.splice(i, 1)
					break
				}
            }
			if (this.countServices[index].count != 0) {
                this.countServices[index].count--
				const subTotal = parseFloat(this.subTotal) - parseFloat(precio) 
				this.price = this.formatPrice(subTotal)
                this.subTotal = subTotal
                if (descuento == true || this.discount == '') {
                    this.totalSinFormato = this.totalSinFormato - precio
                    this.total = this.formatPrice(this.totalSinFormato)
                    console.log("si entro aqui")
                }
                else{
                    console.log("no debo entrar aqui")
                    const descuento = parseFloat(this.discount) / 100
                    const porcentaje = 1 - parseFloat(descuento)
                    const precioConDescuento = precio * porcentaje
                    this.totalSinFormato = this.totalSinFormato - precioConDescuento
                    this.total = this.formatPrice(this.totalSinFormato)
                }
                
				axios.put(endPoint.endpointTarget+'/ventas/updateServicesMonthDiscount/' + nombre)
				.catch(err => {
					console.log(err)
				})
			}
        },
        addDesign(){
            if (this.design.length == 0) {
                this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
                this.total = "$" + this.formatPrice(this.totalSinFormato)
                this.resto = 0
            }
            else{
                this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
                this.totalSinFormato = parseFloat(this.totalSinFormato) + parseFloat(this.design)
                this.total = this.formatPrice(this.totalSinFormato)
                this.resto = this.design
            }
        },
        descuentoFunc(deletee){
            if (this.discount > 0) {
                this.totalSinFormato = this.design
                this.total = this.design
                for (let index = 0; index < this.serviciosSelecionados.length; index++) {
                    if (!this.serviciosSelecionados[index].descuento) {
                            const descuento = parseFloat(this.discount) / 100
                            const porcentaje = 1 - parseFloat(descuento)
                            const precioConDescuento = parseFloat(this.serviciosSelecionados[index].precio) * parseFloat(porcentaje)  
                            const totalConDescuento = parseFloat(this.totalSinFormato) + parseFloat(precioConDescuento)
                            this.total = this.formatPrice(totalConDescuento)
                            this.totalSinFormato = totalConDescuento 
                    }
                    else{ 
                        this.total = this.formatPrice(parseFloat(this.totalSinFormato) + parseFloat(this.serviciosSelecionados[index].precio))
                        this.totalSinFormato = parseFloat(this.totalSinFormato) + parseFloat(this.serviciosSelecionados[index].precio)
                    }
                }
            }else{

                this.total = this.formatPrice(this.subTotal + this.design)
                this.totalSinFormato = this.subTotal + this.design
            }
			
        },
        formatClass(value){
			if (value) {
				const split = value.split(' ')
				if (split[1]) {
					return split[0]+split[1]
				}else{
					return split[0]
				}
				
			}
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        hundredMouseOver(tipo){
			$("."+tipo).toggle()
		},
		hundredMouseNonOver(tipo){
			$("."+tipo).toggle()
		},
        myFunction() {
            console.log("hola")
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInputProccess");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTableProcess");
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				} else {
				tr[i].style.display = "none";
				}
			}
			}
        },
        hundredPorcent(tipo){
        
            if (tipo == "efectivo") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCash = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
            }
            if (tipo == "trasnferencia") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payTransfer = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
            }
            if (tipo == "others") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payOthers = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
            }
            if (tipo == "credit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCredit = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
            }
            if (tipo == "debit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payDebit = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
            }
			
        },
        chooseLender(value){
            this.lenderSelect = value
            if (this.lenderSelect) {
                this.docLender = this.lenderSelect.split('/')[0]
                this.nombreManicurista = this.lenderSelect.split('/')[1]
            }
            if (this.clientSelect != '' && this.lenderSelect != '') {
                this.validator = false
                this.validatorBtn = false
            }
            else{
                this.validator = true
                this.validatorBtn = true
            }
        },
        chooseLenderByDataToDate(lender){
            console.log(this.$refs.lenderRef.select)
            for (let i = 0; i < this.registerService.lenders.length; i++) {
                const element = this.registerService.lenders[i];
                if (lender == element.nombre) {
                    this.docLender = element._id
                    this.nombreManicurista = element.nombre
                    break
                }
            }
            if (this.clientSelect != '' && this.lenderSelect != '') {
                this.validator = false
                this.validatorBtn = false
            }
            else{
                this.validator = true
                this.validatorBtn = true
            }
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
        chooseClient(value){
            this.discount = ''
            this.discountSelect = 'Descuento'
            this.ifrecomend = false
            console.log(value)
            this.clientSelect = value
            if (this.clientSelect) {
                axios.get(endPoint.endpointTarget+'/clients/dataDiscount/' + this.clientSelect)
                .then(res => {
                    // console.log(res)
                    this.newClient.text = "Editar cliente"
                    this.ifEdit = true
                    this.editClientId = res.data[0]._id
                    this.registerClient.name = res.data[0].nombre
                    this.registerClient.id = res.data[0].identidad
                    this.registerClient.contactOne = res.data[0].correoCliente
                    this.registerClient.contactTwo = res.data[0].instagramCliente
                    this.validRegister(2)
                    this.clientRecomends = res.data[0].recomendaciones
                    this.clientAtentions = res.data[0].participacion
                    console.log(res.data[0].birthday)
                    if(res.data[0].birthday){
                        var birthday = new Date(res.data[0].birthday).getMonth()
                        var monthNow = new Date().getMonth()
                        if (birthday == monthNow) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por cumpleaños'
                        }else if (res.data[0].recomendaciones > 0) {
                            this.discount = 15
                            this.ifrecomend = true
                            this.discountSelect = 'Descuento por recomendacion'
                        }else if (res.data[0].participacion == 0) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por primera atención'
                        }
                    }else if (res.data[0].recomendaciones > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                        this.discountSelect = 'Descuento por recomendacion'
                    }else if (res.data[0].participacion == 0) {
                        this.discount = 10
                        this.discountSelect = 'Descuento por primera atención'
                    }
                    
                    console.log(this.ifrecomend)
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.newClient.text = "Nuevo cliente"
                this.ifEdit = false
                this.registerClient.name = ""
                this.registerClient.id = ""
                this.registerClient.contactOne = ""
                this.registerClient.contactTwo = ""
                this.validRegister(2)
            }
            if (this.clientSelect != '' && this.lenderSelect != '') {
                this.validator = false
                this.validatorBtn = false
            }
            else{
                this.validator = true
                this.validatorBtn = true
            }
        },
        getDataToDate(id){
            this.initialState()
            this.validator = false
			this.servicesProcess = []
			this.serviciosSelecionados = []
			this.idProcess = id
			axios.get(endPoint.endpointTarget+'/citas/getDataToDate/'+id)
			.then(res => {
				this.clientSelect = res.data.client
				this.lenderSelect = res.data.employe
				this.servicesProcess = res.data.services
				this.chooseLenderByDataToDate(this.lenderSelect)
				const split = res.data.client.split('/')
				const splitTwo = split[1].split(' ')
				axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
				.then(res => {
					if (res.data[0].recomendaciones > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                    }else if (res.data[0].participacion == 0) {
                        this.discount = 10
                    }
                    var subTotal = 0
                    var desc = 0
                    for (let index = 0; index < this.servicesProcess.length; index++) {
                        this.serviciosSelecionados.push({servicio: this.servicesProcess[index].servicio, comision: this.servicesProcess[index].comision, precio: this.servicesProcess[index].precio, descuento: this.servicesProcess[index].descuento})
                        let valSpan = ''
                        let sumaVal = 0
                        for (let indexTwo = 0; indexTwo < this.services.length; indexTwo++) {
                            if (this.servicesProcess[index].servicio == this.services[indexTwo].nombre) {
                                subTotal = subTotal + parseFloat(this.services[indexTwo].precio)
                                this.countServices[indexTwo].count++
                            }
                        }
                    }
                    this.price = this.formatPrice(subTotal)
                    if (this.discount == 10) {
                        desc = subTotal * 0.90
                    }
                    else if (this.discount == 15) {
                        desc = subTotal * 0.85
                    }
                    else{
                        desc = subTotal
                    }
                    this.total = this.formatPrice(desc)
                    this.totalSinFormato = desc
                    this.subTotal = subTotal
                
				})
            })
		},
        initialState(){
            this.getServices()
            $('#myInput').val('')
            this.myFunction()
            this.validator = true
            this.validatorBtn = true
			this.price = '0';
			this.serviciosSelecionados = [];
			this.discount = "";
			this.total = 0;
			this.totalSinFormato = 0;
			this.design = 0
			this.payCash = 0
			this.payOthers = 0
			this.payDebit = 0
            this.payCredit = 0
            this.payOrder = 0
            this.docLender = ''
			this.payTransfer = 0
			this.lenderSelect = null
			this.clientSelect = null
			this.resto  = 0
            this.subTotal = 0
            this.nombreManicurista = ''
            this.inspector = false
            this.ifEdit = false
            this.newClient.text = "Nuevo cliente"
            this.registerClient.name = ''
            this.registerClient.id = ''
            this.ifrecomend = false
            this.validRegister()
            this.haveCode = false
            $('.anticon-close-circle').click()
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        processSale() {
            
            this.spinning = true
			if (this.payCash == '') {
				this.payCash = 0
			}
			if (this.payOthers == '') {
				this.payOthers = 0
			}
			if (this.payTransfer == '') {
				this.payTransfer = 0
			}
			if (this.payDebit == '') {
				this.payDebit = 0
			}
			if (this.payCredit == '') {
				this.payCredit = 0
			}
			if (this.discount == '') {
				this.discount = 0
			}
			if (this.design == '') {
				this.design = 0
            }
            if (this.payOrder == '') {
				this.payOrder = 0
            }
            const totalFormadePago = parseFloat(this.payCash) + parseFloat(this.payOthers) + parseFloat(this.payTransfer) + parseFloat(this.payDebit) + parseFloat(this.payCredit) + parseFloat(this.payOrder)
            console.log(totalFormadePago)
            if (this.clientSelect && this.lenderSelect != '') {
				if (Math.round(this.totalSinFormato) == Math.round(totalFormadePago)) {
                    const itemList = []
                    for (let index = 0; index < this.serviciosSelecionados.length; index++) {
                        if (this.serviciosSelecionados[index].productos) {
                            for (let i = 0; i < this.serviciosSelecionados[index].productos.length; i++) {
                                itemList.push(this.serviciosSelecionados[index].productos[i])
                            }
                        }
                        
                    }
                    axios.post(endPoint.endpointTarget+'/inventario/procesarVenta',{
                        array:itemList
                    })
                    .then(res => {})
					axios.post(endPoint.endpointTarget+'/ventas/procesar', {
						cliente: this.clientSelect,
						manicurista: this.nombreManicurista,
						servicios: this.serviciosSelecionados,
						pagoEfectivo:this.payCash,
						pagoOtros:this.payOthers,
						pagoRedCDebito:this.payDebit,
						pagoRedCCredito:this.payCredit,
                        pagoTransf:this.payTransfer,
                        pagoOrder:this.payOrder,
                        descuento:this.discount,
                        processDate: this.inspectorDate,
						fecha:this.dates.dateSale,
						total: this.totalSinFormato,
						ifProcess: this.idProcess,
						diseno: this.design,
						totalSinDesign: this.subTotal,
                        documentoManicurista: this.docLender,
                        ifrecomend: this.ifrecomend
					})
					.then(res => {
						if (res.data.status == "Venta registrada") {

                            this.modals = {
                                modal1: true,
                                message: "Venta procesada",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            if (this.haveCode == true) {
                                axios.get(endPoint.endpointTarget+'/pedidos/useCode/'+this.idArticulo)
                                .then( res =>{})
                            }
                            
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3: false,
                                    modal4: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                                this.haveCode = false
                            }, 1500);
                            this.alertProducts()
							this.servicios =''
							this.initialState()
							EventBus.$emit('reloadDates', 'process')
                            EventBus.$emit('reloadSales', 'process')
                            this.spinning = false
						}else if(res.data.status == "no-cash"){
							this.modals = {
                                modal1: true,
                                message: "Primero debe registrar un fondo de caja",
                                icon: 'ni ni-fat-remove ni-5x',
                                type: 'danger'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3: false,
                                    modal4: true,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
                            this.spinning = false
						}
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'experimentamos problemas :(',
							showConfirmButton: false,
							timer: 1500
                        })
                        this.spinning = false
					})
				}else{
                    this.modals = {
                        modal1: true,
                        message: "Total no coincide, con los montos en medios de pago",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                        this.spinning = false
                    }, 1500);
					if (this.pagoEfectivo == 0) {
						this.pagoEfectivo = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
					if (this.pagoOtros == 0) {
						this.pagoOtros = ''
					}
					if (this.pagoRedC == 0) {
						this.pagoRedC = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
				}	
			}else{
                this.modals = {
                    modal1: true,
                    message: "Complete los datos necesarios",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: false,
                        modal4: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                    this.spinning = false
                }, 1500);
			}
        },
        alertProducts(){
            axios.get(endPoint.endpointTarget+'/inventario/alertProducts')
            .then(res => {
                if (res.data.status) {
                    var Detail = ''
                    if (res.data.productsToAlert.length == 1) {
                        Detail = 'Hace falta reintegrar el producto: '
                    }else{
                        Detail = 'Hace falta reintegrar los productos: '
                    }
                    for (let index = 0; index < res.data.productsToAlert.length; index++) {
                        const element = res.data.productsToAlert[index];
                        if (index == 0) {
                            Detail = Detail + element.nameProduct
                        }else{
                            Detail = Detail + ', ' + element.nameProduct
                        } 
                    } 
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                        userImage:localStorage.getItem('imageUser'),
                        detail: Detail,
                        link: 'Inventario'
                    })
                    .then(res => {
                        this.socket.emit('sendNotification', res.data)
                    })
                }
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
        validCode(){
            axios.get(endPoint.endpointTarget+'/pedidos/validCode/'+this.codeArticulo)
            .then( res =>{
                if (res.data) {
                    this.articulo = res.data.articulo
                    this.estadoArticulo = res.data.estado
                    this.idArticulo = res.data._id
                    this.compradorArticulo = res.data.cliente
                    this.medioPagoArticulo = res.data.tipoPago
                    this.totalArticulo = res.data.total
                    this.modals.modal6 = true
                }
                else{
                    this.$swal({
                        type: 'error',
                        title: 'Código no existe',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        verifyCode(){
            this.$swal({
					type: 'warning',
					title: '¿Seguro que desea verificar el código?',
					showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#2dce89',
                    cancelButtonColor: '#f5365c',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
				}).then((result) => {
                    if (result.value) {
                            var remp = this.totalArticulo.replace('.', "")
                            var remp1 = remp.replace(',00', "")
                            var remp2 = remp1.replace('$ ', "")
                            this.payOrder = remp2
                            this.haveCode = true
                            this.modals.modal5 = false
                            this.modals.modal6 = false
                            
                    }
                })
        }
    },
    mounted (){
        EventBus.$on('reloadServices', status => {
            this.getServices()
        })
        EventBus.$on('reloadLenders', status => {
            this.getLenders()
        })
        EventBus.$on('reloadClients', status => {
            this.getClient()
        })
        EventBus.$on('processDate', status => {
            this.initialState()
            this.getDataToDate(status)
        })
        
    }
}
</script>
<style >
    .inputFilter{
        padding: 5px;
        border:1px solid #cad1d7;
        border-radius:0.375rem;
        font-weight: 400;
        line-height: 1.5;
        color: #8898aa;
        font-size: 0.675rem;
    }
    .table thead tr th{
        padding-bottom: 5px;
        padding-top: 5px;
        padding-left: 15px !important;
    }
    .table thead tr th .form-group{
        margin-bottom: 0;
    }
    .ListaProcesar{
        overflow:hidden;
		overflow-x: hidden;
		overflow-y:hidden;
		max-height: 220px;
		height:170px;
    }
    .align .form-control{
        text-align:center;
    }
    .shadowTop{
		-webkit-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
    }
    .hundred{
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    .hundred:hover{
        background-color: rgba(31, 86, 115, 0.342);
        color: white !important;
        border-radius: 5px;
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
    .menuVerVentas{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSVenta{
	cursor: pointer;
	width:7%;
	top:3.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerServi{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSServi{
	cursor: pointer;
	width:7%;
	top:9.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerRedo{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSRedo{
	cursor: pointer;
	width:7%;
	top:15.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.navSCode{
	cursor: pointer;
	width:7%;
	top:22.6%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerVentas:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerServi:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerRedo:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
 

</style>
