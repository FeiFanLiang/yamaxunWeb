<template>
    <el-select v-model="selectCountry">
        <el-option v-for="(item,index) of regions" :key="index" :value="item.regionId" :label="item.region"></el-option>
    </el-select>
</template>
<script>
import { regions } from "@/common/options.js";
export default {
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            regions:regions
        }
    },
    computed:{
        selectCountry:{
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        }
    },
    watch:{
        selectCountry(val){
            if(val !== ''){
                this.$emit('countryChange',val)
            }
        }
    }
}
</script>