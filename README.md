# dify_search
## frontend
https://dify-search.vercel.app/

## backend
cloud run

#### ローカルでバックエンドサーバーを立ち上げる場合
```
NEXT_PUBLIC_BACKEND_URLにhttp://localhost:8080を指定して以下を実行
docker compose up -d 
```
## memo
```sh
vercel login
vercel link
```
```
vercel.json
{
    "git": {
      "deploymentEnabled": {
        "my-branch-name": false
      }
    }
}
```
```
.envにNEXT_PUBLIC_DIFY_API_KEYを設定
.envにNEXT_PUBLIC_BACKEND_URL(cloud run url)を設定
```
