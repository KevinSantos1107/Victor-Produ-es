/* ============================================================
   script.js — Portfólio Iara Victoria Fernandes
   ============================================================ */

/* ============================================================
   EMAILJS — CONFIGURAÇÃO
   Para ativar o envio real de e-mail:
   1. Crie conta gratuita em https://www.emailjs.com
   2. Crie um Email Service (Gmail) e copie o Service ID
   3. Crie um Email Template com as variáveis:
      {{from_name}}, {{from_email}}, {{message}}
      Configure o "To Email" como: iaravicfernandes2006@gmail.com
   4. Copie o Template ID e o Public Key
   5. Substitua os valores abaixo
   ============================================================ */
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';   // ex: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';  // ex: 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';   // ex: 'abcDEFghiJKL'

document.addEventListener('DOMContentLoaded', function () {

  /* Inicializa EmailJS */
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'SUA_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  /* ============================================================
     1. MENU HAMBURGUER
     ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav    = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.site-header')) mainNav.classList.remove('open');
    });
  }

  /* ============================================================
     2. LINK ATIVO AO SCROLL
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObs.observe(s));

  /* ============================================================
     3. TYPING EFFECT — HERO
     ============================================================ */
  const typingEl = document.getElementById('typingText');

  if (typingEl) {
    const frases = [
      'Estudante de Farmácia · UNIFEMM',
      'Colaboradora na Ponto Farma',
      'Apaixonada pela área da saúde',
      'Futura farmacêutica',
      'Cuidando de pessoas com excelência'
    ];

    let fi = 0, ci = 0, apagando = false, pausando = false;

    function digitar() {
      if (pausando) return;
      const f = frases[fi];

      if (!apagando) {
        typingEl.textContent = f.substring(0, ++ci);
        if (ci === f.length) {
          pausando = true;
          setTimeout(() => { pausando = false; apagando = true; digitar(); }, 2400);
          return;
        }
        setTimeout(digitar, 65);
      } else {
        typingEl.textContent = f.substring(0, --ci);
        if (ci === 0) {
          apagando = false;
          fi = (fi + 1) % frases.length;
          setTimeout(digitar, 350);
          return;
        }
        setTimeout(digitar, 38);
      }
    }
    setTimeout(digitar, 800);
  }

  /* ============================================================
     4. PARTÍCULAS FLUTUANTES NO HERO
     ============================================================ */
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size    = Math.random() * 4 + 2;
      const left    = Math.random() * 100;
      const delay   = Math.random() * 12;
      const dur     = Math.random() * 10 + 14;
      const drift   = (Math.random() - 0.5) * 100;

      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${left}%;bottom:-10px;
        animation-delay:${delay}s;animation-duration:${dur}s;
        --drift:${drift}px;opacity:0;
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ============================================================
     5. REVEAL ON SCROLL
     ============================================================ */
  const reveals     = document.querySelectorAll('.reveal');
  const revealFades = document.querySelectorAll('.reveal-fade');

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });

  reveals.forEach(r => revealObs.observe(r));

  const heroObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); heroObs.unobserve(e.target); }
    });
  }, { threshold: 0.02 });

  revealFades.forEach(r => heroObs.observe(r));

  /* ============================================================
     6. BARRAS DE HABILIDADE — anima ao entrar na tela
     ============================================================ */
  function animateSkillBars(selector) {
    document.querySelectorAll(selector).forEach(fill => {
      const w = fill.getAttribute('data-w');
      if (w) fill.style.width = w + '%';
    });
  }

  const skillsSection = document.getElementById('habilidades');
  let barsAnimated = false;

  if (skillsSection) {
    const skillsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !barsAnimated) {
          barsAnimated = true;
          setTimeout(() => animateSkillBars('.skill-fill'), 200);
        }
      });
    }, { threshold: 0.08 });
    skillsObs.observe(skillsSection);
  }

  /* ============================================================
     7. FOTO — esconde placeholder se imagem carregar
     ============================================================ */
  const fotoImg         = document.querySelector('.foto-frame img');
  const fotoPlaceholder = document.getElementById('fotoPlaceholder');

  if (fotoImg && fotoPlaceholder) {
    fotoImg.addEventListener('load', () => {
      fotoPlaceholder.style.display = 'none';
      fotoImg.style.display = 'block';
    });
    fotoImg.addEventListener('error', () => {
      fotoImg.style.display = 'none';
      fotoPlaceholder.style.display = 'flex';
    });

    if (fotoImg.complete && fotoImg.naturalWidth > 0) {
      fotoPlaceholder.style.display = 'none';
    } else if (fotoImg.complete) {
      fotoImg.style.display = 'none';
    }
  }

}); /* fim DOMContentLoaded */

/* ============================================================
   8. MODO DAS HABILIDADES
   ============================================================ */
function setMode(modo) {
  const btnPro   = document.getElementById('btnProfissional');
  const btnEsp   = document.getElementById('btnEspecial');
  const panelPro = document.getElementById('panelProfissional');
  const panelEsp = document.getElementById('panelEspecial');

  if (modo === 'profissional') {
    btnPro.classList.add('active');
    btnEsp.classList.remove('active');
    panelPro.classList.remove('hidden');
    panelEsp.classList.add('hidden');
    setTimeout(() => {
      document.querySelectorAll('#panelProfissional .skill-fill').forEach(f => {
        f.style.width = f.getAttribute('data-w') + '%';
      });
    }, 80);
  } else {
    btnEsp.classList.add('active');
    btnPro.classList.remove('active');
    panelEsp.classList.remove('hidden');
    panelPro.classList.add('hidden');
    setTimeout(() => {
      document.querySelectorAll('#panelEspecial .skill-fill').forEach(f => {
        f.style.width = f.getAttribute('data-w') + '%';
      });
    }, 80);
  }
}

/* ============================================================
   9. VALIDAÇÃO + ENVIO DO FORMULÁRIO COM EMAILJS
   ============================================================ */
async function validarFormulario() {
  const nomeEl  = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const msgEl   = document.getElementById('mensagem');
  const eN      = document.getElementById('erroNome');
  const eE      = document.getElementById('erroEmail');
  const eM      = document.getElementById('erroMensagem');
  const btn     = document.getElementById('btnEnviar');
  const btnText = document.getElementById('btnText');

  if (!nomeEl || !emailEl || !msgEl) return;

  /* Limpa erros anteriores */
  [nomeEl, emailEl, msgEl].forEach(c => c.classList.remove('erro'));
  [eN, eE, eM].forEach(e => e.textContent = '');

  const nv = nomeEl.value.trim();
  const ev = emailEl.value.trim();
  const mv = msgEl.value.trim();
  let valido = true;

  if (!nv || nv.length < 3) {
    errar(nomeEl, eN, nv ? 'Nome deve ter pelo menos 3 caracteres.' : 'Informe seu nome.');
    valido = false;
  }
  if (!ev) {
    errar(emailEl, eE, 'Informe seu e-mail.');
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ev)) {
    errar(emailEl, eE, 'E-mail inválido.');
    valido = false;
  }
  if (!mv || mv.length < 10) {
    errar(msgEl, eM, mv ? 'Mensagem muito curta (mín. 10 caracteres).' : 'Escreva sua mensagem.');
    valido = false;
  }

  if (!valido) return;

  /* Desabilita botão durante envio */
  btn.disabled = true;
  btnText.textContent = 'Enviando...';

  /* Tenta enviar via EmailJS */
  const emailJSConfigurado = (
    typeof emailjs !== 'undefined' &&
    EMAILJS_SERVICE_ID  !== 'SEU_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'SEU_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY  !== 'SUA_PUBLIC_KEY'
  );

  if (emailJSConfigurado) {
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  nv,
        from_email: ev,
        message:    mv,
        to_email:   'iaravicfernandes2006@gmail.com',
        reply_to:   ev
      });
      mostrarSucesso();
    } catch (err) {
      console.error('Erro ao enviar:', err);
      btn.disabled = false;
      btnText.textContent = 'Enviar mensagem';
      eM.textContent = 'Erro ao enviar. Tente novamente ou contate diretamente pelo e-mail.';
    }
  } else {
    /*
      EmailJS ainda não configurado:
      Simula sucesso para testes locais.
      Configure as credenciais no topo deste arquivo para envio real.
    */
    console.warn('EmailJS não configurado. Siga as instruções no topo do script.js para ativar o envio real.');
    setTimeout(mostrarSucesso, 800);
  }
}

function mostrarSucesso() {
  document.getElementById('formularioContato').style.display = 'none';
  document.getElementById('mensagemSucesso').style.display   = 'block';
}

function errar(campo, span, texto) {
  campo.classList.add('erro');
  span.textContent = texto;
}