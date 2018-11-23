import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../components/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  { path: '/404',
    name: "页面找不到了...",
    component: _import('404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/zg',
    name: '消息中心',
    hidden: true,
    children: [
      {
        path: 'inbox',
        component: _import('work_bench/zg') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

function generateDashboardRouter () {
  let routers = [
    {
    path: 'diagno',
    name: '诊改大屏',
    icon: 'zonghe',
    component: _import('dashboard/diagno'),
    label: 'menu-dashboard_diagno-107'
    },
    {
      path: 'teaching',
      name: '教学大屏',
      icon: 'zonghe',
      component: _import('dashboard/teaching'),
      label: 'menu-dashboard_teaching-108'
    },
    {
      path: 'admin',
      name: '行政楼大屏',
      icon: 'zonghe',
      component: _import('dashboard/admin'),
      label: 'menu-dashboard_admin-116'
    }]

  // todo 子路由表由后端返回，label全部交后端维护

  for (let i = 0; i < 7; i++) {
    let number = (i + 1).toString()
    let label_number = (i + 109).toString()
    let templ = {
      path: 'apartment/:id',
      component: _import('dashboard/apartment')
      // hidden: true
    }
    templ.path = number
    templ.name = '宿舍大屏-' + number +  '号公寓'
    templ.label = 'menu-dashboard_apartment' + number  + '-' + label_number
    routers.push(templ)
  }

  return routers
}

export const asyncRouterMap = [
  {
    path: '/workbench',
    component: Layout,
    redirect: 'noredirect',
    name: '诊改工作台',
    icon: 'work',
    label: 'module-workbench-1',
    children: [
      {
        path: 'zg',
        name: '诊改工作台',
        component: _import('work_bench/zg'),
        label: 'menu-workbench-2'
      },
      {
        path: 'operate',
        name: '管理驾驶舱',
        component: _import('work_bench/operate_workbench'),
        label: 'menu-workbench-4'
      },
      // {
      //   path: 'task_board',
      //   name: '我的任务',
      //   component: _import('work_bench/task_board'),
      //   label: 'menu-workbench-1'
      // }
      {
        path: 'task_board',
        name: '我的任务',
        component: _import('project/task_page')
      },
      {
        path: 'add',
        name: '新建项目',
        component: _import('project/add'),
        label: 'menu-workbench-3'
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: 'noredirect',
    name: '项目中心',
    icon: 'project',
    label: 'module-project-9',
    children: [
      {
        path: 'index',
        name: '任务统计',
        component: _import('project/index'),
        label: 'menu-project_index-117'
      }
    ]
  },
  {
    path: '/college',
    component: Layout,
    redirect: 'noredirect',
    name: '学校管理中心',
    icon: 'xuexiaojieshao',
    label: 'module-college_evolution_center-2',
    children: [
      {
        path: 'portrait',
        name: '学校画像',
        component: _import('college/portrait'),
        label: 'menu-college_portrait-120'
      },
      {
        path: 'goal',
        meta: {
          title: '目标体系'
        },
        top: true,
        component: _import('college/goal'),
        label: 'menu-college_goal-129'
      },
      {
        path: 'standard',
        meta: {
          title: '标准体系'
        },
        top: true,
        component: _import('college/standard'),
        label: 'menu-college_standard-130'
      },
      {
        path: 'guarantee',
        meta: {
          title: '保障体系'
        },
        top: true,
        component: _import('college/guarantee'),
        label: 'menu-college_guarantee-131'
      },
      {
        path: 'diagno',
        meta: {
          title: '智能诊断'
        },
        top: true,
        component: _import('college/diagno'),
        label: 'menu-college_diagnose-132'
      },
      {
        path: 'report',
        meta: {
          title: '诊改报告'
        },
        top: true,
        component: _import('college/report'),
        label: 'menu-college_report-133'
      }
    ]
  },
  {
    path: '/major',
    component: Layout,
    redirect: 'noredirect',
    name: '专业建设中心',
    icon: 'major',
    label: 'module-major_evolution_center-3',
    children: [
      {
        path: 'list',
        name: '专业列表',
        component: _import('major/list'),
        label: 'menu-major_list-123'
      },
      {
        path: 'portrait',
        name: '专业画像',
        component: _import('major/portrait'),
        label: 'menu-major_portrait-121'
      },
      {
        path: 'goal',
        meta: {
          title: '目标体系'
        },
        top: true,
        component: _import('college/goal'),
        label: 'menu-major_goal-134'
      },
      {
        path: 'standard',
        meta: {
          title: '标准体系'
        },
        top: true,
        component: _import('college/standard'),
        label: 'menu-major_standard-135'
      },
      {
        path: 'guarantee',
        meta: {
          title: '保障体系'
        },
        top: true,
        component: _import('college/guarantee'),
        label: 'menu-major_guarantee-136'
      },
      {
        path: 'diagno',
        meta: {
          title: '智能诊断'
        },
        top: true,
        component: _import('college/diagno'),
        label: 'menu-major_diagnose-137'
      },
      {
        path: 'report',
        meta: {
          title: '诊改报告'
        },
        top: true,
        component: _import('college/report'),
        label: 'menu-major_report-138'
      },
      {
        path: ':id',
        meta: {
          title: '专业画像'
        },
        component: _import('major/portrait'),
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: 'noredirect',
    name: '课程建设中心',
    icon: 'EXCEL',
    label: 'module-course_evolution_center-4',
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: _import('course/list'),
        label: 'menu-course_list-126'
      },
      {
        path: 'portrait',
        name: '课程画像',
        component: _import('course/portrait'),
        label: 'menu-course_portrait-122'
      },
      {
        path: 'goal',
         meta: {
          title: '目标体系'
        },
        top: true,
        component: _import('college/goal'),
        label: 'menu-course_goal-139'
      },
      {
        path: 'standard',
        meta: {
          title: '标准体系'
        },
        top: true,
        component: _import('college/standard'),
        label: 'menu-course_standard-140'
      },
      {
        path: 'guarantee',
        meta: {
          title: '保障体系'
        },
        top: true,
        component: _import('college/guarantee'),
        label: 'menu-course_guarantee-141'
      },
      {
        path: 'diagno',
        meta: {
          title: '智能诊断'
        },
        top: true,
        component: _import('college/diagno'),
        label: 'menu-course_diagnose-142'
      },
      {
        path: 'report',
        meta: {
          title: '诊改报告'
        },
        top: true,
        component: _import('college/report'),
        label: 'menu-course_report-143'
      },
      {
        path: ':id',
        meta: {
          title: '课程画像'
        },
        component: _import('course/portrait'),
        hidden: true
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: 'noredirect',
    name: '教师发展中心',
    icon: 'teacher',
    label: 'module-teacher_development_center-5',
    children: [
      {
        path: 'list',
        name: '教师列表',
        component: _import('teacher/list'),
        label: 'menu-teacher_list-127'
      },
      {
        path: 'portrait',
        name: '教师画像',
        component: _import('teacher/portrait'),
        label: 'menu-teacher_portrait-124'
      },
      {
        path: 'goal',
        meta: {
          title: '目标体系'
        },
        top: true,
        component: _import('college/goal'),
        label: 'menu-teacher_goal-144'
      },
      {
        path: 'standard',
        meta: {
          title: '标准体系'
        },
        top: true,
        component: _import('college/standard'),
        label: 'menu-teacher_standard-145'
      },
      {
        path: 'guarantee',
        meta: {
          title: '保障体系'
        },
        top: true,
        component: _import('college/guarantee'),
        label: 'menu-teacher_guarantee-146'
      },
      {
        path: 'diagno',
        meta: {
          title: '智能诊断'
        },
        top: true,
        component: _import('college/diagno'),
        label: 'menu-teacher_diagnose-147'
      },
      {
        path: 'report',
        meta: {
          title: '诊改报告'
        },
        top: true,
        component: _import('college/report'),
        label: 'menu-teacher_report-148'
      },
      {
        path: ':id',
        name: '教师个人画像',
        component: _import('teacher/portrait_personal'),
        hidden: true
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: 'noredirect',
    name: '学生发展中心',
    icon: 'student',
    label: 'module-student_development_center-7',
    children: [
      {
        path: 'list',
        name: '学生列表',
        component: _import('student/list'),
        label: 'menu-student_list-128'
      },
      {
        path: 'portrait',
        name: '学生画像',
        component: _import('student/portrait'),
        label: 'menu-student_portrait-125'
      },
      {
        path: 'goal',
        meta: {
          title: '目标体系'
        },
        top: true,
        component: _import('college/goal'),
        label: 'menu-student_goal-149'
      },
      {
        path: 'standard',
        meta: {
          title: '标准体系'
        },
        top: true,
        component: _import('college/standard'),
        label: 'menu-student_standard-150'
      },
      {
        path: 'guarantee',
        meta: {
          title: '保障体系'
        },
        top: true,
        component: _import('college/guarantee'),
        label: 'menu-student_guarantee-151'
      },
      {
        path: 'diagno',
        meta: {
          top: true,
          title: '智能诊断'
        },
        top: true,
        component: _import('college/diagno'),
        label: 'menu-student_diagnose-152'
      },
      {
        path: 'report',
        meta: {
          title: '诊改报告'
        },
        top: true,
        component: _import('college/report'),
        label: 'menu-student_report-153'
      },
      {
        path: ':id',
        name: '学生个人画像',
        component: _import('student/portrait_personal'),
        hidden: true
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'noredirect',
    name: '数据大屏',
    icon: 'dashboard',
    label: 'module-dashboard-8',
    children: generateDashboardRouter()
  },
  {
    path: '/data',
    component: Layout,
    redirect: 'noredirect',
    name: '数据管理',
    icon: 'data',
    label: 'module-data_management_center-10',
    children: [
      {
        path: 'source',
        name: '数据中心',
        label: 'menu-data_source-118',
        component: _import('data/source')
      },
      {
        path: 'indicators',
        name: '指标库',
        label: 'menu-indicator_manage-119',
        component: _import('data/indicator')
      }
    ]
  },
  {
    path: '/system_manage',
    component: Layout,
    redirect: 'noredirect',
    icon: 'system',
    label: 'module-system_manage-6',
    name: '系统管理',
    children: [
      {
        path: 'department_manage',
        name: '组织架构管理',
        label: 'menu-system_manage-85',
        component: _import('system_manage/department_manage')
      },
      {
        path: 'password_manage',
        name: '密码管理',
        label: 'menu-system_manage-83',
        component: _import('system_manage/password_manage')
      },
      {
        path: 'role_manage',
        name: '角色管理',
        label: 'menu-system_manage-84',
        component: _import('system_manage/role_manage')
      },
      {
        path: 'info_manage',
        name: '消息配置',
        label: 'menu-system_message_config-103',
        component: _import('system_manage/notify_todo_set')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
