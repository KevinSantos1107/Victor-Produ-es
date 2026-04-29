/* ============================================================
   script.js — Portfólio Kevin Lucas Teixeira Santos
   Contém:
     1. Alternância de tema claro/escuro
     2. Menu hamburguer para mobile
     3. Destaque automático do link ativo ao fazer scroll
     4. Efeito de digitação (typing) na seção hero
     5. Animação das barras de idioma
     6. Animação de reveal ao fazer scroll
     7. Validação e simulação de envio do formulário
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
     ============================================================ */
  const toggle = document.getElementById('themeToggle');
  const icon   = toggle ? toggle.querySelector('.theme-icon') : null;
  const body   = document.body;

  function aplicarTema() {
    const t = localStorage.getItem('tema') || 'dark';
    if (t === 'light') {
      body.classList.add('light-mode');
      if (icon) icon.textContent = '🌙';
    } else {
      body.classList.remove('light-mode');
      if (icon) icon.textContent = '☀';
    }
  }

  aplicarTema();

  if (toggle) {
    toggle.addEventListener('click', function () {
      const atual = localStorage.getItem('tema') || 'dark';
      localStorage.setItem('tema', atual === 'dark' ? 'light' : 'dark');
      aplicarTema();
    });
  }

  /* ============================================================
     2. MENU HAMBURGUER (MOBILE)
     ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav    = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) {
        mainNav.classList.remove('open');
      }
    });
  }

  /* ============================================================
     3. DESTAQUE DO LINK ATIVO AO FAZER SCROLL
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ============================================================
     4. EFEITO DE DIGITAÇÃO (TYPING EFFECT) — SEÇÃO HERO
     ============================================================ */
  var typingEl = document.getElementById('typingText');

  if (typingEl) {
    var frases = [
      'Estudante de Ciência da Computação',
      'Desenvolvedor Web',
      'Apaixonado por Tecnologia',
      'Always learning 🚀'
    ];

    var fi = 0, ci = 0, apagando = false, pausando = false;

    function digitar() {
      if (pausando) return;
      var f = frases[fi];

      if (!apagando) {
        typingEl.textContent = f.substring(0, ++ci);
        if (ci === f.length) {
          pausando = true;
          setTimeout(function () {
            pausando = false;
            apagando = true;
            digitar();
          }, 2000);
          return;
        }
        setTimeout(digitar, 70);
      } else {
        typingEl.textContent = f.substring(0, --ci);
        if (ci === 0) {
          apagando = false;
          fi = (fi + 1) % frases.length;
          setTimeout(digitar, 300);
          return;
        }
        setTimeout(digitar, 40);
      }
    }

    setTimeout(digitar, 900);
  }

  /* ============================================================
     5. ANIMAÇÃO DAS BARRAS DE IDIOMA
     ============================================================ */
  var barras = document.querySelectorAll('.idioma-progresso');

  if (barras.length) {
    var barraObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.getAttribute('data-width') + '%';
          barraObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    barras.forEach(function (b) { barraObserver.observe(b); });
  }

  /* ============================================================
     6. REVEAL ON SCROLL
     Elementos com classe .reveal aparecem suavemente ao entrar
     na viewport.
     ============================================================ */
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function (r) { revealObserver.observe(r); });

}); /* Fim do DOMContentLoaded */


/* ============================================================
   7. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO
   ============================================================ */
function validarFormulario() {
  var nome  = document.getElementById('nome');
  var email = document.getElementById('email');
  var msg   = document.getElementById('mensagem');
  var eNome  = document.getElementById('erroNome');
  var eEmail = document.getElementById('erroEmail');
  var eMsg   = document.getElementById('erroMensagem');

  if (!nome || !email || !msg) return;

  /* Limpa erros anteriores */
  [nome, email, msg].forEach(function (c, i) {
    c.classList.remove('erro');
    [eNome, eEmail, eMsg][i].textContent = '';
  });

  var valido = true;
  var nv = nome.value.trim();
  var ev = email.value.trim();
  var mv = msg.value.trim();

  /* Validação do nome */
  if (!nv) {
    errar(nome, eNome, 'Informe seu nome.');
    valido = false;
  } else if (nv.length < 3) {
    errar(nome, eNome, 'Nome deve ter pelo menos 3 caracteres.');
    valido = false;
  }

  /* Validação do e-mail */
  if (!ev) {
    errar(email, eEmail, 'Informe seu e-mail.');
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ev)) {
    errar(email, eEmail, 'E-mail inválido (ex: usuario@dominio.com).');
    valido = false;
  }

  /* Validação da mensagem */
  if (!mv) {
    errar(msg, eMsg, 'Escreva sua mensagem.');
    valido = false;
  } else if (mv.length < 10) {
    errar(msg, eMsg, 'Mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  }

  /* Simula envio se tudo válido */
  if (valido) {
    nome.value = email.value = msg.value = '';
    document.getElementById('formularioContato').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';
  }
}

/* Exibe erro no campo */
function errar(campo, span, texto) {
  campo.classList.add('erro');
  span.textContent = texto;
}