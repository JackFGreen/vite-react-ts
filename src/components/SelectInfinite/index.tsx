import React, { ReactNode, useCallback, useState } from 'react'
import { Select, SelectProps, Spin } from 'antd'
import { SelectValue } from 'antd/lib/select'

export interface SelectInfiniteProps extends SelectProps<SelectValue> {
  infiniteOnLoad: () => Promise<any>
  infiniteHasMore: boolean
  infiniteLoader?: ReactNode
}

function SelectInfinite(props: SelectInfiniteProps): JSX.Element {
  const {
    infiniteOnLoad,
    infiniteHasMore,
    infiniteLoader,
    children,
    onPopupScroll,
    ...rest
  } = props

  /**
   * loading
   */
  const [loading, setLoading] = useState(false)

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    async (event): Promise<void> => {
      onPopupScroll?.(event)

      const el = event.target
      const { offsetHeight, scrollTop, scrollHeight } = el as HTMLDivElement
      const isBottom = offsetHeight + scrollTop >= scrollHeight

      console.log(
        `offsetHeight %s, scrollTop %s, scrollHeight %s`,
        offsetHeight,
        scrollTop,
        scrollHeight
      )

      if (isBottom && !loading && infiniteHasMore) {
        setLoading(true)
        await infiniteOnLoad()
        setLoading(false)
      }
    },
    [loading, infiniteHasMore, infiniteOnLoad, onPopupScroll]
  )

  return (
    <Select onPopupScroll={handleScroll} {...rest}>
      {children}

      {loading
        ? infiniteLoader ?? (
            <Select.Option key='loading' value='loading' style={{ textAlign: 'center' }}>
              <Spin size='small' />
            </Select.Option>
          )
        : null}
    </Select>
  )
}

export default SelectInfinite
