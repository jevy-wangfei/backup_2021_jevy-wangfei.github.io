---
title: Panel serve
dd: panelserve
category: timeline
tags: article
image: https://panel.holoviz.org/_static/logo_stacked.png
---

# Relationship between panel, holoviews, and bokeh
The HoloViews pane renders HoloViews plots with one of the plotting backends supported by HoloViews. It supports the regular HoloViews widgets for exploring the key dimensions of a HoloMap or DynamicMap, but is more flexible than the native HoloViews widgets since it also allows customizing widget types and their position relative to the plot. [source](https://panel.holoviz.org/reference/panes/HoloViews.html)

HoloViews supports backends: 'bokeh', 'matplotlib', or 'plotly'

# Serve panel 

## Two ways of serving panel
### .servable() and panel serve **.py/ipynb
Any .py or .ipynb file that attaches a plot to Bokeh's curdoc can be deployed using panel serve. The easiest way to do this is using wrapping the HoloViews component in Panel using pn.panel(hvobj) and then calling the panel_obj.servable() method, which accepts any HoloViews object ensures that the plot is discoverable by Panel and the underlying Bokeh server. [source](http://holoviews.org/user_guide/Deploying_Bokeh_Apps.html)

```bash
# Serve .py or .ipynb file
panel serve --allow-websocket-origin=localhost:3000 --address=localhost --port=5006 **.py
```
```python
# Serve .py or .ipynb file within Flask using Threading in different ports
def services():
    thread_pool = []
    # json_files is a json configration, which includes multiple config sections
    for json_file in json_files:
        comm = f'panel serve --allow-websocket-origin=localhost:3000 --address=localhost --port={str(json_file["file_port"])}{json_file["file_path"]}'
        thread_pool.append(comm)
    return thread_pool

# Run threads
for comm in services():
    Thread(target=os.system, args=(comm,)).start() 
```

### pn.serve()
When using pn.serve all sessions will share the same state, and may cause a problem that a client's activity may affect other clients. Therefore it is best to wrap the creation of the app in a function which we can then provide to pn.serve. For example:

```python
xarray_dataset =  xr.open_dataset("**.nc")

def plot(xarray_dataset):
    image = ds_grouped_ndvi.hvplot('x', 'y').opts(cmap='RdYlGn')
    stream = hv.streams.Tap(source=image, x=104, y=10)
    @pn.depends(stream.param.x, stream.param.y)
    def timeseries(x, y):
        return xarray_dataset.sel(x=x, y=y, method='nearest').hvplot('time')
    return pn.Column(image, timeseries)

# This would cause sharing state issue
pn.serve(plot(xarray_dataset))

def serve_func():
    return plot(xarray_dataset)
# Because serving a function, every call will create a new function, and further new panel layout
pn.serve(result_func)
```

# Access panel service in URL
## pull_session() and server_session()
```python
from bokeh.client import pull_session
from bokeh.embed import server_session
```
> pull_session() method at bokeh.client.session will not work for large socket message size. A config will exposed at bokeh 2.3.
```python
# FastAPI example
@app.get("/test")
def getViewByName(request: Request, ):
    url = 'http://localhost:5006'
    with pull_session(url=url) as session:
        script = server_session(session_id=session.id, url=url)
    return templates.TemplateResponse('embed_div.html', context={'request': request, 'script': script})

```

## server_document()
```python
from bokeh.embed import server_document
```
```python
# FastAPI example
@app.get("/test4")
def getViewByName(request: Request, ):
    url = 'http://localhost:5008'
    script = server_document(url)
    return templates.TemplateResponse('embed_div.html', context={'request': request, 'script': script})