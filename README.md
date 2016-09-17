# validation-placeholder

提供兼容性 placeholder 方案，同时提供简单的 input 验证警告接口。IE8 等低版本浏览器使用一个 span 标签实现，现代浏览器使用 HTML5 的 placeholder 属性。 

本插件开发及预览均使用 [express-gulp-browsersync](https://github.com/Nutlee/express-gulp-browsersync) 环境，简单操作如下，更多操作请查看相关仓库

## 预览及使用

* 克隆到本地仓库依次进行以下命令可以启动预览

	```
	# 安装依赖
	npm install
	# 加载 jQuery 库依赖
	bower install
	# 初始化库
	gulp lib-init
	# 启动本地服务器
	gulp
	```
	
* 如需直接使用，请拷贝 public/js 下 validation-placeholder.min.js 使用
	
## 接口及详细使用

* 通过 placeholder 方法直接对 jQuery 对象初始化

	```
	$('#phone').placeholder({
		// placeholder 文字
		text: '手机号'，
		// placeholder 样式，仅在 IE8 等旧浏览器有效
		class: '',
		// 警告文字，可初始化时绑定
		warnText: '请输入正确手机号',
		// 加到 input 标签的父容器上，默认为 warn ，需用户手动定义这个样式
		warnClass: 'warn'
	});
	```
	
* 方法

	* updateHolderText: 修改 placholder 内容
	
	```
	$('#phone').placeholder('updateHolderText','电话号码');
	```
	* showWarn: 显示报错信息，如果缺省则使用初始化时的值
	
	```
	$('#phone').placeholder('showWarn','请输入正确的手机号');
	```
	
	* removeWarn: 移除报错

	```
	$('#phone').placeholder('removeWarn');
	```
	
	








