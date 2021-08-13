import { message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

type Await<T> = T extends {
  then: (onfulfilled?: (value: infer U) => unknown) => unknown
}
  ? U
  : T

export type ApiFn = (params?: any, config?: any) => Promise<any>

export type ApiFnResBody<T extends ApiFn> = Await<ReturnType<T>>
export type ApiFnResBodyData<T extends ApiFn> = ApiFnResBody<T>['data']
export type ApiFnReqParams<T extends ApiFn> = Parameters<T>

export interface UseApiProps<T> {
  apiFn: T
  auto?: boolean
  tip?: string
}

export interface UseApi<T extends ApiFn> {
  state: ApiFnResBodyData<T>
  setState: React.Dispatch<React.SetStateAction<ApiFnResBodyData<T>>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  sent: boolean
  setSent: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: (...params: ApiFnReqParams<T>) => Promise<ApiFnResBody<T>>
}

function useApi<T extends ApiFn>(props: UseApiProps<T>): UseApi<T> {
  const { apiFn, auto = true, tip } = props

  const apiFnRef = useRef(apiFn)
  useEffect(() => {
    apiFnRef.current = apiFn
  }, [apiFn])

  const [state, setState] = useState<ApiFnResBodyData<T>>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const fetchData = useCallback(
    async (...params) => {
      setLoading(true)
      try {
        const res = await apiFnRef.current(...params)
        setState(res?.data)

        setLoading(false)
        setSent(true)

        if (typeof tip === 'string') {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          message.success(tip)
        }

        return res
      } catch (err) {
        setLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (typeof err.errmsg === 'string') message.error(err.errmsg)
        throw err
      }
    },
    [setState, tip]
  )

  useEffect(() => {
    if (auto) {
      fetchData().catch((err) => {
        throw err
      })
    }
  }, [fetchData, auto])

  return {
    state,
    setState,
    loading,
    setLoading,
    sent,
    setSent,
    fetchData
  }
}

export default useApi
