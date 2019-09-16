<template>
  <div class="container">

    <h2 style="margin-top:20px;margin-bottom:20px">利用規約</h2>
    <p style="margin-top:20px;margin-bottom:20px" class="rule" v-html="text"></p>
  </div>
</template>

<script>

//exportのタイミングが悪いのかなー Swiftよりも難しいな
var defaultObject = {
    data: function() {
        return {
            text: "<p>待機中</p>"
        }

    },
    
  mounted() {

    var request = new XMLHttpRequest();
        
        request.th = this;
        request.open('GET',"https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/rule");
        request.responseType = 'text';
        request.onload = function () {
          console.log(request.response);
          request.th.text = "<p>" + request.response.replace(/\r?\n/g,'<br>'); + "</p>"
        };

        request.send();  
        // const longtext = "\n不適切なユーザーへの対応について。\n攻撃的な生徒や先生を排除するために、ユーザーの自己紹介、画像が公開された際、運営は不適切な画像、攻撃的なコメントがないかをチェックし、もしあった場合はコンテンツを強制的に削除して、そのユーザーに警告を渡します。不適切であるという問い合わせがあったユーザーは「自己紹介は運営の判断で一時的に非公開になっています」と表示することで、注意すべきユーザーを表示します。\nチャットによる不適切な内容や不適切な行為があればお問い合わせフォームで知らせてください。内容を確認次第、チャット内容の削除、または不適切なユーザーの退会処分を行います。不適切なユーザーに対応することを約束いたします。\n\ndancy利用規約 \ndancy利用規約（以下「本規約」と言います。）には、当社が運営するサービ ス「dancy」（以下「本サービス」と言います。）の提供及び当社と登録され たユーザー（以下「登録ユーザー」と言います。）の皆様との間の権利義務関 係が定められています。本サービスの利用に際しては、本規約をお読みいただ いたうえで、同意していただく必要があります。 \n第１条 （適用） \n1. 本規約は、本サービスの提供義務及び本サービスの利用に関する当社と登録 ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当社 との間の本サービスの利用に関わる一切の関係に適用されます。 \n第２条 （定義）\n 本規約において使用する以下の用語は、各々以下に定める意味を有するものとしま。"  

        // const correctText = longtext.replace(/\r?\n/g,'<br>');
        // document.querySelectorAll('.rule')[0].innerHTML = correctText;


        // this.text = correctText;

  }
}
export default defaultObject

</script>

<style>
.container {
  margin: 0 auto;
  width: 100%;
}

</style>
