// -------------------- VARIÁVEIS GLOBAIS E CONFIGURAÇÃO --------------------
const calendar = document.getElementById("calendar");
const today = new Date();
const diaAtual = today.getDate();

const podeDesbloquear = (today.getFullYear() > 2025) ||
  (today.getFullYear() === 2025 && today.getMonth() + 1 >= 7);

const mensagens = [
  "Oii amorzinho, tudo bem? Primeiro dia das nossas férias oficialmente. Estou muito ansioso para o fim das férias. Te amo D+ gatinha.",
  "Oieeee, como você tá? Segundo dia... Só explicando, essas mensagens não serão muito compridas por conta do tamanho disponível no site, ok? Eu te amo mais que o infinito.",
  "Oi gatinha, como vai? Hoje trouxe uma cantada que você já me passou kkkk -> Seu pai é mecânico? Porque você é uma graxinha <333 kkkkk. Amo você, princesa.",
  "Dia 4... Só quero que você saiba que eu te amo muuuuito e nunca vou te abandonar, ok? Pode contar comigo sempre.",
  "Já foram 5 dias de 28, gatinha. Vai passar rápido, você vai ver! Te amo D+ gatinha. Sua mensagem: \"Oii, aqui é a Julia de ontem, hj vc provavelmente vai pro sítio (espero que eles gostem da sua sobremesa)\" ",
  "(x² + y² - 1)³ = x² y³ — GeoGebra. Eu te amo mais que o infinito. (0)",
  "Mais um dia sem ver você... Se realmente formos ao cinema dia 14, já estamos no meio do caminho. Amo você, princesa.",
  "Hoje a mensagem é sua. <3 Te amo D+ gatinha.",
  "É mais fácil escrever no dia do que antes... A criatividade já está acabando kkkkk. Mas eu te amo muitão, viu? (8)",
  "Oii minha princesa, como vai? em 4 dias vamos nos ver ein kkkkk ansioso por isso <3. Amo você d+ (5)",
  "28 - 11 = 17. É o que falta para nos vermos (desconsiderando o cinema, porque no dia em que escrevi isso não era certeza). Amo você, princesa.",
  "\"Você deve ser uma onda de luz, porque toda vez que te vejo, meu coração reflete só para você!\" O Chat manda bem nas cantadas kkkk. Te amo D+ gatinha.",
  "Se ganhamos um 'Sim' pro cinema, é amanhã... Espero que dê certo :) Eu te amo mais que o infinito. \"Tem coisas que a gente escreve que ficam mais vivas do que parece...\"",
  "Espero te ver hoje... Mas se não der, tudo bem... Eu te amo muito!",
  "Estou ouvindo 'Better off Alone' enquanto escrevo as mensagens kkkk. Escrevendo e dançando na cadeira <3 Amo você, princesa.",
  "Faltam quase 10 dias para o fim das férias. Te amo D+ gatinha.",
  "A partir de amanhã eu começo uma contagem de 10 até 0, hein. Eu te amo mais que o infinito.",
  ">10< Tá acabandooooo. As mensagens dos dias: 19; 20; 21; 22 se completam. Anote-as! Amo você, princesa.",
  ">9< Só quero dizer que te amo muuuuuuuuuito.",
  ">8< Mas... (3)",
  ">7< Eu amo mais :)",
  ">6< Mais do que você pode imaginar!!!",
  ">5< Apenas 5 dias, amorzinho. Vamos sobreviver kkkkk. Te amo D+ gatinha.",
  ">4< No momento em que estou escrevendo, eu não sei... Mas com certeza estou morrendo de saudade enquanto você tá lendo kkkk. Eu te amo mais que o infinito.",
  ">3< Treeeeesssss diasssssss... Finalmente. A última sexta-feira! Amo você, princesa.",
  ">2< Doiiiiiissss... Aposto que estou com saudade do seu rostinho lindo e do seu sorriso :) Te amo D+ gatinha.",
  ">1< É amanhã, amorzinhooo. Finalmente acabou nossa sentença kkkkk. Te amo demais, viu? (A mensagem de amanhã eu quero que você abra junto comigo na escola).",
  "Oii meu amor... Quero expressar por essa mensagem o quanto foi legal preparar isso tudo pra você, espero de coração que você tenha gostado do seu presente. Se você gostou, ao terminar de ler essa mensagem me abraça kkkkk... Eu te amo demais, princesa. Quero passar todos os dias da minha vida ao seu lado te dando muito amor e carinho. Obrigado por existir. De: Seu futuro marido. Lucas <3 (2)"
];

// -------------------- CALENDÁRIO --------------------
for (let i = 1; i <= 28; i++) {
  const dia = document.createElement("div");
  dia.classList.add("day");
  dia.textContent = i;
  dia.dataset.dia = i;

  const visto = localStorage.getItem("dia" + i);
  let desbloqueado;
  if (i === 28) {
    // Só desbloqueia o dia 28 depois das 8:30 do dia 28/07/2025
    const now = new Date();
    const unlockDate = new Date(2025, 6, 28, 8, 30, 0, 0); // 28/07/2025 08:30
    desbloqueado = podeDesbloquear && now >= unlockDate;
  } else {
    desbloqueado = podeDesbloquear && i <= diaAtual;
  }

  if (!desbloqueado) {
    dia.classList.add("locked");
    dia.innerHTML = `<img class="cadeado-dia" src="Arq/Cadeado Fechado.png" alt="Cadeado">`;
  }

  dia.addEventListener("click", () => {
    // Para o dia 28, só permite abrir após 8:30
    if (i === 28) {
      const now = new Date();
      const unlockDate = new Date(2025, 6, 28, 8, 30, 0, 0);
      if (now < unlockDate) return;
    } else {
      if (!desbloqueado) return;
    }

    const jaViu = localStorage.getItem("dia" + i);

    if (!jaViu) {
      document.getElementById("lock-modal").classList.remove("hidden");
      const lockEmoji = document.getElementById("lock-emoji");
      // Cadeado fechado aparece, chacoalha e esmaece
      lockEmoji.innerHTML = `<img id="cadeado-fechado" src="Arq/Cadeado Fechado.png" alt="Cadeado">`;
      const cadeadoFechado = document.getElementById("cadeado-fechado");
      cadeadoFechado.classList.add("shake-fade");

      // Após 3s (fim da animação), mostra o cadeado aberto
      setTimeout(() => {
        lockEmoji.innerHTML = `<img id="cadeado-aberto" src="Arq/Cadeado Aberto.png" alt="Cadeado Aberto">`;
      }, 3000);

      // Após 5s, fecha o modal e mostra a mensagem
      setTimeout(() => {
        document.getElementById("lock-modal").classList.add("hidden");
        abrirMensagem(i);
        localStorage.setItem("dia" + i, "visto");
      }, 5000);
    } else {
      abrirMensagem(i);
    }
  });

  calendar.appendChild(dia);
}

// -------------------- MODAL DE MENSAGEM --------------------
function abrirMensagem(dia) {
  document.getElementById("message-day").textContent = dia;
  document.getElementById("message-text").textContent = mensagens[dia - 1];
  document.getElementById("message-modal").classList.remove("hidden");
}

document.getElementById("close-message").addEventListener("click", () => {
  document.getElementById("message-modal").classList.add("hidden");
});

// -------------------- FUNÇÕES DE TEMPO E FORMATOS --------------------
function pad(n) { return n < 10 ? '0' + n : n; }

function numeroPorExtenso(n) {
  const unidades = ["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"];
  const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta"];
  if (n < 20) return unidades[n];
  const dez = Math.floor(n / 10);
  const uni = n % 10;
  if (uni === 0) return dezenas[dez];
  return `${dezenas[dez]} e ${unidades[uni]}`;
}

function tempoPorExtenso(d, h, m, s) {
  let partes = [];
  if (d > 0) partes.push(`${numeroPorExtenso(d)} dia${d>1?"s":""}`);
  if (h > 0) partes.push(`${numeroPorExtenso(h)} hora${h>1?"s":""}`);
  if (m > 0) partes.push(`${numeroPorExtenso(m)} minuto${m>1?"s":""}`);
  if (s > 0 || partes.length === 0) partes.push(`${numeroPorExtenso(s)} segundo${s>1?"s":""}`);
  return partes.join(", ").replace(/, ([^,]*)$/, " e $1");
}

function tempoFormatado(d, h, m, s) {
  let partes = [];
  if (d > 0) partes.push(`${d} dia${d>1?"s":""}`);
  if (h > 0) partes.push(`${h} hora${h>1?"s":""}`);
  if (m > 0) partes.push(`${m} minuto${m>1?"s":""}`);
  if (s > 0 || partes.length === 0) partes.push(`${s} segundo${s>1?"s":""}`);
  return partes.join(", ").replace(/, ([^,]*)$/, " e $1");
}

// -------------------- FUNÇÕES DE TEMPO PARA DESBLOQUEIO E CONTAGEM --------------------
function getNextUnlockTime() {
  const now = new Date();
  // Se for dia 27 de julho, o próximo é 28/07 às 8:30
  if (now.getMonth() === 6 && now.getDate() === 27) {
    return new Date(2025, 6, 28, 8, 30, 0, 0);
  }
  // Se for antes do dia 28, desbloqueia à meia-noite do próximo dia
  if (now.getMonth() === 6 && now.getDate() < 27) {
    return new Date(now.getFullYear(), 6, now.getDate() + 1, 0, 0, 0, 0);
  }
  // Se for dia 28 ou depois, não há próximo desbloqueio
  return null;
}

function getTimeToUnlockExtenso() {
  const next = getNextUnlockTime();
  if (!next) return null;
  const now = new Date();
  let diff = next - now;
  if (diff < 0) diff = 0;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return tempoPorExtenso(0, h, m, s);
}

function getTimeToUnlockFormatado() {
  const next = getNextUnlockTime();
  if (!next) return null;
  const now = new Date();
  let diff = next - now;
  if (diff < 0) diff = 0;
  const d = 0;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return tempoFormatado(d, h, m, s);
}

function getTimeToJuly28Extenso() {
  const target = new Date(2025, 6, 28, 0, 0, 0, 0);
  const now = new Date();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return tempoPorExtenso(d, h, m, s);
}

function getTimeToJuly28Formatado() {
  const target = new Date(2025, 6, 28, 0, 0, 0, 0);
  const now = new Date();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return tempoFormatado(d, h, m, s);
}

// -------------------- ATUALIZAÇÃO DOS TIMERS NA TELA --------------------
function updateTimers() {
  const unlock = getTimeToUnlockFormatado();
  let unlockText;
  if (unlock) {
    unlockText = `Falta para desbloquear o próximo dia:<br><b>${unlock}</b>`;
  } else {
    unlockText = `<span style="opacity:0.7;">Aguarde até 1 de julho para desbloquear o primeiro dia!</span>`;
  }
  if (document.getElementById('timers')) {
    document.getElementById('timers').innerHTML = unlockText;
  }
  const july28 = getTimeToJuly28Formatado();
  const july28Text = `Faltam para 28 de Julho:<br><b>${july28}</b>`;
  if (document.getElementById('timer-july28')) {
    document.getElementById('timer-july28').innerHTML = july28Text;
  }
}
setInterval(updateTimers, 1000);
updateTimers();

// -------------------- CHUVA DE CORAÇÕES --------------------
function chuvaDeCoracoes() {
  const container = document.getElementById('chuva-coracoes');
  if (!container) return;
  const coracao = document.createElement('img');
  coracao.src = 'Arq/Nos.png';
  coracao.className = 'coracao-nos';
  const left = Math.random() * 100;
  coracao.style.left = `${left}%`;
  coracao.style.transform = "translateX(-50%)";
  coracao.style.width = `${70 + Math.random()*40}px`;
  coracao.style.opacity = 0.8 + Math.random()*0.2;
  container.appendChild(coracao);
  setTimeout(() => coracao.remove(), 3000);
}
setInterval(chuvaDeCoracoes, 700);
