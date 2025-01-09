<template>
<div class="ui floating message">
  <i class="close icon" @click="$emit('close')"></i>
  <div class="header">
    制作搜索：{{ title }} ( {{matches.length}} )
  </div>
  <div class="ui divider"></div>
  <div>
    <sorttable class="ui sortable celled table" ref="table" v-if="matches.length !== 0" :data="matches"
      head="名称 用途 等级 最高等级 贡献">
    </sorttable>
    <ul class="list" v-else>
      <li>No result.</li>
    </ul>
  </div>
  
</div>
</template>

<script>
module.exports = {
  props: ["k"],
  data: ()=>({
    title: null,
    matches: []
  }),
  methods: {
    update: function(title, matches){
      this.title = title
      this.matches = matches
      if(this.$refs.table) this.$refs.tableupdate();
      //$(this.$refs.table).tablesort()
    }
  },
  mounted: function(){
    this.$emit("init")
  }
}
</script>

<style>
.cpval-container {
  display: flex;
}
.cpval-content {
  flex: 1;
}
</style>


