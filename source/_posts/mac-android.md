---
title: mac下android的环境变量配置
date: 2018-01-03 10:14:04
tags: [mac,android]
---
## [mac下android的环境变量配置](https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x)
Where the Android-SDK is installed depends on how you installed it.
### 1.通过官网直接下载安装
If you downloaded the SDK through their website and then dragged/dropped the Application to your Applications folder, it's most likely here:
```html
/Applications/ADT/sdk (as it is in your case).
```

### 2.通过Homebrew安装
If you installed the SDK using Homebrew (brew cask install android-sdk), then it's located here:
```html
/usr/local/Caskroom/android-sdk/{YOUR_SDK_VERSION_NUMBER}
```

### 3.通过Android Studio安装
If the SDK was installed automatically as part of Android Studio then it's located here:
```html
/Users/{YOUR_USER_NAME}/Library/Android/sdk
```


知道sdk目录后
```html
vim ~/.bash_profile
```
按向下箭头->按i进入编辑模式
添加
```html
export ANDROID_HOME={YOUR_PATH}
```

```html
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

#注：中间用冒号隔开
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>
```

最后：ESC后 :wq 保存并退出。
更新变化：
```html
source ~/.bash_profile
```
