# TechStock 仕様書

## 概要
TechStockは、技術系記事（Qiita、Zenn、ブログなど）の鑑賞記録・評価・メモ管理を行うアプリケーションです。  
読了済み・未読の両方を管理でき、技術習得の進捗やアウトプットのための知識ストックとして活用できます。

---

## 対象ユーザー
- 学習ログを取りたいエンジニア・学生
- 読んだ技術記事を整理・記録したい人
- 積読（つんどく）状態を可視化・管理したい人

---

## 主な機能

### 1. 記事の登録
- タイトル（手入力 or URLから自動取得）
- URL
- タグ（複数選択、技術カテゴリ：Go / Next.js / GraphQL など）
- ステータス：未読 / 読了
- 評価（★1〜5 or 自由入力）
- メモ（Markdown対応予定）
- 読了日（任意）

### 2. 記事一覧表示
- カード/リストビュー切替
- ステータスやタグでフィルタリング
- 検索バーでタイトル・タグ検索

### 3. 記事詳細ページ
- 記事情報の表示（URLリンク付き）
- 評価・メモの編集
- 削除・読了ステータスの変更

### 4. 新規追加・編集フォーム
- 入力補助（URL入力 → タイトル自動取得）
- タグは選択＋新規追加両方対応

---

## 使用技術スタック

### フロントエンド
- Next.js App Router
- TypeScript
- MUI
- urql（GraphQLクライアント）
- Jest / Playwright（テスト）

### バックエンド
- graphql-yoga
- PostgreSQL
- wire（DI）

### API層
- GraphQL（フロントとの通信）
- スキーマ設計により型安全な通信を実現

---

## データモデル（概要）

### Article
- id: string
- title: string
- url: string
- tags: Tag[]
- status: enum ("unread", "read")
- rating: number
- memo: string
- readAt: datetime?

### Tag
- id: string
- name: string

---

## 今後の拡張案（Optional）
- 認証（Auth0等で個人ごとにログ管理）
- タグ頻度の可視化（チャート）
- GitHubリポジトリ連携（学習中プロジェクトと紐付け）
- カレンダーUIでの学習可視化
