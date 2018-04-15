//定义七牛云img路径
var IMG_URL = 'http://oe7bp6qor.bkt.clouddn.com/';

var setREM = function(){
    var width = window.innerWidth/6.4;
    document.getElementsByTagName('html')[0].style.fontSize =  width + 'px';

};
window.addEventListener('resize', function(){
    setREM();
})
setREM();
//定义七牛云img路径
var IMG_URL = 'http://oe7bp6qor.bkt.clouddn.com/';

