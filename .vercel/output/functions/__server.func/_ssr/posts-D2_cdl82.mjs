import { r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as optionalAuthMiddleware, t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { i as normalizeUsername } from "./auth-D2ebFRuG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts-D2_cdl82.js
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	kind: _enum([
		"text",
		"image",
		"video"
	]),
	caption: string().max(500),
	imageUrl: string().max(8e5).nullable().optional(),
	videoUrl: string().max(6e6).nullable().optional(),
	posterUrl: string().max(8e5).nullable().optional(),
	mime: string().max(80).nullable().optional(),
	width: number().int().positive().optional(),
	height: number().int().positive().optional(),
	durationMs: number().int().positive().max(6e4).optional()
}).parse(input)).handler(createSsrRpc("9a441e5ecf31d0e6db8f41b458bd431e94be334995ce09f28fde78c493ae50b7"));
var listCircleFeed = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(createSsrRpc("c076698b7ace1f97ab58786b63195c010c5738dd214f1c8cc5642e620626f2df"));
var listPostsByUsername = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(createSsrRpc("86576dad4db6163ce95a1001aa34a44db152382c5647189240cb4c591c305aeb"));
var getPostById = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((postId) => string().min(1).max(80).parse(postId)).handler(createSsrRpc("cc8ac7bad7076a206aaa67487d52655dc8ebd5585d0a2ea5123e66eda448ee2c"));
var listPulseFeed = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator(() => ({})).handler(createSsrRpc("95d96a014fd47f944abb534ce255904d5688cefbef5256d93cc69141e439bef2"));
var listSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(createSsrRpc("ba1f3ba4903039149b02aa4a858400c1164f4a9f93c3b7b8db57a58b5829dd64"));
var searchVybe = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((input) => object({ q: string().max(80).optional() }).parse(input ?? {})).handler(createSsrRpc("f371f13f9ab37ba44522e7664c9461903ededf57e2b2ed7fb78e28c078e6ca99"));
//#endregion
export { listPulseFeed as a, listPostsByUsername as i, getPostById as n, listSaved as o, listCircleFeed as r, searchVybe as s, createPost as t };
