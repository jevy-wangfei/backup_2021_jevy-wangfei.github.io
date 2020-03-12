---
layout: default
title: Parse URL params using API Gateway and lambda
category: timeline
tags: article
---

## Lambda script
Lambda could collect POST boday and url params using `event` . For POST body, params could be extracted directly like `event['param1']`. 
As of September 2017, you no longer have to configure mappings to access the request body. 
All you need to do is check, "Use Lambda Proxy integration", under Integration Request, under the resource of AWS API Gateway.

You'll then be able to access query parameters, path parameters and headers like so
```
event['pathParameters']['param1']
event["queryStringParameters"]['queryparam1']
event['requestContext']['identity']['userAgent']
event['requestContext']['identity']['sourceIP']
```

For proxied API, the hander function should return the reponse in following format:
```json
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
```
Usually, when you see Malformed Lambda proxy response, it means your response from your Lambda function doesn't match the format API Gateway is expecting. 