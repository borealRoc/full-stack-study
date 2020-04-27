 <template>
  <div class="ts-vue-comp">
    <h2>vue-ts实战</h2>
    <input type="text" v-model="featureVal" @keyup.enter="addFeature" />
    <p>总共有{{count}}条数据</p>
    <ul>
      <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

// 定义一个特性类
class FeatureClass {
  constructor(id: number, name: string) {}
}
// 定义一个特性接口
interface FeatureInterface {
  id: number;
  name: string;
}
// 定义一个泛型接口
interface Result<T> {
    ok: 0 | 1,
    data: T[]
}
// 定义泛型函数


@Component
export default class TsVue extends Vue {
  // data
  // 使用FeatureClass类约束features
  // private features: FeatureClass[];
  // 使用FeatureInterface接口约束features
  private features: FeatureInterface[];
  private featureVal: string;

  // methods
  addFeature() {
    this.features.push({
      id: this.features.length + 1,
      name: this.featureVal
    });
    this.featureVal = "";
  }

  // computed
  get count() {
    return this.features.length;
  }

  constructor() {
    super();
    // data初始化
    // this.features = ["类型注解", "编译型语 "]
    this.features = [
      { id: 1, name: "类型注解" },
      { id: 2, name: "编译型语 " }
    ];
    this.featureVal = "";
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