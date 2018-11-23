<template>
	<section>
		<el-menu
      class="navbar"
      mode="horizontal">
			<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <!--顶部操作区, 从数据中获取，名称和路由地址，用于页面导航，-->
      <ul class="pannel-wrapper" v-if="nav.children && nav.children.length > 0">
        <router-link
          :to="nav.path + '/' + item.path"
          v-bind:class="(nav.path + '/' + item.path) === $route.path ? 'selected' : ''"
          v-for="(item, index) in nav.children"
          v-if="item.top"
          :key="index">{{ item.meta.title}}
        </router-link>
      </ul>

      <!--搜索框-->
      <el-autocomplete
        placeholder="搜索"
        class="search-box"
        :fetch-suggestions="querySearch"
        popper-class="suggestings"
        @select="handleSelect"
        v-model="keyword">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>

		  <!--消息提醒-->
				<el-dropdown
				trigger="hover"
				placement="bottom"
        class="alert"
				@visible-change='getTodos'>
				<el-badge :value="todo_num" class="item" :max="99">
					<i class="el-icon-bell"></i>
				</el-badge>
				<el-dropdown-menu class="info_outline" slot="dropdown">
					<p class="info_total">共 {{todo_num}} 条</p>
					<el-dropdown-item divided
						class="info_item"
						  v-for="item in todo_list"
						  :key="item.value">
						<router-link :to="`${item.url}`">
							<div>
								{{item.content}}
								<p class="time">
									{{item.create_time}}
								</p>
							</div>
						</router-link>
					</el-dropdown-item>
					<router-link :to="`/inbox?tab=first`">
						<div class="last">
							查看更多
						</div>
					</router-link>
				</el-dropdown-menu>
			</el-dropdown>
      <!--通知-->
			<el-dropdown
				trigger="hover"
				placement="bottom"
        class="message"
				@visible-change='getInfos'
				:hide-on-click="false">
				<el-badge :value="info_num" class="el-dropdown-link item" :max="99">
					<i class="el-icon-message"></i>
				</el-badge>
				<el-dropdown-menu class="info_outline" slot="dropdown">
					<p class="info_total">共 {{info_num}} 条</p>
					<el-dropdown-item divided
									  class="info_item"
									  v-for="item in info_list"
									  :key="item.value">
						<span @click='setRead(item)'>
							{{item.content}}
						</span>
						<p class="time">
							{{item.create_time}}
						</p>
					</el-dropdown-item>
					<router-link :to="`/inbox?tab=second`">
						<div class="last">
							查看更多
						</div>
					</router-link>
				</el-dropdown-menu>
			</el-dropdown>

      <!--用户和更多操作-->
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
          <!--<img class="user-avatar" src="static/images/min_logo.png">-->
					<span class="user-name">{{this.$store.getters.user_info.realname}}</span>
					<span class="right">
						<i class="el-icon-caret-bottom"></i>
					</span>
				</div>
				<el-dropdown-menu class="user-dropdown" slot="dropdown">
					<router-link class='inlineBlock' to="/">
						<el-dropdown-item>
							消息中心
						</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<span @click="passwordModifyVisble = true">修改密码</span>
					</el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" class="logout">退出登录</span>
          </el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-menu>
		<el-dialog title="修改密码" :visible.sync="passwordModifyVisble" style="z-index: 9999;">
			<el-form :model="form" ref="form" :rules="rules" label-width="100px">
				<el-form-item label="原密码" prop="old_password">
					<el-input v-model="form.old_password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="confirm_password">
					<el-input v-model="form.confirm_password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="reset('form')">取 消</el-button>
				<el-button type="primary" @click="putPw('form')">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { putPassword } from '@/api/system'
import { getMessages } from '@/api/login'
import { getNotifies, putNotice } from '@/api/notify'
let timeout
export default {
	data() {
		return {
      keyword: '',
			passwordModifyVisble: false,
			form: {
				old_password: null,
				password: null,
				confirm_password: null
			},
			rules: {
				old_password: [
					{ required: true, message: '请输入原密码', trigger: 'change' },
					{ message: '密码需为6~16位之间的数字和字母的组合', trigger: 'change',
						validator: (rule, value, callback) => {
							const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
							if (!reg.test(value)) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				],
				password: [
					{ required: true, message: '请输入新密码', trigger: 'change' },
					{ message: '密码需为6~16位之间的数字和字母的组合', trigger: 'change',
						validator: (rule, value, callback) => {
							const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
							if (!reg.test(value)) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				],
				confirm_password: [
					{ required: true, message: '请再次输入新密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '两次输入的密码不一致', trigger: 'blur',
						validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								return callback(new Error(rule.message))
							}
							return callback()
						}
					}
				]
			},
			info_list: [],
			todo_list: [],
			data: null,
			todo_num: 0,
			info_num: 0
		}
	},
	components: {
		Hamburger
	},
	// sockets: {
	// 	connect() {
	// 		this.$socket.emit('joined', { Authorization: this.$store.getters.token })
	// 		console.log('socket connected')
	// 	},
	// 	messages(res) {
	// 		this.todo_num = res.backlogs
	// 		this.info_num = res.notices
	// 	}
	// },
	methods: {
    querySearch(queryString, cb) {
    	//todo 实现搜索框对任务、指标、画像、报告等进行搜索
      cb([
        {
        	nmae: 'aaa'
        },
        {
          nmae: 'bbb'
        }
      ])
    },
    handleSelect() {},
		getTodos() {
			this.todo_list = []
			return getNotifies('backlogs').then(res => {
				const data = res.data
				for (const i in data) {
					if (!data[i].finished) {
						this.todo_list.push(data[i])
					}
				}
				if (this.todo_list.length > 5) {
					this.todo_list = this.todo_list.slice(0, 5)
				}
			}).catch(err => {
				this.$error(err)
			})
		},
		getInfos() {
			this.info_list = []
			return getNotifies('notices').then(res => {
				const data = res.data
				for (const i in data) {
					if (!data[i].viewed) {
						this.info_list.push(data[i])
					}
				}
				if (this.info_list.length > 5) {
					this.info_list = this.info_list.slice(0, 5)
				}
			}).catch(err => {
				this.$error(err)
			})
		},
		toggleSideBar() {
			this.$store.dispatch('ToggleSideBar')
		},
		logout() {
			this.$store.dispatch('FedLogOut').then(() => {
				location.reload() // 为了重新实例化vue-router对象 避免bug
			})
		},
		putPw(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					putPassword(this.$store.getters.user_info.id, this.form).then(res => {
						this.$message({
							type: 'success',
							message: '成功修改密码!'
						})
						this.passwordModifyVisble = false
						this.$refs[formName].resetFields()
					}).catch(err => {
						this.$error(err)
					})
				} else {
					return false
				}
			})
		},
		reset(formName) {
			this.passwordModifyVisble = false
			this.$refs[formName].resetFields()
		},
		setRead(item) {
			if (item.viewed === false) {
				putNotice(`${item.id}/viewed`).then(res => {
					this.getPollingMessage()
					this.getInfos()
				}).catch(err => {
					this.$error(err)
				})
			} else {
				putNotice(`${item.id}/not_viewed`).then(res => {
					this.getPollingMessage()
					this.getInfos()
				}).catch(err => {
					this.$error(err)
				})
			}
		},
		getPollingMessage() {
			if (this.user_info) {
				getMessages().then((res) => {
					const data = res.data
					this.todo_num = data.backlogs
					this.info_num = data.notices
					clearTimeout(timeout)
					timeout = setTimeout(() => {
						this.getPollingMessage()
					}, 10000)
				}).catch(err => {
					this.$error(err)
				})
			}
		}
	},
	created() {
		window.modifyPw = () => {
			this.passwordModifyVisble = true
		}
		window.getPollingMessage = this.getPollingMessage
		this.getPollingMessage()

    // todo 暂时使用该方式实现顶部导航路由表的获取，重构时优化成固定在头部
    this.$store.commit('SET_NAV', this.permission_routers.filter(router => this.$route.path.split('/')[1] === router.path.split('/')[1])[0])
	},
	computed: {
		...mapGetters([
			'sidebar',
      'user_info',
      'nav',
      'permission_routers'
		])
	}
}
</script>

<style lang="scss" scoped>
	@import "src/styles/variables.scss";
  .navbar {
    height: 50px;
    display: flex;
    line-height: 50px;
    border-radius: 0 !important;
    background: $navbar;
    color:#FFFFFF;
    position: fixed;
    width: 100%;
    z-index: 99;
    border-bottom:none;
    top:0;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 0 0 20px;
      outline:none;
    }
    .pannel-wrapper {
      display: flex;

      a {
        margin-left: 20px;
        color: #ffffff;
        font-weight: 400;
        line-height: 50px;
        width: 80px;
        text-align: center;
        display: inline-block;
      }

      a:visited, a:focus, a:hover, a:active, a.selected {
        background-color: rgba(9, 30, 66, 0.48);
        border-color: rgba(9, 30, 66, 0.48);
        color: #DEEBFF;
      }

    }

    .search-box {
      width: 220px;
      position: inherit;
      right: 18rem;
    }

    .suggestings {

    }

    .el-input__suffix {
      height: 100px;
    }

    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
    }

    .alert {
      z-index: 100;
      right: 14em;
      position: inherit;
    }

    .message {
      z-index: 100;
      right: 10em;
      position: inherit;
    }

    .avatar-container {
      z-index: 999;
      height: 50px;
      display: inline-block;
      position: inherit;
      top: 0;
      right: 2em;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          height:30px;
          .user-avatar {
            height: 30px;
            border-radius: 10px;
          }
          .user-name{
            color: #ffffff;
            font-size: 14px;
          }
          .right {
            display: inline-block;
            position: relative;
            .el-icon-caret-bottom {
              display: inline-block;
              position: relative;
              left: 5px;
              padding-right: 8px;
              margin-right: 8px;
              font-size: 18px;
              color: #FFFFFF;
            }
          }
        }
      }
  }
	.logout{
		display:inline-block;
		font-size:14px;
	}
	.item{
		font-size: 20px;
		margin-left: 42px;
		outline: none;
		cursor: pointer;
		color: #ffffff;
	}
	.info_outline{
		width: 200px;
	}
	.info_total{
		color: #333333;
		line-height: 30px;
		text-align: center;
	}
	.info_item{
		line-height: 24px;
	}
	.last{
		text-align: center;
		cursor: pointer;
		background: #409EFF;
		color: #ffffff;
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 14px;
		margin-top: 10px;
	}
	.info_outline{
		padding-bottom: 0;
	}
.time{
	font-size: 12px;
	text-align: right;
}
</style>

