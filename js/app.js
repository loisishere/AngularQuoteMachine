(function(){
var app = angular.module('rqg-app',[]);

//service to handle random quote button
app.service('randQuote',['$http', function($http){
	this.randQuote = function(){
		//use cross domain site
		return $http.jsonp('https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=JSON_CALLBACK');
	}
}]);
//twitter button
/*
$("#tweet").attr("href","https://twitter.com/intent/tweet?via=_loisishere_&text=" + enqu);
*/
//loader function
//controller function
function quoteController($http,randQuote){
	self = this;
	self.currentQuote = {"quoteText":'Sadness may be part of life but there is no need to let it dominate your entire life.',"quoteAuthor":'Byron Pulsifer'};
	self.quoteList = [];
	self.twitter = "";
	//var size = quoteList.length;
	self.generateQuote = function(){
		//size = quoteList.length;
		randQuote.randQuote().then(function(data){
			if(data.data.quoteText.length + 15 > 140){
				self.generateQuote();
				return;
			}
			self.quoteList.push({"quoteText":self.currentQuote.quoteText,"quoteAuthor":self.currentQuote.quoteAuthor});
			self.currentQuote.quoteText =data.data.quoteText;
            if(data.data.quoteAuthor === ""){
                self.currentQuote.quoteAuthor ="Unknown";
            }else{
                self.currentQuote.quoteAuthor =data.data.quoteAuthor;
            }
            
	});
	}
}

//component
app.component('quoteGenerator',{
	controller: quoteController,
	controllerAs: "quoteCtrl",
    styleUrls:['./css/style.css'],
	templateUrl: "./quote.component.html"
})
//end of IIFE
})();