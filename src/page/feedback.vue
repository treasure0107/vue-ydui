
<template>
<div class="fd_body">
    <yd-cell-group>
        <yd-cell-item>
            <!-- <yd-input slot="right" regex="mobile" placeholder="您的联系电话"></yd-input> -->
            <yd-input slot="right" v-model="mobile" ref="mobile" required regex="mobile" placeholder="您的联系电话"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    
    <textarea placeholder="请输入您的具体问题(140字以内)" maxlength="140" class="textareaText" v-model="quecontent"></textarea>

    <div v-show='isCorrect'>
        <p>您未填写正确的联系电话或者未填写具体问题！</p>
    </div>
    <div @click="submitQue">
        <yd-button size="large" bgcolor="#6198d4" color="#FFF">提交</yd-button>
    </div>

</div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                mobile:'',
                quecontent:'',
                isCorrect:false
            }
        },
        watch:{
            mobile:'isCor',
            quecontent:'isCor'
        },
        methods:{
            isCor(){
                if (this.mobile !='' && this.quecontent !="") {
                    this.isCorrect=false;
                }else{
                   this.isCorrect=true;
                }
            },
            submitQue(){
                let nowT=new Date();
                let nowTs=new Date(nowT).Format("yyyy-MM-dd hh:mm");
                if (this.mobile !='' && this.quecontent !="") {
                    this.isCorrect=false;
                         this.$http.post(this.$api.apihost+'help/feedback',{
                        uid:localStorage.uid,
                        time:nowTs,
                        content:this.quecontent,
                        contentExt:"",
                        phone:this.mobile
                    },{emulateJSON:true}).then((res)=>{
                        this.$router.push({ path: '/coproblems' })
                    },(err)=>{
                        console.log(err);
                    });
                } else{
                    this.isCorrect=true;
                    // alert(1);
                }

            }
        }
    }
</script>
<style type="text/css" scoped>
    .fd_body{
        padding:0.3rem 0.5rem;
    }
    .textareaText{
         width: 100%;
        height: 2rem;
        padding: 0.1rem;
    }
</style>
