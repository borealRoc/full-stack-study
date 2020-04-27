 <template>
  <div class="ts-vue-comp">
    <h2>{{title}}{{message}}</h2>
    <input type="text" v-model="featureVal" @keyup.enter="addFeature" />
    <p>通过计算属性获得：总共有{{count}}条数据</p>
    <p>通过vuex的getter获得：总共有{{featuresLength}}条数据</p>
    <ul>
      <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation } from "vuex-class";

// 定义一个特性类
class FeatureClass {
  constructor(id: number, name: string) {}
}
// 定义一个特性接口
export interface FeatureInterface {
  id: number;
  name: string;
}
// 定义一个泛型接口
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
// 定义泛型函数
function getData<T>(data: T[]): Promise<Result<T>> {
  return Promise.resolve<Result<T>>({ ok: 1, data });
}

@Component
export default class TsVue extends Vue {
  // 1. data: 赋值可以初始化data，也可以在constructor()中初始化
  private featureVal: string = "";
  // 使用FeatureClass类约束features
  // private features: FeatureClass[];
  // 使用FeatureInterface接口约束features
  // private features: FeatureInterface[] = [];

  // 7. 从vuex映射State, Getter, Action, Mutation
  @State
  private features!: FeatureInterface[];
  @Getter
  private featuresLength: number;
  @Action addFeatureAction: any;
  @Mutation addFeatureMutation: any;

  // 2. props -- 属性装饰器
  @Prop() private title!: string; //'!'表示必传
  @Prop({ default: "实战" }) message?: string; //'?'表示非必需

  // 3. watch -- 方法装饰器
  @Watch("features", { deep: true })
  onFeaturesChange(newval: any, oldval: any) {
    console.log("@Watch -- 方法装饰器", newval, oldval);
  }

  // 4. @Emit() -- 方法装饰器
  @Emit()
  // 4.1 method写法
  addFeature() {
    const feature = {
      id: this.features.length + 1,
      name: this.featureVal
    };
    // 把状态变更存在本组件
    // this.features.push(feature);
    // 把状态变更存在本vuex
    this.addFeatureAction(this.featureVal);
    this.featureVal = "";
    // 返回值作为派发事件的参数
    return feature;
  }

  // 5. computed
  get count() {
    return this.features.length;
  }

  // 6. created
  async created() {
    // const data = [
    //   { id: 1, name: "类型注解", version: "2.0" },
    //   { id: 2, name: "接口", version: "1.0" },
    //   { id: 3, name: "泛型", version: "3.0" }
    // ];
    // const result = await getData<FeatureInterface>(data);
    // this.features = result.data;
  }

  constructor() {
    super();
    // data初始化
    // this.features = ["类型注解", "编译型语 "]
    // this.features = [
    //   { id: 1, name: "类型注解" },
    //   { id: 2, name: "编译型语 " }
    // ];
    // this.featureVal = "";
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