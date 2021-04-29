/**
 * 统一管理所有 route 参考 vue-router
 */
import React from 'react';
import {RouteConfig} from '@jackgreen/react-router-view';

const DemoPage = React.lazy(async () => await import('src/pages/demo'));

const NotFound = React.lazy(async () => await import('src/pages/notfound'));

export interface CusRouteConfig extends RouteConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	meta?: any;
	childRoutes?: CusRouteConfig[];
}

const routes: CusRouteConfig[] = [
	{path: '/', redirect: '/demo', exact: true},
	{path: '/demo', component: DemoPage},
	{path: '/404', component: NotFound},
	{path: '*', redirect: '/404'}
];

export default routes;
