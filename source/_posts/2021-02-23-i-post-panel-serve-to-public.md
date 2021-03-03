---
title: Panel serve to public
dd: panelservepublic
category: timeline
tags: article
image: https://docs.conda.io/en/latest/_images/conda_logo.svg
---

# panel serve options
```python
# The pn.serve accepts a number of arguments: [source](https://docs.bokeh.org/en/latest/docs/reference/server/server.html#bokeh.server.server.Server)

class Serve(Subcommand):
    ''' Subcommand to launch the Bokeh server.
    '''

    #: name for this subcommand
    name = "serve"

    help = "Run a Bokeh server hosting one or more applications"

    args = base_serve_args + (
        ('files', dict(
            metavar = 'DIRECTORY-OR-SCRIPT',
            nargs   = '*',
            help    = "The app directories or scripts to serve (serve empty document if not specified)",
            default = None,
        )),

        ('--args', dict(
            metavar = 'COMMAND-LINE-ARGS',
            nargs   = argparse.REMAINDER,
            help    = "Command line arguments remaining to passed on to the application handler. "
                      "NOTE: if this argument precedes DIRECTORY-OR-SCRIPT then some other argument, e.g. "
                      "--show, must be placed before the directory or script. ",
        )),

        ('--dev', dict(
            metavar ='FILES-TO-WATCH',
            action  ='store',
            default = None,
            type    = str,
            nargs   = '*',
            help    = "Enable live reloading during app development. "
                      "By default it watches all *.py *.html *.css *.yaml files "
                      "in the app directory tree. Additional files can be passed "
                      "as arguments. "
                      "NOTE: if this argument precedes DIRECTORY-OR-SCRIPT then some other argument, e.g "
                      "--show, must be placed before the directory or script. "
                      "NOTE: This setting only works with a single app. "
                      "It also restricts the number of processes to 1. "
                      "NOTE FOR WINDOWS USERS : this option must be invoked using "
                      "'python -m bokeh'. If not Tornado will fail to restart the "
                      "server",
        )),

        ('--show', dict(
            action = 'store_true',
            help   = "Open server app(s) in a browser",
        )),

        ('--allow-websocket-origin', dict(
            metavar = 'HOST[:PORT]',
            action  = 'append',
            type    = str,
            help    = "Public hostnames which may connect to the Bokeh websocket",
        )),

        ('--prefix', dict(
            metavar = 'PREFIX',
            type    = str,
            help    = "URL prefix for Bokeh server URLs",
            default = None,
        )),

        ('--keep-alive', dict(
            metavar = 'MILLISECONDS',
            type    = int,
            help    = "How often to send a keep-alive ping to clients, 0 to disable.",
            default = None,
        )),

        ('--check-unused-sessions', dict(
            metavar = 'MILLISECONDS',
            type    = int,
            help    = "How often to check for unused sessions",
            default = None,
        )),

        ('--unused-session-lifetime', dict(
            metavar = 'MILLISECONDS',
            type    = int,
            help    = "How long unused sessions last",
            default = None,
        )),

        ('--stats-log-frequency', dict(
            metavar = 'MILLISECONDS',
            type    = int,
            help    = "How often to log stats",
            default = None,
        )),

        ('--mem-log-frequency', dict(
            metavar = 'MILLISECONDS',
            type    = int,
            help    = "How often to log memory usage information",
            default = None,
        )),

        ('--use-xheaders', dict(
            action = 'store_true',
            help   = "Prefer X-headers for IP/protocol information",
        )),

        ('--ssl-certfile', dict(
            metavar = 'CERTFILE',
            action  = 'store',
            default = None,
            help    = 'Absolute path to a certificate file for SSL termination',
        )),

        ('--ssl-keyfile', dict(
            metavar = 'KEYFILE',
            action  = 'store',
            default = None,
            help    = 'Absolute path to a private key file for SSL termination',
        )),

        ('--session-ids', dict(
            metavar = 'MODE',
            action  = 'store',
            default = None,
            choices = SESSION_ID_MODES,
            help    = "One of: %s" % nice_join(SESSION_ID_MODES),
        )),

        ('--auth-module', dict(
            metavar = 'AUTH_MODULE',
            action  = 'store',
            default = None,
            help    = 'Absolute path to a Python module that implements auth hooks',
        )),

        ('--enable-xsrf-cookies', dict(
            action  = 'store_true',
            default = False,
            help    = 'Whether to enable Tornado support for XSRF cookies. All '
                      'PUT, POST, or DELETE handlers must be properly instrumented '
                      'when this setting is enabled.'
        )),

        ('--exclude-headers', dict(
            action  = 'store',
            default = None,
            nargs='+',
            help    = 'A list of request headers to exclude from the session '
                      'context (by default all headers are included).'
        )),

        ('--exclude-cookies', dict(
            action  = 'store',
            default = None,
            nargs='+',
            help    = 'A list of request cookies to exclude from the session '
                      'context (by default all cookies are included).'
        )),

        ('--include-headers', dict(
            action  = 'store',
            default = None,
            nargs='+',
            help    = 'A list of request headers to make available in the session '
                      'context (by default all headers are included).'
        )),

        ('--include-cookies', dict(
            action  = 'store',
            default = None,
            nargs='+',
            help    = 'A list of request cookies to make available in the session '
                      'context (by default all cookies are included).'
        )),

        ('--cookie-secret', dict(
            metavar = 'COOKIE_SECRET',
            action  = 'store',
            default = None,
            help    = 'Configure to enable getting/setting secure cookies',
        )),

        ('--index', dict(
            metavar = 'INDEX',
            action  = 'store',
            default = None,
            help    = 'Path to a template to use for the site index',
        )),

        ('--disable-index', dict(
            action = 'store_true',
            help   = 'Do not use the default index on the root path',
        )),

        ('--disable-index-redirect', dict(
            action = 'store_true',
            help   = 'Do not redirect to running app from root path',
        )),

        ('--num-procs', dict(
            metavar = 'N',
            action  = 'store',
            help    = "Number of worker processes for an app. Using "
                      "0 will autodetect number of cores (defaults to 1)",
            default = 1,
            type    = int,
        )),

        ('--session-token-expiration', dict(
            metavar = 'N',
            action  = 'store',
            help    = "Duration in seconds that a new session token "
                      "is valid for session creation. After the expiry "
                      "time has elapsed, the token will not be able "
                      "create a new session (defaults to  seconds).",
            default = DEFAULT_SESSION_TOKEN_EXPIRATION,
            type    = int,
        )),

        ('--websocket-max-message-size', dict(
            metavar = 'BYTES',
            action  = 'store',
            help    = "Set the Tornado websocket_max_message_size value "
                      "(default: 20MB)",
            default = DEFAULT_WEBSOCKET_MAX_MESSAGE_SIZE_BYTES,
            type    = int,
        )),

        ('--websocket-compression-level', dict(
            metavar = 'LEVEL',
            action  = 'store',
            help    = "Set the Tornado WebSocket compression_level",
            default = None,
            type    = int,
        )),

        ('--websocket-compression-mem-level', dict(
            metavar = 'LEVEL',
            action  = 'store',
            help    = "Set the Tornado WebSocket compression mem_level",
            default = None,
            type    = int,
        )),

        ('--glob', dict(
            action='store_true',
            help='Process all filename arguments as globs',
        )),
    )
```

## address - serve as public ip address
setting the address=public ip, bokeh server will listen on this ip address. bokeh client could get the js script includes this public ip, which will be used for further bokeh js download and socket setup
## --allow-websocket-origin
The origin URLs can access the bokeh server. 403 will be returned for unlisted URLs. 
"*" can be set to allow any origin.

