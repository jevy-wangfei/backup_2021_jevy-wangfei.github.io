---
title: Tips using Azure
dd: tipsusingazure
category: timeline
tags: article
image: https://etzglobal.com/wp-content/uploads/2019/09/Azure-logo.png
---
# Monitoring Config
Azure Application insight has sampling feature (default enable) that will randomly ignore some of logs when it exceeds a specified threshold (unknown the threshold). 
The Azure function monitoring tracking could tell you the failure or success by inspecting the log. The sampling feature would cause the problem of not telling you the result of function execution. [source](https://docs.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2#configure-sampling)
Adding following config at Azure function host.json to disable it:
```json
{
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": false,
        "maxTelemetryItemsPerSecond" : 20,
        "excludedTypes": "Request;Exception"
      }
    }
  }
}
``` 

# Azure Function
## Shared 
Because many functions (may not only yours) share computing resources, there are some limitations:
- Multiple functions within a Azure function application may clash
- There are many Azure defined limitations such as Threads, processes, connections, sockets, etc. [source](https://github.com/projectkudu/kudu/wiki/Azure-Web-App-sandbox#app-service-plans-and-sandbox-limits)

## webapp
- So far so good, need pay higher fees. Didn't see values comparing with VMs.

