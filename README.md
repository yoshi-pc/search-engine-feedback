# search-engine-feedback

この内容は、html/options.htmlとほぼ同等の内容になっています。

## この拡張機能の概要
検索エンジンから返答される検索結果には、理想的な情報量の文書で上位が埋め尽くされていることが理想です。
しかしながら、検索結果の上位には中身のない(=情報が何も得られない)Webページが多く表示されることも少なくなく、情報収集の妨げにもなっています。

そういったWebページを検索結果の上位に表示されにくくなるような手法を提案すべく、クラウドソーシングのような形式でデータを収集する目的でこの拡張機能は開発されました。

## この拡張機能が扱う情報
この拡張機能は、研究の性質上、インストールされたChromeブラウザについて情報収集を行い、リモートのサーバーにそれらを送信することがあります。
その際、以下に挙げる情報を**直接**送信します：

- 検索クエリ
    - 検索する際に使用した単語群を収集し送信します。
- 訪問したページ
    - あなたがどのページを訪問したのか、ハイパーリンクの情報を利用して収集し送信します。閲覧したページ内についての情報は、この拡張機能では収集を行いません。
- 結果順位
    - あなたが訪問したページが検索結果画面の何番目に表示されていたのか、収集し送信します。
- クリック座標
    - あなたがページを訪問した際のクリック座標を収集し送信します。これは複数のクリック座標を取得するのではなく、リンクのクリックに使われた最新1回分の座標のみを取得します。
- 評価値
    - ユーザが明示的にクリックし、送信した実際の評価値を収集し送信します。

また、以上のデータを収集するのに加えて、以下のような情報をサーバー側で独自に取得し、記録します。

- 送信元IPアドレス
    - 評価を送信したユーザのIPアドレスをサーバー側のプログラムで**独自に**収集し、記録します。これは実験に参加したユーザー数を概算するために使用されるものですが、例外的に荒らし対策といった単一IPからの攻撃防止にも使われることがあります。
    - なお、IPアドレスでは契約しているネットワークプロバイダや大まかな発信元の地域が特定されることはありますが、具体的な個人を特定することはできません。
- 送信日時
    - 評価情報をサーバー側が受信した(≒ユーザー側が送信した)日時を記録します。

## データの保存方法
本拡張機能を利用して送信された、あるいは収集したデータは全てリモートのサーバに保存され、今後の研究のために分析されます。データの種類自体には個人を直接特定するための情報は含まれていませんが、分析の際にも十分な匿名化の上、利用します。

## データの共有
本拡張機能を経由して収集された情報は、直接第三者へ開示は行いません。ただし、十分な匿名化の後に行われた分析による研究の成果、あるいは研究成果の発表における資料としてデータの一部が開示される可能性があります。

## この拡張機能が守る条件
以下に挙げる条件を守ることを開発者は誓います。

- あなたが手動で選択したもののみ情報を送信します。評価画面を通じて送信に同意していただいた情報のみ送信します。
- あなたが知らないうちに情報を送信しません。マルウェアのように、あなたの意図しないような動作はしません。
- 情報を送信した際には、あなたに分かりやすく表示します。
- 個人が特定できるような情報を付加して送信したりしません。あなたのメールアドレス、PCの使用状況などといった個人を特定できうる情報は一切送信しません。

## あなたが守るべき条件
ただし、以下に挙げる内容にあなたは同意していただく必要があります。

- あなたが送信することに同意し、実際に送信された情報について、その保存の取り消しを要求することは行いません。

## 諸条件について
以上の項目について、全て確認・同意していただいた場合のみ、この拡張機能を用いたプロジェクトにご参加ください。もし、1つでもご同意をいただけないのであれば、この拡張機能を削除してください。

## バグや提案の送信先
この拡張機能は、GitHub上のRepositoryで管理されています。Issueを投稿することで、バグの報告や提案を行うことができます。もしお気づきの点がありましたら、お気軽に投稿してください。(要・GitHubアカウント)
