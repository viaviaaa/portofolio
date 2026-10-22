document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-in');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
    });

    animatedElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 120}ms`;
        revealObserver.observe(element);
    });

    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    let toastTimeout;

    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('visible');
        window.clearTimeout(toastTimeout);
        toastTimeout = window.setTimeout(() => {
            toast.classList.remove('visible');
        }, 2200);
    };

    copyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const text = button.dataset.copy;
            if (!text) return;
            navigator.clipboard.writeText(text).then(() => {
                showToast('Email berhasil disalin!');
            }).catch(() => {
                showToast('Gagal menyalin. Coba lagi.');
            });
        });
    });

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const toggleScrollButton = () => {
        if (!scrollTopBtn) return;
        const show = window.scrollY > window.innerHeight / 2;
        scrollTopBtn.classList.toggle('visible', show);
    };

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton();
    }

    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach((card) => {
        const detailText = card.querySelector('.detail-text');
        if (!detailText) return;

        card.addEventListener('click', () => {
            const expanded = card.classList.toggle('expanded');
            if (expanded) {
                detailText.style.maxHeight = `${detailText.scrollHeight}px`;
                detailText.style.opacity = '1';
            } else {
                detailText.style.maxHeight = '0';
                detailText.style.opacity = '0';
            }
        });

        detailText.style.maxHeight = '0';
        detailText.style.opacity = '0';
    });
});
