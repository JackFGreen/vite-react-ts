import {PaginationReq, PaginationRes, ResData} from '../type';

/**
 * demo
 */
export interface DemoReq {
	demo: string;
}
export interface DemoData {
	demo: string;
}
// response with data
export type DemoRes = ResData<DemoData>;
// response without data
export type DemoResWithOutData = ResData<null>;

// request with pagination params
export interface DemoReqWithPagination extends PaginationReq {
	demo: string;
}
// response with pagination data
export interface DemoDataWithPagination extends PaginationRes {
	demo: string;
}
export type DemoResWithPagination = ResData<DemoDataWithPagination>;
