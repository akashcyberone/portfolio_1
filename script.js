(function () {
  'use strict';

  var CONTACT_EMAIL = 'theakashkumar0101@gmail.com';

  // Mobile navigation
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      toggle.focus();
    }
  });

  // Contact form: opens the visitor's email app (no backend, so nothing is "sent" here)
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fields = form.querySelectorAll('input, textarea');
    var firstInvalid = null;
    fields.forEach(function (field) {
      var bad = !field.checkValidity();
      field.classList.toggle('invalid', bad);
      field.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      status.textContent = 'Please fill in every field with valid details.';
      status.classList.add('error');
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var body = data.get('message') + '\n\nFrom: ' + data.get('name') + ' (' + data.get('email') + ')';
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(data.get('subject')) +
      '&body=' + encodeURIComponent(body);

    status.classList.remove('error');
    status.textContent = 'Your email app should open with the message ready. Press send there to deliver it.';
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
