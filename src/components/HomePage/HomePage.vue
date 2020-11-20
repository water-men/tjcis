<template>
  <div>
    <a-card title="根据您近期的浏览和评价，为您推荐以下课程" align="left">
      <a-row :gutter="16">
        <a-col v-for="course in recommendlist" :key="course.id" :bordered="true" :span="8">
          <a-card :title="course.Cname" hoverable>
            课程名:{{ course.Cname }}
            <br />
            授课老师:{{ course.Tname }}
            <br />
            课程标签:
            <a-tag
              v-for="tag in course.tags"
              :key="tag"
              :color="tag === tag.length > 5 ? 'geekblue' : 'green'"
            >{{ tag.toUpperCase() }}</a-tag>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <br />
    <a-card>
      <a-progress :percent="75" :format="percent => `${percent} Days`" type="circle" />
      <a-progress :percent="100" :format="() => 'Done'" type="circle" />
      <a-progress :percent="75" type="circle">
        <template #format="percent">
          <span style="color: red">{{ percent }}</span>
        </template>
      </a-progress>
    </a-card>
    <br />
    <a-card>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card hoverable>
            <a-statistic
              :value="12"
              :value-style="{ color: '#3f8600' }"
              title="我的评价"
              suffix="条"
              style="margin-right: 50px"
            >
              <template #prefix>
                <a-icon type="arrow-right" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <a-statistic
              :value="5"
              :value-style="{ color: '#cf1322' }"
              title="我的收藏"
              suffix="个"
            >
              <template #prefix>
                <a-icon type="arrow-right" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <a-statistic
              :value="5"
              :value-style="{ color: '#cf1322' }"
              title="待办"
              suffix="个"
            >
              <template #prefix>
                <a-icon type="arrow-right" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      recommendlist:[
        {id:1,Cname:'C1', Tname:'zs1',tags:[
        'hello',
        'bye'
      ]},
        {id:2,Cname:'C2', Tname:'zs2',tags:[
        'hello1',
        'bye1'
      ]},
        {id:3,Cname:'C3', Tname:'zs3',tags:[
        'hello2',
        'bye2'
      ]},
      ],
    }
  }
}
</script>

<style scoped>
div.ant-progress-circle,
div.ant-progress-line {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>