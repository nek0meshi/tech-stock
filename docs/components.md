# UIコンポーネントディレクトリ構成設計方針

## 📌 分類方針：「UIの用途」で分類

### 方針の概要

UIコンポーネントは、**見た目や構造ではなく、「何のために使われるか」という用途（＝ユーザー体験上の目的）で分類する**。

### 背景

従来の「構造ベース（浮遊・表示面など）」による分類では、以下の課題があった：

* 同じ見た目でも用途が異なるコンポーネントが混在しやすい
* 実装者によって分類がブレやすい（Popoverはoverlay？feedback？）
* 情報設計・デザインシステムとの接続が弱い

## 📁 ディレクトリ構成案

```
/components
  /buttons          # ボタンUI（PrimaryButton, IconButton など）
  /containers       # 情報のまとまりや視覚ブロック（Card, Panel, Sectionなど）
  /data-display     # データや情報の視覚的提示（Avatar, Badge, Timelineなど）
  /features         # アプリケーション固有のUI（PostCard, UserPanelなど）
  /feedback         # 状態通知やユーザーへの反応提示（Alert, Spinner, Toastなど）
  /inputs           # 入力や選択のためのUI（TextInput, Checkbox, Dropdownなど）
  /layout           # ページ構成・構造を担うUI（Header, Footer, Gridなど）
  /modals           # モーダルUI（Dialog, ConfirmModal など）
  /navigation       # ユーザーを移動・遷移させるUI（Tabs, Breadcrumbなど）
  /typography       # テキスト
```
