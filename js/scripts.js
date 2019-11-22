// evento para quando o usuario clica na div do botao Iniciar
$('#botaoIniciar').bind("click", function() {
	// chama a função de carregamento que prepara uma nova jogada
	loading();
	setTimeout(function(){
		// após 800ms esconde a div de carregamento
		$('#startscreen').hide();
	}, 800)
});

// essa função realiza todos os preparativos para uma nova jogada
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

/*	*	*	*	*	*	*	*	*	*	*	*
	Eventos do botão Voltar (#botaoVoltar)
*	*	*	*	*	*	*	*	*	*	*	*/

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

// evento para quando o usuário clicar na div do botao
$('#botaoVoltar').bind('click', function(){
	location.reload();
});

/*	*	*	*	*	*	*	*	*	*	*	*
	Fim dos eventos do botão Voltar (#botaoVoltar)
*	*	*	*	*	*	*	*	*	*	*	*/

// Script do popup box
var timer;

// Essa função configura a div do popup.
// Como parâmetros recebe:
// 1. um texto;
// 2. um booleano para a visibilidade do botão Fechar (.btnFecharPopup);
// 3. um valor em milissegundos para o tempo no qual o popup ficará visível.
// O 3º parametro também pode receber "false",
// então o popup não será fechado automaticamente
function gerar_popup(mensagem, botaoFechar, delay){
	if (botaoFechar) {
		$('.btnFecharPopup').show();
	} else{
		$('.btnFecharPopup').hide();
	}

	if (mensagem != false) {
		$('.hover_box > .content').text(mensagem);
	}

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

// evento para quando o mouse clica na div 
// do botão de Informação na tela Inicial
$('#infobutton').bind("click", function() {
	$('.popup h3').show();
	$('#versao').show();
	gerar_popup(false, true, false);
});

// fecha o popup quando o usuario clicar na area esmaecida da tela
$(window).click(function(e){
	if (e.target.className == 'popup fade'){

		//cancela a animação restante
		clearTimeout(timer);

		$('.popup').removeClass('fade');

		setTimeout(function(){
			// esconde o popup somente após a animação terminar
			$('.popup').hide();
			// esconde o título
			$('.popup h3').hide();
			// esconde o span da versão do jogo
			$('#versao').hide();
		}, 500);
	}
});

// fecha o popup quando o usuario clicar no botao Fechar (.btnFecharPopup)
$('.btnFecharPopup').click(function(){

	//cancela a animação restante
	clearTimeout(timer);

	$('.popup').removeClass('fade');

	setTimeout(function(){
		// esconde o popup somente após a animação terminar
		$('.popup').hide();
		// esconde o título
		$('.popup h3').hide();
		// esconde o span da versão do jogo
		$('#versao').hide();
	}, 500);
});

var tentativa;
var casas = 100;
var resposta;

// loop executado assim que a página é carregada.
// Cria todas as divs das casas de acordo com o valor da variável "casas" 
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
		
		// testa se a casa que o usuario clicou possui o número da resposta correta
		if (escolhido == resposta){
			// chama a função de fim de jogo passando a mensagem como parâmetro
			fimdojogo("Parabéns você encontrou o Wally!!!\n\nVocê conseguiu com " + tentativa + " tentativa(s).");
		} else {
			if (escolhido < resposta) {
				gerar_popup("Tente um número maior", false, 2000);
			} else {
				gerar_popup("Tente um número menor", false, 2000);
			}
		}

		tentativa++;
	} else {
		// chama a função de fim de jogo passando a mensagem como parâmetro
		fimdojogo("Você é realmente ruim nisso, hein?\nSeu número de tentativas esgotou!\nTente novamente.");
	}

	// essa função recebe um texto como parâmetro para ser mostrado na tela Fim de Jogo
	function fimdojogo(mensagem){

		// cria a div de fim de jogo com o texto recebido como parâmetro
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

		// verifica se o texto recebido como parâmetro é de sucesso ou perda
		if (mensagem.includes("Parabéns")) {
			// adiciona uma classe tratada no css principal. Contém a imagem do Wally feliz
			$('.content > .wally').addClass("wally-feliz");
			// adiciona a div dos fogos de artificio (tratada em fireworks.css)
			$('#fimjogo').append('<div class="pyro"><div class="before"></div><div class="after"></div></div>')
		} else{
			// adiciona uma classe tratada no css principal. Contém a imagem do Wally triste
			$('.content > .wally').addClass("wally-triste");
		}

		// evento para quando o usuario clica na div do botao Fim ao fim de jogo
		$('#fim').bind("click", function() {
			// essa linha recarrega a pagina, fazendo com que o usuário retorne à tela Inicial
			location.reload();
		});

		// evento para quando o usuario clica na div do botao Recomeçar ao fim de jogo
		$('#recomecar').bind("click", function() {
			// chama a função de carregamento que prepara uma nova jogada
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