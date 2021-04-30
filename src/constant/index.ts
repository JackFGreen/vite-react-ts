/**
 * 统一管理所有常量
 */

/**
 * antd form validate error message
 */
export const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label}不能为空'
}

/**
 * antd pagination common config
 */
export const initPagination = {
  current: 1,
  pageSize: 10,
  showTotal: (n: number): string => `共 ${n} 条`,
  showQuickJumper: true,
  showSizeChanger: true
}

/**
 * antd datePicker format
 */
export const DATE_FORMAT = 'YYYY-MM-DD'
