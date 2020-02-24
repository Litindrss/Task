$( document ).ready(function() {

get_count($order_p, $by_p);
get_posts($order_p, $by_p);
$root=0;
$multiply_num=0;

	$.ajax(
		{
			url: "php/get_userInfo.php",
			type: "GET",
			dataType:"json",
			success: function(data){
				if(data[1]=='admin'){
					$root=1;
					admin_get_posts($order_p, $by_p);
				}
			}
		});

		function get_count(order_p, by_p) {
			$data = {
				order: $order_p,
				by: $by_p,
			};
			$.ajax(
			{
				url: "php/get_post.php",
				type: "POST",
				dataType:"json",
				data: $data,
				success: function(data){
					for (var i = 0; i < Math.ceil(data.length/3); i++) {
						$('.pages').append('<div id="'+i+'" class="navigation">'+Number(i+1)+' </div>');
					}
				}
			});
		}





	$('.new_task_submit').on('click',function(){

	    var validEmail = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/).test($('#new_task_email').val());

	    console.log(validEmail);

	if (validEmail){
		if (!($('#new_task_username').val()==0)&& !($('#new_task_text').val()==0)) {
		$data = {
			username: $('#new_task_username').val(),
			email: $('#new_task_email').val(),
			text: $('#new_task_text').val()
		};
		$.ajax(
		{
			url: "php/new_post.php",
			type: "POST",
			data: $data,
			success: function(){
				if (confirm("Задача успешно размещена")){
					location.reload()
				}
			}
		});
	}else{
		alert('Заполните поля обязательные поля');
		}
	}else{
		alert('Введён некорректный email');
		}
	});
});


//*СОРТИРОВКА*//
$order_p='username';
$by_p=$('#by_p').is(":checked");


$('.by_username').on('click', function(){
	if ($root==1) {
		$order_p='username';
		$by_p=$('#by_p').is(":checked");
		admin_get_posts();
	}else{
		$order_p='username';
		$by_p=$('#by_p').is(":checked");
		get_posts();
	}
});

$('.by_email').on('click', function(){
	if ($root==1) {
		$order_p='email';
		$by_p=$('#by_p').is(":checked");
		admin_get_posts();
	}else{
		$order_p='email';
		$by_p=$('#by_p').is(":checked");
		get_posts();
	}
});

$('.by_status').on('click', function(){
	if ($root==1) {
		$order_p='status';
		$by_p=$('#by_p').is(":checked");
		admin_get_posts();
	}else{
		$order_p='status';
		$by_p=$('#by_p').is(":checked");
		get_posts();
	}
});


	function get_posts(order_p, by_p) {
		$data = {
			order: $order_p,
			by: $by_p,
		};
		$.ajax(
		{
			url: "php/get_post.php",
			type: "POST",
			dataType:"json",
			data: $data,
			success: function(data){
				build(data);
			}
		});
	}

	function build(data) {
		$page_length=data.length;
		$('.content').html('');
		for (var index =(Number($multiply_num)+1)*3-3; index <(Number($multiply_num)+1)*3; index++) {
				console.log('index= '+index);
				$('.content').append('<div class="task_item"><div class="username">Имя пользователя: '+data[index][1]+'</div><div class="email">Email: '+data[index][2]+'</div><div class="text">Текст задачи: '+data[index][3]+'</div><span class="status">Статус: '+data[index][4]+'</span></div>');
			}
	}

	$(document).on('click','.navigation', function(){
		$multiply_num=$(this).attr('id');
		console.log($multiply_num);
		get_posts($order_p, $by_p);
	});

	

	//*АДМИН GET POSTS*//
		function admin_get_posts(order_p, by_p) {
			$data = {
				order: $order_p,
				by: $by_p,
			};
			$.ajax(
			{
				url: "php/get_post.php",
				type: "POST",
				dataType:"json",
				data: $data,
				success: function(data){
					admin_build(data);
				}
			});
		}
		function admin_build(data) {
			$('.content').html('');


			$.each(data, function(index){
				if (data[index][4][0]=='В') {
					$('.content').append('<div class="admin task_item adminId'+data[index][0]+'"><div class="username">Имя пользователя: '+data[index][1]+'</div><div class="email">Email: '+data[index][2]+'</div><div class="text">Текст задачи: <textarea>'+data[index][3]+'</textarea></div><span class="status">Статус: '+data[index][4]+'</span><div>Выполнено <input id="admin_stsus" value="1" type="checkbox" checked="checked"></span><br><button id="'+data[index][0]+'" class="btn btn-primary save">Сохранить</button></div></div>');
				}
				else{
					$('.content').append('<div class="admin task_item adminId'+data[index][0]+'"><div class="username">Имя пользователя: '+data[index][1]+'</div><div class="email">Email: '+data[index][2]+'</div><div class="text">Текст задачи: <textarea>'+data[index][3]+'</textarea></div><span class="status">Статус: '+data[index][4]+'</span><div>Выполнено <input id="admin_stsus" value="1" type="checkbox" ></span><br><button id="'+data[index][0]+'" class="btn btn-primary save">Сохранить</button></div></div>');
				}	
			});
		}

$(document).on('click','.save', function(){
	$data = {
			id_item: $(this).attr('id'),
		};
	$.ajax(
	{
		url: "php/eq_text.php",
		type: "POST",
		dataType:"json",
		data: $data,
		success: function(data){

			if ($('.adminId'+data[0][0]+' #admin_stsus').is(":checked")) {
				$rev_stst='Выполнено';
			}else {
				$rev_stst='';
			}
		/*Обновление статуса*/

			if (data[0][3]==$('.adminId'+data[0][0]+' textarea').val()){

				if ($('.adminId'+data[0][0]+' .status').text().indexOf('Отредактированно')==-1) {
				$data = {
						id: data[0][0],
						status: $rev_stst,
						text: $('.adminId'+data[0][0]+' textarea').val(),
					};
				}else{
					$data = {
						id: data[0][0],
						status: $rev_stst+'\n Отредактированно администратором',
						text: $('.adminId'+data[0][0]+' textarea').val(),
					};
				}
			}else{
				$data = {
						id: data[0][0],
						status: $rev_stst +'\n Отредактированно администратором',
						text: $('.adminId'+data[0][0]+' textarea').val(),
					};	
			}
			$.ajax(
			{
				url: "php/save.php",
				type: "POST",
				dataType:"json",
				data: $data,
				success: location.reload()
			});

		}
	});
});

function callback(){
	alert('ok');
}

//*АВТОРИЗАЦИЯ*//

$(document).on('click','#log', login);
		function login() {
			$data = {
				username: $('.login-form #username').val(),
				password: $('.login-form #password').val(),
			}
		/*login process*/
			$.ajax(
			{
				url: "php/login.php",
				type: "POST",
				data: $data,
				success: function(){
				/*Getting login user info*/
					$.ajax(
					{
						url: "php/session.php",
						type: "GET",
						success: function(data){
							console.log(data);
							if(!data==''){
								$(location).attr('href',"admin.html");
							}
							else{
								$('.login-form .valid').html('Wrong login or password');
							}
						}
					});
				}
			});
			$.ajax(
			{
				url: "php/get_userInfo.php",
				type: "GET",
				dataType:"json",
				success: function(data){
					if(data[1]=='admin'){
						$root=1;
					}else{
						$root=0;
					}
				}
			});
		}
//*Выход*//
	$(document).on('click','.logout', function(){
		$.ajax({
			url: "php/logout.php",
			type: "GET",
			success: function(data){
				$(location).attr('href',"index.html");
			}	
		});

	});

	/*
	1. Статус "Отредактированно администратором" только в том случае если текст был затронут
	2. Пофиксить билд при сортировке
	3. Валидация для авторизации и задач


	4. Пагинация
	5. Дизайн
	*/