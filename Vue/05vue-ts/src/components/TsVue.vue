 <template>
  <div class="ts-vue-comp">
    <h2>vue-ts实战</h2>
    <input type="text" v-model="featureVal" @keyup.enter="addFeature" />
    <ul>
      <li v-for="feature in features" :key="feature">{{feature}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

// 定义一个特性类
class Feature {
    constructor(id: number, name: string) {}
}

@Component
export default class TsVue extends Vue {
  // data
  // 使用Feature类约束features
  private features: Feature[];
  featureVal: string;

  // methods
  addFeature() {
    this.features.push(this.featureVal);
    this.featureVal = "";
  }

  constructor() {
    super();
    // data初始化
    this.features = ["类型注解", "编译型语 "];
    this.featureVal = ''
  }
}
</script>

<style>
.ts-vue-comp ul {
  list-style: none;
}
.ts-vue-comp li {
  text-align: left;
}
</style>