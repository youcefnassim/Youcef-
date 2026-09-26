// main.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({left: `${posX}px`, top: `${posY}px`}, { duration: 500, fill: "forwards" });
        });
    }

    // --- 2. Scroll Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // --- 3. Theme Switcher ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const htmlEl = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set-theme');
            htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
        });
    });

    // --- 3b. Mobile Theme Switcher Toggle ---
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                themeSwitcher.classList.toggle('active-mobile');
            }
        });
    }

    // --- 4. Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter');
    const words = JSON.parse(typewriterElement.getAttribute('data-words'));
    let wordIndex = 0; let charIndex = 0; let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // --- 5. GitHub Contribution Graph Generator ---
    const githubGrid = document.getElementById('github-grid');
    if(githubGrid) {
        // Generate ~140 blocks (fake data for design purposes)
        for(let i=0; i<140; i++) {
            const block = document.createElement('div');
            block.classList.add('gh-box');
            // Randomly assign a level 0 to 4
            const randLevel = Math.floor(Math.random() * 100);
            let level = 0;
            if (randLevel > 50) level = 1;
            if (randLevel > 70) level = 2;
            if (randLevel > 85) level = 3;
            if (randLevel > 95) level = 4;
            
            block.classList.add(`level-${level}`);
            githubGrid.appendChild(block);
        }
    }

    // --- 6. Interactive Terminal ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    const commands = {
        'help': 'Commandes disponibles: whoami, skills, clear, email, github, linkedin',
        'whoami': 'BENMAAMAR YOUSSOUF NASSIM - Étudiant en Informatique passionné par le développement logiciel.',
        'skills': 'Python, C, Java, JavaScript, HTML5, CSS3, React, Angular, SQL, Git, Linux',
        'email': 'Contactez-moi à: youcefnassim60@gmail.com ou au +213-779-143-579',
        'github': 'Visitez mon GitHub: https://github.com/youcefnassim',
        'linkedin': 'Mon Profil LinkedIn: https://www.linkedin.com/in/ben-maamar-youssouf-nassim-791244219/',
        'clear': ''
    };

    if(terminalInput) {
        // Keeps focus purely on styling
        terminalBody.addEventListener('click', () => terminalInput.focus());
        
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim().toLowerCase();
                if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    this.value = '';
                    return;
                }
                
                let response = '';
                if (commands[cmd]) {
                    response = `<div class="response">${commands[cmd]}</div>`;
                } else if (cmd !== '') {
                    response = `<div class="error">Commande non trouvée: ${cmd}. Tapez 'help' pour voir la liste.</div>`;
                }

                if (cmd !== '') {
                    terminalOutput.innerHTML += `
                        <div class="line">
                            <span class="prompt">guest@youcef:~$</span>
                            <span class="command">${this.value}</span>
                        </div>
                        ${response}
                    `;
                }
                
                this.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll
            }
        });
    }

    // --- 7. Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const links = document.querySelectorAll('.nav-links li a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if(hamburger) hamburger.classList.remove('active');
            if(sidebar) sidebar.classList.remove('active');
        });
    });
    // --- 9. AI Chatbot Logic (Mock) ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputField = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('active'));
        chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('active'));

        const botKnowledge = {
            'salut': "Bonjour ! Je suis l'assistant de Nassim. Comment puis-je vous aider ?",
            'bonjour': "Bonjour ! Je suis l'assistant de Nassim. Comment puis-je vous aider ?",
            'compétence': "Nassim maîtrise Python, C, Java, JavaScript et le développement Web (React, Angular).",
            'competence': "Nassim maîtrise Python, C, Java, JavaScript et le développement Web (React, Angular).",
            'projet': "Nassim a réalisé plusieurs projets innovants comme 'DentaFlow' (gestion de clinique avec vidéo démo), 'Maklati' (restauration), et d'autres projets web visibles ci-dessus !",
            'contact': "Pour le contacter, envoyez-lui un email à youcefnassim60@gmail.com, appelez le +213-779-143-579 ou visitez son LinkedIn !",
            'embauche': "Oui, Nassim est actuellement à la recherche d'opportunités (stages, projets) ! Vous devriez lui envoyer un email.",
            'hire': "Oui, Nassim est à la recherche de nouveaux challenges ! Contactez-le via le formulaire ci-dessous.",
            'cv': "Vous pouvez télécharger le CV de Nassim directement dans l'accueil (bouton violet). Il contient son parcours complet !",
            'étude': "Nassim étudie actuellement à l'Université Oran 1. Il a aussi fréquenté l'école d'ingénieurs CESI Exia à Alger.",
            'etude': "Nassim étudie actuellement à l'Université Oran 1. Il a aussi fréquenté l'école d'ingénieurs CESI Exia à Alger.",
            'services': "Nassim propose la création de sites vitrines, de plateformes e-commerce et d'applications sur-mesure.",
            'default': "Ma capacité de compréhension s'arrête ici (je ne suis qu'un bot 🤖). Le mieux est d'envoyer un message via le formulaire de contact à Nassim !"
        };

        const addChatMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
            msgDiv.textContent = text;
            chatbotMessages.appendChild(msgDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        const handleChatSubmit = () => {
            const text = chatbotInputField.value.trim();
            if (!text) return;
            
            addChatMessage(text, 'user');
            chatbotInputField.value = '';

            // Simulate typing delay
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'bot-message');
            typingDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                chatbotMessages.removeChild(typingDiv);
                let reply = botKnowledge['default'];
                const lowerText = text.toLowerCase();
                
                for (let key in botKnowledge) {
                    if (lowerText.includes(key)) {
                        reply = botKnowledge[key];
                        break;
                    }
                }
                addChatMessage(reply, 'bot');
            }, 1200); // 1.2s of "typing"
        };

        chatbotSend.addEventListener('click', handleChatSubmit);
        chatbotInputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }

    // --- 9. Video Modal Logic ---
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video-player');
    const demoButtons = document.querySelectorAll('.btn-demo-video');
    const closeVideoButton = document.getElementById('video-modal-close');

    if (videoModal && demoButtons.length > 0) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = btn.getAttribute('data-video');
                if (videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.classList.add('active');
                    modalVideo.play();
                }
            });
        });

        const closeHandler = () => {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = "";
            modalVideo.load(); // Ensures video state is reset
        };

        if (closeVideoButton) closeVideoButton.addEventListener('click', closeHandler);
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeHandler();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) closeHandler();
        });
    }

    // --- 10. Project Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- 11. Back to Top Visibility ---
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // Scroll to top on logo click
    document.querySelectorAll('.logo').forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- 12. Stats Counter Animation ---
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50; 
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else { entry.target.innerText = target; }
                };
                updateCount();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));

    // --- 13. Accordion Toggle (Certificates) ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            // Close other accordions if desired:
            // document.querySelectorAll('.accordion-item').forEach(other => { if(other !== item) other.classList.remove('active'); });
        });
    });

    // --- 14. Testimonials Slider ---
    const track = document.querySelector('.testimonial-track');
    if (track) {
        let index = 0;
        const cards = document.querySelectorAll('.testimonial-card');
        setInterval(() => {
            index = (index + 1) % cards.length;
            const width = cards[0].offsetWidth + 30; // card width + gap
            track.style.transform = `translateX(-${index * width}px)`;
        }, 5000);
    }

    // --- 15. Case Study Logic ---
    const caseStudyData = {
        medstudent: {
            title: "Medstudent",
            problem: "La communauté médicale gérait ses ressources de manière fragmentée, sans plateforme centrale pour l'échange de documents et l'entraide entre étudiants.",
            solution: "Développement d'une plateforme web robuste permettant le partage de fichiers, la création de forums de discussion et la centralisation des actualités académiques.",
            tech: ["HTML5", "CSS3", "JavaScript", "Firebase", "UI/UX Design"]
        },
        gym131: {
            title: "Gym 131",
            problem: "Le client avait besoin d'une présence en ligne premium pour se démarquer de la concurrence locale et attirer une clientèle haut de gamme.",
            solution: "Conception d'un site vitrine hautement visuel avec des animations fluides, une présentation des équipements en haute résolution et un formulaire d'inscription direct.",
            tech: ["Modern CSS", "GSAP", "Vanilla JS", "Performance Optimization"]
        },
        coffee: {
            title: "Coffee Shop",
            problem: "Nécessité d'une interface utilisateur élégante pour refléter l'ambiance artisanale du café et faciliter la consultation du menu sur mobile.",
            solution: "Création d'une Single Page Application avec un focus sur l'esthétique 'Cozy', un menu interactif et un système de localisation intégré.",
            tech: ["CSS Grid", "Responsive Design", "Iconography", "Interactive UI"]
        },
        school: {
            title: "DNC School",
            problem: "Le manque d'outils numériques pour le suivi des notes et des absences compliquait la communication entre parents et enseignants.",
            solution: "Développement d'une application web temps réel avec Firebase, incluant des tableaux de bord personnalisés pour chaque type d'utilisateur.",
            tech: ["Firebase", "JavaScript ES6", "Cloud Firestore", "Security Rules"]
        },
        dentilus: {
            title: "Dentilus",
            problem: "Les cliniques dentaires avaient besoin d'une vitrine sobre et rassurante pour rassurer les patients potentiels sur la qualité des soins.",
            solution: "Design minimaliste et épuré mettant l'accent sur les témoignages, la présentation de l'équipe et la facilité de prise de contact.",
            tech: ["Animate.css", "Modern UI", "Content Strategy", "SEO"]
        },
        dentaflow: {
            title: "DentaFlow",
            problem: "La gestion papier des dossiers patients entraînait des ralentis administratifs et des risques de perte de données cruciales.",
            solution: "Architecture complète de gestion de cabinet avec base de données SQL, export de factures PDF et tableau de bord de statistiques financières.",
            tech: ["Node.js", "MySQL", "Chart.js", "PDF Generation", "Express"]
        }
    };

    const caseStudyModal = document.getElementById('case-study-modal');
    const caseStudyContent = document.getElementById('case-study-content');
    const caseStudyClose = document.getElementById('case-study-close');

    document.querySelectorAll('.case-study-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = caseStudyData[projectKey];
            if (data) {
                caseStudyContent.innerHTML = `
                    <div class="case-study-header">
                        <h2>${data.title}</h2>
                        <p>Étude de cas détaillée</p>
                    </div>
                    <div class="case-study-grid">
                        <div class="case-study-col">
                            <h4>Le Problème</h4>
                            <p>${data.problem}</p>
                        </div>
                        <div class="case-study-col">
                            <h4>La Solution</h4>
                            <p>${data.solution}</p>
                        </div>
                    </div>
                    <h4>Technologies Clés</h4>
                    <div class="case-study-tech">
                        ${data.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                `;
                caseStudyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (caseStudyClose) {
        caseStudyClose.addEventListener('click', () => {
            caseStudyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // --- 16. Smart Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        function validateInput(input) {
            const group = input.parentElement;
            let isValid = true;
            if (input.required && !input.value.trim()) isValid = false;
            if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) isValid = false;

            if (isValid) {
                group.classList.remove('error');
                group.classList.add('success');
            } else {
                group.classList.remove('success');
                group.classList.add('error');
            }
            return isValid;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formValid = true;
            inputs.forEach(input => { if (!validateInput(input)) formValid = false; });

            if (formValid) {
                showSuccessOverlay();
                contactForm.reset();
                inputs.forEach(input => input.parentElement.classList.remove('success'));
            }
        });
    }

    function showSuccessOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'form-success-overlay';
        overlay.innerHTML = `
            <div class="success-checkmark"><i class="fa-solid fa-circle-check"></i></div>
            <h2 class="success-title">Message Envoyé !</h2>
            <p>Merci Youssouf Nassim vous répondra bientôt.</p>
        `;
        document.body.appendChild(overlay);
        overlay.style.display = 'flex';
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease';
            setTimeout(() => overlay.remove(), 500);
        }, 3000);
    }
});
