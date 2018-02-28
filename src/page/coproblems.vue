
<template>
    <yd-layout>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left" class="searchicon" @click="searchQus"></span>
                <yd-input slot="right" v-model="quecontent"  placeholder="请输入问题关键词" @keyup.native.enter="searchQus"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <template>
        <yd-infinitescroll :on-infinite="getHelp" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
            <yd-accordion accordion v-for="(item,index) in quelist" :key="index">
                <yd-accordion-item :title="item.title">
                    <div style="padding: .24rem;">
                        <p class="cp_open">{{item.content}}</p>
                        <div class="cp_obtn"><button @click="isSolve(item.qid)" :class="{gLight:issolve}">已解决</button><button @click="noSolve(item.qid)" :class="{gLight:nosolve}">未解决</button></div>
                    </div>
                </yd-accordion-item>
            </yd-accordion>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip"></span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        </template>
        <yd-tabbar slot="bottom">
            <!-- <yd-tabbar-item title="首页" link="#" active>
            </yd-tabbar-item> -->

            <div class="cp_footer">
                <router-link to="/feedback">
                意见反馈
                </router-link>
            </div>

        </yd-tabbar>

    </yd-layout>
</template>
<script type="text/babel">
export default {
    data(){
        return {
            issolve:false,
            nosolve:false,
            titleval:"常见问题",
            content:'',
            quecontent: '',
            pagenum:0,
            page: 0,
            pageSize: 10,
            quelist:[{
                title:'weretr',
                qid:'1234'
            }]
        }
    },
    created () {
        document.title = this.titleval;
        this.getHelp()
    },
    mounted () {

    },
    watch:{
        quecontent:'isQuate'
    },
    methods: {
        isSolve(qid){
            this.nosolve=false;
            this.issolve=true;
            
             var qid=qid;
            this.$http.post(this.$api.apihost+'help/questionResolved',{
                qid:qid
            },{emulateJSON:true}).then((res)=>{
                
            },(res)=>{
                console.log(res.body);
            });
        },
        noSolve(qid){
            this.issolve=false;
            this.nosolve=true;
              var qid=qid;
            this.$http.post(this.$api.apihost+'help/questionResolved',{
                qid:qid
            },{emulateJSON:true}).then((res)=>{
                
            },(res)=>{
                console.log(res.body);
            });
        },
        isQuate(){
            if (this.quecontent=="") {
                this.getHelp()
            }
        },
        searchQus(){
            this.$http.post(this.$api.apihost+'help/searchHelp',{
                keyWord:this.quecontent
            },{emulateJSON:true}).then((res)=>{
                const quelist=res.body.obj;
                this.quelist=quelist;
            },(res)=>{
                console.log(res.body);
            });
        },
        getHelp(){
            this.$http.post(this.$api.apihost+'help/getHelp',{
                startRow:this.page,
                rowCount:this.pageSize,
            },{emulateJSON:true}).then((res)=>{
                const quelist=res.body.obj.helpList;
                this.quelist=quelist;
                var count=res.body.obj.count;
                var pagecount=Math.ceil(count/this.pageSize);
                if (quelist.length < this.pageSize || this.pagenum == pagecount) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                this.pagenum++;
                this.page+=this.pageSize;
            },(res)=>{
                console.log(res.body);
            });
        }
    }
}
</script>
<style scoped>

.searchicon{
    width: 0.8rem;
    height: 0.5rem;
    background-image: url(../images/visit/search.svg);
    background-repeat: no-repeat;
}
.gLight{
    color:#6198d4 !important;
    border:1px solid #6198d4 !important;
}
.cp_obtn button{
    font-size: 0.22rem;
    color:#ccc;
    font-family: "PingFang Medium" ,sans-serif;
    width: 1.28rem;
    border:1px solid #ccc;
    margin: 0 0.3rem 0.3rem 0.5rem;
    padding: 0 0.2rem;
    height: 0.5rem;
    border-radius: 0.04rem;
}
.cp_open{
    font-size: 0.22rem;
    color:#9d9ea0;
    font-family: "PingFang Medium" ,sans-serif;
    padding:0.5rem;
    line-height: 2;
}
.m-cell-box{
    margin: 0.3rem 0.5rem;
}
    .cp_footer{
        width: 100%;
        height: 0.98rem;
        text-align: center;
        line-height: 0.98rem;
        font-size: 0.36rem;
        color:#6198d4;
        font-family: "PingFang Bold" ,sans-serif;
    }
</style>
