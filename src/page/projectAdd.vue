<template>
  <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=36QBZ-26U34-WJDUH-D677E-F34ZS-EOFS4&referer=myapp">
  </iframe>
</template>
<script>
  window.addEventListener('message' , function (event) {
    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
    var  loc=event.data;
    if (loc && loc.module === 'locationPicker') {
      console.log('location', loc);
      localStorage.address = loc.poiaddress;
      localStorage.reAdd = loc.poiaddress;
    }
  }, false)
</script>
<style>
</style>
