/*!
 * Vue-Lazyload.js v1.0.3
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.VueLazyload = t()
}(this, function() {
	"use strict";

	function e(e, t) {
		if (e.length) {
			var n = e.indexOf(t);
			return n > -1 ? e.splice(n, 1) : void 0
		}
	}
	function t(e, t) {
		if (!e || !t) return e || {};
		if (e instanceof Object) for (var n in t) e[n] = t[n];
		return e
	}
	function n(e, t) {
		for (var n = !1, i = 0, r = e.length; i < r; i++) if (t(e[i])) {
			n = !0;
			break
		}
		return n
	}
	function i(e, t) {
		if ("IMG" === e.tagName && e.getAttribute("data-srcset")) {
			var n = e.getAttribute("data-srcset"),
				i = [],
				r = e.parentNode,
				o = r.offsetWidth * t,
				a = void 0,
				s = void 0,
				u = void 0;
			n = n.trim().split(","), n.map(function(e) {
				e = e.trim(), a = e.lastIndexOf(" "), a === -1 ? (s = e, u = 999998) : (s = e.substr(0, a), u = parseInt(e.substr(a + 1, e.length - a - 2), 10)), i.push([u, s])
			}), i.sort(function(e, t) {
				if (e[0] < t[0]) return -1;
				if (e[0] > t[0]) return 1;
				if (e[0] === t[0]) {
					if (t[1].indexOf(".webp", t[1].length - 5) !== -1) return 1;
					if (e[1].indexOf(".webp", e[1].length - 5) !== -1) return -1
				}
				return 0
			});
			for (var d = "", l = void 0, c = i.length, h = 0; h < c; h++) if (l = i[h], l[0] >= o) {
				d = l[1];
				break
			}
			return d
		}
	}
	function r(e, t) {
		for (var n = void 0, i = 0, r = e.length; i < r; i++) if (t(e[i])) {
			n = e[i];
			break
		}
		return n
	}
	function o() {
		if (!h) return !1;
		var e = !0,
			t = document;
		try {
			var n = t.createElement("object");
			n.type = "image/webp", n.innerHTML = "!", t.body.appendChild(n), e = !n.offsetWidth, t.body.removeChild(n)
		} catch (t) {
			e = !1
		}
		return e
	}
	function a(e, t) {
		var n = null,
			i = 0;
		return function() {
			if (!n) {
				var r = Date.now() - i,
					o = this,
					a = arguments,
					s = function() {
						i = Date.now(), n = !1, e.apply(o, a)
					};
				r >= t ? s() : n = setTimeout(s, t)
			}
		}
	}
	function s() {
		if (h) {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", {
					get: function() {
						e = !0
					}
				});
				window.addEventListener("test", null, t)
			} catch (e) {}
			return e
		}
	}
	function u(e) {
		return null !== e && "object" === ("undefined" == typeof e ? "undefined" : d(e))
	}
	var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
	}, l = function(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}, c = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var i = t[n];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}
		return function(t, n, i) {
			return n && e(t.prototype, n), i && e(t, i), t
		}
	}(), h = "undefined" != typeof window, f = function() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
		return h && window.devicePixelRatio || e
	}, p = s(), v = {
		on: function(e, t, n) {
			p ? e.addEventListener(t, n, {
				passive: !0
			}) : e.addEventListener(t, n, !1)
		},
		off: function(e, t, n) {
			e.removeEventListener(t, n)
		}
	}, g = function(e, t, n) {
		var i = new Image;
		i.src = e.src, i.onload = function() {
			t({
				naturalHeight: i.naturalHeight,
				naturalWidth: i.naturalWidth,
				src: i.src
			})
		}, i.onerror = function(e) {
			n(e)
		}
	}, y = function(e, t) {
		return "undefined" != typeof getComputedStyle ? getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
	}, m = function(e) {
		return y(e, "overflow") + y(e, "overflow-y") + y(e, "overflow-x")
	}, b = function(e) {
		if (h) {
			if (!(e instanceof HTMLElement)) return window;
			for (var t = e; t && t !== document.body && t !== document.documentElement && t.parentNode;) {
				if (/(scroll|auto)/.test(m(t))) return t;
				t = t.parentNode
			}
			return window
		}
	}, w = {}, L = function() {
		function e(t) {
			var n = t.el,
				i = t.src,
				r = t.error,
				o = t.loading,
				a = t.bindType,
				s = t.$parent,
				u = t.options,
				d = t.elRenderer;
			l(this, e), this.el = n, this.src = i, this.error = r, this.loading = o, this.bindType = a, this.attempt = 0, this.naturalHeight = 0, this.naturalWidth = 0, this.options = u, this.filter(), this.initState(), this.performanceData = {
				init: Date.now(),
				loadStart: null,
				loadEnd: null
			}, this.rect = n.getBoundingClientRect(), this.$parent = s, this.elRenderer = d, this.render("loading", !1)
		}
		return c(e, [{
			key: "initState",
			value: function() {
				this.state = {
					error: !1,
					loaded: !1,
					rendered: !1
				}
			}
		}, {
			key: "record",
			value: function(e) {
				this.performanceData[e] = Date.now()
			}
		}, {
			key: "update",
			value: function(e) {
				var t = e.src,
					n = e.loading,
					i = e.error,
					r = this.src;
				this.src = t, this.loading = n, this.error = i, this.filter(), r !== this.src && (this.attempt = 0, this.initState())
			}
		}, {
			key: "getRect",
			value: function() {
				this.rect = this.el.getBoundingClientRect()
			}
		}, {
			key: "checkInView",
			value: function() {
				return this.getRect(), this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0
			}
		}, {
			key: "filter",
			value: function() {
				this.options.filter.webp && this.options.supportWebp && (this.src = this.options.filter.webp(this, this.options)), this.options.filter.customer && (this.src = this.options.filter.customer(this, this.options))
			}
		}, {
			key: "load",
			value: function() {
				var e = this;
				return this.attempt > this.options.attempt - 1 && this.state.error ? void(this.options.silent || console.log("error end")) : this.state.loaded || w[this.src] ? this.render("loaded", !0) : (this.render("loading", !1), this.attempt++, this.record("loadStart"), void g({
					src: this.src
				}, function(t) {
					e.naturalHeight = t.naturalHeight, e.naturalWidth = t.naturalWidth, e.state.loaded = !0, e.state.error = !1, e.record("loadEnd"), e.render("loaded", !1), w[e.src] = 1
				}, function(t) {
					e.state.error = !0, e.state.loaded = !1, e.render("error", !1)
				}))
			}
		}, {
			key: "render",
			value: function(e, t) {
				this.elRenderer(this, e, t)
			}
		}, {
			key: "performance",
			value: function() {
				var e = "loading",
					t = 0;
				return this.state.loaded && (e = "loaded", t = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3), this.state.error && (e = "error"), {
					src: this.src,
					state: e,
					time: t
				}
			}
		}, {
			key: "destroy",
			value: function() {
				this.el = null, this.src = null, this.error = null, this.loading = null, this.bindType = null, this.attempt = 0
			}
		}]), e
	}(), k = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", A = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"], T = function(s) {
		return function() {
			function d(e) {
				var t = this,
					n = e.preLoad,
					i = e.error,
					r = e.preLoadTop,
					s = e.loading,
					u = e.attempt,
					c = e.silent,
					h = e.scale,
					p = e.listenEvents,
					v = (e.hasbind, e.filter),
					g = e.adapter;
				l(this, d), this.ListenerQueue = [], this.TargetIndex = 0, this.TargetQueue = [], this.options = {
					silent: c || !0,
					preLoad: n || 1.3,
					preLoadTop: r || 0,
					error: i || k,
					loading: s || k,
					attempt: u || 3,
					scale: h || f(h),
					ListenEvents: p || A,
					hasbind: !1,
					supportWebp: o(),
					filter: v || {},
					adapter: g || {}
				}, this.initEvent(), this.lazyLoadHandler = a(function() {
					var e = !1;
					t.ListenerQueue.forEach(function(t) {
						t.state.loaded || (e = t.checkInView(), e && t.load())
					})
				}, 200)
			}
			return c(d, [{
				key: "config",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					t(this.options, e)
				}
			}, {
				key: "addLazyBox",
				value: function(e) {
					this.ListenerQueue.push(e), h && (this._addListenerTarget(window), e.$el && e.$el.parentNode && this._addListenerTarget(e.$el.parentNode))
				}
			}, {
				key: "_addListenerTarget",
				value: function(e) {
					if (e) {
						var t = r(this.TargetQueue, function(t) {
							return t.el === e
						});
						return t ? t.childrenCount++ : (t = {
							el: e,
							id: ++this.TargetIndex,
							childrenCount: 1,
							listened: !0
						}, this.initListen(t.el, !0), this.TargetQueue.push(t)), this.TargetIndex
					}
				}
			}, {
				key: "_removeListenerTarget",
				value: function(e) {
					var t = this;
					this.TargetQueue.forEach(function(n, i) {
						n.el === e && (n.childrenCount--, n.childrenCount || (t.initListen(n.el, !1), t.TargetQueue.splice(i, 1), n = null))
					})
				}
			}, {
				key: "add",
				value: function(e, t, r) {
					var o = this;
					if (n(this.ListenerQueue, function(t) {
						return t.el === e
					})) return this.update(e, t), s.nextTick(this.lazyLoadHandler);
					var a = this.valueFormatter(t.value),
						u = a.src,
						d = a.loading,
						l = a.error;
					s.nextTick(function() {
						u = i(e, o.options.scale) || u;
						var n = Object.keys(t.modifiers)[0],
							a = void 0;
						n && (a = r.context.$refs[n], a = a ? a.$el || a : document.getElementById(n)), a || (a = b(e));
						var c = new L({
							bindType: t.arg,
							$parent: a,
							el: e,
							loading: d,
							error: l,
							src: u,
							elRenderer: o.elRenderer.bind(o),
							options: o.options
						});
						o.ListenerQueue.push(c), h && (o._addListenerTarget(window), o._addListenerTarget(a)), o.lazyLoadHandler(), s.nextTick(function() {
							return o.lazyLoadHandler()
						})
					})
				}
			}, {
				key: "update",
				value: function(e, t) {
					var n = this,
						i = this.valueFormatter(t.value),
						o = i.src,
						a = i.loading,
						u = i.error,
						d = r(this.ListenerQueue, function(t) {
							return t.el === e
						});
					d && d.update({
						src: o,
						loading: a,
						error: u
					}), this.lazyLoadHandler(), s.nextTick(function() {
						return n.lazyLoadHandler()
					})
				}
			}, {
				key: "remove",
				value: function(t) {
					if (t) {
						var n = r(this.ListenerQueue, function(e) {
							return e.el === t
						});
						n && (this._removeListenerTarget(n.$parent), this._removeListenerTarget(window), e(this.ListenerQueue, n) && n.destroy())
					}
				}
			}, {
				key: "removeComponent",
				value: function(t) {
					t && (e(this.ListenerQueue, t), t.$parent && t.$el.parentNode && this._removeListenerTarget(t.$el.parentNode), this._removeListenerTarget(window))
				}
			}, {
				key: "initListen",
				value: function(e, t) {
					var n = this;
					this.options.ListenEvents.forEach(function(i) {
						return v[t ? "on" : "off"](e, i, n.lazyLoadHandler)
					})
				}
			}, {
				key: "initEvent",
				value: function() {
					var t = this;
					this.Event = {
						listeners: {
							loading: [],
							loaded: [],
							error: []
						}
					}, this.$on = function(e, n) {
						t.Event.listeners[e].push(n)
					}, this.$once = function(e, n) {
						function i() {
							r.$off(e, i), n.apply(r, arguments)
						}
						var r = t;
						t.$on(e, i)
					}, this.$off = function(n, i) {
						return i ? void e(t.Event.listeners[n], i) : void(t.Event.listeners[n] = [])
					}, this.$emit = function(e, n, i) {
						t.Event.listeners[e].forEach(function(e) {
							return e(n, i)
						})
					}
				}
			}, {
				key: "performance",
				value: function() {
					var e = [];
					return this.ListenerQueue.map(function(t) {
						e.push(t.performance())
					}), e
				}
			}, {
				key: "elRenderer",
				value: function(e, t, n) {
					if (e.el) {
						var i = e.el,
							r = e.bindType,
							o = void 0;
						switch (t) {
						case "loading":
							o = e.loading;
							break;
						case "error":
							o = e.error;
							break;
						default:
							o = e.src
						}
						r ? i.style[r] = "url(" + o + ")" : i.getAttribute("src") !== o && i.setAttribute("src", o), i.setAttribute("lazy", t), this.$emit(t, e, n), this.options.adapter[t] && this.options.adapter[t](e, this.options)
					}
				}
			}, {
				key: "valueFormatter",
				value: function(e) {
					var t = e,
						n = this.options.loading,
						i = this.options.error;
					return u(e) && (e.src || this.options.silent || console.error("Vue Lazyload warning: miss src with " + e), t = e.src, n = e.loading || this.options.loading, i = e.error || this.options.error), {
						src: t,
						loading: n,
						error: i
					}
				}
			}]), d
		}()
	}, E = function(e) {
		return {
			props: {
				tag: {
					type: String,
				default:
					"div"
				}
			},
			render: function(e) {
				return this.show === !1 ? e(this.tag) : e(this.tag, null, this.$slots.
			default)
			},
			data: function() {
				return {
					state: {
						loaded: !1
					},
					rect: {},
					show: !1
				}
			},
			mounted: function() {
				e.addLazyBox(this), e.lazyLoadHandler()
			},
			beforeDestroy: function() {
				e.removeComponent(this)
			},
			methods: {
				getRect: function() {
					this.rect = this.$el.getBoundingClientRect()
				},
				checkInView: function() {
					return this.getRect(), h && this.rect.top < window.innerHeight * e.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * e.options.preLoad && this.rect.right > 0
				},
				load: function() {
					this.show = !0, this.state.loaded = !0, this.$emit("show", this)
				}
			}
		}
	}, $ = {
		install: function(e) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				i = T(e),
				r = new i(n),
				o = "2" === e.version.split(".")[0];
			e.prototype.$Lazyload = r, n.lazyComponent && e.component("lazy-component", E(r)), o ? e.directive("lazy", {
				bind: r.add.bind(r),
				update: r.update.bind(r),
				componentUpdated: r.lazyLoadHandler.bind(r),
				unbind: r.remove.bind(r)
			}) : e.directive("lazy", {
				bind: r.lazyLoadHandler.bind(r),
				update: function(e, n) {
					t(this.vm.$refs, this.vm.$els), r.add(this.el, {
						modifiers: this.modifiers || {},
						arg: this.arg,
						value: e,
						oldValue: n
					}, {
						context: this.vm
					})
				},
				unbind: function() {
					r.remove(this.el)
				}
			})
		}
	};
	return $
});