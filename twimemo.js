var TwitterName = "konojunya"; //@を除く、スクリーンネームを登録しよう！ 例）@konojunya -> konojunya

var express = require('express'),
		app = express(),
		MilkCocoa = require('milkcocoa'),
		port = process.env.PORT || 3810,
		Twit = require('twit');
app.use(express.static(__dirname + '/public'));
var milkcocoa = new MilkCocoa('あなたのmilkcocoa id');
var ds = milkcocoa.dataStore('memo');
var twitter = new Twit({
  consumer_key: "",
  consumer_secret: "",
  access_token: "",
  access_token_secret: "",
  timeout_ms: 60*1000,
});

// trackへハッシュタグなどを登録しよう！
var userTimeLine = twitter.stream("statuses/filter",{track: '#じゅんメモ'});
var text;
userTimeLine.on("tweet",function(tweet){
	if(tweet.user.screen_name == TwitterName){
		text = tweet.text.replace(/#じゅんメモ/,""); //ここにもハッシュタグを登録しておこう！
                ds.push({memo: text,done: false});
	}
});
app.get("/",function(req,res){
	res.sendfile("./index.html");
});
app.listen(port,function(){
	console.log("listen on:",port);
});
