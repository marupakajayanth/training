document.addEventListener('DOMContentLoaded', () => {
    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "Click the 'Forgot Password' link on the login page and follow the on-screen instructions. An email will be sent to you with a reset link."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers. More options may be available depending on your region."
        },
        {
            question: "Can I change my subscription plan?",
            answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings page. Changes will be prorated."
        },
        {
            question: "Where can I find my invoice history?",
            answer: "Your complete invoice history is available under the 'Billing' section of your account dashboard. You can view and download invoices as PDFs."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can contact our support team 24/7 via the 'Help' widget on our website or by emailing support@technova.com. We typically respond within a few hours."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes! Our mobile app is available for both iOS and Android. You can download it from the Apple App Store or Google Play Store to access your account on the go."
        }
    ];

    const accordionContainer = document.querySelector('.faq-accordion');
    const searchBar = document.getElementById('search-bar');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');

    const renderFAQs = (items) => {
        accordionContainer.innerHTML = '';
        items.forEach((faq, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    ${faq.question}
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            `;
            accordionContainer.appendChild(faqItem);
        });
        attachEventListeners();
    };
    
    const openFAQ = (item) => {
        const answer = item.querySelector('.faq-answer');
        item.classList.add('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        item.querySelector('.faq-icon').textContent = '×';
        // Set max-height to the content's exact scrollHeight for a perfect animation
        answer.style.maxHeight = answer.scrollHeight + 'px';
    };

    const closeFAQ = (item) => {
        const answer = item.querySelector('.faq-answer');
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-icon').textContent = '+';
        // Remove the inline style, reverting to the CSS max-height of 0
        answer.style.maxHeight = null;
    };

    const toggleFAQ = (item) => {
        const isExpanded = item.classList.contains('active');
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            if (activeItem !== item) {
                closeFAQ(activeItem);
            }
        });
        if (isExpanded) {
            closeFAQ(item);
        } else {
            openFAQ(item);
        }
    };

    const attachEventListeners = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            questionButton.addEventListener('click', () => toggleFAQ(item));
            questionButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(item);
                }
            });
        });
    };

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFaqs = faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm)
        );
        renderFAQs(filteredFaqs);
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    expandAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(item => {
            openFAQ(item);
        });
    });

    collapseAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(item => {
            closeFAQ(item);
        });
    });
    
    renderFAQs(faqs);
});