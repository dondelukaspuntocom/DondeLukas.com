// Validación y manejo del formulario de notificación
function handleNotify() {
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
    const notifyBtn = document.getElementById('notifyBtn');

    const email = emailInput.value.trim();

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert('Por favor, ingresa tu correo electrónico');
        emailInput.focus();
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        emailInput.focus();
        return;
    }

    // Simular envío (aquí puedes integrar con tu backend o servicio de email)
    notifyBtn.disabled = true;
    notifyBtn.textContent = 'Enviando...';

    // Simular delay de envío
    setTimeout(() => {
        // Guardar en localStorage por ahora
        saveEmail(email);

        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        emailInput.value = '';
        notifyBtn.textContent = 'Notifícame';
        notifyBtn.disabled = false;

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        // Log para desarrollo (puedes remover esto en producción)
        console.log('Email registrado:', email);
    }, 1000);
}

// Guardar email en localStorage
function saveEmail(email) {
    let emails = JSON.parse(localStorage.getItem('notifyEmails') || '[]');

    if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('notifyEmails', JSON.stringify(emails));
    }
}

// Permitir enviar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailInput');

    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleNotify();
            }
        });
    }

    // Animación de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observar elementos que queremos animar
    document.querySelectorAll('.description, .notify-section, .social-links').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Actualizar año en el footer automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText && footerText.textContent.includes('2025')) {
        footerText.textContent = footerText.textContent.replace('2025', currentYear);
    }
});
