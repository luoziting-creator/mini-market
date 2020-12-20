// pages/category/w-left-menu-list/w-left-menu-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftMenuList:{
      type:Array,
      value:[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 被点击的左侧的菜单
    currentIndex:0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e){
      // 改变当前的index
      console.log(e);
      const currentIndex =e.currentTarget.dataset.index
      this.setData({
        currentIndex
      })
      // 2.将最新的currentIndex传递到分类页面
      this.triggerEvent('menuclick',{currentIndex},{})
    }

  }
})
