import { ajax } from '../index'

import { DemoReq, DemoRes, DemoResWithOutData } from './type'

import { DEMO_URL } from '../urls'

export const getDemoWithParamsAndResponse = ajax.get<DemoReq, DemoRes>(DEMO_URL)

export const getDemoWithOutParams = ajax.get<null, DemoResWithOutData>(DEMO_URL)

export const postDemoWithParamsAndResponse = ajax.post<DemoReq, DemoRes>(DEMO_URL)
