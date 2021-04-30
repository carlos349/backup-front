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
                        <h1 class="display-2 text-white">Administrador de envio de correos</h1>
                        <p class="text-white mt-0 mb-2">Edita la plantilla, el asunto del correo, y administra los correos de tus clientes.</p>
                    </div>
                </div>
            </div>
        </base-header>
        
            <div class="p-0 m-0 row " style="height:130vh;">
                <div v-if="template == 1" class="col-md-7 templates">
                    <div class="container">
                        <picture-input 
                        ref="pictureInput"
                        width="800" 
                        height="800" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChange">
                        </picture-input>
                    </div>
                </div>
                <div v-if="template == 2" class="col-md-7 templates">
                    <div class="container"> 
                        <div v-html="textareaOne" style="max-height:90vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                        </div>
                    </div> 
                </div>
                <div v-if="template == 3" class="col-md-7 templates">
                    <div class="container">
                        <picture-input 
                        ref="pictureInput"
                        width="250" 
                        height="250" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChange">
                        </picture-input>
                        <div v-html="textareaOne" style="max-height:60vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                        </div>
                    </div>
                </div>
                <div v-if="template == 4" class="col-md-7 templates">
                    <div class="container">
                        <picture-input 
                        ref="pictureInput"
                        width="200" 
                        height="200" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChange">
                        </picture-input>
                        
                        <div v-html="textareaOne" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <picture-input 
                        ref="pictureInputTwo"
                        width="200" 
                        height="200" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChangeTwo">
                        </picture-input>
                            </div>
                            <div class="col-sm-6">
                                <picture-input 
                        ref="pictureInputThree"
                        width="200" 
                        height="200" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChangeThree">
                        </picture-input>
                            </div>
                        </div>
                        <div v-html="textareaTwo" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea"> 
                        </div>
                    </div>
                </div>
                <div v-if="template == 5" class="col-md-7 templates">
                    <div class="container">
                        <div v-html="textareaOne" style="max-height:65vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                        </div>
                        <picture-input 
                        ref="pictureInput"
                        width="250" 
                        height="250" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChange">
                        </picture-input>
                    </div>
                </div>
                <div v-if="template == 6" class="col-md-7 templates">
                    <div class="container">
                        <picture-input 
                        ref="pictureInput"
                        width="200" 
                        height="200" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        
                        button-class="btn btn-primary"
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChange">
                        </picture-input>
                        
                        <div v-html="textareaOne" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                        </div>
                        <picture-input 
                        ref="pictureInputTwo"
                        width="200" 
                        height="200" 
                        margin="16"
                        :hideChangeButton='true'
                        accept="image/jpeg,image/png" 
                        size="10" 
                        class="mt-4"
                        :custom-strings="{
                            tap: 'Click para seleccionar una foto.',
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Selecciona una foto..',
                            change:'Cambiar imagen'
                        }"
                        @change="onChangeTwo">
                        </picture-input>
                        <div v-html="textareaTwo" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea"> 
                        </div>
                    </div>
                </div>
                <div style="border-radius:5px" class="col-md-5 pt-3">
                    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">De:</span>
                        </div>
                        <input readonly v-model="de" type="text" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <p style="color:#8b8a89" class="font-italic float-right">*Estas enviando el E-Mail a {{mailsQuantity}} personas</p>
                    <div class="input-group mb-3">
                        
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Para:</span>
                        </div>
                        <input v-model="mails" type="text" v-on:change="countMails" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Asunto:</span>
                        </div>
                        <input v-model="subject" type="text" class="form-control pl-2" placeholder="Asunto.." aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="ck-styles">
                        
                        <ckeditor  @input="changeTextarea()" :editor="editor" v-model="editorData" ></ckeditor>
                    </div>
                </div>
                <!-- <div style="background-color:rgba(238, 238, 238, 0.623);border-radius:5px" class="col-1">
                    
                </div> -->
            </div>
            <button class="btn btn-default float-right mb-2 buttonSend" v-on:click="SendMail">
                <i class="fa fa-paper-plane"></i>
            </button>
        </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PictureInput from 'vue-picture-input'
import endPoint from '../../config-endpoint/endpoint.js'
// import EventBus from './EventBus'
import axios from 'axios'
import router from '../router'
export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            template: localStorage.getItem("selectTemplate"),
            change: 'Change Photsado',
            textareaOne:'Click para editar en el editor...',
            textareaTwo:'Click para editar en el editor...',
            textareaThree:'Click para editar en el editor...',
            select: 0,
            de: 'info@kkprettynails.cl',
            mails: '',
            mailsQuantity: '',
            subject: ''
        };
        
    },
    components: {
        PictureInput,
        ClassicEditor
    },
    created(){
        this.getMails()
    },
    methods: {
        async getMails(){
            const mails = await axios(endPoint.endpointTarget+'/clients/mails')
            for (let index = 0; index < mails.data.length; index++) {
                const element = mails.data[index]
                var splitCorreo, ig, id
                if (element.correoCliente) {
                    splitCorreo = element.correoCliente.split('.com')
                    if (splitCorreo.length == 2) {
                        if (this.mails == '') {
                            this.mails = element.correoCliente
                        }else{
                            this.mails = this.mails + ', ' + element.correoCliente
                        }
                    }
                }
                if (element.identidad) {
                    id = element.identidad.split('.com')
                    if (id.length == 2) {
                        if (this.mails == '') {
                            this.mails = element.identidad
                        }else{
                            this.mails = this.mails + ', ' + element.identidad
                        }
                    }
                }
                if (element.instagramCliente) {
                    ig = element.instagramCliente.split('.com')
                    if (ig.length == 2) {
                        if (this.mails == '') {
                            this.mails = element.instagramCliente
                        }else{
                            this.mails = this.mails + ', ' + element.instagramCliente
                        }
                    }
                }
            }
            const splitMails = this.mails.split(',')
            this.mailsQuantity = splitMails.length
        },
        countMails(){
            const splitMails = this.mails.split(',')
            this.mailsQuantity = splitMails.length
            const count = this.mails.length
            console.log(this.mails[count - 1])
            if (this.mails[count - 1] == ',') {
                this.mailsQuantity = this.mailsQuantity - 1
            }
        },
        onChange (image) {
            if (image) {
                this.image = this.$refs.pictureInput.file
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        onChangeTwo (image) {
            if (image) {
                this.imageTwo = this.$refs.pictureInputTwo.file
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        onChangeThree (image) {
            if (image) {
                this.imageThree = this.$refs.pictureInputThree.file
                console.log(this.imageThree)
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        async SendMail(){
            const from = this.de
            const to = this.mails
            const subject = this.subject
            const config = {headers: {'Content-Type': 'multipart/form-data'}}
            let formData = new FormData();
            formData.append('from', from)
            formData.append('to', to)
            formData.append('subject', subject)
            if (this.template == 1) {
                formData.append('image', this.image)
                formData.append('type', this.template)
            }
            if (this.template == 2) {
                formData.append('text', this.textareaOne)
                formData.append('type', this.template)
            }
            if (this.template == 3) {
                formData.append('image', this.image)
                formData.append('text', this.textareaOne)
                formData.append('type', this.template)
            }
            if (this.template == 4) {
                formData.append('image', this.image)
                formData.append('image', this.imageTwo)
                formData.append('image', this.imageThree)
                formData.append('text', this.textareaOne)
                formData.append('textTwo', this.textareaTwo)
                formData.append('type', this.template)
            }
            if (this.template == 5) {
                formData.append('text', this.textareaOne)
                formData.append('image', this.image)
                formData.append('type', this.template)
            }
            if (this.template == 6) {
                formData.append('image', this.image)
                formData.append('image', this.imageTwo)
                formData.append('text', this.textareaOne)
                formData.append('textTwo', this.textareaTwo)
                formData.append('type', this.template)
        
            }
            // console.log(formData)
            const send = await axios.post(endPoint.endpointTarget+'/clients/sendmail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (send.data.status == "ok"){ 
                this.$swal({
                    type: 'success',
                    title: 'Correo enviado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push({path: 'Clientes'})
            }       
        },
        editarTextarea (info, model){
            $(".textarea").removeClass("sombreado")
            $(".textarea").eq(model-1).addClass("sombreado")
            $(".ck-content").focus()
            this.select = model
            if (model == 1 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaOne
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
            if (model == 2 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaTwo
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
            if (model == 3 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaThree
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
        },
        changeTextarea(){
                if (this.select == 1) {
                    this.textareaOne = this.editorData
                }
                if (this.select == 2) {
                    this.textareaTwo = this.editorData
                }
                if (this.select == 3) {
                    this.textareaThree = this.editorData
                }
            
        }
    }
}
</script>
<style>
    .textarea {
        cursor: pointer;
        background-color:#ecebea;
        border-radius:5px
    }
    .sombreado{
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
    }
    .ck-content{
        max-height: 70vh;
    }
    .ck-file-dialog-button{
        display: none;
    }
    .ck-styles{
        width: 80%;
        
    }
    .templates{
        border:5px solid #f7fafc;
        height:auto;
        background-color:#fff;
        padding-bottom: 10px;
    }
    .buttonSend{
        position:absolute;
        top:35%;
        right: 2%;
    }
</style>