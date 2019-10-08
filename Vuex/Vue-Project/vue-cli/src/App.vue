<template>
  <div id="app">
    <header-nav></header-nav>	
  	<router-view></router-view>
  	<footer-nav></footer-nav>
  </div>
</template>

<script>
import headerNav from '../src/components/header-nav'
import footerNav from '../src/components/footer-nav'

  export default{
  components: {
    headerNav,
    footerNav
  },
    data(){
      return{
        index:'/home'
      }
    },
  }
</script>

<style scoped>
 ul{
  list-style: none;
  text-align: center;  
}

a{
  text-decoration: none; /* 去掉下划线 */
  cursor: pointer;
  color: #000;
  padding: 0 4px;
}
.active{
    font-weight: bold;
    border-bottom: 2px solid #000;
}
</style>
