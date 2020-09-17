import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtCard ,AtNoticebar} from "taro-ui"

// 点击订阅，把订阅信息入库

const tmplid = "ZkEjao0c-c4oSboUsZNKTFu-bdoHucEvuRNyuuyGwr8"
// 有一个定时执行的云函数 定时去库里查询，发现没发送的信息，就通过云调用，做一次信息推送

class Subscribe extends Component{

  state={
    books:[
      {
        id:1,
        name1:{value:'三体'},
        name2:{value:"开课吧"},
        name3:{value:"大圣"},
        thing4:{value:'学习三体思想'}
      },
      {
        id:1,
        name1:{value:'JS高级程序设计'},
        name2:{value:"开课吧"},
        name3:{value:"大圣"},
        thing4:{value:'前端入门'}
      },
      {
        id:1,
        name1:{value:'vue权威指南'},
        name2:{value:"开课吧"},
        name3:{value:"大圣"},
        thing4:{value:'找工作利器'}
      }
    ]
  }
  handleClick(item){
    delete item.id
    wx.requestSubscribeMessage({
      tmplIds:[tmplid],
      success(res){
        if(res.errMsg=="requestSubscribeMessage:ok"){
          wx.cloud.callFunction({
            name:'subscribe',
            data:{
              data:item,
              templateId:tmplid
            }
          })
        }
      }
    })
  }
  render(){
    return <View>

        {this.state.books.map(v=>{
          return <AtCard 
          title={v.name1.value} thumb={v.image}
          note={v.name2.value}
          >
            {v.thing4.value}
            <Button type="primary" onClick={()=>this.handleClick(v)}>订阅</Button>
          </AtCard>
        })}
    </View>
  }
}

export default Subscribe