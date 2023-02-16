https://ctf.bugku.com/challenges/detail/id/120.html

https://github.com/koush/AndroidAsync

implementation 'com.koushikdutta.async:androidasync:2.+'

```java
AsyncHttpServer server = new AsyncHttpServer();

        server.get("/", new HttpServerRequestCallback() {
            @Override
            public void onRequest(AsyncHttpServerRequest request, AsyncHttpServerResponse response) {
                response.send("Hello!!!");
            }
        });

        server.post("/post", new HttpServerRequestCallback() {
            @Override
            public void onRequest(AsyncHttpServerRequest request, AsyncHttpServerResponse response) {
//                response.send("Hello!!!");
                AsyncHttpRequestBody body = request.getBody();
                Object body_ = body.get();
                String arg0_value = ((Multimap)body_).get("arg0").get(0);
                String arg1_value = ((Multimap)body_).get("arg1").get(0);
                Log.e("xposedcrackloop","arg0="+arg0_value);
                response.send(arg0_value+arg1_value);

            }
        });
        server.post("/post2", new HttpServerRequestCallback() {
            @Override
            public void onRequest(AsyncHttpServerRequest request, AsyncHttpServerResponse response) {
                response.send("Hello!!!");
            }
        });

        // listen on port 5000
        server.listen(5000);
```