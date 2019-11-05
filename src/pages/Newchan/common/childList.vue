<template>
  <el-table :data="formData">
    <el-table-column label="变种标题" align="center" width="150px">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.color_name">{{scope.row.color_name}}</el-tag>
        <el-tag type="info" v-if="scope.row.size_name">{{scope.row.size_name}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="price(价格)" align="center" prop="price" width="200px"></el-table-column>
    <el-table-column label="quality(数量)" align="center" prop="quality" width="200px"></el-table-column>
    <el-table-column label="变种图片" align="center">
      <template slot-scope="scope">
        <div class="childImgWrap">
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl1">
            <img class="imgItem" :src="scope.row.imgurl1" />
          </el-card>

          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl2">
            <img class="imgItem" :src="scope.row.imgurl2" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl3">
            <img class="imgItem" :src="scope.row.imgurl3" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl4">
            <img class="imgItem" :src="scope.row.imgurl4" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl5">
            <img class="imgItem" :src="scope.row.imgurl5" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl6">
            <img class="imgItem" :src="scope.row.imgurl6" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl7">
            <img class="imgItem" :src="scope.row.imgurl7" />
          </el-card>
          <el-card :body-style="{padding:'0px'}" v-if="scope.row.imgurl8">
            <img class="imgItem" :src="scope.row.imgurl8" />
          </el-card>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    formData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>   
<style lang="css">
.childImgWrap {
  display: flex;
  justify-content: center;
}
.imgItem {
  display: block;
  height: 80px;
  width: 80px;
}
</style>