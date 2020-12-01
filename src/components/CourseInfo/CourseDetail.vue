<template>
  <a-tabs default-active-key="1" align="left" size="large">
    <a-tab-pane key="1" tab="课程详情" >
      <a-row>
        <a-col :span="9" >
          <a-card hoverable style="width: flex;" >
            <img
              slot="cover"
              alt="图片无法显示"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
            <a-card-meta title="课程名称">
              <template slot="description">
                {{ selectedCourse.Cname }}
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="1">
        </a-col>
        <a-col :span="14">
          <a-descriptions :column="{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }" layout="vertical" bordered>
            <a-descriptions-item label="课号">
              <p class="descript"><span>{{ selectedCourse.Cno }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="授课老师">
              <p class="descript"><span>{{ Tname }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="开课院系">
              <p class="descript"><span>{{ Depart }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="课程类别">
              <p class="descript"><span>{{ Ctype }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="课程标签" span="2"> 
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="tag.length > 5 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="综合评分" span="2"> 
              <a-rate :default-value="3" :value="Tscore/2" disabled allow-half />
              <a-statistic
                :value="Tscore"
                :precision="0"
                :value-style="{ color: '#3f8600' }"
                suffix="/10"
                style="margin-right: 50px"
              >
                <template #prefix>
                  <a-icon type="trophy" />
                </template>
              </a-statistic>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  props: {
    selectedCourse: {
      type: Object,
      default: () => ({
        Cno:'',
        Cname:'',
      }),
      require: true
    },
  },
  data() {
    return {
    Tname:"张三",
    Depart:"电子与信息工程学院",
    Ctype:"专业必修课",
    tags: ['nice', 'developer','讲课好','作业较少'],
    Tscore: 9,
  }
}
}

</script>

<style>

</style>