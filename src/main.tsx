import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import App from './App'

// eslint-disable-next-line
const RootApp: React.FC<any> = (props) => (
  <ConfigProvider locale={zhCN}>
    {/* 添加 basename 兼容 [qiankun] 子应用 */}
    <BrowserRouter basename={`/${import.meta.env.VITE_APP_NAME as string}`}>
      <App microState={props} />
    </BrowserRouter>
  </ConfigProvider>
)

ReactDOM.render(<RootApp />, document.getElementById('root'))

/**
 * 以下微前端项目 [qiankun] 调用，可去掉
 */
export async function bootstrap(): Promise<void> {
  console.info('bootstrap')
}

// eslint-disable-next-line
export async function mount(props: any): Promise<void> {
  console.info('mount', props)

  ReactDOM.render(<RootApp {...props} />, document.getElementById('root'))
}

export async function unmount(): Promise<void> {
  const rootEl = document.getElementById('root')
  if (rootEl !== null) ReactDOM.unmountComponentAtNode(rootEl)
}
