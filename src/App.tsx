import React, { Suspense } from 'react'
import ReactRouterView from '@jackgreen/react-router-view'
import routes from 'src/routes'
import { DatePicker, Layout } from 'antd'

const Loading: React.FC = () => {
  return <div style={{ display: 'none' }}>Loading...</div>
}

// eslint-disable-next-line
export default function App(props: any): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Layout className='app'>
        <DatePicker />
        <ReactRouterView {...props} routes={routes} />
      </Layout>
    </Suspense>
  )
}
