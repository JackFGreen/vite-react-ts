/**
 * 公共方法，业务相关的在 tools 下单独新建文件
 */
import moment, { Moment } from 'moment'

/**
 * antd datePicker date format
 */
// 当天日期前不可选
export function disabledDate(current: Moment): boolean {
  return current instanceof Object ? current < moment().subtract(1, 'days') : false
}

// 当天
export function mToday(): Moment {
  const today = moment()
  return today
}

// 本周
export function mWeek(): [Moment, Moment] {
  const weekStart = moment().startOf('week')
  const weekEnd = moment().endOf('week')
  return [weekStart, weekEnd]
}

// 最近一周
export function mLastWeek(): [Moment, Moment] {
  const lastWeekStart = moment().subtract(6, 'days')
  const lastWeekEnd = moment()
  return [lastWeekStart, lastWeekEnd]
}

// 最近一月
export function mLastMonth(): [Moment, Moment] {
  const lastMonthStart = moment().subtract(30, 'days')
  const lastMonthEnd = moment()
  return [lastMonthStart, lastMonthEnd]
}
