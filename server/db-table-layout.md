# Database's table layout
## 保存する情報
- 検索クエリ：検索に使った単語群 (text, non-null制約)
- 日時：データが送信された日時 (timestamp, non-null制約)
- URL：閲覧したページのURL (text, non-null制約)
- 検索順位：閲覧したページが結果の何番目に表示されていたか (int, non-null制約)
