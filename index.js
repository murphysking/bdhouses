var cver = "1.2";
!(function () {
    var e, n;
    localStorage.getItem("cver") === cver
        ? ((e = Promise.resolve(JSON.parse(localStorage.getItem("compact")))),
          (n = Promise.resolve(JSON.parse(localStorage.getItem("static")))))
        : (localStorage.setItem("cver", cver),
          (e = fetch("compact.json").then(function (e) {
              return (
                  e
                      .clone()
                      .text()
                      .then((e) => localStorage.setItem("compact", e)),
                  e.json()
              );
          })),
          (n = fetch("static.json").then(function (e) {
              return (
                  e
                      .clone()
                      .text()
                      .then((e) => localStorage.setItem("static", e)),
                  e.json()
              );
          }))),
        Promise.all([e, n]).then(function (u) {
            (e = u[0]),
                (n = u[1]),
                console.time(1),
                (function () {
                    var u = new Set(),
                        c = {};
                    for (var a in e.houses)
                        l(e.houses[a]),
                            (t[a] = { id: a, children: [], sel: {} });
                    function l(n) {
                        if (!c[n.id]) {
                            if (u.has(n.id)) throw "infinity loop occurred";
                            u.add(n.id);
                            var t = {};
                            c[n.id] = t;
                            var s = new Set(),
                                r = [];
                            n.require.forEach(function (n) {
                                l(e.houses[n]),
                                    c[n].required.forEach(function (e) {
                                        s.add(e);
                                    });
                            }),
                                n.require.forEach(function (e) {
                                    s.has(e) || r.push(e);
                                });
                            var o = r.slice(0);
                            s.forEach(function (e) {
                                o.push(e);
                            }),
                                (t.required = o),
                                (t.parents = r),
                                u.delete(n.id);
                        }
                    }
                    for (var a in c)
                        c[a].parents.forEach(function (e) {
                            t[e].children.push(a);
                        });
                    for (var a in c)
                        0 === c[a].parents.length && f(e.houses[a].location, a);
                    function f(e, n) {
                        s[e]
                            ? s[e].children.push(n)
                            : (s[e] = { children: [n], sel: {}, types: {} });
                    }
                    for (var a in s) i(s[a]);
                    for (var a in e.houses) {
                        for (var h in e.houses[a].usage) {
							console.log(n,h,n[h]);
                            (r[h] = !0),
                                (s[e.houses[a].location].types[h] = !0),
                                n[h] ||
                                    e.houses[a].usage[h].designs.forEach(
                                        function (e, n) {
                                            e.forEach(function (e) {
                                                p(e, a, h, n + 1);
                                            });
                                        }
                                    );
                        }
                    }
                    function p(e, n, t, s) {
                        o[e] || (o[e] = []),
                            o[e].push({ id: n, type: t, level: s });
                    }
                    r = Object.keys(r).sort();
                })(),
                console.timeEnd(1),
                f.r();
        });
    var t = {},
        s = {},
        r = {},
        o = {};
    function i(e) {
        var n = 1;
        e.children.forEach(function (e) {
            t[e].com || i(t[e]), (n *= t[e].com + 1);
        }),
            (e.com = n);
    }
    function u(s, r) {
        if (!s.sel[r]) {
            (s.sel[r] = []),
                s.children.forEach(function (e) {
                    u(t[e], r);
                    var n = t[e].sel[r];
                    s.sel[r] = (function (e, n) {
                        var t = [];
                        e.forEach(function (e) {
                            n.forEach(function (n) {
                                var s = {
                                    cpoints: e.cpoints + n.cpoints,
                                    n: e.n + n.n,
                                    s: {
                                        operator: "multiply",
                                        operands: [e.s, n.s],
                                        com: c(e.s) * c(n.s),
                                    },
                                };
                                t.push(s);
                            });
                        }),
                            (t = t.concat(e, n)).sort(function (e, n) {
                                return e.cpoints - n.cpoints || n.n - e.n;
                            });
                        var s = -1,
                            r = -1,
                            o = [];
                        return (
                            t.forEach(function (e) {
                                e.cpoints > s
                                    ? (e.n > r && ((r = e.n), o.push(e)),
                                      (s = e.cpoints))
                                    : e.cpoints === s &&
                                      e.n === r &&
                                      (o[o.length - 1].s = {
                                          operator: "add",
                                          operands: [o[o.length - 1].s, e.s],
                                          com: c(o[o.length - 1].s) + c(e.s),
                                      });
                            }),
                            o
                        );
                    })(
                        s.sel[r],
                        n.map(function (n) {
                            return (function (e, n) {
                                var t = {};
                                return (
                                    (t[n] = e.cpoints),
                                    { cpoints: e.cpoints, n: e.n, s: [t] }
                                );
                            })(n, e);
                        })
                    );
                });
            var o,
                i = {
                    cpoints: ((o = s.id), (o && e.houses[o].cpoints) || 0),
                    n: (function (t, s) {
                        return t && e.houses[t].usage[s]
                            ? n[s][e.houses[t].usage[s].level - 1]
                            : 0;
                    })(s.id, r),
                    s: [{}],
                };
            s.sel[r].forEach(function (e) {
                (e.cpoints += i.cpoints), (e.n += i.n);
            }),
                s.sel[r].unshift(i);
        }
        function c(e) {
            return e.com || e.length;
        }
    }
    Vue.component("cpval", httpVueLoader("cpval.vue")),
        Vue.component("search", httpVueLoader("search.vue")),
        Vue.component("info", httpVueLoader("info.vue")),
        Vue.component("sorttable", httpVueLoader("sorttable.vue"));
    var c,
        a = {
            zones: null,
            cpvals: [],
            types: [],
            results: [],
            s_village: "all",
        },
        l = h(),
        f = h();
    function h() {
        var e,
            n = new Promise(function (n) {
                e = n;
            });
        return (n.r = e), n;
    }
    addEventListener("DOMContentLoaded", l.r),
        Promise.all([l, f]).then(function () {
            var i = {};
            for (var u in s) l(e.houses[s[u].children[0]].zone, u);
            function l(e, n) {
                i[e] || (i[e] = []), i[e].push(n);
            }
            for (var u in i) i[u].sort();
            var f = [];
            for (var u in (Object.keys(i)
                .sort()
                .forEach(function (e) {
                    f.push({ zone: e, villages: i[e] });
                }),
            (a.zones = f),
            n))
                n[u] && n[u].length && a.cpvals.push(u);
            (a.scp = a.cpvals[0]),
                (a.types = r),
                (c = new Vue({
                    el: "#app",
                    data: a,
                    methods: {
                        search: function () {
                            g(this.$refs.search.value);
                        },
                        calcCP: function () {
                            v(
                                this.$refs.cpvalue.value,
                                this.$refs.village.value,
                                !0
                            );
                        },
                        hasType: function (e, n) {
                            return !0 === s[n].types[e];
                        },
                        listInfo: function () {
                            !(function (r, o, i, u) {
                                if (i) {
                                    if (u) {
                                        var c = a.results.indexOf(u);
                                        if (-1 !== c)
                                            return void l(d(a.results[c].key));
                                    }
                                    for (
                                        var c = 0;
                                        a.results[c] &&
                                        "info" !== a.results[c].is;

                                    )
                                        c++;
                                    if (c < a.results.length)
                                        return void l(d(a.results[c].key));
                                }
                                function l(i) {
                                    i.update(r, o, s, t, e, n);
                                }
                                a.results.unshift({
                                    is: "info",
                                    key: p++,
                                    init: function (e) {
                                        l(d(e));
                                    },
                                });
                            })(
                                this.$refs.types.value,
                                this.$refs.village.value,
                                !0
                            );
                        },
                    },
                }));
            var h = {};
            for (var u in e.designs)
                h[e.designs[u]] || (h[e.designs[u]] = []),
                    h[e.designs[u]].push(u);
            function g(n) {
                !(function (n, t, s, r, i) {
                    var u = [];
                    if (
                        (t.forEach(function (n) {
                            o[n].forEach(function (n) {
                                "all" === s
                                    ? u.push(n)
                                    : e.houses[n.id].location === s &&
                                      u.push(n);
                            });
                        }),
                        (u = u.map(function (n) {
                            return [
                                e.houses[n.id].title,
                                n.type,
                                n.level,
                                e.houses[n.id].usage[n.type].level,
                                e.houses[n.id].cpoints,
                            ];
                        })).sort(function (e, n) {
                            return (
                                e[4] - n[4] ||
                                n[3] - e[3] ||
                                e[0].localeCompare(n[0]) ||
                                e[1].localeCompare(n[1]) ||
                                e[2] - n[2]
                            );
                        }),
                        r)
                    ) {
                        if (i) {
                            var c = a.results.indexOf(i);
                            if (-1 !== c) return void l(d(a.results[c].key));
                        }
                        for (
                            var c = 0;
                            a.results[c] && "search" !== a.results[c].is;

                        )
                            c++;
                        if (c < a.results.length)
                            return void l(d(a.results[c].key));
                    }
                    function l(e) {
                        e.update(n, u);
                    }
                    a.results.unshift({
                        is: "search",
                        key: p++,
                        init: function (e) {
                            l(d(e));
                        },
                    });
                })(
                    (n = n || c.$refs.search.value),
                    h[n] || [],
                    c.$refs.village.value,
                    !0
                );
            }
            $("#search").search({
                source: Object.keys(h).map(function (e) {
                    return { title: e };
                }),
                searchFields: ["title"],
                onSelect: function (e) {
                    g(e.title);
                },
            }),
                0 === a.results.length && v("仓库", "卡尔佩恩首都");
        });
    var p = 0;
    function v(r, o, i, c) {
        if ("all" !== o) s[o].sel[r] || u(s[o], r);
        else for (var l in s) s[l].sel[r] || u(s[l], r);
        if (i) {
            if (c)
                if (-1 !== (l = a.results.indexOf(c)))
                    return void f(d(a.results[l].key));
            for (l = 0; a.results[l] && "cpval" !== a.results[l].is; ) l++;
            if (l < a.results.length) return void f(d(a.results[l].key));
        }
        function f(i) {
            i.update(r, o, s, t, e, n, CanvasJS);
        }
        a.results.unshift({
            is: "cpval",
            key: p++,
            init: function (e) {
                f(d(e));
            },
        });
    }
    function d(e) {
        for (var n = 0; n < c.$refs.results.length; n++)
            if (c.$refs.results[n].k === e) return c.$refs.results[n];
    }
})();
