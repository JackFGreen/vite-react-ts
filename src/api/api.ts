/**
 * 接口实例方法，相关配置
 */
import { message } from 'antd'

import Ajax from './Ajax'

// mock api data
import '../mock'
const localhost = ''

// charles debug test env
// const localhost = 'https://api-test.com';

// [qiankun] 需要指定 api host，否则根据 主应用 的 host 走
// const localhost = `http://localhost:${import.meta.env.REACT_APP_PORT as string}`;

export const ajax = new Ajax({
  host:
    import.meta.env.REACT_APP_RUNTIME_ENV === 'local'
      ? localhost
      : (import.meta.env.REACT_APP_API_HOST as string),
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  httpCodeHandler: {
    401: async (response) => {
      const res = await response.json()
      console.error(res)
    }
  }
})

/**
 * 接口数据 code 处理
 *
 * @export
 * @param {{code: number; message: string}} res 接口返回数据
 * @param {({
 * 		success?: () => unknown;
 * 		fail?: Record<number | string, () => unknown>;
 * 		error?: boolean | (() => unknown);
 * 	})} opt 处理选项
 * @param opt.success 成功处理
 * @param opt.fail 异常 code 处理，不会走 opt.error
 * @param opt.error 不成功处理，默认 antd message 提示，error: false 取消默认处理，error: () => {} 自定义处理函数
 * @returns {unknown}
 * @example
 * const res = await getData()
 * handleApiCode(res, {
 *   success() {
 *     setState()
 *   },
 *    // 特殊 code 处理，可不传
 *    fail: {
 *       10001: () => {
 *         // 处理异常 code 的业务逻辑
 *       }
 *    },
 *    error() {
 *       // 处理错误，默认用 antd message 提示信息，可不传
 *    }
 * })
 */
export function handleApiCode(
  res: { code: number; message: string },
  opt: {
    success?: () => unknown
    fail?: Record<number | string, () => unknown>
    error?: boolean | (() => unknown)
  }
): unknown {
  if (!(opt instanceof Object)) return

  const { code } = res
  if (code === 200 && typeof opt.success === 'function') return opt.success()

  if (typeof opt.fail === 'object') {
    const handler = opt.fail[code]
    if (typeof handler === 'function') return handler()
  }

  if (typeof opt.error === 'function') {
    return opt.error()
  }

  if (typeof opt.error !== 'boolean') opt.error = true
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  if (opt.error) message.error(res.message)
}
