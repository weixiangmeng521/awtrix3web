package awtrix_api

import (
	"awtrix3web/cacher"
	"awtrix3web/constants"
	"awtrix3web/controller"
	"context"
)

/*
|--------------------------------------------------------------------------
| Caches (singleton, typed)
|--------------------------------------------------------------------------
*/

var (
	StatsCache       = cacher.Get[*controller.AwtrixStats]()
	TransitionsCache = cacher.Get[[]string]()
	EffectsCache     = cacher.Get[[]string]()
	LoopInfoCache    = cacher.Get[*controller.AppLoopInfo]()
	SettingsCache    = cacher.Get[*controller.AwtrixSettings]()
)

/*
|--------------------------------------------------------------------------
| Stats
|--------------------------------------------------------------------------
*/

func (c *AwtrixClient) fetchAwtrixStats() (*controller.AwtrixStats, error) {
	var out controller.AwtrixStats
	err := c.request(
		context.Background(),
		"GET",
		"/api/stats",
		nil,
		&out,
	)
	if err != nil {
		return nil, err
	}
	return &out, nil
}

func (c *AwtrixClient) SyncAwtrixStatsTask() {
	stats, err := c.fetchAwtrixStats()
	if err != nil {
		return
	}
	StatsCache.Set(constants.AWTRIX_STATE, stats, 0)
}

/*
|--------------------------------------------------------------------------
| Transitions
|--------------------------------------------------------------------------
*/

func (c *AwtrixClient) fetchAwtrixTransitions() ([]string, error) {
	var out []string
	err := c.request(
		context.Background(),
		"GET",
		"/api/transitions",
		nil,
		&out,
	)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *AwtrixClient) SyncAwtrixTransitionsTask() {
	list, err := c.fetchAwtrixTransitions()
	if err != nil {
		return
	}
	TransitionsCache.Set(constants.AWTRIX_TRANSITIONS, list, 0)
}

/*
|--------------------------------------------------------------------------
| Effects
|--------------------------------------------------------------------------
*/

func (c *AwtrixClient) fetchAwtrixEffects() ([]string, error) {
	var out []string
	err := c.request(
		context.Background(),
		"GET",
		"/api/effects",
		nil,
		&out,
	)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *AwtrixClient) SyncAwtrixEffectsTask() {
	list, err := c.fetchAwtrixEffects()
	if err != nil {
		return
	}
	EffectsCache.Set(constants.AWTRIX_EFFECTS, list, 0)
}

/*
|--------------------------------------------------------------------------
| Loop Info
|--------------------------------------------------------------------------
*/

func (c *AwtrixClient) fetchAwtrixLoopInfo() (*controller.AppLoopInfo, error) {
	var out controller.AppLoopInfo
	err := c.request(
		context.Background(),
		"GET",
		"/api/loop",
		nil,
		&out,
	)
	if err != nil {
		return nil, err
	}
	return &out, nil
}

func (c *AwtrixClient) SyncAwtrixLoopInfoTask() {
	info, err := c.fetchAwtrixLoopInfo()
	if err != nil {
		return
	}
	LoopInfoCache.Set(constants.AWTRIX_LOOP_INFO, info, 0)
}

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

func (c *AwtrixClient) fetchAwtrixSettings() (*controller.AwtrixSettings, error) {
	var out controller.AwtrixSettings
	err := c.request(
		context.Background(),
		"GET",
		"/api/settings",
		nil,
		&out,
	)
	if err != nil {
		return nil, err
	}
	return &out, nil
}

func (c *AwtrixClient) SyncAwtrixSettingsTask() {
	settings, err := c.fetchAwtrixSettings()
	if err != nil {
		return
	}
	SettingsCache.Set(constants.AWTRIX_SETTINGS, settings, 0)
}
