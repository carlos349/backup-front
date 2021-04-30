<template>
    <div class="container">
        <center >
            <div class="mt-9 hidden divShow">
                <i class="fa fa-check-circle mb-4" style="font-size:15em;color:#2dce89;"></i>
                <h1>Su cita fue confirmada satifactoriamente</h1>
            </div>    
        </center> 
    </div>
</template>
<script>
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import router from '../router'
import io from 'socket.io-client';
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default {
    data(){
        return {
            id: this.$route.query.id,
            socket : io(endPoint.endpointTarget),
        }
    },
    created(){
        this.confirmDate()
    },
    methods: {
        confirmDate(){
            axios.get(endPoint.endpointTarget+'/citas/confirmDate/'+this.id)
            .then(res => {
                if (res.data.status == 'ok') {
                    $('.divShow').show('slow')
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:'Cliente: '+res.data.data.client,
                        userImage:localStorage.getItem('imageUser'),
                        detail:'Confirmo su cita para el día '+this.formatDateTwo(res.data.data.date),
                        link: 'agendamiento'
                    })
                    .then(res => {
                        this.socket.emit('sendNotification', res.data)
                    })
                    setTimeout(() => {
                        window.location = "https://kkprettynails.cl"
                    }, 2000);
                }
            })
        },
        formatDateTwo(date) {
            let dateFormat = new Date(date)
            console.log(dateFormat)
            return moment(dateFormat).format("DD-MM-YYYY")
        },
    }
}
</script>
<style>
.divShow{
    display:none;
}
</style>