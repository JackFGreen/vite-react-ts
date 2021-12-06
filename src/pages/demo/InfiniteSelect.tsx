import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectInfinite from 'src/components/SelectInfinite'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'

function InfiniteSelect(): JSX.Element {
  const [state, setState] = useState({
    data: [],
    hasMore: true
  })
  console.log(state)

  const fetchData = async (): Promise<any> => {
    const res = await (await fetch(fakeDataUrl, { method: 'get' })).json()
    console.log(res)
    return res
  }

  const handleInfiniteOnLoad = async (): Promise<void> => {
    console.log('handleInfiniteOnLoad')

    let { data } = state
    setState((prev) => ({
      ...prev
    }))
    if (data.length > 100) {
      console.log('Infinite List loaded all')
      setState((prev) => ({
        ...prev,
        hasMore: false
      }))
      return
    }
    const res = await fetchData()
    data = data.concat(res.results)
    setState((prev) => ({
      ...prev,
      data
    }))
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData().then((res) => {
      setState((prev) => ({
        ...prev,
        data: res.results
      }))
    })
  }, [])

  return (
    <div>
      <SelectInfinite
        style={{ width: 200 }}
        listHeight={150}
        infiniteHasMore={state.hasMore}
        infiniteOnLoad={handleInfiniteOnLoad}
      >
        {state.data.map((item) => (
          <Select.Option key={item.email} value={item.email}>
            {item.email}
          </Select.Option>
        ))}
      </SelectInfinite>
    </div>
  )
}

export default InfiniteSelect
