<template>
    <div class="plugins">
        <p class="like" @click="add_like">赞</p>
        <p class="like barrage" @click="add_barrage">弹幕</p>
        <ul class="msglist" id="msglist">
            <li v-for="(msg, key) in msglist" :key="key">{{msg}}</li>
        </ul>
        <!-- <input type="text" id="barrage">
        <button id="send">发送</button> -->
    </div>
</template>


<script>   
    import socket from '../io'

    export default {
        data() {
            return {
                msglist: []
            }
        },
        mounted() {
            socket.on('message', msg => {
                for(let i in msg) {
                    this.msglist = this.msglist.concat(msg[i])
                }
            })
        },
        updated() {
            const lis = document.querySelectorAll('#msglist li')
            lis.length && lis[lis.length - 1].scrollIntoView()
        },
        methods: {
            add_like() {
                socket.emit('message', {
                    like: localStorage.getItem('ppt_user') + '点了赞！'
                })
            },
            add_barrage() {
                const barrage = prompt('发个弹幕吧~')
                socket.emit('message', {
                    barrage: localStorage.getItem('ppt_user') + '：' + barrage
                })
            }
        }
    }
</script>

<style>
    .plugins {
        position: absolute;
        z-index: 100;
        width: 100%;
        bottom: 0;
        right: 0;
    }
    .like {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        border-radius: 50%;
        background: #fff;
        line-height: 40px;
        text-align: center;
    }
    .like.barrage {
        right: 80px;
    }
    .msglist {
        position: absolute;
        left: 20px;
        bottom: 20px;
        max-width: 200px;
        max-height: 200px;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
        color: #ddd;
        font-size: 12px;
    }
</style>
