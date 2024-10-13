# ベースイメージを指定
FROM python:3.10-slim

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係をインストール
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー

COPY . .

# アプリケーションを実行
CMD ["python", "app.py"]