var reverse = false;
	var videoD = false;
	$('.switch-btn').click(function(a){
	  $(this).toggleClass('switch-on');
	  if ($(this).hasClass('switch-on')) {
	  	if(a.target.id == "vi") {
	  		videoD = true;
	  		localStorage.setItem('vi', true);
	  	}
	  	if(a.target.id == "dt") {
	  		document.querySelector('html').setAttribute('class', 'dark');
	  		localStorage.setItem('dt', true);
	  	};
	  	if(a.target.id == "re") {
	  		reverse = true;
	  		document.querySelector('.middle.no2 .inner').innerHTML = ''; totalCount = 0;
	  		document.querySelector('.middle.no2 .count').innerHTML = "-";
	  		func(false);
	  		localStorage.setItem('re', true);
	  	};
	    $(this).trigger('on.switch');
	  } else {
	  	if(a.target.id == "vi") {
	  		videoD = false;
	  		localStorage.setItem('vi', false);
	  	}
	  	if(a.target.id == "dt") {
	  		document.querySelector('html').setAttribute('class', '');
	  		localStorage.setItem('dt', false);
	  	};
	  	if(a.target.id == "re") {
	  		reverse = false;
	  		document.querySelector('.middle.no2 .inner').innerHTML = ''; totalCount = 0;
	  		document.querySelector('.middle.no2 .count').innerHTML = "-";
	  		func(false);
	  		localStorage.setItem('re', false);
	  	};
	    $(this).trigger('off.switch');
	  }
	});
	// логика переключателей

	var tue = '';
	$('#exit').hover(function(){
		document.querySelector('#exit img').setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAABlBMVEX6YVz7YVyTTbZfAAAAAnRSTlP4Ad3xlhsAAAG1SURBVDjLzZVNboQwDIUdzSLdcYFKbHuKcrRJb5Zdr0FvQHdZRKF+tgmMYdTtIEbiG/L7/PKg9fGi1+BC4wMT0ZEX5uHAiTns3AjXvXMRHjvPwrFzEg4bo/uHDQCuRBPGmIyLNE0yIMlwg6wpGmdpWelmnHSR0guP8gLNlJttZcGEhI6jaTAJF90JtxuFl00z9OPnORinqHwzzso5GuMFcxqMlyC8Sc0TKU/GVbjZ9Ks8nbnuJeSezKFzAhfmb4Zf5hHMq/jC6vgGL9FUuq95UJYpeLAZPIMn+fEj4U8oUZkXYygBlYQzVIqiJk+lnG5cpHXnHHAbT6ggmqwVzItGZ1STt6Jc6BNiK9+hzDtU69zoDaq1jVd1j7DIlUiNtXEWM+w8iyd2VjPtXMQjO6tHnr/3/f34fv7D+vz6r/Zn+2+X+lzot+kbTG/Tvz6rj6tfs/oKX9R/84fywT/x0V+z+av7bzA/wp8/5sdy8O944Wfv9//Ohz9Pp/Pmz6M/r9mdZ3/efR74vPB54vPG59Epr3ye+bzzeVhJ6tPz0uepz9tTHvu89nnu8/70PfDfi9P35GW+d3/1sFDyskbaewAAAABJRU5ErkJggg==');
	},function(){
		document.querySelector('#exit img').setAttribute('src',tue);
	}
	);	
	//hover эффект аватарки

	$('#videoCon').click(function (e) {
		if (!$(e.target).is('.modal_cinw')) {
			//e.target.style.display = 'none';
			document.querySelector('#videoCon').style.display = 'none';
		}
	});
	//закрытие модального окна

	$('#toggles').click(function (e) {
		//console.log(e.target.className.contains("tokenHides"));
		if (e.target.className == "tokenHides") {
			//e.target.style.display = 'none';
			document.querySelector('#toggles').style.display = 'none';
		}
	});
	//закрытие модального окна

	count = 200;
	fields = "photo_50";
	var ids = [];
	var token;
	totalCountC = 0;
	var isMaxC = 999999999;
	var isMaxM = 999999999;
	// очень нужные переменные

	function getConv(offsetC){ //получение списка чатов

		if (offsetC > isMaxC) {return false;} //если все чаты уже получены выходим

		url1 = "https://api.vk.com/method/messages.getConversations?fields="+fields+"&count="+count+"&offset="+offsetC+"&access_token="+token+"&v=5.81";
		$.ajax({
			type : "GET",
			async: false,
			dataType : "jsonp",
			url : url1,
			data : {},
			success: function(data){
				console.log('----------------');
				console.log(data);
				console.log('----------------');

    		for (var i = 0; i < data['response']["items"].length; i++) {
   				ids.push(data['response']["items"][i]['conversation']);
   			
		    	myltiId = (checkArr(data['response']["items"][i]['conversation']['chat_settings']) ? (data['response']["items"][i]['conversation']['peer']['type'] == 'chat' ? data['response']["items"][i]['conversation']['peer']['id'] : data['response']["items"][i]['conversation']['chat_settings']['owner_id']) : data['response']["items"][i]['conversation']['peer']['id']);

		    	html = '<div class="block" onclick="func(this);showmsg('+ myltiId +',0)" id="a'+ myltiId +'"><div class="image"><img src=""></div><div class="name"></div></div>';
		    	
		    	let target = document.querySelector('.middle.no1 .inner');
		    	target.insertAdjacentHTML('beforeEnd', html);
		    } //создается список id тех, кого надо загрузить

			var ids1 = 'https://api.vk.com/method/execute?code=var%20users%20%3D%20API.users.get(%7B%22user_ids%22%3A%22'; //получение имя, фамилии и фото для всех обьектов чата (начало ссылки)
			var ids2 = 'https://api.vk.com/method/execute?code=var%20groups%20%3D%20API.groups.getById(%7B%22group_ids%22%3A%22'; //тоже самое, но для групп


			for (var i = 0; i < ids.length; i++) {
				//console.log(ids);
				if (ids[i]['peer']['type'] == 'user')
					ids1 = ids1 + ids[i]['peer']['id'] + '%2C';

				if (ids[i]['peer']['type'] == 'group'){
					ids2 = ids2 + String(ids[i]['peer']['id']).substr(1) + '%2C';
					String(ids[i]['peer']['id']).substr(1);
				}


				if (ids[i]['peer']['type'] == 'chat') {
					document.querySelector('#a' + ids[i]['peer']['id'] + ' img').setAttribute('src', (checkArr(ids[i]['chat_settings']['photo']) ? ids[i]['chat_settings']['photo']['photo_50'] : 'https://vk.com/images/icons/im_multichat_50.png'));
		    	$('#a' + ids[i]['peer']['id'] + ' div.name').html(ids[i]['chat_settings']['title']);
		    	} //id чатов юзеров и групп по одному добавляются в одну длинную ссылку
			} 

			ids1 = ids1 + '%22%2C%22fields%22%3A%22photo_50%2Conline%22%7D)%3B%20return%20%7B%22usersinfo%22%3Ausers%7D%3B&access_token='+token+'&callback=GetUsersHandler&v=5.95';
			ids2 = ids2 + '%22%7D)%3B%20return%20%7B%22groupsinfo%22%3Agroups%7D%3B&access_token='+token+'&callback=GetGroupsHandler&v=5.95';
			//получение имя, фамилии и фото для всех обьектов чата (конец ссылки)

			$.ajax({
				type : "GET",
				async: false,
				dataType : "jsonp",
				url : ids1,
				data : {},
				success: function(data){
					console.log('--------4--------');
					console.log(data);
					console.log('--------4--------');

			    	data['response']["usersinfo"].forEach(element => document.querySelector('#a' + element['id'] + ' img').setAttribute('src', element['photo_50']));
			    	data['response']["usersinfo"].forEach(element => $('#a' + element['id'] + ' div.name').html(element['first_name'] + ' ' + element['last_name']));

			    }
			}); // получение имя, фамилии и фото для пользователей



			$.ajax({
				type : "GET",
				async: false,
				dataType : "jsonp",
				url : ids2,
				data : {},
				success: function(data){
					console.log('--------5--------');
					console.log(data);
					console.log('--------5--------');

			    	data['response']["groupsinfo"].forEach(element => document.querySelector('#a-' + element['id'] + ' img').setAttribute('src', element['photo_50']));
			    	data['response']["groupsinfo"].forEach(element => $('#a-' + element['id'] + ' div.name').html(element['name']));

			    }
			}); // получение названия и фото для групп

			document.querySelector('.post.nom3').setAttribute('onclick', 'getConv('+ (offsetC + 200) +')'); // изменение смещения чтобы в следующий раз рагрузить следующие 200 профилей
    		document.querySelector('.post.nom4').setAttribute('onclick', 'getAllConv('+ (offsetC + 200) + ',' + data["response"]["count"]+')',false); //аналогично для "загрузить всё"

    		totalCountC = totalCountC + data["response"]['items'].length;
    		document.querySelector('.middle.no1 .count').innerHTML = totalCountC + ' из ' + data["response"]["count"];
    		isMaxC = data["response"]["count"];
    		//обновление надписи с колличеством чатов

    		}
		});
	}


	function func(a){
		var highlightedItems = document.querySelectorAll(`.middle.no1 .inner .block`);
		highlightedItems.forEach(function(userItem) {
		    userItem.setAttribute(`style`,``);
		    userItem.setAttribute(`class`,`block`);
		});

		if(a){
		    $('html, body').animate({ scrollTop: 10000 }, 600); //прокрутка

		    a.style.backgroundColor=`#818181`;
		    a.style.color=`#000`;
		    a.setAttribute("class","block clicked");
		    // выделение выбранного блокa
		}

	}
	function Dwnl(){ // функция скачивания

		var le0;
		var le;
		function DwnlReal(){ // именно сама загрузка
			var css = String(document.querySelector('#generalCss').innerHTML);
			var js = String(document.querySelector('#Svideo').outerHTML);
			gh = String(document.querySelector('.clicked').querySelector('.name').innerHTML);
			na=gh+".html";

			var element = document.createElement('a');

			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + '<html'+ (localStorage.getItem('dt') == 'true' ? ' class="dark"' :'') +'><head><meta charset="utf-8"><style type="text/css">'+encodeURIComponent(css)+'</style>'+encodeURIComponent(js)+'<head><body>' + encodeURIComponent(document.querySelector('.middle.no2 .inner').innerHTML) +'</body></html>');
			element.setAttribute('download', na);

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}
		function Generate() // доп функция для последовательного запуска ajax'ов
		{
			var hi = document.querySelectorAll(`.videoA`);

			le = hi.length;
			if (le === 0) {DwnlReal();return 0;}
			le0 = 0;
			var _p = Promise.resolve();
			hi.forEach(customer =>
				_p = _p.then(() => AxCall(customer))
				);

		}

		function AxCall(v) // эта рекурсивная функция разрешает все ссылки на видео что бы его можно было воспроизвести на скачанной странице
		{
			var h = v.getAttribute(`onclick`);
			if (h.indexOf('window.open') !== -1) {le0++;if (le0 == le) {DwnlReal();};return 0;}
			return $.ajax({
				type : "GET",
				async: false,
				dataType : "jsonp",
				url : h.slice(8,-2),
				data : {},
				success: function(data){

	            console.log('--------3--------');
	            console.log(data);
	            console.log('--------3--------');

	            v.setAttribute('onclick',"window.open('"+data['response']["items"][0]['player']+"')" );
	            le0++;
	            if (le0 == le) {DwnlReal()}
	        	}
	    	})
		}
		if(videoD) {Generate()} else {DwnlReal()}
	}

    function sleep(milliseconds) {
    	const date = Date.now();
    	let currentDate = null;
    	do {
    		currentDate = Date.now();
    	} while (currentDate - date < milliseconds);
    } // функция задержки

    function showAllmsg(id,offset,count,nado){ // последовательная загрузка всех сообщений
    	var attempts;
    	function doAjaxRequest(id,offset) {
    		attempts = 0;
    		doAjaxRequestLoop(id,offset);
    	} 

    	function doAjaxRequestLoop(id,offset) { // рекурсивная функция, загружает 200 сообщений и затем запускает сама себя с новым смещением 
    		attempts += 1;
    		if (attempts > 5) {
    			alert('too many attempts.');
    			return;
    		} // в случае ошибки пробуем еще раз и так 5 раз 

    		if (offset > isMaxM) {if (nado) {Dwnl()}; return 'full';} // если новое смещение больше общего кол-ва сообщений, значит загруженно всё что есть
			url2 = 'https://api.vk.com/method/messages.getHistory?peer_id=' + id + '&offset=' + offset + '&count=200&access_token='+token+'&v=5.95';

			$.ajax({
				type : "GET",
				dataType : "jsonp",
				async: false,
				url : url2,
				data : {},
				error: function (error) {
					doAjaxRequestLoop(id,offset); // заного делаем запрос
				},
				success: function(data){
					console.log('--------2--------');
					console.log(data);
					console.log('--------2--------');
					if (checkArr(data['error'])) {console.log("err");var ret = 'err'; doAjaxRequestLoop(id,offset);return 0;} // заного делаем запрос
					else{var ret = 'ok';}

			    	document.querySelector('.post.nom1').setAttribute('style', 'display:flex;');
			    	document.querySelector('.post.nom2').setAttribute('style', 'display:flex;');
			    	document.querySelector('.post.nom1').setAttribute('onclick', 'showmsg('+id+','+ offset +')');

			    	document.querySelector('.post.nom2_1').setAttribute('onclick', 'showAllmsg('+id+','+ offset + ',' + data["response"]["count"]+ ',true)');
			    	document.querySelector('.post.nom2').setAttribute('onclick', 'showAllmsg('+id+','+ offset + ',' + data["response"]["count"]+ ',false)');
			    	// новое смещение для кнопок загрузки
			  		
			  		totalCount = totalCount + data["response"]['items'].length;
			  		document.querySelector('.middle.no2 .count').innerHTML = totalCount + ' из ' + data["response"]["count"];
			  		isMaxM = data["response"]["count"];
			  		// обновление счетчиков сообщений

			  		addmsg(data['response']["items"], 0); // выводим сообщения

			  		offset = offset + 200;
			  		let ix = offset-200;
			  		ix=ix+200;
			  		//колдуем со смещением и рекурсивно запускаем эту же функцию с новым смещением
			  		if (ix < count) {console.log(doAjaxRequest(id,ix));}

					else{if (nado) {Dwnl()}} // если новое смещение больше чем всего сообщений, значит они все загружены и если был передал флаг загрузки - то загружаем
				}
			});
		}
		doAjaxRequest(id,offset);


		/*if (nado) {Dwnl()}*/
	}
	function delTo(){
		localStorage.removeItem('to');
		location.reload();
	} // удаление токена из локального хранилища 


	function getAllConv(offset,count,nado){
		for (var i = offset; i < count; i=i+200) {
			getConv(i);
			sleep(3000);
		}
		if (nado) {Dwnl()}
	} // запрашивает все чаты 


function Svideo(vid){ // функция разрешения ссылкок на видео 
	document.querySelector('#videoCon').setAttribute('style','display:block;');
	$.ajax({
		type : "GET",
		async: false,
		dataType : "jsonp",
		url : vid,
		data : {},
		success: function(data){
			console.log('--------3--------');
			console.log(data);
			console.log('--------3--------');

			document.querySelector('#but1').setAttribute('href',data['response']["items"][0]['player']); // ссылка на плеер от самого вк
			document.querySelector('#but2').setAttribute('href',vid); // если сделать запрос через адресную строку браузера, то в ответе будут прямые ссылки на видео (а так не будет)

			}
		});
	}



	function checkArr(a){
		b = false;
		if (typeof a != 'undefined')
			if (a.length !== 0)
				b = true;
		return b;
	} // проверка на существование элемента массива



	function addmsg(items, fwd){ // выводит сообщенния 

		for (var i = 0; i < items.length; i++) { // каждое сообщение обрабатывается отдельно

			data1 = items[i]['date'] *1000; // для красивой даты
   		
   			var border = '';
   			for (var ii = 0; ii < fwd; ii++) {
   				border = border + '<div style="width:3px;margin-left:1px;margin-right:3px;background-color:#7598B7;"> </div>';
   			} // для добавления синей полоски слева (для пересланных сообщений)

   			html = '<div class="msg fwd'+ fwd +'" id="a'+ items[i]['id'] +'">'+ border +'<div class="body">['+ new Date(data1).toLocaleDateString("en-GB").replace('/',':').replace('/',':') + ' в ' + new Date(data1).toLocaleTimeString("en-GB", { hour12: false, hour: 'numeric', minute: 'numeric' }) + '] ' + (String(items[i]['from_id']).indexOf('-') == -1 ? ("<a style='color:black' target='_blank' href='https://vk.com/id"+items[i]['from_id']+"'>"+ (items[i]['from_id'] == id ? 'Вы' : items[i]['from_id']) +"</a>") : (items[i]['from_id'])) + ' : ' + (items[i]['text'] != "" ? (items[i]["reply_message"] ? items[i]['text'] + ' [ответ]' : items[i]['text']) :  (items[i]["action"] !== undefined ? ("["+items[i]["action"]["type"] +" -> <a href=https://vk.com/id"+ items[i]["action"]["member_id"]+">"+ items[i]["action"]["member_id"] +"<a/>]") : (items[i]["attachments"] !== [] ? "":"ссылается на сообщение: "))) +'</div></div>';
   			// сложная штука, где формируется сообщение с учетом всего (вложений, ответов и тп.)

   			var reversSet = reverse ? "afterBegin" : "beforeEnd"; // нужен ли реверс

   			let target = document.querySelector('.middle.no2 .inner');
			target.insertAdjacentHTML(reversSet, html);
			// встраиваем блок с сообщением в inner и далее будем вставлять сюда еще и вложения если они есть

			if (items[i]["reply_message"]) {var c = [items[i]["reply_message"]];addmsg(c, fwd + 1);} // рекурсивно добавляются ответы на сообщения
			if (items[i]["fwd_messages"]) {addmsg(items[i]["fwd_messages"].reverse(), fwd + 1);} //рекурсивно добавляются пересланные сообщения

			if (items[i]["attachments"] !== []) { // работа с вложениями
				for (var ii = 0; ii < items[i]["attachments"].length; ii++) { // проходимся по вложениям

					// отдельно обрабатывается каждый тип вложения (в каждом if)

					if (items[i]["attachments"][ii]['type'] == 'photo') {
						temp = 0;
	    				for (var iii = 0; iii < items[i]["attachments"][ii]['photo']['sizes'].length; iii++) {
	    					if (temp < items[i]["attachments"][ii]['photo']['sizes'][iii]['height'])
	    						temp = items[i]["attachments"][ii]['photo']['sizes'][iii]['height'];
	    				}
	    				for (var iii = 0; iii < items[i]["attachments"][ii]['photo']['sizes'].length; iii++) {
	    					if (temp == items[i]["attachments"][ii]['photo']['sizes'][iii]['height'])
	    						var imgUrl = items[i]["attachments"][ii]['photo']['sizes'][iii]['url'];
	    				}
	    				html = '<div class="msg attachments photoA">'+ border +'<div style="width:300px;"><a target="_blank" href="'+ imgUrl +'"><img style="width:100%;margin-left:0px;" src="'+imgUrl+'"></a></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);		
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'graffiti') {
	    				imgUrl = items[i]["attachments"][ii]['graffiti']['url'];
	    				html = '<div class="msg attachments">'+ border +'<div style="width:300px;"><img style="width:100%;margin-left:0px;" src="'+imgUrl+'"></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'gift') {
	    				giftUrl = items[i]["attachments"][ii]['gift']['thumb_256'];
	    				html = '<div class="msg attachments">'+ border +'<div style="width:300px;"><img style="width:100%;margin-left:0px;" src="'+giftUrl+'"></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'sticker') {
	    				//console.log(items[i]["attachments"][ii]['sticker']['images']);
	    				giftUrl = items[i]["attachments"][ii]['sticker']['images'][items[i]["attachments"][ii]['sticker']['images'].length - 1]['url'];
	    				html = '<div class="msg attachments">'+ border +'<div style="width:300px;"><img style="width:100%;margin-left:0px;" src="'+giftUrl+'"></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'doc') {
	    				docUrl = items[i]["attachments"][ii]['doc']['url'];
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[Документ] <a href="'+ docUrl +'">'+ items[i]["attachments"][ii]['doc']['title'] +'</a></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'link') {
	    				docUrl = items[i]["attachments"][ii]['link']['url'];
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[link] <a target="_blank" href="'+ docUrl +'">'+ items[i]["attachments"][ii]['link']['title'] +'</a></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}
	    			if (items[i]["attachments"][ii]['type'] == 'wall') {
	    				docUrl = 'https://vk.com/wall'+ items[i]["attachments"][ii]['wall']['from_id']+'_'+ items[i]["attachments"][ii]['wall']['id']; //items[i]["attachments"][ii]['wall'];
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[Запись на стене] <a target="_blank" href="'+ docUrl +'">'+ docUrl +'</a></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}
	    			if (items[i]["attachments"][ii]['type'] == 'poll') {
	    				docUrl = 'https://vk.com/poll'+ items[i]["attachments"][ii]['poll']['author_id']+'_'+ items[i]["attachments"][ii]['poll']['id']; //items[i]["attachments"][ii]['wall'];
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[Опрос] <a target="_blank" href="'+ docUrl +'">'+ items[i]["attachments"][ii]['poll']['question'] +'</a></div>';
	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'audio') {
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[Музыка] '+ items[i]["attachments"][ii]['audio']['artist'] + ' - ' + items[i]["attachments"][ii]['audio']['title'] +'</div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'call') {
	    				html = '<div class="msg attachments">'+ border +'<div class="body">[Звонок] '+ (items[i]["attachments"][ii]["call"]["video"] ? "По видео" : "По аудио") + (checkArr(items[i]["attachments"][ii]['call']['duration']) ? ', который продлился ' + items[i]["attachments"][ii]['call']['duration'] +' секунд' : ', который был отменен') +'</div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}
	    			if (items[i]["attachments"][ii]['type'] == 'audio_message') {
	    				oggUrl = items[i]["attachments"][ii]['audio_message']['link_ogg'];

	    				html = '<div class="msg fwd'+fwd+' attachments">'+ border +'<div style="width:300px;"><source src="'+ oggUrl +'" type="audio/ogg;"><audio controls="" src="'+ oggUrl +'"></audio></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}

	    			if (items[i]["attachments"][ii]['type'] == 'video') {
	    				Object.keys(items[i]["attachments"][ii]['video']).forEach(function(key) {
	    					var minmax = 0;
	    					if (key.includes("photo")) {
	    						if (minmax < key.substr(6))
	    							minmax = key.substr(6);
	    						img1Url = this['photo_'+minmax];
	    					}
						}, items[i]["attachments"][ii]['video']);

	    				videoUrl0 = '`https://api.vk.com/method/video.get?videos='+items[i]["attachments"][ii]['video']['owner_id']+'_'+items[i]["attachments"][ii]['video']['id']+'_'+items[i]["attachments"][ii]['video']['access_key']+'&access_token='+token+'&v=5.81`';

	    				html = '<div onclick="Svideo('+videoUrl0+')" class="msg attachments videoA">'+ border +'<div style="width:300px;" class="video"><img style="width:100%;margin-left:0px;" src="'+img1Url+'"></div>';

	    				let target = document.querySelector('.middle.no2 .inner');
	    				target.insertAdjacentHTML(reversSet, html);
	    			}
    			}
    		}  		
    	}
    var fwd = 0; //обнуление степени пересланости

    if(reverse){setTimeout(() => (document.querySelector('.middle.no2 .inner').scrollTop =  document.querySelector('.middle.no2 .inner').scrollHeight), 2000);};
    //прокрутка к низу для реверсированного списка смс

	}


	function showmsg(id,offset){ // загрузка сообщений
		if (offset > isMaxM) {return 'full';} // если смещение больше общ кол-ва, то выходим

		url2 = 'https://api.vk.com/method/messages.getHistory?peer_id=' + id + '&offset=' + offset + '&count=200&access_token='+token+'&v=5.95';

		$.ajax({
			type : "GET",
			dataType : "jsonp",
			async: false,
			url : url2,
			data : {},
			success: function(data){
				console.log('--------2--------');
				console.log(data);
				console.log('--------2--------');

				if (checkArr(data['error'])) {console.log("err");var ret = 'err'; return 'err';}
				else{var ret = 'ok';}

		    	document.querySelector('.post.nom1').setAttribute('style', 'display:flex;');
		    	document.querySelector('.post.nom2').setAttribute('style', 'display:flex;'); // стили меняются для того чтобы в первый раз блоки управления стали видны (они отключены изначально)

		    	document.querySelector('.post.nom1').setAttribute('onclick', 'showmsg('+id+','+ offset +')'); 
		    	document.querySelector('.post.nom2_1').setAttribute('onclick', 'showAllmsg('+id+','+ offset + ',' + data["response"]["count"]+ ',true)');
		    	document.querySelector('.post.nom2').setAttribute('onclick', 'showAllmsg('+id+','+ offset + ',' + data["response"]["count"]+ ',false)');
		    	// увеличиваем смещение чтобы в следующий раз рагрузить следующую пачку сообщений

		  		if (offset <=200) {document.querySelector('.middle.no2 .inner').innerHTML = ''; totalCount = 0;}
		  		// если смещение меньше или равно 200, значит мы либо загрузили сообщения для этого человека впервые,
		  		//либо начали загружать смс уже от другого. В обоих случаях стоит очистить inner чтобы сообщения от разных пользователей не смешались

		  		totalCount = totalCount + data["response"]['items'].length;
		  		document.querySelector('.middle.no2 .count').innerHTML = totalCount + ' из ' + data["response"]["count"];
		  		// обновляем счетчики
		  		isMaxM = data["response"]["count"];

		  		addmsg(data['response']["items"], 0); // передаем сообщения функции, которая их выведет
			}
		});
	offset = offset + 200; // не забываем увеличить смещение
	}

	function show(n){ // проверка токена на валидость
		token = n.split('access_token=').pop().split('&expires_in=').shift();
		document.querySelector('#token').value = token;

		ids100 = 'https://api.vk.com/method/users.get?fields=photo_100&access_token='+token+'&v=5.95&callback=GetUserInfoHandler';
		$.ajax({
			type : "GET",
			async: false,
			dataType : "jsonp",
			url : ids100,
			data : {},
			error: function(data){
				alert('беды с токеном');
				localStorage.removeItem("to");
		    	document.querySelector('#tokenHide').setAttribute('style','display:block;'); // показываем окошко ввода токена
			},
			success: function(data){
				console.log('--------0--------');
				console.log(data);
				console.log('--------0--------');

		    	if (!checkArr(data['error'])) { // если ошибок нет:
		    		id = data['response'][0]['id'];

		    		localStorage.setItem('to', token); // сохранение токена

		    		tue = data['response'][0]['photo_100'];

		    		document.querySelector('#exit').setAttribute('style','display:block;');
		    		document.querySelector('#exit img').setAttribute('src',data['response'][0]['photo_100']);
		    		document.querySelector('#tokenHide').setAttribute('style','display:none;');
		    		// формирование аватарки в левом верхнем углу

		    		getConv(0); // если все ок, то загружаем список чатов
		    	}
		    	else{
		    		alert('беды с токеном');
		    		localStorage.removeItem("to");
		    		document.querySelector('#tokenHide').setAttribute('style','display:block;'); // показываем окошко ввода токена
		    	}
	    	}
		});
	}


var t = localStorage.getItem('to');
if (t !== null) { show(t) }
else {document.querySelector('#tokenHide').setAttribute('style','display:block;')}

var t = localStorage.getItem('dt');
if (t !== null) { if(t == "true") $('#dt').click()}

var t = localStorage.getItem('re');
if (t !== null) { if(t == "true") $('#re').click()}

var t = localStorage.getItem('vi');
if (t !== null) { if(t == "true") $('#vi').click()}
//проверка наличия токена и состояний переключателей в хранилище

document.querySelector('.middle.no1').scrollIntoView(); // прокрутка к окну с чатами