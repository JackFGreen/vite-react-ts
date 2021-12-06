/* eslint-disable */
import Mock from 'fetch-mock/esm/client'
import { DEMO_URL } from 'src/api/urls'
import demoData from './model/demoData'

// 相同的 url 是否覆盖
Mock.config.overwriteRoutes = false
// 没有 mock 时正常发送网络请求
Mock.config.fallbackToNetwork = true

function mkData(data: any): any {
  return {
    code: 200,
    data,
    message: '成功'
  }
}

function mockLog(url: string, params: any, res: any): void {
  console.info(`--Mock--${url}`)
  console.info('>', params)
  console.info('<', res)
}

function getParams(opts: any): any {
  let params = null
  if (typeof opts.body === 'string') params = JSON.parse(opts.body)
  return params
}

// mock post
Mock.post(DEMO_URL, (url, opts) => {
  const params = getParams(opts)
  const res = mkData(demoData)
  mockLog(url, params, res)
  return res
})

// mock get without query params
Mock.get(DEMO_URL, (url, opts) => {
  const params = getParams(opts)
  const res = mkData(demoData)
  mockLog(url, params, res)
  return res
})

// mock get with query params
Mock.get(new RegExp(DEMO_URL), (url, opts) => {
  const params = getParams(opts)
  const res = mkData(demoData)
  mockLog(url, params, res)
  return res
})
