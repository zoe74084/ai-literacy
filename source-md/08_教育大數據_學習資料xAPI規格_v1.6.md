# 學習資料xAPI規格 v1.6

> 來源：教育部數位學習推動計畫 下載專區（pads.moe.edu.tw）
> 原始檔名：學習資料xAPI規格_v1.6.pdf
> 頁數：140

<!-- 第 1 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

# 學習資料 **xAPI** 規格 **1.6**

中華民國 115 年 8 月

<!-- 第 2 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

## 目錄

|壹、目的.....................................................................................................................................................................7|
|---|
|貳、應用範圍............................................................................................................... 7|
|參、引用標準............................................................................................................... 7|
|肆、使用方式............................................................................................................... 9|
|伍、學習資料類型與介接方式................................................................................... 9|
|一、資料交換方式........................................................................................................................ 9|
|二、學習資料類型........................................................................................................................ 9|
|三、API 認證與連線.............................................................................................. 10|
|四、測試與正式介接流程..................................................................................... 13|
|陸、共通資料格式與欄位填寫原則.....................................................................................................14|
|一、 XAPI STATEMENT基本結構........................................................................................... 14|
|二、欄位提供要求與勾選方式............................................................................................. 15|
|三、使用者識別資料................................................................................................................ 15|
|四、平臺、學校及學習情境................................................................................................. 15|
|五、時間與期間格式................................................................................................................ 15|
|六、文字、URL 與編碼.......................................................................................................... 15|
|七、批次、序號與錯誤處理................................................................................................. 16|
|八、資料安全與最小必要原則............................................................................................. 16|
|柒、學習資料欄位表與規格範例..........................................................................................................17|
|一、登入...................................................................................................................................................................................................17|
|1-1.登入平臺紀錄* ............................................................................................... 17|
|1-2.登入平臺統計資料日(月)報表* .................................................................... 20|
|二、學習活動.....................................................................................................................................................................................23|
|2-1.查看學習資源................................................................................................. 23|
|2-2.下載學習資源................................................................................................. 26|
|2-3.關鍵字搜尋..................................................................................................... 29|
|2-4.喜歡資源(按讚) .............................................................................................. 32|
|2-5.取消喜歡資源(取消按讚) .............................................................................. 35|
|2-6.收藏資源......................................................................................................... 38|
|2-7.取消收藏資源................................................................................................. 41|
|2-8.借閱書籍......................................................................................................... 44|
|2-9.續借書籍......................................................................................................... 47|
|2-10.歸還書籍....................................................................................................... 50|

<!-- 第 3 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|2-11.建立討論區................................................................................................... 53|
|---|
|2-12.回覆討論區................................................................................................... 56|
|2-13.建立筆記....................................................................................................... 59|
|2-14.發布作業....................................................................................................... 62<br>|
|2-15.繳交作業....................................................................................................... 65|
|2-16.獲得獎勵....................................................................................................... 68|
|三、AI 互動...........................................................................................................................................................................................71|
|3-1.向Agent提問................................................................................................. 71|
|3-2.Agent回覆...................................................................................................... 74|
|四、影音學習.....................................................................................................................................................................................77|
|4-1.觀看影片......................................................................................................... 77|
|4-2.播放影片......................................................................................................... 80|
|4-3.暫停影片......................................................................................................... 83|
|4-4.快倒轉影片..................................................................................................... 86|
|4-5.完成觀看影片................................................................................................. 89|
|五、測驗...................................................................................................................................................................................................92|
|5-1.開始測驗......................................................................................................... 92|
|5-2.回答問題(AI口說) ......................................................................................... 95|
|5-3.回答問題(選擇) ............................................................................................ 100|
|5-4.回答問題(複選) ............................................................................................ 105|
|5-5.回答問題(是非) ............................................................................................ 110|
|5-6.回答問題(配對) ............................................................................................ 115|
|5-7.回答問題(填充) ............................................................................................ 120|
|5-8.回答問題(簡答) ............................................................................................ 125|
|5-9.完成測驗....................................................................................................... 130|
|捌、附錄................................................................................................................................................................135|
|附錄一、VERBURI 對照表.................................................................................. 135|
|附錄二、教育大數據 EXTENSIONURI 對照表.................................................... 137|
|附錄三、常用列舉值與格式................................................................................ 139|
|附錄四、SUBJECTCODE對應SUBJECTNAME......................................................... 140|
|附錄五、CONTENT_TYPE查看內容類型............................................................... 140|

<!-- 第 4 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

## 圖目錄

|圖 1 ACTIVITYDATA ANDMETADATA........................................................................ 8|
|---|
|圖 2 學習歷程 POST 上傳流程............................................................................... 11|
|圖 3 學習歷程 GET 驗證流程................................................................................. 12|
|圖 4 教育大數據XAPI 測試與正式介接流程........................................................ 13|
|圖5XAPISTATEMENTPROPERTIES表...................................................................... 14|

## 表目錄

|表 1相關名詞解釋表................................................................................................ 8|
|---|
|表 2 學習資料類型.................................................................................................... 9|
|表 3 主動型 API 說明表.......................................................................................... 11|
|表 4 被動型API說明表.......................................................................................... 12|

<!-- 第 5 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### <u>修訂版本說明</u>

|版本|日期|修訂摘要|
|---|---|---|
|1.0|107/5|初版|
|1.1|108/9|1. 增加學校的識別資料說明<br>2. 增加課綱/知識架構說明|
|1.2|111/10|1. 增加xAPI必要及強烈建議傳入Statement說明<br>2. 增加使用者身分的描述說明<br>3. 紀錄時間統一格式至毫秒說明<br>4. 增加地理資訊說明<br>5. 增加片頭片尾資訊說明|
|1.3|112/10|1. 3-1.學習-學生查看素材/線上借閱查看/電子書借閱紀錄，新增：<br>學習行為觀看了多久時間<br>2. 4-6.測驗-學生完成評量，新增：此次評量的最低分、學生的得<br>分、此次評量的最高分、完成評量回饋內容|
|1.31|113/5|1. 調整4-6.測驗-學生完成評量，<br>result.score.min調整定義：此評量學生歷史實際得分的最低分<br>result.score.raw調整定義：此次評量學生的實際得分<br>result.score.max調整定義：此評量學生歷史實際得分的最高分|
|1.4|113/11|1. 若非SSO登入，可提供使用者平臺唯一代號user_id，可附加於<br>name後，如王大明+|+user_id。<br>2. 增加5-1.登入-登入平臺<br>3. 增加1-2.素材-查看教學資源，result.duration查看了多久時間<br>4. 增加2-1.影音-觀看影片、2-2.影音-跳過影片、2-3.影音-暫停影<br>片，context.extensions.startTime觀看/跳過/暫停影片的開始時間<br>5. 增加4-2.測驗-學生回答問題(配對題)、4-3.測驗-學生回答問題<br>(選擇題)、4-4.測驗-學生回答問題(是非題)、4-5.測驗-學生回答<br>問題(填充題)，context.extensions.startTime開始回答問題時間<br>6. 增加4-6.測驗-學生完成評量，result.score.scaled此次評量學生<br>的答對率<br>7. 原2-4.影音-關鍵字搜尋，併入1-3.素材-關鍵字搜尋，刪除2-4.<br>影音-關鍵字搜尋<br>8. 欄位的必要性，為教育大數據分析時所需必要欄位。|
|1.5|114/7|1. 增加5-2.登入-登入平臺統計資料日(月)報表|
|1.51|115/4|1. API網址更換。<br>2. 移除資料庫資料表說明。|

<!-- 第 6 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|版本|日期|修訂摘要|
|---|---|---|
|||1. 資料交換URL目的地變更。<br>2. 修訂各學習記錄類別之actor、object、context、result之屬性內<br>容，使用https://moebigdata.com/xapi/網域。|
|1.6|115/8|3. 修訂actor、context，調整使用者及附屬資訊欄位。|
|||4. 調整學習紀錄項目類別之項目排序；增加3-1.向Agent提問、3-|
|||2.Agent回覆、4-1.觀看影片、4-5.完成觀看影片、5-2.回答問題<br>(AI口說)。|

<!-- 第 7 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

### 壹、目的

教育部辦理 AI 人才方舟計畫，由子計畫三「教育大數據分析計畫」建置及維運教育大數據資料倉儲系統，與公私數位學習平臺 / 系統協力導入使用者學習歷程資料並運用人工智慧分析技術及學習分析技術，提升資料探勘與解讀效率，作為教育政策制定與教育治理、學校教學支持及學生個人化學習之依據，提供適性學習環境及促進公平優質教育；並推動個資加密與去識別化之離線存取資料釋出，促進縣市數據運用及發展資料素養增能，以提升教育人員之資料識讀與數據分析應用能力。

本規格書建立一致的 xAPI 資料規格，用以收錄各數位學習平臺 / 系統之學習歷程資料，作為教育政策、教育治理、教學支持與個人化學習應用之資料基礎。

### 貳、應用範圍

本規格書適用於已完成教育體系身分認證服務介接，並依教育部教育大數據介接申請規範申請提供學習歷程資料之學習平臺 / 系統。介接資料涵蓋登入、學習活動、 AI 互動、影音學習與測驗等五大類 34 項事件；資料經格式轉換、欄位檢核與必要之安全處理後，作為教育大數據儀表板、數位學習成效評估及議題分析等用途。

### 參、引用標準

本規格書之 xAPI 資料係以 ADL Experience API （ xAPI ）資料模型為基礎，資料內容使用 JSON ，文字採 UTF-8 編碼，日期時間及期間分別依 ISO 8601 格式記錄。

xAPI 是由美國國防部 (DoD ， Department of Defense) 和白宮國家科學和技術政策辦公室 (OSTP ， Office of Science and Technology Policy) 在 1997 年所成立的「高階分散式學習」計畫 (ADL (Advanced Distributed Learning) Initiative ，以下簡稱 ADL) 所建立的標準。

xAPI spec (https://github.com/adlnet/xAPI-Spec) ，是一種標準規範，資料格式的定義；用來記錄使用者的操作學習行為，記錄學習的動作及歷程；可以把不同地方、不同時間、不同工具進行的不同學習活動，涉及的數據都記錄儲存下來。這樣就可以解決學習完整性問題、學習過程呈現問題，把這些數據都記錄在 LRS （ Learning Record Store) 中。

<!-- 第 8 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

xAPI 是根據活動流 (Activity Stream) 的概念修改成適合學習領域使用，當一項活動需要被記錄下來時， xAPI 就會送出以「主詞，動詞，受詞」 (Noun ， Verb ， Object) 或者 " 我做了這件事 " (I did this) 格式的報告到學習記錄儲存區 (LRS ， Learning Record Store) 。

圖 1 Activity Data and Metadata

##### <u>表</u> 1 <u>相關名詞解釋表</u>

|名詞|說明|
|---|---|
|xAPI|Experience API(xAPI)又稱為Tin Can API，為由ADL(Advanced Distributed<br>Learning)所建立，用以記錄人與人或各項事務的互動過程，運用xAPI可以<br>記錄下任何事件及歷程，當一項活動需要被記錄下來時，xAPI就會送出”主<br>詞，動詞，受詞”(Noun，Verb，Object)或者“我做了這件事”(I did this)格式<br>的報告到學習記錄資料庫 (LRS，LearningRecord Store)。|
|LRS|LRS全名為學習記錄資料庫(Learning Record Store)，用以記錄符合xAPI規<br>範的歷程記錄，LRS可記錄來自於使用者參與各系統各項活動所留下的歷<br>程記錄，使用者在與各應用系統互動後，即可送出語句資訊(xAPI<br>Statement)到LRS，並統一保存在LRS當中，提供後續統計分析的資料來<br>源。|
|REST|全名為Representational State Transfer，是一種軟體架構設計風格。資源由<br>URI指定，對資源的操作包括取得、建立、修改和刪除資源，對應HTTP<br>通訊協定提供的GET、POST、PUT和DELETE方法。|
|RESTful|使用HTTP並遵循REST原則，以URL定位資源，根據HTTP內容指示操作<br>動作與回應訊息。|
|JSON|JSON(JavaScript Object Notation)是輕量的資料交換格式，以文字為基礎，<br>且易於讓人閱讀。|
|Extension URI|用於識別教育大數據自訂欄位之唯一URI；URI必須全書一致，不得任意<br>變更協定、路徑或大小寫。|

<!-- 第 9 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

### 肆、使用方式

- 一、依教育大數據介接申請書勾選可提供之學習資料類型。

- 二、至本規格書第柒章學習資料欄位表填寫相對應欄位之「平臺提供情形」，無法提供之必要欄位應於交流會議敘明原因。

- 三、依各項學習資料之 JSON 範例，準備每一類 10 至 20 筆樣本數據，供交流會議確認。

- 四、依交流會議結論修正欄位、樣本及傳輸排程，完成測試環境驗證後再切換正式環境。

### 伍、學習資料類型與介接方式

- 一、資料交換方式

本規格書之 xAPI 服務以 xAPI spec 為基礎進行實作，並開放 RESTful 網路服務進行資料交換，以 HTTP POST 進行資料上傳、以 HTTP GET 取得已上傳資料，以利核對驗證，資料上傳及回傳內容皆為 JSON 格式；測試與正式環境之帳號、密碼、 IP 白名單及傳輸排程，由教育部或教育大數據推動中心於介接交流及開發期間提供或確認，於申請通過後，將核發 HTTP 基本認證 (HTTP Basic Authentication) ，供連線授權使用。

- 二、學習資料類型

各類學習資料依教育部教育大數據介接申請書之「學習紀錄項目表」，共分為五大類 34 項；標示「 * 」者為申請書所列必要提供項目。

##### <u>表</u> 2 <u>學習資料類型</u>

|學習資料類別|類型|
|---|---|
|1登入|1-1.登入平臺紀錄*|
|.|1-2.登入平臺統計資料日(月)報表*|
||2-1.查看學習資源|
||2-2.下載學習資源|
||2-3.關鍵字搜尋|
||2-4.喜歡資源(按讚)|
||2-5.取消喜歡資源(取消按讚)|
||2-6.收藏資源|
||2-7.取消收藏資源|
|2.學習活動|2-8.借閱書籍|
||2-9.續借書籍|
||2-10.歸還書籍|
||2-11.建立討論區|
||2-12.回覆討論區|
||2-13.建立筆記|
||2-14.發布作業|
||2-15.繳交作業|

<!-- 第 10 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|學習資料類別|類型|
|---|---|
||2-16.獲得獎勵|
|3AI互動|3-1.向Agent提問|
|.|3-2.Agent回覆|
||4-1.觀看影片|
||4-2.播放影片|
|4.影音學習|4-3.暫停影片|
||4-4.快倒轉影片|
||4-5.完成觀看影片|
||5-1.開始測驗|
||5-2.回答問題(AI口說)|
||5-3.回答問題(選擇)|
||5-4.回答問題(複選)|
|5.測驗|5-5.回答問題(是非)|
||5-6.回答問題(配對)|
||5-7.回答問題(填充)|
||5-8.回答問題(簡答)|
||5-9.完成測驗|

#### 三、 API 認證與連線

API 連線方式區分為主動型 API 與被動型 API 。

|項目|規格|
|---|---|
|URL|https://edulrs.twmoe-bigdata.com/data/xAPI/statements|
|認證|HTTP Basic Authentication；由教育部核發API Key。|
|xAPI版本標頭|X-Experience-API-Version: 1.0.1|
|內容型態|Content-Type: application/json; charset=utf-8|
|來源限制|依核定之測試/正式環境來源IP設定白名單。|
|傳輸安全|使用HTTPS加密傳輸。|

#### ( 一 )POST 上傳

主動型 API 為學習記錄的彙集，統一由學習平臺 / 系統透過 LRS 開放的介面，將歷程紀錄 POST 上傳，流程如下：

1. 透過 Web Site 進行 HTTP Basic Authentication ，若驗證失敗則回覆失敗訊息。

2. 驗證通過後，將由 xAPI Service 進行傳入資料的檢核 Validation ，若檢核有誤則回覆檢核錯誤內容，所有資料將不會儲存。

3. 請以批次的方式做 post 上傳，一次全部上傳到 LRS 切勿一筆資料即呼叫一次 post ，以避免長時間占用伺服器資源。例如：累積 200 筆紀錄組合成一個 json 陣列後，再呼叫 post 一次

<!-- 第 11 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

全部上傳，取得回傳的 Statement id 後再傳下一批次。 [{ 第 1 筆學習紀錄 }, { 第 2 筆學習紀錄 },

{ 第 200 筆學習紀錄 }]

4. 資料檢核通過後，再交由 xAPI Service 進行儲存，並回傳對應的 Statement id 。

##### <u>表 3</u> 主動型 API 說明表

|**API**說明|主動型**API**學習歷程上傳|
|---|---|
|URL|https://edulrs.twmoe-bigdata.com/data/xAPI/statements|
|Method|HTTP POST|
||Authorization: Basic <由教育部核發API Key>|
|Request Headers|X-Experience-API-Version: 1.0.1<br>Content-Type: application/json; charset=utf-8|
|Request Body|[ {Statement 1}, {Statement 2},…, {Statement 200} ]|
|成功回應|回傳與各筆Statement對應之Statement ID陣列。|
|錯誤回應|回傳錯誤識別碼及欄位驗證訊息；平臺修正後再重新上傳。|

圖 2 學習歷程 POST 上傳流程

<!-- 第 12 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### ( 二 )GET 驗證

被動型 API 為透過 LRS 開放的資料查詢介面， GET 紀錄進行資料查詢，流程如下：

1. 透過 Website 進行 HTTPBasicAuthentication ，若驗證失敗則回覆失敗訊息。

2. 驗證通過後，將由 xAPIService 進行傳入參數的檢核 Validation ，若檢核有誤則回覆檢核錯誤內容，將不會進行資料查詢及回傳。

3. 參數檢核通過後，再交由 xAPIService 進行資料查詢，並分頁回傳 xAPIStatement 。

##### <u>表 4 被動型</u> API 說明表

|**API**說明|被動型**API**已上傳學習歷程查詢|
|---|---|
|URL|https://edulrs.twmoe-bigdata.com/data/xAPI/statements|
|Method|HTTP GET|
|Query Parameters|since：查詢此時間之後寫入的紀錄<br>until：查詢此時間之前寫入的紀錄<br>limit：每頁筆數1至999，預設100<br>cursor：依more回傳值取得後續頁面|
|Request Headers|Authorization: Basic <由教育部核發API Key><br>X-Experience-API-Version: 1.0.1<br>Content-Type: application/json;charset=utf-8|
|成功回應|回傳statements陣列；尚有後續資料時，以more提供下一頁查詢路徑。|

圖 3 學習歷程 GET 驗證流程

<!-- 第 13 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### 四、測試與正式介接流程

申請單位完成教育部 OpenID 及教育大數據介接申請後，依交流會議確認之欄位與排程開發 API ；先於測試環境上傳樣本及測試資料，待通過格式與內容驗證後，再由維運團隊提供正式環境資訊並切換正式傳輸。

圖 4 教育大數據 xAPI 測試與正式介接流程

<!-- 第 14 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

### 陸、共通資料格式與欄位填寫原則

#### 一、 xAPI Statement 基本結構

本規格書之 xAPI 資料格式，以 xAPI Spec 為基礎所設計，， <u>https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md</u> 每筆 Statement 以「行為者（ actor ）執行動作（ verb ）於學習活動（ object ）」為核心，並可依事件記錄 result 、 context 與 timestamp 。各資料類型實際應提供之欄位及必要性，以第柒章學習資料欄位表之個別欄位表為準。

##### <u>圖</u> 5  xAPIStatementProperties <u>表</u>

|屬性|用途|原則|
|---|---|---|
|actor|識別行為執行者。|記錄使用者openid唯一識別碼。|
|verb|記錄所執行之學習行為。|verb.id與display應使用各類型指定值。|
|object|記錄學習資源、影片、測驗或<br>互動對象。|id應可穩定識別同一資源；定義與擴充欄位<br>置於definition。|
|result|記錄作答、分數、成功狀態、<br>期間或其他結果。|僅於該事件適用時提供。|
|context|記錄平臺、學校、年級、科目<br>及關聯識別碼。|共通情境欄位應跨事件一致。|
|timestamp|記錄事件發生時間。|採ISO 8601並標示時區，統一記錄至毫秒。|

<!-- 第 15 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### 二、欄位提供要求與勾選方式

- 第柒章學習資料欄位表均設「平臺提供情形」： □ 可提供、 □ 無法提供。

- 請申請單位僅須填寫申請書已勾選之資料類型；未勾選之資料類型無須填寫。

|標示|意義|填寫方式|
|---|---|---|
|必要|必要提供，完成該資料類型驗<br>證及分析所需欄位。|勾選可提供；如無法提供，應說明替代欄位<br>或限制。|
|建議|可提升資料解讀、串聯或分析<br>完整性之欄位。|依平臺可取得情形勾選可提供、無法提供。|

- 三、使用者識別資料

   - ( 一 )actor.openid 記錄教育體系身分認證服務對應之使用者唯一識別碼；使用者已完成 OpenID 綁定時提供。

   - ( 二 )context.extensions…/userid 記錄平臺自建、可穩定對應同一使用者之識別 ID ，不得在不同使用者間重複使用。不得以電子郵件、身分證字號、電話或其他高識別性資料替代 userid 。未登入或無法識別之使用者，應與教育大數據推動中心確認匿名資料是否具收錄價值及表示方式。

- 四、平臺、學校及學習情境

   - ( 一 )context.platform 填寫學習平臺 / 系統正式名稱；同一平臺跨資料類型應使用一致文字。

   - ( 二 )school 填寫學校名稱， school_code 填寫教育部學校代碼；無法取得時於欄位確認表註記。

   - ( 三 )grade 、 class 、 identity 、 subjectcode 、 subjectname 及 edustage 參考附錄之範例資料；無法對應之項目可於交流會議確認。

   - ( 四 )sn 為資料序號，平臺對每筆資料產生之唯一序號，供資料重送及重複資料判斷使用。

- 五、時間與期間格式

   - ( 一 )timestamp 採 ISO 8601 ，臺灣時間範例為 2026-0101T13:30:30.000+08:00 ；不可省略時區。

   - ( 二 )duration 採 ISO 8601 Duration ，例如 PT2M22.144S ；如記錄毫秒，四捨五入至小數點第三位。

   - ( 三 ) 統計資料之 timestamp 原則上記錄統計期間起始時間，並以 granularity 表示 daily 或 monthly 。

- 六、文字、 URL 與編碼

   - ( 一 )JSON 與文字內容一律使用 UTF-8 ；中文可直接傳送，無須強制轉為 \uXXXX 之 Unicode 。

<!-- 第 16 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

   - ( 二 )URL/IRI 中含中文或特殊字元時，應依 URI 規範進行百分比編碼；接收端解碼後仍須可還原原始內容。

- ( 三 ) 文字內容不傳送 HTML 標記；圖片、附件或影音內容不以 Base64 直接放入 Statement ，僅提供合法、安全且可識別資源之連結或代碼。

- ( 四 ) 自訂 Extension URI 協定、網域、路徑及大小寫均須與本規格一致。

- 七、批次、序號與錯誤處理

   - ( 一 ) 學習紀錄應以 JSON 陣列分批上傳。每批筆數、資料大小及傳送頻率，由平臺與教育大數據資料庫維運團隊於介接交流及測試期間確認；每批收到成功回應後，再傳送下一批。

   - ( 二 ) 大量歷史資料補傳應依雙方確認之時段與批次規模執行。

   - ( 三 ) 每批收到成功回應後再送下一批；發生網路逾時、流量限制或伺服器錯誤時，應稍候再重新傳送，並逐次延長等待時間，避免短時間內頻繁重送。

   - ( 四 ) 重送資料須維持相同的業務識別欄位與 sn ，避免形成重複紀錄。

   - ( 五 ) 平臺應保留上傳時間、批次筆數、回應 ID 、失敗原因及重試結果等傳輸紀錄，以利問題追蹤。

- 八、資料安全與最小必要原則

介接資料之蒐集、處理、利用及傳輸應符合個人資料保護、資通安全及合作協議相關規定。欄位內容以介接目的所需為限；應避免在 response 、 description 、 feedback 、討論內容或其他自由文字欄位中額外夾帶姓名、帳號密碼、身分證字號、電話、電子郵件或其他非必要個人資料。認證資訊、測試帳密及內部網址亦不得寫入 Statement 。

<!-- 第 17 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

### 柒、學習資料欄位表與規格範例

請申請單位就申請提供之學習資料項目類型，逐欄勾選可提供資料之欄位。

一、登入

#### 1-1. 登入平臺紀錄 *

學習資料類別登入示範情境王小明登入平臺

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/logge<br>d-in|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|登入|建議|□可提供<br>□無法提供|
|object|object.id|string|登入的連結|https://platform.edu.t<br>w/login|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|服務網站的名<br>稱|因材網|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|登入後使用了<br>多久|PT45M20S|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 18 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
||ade||||||
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|登入的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 19 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/logged-in", "display": { "zh-TW": " 登入 " } }, "object": { "id": "https://platform.edu.tw/login", "definition": { "name": { "zh-TW": " 因材網 " } } }, "result": { "duration": "PT45M20S" }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 20 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### 1-2. 登入平臺統計資料日 ( 月 ) 報表 *

學習資料類別登入示範情境王小明登入平臺

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/report<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|報表|建議|□可提供<br>□無法提供|
|object|object.id|string|網頁的連結|https://platform.edu.t<br>w|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|服務網站的名<br>稱|因材網|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/gra<br>nularity|string|daily / monthly|daily|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|當日/月登入<br>總時長|PT1H35M20S|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/log<br>in_count|integer|當日/月登入<br>次數|3|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 21 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|代表該使用者<br>前日(月)行為<br>彙整的時間<br>（建議設定為<br>00:00:00）|2026-01-<br>01T00:00:00.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 22 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/reported", "display": { "zh-TW": " 報表 " } }, "object": { "id": "https://platform.edu.tw", "definition": { "name": { "zh-TW": " 因材網 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/granularity": "daily", "https://moebigdata.com/xapi/login_count": 3 }, "duration": "PT1H35M20S" }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T00:00:00.000+08:00" }

<!-- 第 23 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### 二、學習活動

#### 2-1. 查看學習資源

學習資料類別學習活動示範情境王小明查看了一個網頁

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/viewe<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|查看|建議|□可提供<br>□無法提供|
|object|object.id|string|查看資源的連<br>結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|資源名稱|一次函數變化率快<br>速理解｜圖形與例<br>題|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.<br>https://moebigdata.com/x<br>api/content_type|string|查看內容類型|webpage|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108 課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|查看的時長|PT2M18S|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|

<!-- 第 24 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成/結束查<br>看的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 25 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/viewed", "display": { "zh-TW": " 查看 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數變化率快速理解｜圖形與例題 " }, "extensions": { "https://moebigdata.com/xapi/content_type": "webpage", "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "duration": "PT2M18S" }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 26 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

#### 2-2. 下載學習資源

學習資料類別學習活動示範情境王小明下載了一份文件

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/downl<br>oaded|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|下載|建議|□可提供<br>□無法提供|
|object|object.id|string|下載的資源連<br>結|https://resources.plat<br>form.edu.tw/downloa<br>d?file=res_math_line<br>ar_worksheet_v1.pdf|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|下載的檔案名<br>稱|一次函數練習單<br>（PDF）|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 27 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|開始下載的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 28 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/downloaded", "display": { "zh-TW": " 下載 " } }, "object": { "id": "https://resources.platform.edu.tw/download?file=res_math_linear_worksheet_v1.pdf", "definition": { "name": { "zh-TW": " 一次函數練習單（ PDF ） " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 29 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

2-3. 關鍵字搜尋

學習資料類別學習活動示範情境王小明在平臺進行關鍵字搜尋

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/search<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|搜尋|建議|□可提供<br>□無法提供|
|object|object.id|string|搜尋結果的連<br>結|https://resources.plat<br>form.edu.tw/search?<br>q=一次函數|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|服務網站的名<br>稱|因材網|必要|□可提供<br>□無法提供|
|result|result.response|string|輸入的關鍵字|一次函數|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/tot<br>al_items|integer|搜尋結果筆數|128|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 30 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|搜尋的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 31 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/searched", "display": { "zh-TW": " 搜尋 " } }, "object": { "id": "https://resources.platform.edu.tw/search?q= 一次函數 ", "definition": { "name": { "zh-TW": " 因材網 " } } }, "result": { "response": " 一次函數 ", "extensions": { "https://moebigdata.com/xapi/total_items": 128 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 32 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明按讚了一個資源

##### 2-4. 喜歡資源 ( 按讚 )

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/liked|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|按讚|建議|□可提供<br>□無法提供|
|object|object.id|string|按讚的資源連<br>結|https://resources.plat<br>form.edu.tw/article?i<br>d=res_20260225_00<br>38|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|按讚的資源名<br>稱|一次函數變化率快<br>速理解｜圖形與例<br>題|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 33 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|點擊按讚的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 34 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/liked", "display": { "zh-TW": " 按讚 " } }, "object": { "id": "https://resources.platform.edu.tw/article?id=res_20260225_0038", "definition": { "name": { "zh-TW": " 一次函數變化率快速理解｜圖形與例題 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 35 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 2-5. 取消喜歡資源 ( 取消按讚 )

學習資料類別學習活動示範情境王小明取消按讚了一個資源

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/unlike<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|取消按讚|建議|□可提供<br>□無法提供|
|object|object.id|string|按讚的資源連<br>結|https://resources.plat<br>form.edu.tw/article?i<br>d=res_20260225_00<br>38|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|按讚的資源名<br>稱|一次函數變化率快<br>速理解｜圖形與例<br>題|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 36 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|點擊取消按讚<br>的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 37 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/unliked", "display": { "zh-TW": " 取消按讚 " } }, "object": { "id": "https://resources.platform.edu.tw/article?id=res_20260225_0038", "definition": { "name": { "zh-TW": " 一次函數變化率快速理解｜圖形與例題 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 38 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 2-6. 收藏資源

學習資料類別學習活動示範情境王小明收藏了一個資源

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/favori<br>ted|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|收藏|建議|□可提供<br>□無法提供|
|object|object.id|string|收藏的資源連<br>結|https://resources.plat<br>form.edu.tw/article?i<br>d=res_20260225_00<br>38|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|收藏的資源名<br>稱|一次函數變化率快<br>速理解｜圖形與例<br>題|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 39 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|點擊收藏的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 40 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/favorited", "display": { "zh-TW": " 收藏 " } }, "object": { "id": "https://resources.platform.edu.tw/article?id=res_20260225_0038", "definition": { "name": { "zh-TW": " 一次函數變化率快速理解｜圖形與例題 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 41 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 2-7. 取消收藏資源

學習資料類別學習活動示範情境王小明取消收藏了一個資源

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/unfav<br>orited|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|取消收藏|建議|□可提供<br>□無法提供|
|object|object.id|string|取消收藏的資<br>源連結|https://resources.plat<br>form.edu.tw/article?i<br>d=res_20260225_00<br>38|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|取消收藏的資<br>源名稱|一次函數變化率快<br>速理解｜圖形與例<br>題|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與圖形判讀|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 42 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|取消收藏的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 43 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/unfavorited", "display": { "zh-TW": " 取消收藏 " } }, "object": { "id": "https://resources.platform.edu.tw/article?id=res_20260225_0038", "definition": { "name": { "zh-TW": " 一次函數變化率快速理解｜圖形與例題 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與圖形判讀 ", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 44 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明借閱了一本書籍

##### 2-8. 借閱書籍

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/borro<br>wed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|借閱書籍|建議|□可提供<br>□無法提供|
|object|object.id|string|書籍的ID|urn:isbn:9789864791<br>234|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|書籍的名稱|一次函數圖形與應<br>用|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/star<br>t_at|ISO<br>8601|借期開始|2026-03-<br>05T09:00:00.000+08<br>:00|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/due<br>_at|ISO<br>8601|到期時間|2026-03-<br>19T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 45 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|借閱的時間|2026-03-<br>05T09:00:00.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 46 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/borrowed", "display": { "zh-TW": " 借閱書籍 " } }, "object": { "id": "urn:isbn:9789864791234", "definition": { "name": { "zh-TW": " 一次函數圖形與應用 " }, "extensions": { "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/start_at": "2026-03-05T09:00:00.000+08:00", "https://moebigdata.com/xapi/due_at": "2026-03-19T23:59:59.000+08:00" } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-03-05T09:00:00.000+08:00" }

<!-- 第 47 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明續借了一本書籍

##### 2-9. 續借書籍

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/renew<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|續借書籍|建議|□可提供<br>□無法提供|
|object|object.id|string|書籍的ID|urn:isbn:9789864791<br>234|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|書籍的名稱|一次函數圖形與應<br>用|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/ren<br>ew_index|integer|第幾次續借|1|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/pre<br>v_due_at|ISO<br>8601|原到期日|2026-03-<br>19T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/ne<br>w_due_at|ISO<br>8601|新到期日|2026-03-<br>26T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|

<!-- 第 48 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|續借的時間|2026-03-<br>19T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 49 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/renewed", "display": { "zh-TW": " 續借書籍 " } }, "object": { "id": "urn:isbn:9789864791234", "definition": { "name": { "zh-TW": " 一次函數圖形與應用 " }, "extensions": { "https://moebigdata.com/xapi/subject_names": " 數學 2-1 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/renew_index": 1, "https://moebigdata.com/xapi/prev_due_at": "2026-03-19T23:59:59.000+08:00", "https://moebigdata.com/xapi/new_due_at": "2026-03-26T23:59:59.000+08:00" } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-03-19T23:59:59.000+08:00" }

<!-- 第 50 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明歸還了一本書籍

##### 2-10. 歸還書籍

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/return<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|歸還書籍|建議|□可提供<br>□無法提供|
|object|object.id|string|書籍的ID|urn:isbn:9789864791<br>234|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|書籍的名稱|一次函數圖形與應<br>用|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/ove<br>rdue|boolean|是否逾期|false|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 51 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|歸還的時間|2026-03-<br>19T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 52 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/returned", "display": { "zh-TW": " 歸還書籍 " } }, "object": { "id": "urn:isbn:9789864791234", "definition": { "name": { "zh-TW": " 一次函數圖形與應用 " }, "extensions": { "https://moebigdata.com/xapi/subject_names": " 數學 2-1 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/overdue": false } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-03-19T23:59:59.000+08:00" }

<!-- 第 53 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

2-11. 建立討論區

學習資料類別學習活動示範情境王小明建立了一個討論區

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/forum<br>_created|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|建立討論區|建議|□可提供<br>□無法提供|
|object|object.id|string|討論區的ID|urn:moebigdata:foru<br>m:20260225_0003|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|討論區名稱|一次函數學習討論<br>區|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/tags|array|標記/分類|[ "數學","一次函數<br>","課後討論"]|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|

<!-- 第 54 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|建立討論區的<br>時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 55 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/forum_created", "display": { "zh-TW": " 建立討論區 " } }, "object": { "id": "urn:moebigdata:forum:20260225_0003", "definition": { "name": { "zh-TW": " 一次函數學習討論區 " }, "extensions": { "https://moebigdata.com/xapi/tags": [ " 數學 ", " 一次函數 ", " 課後討論 " ] } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 56 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

2-12. 回覆討論區

示範情境王小明回覆了一個討論區

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/comm<br>ented|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|回覆討論區|建議|□可提供<br>□無法提供|
|object|object.id|string|討論區的ID|urn:moebigdata:foru<br>m:20260225_0003|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|討論區名稱|一次函數學習討論<br>區|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/tags|array|標記/分類|["數學","一次函數<br>","課後討論"]|必要|□可提供<br>□無法提供|
|result|result.response|string|回覆的留言|我覺得一次函數最<br>重要的是變化率的<br>概念，只要看出x<br>每增加1，y變化多<br>少就好理解了。|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 57 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|回覆討論區的<br>時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 58 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/commented", "display": { "zh-TW": " 回覆討論區 " } }, "object": { "id": "urn:moebigdata:forum:20260225_0003", "definition": { "name": { "zh-TW": " 一次函數學習討論區 " }, "extensions": { "https://moebigdata.com/xapi/tags": [ " 數學 ", " 一次函數 ", " 課後討論 " ] } } }, "result": { "response": " 我覺得一次函數最重要的是變化率的概念，只要看出 x 每增加 1 ， y 變化多少就好理解了。 " }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 59 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

2-13. 建立筆記

示範情境王小明建立了筆記

學習資料類別學習活動

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/noted|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|建立筆記|建議|□可提供<br>□無法提供|
|object|object.id|string|筆記的連結|https://video.platfor<br>m.edu.tw/notes/note_<br>001|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|筆記的名稱|影片筆記|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|輸入的筆記內<br>容|一次函數公式重點|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/not<br>e_length|integer|輸入的字數|8|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/tim<br>e_point|integer|<sup>記錄筆記的時</sup><br>間點|120|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|

<!-- 第 60 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|建立筆記的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 61 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/noted", "display": { "zh-TW": " 建立筆記 " } }, "object": { "id": "https://video.platform.edu.tw/notes/note_001", "definition": { "name": { "zh-TW": " 影片筆記 " }, "extensions": { "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "response": " 一次函數公式重點 ", "extensions": { "https://moebigdata.com/xapi/note_length": 8, "https://moebigdata.com/xapi/time_point": 120 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 62 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 2-14. 發布作業

學習資料類別學習活動

示範情境王老師發布了一個作業

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/publis<br>hed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|發布作業|建議|□可提供<br>□無法提供|
|object|object.id|string|作業的連結|https://assignment.pl<br>atform.edu.tw/home<br>work?id=hw_202602<br>26_0001|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|作業的名稱|一次函數課後作業|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/ope<br>n_at|ISO<br>8601|開放繳交時間|2026-02-<br>26T08:00:00.000+08<br>:00|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/due<br>_at|ISO<br>8601|截止時間|2026-03-<br>02T23:59:59.000+08<br>:00|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|滿分|100|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/acc<br>epts_resubmission|boolean|<sup>是否可重新繳</sup><br>交|true|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/sub<br>mission_id|string|作業識別ID|submission01|必要|□可提供<br>□無法提供|

<!-- 第 63 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|教師|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|發布作業的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 64 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/published", "display": { "zh-TW": " 發布作業 " } }, "object": { "id": "https://assignment.platform.edu.tw/homework?id=hw_20260226_0001", "definition": { "name": { "zh-TW": " 一次函數課後作業 " }, "extensions": { "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "score": { "max": 100 }, "extensions": { "https://moebigdata.com/xapi/open_at": "2026-02-26T08:00:00.000+08:00", "https://moebigdata.com/xapi/due_at": "2026-03-02T23:59:59.000+08:00", "https://moebigdata.com/xapi/accepts_resubmission": true, "https://moebigdata.com/xapi/submission_id": "submission01" } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 教師 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 65 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 2-15. 繳交作業

學習資料類別學習活動示範情境王小明繳交了一個作業

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/submi<br>tted|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|繳交作業|建議|□可提供<br>□無法提供|
|object|object.id|string|作業的連結|https://assignment.pl<br>atform.edu.tw/home<br>work?id=hw_202602<br>26_0001|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|作業的名稱|一次函數課後作業|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/sub<br>mission_id|string|作業識別ID|submission01|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/atte<br>mpt_count|integer|第幾次繳交<br>(1=為第一次<br>繳交)|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|

<!-- 第 66 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|繳交作業的時<br>間|2026-03-<br>01T10:00:00.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 67 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/submitted", "display": { "zh-TW": " 繳交作業 " } }, "object": { "id": "https://assignment.platform.edu.tw/homework?id=hw_20260226_0001", "definition": { "name": { "zh-TW": " 一次函數課後作業 " }, "extensions": { "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/submission_id": "submission01", "https://moebigdata.com/xapi/attempt_count": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-03-01T10:00:00.000+08:00" }

<!-- 第 68 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

2-16. 獲得獎勵

學習資料類別學習活動

示範情境王小明獲得獎勵

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/acquir<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|獲得獎勵|建議|□可提供<br>□無法提供|
|object|object.id|string|取得之獎勵<br>ID|urn:moebigdata:rewa<br>rd:badge:20260302_<br>01|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|取得獎勵之名<br>稱|一次函數學習達人<br>徽章|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/qua<br>ntity|integer|取得數量|1|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/bal<br>ance_after|integer|<sup>取得後數量、</sup><br>物品數量|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/sou<br>rce|string|取得來源|完成一次函數單元<br>測驗|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr|string|行為者年級|3|建議|□可提供<br>□無法提供|

<!-- 第 69 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
||ade||||||
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|獲得獎勵的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 70 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/acquired", "display": { "zh-TW": " 獲得獎勵 " } }, "object": { "id": "urn:moebigdata:reward:badge:20260302_01", "definition": { "name": { "zh-TW": " 一次函數學習達人徽章 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/quantity": 1, "https://moebigdata.com/xapi/balance_after": 5, "https://moebigdata.com/xapi/source": " 完成一次函數單元測驗 " } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 71 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 三、 AI 互動

##### 3-1. 向 Agent 提問

學習資料類別 AI 互動示範情境王小明向 AI 對話式機器人發出提問

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/asked|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|AI提問|建議|□可提供<br>□無法提供|
|object|object.id|string|對話機器人的<br>連結|https://ai.platform.ed<br>u.tw/chatbot/math-<br>assistant|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|機器人名稱|數學學習AI助理|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|教學影片|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|AI學習Agent|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|使用者提問|一次函數的變化率<br>要如何判斷？|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/len<br>gth_chars|integer|提問的字數|13|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/se<br>ssion_id|string|連續互動對話<br>session|session01|建議|□可提供<br>□無法提供|

<!-- 第 72 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|開始提問的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 73 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/asked", "display": { "zh-TW": "AI 提問 " } }, "object": { "id": "https://ai.platform.edu.tw/chatbot/math-assistant", "definition": { "name": { "zh-TW": " 數學學習 AI 助理 " }, "extensions": { "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/subject_names": "AI 學習 Agent", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "response": " 一次函數的變化率要如何判斷？ ", "extensions": { "https://moebigdata.com/xapi/length_chars": 13 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/session_id": "session01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 74 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境 AI 對話式機器人回覆王小明的提問

學習資料類別 AI 互動

##### 3-2.Agent 回覆

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/replie<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|AI回覆|建議|□可提供<br>□無法提供|
|object|object.id|string|對話機器人的<br>連結|https://ai.platform.ed<br>u.tw/chatbot/math-<br>assistant|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|機器人名稱|數學學習AI助理|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|教學影片|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|AI學習Agent|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|Agent回覆|一次函數的變化率<br>就是x的係數，例<br>如y=2x+1中，變化<br>率為2，代表x每<br>增加1，y就增加<br>2。|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/len<br>gth_chars|integer|回覆的字數|45|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/se|string|連續互動對話<br>session|session01|建議|□可提供<br>□無法提供|

<!-- 第 75 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
||ssion_id||||||
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成回覆的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 76 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/replied", "display": { "zh-TW": "AI 回覆 " } }, "object": { "id": "https://ai.platform.edu.tw/chatbot/math-assistant", "definition": { "name": { "zh-TW": " 數學學習 AI 助理 " }, "extensions": { "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/subject_names": "AI 學習 Agent", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "response": " 一次函數的變化率就是 x 的係數，例如 y=2x+1 中，變化率為 2 ，代表 x 每增加 1 ， y 就增加 2 。 ", "extensions": { "https://moebigdata.com/xapi/length_chars": 45 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/session_id": "session01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 77 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

四、影音學習

##### 4-1. 觀看影片

##### 學習資料類別影音學習示範情境王小明觀看了一部影片

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/watch<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|觀看|建議|□可提供<br>□無法提供|
|object|object.id|string|影片的連結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|觀看影片之名<br>稱|一次函數的基本概<br>念|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/length|integer|影片總長度|900|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|影片類別|教學影片|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|

<!-- 第 78 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|點選影片的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 79 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/watched", "display": { "zh-TW": " 觀看 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數的基本概念 " }, "extensions": { "https://moebigdata.com/xapi/length": 900, "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 數學 2-1", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 80 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別影音學習示範情境王小明播放了一部影片

##### 4-2. 播放影片

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/playe<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|播放|建議|□可提供<br>□無法提供|
|object|object.id|string|影片的連結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|播放影片之名<br>稱|一次函數的基本概<br>念|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/length|integer|影片總長度|900|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|影片類別|教學影片|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/pos<br>ition_seconds|integer|<sup>開始播放當下</sup><br>的影片位置|120|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/pla<br>yback_rate|float|播放速率|1.0|必要|□可提供<br>□無法提供|

<!-- 第 81 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.extensions.https://<br>moebigdata.com/xapi/mu<br>ted|boolean|無聲狀態|false|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|開始播放影片<br>的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 82 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/played", "display": { "zh-TW": " 播放 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數的基本概念 " }, "extensions": { "https://moebigdata.com/xapi/length": 900, "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 數學 2-1", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/position_seconds": 120, "https://moebigdata.com/xapi/playback_rate": 1.0, "https://moebigdata.com/xapi/muted": false } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 83 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 4-3. 暫停影片

學習資料類別影音學習

示範情境王小明暫停了一部影片

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/pause<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|暫停|建議|□可提供<br>□無法提供|
|object|object.id|string|影片的連結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|暫停影片之名<br>稱|一次函數的基本概<br>念|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/length|integer|影片總長度|900|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|影片類別|教學影片|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/pos<br>ition_seconds|integer|<sup>暫停當下的影</sup><br>片位置|120|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|

<!-- 第 84 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|暫停影片的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 85 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/paused", "display": { "zh-TW": " 暫停 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數的基本概念 " }, "extensions": { "https://moebigdata.com/xapi/length": 900, "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 數學 2-1", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/position_seconds": 120 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 86 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別影音學習示範情境王小明快倒轉了一部影片

##### 4-4. 快倒轉影片

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/seeke<br>d|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|快倒轉|建議|□可提供<br>□無法提供|
|object|object.id|string|影片的連結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|快倒轉影片之<br>名稱|一次函數的基本概<br>念|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/length|integer|影片總長度|900|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|影片類別|教學影片|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/tim<br>e_from|integer|<sup>操作前的影片</sup><br>位置(秒)|20|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/tim<br>e_to|integer|操作後的影片<br>位置(秒)|50|必要|□可提供<br>□無法提供|

<!-- 第 87 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.extensions.https://<br>moebigdata.com/xapi/del<br>ta_seconds|integer|變化量(數值)|30|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/dir<br>ection|string|"forward"或<br>"backward"|forward|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|快倒轉影片的<br>時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 88 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/seeked", "display": { "zh-TW": " 快倒轉 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數的基本概念 " }, "extensions": { "https://moebigdata.com/xapi/length": 900, "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 數學 2-1", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "extensions": { "https://moebigdata.com/xapi/time_from": 20, "https://moebigdata.com/xapi/time_to": 50, "https://moebigdata.com/xapi/delta_seconds": 30, "https://moebigdata.com/xapi/direction": "forward" } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 89 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明完成觀看了一部影片

學習資料類別影音學習

##### 4-5. 完成觀看影片

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/finish<br>ed|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|完成觀看|建議|□可提供<br>□無法提供|
|object|object.id|string|影片的連結|https://video.platfor<br>m.edu.tw/watch?v=<br>math123|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|完成觀看影片<br>之名稱|一次函數的基本概<br>念|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/length|integer|影片總長度|900|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|影片類別|教學影片|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|數學2-1|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|觀看影片行為<br>共花費多少時<br>間|PT2M15S|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|

<!-- 第 90 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成觀看影片<br>的時間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 91 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/finished", "display": { "zh-TW": " 完成觀看 " } }, "object": { "id": "https://video.platform.edu.tw/watch?v=math123", "definition": { "name": { "zh-TW": " 一次函數的基本概念 " }, "extensions": { "https://moebigdata.com/xapi/length": 900, "https://moebigdata.com/xapi/alignment": " 教學影片 ", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 數學 2-1", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "duration": "PT2M15S" }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 92 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 五、測驗

##### 5-1. 開始測驗

##### 學習資料類別測驗示範情境王小明開始一個 " 隨堂測驗 "

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/attem<br>pted|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|測驗開始|建議|□可提供<br>□無法提供|
|object|object.id|string|測驗的連結|https://assessment.platf<br>orm.edu.tw/exam?id=e<br>xam_20260225_001|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|測驗名稱|一次函數單元測驗|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與應用|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/items_count|integer|題目數|20|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/total_score|integer|測驗總分|100|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/pass_score|integer|及格分數|60|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/time_limit_sec|integer|時限秒數|1800|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/exam_id|string|測驗ID(唯一<br>識別)|exam_20260225_00<br>1|必要|□可提供<br>□無法提供|

<!-- 第 93 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|開始測驗的時<br>間|2026-01-<br>01T13:05:00.000+08:00|必要|□可提供<br>□無法提供|

<!-- 第 94 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/attempted", "display": { "zh-TW": " 測驗開始 " } }, "object": { "id": "https://assessment.platform.edu.tw/exam?id=exam_20260225_001", "definition": { "name": { "zh-TW": " 一次函數單元測驗 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與應用 ", "https://moebigdata.com/xapi/items_count": 20, "https://moebigdata.com/xapi/total_score": 100, "https://moebigdata.com/xapi/pass_score": 60, "https://moebigdata.com/xapi/time_limit_sec": 1800, "https://moebigdata.com/xapi/exam_id": "exam_20260225_001", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:05:00.000+08:00" }

<!-- 第 95 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

示範情境王小明依題目要求口說指定英文句子

學習資料類別測驗

##### 5-2. 回答問題 (AI 口說 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|請口說以下句子：I<br>like apples|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|speak|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/item_type|string|題型子類別，<br>單字/句子|speaking_word /<br>speaking_sentence|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/lang|string|目標語言代碼|en-US|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["I like apples."]|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|水果|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|

<!-- 第 96 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
||m/xapi/levels||||||
|result|result.response|string|口說內容辨識<br>結果|I like apple.|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|false|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|使用者實際開<br>口時間長度<br>(錄音長度)|PT5S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|3|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|同一題第幾次<br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|

<!-- 第 97 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|02|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|英語|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 98 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 請口說以下句子： I like apples." }, "description": { "zh-TW": " 請學生口說指定英文句子，系統記錄其口說表現。 " }, "interactionType": "speak", "correctResponsesPattern": [ "I like apples." ], "extensions": { "https://moebigdata.com/xapi/lang": "en-US", "https://moebigdata.com/xapi/item_type": "speaking_sentence", "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 水果 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "response": "I like apple", "success": false, "duration": "PT5S", "score": { "raw": 3, "max": 5 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456",

<!-- 第 99 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "02", "https://moebigdata.com/xapi/subjectname": " 英語 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 100 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 單選題 )

##### 5-3. 回答問題 ( 選擇 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|下列哪一個是一次<br>函數？|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|choice|必要|□可提供<br>□無法提供|
|object|object.definition.choices|array|問題的選項|{ "id": "A",<br>"description": { "zh-<br>TW": "y = 2x +<br>1" } },<br>{ "id": "B",<br>"description": { "zh-<br>TW": "y = x^2 +<br>1" } },<br>{ "id": "C",<br>"description": { "zh-<br>TW": "y = 1/x" } }|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/item_type|string|題型子類別，<br>單選/複選|single_choice|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["A"]|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|

<!-- 第 101 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|作答內容|A|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|true|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT22S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|5|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|<sup>同一題第幾次</sup><br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 102 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 103 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 下列哪一個是一次函數？ " }, "extensions": { "https://moebigdata.com/xapi/item_type": "single_choice", "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "choice", "choices": [ { "id": "A", "description": { "zh-TW": "y = 2x + 1" } }, { "id": "B", "description": { "zh-TW": "y = x^2 + 1" } }, { "id": "C", "description": { "zh-TW": "y = 1/x" } } ], "correctResponsesPattern": [ "A" ] } }, "result": { "response": "A", "success": true,

<!-- 第 104 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"duration": "PT22S", "score": { "raw": 5, "max": 5 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 105 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 複選題 )

##### 5-4. 回答問題 ( 複選 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|下列哪些是一次函<br>數？|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|choice|必要|□可提供<br>□無法提供|
|object|object.definition.choices|array|問題的選項|{ "id": "A",<br>"description": { "zh-<br>TW": "y = 2x +<br>1" } },<br>{ "id": "B",<br>"description": { "zh-<br>TW": "y = x^2 +<br>1" } },<br>{ "id": "C",<br>"description": { "zh-<br>TW": "y = -3x +<br>2" } }|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/item_type|string|題型子類別，<br>單選/複選|multi_choice|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["A[,]C"]|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|

<!-- 第 106 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|作答內容|"A[,]C"|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|true|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT22S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|5|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|<sup>同一題第幾次</sup><br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|

<!-- 第 107 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 108 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 下列哪一些是一次函數？ " }, "extensions": { "https://moebigdata.com/xapi/item_type": "multi_choice", "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "choice", "choices": [ { "id": "A", "description": { "zh-TW": "y = 2x + 1" } }, { "id": "B", "description": { "zh-TW": "y = x^2 + 1" } }, { "id": "C", "description": { "zh-TW": "y = -3x + 2" } } ], "correctResponsesPattern": [ "A[,]C" ] } }, "result": { "response": "A[,]C", "success": true,

<!-- 第 109 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"duration": "PT22S", "score": { "raw": 5, "max": 5 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 110 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 是非題 )

##### 5-5. 回答問題 ( 是非 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|一次函數的圖形一<br>定是一條直線|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|true-false|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["true"]|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|作答內容|false|必要|□可提供<br>□無法提供|

<!-- 第 111 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.success|boolean|是否正確|false|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT25S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|0|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|<sup>同一題第幾次</sup><br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su|string|適用科目代號|03|必要|□可提供<br>□無法提供|

<!-- 第 112 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
||bjectcode||||||
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 113 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 一次函數的圖形一定是一條直線。 " }, "extensions": { "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "true-false", "correctResponsesPattern": [ "true" ] } }, "result": { "response": "false", "success": false, "duration": "PT25S", "score": { "raw": 0, "max": 5 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ",

<!-- 第 114 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 115 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 配對題 )

##### 5-6. 回答問題 ( 配對 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|請將第一欄英文單<br>字與第二欄中文意<br>思配對|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|matching|必要|□可提供<br>□無法提供|
|object|object.definition.source|array|來源|{"id":"L1","descripti<br>on":{"zh-TW":<br>"apple" } },<br>{"id":"L2","descripti<br>on":{"zh-TW":<br>"banana"} },<br>{"id":"L3","descripti<br>on":{"zh-TW":<br>"grape" } }|必要|□可提供<br>□無法提供|
|object|object.definition.target|array|目標|{"id":"R1","descripti<br>on":{"zh-TW":"蘋果<br>"} },<br>{"id":"R2","descripti<br>on":{"zh-TW":"葡萄<br>"} },<br>{"id":"R3","descripti<br>on":{"zh-TW":"香蕉<br>"} }|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["L1[.]R1[,]L2[.]R3[<br>,]L3[.]R2"]|必要|□可提供<br>□無法提供|

<!-- 第 116 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|水果|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|作答內容|L1[.]R1[,]L2[.]R3[,]<br>L3[.]R2|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|true|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT25S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|5|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|5|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|<sup>同一題第幾次</sup><br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|

<!-- 第 117 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|02|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|英語|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 118 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 請將第一欄英文單字與第二欄中文意思配對 " }, "extensions": { "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 水果 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "matching", "correctResponsesPattern": [ "L1[.]R1[,]L2[.]R3[,]L3[.]R2" ], "source": [ { "id": "L1", "description": { "zh-TW": "apple" } }, { "id": "L2", "description": { "zh-TW": "banana" } }, { "id": "L3", "description": { "zh-TW": "grape" } } ], "target": [ { "id": "R1", "description": { "zh-TW": " 蘋果 " }

<!-- 第 119 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

}, { "id": "R2", "description": { "zh-TW": " 葡萄 " } }, { "id": "R3", "description": { "zh-TW": " 香蕉 " } } ] } }, "result": { "response": "L1[.]R1[,]L2[.]R3[,]L3[.]R2", "success": true, "duration": "PT25S", "score": { "raw": 5, "max": 5 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "02", "https://moebigdata.com/xapi/subjectname": " 英語 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 120 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 5-7. 回答問題 ( 填充 )

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 填充題 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|一次函數y = ___x<br>+ ___中，請填入正<br>確的係數。|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|fill-in|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/blanks|integer|填充格數|2|必要|□可提供<br>□無法提供|
|object|object.definition.correctR<br>esponsesPattern|array|正確答案|["2[,]1"]|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|

<!-- 第 121 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.response|string|作答內容|2[,]1|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|true|必要|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT18S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|2|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|2|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|同一題第幾次<br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|

<!-- 第 122 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 123 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 一次函數 y = ___x + ___ 中，請填入正確的係數。 " }, "extensions": { "https://moebigdata.com/xapi/blanks": 2, "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "fill-in", "correctResponsesPattern": [ "2[,]1" ] } }, "result": { "response": "2[,]1", "success": true, "duration": "PT18S", "score": { "raw": 2, "max": 2 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2",

<!-- 第 124 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 125 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

學習資料類別測驗示範情境王小明作答問題 ( 題型 : 簡答題 )

##### 5-8. 回答問題 ( 簡答 )

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/answe<br>red|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|作答|建議|□可提供<br>□無法提供|
|object|object.id|string|問題的連結|https://assessment.pl<br>atform.edu.tw/item?i<br>d=item_20260225_0<br>007|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|問題的名稱|請用一句話說明何<br>謂一次函數。|必要|□可提供<br>□無法提供|
|object|object.definition.interacti<br>onType|string|題目類型|long-fill-in|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/interaction_id|string|問題ID(唯一<br>識別)|item01|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/video_id|string|影片ID(唯一<br>識別)|video_math123|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.response|string|作答內容|一次函數的形式為<br>y=ax+b，其中a、b<br>為常數，且a ≠ 0。|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否正確|true|必要|□可提供<br>□無法提供|

<!-- 第 126 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.duration|ISO<br>8601|本題作答花費<br>時間|PT50S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|該題目得分|10|必要|□可提供<br>□無法提供|
|result|result.score.max|integer|該題滿分|10|必要|□可提供<br>□無法提供|
|result|result.extensions.https://<br>moebigdata.com/xapi/retr<br>y_index|integer|同一題第幾次<br>作答|1|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/pa<br>rent_id|string|此題屬於哪一<br>份測驗|parent01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|

<!-- 第 127 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|
|timestamp|timestamp|ISO<br>8601|完成作答的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 128 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/answered", "display": { "zh-TW": " 作答 " } }, "object": { "id": "https://assessment.platform.edu.tw/item?id=item_20260225_0007", "definition": { "name": { "zh-TW": " 請用一句話說明何謂一次函數。 " }, "extensions": { "https://moebigdata.com/xapi/interaction_id": "item01", "https://moebigdata.com/xapi/video_id": "video_math123", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " }, "interactionType": "long-fill-in" } }, "result": { "response": " 一次函數的形式為 y=ax+b ，其中 a 、 b 為常數，且 a ≠ 0 。 ", "success": true, "duration": "PT50S", "score": { "raw": 10, "max": 10 }, "extensions": { "https://moebigdata.com/xapi/retry_index": 1 } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/parent_id": "parent01", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH",

<!-- 第 129 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

"https://moebigdata.com/xapi/sn": 1 } }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 130 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

5-9. 完成測驗

學習資料類別測驗示範情境王小明完成一個 " 隨堂測驗 "

##### xAPI 欄位規格與平臺提供情形

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|actor|actor.openid|string|行為的執行者<br>(教育部<br>OpenID的唯<br>一識別碼)|550e8400-e29b-<br>41d4-a716-<br>446655440000|必要|□可提供<br>□無法提供|
|verb|verb.id|IRI|xAPI動詞|https://moebigdata.c<br>om/xapi/verbs/compl<br>eted|必要|□可提供<br>□無法提供|
|verb|verb.display.zh-TW|string|動詞名稱|完成測驗|建議|□可提供<br>□無法提供|
|object|object.id|string|測驗的連結|https://assessment.pl<br>atform.edu.tw/exam?<br>id=exam_20260225_<br>001|必要|□可提供<br>□無法提供|
|object|object.definition.name.zh<br>-TW|string|測驗名稱|一次函數單元測驗|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/alignment|string|課綱/知識架<br>構/議題/分類|108課綱｜八年<br>級｜一次函數概念<br>理解與應用|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/exam_id|string|測驗ID(唯一<br>識別)|exam_20260225_00<br>1|必要|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/subject_names|string|領域(學科/主<br>題)|一次函數|建議|□可提供<br>□無法提供|
|object|object.definition.extensio<br>ns.https://moebigdata.co<br>m/xapi/levels|string|該學習資源適<br>用的學習階段|國中|建議|□可提供<br>□無法提供|
|result|result.duration|ISO<br>8601|測驗總花費時<br>間|PT25M30S|必要|□可提供<br>□無法提供|
|result|result.score.raw|integer|此次評量學生<br>的得分|85|必要|□可提供<br>□無法提供|
|result|result.score.scaled|float|此次評量學生<br>的答對率|0.85|必要|□可提供<br>□無法提供|
|result|result.success|boolean|是否通過|true|必要|□可提供<br>□無法提供|

<!-- 第 131 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|result|result.extensions.https://<br>moebigdata.com/xapi/fee<br>dback|string|完成評量回饋<br>內容(獎勵)|已完成評量！使用<br>者獲得「一次函數<br>小達人」徽章與20<br>點獎勵點數。|必要|□可提供<br>□無法提供|
|context|context.platform|string|使用的平臺|因材網|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sta<br>rt_at|string|開始測驗的時<br>間|2026-01-<br>01T13:05:00.000+08<br>:00|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/att<br>empt_id|string|同一次測驗識<br>別碼|attempt01|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/us<br>erid|string|平臺自建識別<br>ID|user_123456|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool|string|行為者所屬學<br>校|國立臺中教育大學<br>附設實驗國民小學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sc<br>hool_code|string|行為者所屬學<br>校代碼|190601|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/gr<br>ade|string|行為者年級|3|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/cla<br>ss|string|行為者班級|2|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/id<br>entity|string|行為者身分別|學生|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectcode|string|適用科目代號|03|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/su<br>bjectname|string|科目名稱|數學|建議|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/ed<br>ustage|string|適用年段|JH|必要|□可提供<br>□無法提供|
|context|context.extensions.https:/<br>/moebigdata.com/xapi/sn|integer|資料序號|1|必要|□可提供<br>□無法提供|

<!-- 第 132 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|種類|屬性|型態|說明|示範資料|提供<br>要求|平臺提供<br>情形|
|---|---|---|---|---|---|---|
|timestamp|timestamp|ISO<br>8601|完成測驗的時<br>間|2026-01-<br>01T13:30:30.000+08<br>:00|必要|□可提供<br>□無法提供|

<!-- 第 133 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### JSON 範例

{ "actor": { "openid": "550e8400-e29b-41d4-a716-446655440000" }, "verb": { "id": "https://moebigdata.com/xapi/verbs/completed", "display": { "zh-TW": " 完成測驗 " } }, "object": { "id": "https://assessment.platform.edu.tw/exam?id=exam_20260225_001", "definition": { "name": { "zh-TW": " 一次函數單元測驗 " }, "extensions": { "https://moebigdata.com/xapi/alignment": "108 課綱｜八年級｜一次函數概念理解與應用 ", "https://moebigdata.com/xapi/exam_id": "exam_20260225_001", "https://moebigdata.com/xapi/subject_names": " 一次函數 ", "https://moebigdata.com/xapi/levels": " 國中 " } } }, "result": { "duration": "PT25M30S", "score": { "raw": 85, "scaled": 0.85 }, "success": true, "extensions": { "https://moebigdata.com/xapi/feedback": " 已完成評量！使用者獲得「一次函數小達人」徽章與 20 點獎勵點數。 " } }, "context": { "platform": " 因材網 ", "extensions": { "https://moebigdata.com/xapi/start_at": "2026-01-01T13:05:00.000+08:00", "https://moebigdata.com/xapi/attempt_id": "attempt01", "https://moebigdata.com/xapi/userid": "user_123456", "https://moebigdata.com/xapi/school": " 國立臺中教育大學附設實驗國民小學 ", "https://moebigdata.com/xapi/school_code": "190601", "https://moebigdata.com/xapi/grade": "3", "https://moebigdata.com/xapi/class": "2", "https://moebigdata.com/xapi/identity": " 學生 ", "https://moebigdata.com/xapi/subjectcode": "03", "https://moebigdata.com/xapi/subjectname": " 數學 ", "https://moebigdata.com/xapi/edustage": "JH", "https://moebigdata.com/xapi/sn": 1

<!-- 第 134 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

} }, "timestamp": "2026-01-01T13:30:30.000+08:00" }

<!-- 第 135 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

### 捌、附錄

##### 附錄一、 Verb URI 對照表

|編碼|學習資料項目|**Verb URI**|中文動作<br>名稱|
|---|---|---|---|
|1-1|1-1.登入平臺紀錄*|https://moebigdata.com/xapi/verbs/logged-in|登入|
|1-2|1-2.登入平臺統計資料<br>日(月)報表*|https://moebigdata.com/xapi/verbs/reported|報表|
|2-1|2-1.查看學習資源|https://moebigdata.com/xapi/verbs/viewed|查看|
|2-2|2-2.下載學習資源|https://moebigdata.com/xapi/verbs/downloaded|下載|
|2-3|2-3.關鍵字搜尋|https://moebigdata.com/xapi/verbs/searched|搜尋|
|2-4|2-4.喜歡資源(按讚)|https://moebigdata.com/xapi/verbs/liked|按讚|
|2-5|2-5.取消喜歡資源(取<br>消按讚)|https://moebigdata.com/xapi/verbs/unliked|取消按讚|
|2-6|2-6.收藏資源|https://moebigdata.com/xapi/verbs/favorited|收藏|
|2-7|2-7.取消收藏資源|https://moebigdata.com/xapi/verbs/unfavorited|取消收藏|
|2-8|2-8.借閱書籍|https://moebigdata.com/xapi/verbs/borrowed|借閱書籍|
|2-9|2-9.續借書籍|https://moebigdata.com/xapi/verbs/renewed|續借書籍|
|2-10|2-10.歸還書籍|https://moebigdata.com/xapi/verbs/returned|歸還書籍|
|2-11|2-11.建立討論區|https://moebigdata.com/xapi/verbs/forum_created|建立討論<br>區|
|2-12|2-12.回覆討論區|https://moebigdata.com/xapi/verbs/commented|回覆討論<br>區|
|2-13|2-13.建立筆記|https://moebigdata.com/xapi/verbs/noted|建立筆記|
|2-14|2-14.發布作業|https://moebigdata.com/xapi/verbs/published|發布作業|

<!-- 第 136 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|編碼|學習資料項目|**Verb URI**|中文動作<br>名稱|
|---|---|---|---|
|2-15|2-15.繳交作業|https://moebigdata.com/xapi/verbs/submitted|繳交作業|
|2-16|2-16.獲得獎勵|https://moebigdata.com/xapi/verbs/acquired|獲得獎勵|
|3-1|3-1.向Agent提問|https://moebigdata.com/xapi/verbs/asked|AI提問|
|3-2|3-2.Agent回覆|https://moebigdata.com/xapi/verbs/replied|AI回覆|
|4-1|4-1.觀看影片|https://moebigdata.com/xapi/verbs/watched|觀看|
|4-2|4-2.播放影片|https://moebigdata.com/xapi/verbs/played|播放|
|4-3|4-3.暫停影片|https://moebigdata.com/xapi/verbs/paused|暫停|
|4-4|4-4.快倒轉影片|https://moebigdata.com/xapi/verbs/seeked|快倒轉|
|4-5|4-5.完成觀看影片|https://moebigdata.com/xapi/verbs/finished|完成觀看|
|5-1|5-1.開始測驗|https://moebigdata.com/xapi/verbs/attempted|測驗開始|
|5-2|5-2.回答問題(AI口說)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-3|5-3.回答問題(選擇)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-4|5-4.回答問題(複選)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-5|5-5.回答問題(是非)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-6|5-6.回答問題(配對)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-7|5-7.回答問題(填充)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-8|5-8.回答問題(簡答)|https://moebigdata.com/xapi/verbs/answered|作答|
|5-9|5-9.完成測驗|https://moebigdata.com/xapi/verbs/completed|完成測驗|

<!-- 第 137 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 附錄二、教育大數據 Extension URI 對照表

|**Extension URI**|用途說明|
|---|---|
|https://moebigdata.com/xapi/delta_seconds|變化量(數值)|
|https://moebigdata.com/xapi/direction|"forward"或"backward"|
|https://moebigdata.com/xapi/time_from|操作前的影片位置(秒)|
|https://moebigdata.com/xapi/time_to|操作後的影片位置(秒)|
|https://moebigdata.com/xapi/accepts_resubmission|是否可重新繳交|
|https://moebigdata.com/xapi/alignment|課綱/知識架構/議題/分類|
|https://moebigdata.com/xapi/attempt_count|第幾次繳交(1=為第一次繳交)|
|https://moebigdata.com/xapi/attempt_id|同一次測驗識別碼|
|https://moebigdata.com/xapi/balance_after|取得後數量、物品數量|
|https://moebigdata.com/xapi/blanks|填充格數|
|https://moebigdata.com/xapi/class|行為者班級|
|https://moebigdata.com/xapi/content_type|查看內容類型|
|https://moebigdata.com/xapi/due_at|到期時間|
|https://moebigdata.com/xapi/edustage|適用年段|
|https://moebigdata.com/xapi/exam_id|測驗ID(唯一識別)|
|https://moebigdata.com/xapi/feedback|完成評量回饋內容(獎勵)|
|https://moebigdata.com/xapi/grade|行為者年級|
|https://moebigdata.com/xapi/granularity|daily / monthly|
|https://moebigdata.com/xapi/identity|行為者身分別|
|https://moebigdata.com/xapi/interaction_id|問題ID(唯一識別)|
|https://moebigdata.com/xapi/item_type|題型子類別|
|https://moebigdata.com/xapi/items_count|題目數|
|https://moebigdata.com/xapi/lang|目標語言代碼(en-US/zh-TW)|
|https://moebigdata.com/xapi/length|影片總長度|
|https://moebigdata.com/xapi/length_chars|提問/回覆的字數|
|https://moebigdata.com/xapi/levels|該學習資源適用的學習階段|
|https://moebigdata.com/xapi/login_count|當日/月登入次數|
|https://moebigdata.com/xapi/muted|無聲狀態|

<!-- 第 138 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

|**Extension URI**|用途說明|
|---|---|
|https://moebigdata.com/xapi/new_due_at|新到期日|
|https://moebigdata.com/xapi/note_length|輸入的字數|
|https://moebigdata.com/xapi/open_at|開放繳交時間|
|https://moebigdata.com/xapi/overdue|是否逾期|
|https://moebigdata.com/xapi/parent_id|此題屬於哪一份測驗|
|https://moebigdata.com/xapi/pass_score|及格分數|
|https://moebigdata.com/xapi/playback_rate|播放速率|
|https://moebigdata.com/xapi/position_seconds|開始播放/暫停當下的影片位置|
|https://moebigdata.com/xapi/prev_due_at|原到期日|
|https://moebigdata.com/xapi/quantity|取得數量|
|https://moebigdata.com/xapi/renew_index|第幾次續借|
|https://moebigdata.com/xapi/retry_index|同一題第幾次作答|
|https://moebigdata.com/xapi/school|行為者所屬學校|
|https://moebigdata.com/xapi/school_code|行為者所屬學校代碼|
|https://moebigdata.com/xapi/session_id|連續互動對話session|
|https://moebigdata.com/xapi/sn|資料序號|
|https://moebigdata.com/xapi/source|取得來源|
|https://moebigdata.com/xapi/start_at|借期開始/測驗開始時間|
|https://moebigdata.com/xapi/subject_names|領域(學科/主題)|
|https://moebigdata.com/xapi/subjectcode|適用科目代號|
|https://moebigdata.com/xapi/subjectname|科目名稱|
|https://moebigdata.com/xapi/submission_id|作業識別ID|
|https://moebigdata.com/xapi/tags|標記/分類|
|https://moebigdata.com/xapi/time_limit_sec|時限秒數|
|https://moebigdata.com/xapi/time_point|記錄筆記的時間點|
|https://moebigdata.com/xapi/total_items|搜尋結果筆數|
|https://moebigdata.com/xapi/total_score|測驗總分|
|https://moebigdata.com/xapi/userid|平臺自建識別ID|
|https://moebigdata.com/xapi/video_id|影片ID(唯一識別)|

<!-- 第 139 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 附錄三、常用列舉值與格式

|欄位**/**格式|值或範例|說明|
|---|---|---|
|identity|學生、教師|行為者身分別，其他值於交流會議確<br>認。|
|direction|forward、backward|影音播放位置向前或向後調整。|
|granularity|daily、monthly|登入統計資料之日/月報表。|
|item_type|單選single_choice /複選<br>multi_choice以及單字<br>speaking_word  /句子<br>speaking_sentence|當同一interactionType項下涵蓋多種<br>題型時，用以細分選擇題的單選、複<br>選；區分口說題的單字與句子；其餘<br>題型免填。|
|interactionType|speak、choice、true-false、<br>matching、fill-in、long-fill-in|測驗題型；依各測驗事件範例填寫。|
|timestamp|2026-01-01T13:30:30.000+08:00|<sup>ISO 8601日期時間，包含毫秒與時</sup><br>區。|
|duration|PT2M22.144S|ISO 8601 Duration。|
|語言代碼|zh-TW、en-US|語言別。|
|布林值|true、false|JSON boolean，不加引號。|
|空值|null|無值時使用JSON null；經介接交流會<br>議確認無法提供之欄位，得省略該欄<br>位；Extension欄位應連同URI及其值<br>一併省略。|

<!-- 第 140 頁 -->

教育大數據資料倉儲系統｜學習資料 xAPI 規格

##### 附錄四、 subjectcode 對應 subjectname

|**subjectcode**適用科目代號|**subjectname**科目名稱|
|---|---|
|01|國文|
|02|英語|
|03|數學|
|04|社會|
|05|自然|
|06|生活|
|07|體育|
|08|藝術|
|09|資訊科技|
|10|綜合活動|
|99|其他/未分類|

##### 附錄五、 content_type 查看內容類型

|**content_type **|查看內容類型|
|---|---|
|webpage|一般網頁|
|ebook|電子書|
|article|文章|
|material|參考檔案|
|exam|線上測驗|
|homework|作業|
|online_video|影音教材|
|web_link|線上連結|
|forum|討論|
|virtual_classroom|虛擬教室|
