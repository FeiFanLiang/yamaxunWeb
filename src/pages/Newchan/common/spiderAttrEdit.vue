<template>
  <section>
    <el-row :gutter="2" class="tableContainer" type="flex">
      <div class="item">
        <el-tag>选择name对应的属性</el-tag>
      </div>
      <div class="item">
        <el-select v-model="attrMap.name" placeholder="选择name对应属性" size="mini">
          <el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="item">
        <el-tag>选择skuName对应的属性</el-tag>
      </div>
      <div class="item">
        <el-select v-model="attrMap.skuName" placeholder="选择skuName对应属性" size="mini">
          <el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="item">
        <el-input placeholder="筛选字符" v-model="transTarget" size="mini"></el-input>
      </div>
      <div class="item">
        <el-input placeholder="替换字符" v-model="transRuslut" size="mini"></el-input>
      </div>
      <div class="item">
        <el-button type="success" @click="replaceTarget" size="mini">替换</el-button>
      </div>
      <div class="item">
        <el-button type="primary" @click="submitData" size="mini">保存</el-button>
      </div>
    </el-row>
    <template v-if="spiderData.length">
      <el-table :data="spiderData" border stripe size="mini">
        <el-table-column label="name(属性标题)" align="center" width="250px">
          <template slot-scope="scope">
            <div class="attrItem">
              <el-tag v-if="attrMap.name" class="tag">{{attrMap.name}}</el-tag>
              <el-input v-model="scope.row.name" size="mini"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="skuName(属性)" align="center" width="250px">
          <template slot-scope="scope">
            <div class="attrItem">
              <el-tag v-if="attrMap.skuName">{{attrMap.skuName}}</el-tag>
              <el-input v-model="scope.row.skuName" size="mini"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="price(价格)" align="center" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="quality(数量)" align="center" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.quality" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="变种图片" align="center">
          <template slot-scope="scope">
            <div class="childImgWrap">
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl1">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl1" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>

              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl2">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl2" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl3">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl3" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl4">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl4" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl5">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl5" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl6">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl6" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl7">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl7" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
              <el-card :body-style="{padding:'0px'}">
                <div class="spiderImgWrap">
                  <el-image :src="scope.row.imgurl8">
                    <div slot="error" class="image-slot">暂无图片</div>
                  </el-image>
                </div>

                <div class="bottom">
                  <el-popover placement="right" width="400" trigger="click">
                    <el-input v-model="scope.row.imgurl8" placeholder="输入图片链接"></el-input>
                    <el-button slot="reference" type="text">编辑</el-button>
                  </el-popover>
                </div>
              </el-card>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeChild(scope.$index)" size="mini">移除</el-button>
            <el-button type="text" @click="batchImgLink(scope.row)" size="mini">批量适用图片链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </section>
</template>
<script>
export default {
  props: {
    formData: {
      type: Array,
      default() {
        return [];
      }
    },
    parentSku: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogVisible: false,

      spiderData: [],
      attrMap: {
        skuName: "",
        name: "color_name"
      },
      transTarget: "",
      transRuslut: "",
      options: ["color_name", "size_map", "color_map", "size_name"]
    };
  },
  methods: {
    batchImgLink(row) {
      if (!row["name"]) return;
      this.spiderData.forEach(el => {
        if (el["name"] == row["name"]) {
          el.imgurl1 = row.imgurl1;
          el.imgurl2 = row.imgurl2;
          el.imgurl3 = row.imgurl3;
          el.imgurl4 = row.imgurl4;
          el.imgurl5 = row.imgurl5;
          el.imgurl6 = row.imgurl6;
          el.imgurl7 = row.imgurl7;
          el.imgurl8 = row.imgurl8;
        }
      });
    },
    replaceTarget() {
      const dataText = JSON.stringify(this.spiderData);
      const reg = new RegExp(this.transTarget, "g");
      if (
        this.transTarget.indexOf("?") !== -1 ||
        this.transTarget.indexOf("/") !== -1 ||
        this.transTarget.indexOf("|") !== -1
      ) {
        this.spiderData = this.spiderData.map(el => {
          return JSON.parse(
            JSON.stringify(el).replace(this.transTarget, this.transRuslut)
          );
        });
      } else {
        this.spiderData = JSON.parse(
          dataText.replace(reg, `${this.transRuslut}`)
        );
      }
    },
    resetAttrMap() {
      this.attrMap = {
        skuName: "",
        name: "color_name"
      };
    },
    submitData() {
      const newChild = this.spiderData.map(el => {
        // let obj = {

        // 	[this.attrMap.skuName]:el.skuName,
        // 	[this.attrMap.name]:el.name,
        // 	ean:el.ean,
        // 	price:el.price,
        // 	quality:el.quality,
        // 	imgurl:el.imgurl,
        // 	sku:el.sku
        // }
        let obj = {
          [this.attrMap.skuName]: el.skuName,
          [this.attrMap.name]: el.name
        };

        return Object.assign({}, el, obj);
      });

      this.$emit("editCallback", newChild);
    },
    removeChild(index) {
      this.spiderData.splice(index, 1);
    },
    initFormData(data) {
      this.resetAttrMap();
      let baseInfo = {
        sku: ""
      };
      return data
        .map(el => Object.assign({}, el, baseInfo))
        .map((el, index) => {
          let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
          el.sku = `${this.parentSku}-${currentindex}`;
          return el;
        });
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.length) {
          this.spiderData = this.initFormData(val);
        }
      }
    }
  },
  computed: {}
};
</script>
<style lang="css">
.tableContainer {
  margin: 30px 0;
}
.attrItem {
  display: flex;
  flex-direction: column;
}
.item {
  margin-right: 20px;
}
.tag {
  margin-right: 10px;
}
.bottom {
  display: flex;
  justify-content: center;
}
.image-slot {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spiderImgWrap {
  width: 80px;
  height: 80px;
}
</style>
<style lang="css">
.el-divider--horizontal {
  height: 2px;
  color: #f4f4f4;
  border: 1px solid #ccc;
}
</style>