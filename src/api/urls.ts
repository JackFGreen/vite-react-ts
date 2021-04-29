/**
 * 统一管理所有 api path
 */
export function getUrl(s: string): string {
	// api 基础路径，不同业务需要修改
	return `/${import.meta.env.VITE_APP_NAME as string}` + s;
}

// {"url":"/demo","code":["/demo"],"pcode":["demo"],"desc": "demo"}
export const DEMO_URL = getUrl('/demo');
