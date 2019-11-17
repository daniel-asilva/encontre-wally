$('#botaoIniciar').bind("click", function() {
	loading();
	setTimeout(function(){
		// após 800ms esconde a div de carregamento
		$('#startscreen').hide();
	}, 800)
});

function loading(){
	// reseta o numero de tentativas
	tentativa = 1;
	// define uma nova resposta correta para o jogo
	resposta = Math.floor(Math.random() * casas);

	// remove a rolagem do body
	$('body').removeClass('loaded');
	// mostra a div de carregamento
	$('#loadingscreen').show();
	// adiciona a animação de chegada da div de carregamento
	$('#loadingscreen').css('animation', 'arrive 3.8s ease');

	setTimeout(function(){
		// após 3 segundos restaura a rolagem do body
		$('body').addClass('loaded');

		setTimeout(function(){
			// após 800ms esconde a div de carregamento
			$('#loadingscreen').hide();
		}, 800)
	}, 3000)
}

// funções do popup do botaoVoltar
// evento para quando o mouse está em cima da div do botao
$('#botaoVoltar').mouseenter(function(){
	// cancela a animação restante
	clearTimeout(timer);
	// mostra o popup e adiciona a animação de fadein
	$('#popupVoltar').show();
	$('#popupVoltar').css('animation', 'fadein .5s');
});
// evento para quando o mouse sai de cima da div do botao
$('#botaoVoltar').mouseleave(function(){
	// adiciona a animação de fadeout
	$('#popupVoltar').css('animation', 'fadeout .5s');

	timer = setTimeout(function() {
		// esconde o popup após o fim da animação: 500ms
		$('#popupVoltar').hide();
	}, 500);
});
// evento para quando o mouse clica na div do botao
$('#botaoVoltar').bind('click', function(){
	location.reload();
});

// Script do popup box
var timer;

function gerar_popup(mensagem, botaoFechar, delay){
	if (botaoFechar) {
		$('.btnFecharPopup').show();
	} else{
		$('.btnFecharPopup').hide();
	}

	$('.hover_box > .content').text(mensagem);

	$('.popup').addClass('fade');
	$('.popup').show();
	
	if (delay != false) {

		timer = setTimeout(function(){

			$('.popup').removeClass('fade');

			setTimeout(function(){
				// esconde o popup somente após a animação terminar
				$('.popup').hide();
			}, 500);
		}, delay); // usa a duração, passada como parametro, no timeout
	}
}

// evento para quando o mouse clica 
// na div do botao de informação na tela de inicio
$('#infobutton').bind("click", function() {
	$('#versao').show();
	gerar_popup("Não sei o que escrever aqui 😕", true, false);
});

// fecha o popup se o usuario clicar na area esmaecida da tela
$(window).click(function(e){
	if (e.target.className == 'popup fade'){

		//cancela a animação restante
		clearTimeout(timer);

		$('.popup').removeClass('fade');

		setTimeout(function(){
			// esconde o popup somente após a animação terminar
			$('.popup').hide();
			// esconde o span da versão do jogo
			$('#versao').hide();
		}, 500);
	}
});

// fecha o popup quando o usuario clicar no botao fechar
$('.btnFecharPopup').click(function(){

	//cancela a animação restante
	clearTimeout(timer);

	$('.popup').removeClass('fade');

	setTimeout(function(){
		// esconde o popup somente após a animação terminar
		$('.popup').hide();
		// esconde o span da versão do jogo
		$('#versao').hide();
	}, 500);
});

var tentativa;
var casas = 100;
var resposta;

for (i = 0; i < casas; i++){
	var div = document.createElement('div');
	div.innerHTML = "<p>" + (i + 1) + "</p>";
	div.setAttribute('class', 'casa');
	div.setAttribute('onclick', 'wally(this)');
	document.getElementById("container-casas").appendChild(div);
}

function wally(ctrl){
	if (tentativa <= 10) {
		var escolhido = ctrl.getElementsByTagName('p')[0].innerHTML;
		
		if (escolhido == resposta){
			fimdojogo("Parabéns você encontrou o Wally!!!\n\nVocê conseguiu com " + tentativa + " tentativa(s).");
		} else {
			if (escolhido < resposta) {
				// alert("Tente um número maior");
				gerar_popup("Tente um número maior", false, 2000);
			} else {
				// alert("Tente um número menor");
				gerar_popup("Tente um número menor", false, 2000);
			}
		}

		tentativa++;
	} else {
		fimdojogo("Você é realmente ruim nisso, hein?\nSeu número de tentativas esgotou!\nTente novamente.");
	}

	function fimdojogo(mensagem){

		$('#center').after('\
			<div id="fimjogo">\
				<div class="content">\
					<div class="wally"></div>\
					<div class="texto"><p>' + mensagem + '</p></div>\
					<div class="containerbotoes">\
						<div id="fim" class="botao">Fim</div>\
						<div id="recomecar" class="botao">Recomeçar</div>\
					</div>\
				</div>\
			</div>'
		);

		if (mensagem.includes("Parabéns")) {
			$('.content > .wally').addClass("wally-feliz");
			$('#fimjogo').append('<div class="pyro"><div class="before"></div><div class="after"></div></div>')
		} else{
			$('.content > .wally').addClass("wally-triste");
		}

		$('#fim').bind("click", function() {
			location.reload();
		});

		$('#recomecar').bind("click", function() {
			loading();
			setTimeout(function(){
				// após 800ms esconde a div de carregamento
				$('#fimjogo').remove();
			}, 800)
		});
	}
}

$(window).on('beforeunload', function(){
	$(window).scrollTop(0);
})