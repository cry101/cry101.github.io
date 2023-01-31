---
title: ajax的一些小技巧
date: 2017-02-16 17:32:19
tags: ajax
index_img: https://s2.loli.net/2023/01/31/wfzOKhdVeFpgU1R.jpg
---

### 1.利用html5 formData实现ajax上传文件
```html
<div id="coverbg">
  <form id="uploadbgPic" action="url/uf" method="post" enctype="multipart/form-data">
      <input type="file" name="file" accept="image/*" class="upload2">
  </form>
</div>
```
```javascript
$('#coverbg').on('change','.upload2',function(){
    var formData = new FormData($("#uploadbgPic")[0]);
    //console.log(formData)
    $.ajax({
        url: url + '/uf' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            var data = result.data;
            $('#coverbg').find('img').attr('src',baseAccessUploadPathPc + data);
        },
        error: function (err) {
           console.log(err);
        }
    });
});
```

### 2.递归运行解决ajax无顺序，不用for循环并发
如果要重复发起请求，for循环不能保证顺序。
```javascript
var n = 0;
(function uploadPic(){
    var formData = new FormData(n);
    formData.append('file', file[n]);
    $.ajax({
        url: ctx + '/uf',
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.suc) {
                 var data = result.data;
                 /**
                 * 数据处理
                 */
                 n++;
                 if(n<file.length)uploadPic();
            }else{
                 alert(result.msg)
            }
        },
        error: function (err) {
            console.log(err);
        }
     });
})(n);

```
