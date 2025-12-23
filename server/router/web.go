package router

import (
	"awtrix3web/controller/http_events"
	"awtrix3web/middleware"
	"net/http"
)

type Router struct {
	mux         *http.ServeMux
	middlewares []middleware.Middleware
}

func NewRouter(server *http.ServeMux) *Router {
	return &Router{
		mux: server,
	}
}

func (r *Router) Use(m middleware.Middleware) {
	r.middlewares = append(r.middlewares, m)
}

func (r *Router) apply(h middleware.HandlerFunc) middleware.HandlerFunc {
	for i := len(r.middlewares) - 1; i >= 0; i-- {
		h = r.middlewares[i](h)
	}
	return h
}

func method(method string, h middleware.HandlerFunc) middleware.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != method {
			w.WriteHeader(http.StatusMethodNotAllowed)
			w.Write([]byte("Method Not Allowed"))
			return
		}
		h(w, r)
	}
}

func (r *Router) Handle(path string, h middleware.HandlerFunc) {
	r.mux.HandleFunc(path, r.apply(h))
}

func (r *Router) GET(path string, h middleware.HandlerFunc) {
	r.Handle(path, method(http.MethodGet, h))
}

func (r *Router) POST(path string, h middleware.HandlerFunc) {
	r.Handle(path, method(http.MethodPost, h))
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	r.mux.ServeHTTP(w, req)
}

func InitRouter(server *http.ServeMux) {
	r := NewRouter(server)
	r.Use(middleware.Recover())
	r.Use(middleware.Logger())
	r.Use(middleware.CORS())

	r.GET("/", http_events.Index)
	r.GET("/api/check-is-awtrix-device", http_events.CheckIsAwtrixDevice)
	r.GET("/api/reboot-device", http_events.RebootDevice)
}
