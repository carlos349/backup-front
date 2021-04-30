<template>
    <div>
        <modal :show.sync="modals.modal1"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <base-header v-if="validRoute('metricas', 'filtrar')" type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                  <stats-card title="Total local"
                                type="gradient-orange"
                                :sub-title="totalSales"
                                icon="ni ni-shop"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span v-if="totalSalesPrevValid == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeTotalSales)}}%</span>
                        <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeTotalSales)}}%</span><br>
                        <span class="text-nowrap">Mes pasado <small class="text-muted">  {{totalSalesPrev}}</small></span>
                    </template>
                  </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total local"
                                type="gradient-orange"
                                :sub-title="'$ '+totalLocal"
                                icon="ni ni-shop"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span v-if="porcentajeLocal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeLocal[0])}}%</span>
                        <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeLocal[0])}}%</span><br>
                        <span class="text-nowrap">Mes pasado <small class="text-muted"> $ {{localAnterior}}</small></span>
                    </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total comisiones"
                                type="gradient-green"
                                :sub-title="'$ '+comision"
                                icon="ni ni-money-coins"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span v-if="porcentajeGanancia[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeGanancia[0])}}%</span>
                        <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeGanancia[0])}}%</span><br>
                        <span class="text-nowrap">Mes pasado</span> <small class="text-muted"> $ {{comisionAnterior}}</small>
                    </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total"
                                type="gradient-info"
                                :sub-title="'$ '+gananciaTotal"
                                icon="ni ni-chart-bar-32"
                                class="mb-1 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="porcentajeTotal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeTotal[0])}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeTotal[0])}}%</span><br>
                            <span class="text-nowrap">Mes pasado</span> <small class="text-muted"> $ {{totalAnterior}}</small>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>
        <base-header v-else type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                  <stats-card title="Servicios del mes"
                    type="gradient-orange"
                    :sub-title="servicesLender"
                    icon="ni ni-single-02"
                    class="mb-1 mb-xl-0"
                  >
                  </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Avances del mes"
                      type="gradient-orange"
                      :sub-title="'$ '+formatPrice(lenderAvancements)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Bonos del mes"
                      type="gradient-green"
                      :sub-title="'$ '+formatPrice(lenderBonus)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total generado"
                      type="gradient-info"
                      :sub-title="'$ '+formatPrice(lenderComission)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>
        <!--Charts-->
        <template v-if="validRoute('metricas', 'filtrar')"> 
          <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12" >
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center pb-3">
                          <template v-if="validRoute('metricas', 'filtrar')">
                            <div class="col-md-3">    
                              <h5>Filtre por fecha</h5>                      
                              <base-input
                              class="mb-1 mt-2" 
                              addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="configDatePicker"
                                              class="form-control datepicker"
                                              v-model="dates.range">
                                  </flat-picker>
                              </base-input>
                              
                            </div>
                            <div class="col-md-3 mt-3">
                              <base-dropdown class="w-100">
                                <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
                                    {{textCategories}}
                                </base-button>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Producción por Día', 'dailyProduction')">
                                        Producción por Día
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Servicios por Día', 'dailyServices')">
                                        Servicios por Día
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Produccíon por prestador', 'quantityProductionPerLender')">
                                        Produccíon por prestador
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Gastos, ganancias, ventas por Día', 'dailyExpenseGainTotal')">
                                        Gastos, ganancias, ventas por Día
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Comisión por prestador', 'quantityComissionPerLender')">
                                        Comisión por prestador
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Servicios por manicurista', 'quantityServicesPerLender')">
                                        Servicios por manicurista
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Diseños por prestador', 'dailyDesign')">
                                        Diseños por prestador
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Detalle de prestador', 'no-detailPerLender')">
                                        Detalle de prestador
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Detalle por servicio', 'no-detailPerService')">
                                        Detalle por servicio
                                      </a>
                                  </li>
                              </base-dropdown>
                            </div>
                            <div v-if="inspectorLender" class="col-md-3 mt-3">
                              <base-dropdown class="w-100">
                                  <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
                                          {{employeSelect}}
                                  </base-button>
                                  <li v-for="data in employes" :key="data.nombre"  v-on:click="selectEmploye(data.nombre)">
                                      <a class="dropdown-item" v-on:click="validate('Detalle de prestador', 'detailPerLender')">
                                        {{data.nombre}}
                                      </a>
                                  </li>
                              </base-dropdown>
                            </div>
                            <div v-if="inspectorService" class="col-md-3 mt-3">
                              <base-dropdown class="w-100">
                                  <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
                                          {{serviceSelect}}
                                  </base-button>
                                  <li v-for="data in Services" :key="data.nombre"  v-on:click="selectService(data.nombre)">
                                      <a class="dropdown-item" v-on:click="validate('Detalle por servicio', 'detailPerService')">
                                        {{data.nombre}}
                                      </a>
                                  </li>
                              </base-dropdown>
                            </div>
                            <div class="col-md-2">
                              <base-button v-if="inspector" class="float-right mt-3" v-on:click="runGraph" type="default">Graficar</base-button>
                              <base-button v-else disabled class="float-right mt-3" v-on:click="runGraph" type="default">Graficar</base-button>
                            </div>
                          </template>
                        </div>
                        <div class="row" v-if="progress">
                          <div v-if="tables.firstTable" class="col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default"  size="sm" class="buttonExcel" icon="ni ni-book-bookmark" v-on:click="exportXLSX(firstDataTable, 'dates')">
                            </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight" v-if="firstDataTable.length > 0">
                              <base-table thead-classes="thead-light" :data="firstDataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Tipo</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Tipo}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Monto)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                            <h1 class="text-center" v-else>No hay ventas de este mes</h1>
                          </div>
                          <div v-if="tables.secondTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar Excel</span>
                              </template>
                              <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.fecha}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.total)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.thirdTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar Excel</span>
                              </template>
                              <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Cantidad</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Cantidad}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.quarterTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar Excel</span>
                              </template>
                              <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Prestador/a</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Prestadora}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Monto)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.fifthTable" class="col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar Excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Tipo</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Tipo}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Monto)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.sixthTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Prestador/a</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Prestadora}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Monto)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.seventhTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Prestador/a</th>
                                  <th>Cantidad</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Prestadora}}
                                  </th>
                                  <th scope="row">
                                    {{row.Monto}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.eighthTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Producción</th>
                                  <th>Comisión</th>
                                  <th>Servicios</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.totalProduction}}
                                  </th>
                                  <th scope="row">
                                    {{row.totalComision}}
                                  </th>
                                  <th scope="row">
                                    {{row.totalServices}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.ninethTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Prestador</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                    {{row.Prestadora}}
                                  </th>
                                  <th scope="row">
                                   $ {{formatPrice(row.Monto)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tables.tenthTable" class=" col-md-4">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcel" v-on:click="exportXLSX(dataTable, 'dates')">
                              </base-button>
                            </a-tooltip>
                            <vue-custom-scrollbar class="maxHeight">
                              <base-table thead-classes="thead-light" :data="dataTable">
                                <template slot="columns">
                                  <th>Fecha</th>
                                  <th>Monto</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Fecha}}
                                  </th>
                                  <th scope="row">
                                   $ {{formatPrice(row.total)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div class="col-md-8">
                            <apexchart ref="chartApis" :height="350" v-if="loaded" :options="chartOptions" :series="series"></apexchart>
                            <!-- <base-dropdown class="w-100">
                                <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
                                    {{TypeChartOptions}}
                                </base-button>.
                                  <li>
                                      <a class="dropdown-item" v-on:click="typeChart('Columnas','bar')">
                                        Columnas
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="typeChart('Radar','radar')">
                                        Radar
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="typeChart('Torta','pie')">
                                        Torta
                                      </a>
                                  </li>
                              </base-dropdown> -->
                          </div>
                        </div>
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
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--Charts-->
            <div class="row mt-5">
              <h1>Gráficas específicas</h1>
                <div class="col-12" >
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                          <template v-if="validRoute('metricas', 'filtrar')">
                            <div class="col-md-3">    
                              <h5>Filtre por fecha</h5>                       
                              <base-input
                              class="mb-1 mt-2" 
                              addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="configDatePicker"
                                              class="form-control datepicker"
                                              v-model="dates.rangeDaily">
                                  </flat-picker>
                              </base-input>
                              
                            </div>
                            <div class="col-md-4 mt-3">
                              <base-dropdown class="w-100">
                                <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
                                    {{textCategoriesDaily}}
                                </base-button>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validateDaily('Totales diarios', 'dailyQuantityPerDay')">
                                        Totales diarios
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validateDaily('Promedios diarios', 'dailyAveragePerDay')">
                                        Promedios diarios
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validateDaily('Top 10 Clientes con más atenciones', 'getTopTenBestClients')">
                                        Top 10 Clientes atenciones
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validateDaily('Top 10 Clientes con más recomendaciones', 'getTopTenBestClientsRecommendations')">
                                        Top 10 Clientes recomendaciones
                                      </a>
                                  </li>
                              </base-dropdown>
                            </div>
                            <div class="col-md-3 mt-3"></div>
                            <div class="col-md-2">
                              <base-button v-if="inspectorDaily" class="float-right mt-3" v-on:click="runGraphDaily" type="default">Graficar</base-button>
                              <base-button v-else disabled class="float-right mt-3" v-on:click="runGraphDaily" type="default">Graficar</base-button>
                            </div>
                          </template>
                        </div>
                        <div class="row">
                          <div v-if="tablesDaily.firstTable" class=" col-md-5">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(firstDataTableDaily, 'daily')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar v-if="firstDataTableDaily.length > 0" class="maxHeightEspecific">
                              <base-table thead-classes="thead-light" :data="firstDataTableDaily">
                                <template slot="columns">
                                  <th>Día</th>
                                  <th>Servicios</th>
                                  <th>Producción</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Dia}}
                                  </th>
                                  <th scope="row">
                                    {{row.Servicios}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Produccion)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                            <h1 class="text-center" v-else>No hay ventas de este mes</h1>
                          </div>
                          <div v-if="tablesDaily.secondTable" class=" col-md-5">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(dataTableDaily, 'daily')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeightEspecific">
                              <base-table thead-classes="thead-light" :data="dataTableDaily">
                                <template slot="columns">
                                  <th>Día</th>
                                  <th>Servicios</th>
                                  <th>Producción</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Dia}}
                                  </th>
                                  <th scope="row">
                                    {{row.Servicios}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Produccion)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tablesDaily.thirdTable" class=" col-md-5">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(dataTableDaily, 'daily')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeightEspecific">
                              <base-table thead-classes="thead-light" :data="dataTableDaily">
                                <template slot="columns">
                                  <th>Día</th>
                                  <th>Servicios</th>
                                  <th>Producción</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Dia}}
                                  </th>
                                  <th scope="row">
                                    {{row.Servicios}}
                                  </th>
                                  <th scope="row">
                                    $ {{formatPrice(row.Produccion)}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tablesDaily.fourthTable" class=" col-md-5">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(dataTableDaily, 'daily')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeightEspecific">
                              <base-table thead-classes="thead-light" :data="dataTableDaily">
                                <template slot="columns">
                                  <th>Cliente</th>
                                  <th>Contacto</th>
                                  <th>Atenciones</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Cliente}}
                                  </th>
                                  <th scope="row">
                                    {{row.contacto}}
                                  </th>
                                  <th scope="row">
                                    {{row.atencion}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div v-if="tablesDaily.fivethTable" class=" col-md-5">
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span>Generar excel</span>
                              </template>
                              <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(dataTableDaily, 'daily')">
                              </base-button>
                            </a-tooltip>
                            
                            <vue-custom-scrollbar class="maxHeightEspecific">
                              <base-table thead-classes="thead-light" :data="dataTableDaily">
                                <template slot="columns">
                                  <th>Cliente</th>
                                  <th>Contacto</th>
                                  <th>Recomendaciones</th>
                                </template>
                                <template slot-scope="{row}">
                                  <th scope="row">
                                    {{row.Cliente}}
                                  </th>
                                  <th scope="row">
                                    {{row.contacto}}
                                  </th>
                                  <th scope="row">
                                    {{row.recomendaciones}}
                                  </th>
                                </template>
                              </base-table>
                            </vue-custom-scrollbar >
                          </div>
                          <div class="col-md-7">
                            <apexchart ref="chartApisDaily" :height="400" v-if="loadedDaily" :options="chartDaily" :series="seriesDaily"></apexchart>
                          </div>
                        </div>
                        <!-- <center v-else>
                            <loading-progress
                                :progress="progressDaily"
                                :indeterminate="indeterminate"
                                class="text-center"
                                :hide-background="hideBackground"
                                shape="circle"
                                size="100"
                                fill-duration="2"
                            />
                        </center> -->
                    </card>
                </div>
            </div>
            <!-- End charts-->
        </div>
        </template>
        <template v-else>
          <div class="container-fluid mt-4">
            <h1>Datos del mes</h1>
            <div class="row">
                <div class="col-12 " >
                    <card header-classes="bg-transparent">
                      <div slot="header" class="row align-items-center">
                        <template>
                          <div class="col-md-3">    
                            <h3>Filtre por fecha</h3>                       
                          </div>
                        </template>
                      </div>
                      <div class="row" v-if="progress">
                        <div v-if="tablesLender" class=" col-md-5">
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span>Generar excel</span>
                            </template>
                           <base-button type="default" size="sm"  icon="ni ni-book-bookmark" class="buttonExcelDaily" v-on:click="exportXLSX(firstDataTableDaily, 'daily')">
                            </base-button>
                          </a-tooltip>
                          
                          <vue-custom-scrollbar v-if="dataTableLender.length > 0" class="maxHeightEspecific">
                            <base-table thead-classes="thead-light" :data="dataTableLender">
                              <template slot="columns">
                                <th>Fecha</th>
                                <th>Ganancia</th>
                                <th>Producción</th>
                                <th>Servicios</th>
                              </template>
                              <template slot-scope="{row}">
                                <th scope="row">
                                  {{row.Fecha}}
                                </th>
                                <th scope="row">
                                  $ {{formatPrice(row.totalComision)}}
                                </th>
                                <th scope="row">
                                  $ {{formatPrice(row.totalProduction)}}
                                </th>
                                  <th scope="row">
                                  {{row.totalServices}}
                                </th>
                              </template>
                            </base-table>
                          </vue-custom-scrollbar >
                          <h1 class="text-center" v-else>No hay ventas de este mes</h1>
                        </div>
                        <div class="col-md-7">
                          <apexchart ref="chartApisDaily" :height="400" v-if="loadedLender" :options="chartLender" :series="seriesLender"></apexchart>
                        </div>
                      </div>
                        <center v-else>
                            <loading-progress
                                :progress="progressDaily"
                                :indeterminate="true"
                                class="text-center"
                                :hide-background="true"
                                shape="circle"
                                size="100"
                                fill-duration="2"
                            />
                        </center>
                    </card>
                </div>
            </div>
          </div>
        </template> 
    </div>
</template>
<script>
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  import router from '../router'
  import jwtDecode from 'jwt-decode'
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  //components
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import {Spanish} from 'flatpickr/dist/l10n/es.js';
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import XLSX from 'xlsx'
  const dateNew = new Date()
  export default {
    components: {
      LineChart,
      BarChart,
      PageVisitsTable,
      SocialTrafficTable,
      flatPicker,
      vueCustomScrollbar
    },
    data() {
      return {
        progress: false,
        progressDaily:false,
        modals: {
            modal1: false,
            message: "",
            icon: '',
            type:''
        },
        auth: [],
        TypeChartOptions: 'Escoja el tipo de gráfica',
        loaded:false,
        series: [],
        chartOptions: {
          
        },
        configDatePicker: {
            allowInput: true, 
            dateFormat: 'm-d-Y',
            mode: 'range',
            locale: Spanish, // locale for this instance only          
        }, 
        dates: {
          range: (dateNew.getMonth() + 1)+'-'+dateNew.getDate()+'-'+dateNew.getFullYear(),
          rangeDaily: (dateNew.getMonth() + 1)+'-'+dateNew.getDate()+'-'+dateNew.getFullYear()
        },
        variable:10,
        ventas:[],
        totalLocal:0,
        localAnterior:0,
        gananciaNeta:0,
        gananciaTotal:0,
        localAnterior: 0,
        netaAnterior: 0,
        totalAnterior: 0,
        comision:0,
        comisionAnterior:0,
        porcentajeLocal:[],
        porcentajeGanancia:[],
        porcentajeTotal:[],
        // bigLineChart: {
        //   allData: [
        //     [0, 20, 10, 30, 15, 40, 20, 60, 60],
        //     [0, 20, 5, 25, 10, 30, 15, 40, 40]
        //   ],
        //   activeIndex: 0,
        //   chartData: {
        //     datasets: [],
        //     labels: [],
        //   },
        //   extraOptions: chartConfigs.blueChartOptions,
        // },
        redBarChart: {
          chartData: {}
        },
        clients:[],
        comisionTotal:0,
        totalSales: 0,
        textCategories: 'Categorias de gráficas',
        inspector:  false,
        apiGraph: '',
        attentions:[],
        dataTable: [],
        tablesLender: false,
        dataTableLender:[],
        loadedLender: false,
        chartLender: {},
        seriesLender: [],
        tables: {
          firstTable: false,
          secondTable: false,
          thirdTable:false,
          quarterTable:false,
          fifthTable:false,
          sixthTable:false,
          seventhTable:false,
          eighthTable: false,
          ninethTable: false,
          tenthTable: false
        },
        firstDataTable: [],
        inspectorLender: false,
        inspectorService: false,
        employes: [],
        employeSelect: 'Seleccione el prestador',
        inspectorFilter: false,
        tablesDaily: {
          firstTable: false,
          secondTable: false,
          thirdTable:false, 
          fourthTable: false
        },
        firstDataTableDaily: [],
        textCategoriesDaily: 'Categorias de gráficas',
        inspectorFilterDaily: false,
        loadedDaily: false,
        apiGraphDaily: '',
        inspectorDaily: false,
        Services: [],
        serviceSelect:'Seleccione un servicio',
        ifServices: false,
        totalSalesPrev: 0,
        totalSalesPrevValid: true,
        porcentajeTotalSales: 0,
        servicesLender: 0,
        lenderAvancements: 0,
        lenderBonus: 0,
        lenderComission: 0
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
      this.getServices();
      this.getVentas();
      this.totales(0);
      this.SalesQuantityChartFunc();
      // this.SalesQuantityChartWeekFunc();
      this.getParticipacion()
      this.getEmployes()
      this.SalesQuantityChartFuncDaily()
      this.getToken()
      
    },
    methods: {
      getToken(){
          const token = localStorage.userToken
          const decoded = jwtDecode(token) 
          this.lenderId = decoded.linkLender
          this.auth = decoded.access
          if (this.lenderId != "") {
            this.getLenderData()
            this.chartLenderData()
          }
      },
      getServices(){  
        axios.get(endPoint.endpointTarget+'/servicios')
        .then(res => {
          this.Services = res.data
        })
      },
      async getLenderData(){
          if (this.lenderId != "") {
            const split = this.lenderId.split(' / ')
            const lenderData = await axios.get(endPoint.endpointTarget+'/manicuristas/dataMetrics/'+split[0])
            if (lenderData) {
              this.servicesLender = lenderData.data.servicesLender
              this.lenderAvancements = lenderData.data.lenderAvancements
              this.lenderBonus = lenderData.data.lenderBonus
              this.lenderComission = lenderData.data.lenderComission
            }
          }
      },  
      selectService(name){
        this.serviceSelect = name
      },
      typeChart(text, type){
        this.TypeChartOptions = text
        if (type == 'radar') {
          this.chartDaily = {
            chart: {
              height: 350,
              type: 'radar',
              dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
              }
            },
          }
          this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true)
        }else if (type == 'pie') {
          this.chartDaily = {
            chart: {
              width: 380,
              type: 'pie',
            }
          }
          this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true)
        }else{
          this.chartDaily = {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            }
          }
          this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true)
        }
      },
      selectEmploye(name){
        this.employeSelect = name
      },
      getEmployes(){
  			axios.get(endPoint.endpointTarget+'/manicuristas')
  			.then(res => {
          this.employes = res.data
          console.log(this.employes)     
  			})
  		},
      getParticipacion() {
        axios.get(endPoint.endpointTarget+'/metrics/top')
        .then(res => {
          
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            this.attentions.push({name: element.nombre, contact: element.identidad, attention: element.participacion})
          }
          
        })
      },
      validate(text, api){
        if (api == 'no-detailPerLender') {
          this.inspectorLender = true
          this.inspectorService = false
          this.textCategories = text
        }else if(api == 'no-detailPerService'){
          this.inspectorService = true
          this.inspectorLender = false
          this.textCategories = text
        }else{
          this.textCategories = text
          this.apiGraph = api
          this.inspector = true
          if (this.apiGraph != 'detailPerLender') {
            this.inspectorLender = false
          }
          if (this.apiGraph != 'detailPerService') {
            this.inspectorService = false
          }
        }
      },
      validateDaily(text, api){
        this.textCategoriesDaily = text
        this.apiGraphDaily = api
        this.inspectorDaily = true
      },
      runGraphDaily(){
        this.progressDaily = false
        var dates, split
        if (this.dates.rangeDaily.length > 12) {
          split = this.dates.rangeDaily.split(' a ')
          dates = split[0]+':'+split[1]
        }else{
          dates = this.dates.rangeDaily+':'+'not'
        }
        var tooltip = {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val+' $'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            }
          ]
        }
        if (this.apiGraphDaily == 'getTopTenBestClients' || this.apiGraphDaily == 'getTopTenBestClientsRecommendations') {
          tooltip = {
          y: [
              {
                title: {
                  formatter: function (val) {
                    return val+' $'
                  }
                }
              },
            ]
          }
        }
        var typeAPI = axios.get(endPoint.endpointTarget+'/metrics/'+this.apiGraphDaily+'/'+dates)
        if (this.apiGraphDaily == 'getTopTenBestClients' || this.apiGraphDaily == 'getTopTenBestClientsRecommendations') {
          typeAPI = axios.get(endPoint.endpointTarget+'/metrics/'+this.apiGraphDaily)
        }
        typeAPI.then(res => {
          this.progressDaily = true
          if (res.data.status == 'ok') {
            if (this.apiGraphDaily == 'dailyQuantityPerDay') {
              this.tablesDaily = {
                firstTable: false,
                secondTable: true,
                thirdTable: false,
                fourthTable: false, 
                fivethTable: false
              }
            }else if (this.apiGraphDaily == 'dailyAveragePerDay') {
              this.tablesDaily = {
                firstTable: false,
                secondTable: false,
                thirdTable: true,
                fourthTable: false, 
                fivethTable: false
              }
            }else if (this.apiGraphDaily == 'getTopTenBestClients') {
              this.tablesDaily = {
                firstTable: false,
                secondTable: false,
                thirdTable: false, 
                fourthTable: true,
                fivethTable: false
              }
            }else if (this.apiGraphDaily == 'getTopTenBestClientsRecommendations') {
              this.tablesDaily = {
                firstTable: false,
                secondTable: false,
                thirdTable: false, 
                fourthTable: false, 
                fivethTable: true
              }
            }
            console.log(res)
            this.chartDaily = {
              title: {
                text: this.textCategoriesDaily,
                align: 'left'
              },
              type: 'category',
              xaxis: {
                categories: res.data.categories
              },
              tooltip: tooltip
            }
            this.dataTableDaily = []
            this.dataTableDaily = res.data.dataTable
            this.seriesDaily = res.data.series
            // this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true)
          }else{
            this.modals = {
                modal1: true,
                message: "No hay ventas en la fecha seleccionada",
                icon: 'ni ni-fat-remove ni-5x',
                type: 'danger'
            }
            setTimeout(() => {
                this.modals = {
                  modal1: false,  
                  message: "",
                  icon: '',
                  type: ''
                } 
            }, 1500);
          }
        })
      },
      exportXLSX(data, tipo){
        var split, dates, category
        if (tipo == 'dates') {
          category = this.textCategories
          if (this.dates.range.length > 12) {
            split = this.dates.range.split(' a ')
            dates = split[0]
          }else{
            dates = this.dates.range
          }
        }else{
          category = this.textCategoriesDaily
          if (this.dates.rangeDaily.length > 12) {
            split = this.dates.rangeDaily.split(' a ')
            dates = split[0]
          }else{
            dates = this.dates.rangeDaily
          }
        }
        var Datos = XLSX.utils.json_to_sheet(data) 
        var wb = XLSX.utils.book_new() 
        XLSX.utils.book_append_sheet(wb, Datos, 'Datos') 
        XLSX.writeFile(wb, category+'-'+dates+'.xlsx') 
      },
      runGraph(){
        this.progress = false
        var dates, split
        if (this.dates.range.length > 12) {
          split = this.dates.range.split(' a ')
          dates = split[0]+':'+split[1]
        }else{
          dates = this.dates.range+':'+'not'
        }
        var typeAPI = axios.get(endPoint.endpointTarget+'/metrics/'+this.apiGraph+'/'+dates)
        var typeDatetime = {
            chart: {
              type: 'line',
              height: 350
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: this.textCategories,
              align: 'left'
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            xaxis: {
              type: 'datetime'
            },
            tooltip: {
              x: {
                type:'datetime',
                format: 'dd MMM yyyy'
              }
            },
        }
        if (this.apiGraph == 'detailPerLender') {
          typeAPI = axios.post(endPoint.endpointTarget+'/metrics/'+this.apiGraph+'/'+dates, {
            lender: this.employeSelect
          })
        }else if(this.apiGraph == 'detailPerService'){
          typeAPI = axios.post(endPoint.endpointTarget+'/metrics/'+this.apiGraph+'/'+dates, {
            service: this.serviceSelect
          })
        }
        typeAPI.then(res => {
          this.progress = true
          if (res.data.status == 'ok') {
            if (this.apiGraph == 'dailyProduction') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: true,
                thirdTable:false,
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'dailyServices') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:true,
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'quantityProductionPerLender') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:true,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'dailyExpenseGainTotal') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:true,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'quantityComissionPerLender') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:false,
                sixthTable:true,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'quantityServicesPerLender') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:true,
                ninethTable: false,
                nineth: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'detailPerLender') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: true,
                ninethTable: false,
                tenthTable: false
              }
            }else if (this.apiGraph == 'dailyDesign') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: true,
                tenthTable: false
              }
            }else if (this.apiGraph == 'detailPerService') {
              this.chartOptions = typeDatetime
              this.tables = {
                firstTable: false,
                secondTable: false,
                thirdTable:false, 
                quarterTable:false,
                fifthTable:false,
                sixthTable:false,
                seventhTable:false,
                eighthTable: false,
                ninethTable: false,
                tenthTable: true
              }
            }
            this.dataTable = []
            this.dataTable = res.data.dataTable
            this.series = res.data.series
            this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
          }else{
            this.modals = {
                modal1: true,
                message: "No hay ventas en la fecha seleccionada",
                icon: 'ni ni-fat-remove ni-5x',
                type: 'danger'
            }
            setTimeout(() => {
                this.modals = {
                  modal1: false,  
                  message: "",
                  icon: '',
                  type: ''
                } 
            }, 1500);
          }
        })
      },
      getVentas(){
        axios.get(endPoint.endpointTarget+'/metrics/total')
        .then(res => {
          this.totalSales = res.data.count
          this.totalSalesPrev = res.data.countPrev
          this.porcentajeTotalSales = (parseFloat(this.totalSales) - parseFloat(this.totalSalesPrev)) / parseFloat(this.totalSales) * 100
          if (this.porcentajeTotalSales < 0) {
            this.totalSalesPrevValid = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.$swal({
            type: 'error',
            title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
            showConfirmButton: false,
            timer: 2500
          })
          // router.push({name: 'login'})
        })
      },
      totales(month){
        axios.get(endPoint.endpointTarget+'/ventas/totalSales/'+month)
        .then(res => {
          this.totalLocal = this.formatPrice(res.data.totalLocal)
          this.gananciaNeta = this.formatPrice(res.data.gananciaNeta)
          this.gananciaTotal = this.formatPrice(res.data.gananciaTotal)
          this.localAnterior = this.formatPrice(res.data.localAnterior)
          this.netaAnterior = this.formatPrice(res.data.netaAnterior)
          this.totalAnterior = this.formatPrice(res.data.totalAnterior)
          this.comision = this.formatPrice(res.data.comision)
          this.comisionAnterior = this.formatPrice(res.data.comisionAnterior)
          this.porcentajeLocal.push((parseFloat(this.totalLocal) - parseFloat(this.localAnterior)) / parseFloat(this.totalLocal) * 100)
          this.porcentajeGanancia.push((parseFloat(this.comision) - parseFloat(this.comisionAnterior)) / parseFloat(this.comision) * 100)
          this.porcentajeTotal.push((parseFloat(this.gananciaTotal) - parseFloat(this.totalAnterior)) / parseFloat(this.gananciaTotal) * 100)
          if (this.porcentajeLocal[0] < 0) {
            this.porcentajeLocal.push(false)
          }
          else {
            this.porcentajeLocal.push(true)
          }
          if (this.porcentajeGanancia[0] < 0) {
            this.porcentajeGanancia.push(false)
          }
          else {
            this.porcentajeGanancia.push(true)
          }
          if (this.porcentajeTotal[0] < 0) {
            this.porcentajeTotal.push(false)
          }
          else {
            this.porcentajeTotal.push(true)
          } 
        })
      },
      chartLenderData(){
        console.log('aqui toy')
        this.progressDaily = false
        const split = this.lenderId.split(' / ')
        const dateNow = new Date()
        const dateFormat = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-1'
        const dateFormatTwo = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-30'
        this.loadedLender = false
        axios.post(endPoint.endpointTarget+'/metrics/detailPerLender/'+dateFormat+':'+dateFormatTwo, {
          lender: split[0]
        })
        .then(res => {
          this.progressDaily = true
          const userlist = res.data
          this.dataTableLender = res.data.dataTable
          this.seriesLender = userlist.series
          this.chartLender = {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: true
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
            },
            title: {
              text: 'Estadisticas',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val 
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              type: 'datetime',
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          }
          
          this.loadedLender = true
          this.tablesLender = true
        })
      },
      SalesQuantityChartFuncDaily(){
        this.progressDaily = false
        const dateNow = new Date()
        const dateFormat = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-1'
        const dateFormatTwo = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-30'
        this.loaded = false
        axios.get(endPoint.endpointTarget+'/metrics/dailyQuantityPerDay/'+dateFormat+':'+dateFormatTwo)
        .then(res => {	
          this.progressDaily = true
          const userlist = res.data
          this.firstDataTableDaily = res.data.dataTable
          this.tablesDaily = {
            firstTable: true,
            secondTable: false,
            thirdTable:false, 
            fourthTable: false
          }
          this.seriesDaily = userlist.series
          this.chartDaily = {
            chart: {
              height: 350,
              type: 'area',
              zoom: {
                enabled: true
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
            },
            title: {
              text: 'Estadisticas',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val 
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              type: 'category',
              categories: res.data.categories
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          }
          
          this.loadedDaily = true
        })
        .catch(err => {
          console.error(err)
        })
      },
      SalesQuantityChartFunc(){
        this.progress = false
        const dateNow = new Date()
        const dateFormat = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-1'
        const dateFormatTwo = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-30'
        this.loaded = false
        axios.get(endPoint.endpointTarget+'/metrics/dailyExpenseGainTotal/'+dateFormat+':'+dateFormatTwo)
        .then(res => {	
          this.progress = true
          const userlist = res.data
          this.firstDataTable = res.data.dataTable
          this.tables.firstTable = true
          this.tables = {
            firstTable: true,
            secondTable: false,
            thirdTable:false,
            quarterTable:false,
            fifthTable:false,
            sixthTable:false,
            seventhTable:false,
            eighthTable: false,
            ninethTable: false,
            tenthTable:false
          }
          this.series = userlist.series
          this.chartOptions = {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: true
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
            },
            title: {
              text: 'Estadisticas',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val 
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              type: 'datetime',
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          }
          
          this.loaded = true
        })
        .catch(err => {
          console.error(err)
        })
      },
      initBigChart(index) {
        axios.get(endPoint.endpointTarget+'/metrics/top')
        .then(res => {
          
          var chartData = {
            labels: [],
            datasets: [{
              label: 'Atenciones',
              data: []
            }]
          }
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            chartData.labels.push(element.nombre)
            chartData.datasets[0].data.push(element.participacion)
          }
          this.redBarChart.chartData = chartData
          
        })
        
      },
      // formatPrice(value) {
      //   let val = (value/1).toFixed(2).replace('.', ',')
      //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      // },
      formatPrice(value) {
        let val = (value/1).toFixed(2)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      formatDate(date) {
          let dateFormat = new Date(date)
          return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
      
      formatString(val){
        return val.toString()
      },
      formatFixed(val){
        if (val) {
          return val.toFixed(2)
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
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style>
.maxHeight{
  max-height: 350px;
  overflow: scroll;
}
.maxHeightEspecific{
  max-height: 455px;
  overflow: scroll;
}
.buttonExcel{
  position:absolute;
  top:-2%;
  left:243%;
  z-index:100 !important;
}
.buttonExcelDaily{
  position:absolute;
  top:-2%;
  left:195%;
  z-index:100 !important;
}
@media (max-width: 1280px) {
  .buttonExcel{
    left:243%;
  }
  .buttonExcelDaily{
    left:175%;
  }
}
@media (max-width: 1140px) {
  .buttonExcel{
    left:223%;
  }
  .buttonExcelDaily{
    left:175%;
  }
}
@media (max-width: 1030px) {
  .buttonExcel{
    left:213%;
  }
  .buttonExcelDaily{
    left:165%;
  }
}
@media (max-width: 940px) {
  .buttonExcel{
    left:203%;
  }
  .buttonExcelDaily{
    left:155%;
  }
}
@media (max-width: 880px) {
  .buttonExcel{
    left:193%;
  }
  .buttonExcelDaily{
    left:145%;
  }
}
@media (max-width: 760px) {
  .buttonExcel{
    top:100%;
    left:70%;
  }
  .buttonExcelDaily{
    top:100%;
    left:70%;
  }
}
@media (max-width: 680px) {
  .buttonExcel{
    top:100%;
    left:60%;
  }
  .buttonExcelDaily{
    top:100%;
    left:60%;
  }
}
@media (max-width: 520px) {
  .buttonExcel{
    top:100%;
    left:55%;
  }
  .buttonExcelDaily{
    top:100%;
    left:55%;
  }
}
@media (max-width: 460px) {
  .buttonExcel{
    top:100%;
    left:45%;
  }
  .buttonExcelDaily{
    top:100%;
    left:45%;
  }
}
@media (max-width: 360px) {
  .buttonExcel{
    top:100%;
    left:65%;
  }
  .buttonExcelDaily{
    top:100%;
    left:65%;
  }
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
