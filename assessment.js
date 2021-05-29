'use strict'
const userNameInput=document.getElementById("user-name");
//assessment.htmlにあるinputタグにあるuserNameとidタグがついたものをプログラムでいじれるようにするための宣言
const assessmentButton=document.getElementById("assessment");//診断するのボタンプログラムからいじれるよう宣言する
const resultDivided=document.getElementById("result-area");
const tweetDivided=document.getElementById("tweet-area");
//1．htmlにあるタグの情報をassessment.jsでJavaScriptのものが使える準備がここまで整った。

function removeAllChildren(element){
    while (element.firstChild){//firstChildというのは中にあるタグを探して一番最初のタグを持ってくる書き方。
        //result-areanになにかタグがある限りループする
        element.removeChild(element.firstChild);
        }
/**
 * 診断処理を実行して、指定した要素に結果を表示する。
 * @param {HTMLElement} element HTMLの要素
 */
}
function createAssessmentResult(element,result){
//result-areaにh3タグで"診断結果"という文字を表示
const h3=document.createElement('h3');//h3タグのオブジェクトを作る。
h3.innerText='診断結果';//h3の中身も設定する。innerTextはタグの中に文字を設定する方法。h3タグに'診断結果'の文字列を設定
element.appendChild(h3);//result-areaにh3変数をhtmlのdivタグの中に設定
//診断処理を実行

//result-areaにpタグで診断結果を表示
const p =document.createElement('p');
p.innerText=result;
element.appendChild(p);
}
//ボタンをクリックしたときになにか反応させるとき、以下の関数を実行させたい
assessmentButton.onclick= ()=>{//2．onclickのタイミングでuserNameInput.valueを参照しにいく。
    //inputタグ(名前を入力する欄)の入力された名前をとっていきたい。inputタグからinputタグの中身をとってきたい
    let userName=userNameInput.value;//入力された名前をとる
    if (userName.length===0){
    //名前の入力がなかったので処理を中断。これをガードという。
        return;//←return;を書くとこの後はもう実行されない。consoleログを中断するため
    }
//すでにある診断結果を削除
//診断結果の表示
removeAllChildren(resultDivided);//removeAllChildrenでresultDividedの中身を全部消す
//診断結果エリアの初期化

const result=assessment(userName);
createAssessmentResult(resultDivided,result);//resultDividedにassessmentの結果を表示する
//(もう消去した(console.log(userName);//これ書いた直後に実行されるわけではない。onclickのイベントでこのconsole.log("ボタンが押されました");が実行される。))

//Tweetボタンの表示を下から書く(Tweetエリアの作成)。Tweetボタンは診断結果の表示の後にこないといけない。
//aタグを作って属性を設定する。
removeAllChildren(tweetDivided);//Tweetエリアの初期化

const a=document.createElement('a')//内部的にJavaScript上でaタグを作った。ただ後でhtmlに書き込む必要がある。
//Elementはタグのこと。aタグを作りますよ、ということ。
const href='https://twitter.com/intent/tweet?button_hashtag='
+encodeURIComponent('あなたのいいところ')//日本語を安全な状態に変換した
+'&ref_src=twsrc%5Etfw';
//これでaタグの中身とhrefに設定する内容を定義した。aやhrefに入る変数は変わらないので、constではなくletに変えても大丈夫。
a.setAttribute('href',href);//hrefプロパティにhrefの内容を設定した。
//htmlにある下のもの、
//    href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" 
//第1引数が(イコールより)左側のhrefでプロパティを何にするかということ。
//第2引数(イコールより右側のもの)が、設定する中身はなんですか、ということ。
//これでaタグにhref=~~が追加される。
//ちなみにhtmlにあるclass,data-text,data-show-countなどもattributeになる。
a.className='twitter-hashtag-button';
a.setAttribute('data-text','診断結果の文章');
a.innerText=('Tweet #あなたのいいところ');
tweetDivided.appendChild(a);//aタグをHTMLとして追加した

//scriptタグを作る
const script=document.createElement('script');
script.setAttribute('src','https://platform.twitter.com/widgets.js');
//https://platform.twitter.com/widgets.jsをsrcプロパティに設定した

//scriptタグをHTMLとして追加する
tweetDivided.appendChild(script);
}

//入力欄でEnterキーを押したとき、診断を実行する。
userNameInput.onkeydown=event=>{//eventという引き数をとってきている
    if (event.key==='Enter'){
//診断機能の実行
assessmentButton.onclick();//Enterを押したときだけ、assessmentButton.onclickを呼び出す
    }
}

const answers=[
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
 function assessment(userName){
   
    //for文作ってユーザーネームの長さ分だけ指定してすべての文字を全部足せばいい。配列の文字を足す機能はないから、自分で作るしかない。
    var userNameNumber=0;
    for (let i=0; i<userName.length; i++){
 //userName.(文字列)を数値(漢字だと5桁)に変換
 userNameNumber+=userName.charCodeAt(i);//入力が何文字でもその文字数文だけ足したanswerNumberができあがる。
    }
 
     //二文字までの名前だったら→var userNameNumber=userName.charCodeAt(0)+charCodeAt(1);
     //5桁の数値を回答結果の範囲(0~15)に変換
 var answerNumber=userNameNumber%answers.length;
 var result=answers[answerNumber];
 //ここまできたら最後に置換した結果をreturnで返さないといけない
 return　result.replace(/\{userName\}/g,userName);//診断結果。/\{userName\}/gは一括置換するパターん。
 //2個目で置換したい文字列は、userNameに入っている文字列です、ということ。
 }
 console.assert(assessment('太郎') ==='太郎のいいところは知識です。博識な太郎を多くの人が頼りにしています。'/*確認したいこと*/,
 '診断結果の文言の特定の部分を名前に置き換える処理がただしくありません。'/*エラー時のコメント*/);