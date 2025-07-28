// -------------------- VARIÁVEIS GLOBAIS E CONFIGURAÇÃO --------------------
const calendar = document.getElementById("calendar");
const today = new Date();
const diaAtual = today.getDate();

const podeDesbloquear = (today.getFullYear() > 2025) ||
  (today.getFullYear() === 2025 && today.getMonth() + 1 >= 7);

const mensagens = [/* ... suas mensagens aqui (mesmo array original) ... */];

// -------------------- CALENDÁRIO --------------------
for (let i = 1; i <= 28; i++) {
  const dia = document.createElement("div");
  dia.classList.add("day");
  dia.textContent = i;
  dia.dataset.dia = i;

  const visto = localStorage.getItem("dia" + i);
  let desbloqueado;
  if (i === 28) {
    // Desbloqueia dia 28 somente após 9:50 do dia 28/07/2025
    const now = new Date();
    const unlockDate = new Date(2025, 6, 28, 9, 50, 0, 0); // <- AJUSTADO AQUI
    desbloqueado = podeDesbloquear && now >= unlockDate;
  } else {
    desbloqueado = podeDesbloquear && i <= diaAtual;
  }

  if (!desbloqueado) {
    dia.classList.add("locked");
    dia.innerHTML = `<img class="cadeado-dia" src="Arq/Cadeado Fechado.png" alt="Cadeado">`;
  }

  dia.addEventListener("click", () => {
    if (i === 28) {
      const now = new Date();
      const unlockDate = new Date(2025, 6, 28, 9, 50, 0, 0); // <- AJUSTADO AQUI
      if (now < unlockDate) return;
    } else {
      if (!desbloqueado) return;
    }

    const jaViu = localStorage.getItem("dia" + i);

    if (!jaViu) {
      document.getElementById("lock-modal").classList.remove("hidden");
      const lockEmoji = document.getElementById("lock-emoji");
      lockEmoji.innerHTML = `<img id="cadeado-fechado" src="Arq/Cadeado Fechado.png" alt="Cadeado">`;
      const cadeadoFechado = document.getElementById("cadeado-fechado");
      cadeadoFechado.classList.add("shake-fade");

      setTimeout(() => {
        lockEmoji.innerHTML = `<img id="cadeado-aberto" src="Arq/Cadeado Aberto.png" alt="Cadeado Aberto">`;
      }, 3000);

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

// -------------------- FUNÇÕES DE DESBLOQUEIO --------------------
function getNextUnlockTime() {
  const now = new Date();
  if (now.getMonth() === 6 && now.getDate() === 27) {
    return new Date(2025, 6, 28, 9, 50, 0, 0);
  }
  if (now.getMonth() === 6 && now.getDate() < 27) {
    return new Date(now.getFullYear(), 6, now.getDate() + 1, 0, 0, 0, 0);
  }
  if (now.getMonth() === 6 && now.getDate() === 28 && (now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() < 50))) {
    return new Date(2025, 6, 28, 9, 50, 0, 0);
  }
  return null;
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

// -------------------- TIMERS NA TELA --------------------
function updateTimers() {
  const unlock = getTimeToUnlockFormatado();
  let unlockText;
  if (unlock) {
    unlockText = `Falta para desbloquear o próximo dia:<br><b>${unlock}</b>`;
  } else if (podeDesbloquear) {
    unlockText = `<span style="opacity:0.7;">Todos os dias já foram desbloqueados.</span>`;
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
