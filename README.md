# tjcis

> a vue.js project made by team water-men

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目前的组件结构 ()中表示待增加
        ---Login
        |  
 Welcom----Register


        --HomePage
        |
        --CheckCourseAll-------
        |                     |
 Home-----CheckCourseDepart-------CourseList
        |                     |
        --CheckCourseType------
        |
        --UserCenter  
        |              ----(CourseDetail 显示课程主要信息如课程号 授课老师等)
        |              |
        --(CourseInfo)-----(CommentList 评论列表)
        |              |
        |              ----(WriteComment 写评论)
        |              |
        |              ----(RelatedList 相关推荐课程)
        |
        --(CommentDetail)

## 目前思路
### CourseList如何跳转到对应课程页面CourseInfo
因为想保持左边导航栏不动，右边内容变化
CourseList中点击了相应课程后传递课程参数（如课号）给父组件CheckCourseXXX
CheckCourseXXX再传递给Home，Home将currentContent设置为CourseInfo，并将课程参数传递给CourseInfo

### CommentList如何跳转到评论详情CommentDetail
CommentList中点击了某条评价之后传递评价参数（如评价编号）给父组件CourseInfo
CourseInfo再传递给Home，Home将currentContent设置为CourseInfo，并将课程参数传递给所有子组件
        
                       
                       