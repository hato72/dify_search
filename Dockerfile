# ベースイメージを指定
FROM python:3.10-slim

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係をインストール
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY ./backend ./backend

# アプリケーションを実行
CMD ["python", "backend/app.py"]