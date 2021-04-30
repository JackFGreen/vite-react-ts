/**
 * 只做统一导出用
 * 以及公共 types
 * 不同业务需要修改
 */

/**
 * 返回值，对应 handleApiCode 参数
 */
export interface ResData<T> {
  code: number
  data: T
  message: string
}

/**
 * 分页
 */
export interface PaginationReq {
  // 当前页
  currentPage: number
  // 页面大小
  pageSize: number
}
export interface PaginationRes extends PaginationReq {
  total: number
}

/**
 * 导出模块
 */
export * from './demo/type'
