/**
 * fetch 封装
 */
import 'whatwg-fetch'
import qs from 'qs'

import { merge } from 'lodash'

type AjaxMethod = 'GET' | 'POST'

async function parseJSON<T>(response: Response, config: AjaxCofig): Promise<T> {
  const { status } = response

  if (
    config?.httpCodeHandler instanceof Object &&
    typeof config?.httpCodeHandler[status] === 'function'
  ) {
    return (await config?.httpCodeHandler[status](response)) as T
  }

  if (status === 200) {
    if (typeof config?.responseInterceptor === 'function') {
      return (await config?.responseInterceptor(response)) as T
    }
    return await response.json()
  }

  return await Promise.reject(await response.json())
}

export interface AjaxCofig extends RequestInit {
  setConf?: () => void
  host?: string
  httpCodeHandler?: {
    [k: number]: (response: Response) => Promise<unknown>
  }
  responseInterceptor?: (response: Response) => Promise<unknown>
}

const CONTENT_TYPE = 'Content-Type'

class Ajax {
  conf: AjaxCofig

  constructor(conf: AjaxCofig = {}) {
    this.conf = conf
    this.conf.host = typeof this.conf.host === 'string' ? this.conf.host : ''
  }

  setConf(config?: AjaxCofig): AjaxCofig {
    if (typeof this.conf.setConf === 'function') {
      const conf = this.conf.setConf()
      this.conf = merge(this.conf, conf, config)
    } else {
      this.conf = merge(this.conf, config)
    }

    return this.conf
  }

  async send<Req, Res>(
    method: AjaxMethod,
    url: string,
    params?: Req,
    conf?: AjaxCofig
  ): Promise<Res> {
    const config = merge({}, this.setConf(conf))
    const headers = new Headers(config.headers)

    if (method === 'GET') {
      const s: string = qs.stringify(params)
      const query = typeof params === 'object' ? `?${s}` : ''
      url = url + query
    } else {
      const contentType = headers.get(CONTENT_TYPE)

      let body = null
      if (contentType === 'application/json') {
        body = JSON.stringify(params)
      }
      if (params instanceof Object && params.constructor === FormData) {
        body = params
        headers.delete(CONTENT_TYPE)
      }

      config.body = body
    }

    config.method = method
    config.headers = headers

    const response = await window.fetch(`${config.host as string}${url}`, config)

    const res = await parseJSON<Res>(response, config)
    return res
  }

  createApi<Req, Res>(url: string, method: AjaxMethod) {
    return async (params?: Req, conf?: AjaxCofig): Promise<Res> => {
      return await this.send<Req, Res>(method, url, params, conf)
    }
  }

  get<Req, Res>(url: string): ReturnCreateApi<Req, Res> {
    return this.createApi<Req, Res>(url, 'GET')
  }

  post<Req, Res>(url: string): ReturnCreateApi<Req, Res> {
    return this.createApi<Req, Res>(url, 'POST')
  }
}

export type ReturnCreateApi<Req, Res> = (params?: Req, conf?: AjaxCofig) => Promise<Res>

export default Ajax
