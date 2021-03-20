<template>
  <a-card>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="日程记录" >
        <a-calendar @select="handleSelect">
          <ul slot="dateCellRender" slot-scope="value" class="events">
            <li v-for="item in getListData(value)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </ul>
          <template slot="monthCellRender" slot-scope="value">
            <div v-if="getMonthData(value)" class="notes-month">
              <section>{{ getMonthData(value) }}</section>
              <span>日程数</span>
            </div>
          </template>
        </a-calendar>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
export default {
  data(){
    return{
      visiable: false,
    }
  },
  methods: {
    getListData(value) {
      let listData;
      if(value.year() == 2021)
      {
        if(value.month() == 2)
        {
          if(value.date() == 15)
          {
            listData = [
              {type: 'success',content: '交结题报告'},
            ]
          }
          if(value.date() == 20)
          {
            listData = [
              {type: 'warning',content: 'SITP答辩'},
            ]
          }
        }
        else if(value.month() === 3)
        {
          if(value.date() === 23)
          {
            listData = [
              {type: 'warning',content: '毕业设计中期检查'},
            ]
          }
        }
        else if(value.month() === 4)
        {
          if(value.date() === 10)
          {
            listData = [
              {type: 'warning',content: '写毕设论文'},
            ]
          }
        }
        else if(value.month() === 5)
        {
          if(value.date() === 10)
          {
            listData = [
              {type: 'warning',content: '毕设答辩'},
            ]
          }
          if(value.date() === 30)
          {
            listData = [
              {type: 'warning',content: '搬砖'},
            ]
          }
        }
      }
      
      return listData || [];
    },
    getMonthData(value) {
      switch(value.month())
      {
        case 3:
          return 1;
        case 4:
          return 1;
        case 5:
          return 1;
        case 6:
          return 2;
        default:
      }
    },
  },
};
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>