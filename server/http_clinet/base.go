package httpclinet

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"
)

type Client struct {
	httpClient *http.Client
}

func New(timeout time.Duration) *Client {
	return &Client{
		httpClient: &http.Client{
			Timeout: timeout,
		},
	}
}

// Generic request
func (c *Client) doRequest(ctx context.Context, method, url string, body any, headers map[string]string) ([]byte, error) {
	var reqBody io.Reader

	// 如果有 body，自动转成 JSON
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			return nil, err
		}
		reqBody = bytes.NewBuffer(b)
	}

	req, err := http.NewRequestWithContext(ctx, method, url, reqBody)
	if err != nil {
		return nil, err
	}

	// 默认 JSON
	req.Header.Set("Content-Type", "application/json")
	for k, v := range headers {
		req.Header.Set(k, v)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}

// GET
func (c *Client) Get(ctx context.Context, url string, headers map[string]string) ([]byte, error) {
	return c.doRequest(ctx, http.MethodGet, url, nil, headers)
}

// POST JSON
func (c *Client) Post(ctx context.Context, url string, body any, headers map[string]string) ([]byte, error) {
	return c.doRequest(ctx, http.MethodPost, url, body, headers)
}
