<template>
    <div class="wrap">
        <div class="scroller" id="scroller" :style="{transform: `translate3d(-${currentPage * innerWidth}px, 0, 0)`}">
            <!--引入ppt页面组件-->
            <template v-for='page in pages'>
                <component :is='page'></component>
            </template>
        </div>
        <bgskin />
        <plugins />
    </div>
</template>

<script>
    import Hammer from 'hammerjs'
    import util from '../util'
    import socket from '../io'
    import bgskin from './bgskin.vue'
    import plugins from './plugins.vue'
    import * as details from './details/all'

    export default {
        components: Object.assign({}, {
            bgskin,
            plugins,
        }, details.default),
        data() {
            return {
                currentPage: 0,
                innerWidth: 0,
                pages: Object.keys(details.default)
            }
        },
        created() {
            socket.on('currentpage', msg => {
                this.currentPage = msg.page
            })
            socket.on('receiveChange', msg => {
                this.currentPage = msg.page
            })
        },
        mounted() {
            this.innerWidth = Math.max(window.innerWidth, document.body.clientWidth)
            const pageSize = document.querySelectorAll('#scroller > div').length
            console.log(pageSize)
            const scroller = document.getElementById('scroller')
            const hammer = new Hammer(scroller)
            hammer.on('swipeleft', () => {
                if(util.isMaster()) {
                    if(this.currentPage >= pageSize - 1) {
                        return
                    }
                    let page = ++this.currentPage
                    socket.emit('change', {page})
                }
                
            })
            hammer.on('swiperight', () => {
                if(util.isMaster()) {
                    if(this.currentPage <= 0) {
                        return
                    }
                    let page = --this.currentPage
                    socket.emit('change', {page})
                }
            })
        },
    }
</script>

<style>
    body, html {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .wrap {
        width: 100%;
        height: 100%;
        background: #333;
        overflow: hidden;
    }
    .scroller {
        width: 300%;
        height: 100%;
        display: flex;
        transition: .2s ease-out;
        position: relative;
        z-index: 10;
    }
    .scroller > div {
        flex-grow: 1;
        padding: 4%;
        font-size: 32px;
        color: #fff;
        width: 100%;
    }
</style>
