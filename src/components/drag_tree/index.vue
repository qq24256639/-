<template>
    <ul class="list">
        <li v-for="(item, n) in model" :key="n" :id="item.id"     
        :class="{selected_line:item.selected,pointer:!editor}" 
        :draggable="editor ? true : false"
        @dragstart="dragStart"
        @dragover="dragOver"
        @drop.stop="dropPlus">
            <div class="line_vlue" @click.stop="lineSelected(item)">
                <!--<i class="el-icon-d-caret" v-if="editor"></i>-->
                <i class="show" :class="{'el-icon-minus':item.show,'el-icon-plus':!item.show}" 
                    v-if="item.has_sub" 
                    @click.stop="toggle(item)">
                </i>
                <span>{{item.name}}</span>
                <i class="edit el-icon-edit" @click.stop="edit(item)" v-if="editor"></i>
            </div>
            <transition name="fade">
                <template v-if="editor">
                    <vue-drag-tree v-if="item.children&&item.show" :model="item.children"
                    @edit="edit"
                    @select="select"
                    @cancelSelect="cancelSelect"
                    @userDrop="triggerDrop"
                    @dragStart="triggerDragStart"
                    :editor="editor">
                    </vue-drag-tree>
                </template>
                <template v-else>
                    <vue-drag-tree v-if="item.children&&item.show" :model="item.children"
                    @select="select"
                    @cancelSelect="cancelSelect"
                    :editor="editor">
                    </vue-drag-tree>
                </template>
            </transition>
        </li>
    </ul>
</template>
<script>
import { getOrganizations } from '@/api/system'
export default {
	name: 'VueDragTreeCom42',
	data() {
		return {
			open: false,
			isClicked: false,
			styleObj: {
				background: 'white'
			},
			start: null,
			end: null,
			cancel_drop: []
		}
	},
	props: {
		model: Array,
		editor: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		toggle(item) {
			if (item.has_sub && !item.feach) {
				item.loading = !!1
				return getOrganizations(item.id).then(res => {
					item.feach = !!1
					this.$set(item, 'children', this.initData(res.data, item))
					this.$set(item, '__children', [...this.initData(res.data, item)])
					this.changeSelect(item)
				})
			}
			this.changeSelect(item)
		},
		changeSelect(item) {
            // if(!this.editor){
            //     return item.select_show = !item.select_show
            // }
			item.show = !item.show
		},
		initData(data, parent) {
			data.forEach(i => {
				this.$set(i, 'show', false)
				this.$set(i, 'select_show', false)
				this.$set(i, 'selected', false)
				i['__has_sub'] = i.has_sub
				i.parent = parent
				i.__parent = parent
			})
			return data
		},
		lineSelected(item) {
			if (item.selected) {
				item.selected = !1
				return this.$emit('cancelSelect', item)
			}
			this.cancelAllSelected(item)
			this.select(item)
		},
		select(item) {
			this.$emit('select', item)
		},
		cancelAllSelected(item) {
			const root = this.findRoot()
			this.cancelSelectedData(root.model)
			item.selected = !!1
		},
		cancelSelectedData(rootData) {
			let i = 0
			for (; i < rootData.length; i++) {
				rootData[i].selected = !1
				if (rootData[i].children && rootData[i].children.length > 0) {
					this.cancelSelectedData(rootData[i].children)
				}
			}
		},
		findRoot() {
            // 返回Tree的根,即递归Tree时的最顶层那个vue-drag-tree组件
			let ok = false
			let that = this
			while (!ok) {
                // 如果父组件没有model属性，说明父组件是顶级组件递归调用发生时的第一个组件。
                // Warning: 因为是判断model属性是否存在，所有在别人使用该组件时，属性名必须得是data
				if (!that.$parent.model) {
					ok = true
				} else {
					that = that.$parent
				}
			}
			return that
		},
		findDropData(rootTree, startId, endId) {
			const rootData = rootTree.model
			this.findIdData(rootData, startId, 'start')
			this.findIdData(rootData, endId, 'end')
			return {
				start_item: this.start.item,
				start_group: this.start.group,
				start_index: this.start.index,
				end_index: this.end.index,
				end_group: this.end.group,
				end_item: this.end.item
			}
		},
		findIdData(rootData, id, label) {
			let i = 0
			for (; i < rootData.length; i++) {
				if (rootData[i].id === id) {
					this[label] = {
						item: rootData[i],
						group: rootData,
						index: i
					}
				} else if (rootData[i].children && rootData[i].children.length > 0) {
					this.findIdData(rootData[i].children, id, label)
				}
			}
		},
		dragStart(e) {
			this.triggerDragStart()
			var id = +e.target.id
			// var data = this.model.find(i => i.id === id)
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.setData('id', id)
			return true
		},
		triggerDragStart() {
			this.$emit('dragStart')
		},
		dragOver(e) {
			e.preventDefault()
			return true
		},
		dropPlus(e) {
			const rootTree = this.findRoot()
			const start_id = +e.dataTransfer.getData('id')
			const end_id = this.getEndId(e.path)
			const dropData = this.findDropData(rootTree, start_id, +end_id)

			if (dropData.start_group === dropData.end_group) { // 同一数组拖拽为排序
				const start = dropData.start_item
				dropData.start_item.droped = true
				dropData.end_item.droped = true
				dropData.start_group[dropData.start_index] = dropData.end_item
				dropData.end_group[dropData.end_index] = start
				dropData.start_group.splice()
				dropData.end_group.splice()
			} else {
                // 把from节点插入到当前层级同级上一个
				dropData.end_group.splice(dropData.end_index, 0, dropData.start_item)
                // 把from节点从之前的节点删除
				dropData.start_group.splice(dropData.start_index, 1)
                // alert(dropData.start_index)
				if (dropData.start_group.length <= 0) {
					dropData.start_item.parent.has_sub = false
				}
				const endParent = dropData.end_item.parent
				if (endParent) {
					dropData.start_item.parent = dropData.end_item.parent
				} else {
					dropData.start_item.parent = null
				}
				dropData.start_item.droped = true
			}

			this.triggerDrop()
		},
		triggerDrop() {
			this.$emit('userDrop')
		},
		getEndId(path) {
			let i = 0
			let id = null
			for (;i < path.length; i++) {
				if (path[i].id && /^[0-9]+$/.test(path[i].id)) {
					id = path[i].id
					break
				}
			}
			return id
		},
		edit(item) {
			this.$emit('edit', item)
		},
		cancelSelect(item) {
			this.$emit('cancelSelect', item)
		}
	}
}
</script>

<style scoped>
.item {
    cursor: pointer;
}
.show{
    color: #fff;
	background: #7E86A6;
	padding: 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    margin-left: 6px;
    margin-right: 2px;
    cursor: pointer;
}
.el-icon-d-caret{
    cursor: pointer;
    vertical-align: middle;
}
.list{
    margin-left:20px;
}
.list li{
    margin-top:10px;
    cursor: all-scroll;
    line-height: 1;
}
.list .pointer{
    cursor: pointer;
}
.line_vlue{
    padding: 6px;
    background: #f8faff;
    border:1px solid #e5eaf1;
}
.selected_line>.line_vlue{
    background: #eef0f5;
    border: 1px solid #c0cee2;
}
.edit{
    float: right;
    color: #409EFF ;
    font-size: 1.2em;
    cursor: pointer;
}
.fade-enter-active {
  transition: all .3s;
}
.fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
