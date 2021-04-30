import React from 'react'
import { Result, Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'

function NotFound(props: RouteComponentProps): JSX.Element {
  const historyack = (): void => {
    props.history.goBack()
  }

  return (
    <Result
      status='404'
      title='404'
      subTitle='功能正在开发中'
      extra={
        <>
          <Button type='primary' onClick={historyack}>
            返回
          </Button>
        </>
      }
    />
  )
}

export default NotFound
