import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { b as ChevronLeft, y as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pitch-BFgRgzxU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slides = [
	{
		id: "title",
		kicker: "Confidential  ·  2026"
	},
	{
		id: "split",
		kicker: "01  /  Context"
	},
	{
		id: "problem",
		kicker: "02  /  Problem"
	},
	{
		id: "insight",
		kicker: "03  /  Insight"
	},
	{
		id: "solution",
		kicker: "04  /  Product"
	},
	{
		id: "circle",
		kicker: "05  /  Circle"
	},
	{
		id: "pulse",
		kicker: "06  /  Pulse"
	},
	{
		id: "system",
		kicker: "07  /  System"
	},
	{
		id: "why",
		kicker: "08  /  Why VYBE"
	},
	{
		id: "market",
		kicker: "09  /  Market"
	},
	{
		id: "model",
		kicker: "10  /  Model"
	},
	{
		id: "roadmap",
		kicker: "11  /  Build"
	},
	{
		id: "close",
		kicker: "12  /  Close"
	}
];
function PitchDeck() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const last = slides.length - 1;
	const go = (0, import_react.useCallback)((next) => setIndex(Math.min(last, Math.max(0, next))), [last]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
				event.preventDefault();
				go(index + 1);
			}
			if (event.key === "ArrowLeft" || event.key === "PageUp") {
				event.preventDefault();
				go(index - 1);
			}
			if (event.key === "Home") go(0);
			if (event.key === "End") go(last);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		go,
		index,
		last
	]);
	const slide = slides[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,90,61,0.08),transparent_55%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-6 py-5 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-semibold tracking-[0.18em]",
						children: "VYBE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-[11px] tracking-[0.22em] text-muted uppercase sm:block",
					children: slide.kicker
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center px-6 pt-16 pb-24 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideBody, { id: slide.id })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "absolute right-0 bottom-0 left-0 z-20 flex items-center justify-between px-6 py-5 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] tabular-nums tracking-[0.18em] text-subtle",
						children: [
							String(index + 1).padStart(2, "0"),
							"  /  ",
							String(slides.length).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5",
						children: slides.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Go to slide ${i + 1}`,
							onClick: () => go(i),
							className: cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-brand" : "w-1.5 bg-border hover:bg-muted")
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							label: "Previous",
							onClick: () => go(index - 1),
							disabled: index === 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							label: "Next",
							onClick: () => go(index + 1),
							disabled: index === last,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})]
					})
				]
			})
		]
	});
}
function SlideBody({ id }) {
	switch (id) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.28em] text-brand uppercase",
					children: "The social OS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display mt-5 text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] font-semibold tracking-tight",
					children: [
						"Your people.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Your pulse."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-lg text-muted",
					children: "VYBE is one identity across two rooms: Circle for the people you chose, Pulse for the world in motion."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative hidden overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/pitch/rings.jpg",
					alt: "",
					className: "aspect-[16/10] w-full object-cover"
				})
			})]
		});
		case "split": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] font-semibold tracking-tight",
				children: "Friends live in one app. Discovery lives in another."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-lg text-base leading-relaxed text-muted",
				children: "Instagram kept the people you know. TikTok took the camera. Every creator, and every teenager, now runs two lives — and two brands — to do both."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/pitch/worlds.jpg",
				alt: "",
				className: "aspect-[16/10] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
			})]
		});
		case "problem": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight",
			children: "We trained a generation to split themselves."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-12 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "The close graph stalled",
					body: "Follow graphs optimized for ads, not friends. Chronological intimacy is an afterthought on platforms built for reach."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "The open graph is a stranger",
					body: "Short video found a new camera language — and left your actual Circle behind. Discovery without belonging."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "Identity is the tax",
					body: "People maintain two handles, two aesthetics, two audiences. The software made them do it."
				})
			]
		})] });
		case "insight": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.28em] text-brand uppercase",
					children: "The bet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-semibold tracking-tight",
					children: "Closeness and discovery are different verbs."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-2xl text-lg leading-relaxed text-muted",
					children: "One ranking function cannot serve a best friend and a billion strangers. The fix is not a better algorithm. It is two rooms, one name."
				})
			]
		});
		case "solution": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight",
			children: "One identity. Two rooms."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
				name: "Circle",
				line: "From people you chose.",
				points: [
					"Follow graph, chronological",
					"Text, image, video",
					"Quiet on purpose"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
				name: "Pulse",
				line: "From the world, in motion.",
				points: [
					"Public short video",
					"Ranked by taste, not followers",
					"The same creator, a second room"
				]
			})]
		})] });
		case "circle": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.28em] text-brand uppercase",
					children: "Circle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-semibold tracking-tight",
					children: "The feed that used to exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg leading-relaxed text-muted",
					children: "People you follow, in the order they posted. Captions that can be a paragraph. Images that do not autoplay. A home, not a slot machine."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Follow, unfollow, block — a real social graph" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Posts: text, image, or video" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Like, comment, share, save" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Hashtags without turning friends into SEO" })
				]
			})]
		});
		case "pulse": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.28em] text-brand uppercase",
					children: "Pulse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-semibold tracking-tight",
					children: "A public square that does not invade the house."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg leading-relaxed text-muted",
					children: "Full-screen vertical video. Swipe. Sound. Reach that is not gated by how many friends you collected in high school."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Same username, separate ranking" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "For You, following, and tags" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Create once — publish to Circle, Pulse, or both" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Friends never compete with strangers in the same scroll" })
				]
			})]
		});
		case "system": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight",
				children: "A dual graph, not a feature flag."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-8 space-y-3 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "01  Identity"
					}), " — one user, one username, hashed credentials, sessions."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "02  Graph"
					}), " — follow edges that power Circle, never Pulse ranking."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "03  Content"
					}), " — posts and media with a room, not a generic blob."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "04  Signals"
					}), " — likes, comments, saves, shares, notifications."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "05  Safety"
					}), " — report, review, suspend. Trust is the product."] })
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/pitch/graph.jpg",
				alt: "",
				className: "aspect-[16/10] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
			})]
		});
		case "why": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight",
			children: "Not another For You page. A social OS with two rooms."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "One name",
					body: "Creators stop running twin brands. Friends always know where to find you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "Two rankings",
					body: "Circle stays chronological. Pulse can be ambitious. Neither poisons the other."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					title: "Taste, not scale",
					body: "A small Circle is a feature. Pulse is where a clip can still leave the room."
				})
			]
		})] });
		case "market": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight",
				children: "The camera already split. The software has not."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: "2 lives",
						l: "Every young user already keeps a friends app and a discovery app."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: "1 camera",
						l: "Short video is the default way a generation records the world."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: "0 homes",
						l: "No major product is natively both — so people duct-tape identity."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Social remains the largest consumer-internet surface. The opening is not “beat TikTok at TikTok.” It is to own the seam between belonging and broadcast."
			})
		] });
		case "model": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight",
				children: "Monetize the square. Protect the house."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-base leading-relaxed text-muted",
				children: "Pulse is public, so it can carry ads, branded missions, and later, creator commerce. Circle is a home. We do not rank friends for a brand manager."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Pulse advertising — native, skippable, never in Circle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Creator tools on Pulse reach, once the graph is real" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { children: "Never sell the follow graph. Trust is the lock-in." })
				]
			})]
		});
		case "roadmap": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight",
			children: "Thirteen phases. Shipping in public."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "01–02",
					t: "Foundation + identity",
					d: "Design system, auth, unique usernames, sessions."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "03–05",
					t: "Graph + rooms",
					d: "Profiles, follow, Circle feed, Pulse player."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "06–08",
					t: "Publish + engage",
					d: "Text, image, video. Likes, comments, share, save."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "09–10",
					t: "Find + notify",
					d: "Hashtags, search, a real notifications inbox."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "11–12",
					t: "Trust",
					d: "Reporting, moderation, admin. The product is only as good as this."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phase, {
					n: "13",
					t: "Harden",
					d: "Performance, polish, the seams that make it feel inevitable."
				})
			]
		})] });
		case "close": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeMark, { className: "mx-auto size-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display mt-8 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-tight",
					children: [
						"Join the Circle.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "Ride the Pulse."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-md text-base text-muted",
					children: "VYBE — one identity, two rooms. Built for people who refuse to split themselves to be seen."
				})
			]
		});
		default: return null;
	}
}
function Fact({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function Room({ name, line, points }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[1.75rem] bg-surface p-7 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] text-brand uppercase",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display mt-3 text-3xl font-semibold",
				children: line
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2 text-sm text-muted",
				children: points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
			})
		]
	});
}
function Line({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function Stat({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl font-semibold text-brand",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: l
		})]
	});
}
function Phase({ n, t, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.2em] text-brand uppercase",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display mt-2 text-lg font-semibold",
				children: t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: d
			})
		]
	});
}
function NavButton({ children, onClick, disabled, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		disabled,
		className: "grid size-11 place-items-center rounded-full bg-elevated text-fg shadow-[var(--shadow-border)] disabled:opacity-30",
		children
	});
}
function VybeMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				className: "fill-elevated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 22.5c5.5-13 13.5-13 19 0",
				fill: "none",
				className: "stroke-brand",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "10.5",
				r: "2.3",
				className: "fill-fg"
			})
		]
	});
}
//#endregion
export { PitchDeck as component };
