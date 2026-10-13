// Standarddaten: werden beim ersten Start in den Browser geladen.
// Eigene Daten importierst du im Tab "Daten", diese Datei musst du dafür nicht ändern.
window.DEFAULT_DATA = {
 "decks": [
  {
   "id": "l1",
   "name": "Lektion 1",
   "cards": [
    [
     "sender",
     "差出人 (さしだしにん)"
    ],
    [
     "subject / title",
     "件名 (けんめい)"
    ],
    [
     "date",
     "日時 (にちじ)"
    ],
    [
     "safely",
     "無事に (ぶじに)"
    ],
    [
     "dormitory",
     "寮 (りょう)"
    ],
    [
     "world",
     "世界 (せかい)"
    ],
    [
     "tutor",
     "チューター"
    ],
    [
     "one's major",
     "専攻 (せんこう)"
    ],
    [
     "economy",
     "経済 (けいざい)"
    ],
    [
     "school / undergraduate",
     "学部 (がくぶ)"
    ],
    [
     "to get used to",
     "なれる"
    ],
    [
     "to arrive",
     "着く (つく)"
    ],
    [
     "experience",
     "経験 (けいけん)"
    ],
    [
     "teacher",
     "先生 (せんせい)"
    ],
    [
     "healthy / well / fine",
     "元気 (げんき)"
    ],
    [
     "to teach",
     "教える (おしえる)"
    ],
    [
     "to enter",
     "入る (はいる)"
    ],
    [
     "class / lesson",
     "授業 (じゅぎょう)"
    ],
    [
     "to come",
     "来る (くる)"
    ],
    [
     "to talk / speak",
     "話す (はなす)"
    ],
    [
     "learn a lot",
     "勉強になる (べんきょうになる)"
    ],
    [
     "to think",
     "思う (おもう)"
    ],
    [
     "to be decided / settled",
     "決まる (きまる)"
    ],
    [
     "same",
     "同じ (おなじ)"
    ],
    [
     "student",
     "学生 (がくせい)"
    ],
    [
     "for the first time / first time ever",
     "初めて (はじめて)"
    ],
    [
     "life / living",
     "生活 (せいかつ)"
    ],
    [
     "foreign country",
     "外国 (がいこく)"
    ],
    [
     "don't know",
     "分からない (わからない)"
    ]
   ]
  }
 ],
 "patterns": {
  "～のは～です": {
   "rule": "Satz mit のは nominalisieren, das Hervorgehobene steht vorn am Ende: 食べたのは寮です。Bei Nomen/na-Adjektiv: なのは. Grund: ～のは、～からです。",
   "link": "https://elon.io/grammar/japanese/syntax/cleft-nowa-construction",
   "linkname": "Erklärung zu のは"
  },
  "～そうにしている": {
   "rule": "i-Adjektiv ohne い / na-Adjektiv + そうにしている. Unregelmäßig: いい → よさそう, ない → なさそう. Nur für Personen.",
   "link": "https://bunpro.jp/grammar_points/%E3%81%9D%E3%81%86%E3%81%AB-%E3%81%9D%E3%81%86%E3%81%AA",
   "linkname": "Bunpro: そうに・そうな"
  },
  "～(よ)うとする": {
   "rule": "Volitivform + とする. u-Verben: -u → -ou (行く → 行こう), ru-Verben: る → よう (食べよう), する → しよう, 来る → こよう. Oft mit たら / とき / が.",
   "link": "https://bunpro.jp/grammar_points/verb-volitional%E3%81%A8%E3%81%99%E3%82%8B",
   "linkname": "Bunpro: ようとする"
  },
  "ところだ": {
   "rule": "V-るところだ (gleich), V-ているところだ (gerade mittendrin), V-たところだ (gerade eben fertig).",
   "link": "https://bunpro.jp/grammar_points/%E3%81%9F%E3%81%A8%E3%81%93%E3%82%8D%E3%81%A0",
   "linkname": "Bunpro: たところだ"
  },
  "～はずがない": {
   "rule": "Normalform + はずがない. Nomen: Nのはずがない, na-Adjektiv: なはずがない. Starke Verneinung („unmöglich“).",
   "link": "https://bunpro.jp/grammar_points/%E3%81%AF%E3%81%9A%E3%81%8C%E3%81%AA%E3%81%84",
   "linkname": "Bunpro: はずがない"
  },
  "Nというのは～ものだ": {
   "rule": "N + というのは + Aussage + ものだ: etwas ist von Natur aus so. Locker: って.",
   "link": "https://bunpro.jp/grammar_points/%E3%82%82%E3%81%AE%E3%81%A0",
   "linkname": "Bunpro: ものだ"
  },
  "～てくる": {
   "rule": "て-Form + くる. Allmähliche Veränderung bis jetzt (寒くなってきた), Fortdauer bis jetzt (勉強してきた), Bewegung auf den Sprecher zu (走ってきた), Entstehen (見えてきた).",
   "link": "https://bunpro.jp/grammar_points/%E3%81%A6%E3%81%8F%E3%82%8B",
   "linkname": "Bunpro: てくる"
  }
 },
 "grammar": [
  {
   "p": "～のは～です",
   "q": "Ich habe gestern Fußball gespielt. Betone: **gestern**.",
   "a": "サッカーをしたのは昨日です。",
   "alt": [],
   "n": "Das Hervorgehobene (昨日) steht am Ende vor です, der Rest wird zu サッカーをした + のは."
  },
  {
   "p": "～のは～です",
   "q": "Ich bin zu spät gekommen, weil der Bus nicht kam. Betone: **den Grund**.",
   "a": "遅れたのは、バスが来なかったからです。",
   "alt": [],
   "n": "Grund hervorheben: ～のは、～からです."
  },
  {
   "p": "～のは～です",
   "q": "Der Wettbewerb ist nächste Woche. Betone: **nächste Woche**.",
   "a": "コンテストがあるのは来週です。",
   "alt": [
    "スピーチコンテストがあるのは来週です。"
   ],
   "n": "あるのは + Zeitangabe + です."
  },
  {
   "p": "～のは～です",
   "q": "Ich lerne Wirtschaft. Betone: **Wirtschaft**.",
   "a": "勉強しているのは経済です。",
   "alt": [
    "私が勉強しているのは経済です。"
   ],
   "n": "Das Objekt (経済) steht nach のは, das を fällt weg."
  },
  {
   "p": "～のは～です",
   "q": "Der Tutor hat mir Japanisch beigebracht. Betone: **der Tutor**.",
   "a": "日本語を教えてくれたのはチューターです。",
   "alt": [
    "私に日本語を教えてくれたのはチューターです。"
   ],
   "n": "Bei Betonung des Subjekts steht der Rest als Nebensatz vor のは."
  },
  {
   "p": "～のは～です",
   "q": "Ich habe die Rede vergessen, weil ich nervös war. Betone: **den Grund**.",
   "a": "スピーチを忘れてしまったのは、緊張したからです。",
   "alt": [
    "スピーチを忘れたのは、緊張したからです。"
   ],
   "n": "～てしまったのは、～からです."
  },
  {
   "p": "～そうにしている",
   "q": "Die Kinder **wirken** froh.",
   "a": "子どもたちはうれしそうにしている。",
   "alt": [
    "子供たちはうれしそうにしている。"
   ],
   "n": "うれしい → うれし + そうにしている."
  },
  {
   "p": "～そうにしている",
   "q": "Der Student **wirkt** müde (schläfrig).",
   "a": "学生は眠そうにしている。",
   "alt": [
    "学生は眠たそうにしている。"
   ],
   "n": "眠い → 眠そう."
  },
  {
   "p": "～そうにしている",
   "q": "Meine Freundin **wirkt** beschäftigt.",
   "a": "友だちは忙しそうにしている。",
   "alt": [
    "友達は忙しそうにしている。"
   ],
   "n": "忙しい → 忙しそう."
  },
  {
   "p": "～そうにしている",
   "q": "Der Lehrer **wirkte** gestern gesund / munter.",
   "a": "先生は昨日、元気そうにしていた。",
   "alt": [
    "昨日、先生は元気そうにしていた。"
   ],
   "n": "na-Adjektiv: 元気 + そう. Vergangenheit: ～ていた."
  },
  {
   "p": "～そうにしている",
   "q": "Er **wirkt**, als wolle er gehen.",
   "a": "彼は行きたそうにしている。",
   "alt": [],
   "n": "Wunschform: 行きたい → 行きたそう."
  },
  {
   "p": "～そうにしている",
   "q": "Er **wirkt**, als habe er keine Zeit.",
   "a": "彼は時間がなさそうにしている。",
   "alt": [],
   "n": "ない → なさそう (Ausnahme)."
  },
  {
   "p": "～(よ)うとする",
   "q": "Ich **wollte** gerade aufstehen, **da** klingelte das Telefon.",
   "a": "起きようとしたら、電話が鳴った。",
   "alt": [
    "起きようとしたとき、電話が鳴った。"
   ],
   "n": "起きる → 起きよう (ru-Verb) + とした + たら."
  },
  {
   "p": "～(よ)うとする",
   "q": "Ich **wollte** etwas sagen, aber ich habe es vergessen.",
   "a": "何かを言おうとしたけど、忘れてしまった。",
   "alt": [
    "何か言おうとしたが、忘れてしまった。"
   ],
   "n": "言う → 言おう (u-Verb)."
  },
  {
   "p": "～(よ)うとする",
   "q": "Als ich das Wohnheim **betreten wollte**, kam der Tutor.",
   "a": "寮に入ろうとしたら、チューターが来た。",
   "alt": [
    "寮に入ろうとしたとき、チューターが来た。"
   ],
   "n": "入る → 入ろう."
  },
  {
   "p": "～(よ)うとする",
   "q": "Ich **wollte** nach Hause gehen, aber es fing an zu regnen.",
   "a": "帰ろうとしたら、雨が降ってきた。",
   "alt": [
    "帰ろうとしたけど、雨が降ってきた。"
   ],
   "n": "帰る → 帰ろう. Dazu ～てくる für „fing an“."
  },
  {
   "p": "～(よ)うとする",
   "q": "Ich **wollte** lernen, aber ich bin eingeschlafen.",
   "a": "勉強しようとしたが、寝てしまった。",
   "alt": [
    "勉強しようとしたけど、寝てしまった。"
   ],
   "n": "勉強する → 勉強しよう."
  },
  {
   "p": "～(よ)うとする",
   "q": "Ich **wollte** aufs Spielfeld, aber mein Körper bewegte sich nicht.",
   "a": "グラウンドに出ようとしたが、体が動かなかった。",
   "alt": [
    "グラウンドに出ようとしたけど、体が動かなかった。"
   ],
   "n": "出る → 出よう."
  },
  {
   "p": "ところだ",
   "q": "Ich bin **gerade** nach Hause gekommen.",
   "a": "今、帰ってきたところです。",
   "alt": [
    "今帰ってきたところです。"
   ],
   "n": "V-たところだ: gerade eben fertig."
  },
  {
   "p": "ところだ",
   "q": "Ich lerne **gerade**.",
   "a": "今、勉強しているところです。",
   "alt": [
    "今勉強しているところです。"
   ],
   "n": "V-ているところだ: mittendrin."
  },
  {
   "p": "ところだ",
   "q": "Ich esse **gleich** (kurz davor).",
   "a": "これから食べるところです。",
   "alt": [
    "今から食べるところです。"
   ],
   "n": "V-るところだ: kurz davor."
  },
  {
   "p": "ところだ",
   "q": "Der Unterricht hat **gerade** angefangen.",
   "a": "授業は今始まったところです。",
   "alt": [
    "授業が今始まったところです。"
   ],
   "n": "始まる → 始まった + ところ."
  },
  {
   "p": "ところだ",
   "q": "Ich **wollte** dich **gerade** anrufen.",
   "a": "ちょうど電話しようと思っていたところです。",
   "alt": [
    "ちょうど電話するところでした。"
   ],
   "n": "～ようと思っていたところ: Vergangenheit von ているところ."
  },
  {
   "p": "ところだ",
   "q": "Ich habe **gerade** den Tutor getroffen.",
   "a": "今、チューターに会ったところです。",
   "alt": [
    "今チューターに会ったところです。"
   ],
   "n": "会う: Partikel に."
  },
  {
   "p": "～はずがない",
   "q": "Er hat gerade erst angefangen, Japanisch zu lernen. Er kann das **unmöglich** verstehen.",
   "a": "日本語を勉強し始めたばかりだから、分かるはずがない。",
   "alt": [
    "日本語を勉強し始めたばかりなので、分かるはずがない。"
   ],
   "n": "Verb in Normalform + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "Der Lehrer ist so munter. Er kann **unmöglich** krank sein.",
   "a": "先生はあんなに元気だから、病気のはずがない。",
   "alt": [
    "先生はあんなに元気なのだから、病気のはずがない。"
   ],
   "n": "Nomen: 病気 + の + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "Heute ist Sonntag. Es kann **unmöglich** Unterricht geben.",
   "a": "今日は日曜日だから、授業があるはずがない。",
   "alt": [
    "今日は日曜日だから、授業はあるはずがない。"
   ],
   "n": "ある + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "Ich habe so viel geübt. Ich kann es **unmöglich** vergessen.",
   "a": "あんなに練習したから、忘れるはずがない。",
   "alt": [
    "あんなに練習したのだから、忘れるはずがない。"
   ],
   "n": "忘れる + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "Diese Aufgabe ist doch einfach. Sie kann **unmöglich** schwierig sein.",
   "a": "こんなに簡単な問題が難しいはずがない。",
   "alt": [
    "こんなに簡単なら、難しいはずがない。"
   ],
   "n": "i-Adjektiv: 難しい + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "Er ist Japaner. Es **kann nicht sein**, dass er das nicht weiß.",
   "a": "彼は日本人だから、知らないはずがない。",
   "alt": [
    "彼は日本人なのだから、知らないはずがない。"
   ],
   "n": "ないはずがない = „bestimmt schon“ (doppelte Verneinung)."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "**Fußball ist nun mal** schwierig.",
   "a": "サッカーというのは難しいものだ。",
   "alt": [
    "サッカーって難しいものだ。"
   ],
   "n": "N + というのは + Aussage + ものだ."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "**Eine Fremdsprache zu lernen ist nun mal** spaßig.",
   "a": "外国語を勉強するというのは、楽しいものだ。",
   "alt": [
    "外国語を勉強することは楽しいものだ。"
   ],
   "n": "Verbphrase + というのは."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "**Das Leben im Ausland ist nun mal** anstrengend.",
   "a": "外国での生活というのは大変なものだ。",
   "alt": [
    "外国での生活って大変なものだ。"
   ],
   "n": "大変 (na-Adjektiv) + な + もの."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "**Vor allen zu sprechen macht einen nun mal** nervös.",
   "a": "みんなの前で話すというのは、緊張するものだ。",
   "alt": [
    "みんなの前で話すのは緊張するものだ。"
   ],
   "n": "話す + というのは."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "**Menschen vergessen nun mal** etwas, wenn sie nervös sind.",
   "a": "人というのは、緊張すると忘れてしまうものだ。",
   "alt": [
    "人間というのは、緊張すると忘れてしまうものだ。"
   ],
   "n": "Allgemeine Aussage über Menschen."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "Reden halten ist schwierig, **nicht wahr**? (locker, höflich)",
   "a": "スピーチって難しいものですよね。",
   "alt": [
    "スピーチというのは難しいものですよね。"
   ],
   "n": "って ersetzt というのは. ですよね sucht Zustimmung."
  },
  {
   "p": "～てくる",
   "q": "Mir **ist** langsam kalt **geworden**.",
   "a": "寒くなってきた。",
   "alt": [
    "寒くなってきました。"
   ],
   "n": "i-Adjektiv: 寒く + なってきた (allmähliche Veränderung)."
  },
  {
   "p": "～てくる",
   "q": "Ich **habe** drei Jahre lang Japanisch **gelernt** (bis jetzt).",
   "a": "3年間、日本語を勉強してきた。",
   "alt": [
    "三年間、日本語を勉強してきた。",
    "3年間日本語を勉強してきました。"
   ],
   "n": "Fortdauer bis jetzt."
  },
  {
   "p": "～てくる",
   "q": "Ein Hund kam **angerannt**.",
   "a": "犬が走ってきた。",
   "alt": [
    "犬が走ってきました。"
   ],
   "n": "Bewegung auf den Sprecher zu."
  },
  {
   "p": "～てくる",
   "q": "Ich werde langsam **schläfrig**.",
   "a": "眠くなってきた。",
   "alt": [
    "眠くなってきました。"
   ],
   "n": "眠い → 眠く + なってきた."
  },
  {
   "p": "～てくる",
   "q": "Es **werden** immer mehr Studenten.",
   "a": "学生が増えてきた。",
   "alt": [
    "学生がだんだん増えてきた。"
   ],
   "n": "増える + てくる: allmähliche Zunahme."
  },
  {
   "p": "～てくる",
   "q": "Ich **verstehe** langsam Japanisch.",
   "a": "日本語が分かってきた。",
   "alt": [
    "日本語がわかってきた。"
   ],
   "n": "分かる + てきた: Verständnis entsteht."
  },
  {
   "p": "～てくる",
   "q": "Ich gehe kurz in den Laden und **komme zurück**.",
   "a": "店に行ってきます。",
   "alt": [
    "お店に行ってきます。"
   ],
   "n": "Hingehen und zurückkommen: 行ってきます."
  }
 ],
 "mc": [
  {
   "p": "ところだ",
   "q": "「遊びに行かない？」「ごめん、今から（　　　　　）ところなんだ。」",
   "o": [
    "でかける",
    "でかけている",
    "でかけた",
    "でかけてきて"
   ],
   "n": "「今から」 heißt „ab jetzt“, die Handlung steht also kurz bevor: V-るところだ."
  },
  {
   "p": "ところだ",
   "q": "「もしもし、今どこ？」「たった今、駅に（　　　　　）ところだよ。」",
   "o": [
    "着いた",
    "着かない",
    "着こう",
    "着いて"
   ],
   "n": "「たった今」 = gerade eben. Gerade eben abgeschlossen: V-たところだ."
  },
  {
   "p": "ところだ",
   "q": "「何をしているの？」「今、メールを（　　　　　）ところ。」",
   "o": [
    "書いている",
    "書いた",
    "書こう",
    "書いて"
   ],
   "n": "Auf die Frage, was man gerade tut, passt die laufende Handlung: V-ているところだ."
  },
  {
   "p": "ところだ",
   "q": "ちょうど今、先生に電話を（　　　　　）と思っていたところです。",
   "o": [
    "しよう",
    "する",
    "した",
    "して"
   ],
   "n": "～ようと思っていたところです = „Ich wollte gerade …“. Davor steht die Volitivform: する → しよう."
  },
  {
   "p": "～(よ)うとする",
   "q": "朝、電車に（　　　　　）とした時、ドアがしまった。",
   "o": [
    "のろう",
    "のる",
    "のった",
    "のって"
   ],
   "n": "Volitivform + とする = „gerade etwas tun wollen“. 乗る → 乗ろう (u-Verb: -u → -ou)."
  },
  {
   "p": "～(よ)うとする",
   "q": "寝（　　　　　）としたとき、友だちから電話がかかってきた。",
   "o": [
    "よう",
    "て",
    "た",
    "る"
   ],
   "n": "寝る ist ein ru-Verb: る → よう. Also 寝ようとした."
  },
  {
   "p": "～(よ)うとする",
   "q": "授業で発表（　　　　　）としたが、緊張して声が出なかった。",
   "o": [
    "しよう",
    "して",
    "した",
    "する"
   ],
   "n": "する → しよう. 発表しようとしたが = „Ich wollte vortragen, aber …“."
  },
  {
   "p": "～(よ)うとする",
   "q": "会社を（　　　　　）とした時、部長に呼ばれた。",
   "o": [
    "出よう",
    "出て",
    "出た",
    "出る"
   ],
   "n": "出る (ru-Verb) → 出よう."
  },
  {
   "p": "～(よ)うとする",
   "q": "重い荷物を持ち上げ（　　　　　）としたが、動かなかった。",
   "o": [
    "よう",
    "て",
    "た",
    "ない"
   ],
   "n": "持ち上げる (ru-Verb) → 持ち上げよう. Der Versuch wird nicht abgeschlossen."
  },
  {
   "p": "～はずがない",
   "q": "「中村さん、遅いですねえ」「昨日、絶対に行くと言っていたから、（　　　　　）はずがありません。」",
   "o": [
    "来ない",
    "来た",
    "来る",
    "来よう"
   ],
   "n": "Er hat fest zugesagt, also kann es nicht sein, dass er nicht kommt: ～ないはずがない (= bestimmt kommt er)."
  },
  {
   "p": "～はずがない",
   "q": "彼は日本に十年住んでいるから、日本語が（　　　　　）はずがない。",
   "o": [
    "分からない",
    "分かる",
    "分かった",
    "分かろう"
   ],
   "n": "Nach zehn Jahren versteht er bestimmt Japanisch. Das heißt: „es kann nicht sein, dass er nicht versteht“ = 分からないはずがない."
  },
  {
   "p": "～はずがない",
   "q": "まだ習っていない漢字だから、彼が（　　　　　）はずがない。",
   "o": [
    "読める",
    "読めない",
    "読んだ",
    "読もう"
   ],
   "n": "Noch nicht gelernt: er kann es unmöglich lesen. 読める + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "今日は月曜日で休みだから、お店が（　　　　　）はずがない。",
   "o": [
    "開いている",
    "開いていない",
    "開いた",
    "開こう"
   ],
   "n": "Montag ist Ruhetag, der Laden kann unmöglich offen sein: 開いている + はずがない."
  },
  {
   "p": "～はずがない",
   "q": "子どもがお酒を好き（　　　　　）がない。",
   "o": [
    "なはず",
    "のはず",
    "だはず",
    "はず"
   ],
   "n": "Bei na-Adjektiven steht な vor はずがない: 好きなはずがない."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "外国で生活するというのは、大変な（　　　　　）です。",
   "o": [
    "もの",
    "こと",
    "ところ",
    "はず"
   ],
   "n": "Aussage über das Wesen einer Sache: ～というのは、～ものだ."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "初めて人前で話すときは、誰でも緊張する（　　　　　）だ。",
   "o": [
    "もの",
    "こと",
    "はず",
    "わけ"
   ],
   "n": "Allgemeine Erfahrung („so ist es nun mal“): ～ものだ."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "人（　　　　　）、緊張すると言うことを忘れてしまうものだ。",
   "o": [
    "というのは",
    "というので",
    "というと",
    "といえば"
   ],
   "n": "N + というのは + Aussage + ものだ."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "サッカー（　　　　　）難しいものですよね。",
   "o": [
    "って",
    "ので",
    "だけ",
    "なら"
   ],
   "n": "Im Gespräch wird というのは zu って."
  },
  {
   "p": "Nというのは～ものだ",
   "q": "外国語を勉強する（　　　　　）、楽しいものです。",
   "o": [
    "というのは",
    "ということは",
    "というより",
    "とともに"
   ],
   "n": "Verbphrase + というのは + Bewertung + ものだ."
  },
  {
   "p": "～のは～です",
   "q": "昨日、授業を休んだ（　　　　　）、熱があったからです。",
   "o": [
    "のは",
    "のに",
    "ので",
    "のを"
   ],
   "n": "Den Grund hervorheben: ～のは、～からです."
  },
  {
   "p": "～のは～です",
   "q": "私が一番好き（　　　　　）、この店のラーメンです。",
   "o": [
    "なのは",
    "のは",
    "だのは",
    "でのは"
   ],
   "n": "Nach na-Adjektiv steht なのは: 好きなのは～です."
  },
  {
   "p": "～のは～です",
   "q": "スピーチを忘れてしまった（　　　　　）、緊張したからです。",
   "o": [
    "のは",
    "のに",
    "ので",
    "のを"
   ],
   "n": "～のは、～からです: Der Grund steht am Ende."
  },
  {
   "p": "～のは～です",
   "q": "昨日、友だちと行った（　　　　　）、寮の近くのレストランです。",
   "o": [
    "のは",
    "のに",
    "ので",
    "のを"
   ],
   "n": "Das Hervorgehobene (der Ort) steht am Ende: 行ったのは～です."
  },
  {
   "p": "～のは～です",
   "q": "私がうれしかった（　　　　　）、先生にほめられたときです。",
   "o": [
    "のは",
    "のに",
    "ので",
    "のを"
   ],
   "n": "Der Zeitpunkt wird hervorgehoben: うれしかったのは～ときです."
  },
  {
   "p": "～そうにしている",
   "q": "森さんは、とてもうれし（　　　　　）していました。",
   "o": [
    "そうに",
    "さそうに",
    "そうな",
    "さそうな"
   ],
   "n": "うれしい → うれし + そうに + している. Bei i-Adjektiven fällt い weg, ohne さ."
  },
  {
   "p": "～そうにしている",
   "q": "先生はとても元気（　　　　　）しています。",
   "o": [
    "そうに",
    "そうな",
    "そうで",
    "そうだ"
   ],
   "n": "Vor している steht das Adverb そうに."
  },
  {
   "p": "～そうにしている",
   "q": "彼は今日、なんだか楽し（　　　　　）していなかった。",
   "o": [
    "そうに",
    "さそうに",
    "そうな",
    "くそうに"
   ],
   "n": "楽しい → 楽し + そうに. Das さ gehört nur zu ない und よい."
  },
  {
   "p": "～そうにしている",
   "q": "田中さんは時間が（　　　　　）にしている。",
   "o": [
    "なさそう",
    "ないそう",
    "なそう",
    "なくそう"
   ],
   "n": "Ausnahme: ない → なさそう."
  },
  {
   "p": "～そうにしている",
   "q": "天気がいいので、みんなとても気分が（　　　　　）にしている。",
   "o": [
    "よさそう",
    "いいそう",
    "よそう",
    "いそう"
   ],
   "n": "Ausnahme: いい → よさそう."
  },
  {
   "p": "～てくる",
   "q": "最近、スマートフォンで買い物をする人が増え（　　　　　）",
   "o": [
    "てきた。",
    "ていた。",
    "てみた。",
    "てくる。"
   ],
   "n": "増える + てきた = „es hat zugenommen (bis jetzt)“. Allmähliche Veränderung."
  },
  {
   "p": "～てくる",
   "q": "最近、日本語が少し分かって（　　　　　）。",
   "o": [
    "きた",
    "いた",
    "みた",
    "おく"
   ],
   "n": "分かってきた = „ich verstehe allmählich“."
  },
  {
   "p": "～てくる",
   "q": "3年間、日本語を勉強して（　　　　　）。",
   "o": [
    "きた",
    "いく",
    "みた",
    "おく"
   ],
   "n": "Fortdauer bis jetzt: 勉強してきた."
  },
  {
   "p": "～てくる",
   "q": "犬が私のほうへ走って（　　　　　）。",
   "o": [
    "きた",
    "いった",
    "みた",
    "おいた"
   ],
   "n": "Bewegung auf den Sprecher zu: 走ってきた."
  },
  {
   "p": "～てくる",
   "q": "空が暗くなって、雨が降って（　　　　　）。",
   "o": [
    "きた",
    "いった",
    "みた",
    "ある"
   ],
   "n": "Etwas beginnt und kommt „auf einen zu“: 降ってきた."
  }
 ]
};
