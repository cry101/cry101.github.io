// 用于写js代码

class Promise {
    constructor(executor) {
        // Promise存在三个状态（state）pending、fulfilled、rejected 初始pending
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        // 成功存入的数组
        this.onResolvedCallbacks = []
        // 失败存入的数组
        this.onRejectedCallbacks = []

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                // 执行数组里的函数
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                // 执行数组里的函数
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFulfilled, onRejected) {
        // 声明返回的promise2
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'rejected') {
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject);
            }
            // new 异步时状态还是pending
            if (this.state === 'pending') {
                // 成功的存入成功数组在resolve里执行
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject);
                })
                // 失败的存入失败数组在reject里执行
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        })
        // 返回promise2 完成链式
        return promise2
    }
}