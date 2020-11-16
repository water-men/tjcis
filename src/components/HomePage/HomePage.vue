<template>
  <div>
    <a-progress :percent="75" :format="percent => `${percent} Days`" type="circle" />
    <a-progress :percent="100" :format="() => 'Done'" type="circle" />
    <a-progress :percent="75" type="circle">
      <template #format="percent">
        <span style="color: red">{{ percent }}</span>
      </template>
    </a-progress>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="11.28"
            :precision="2"
            :value-style="{ color: '#3f8600' }"
            title="Feedback"
            suffix="%"
            style="margin-right: 50px"
          >
            <template #prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="9.3"
            :precision="2"
            :value-style="{ color: '#cf1322' }"
            title="Idle"
            suffix="%"
            class="demo-class"
          >
            <template #prefix>
              <a-icon type="arrow-down" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
div.ant-progress-circle,
div.ant-progress-line {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>