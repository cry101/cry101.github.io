---
title: react-navigation的用法
date: 2018-02-01 14:39:50
tags: ['react-native','react']
categories: React
index_img: https://s2.loli.net/2023/01/31/SiEkAK6U1N74Zmt.png
---

(1)[官方网站](https://reactnavigation.org)
(2)[参考资料](https://www.jianshu.com/p/2f575cc35780)
### 1.基本类型
react-navigation分为三个部分。
StackNavigator类似顶部导航条，用来跳转页面和传递参数。
TabNavigator类似底部标签栏，用来区分模块。
DrawerNavigator抽屉，类似从App左侧滑出一个页面，在这里不做讲解。


### 2.screenProps
screenProps：react-navigation自带的一个属性，属于navigationOptions的一个属性，可以全局控制navigationOptions中的某些值，比如说你想做换肤功能，修改这个属性绝对是最简单的方式。
```html
// 假设App就是项目中的入口文件，如果还不知道，可以看下Demo，在这里我将主题色通过screenProps属性修改成'red'
<App screenProps={{themeColor:'red'}}>

// 在页面中就可以通过screenProps来直接改变了，这个在Demo中的Test2里面

static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
		headerStyle:{backgroundColor:screenProps?
		screenProps.themeColor:
		'#4ECBFC'},
    )
})

```

### 3.TabNavigator
安卓下用作底部导航栏显示图标需要配置：
```javascript
{
	tabBarPosition: 'bottom',
	animationEnabled: true,
	configureTransition: (currentTransitionProps,nextTransitionProps) => ({
		timing: Animated.spring,
		tension: 1,
		friction: 35,
	}),
	swipeEnabled: true,
	tabBarOptions: {
		showIcon: true  //android下默认不显示图标
	}
}
```

### 4.自定义导航栏
```jsx harmony
const StackOptions = ({navigation}) => {
    console.log(navigation);
    let {state,goBack} = navigation;
    
    // 用来判断是否隐藏或显示header
    const visible= state.params.isVisible;
    let header;
    if (visible === true){
        header = null;
    }
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize:FONT_SIZE(20),color:'white',fontWeight:'500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='ios-arrow-back'
                                size={30}
                                color='white'
                                style={{marginLeft:13}}
                            />
                        }
            onPress={()=>{goBack()}}
        />
    );
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header}
};

```
使用：
```jsx harmony
const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
)}
```

### 5.二级界面隐藏Tabbar
```jsx harmony
const UserTab = StackNavigator({
	UserCenter: {
		screen: ({ navigation }) => (<UserCenter navigation={navigation} />),
		path: '/userCenter',
		navigationOptions: {
			headerTitle: '个人中心',
			headerTintColor: Color.while,
			headerStyle: styles.headerBg
		},
	},
	Login: {
		screen: ({ navigation }) => (<Login navigation={navigation} />),
		path: '/login',
		navigationOptions: {
			header: ({ navigation })=>(<ComHeader navigation={navigation} title="登陆"/>),
			tabBarVisible: false //隐藏tabbar
		},
	},
});
```

### 6.error: Invariant Violation：view config not found for name hotGroups
好像是没找到navigation。
感觉navigation的使用不太对，只能一层层传过去。
````jsx harmony
const GroupTab = TabNavigator(
	{
		hotGroups: {
			screen: ({ navigation}) => (<hotGroups navigation={navigation} />),
			path: '/hotGroups',
			navigationOptions: {
				tabBarLabel: '推荐社群'
			},
		},
		myGroups: {
			screen: ({ navigation}) => (<myGroups navigation={navigation} />),
			path: '/myGroups',
			navigationOptions: {
				tabBarLabel: '我的社群'
			},
		},
	},
	{
		tabBarPosition: 'top',
		animationEnabled: true,
		configureTransition: (currentTransitionProps,nextTransitionProps) => ({
			timing: Animated.spring,
			tension: 1,
			friction: 35,
		}),
		swipeEnabled: false,
		tabBarOptions: {
			activeTintColor: Color.while,
			labelStyle: {
				fontSize: 16
			},
			style: {
				backgroundColor: Color.main
			},
		}
	}
);
````

### 7.实现replace方法
由于新版的react navigation似乎没有了replace方法，只能reset所有路由。
翻阅各种issues，找到一种可以用的方法：
```jsx harmony
//routes.js
import { StackNavigator } from 'react-navigation';
const HomeStack = StackNavigator(
	{
		Web: { screen: XXX, path: '/' },
		Login: { screen: XXX1 },
		...
	}
)

//思路在于dispath一个type为replace的action，在原getStateForAction方法上重写
const prevGetStateForAction = HomeStack.router.getStateForAction;
HomeStack.router.getStateForAction = (action, state) => {
	if (state && action.type === "replace") {
		const routes = state.routes.slice(0, state.routes.length - 1);
		action.key =  `id-${Date.now()}-${routes.length - 1}`;
		routes.push(action);
		return {
			...state,
			routes,
			index: routes.length - 1
		};
	}
	return prevGetStateForAction(action, state);
};

```
使用：
```jsx harmony
//XXX.js 页面

this.props.navigation.dispatch({
	type: 'replace',
	routeName: 'Login',
	key: 'Login',
	params: {
		id: 123
	}
});
```

[参考](https://github.com/react-navigation/react-navigation/issues/802)


### 8.lazy
v1.0.0-beta.23 has a breaking change noted: “Drop the lazy option for TabNavigator”
lazy属性用不了，TabNavigator会一次性全部加载




