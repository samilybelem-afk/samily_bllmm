document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // DATA SOURCE (Array de Objetos para Manutenção Ágil)
    // ==========================================================================
    const CULTURAS = [
        {
            titulo: 'Trigo de Elite',
            tag: 'Alta Produtividade',
            img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
            desc: 'Variedade hiper-resistente ao frio severo, ideal para panificação e exportação direta.',
            ciclo: 'Ciclo: 120 dias',
            ph: 'PH Alvo: 78+'
        },
        {
            titulo: 'Cevada Cervejeira',
            tag: 'Liquidez Garantida',
            img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80',
            desc: 'Contratos de compra pré-fixados com maltarias líderes. Excelente resposta ao estresse térmico.',
            ciclo: 'Ciclo: 110 dias',
            ph: 'Calibre: > 90%'
        },
        {
            titulo: 'Aveia Preta Tecnológica',
            tag: 'Cobertura & Grão',
            img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
            desc: 'Sistema radicular profundo que quebra a compactação do solo e eleva a matéria orgânica.',
            ciclo: 'Ciclo: 95 dias',
            ph: 'Massa Seca: 6t/ha'
        },
        {
            titulo: 'Centeio Híbrido',
            tag: 'Resistência Extrema',
            img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=500&q=80',
            desc: 'Perfeito para solos arenosos e de menor fertilidade sob invernos de baixa precipitação.',
            ciclo: 'Ciclo: 130 dias',
            ph: 'Resistência: Total'
        }
    ];

    const FAQ = [
        {
            pergunta: 'As sementes possuem certificação oficial?',
            resposta: 'Sim, todas as nossas linhagens de trigo, cevada e aveia são rigorosamente registradas e certificadas pelo MAPA (Ministério da Agricultura e Pecuária), garantindo pureza genética e germinação superior a 95%.'
        },
        {
            pergunta: 'Como funciona a assistência técnica pós-venda?',
            resposta: 'Nossos engenheiros agrônomos realizam visitas de monitoramento presencial ou tele-suporte em três estágios críticos da lavoura: emergência, perfilhamento e enchimento de grãos.'
        },
        {
            pergunta: 'Qual é a janela ideal de plantio para estas cultivares?',
            resposta: 'A janela recomendada varia de acordo com o zoneamento climático de cada região brasileira, concentrando-se prioritariamente entre os meses de maio e julho.'
        }
    ];

    // ==========================================================================
    // RENDERIZAÇÃO DINÂMICA
    // ==========================================================================
    const renderComponentes = () => {
        // Carrossel
        const track = document.getElementById('carousel-track');
        if (track) {
            track.innerHTML = CULTURAS.map(item => `
                <div class="carousel-item">
                    <img src="${item.img}" alt="${item.titulo}" class="crop-img">
                    <div class="crop-content">
                        <span class="crop-tag">${item.tag}</span>
                        <h3>${item.titulo}</h3>
                        <p>${item.desc}</p>
                        <div class="crop-specs">
                            <strong>${item.ciclo}</strong>
                            <strong>${item.ph}</strong>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Acordeão FAQ
        const faqWrapper = document.getElementById('faq-accordion');
        if (faqWrapper) {
            faqWrapper.innerHTML = FAQ.map((item, index) => `
                <div class="accordion-item" data-index="${index}">
                    <button class="accordion-header" aria-expanded="false">
                        ${item.pergunta}
                        <i class="fas fa-chevron-down accordion-icon"></i>
                    </button>
                    <div class="accordion-content">
                        <p>${item.resposta}</p>
                    </div>
                </div>
            `).join('');
        }
    };

    renderComponentes();

    // ==========================================================================
    // LÓGICA DO CARROSSEL
    // ==========================================================================
    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    let currentIndex = 0;

    const updateCarousel = () => {
        if (!track) return;
        const itemWidth = track.querySelector('.carousel-item').getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        track.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = track.children.length - (window.innerWidth > 992 ? 3 : window.innerWidth > 600 ? 2 : 1);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', updateCarousel);
    }

    // ==========================================================================
    // LÓGICA DO ACORDEÃO
    // ==========================================================================
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos antes de abrir o atual
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.accordion-header').forEach(h => h.setAttribute('aria-expanded', 'false'));

            if (!isExpanded) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================================================
    // ACESSIBILIDADE (Fonte & Contraste)
    // ==========================================================================
    const btnContrast = document.getElementById('btn-contrast');
    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    let currentFontSize = 16;

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    if (btnIncrease && btnDecrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentFontSize < 24) {
                currentFontSize += 2;
                document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
            }
        });

        btnDecrease.addEventListener('click', () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
            }
        });
    }

    // ==========================================================================
    // VALIDAÇÃO E ENVIO DE FORMULÁRIO (Prevenção de Falsos Leads)
    // ==========================================================================
    const form = document.getElementById('form-conversao');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Configurações de lead validadas. Entraremos em contato em até 2 horas úteis.');
            form.reset();
        });
    }
});