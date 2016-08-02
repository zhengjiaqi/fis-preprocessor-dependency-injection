###fis-应用商店依赖注入插件

####使用方法：
1. 在preprocessor中引入该插件
	 例：
	 ```
	 modules: {
           preprocessor: {
             //html后缀文件会经过dependency-injectiont插件的预处理
             //进行依赖注入
             html: 'dependency-injection'
           },
         }
     ```
2. 在settings中配置参数
     例：
     ```
     settings: {
           preprocessor: {
             'dependency-injection': [
               {
                 targetFile: 'views/index/index.html',
                 dependencyFile: 'Injection/mobile-web.js'
               },
               {
                 targetFile: ['views/search/search-guide.html'],
                 dependencyFile: ['Injection/mobile-web.js', 'Injection/mobile-web.css', 'assets/js/global.js', 'views/index/index.js']
               }
             ]
           }   
     ```
        