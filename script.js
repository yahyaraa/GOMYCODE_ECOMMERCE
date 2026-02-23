// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- PRODUCT DATA ----------
    const products = [
        { 
            name: 'cotton loop tee', 
            category: 't-shirts', 
            price: 39, 
            bg: '#c9c1b5',
            icon: 'fa-solid fa-shirt'
        },
        { 
            name: 'wool overshirt', 
            category: 'shirts', 
            price: 89, 
            bg: '#5e5b56',
            icon: 'fa-solid fa-vest'
        },
        { 
            name: 'cargo pant', 
            category: 'bottoms', 
            price: 79, 
            bg: '#4f4a45',
            icon: 'fa-solid fa-vest' // placeholder
        },
        { 
            name: 'leather sneaker', 
            category: 'footwear', 
            price: 129, 
            bg: '#94908b',
            icon: 'fa-solid fa-shoe-prints'
        },
        { 
            name: 'merino beanie', 
            category: 'accessories', 
            price: 34, 
            bg: '#736b63',
            icon: 'fa-solid fa-hat-cowboy'
        },
        { 
            name: 'linen shirt', 
            category: 'shirts', 
            price: 69, 
            bg: '#b7aa9c',
            icon: 'fa-solid fa-shirt'
        }
    ];

    // ---------- RENDER PRODUCTS ----------
    const productGrid = document.getElementById('productGrid');
    
    if (productGrid) {
        productGrid.innerHTML = ''; // Clear any existing content
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-img" style="background-color: ${product.bg}; background-image: linear-gradient(45deg, ${product.bg}, ${adjustBrightness(product.bg, 20)})">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="product-category">${product.category}</div>
                    <div class="price">$${product.price}</div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
    }

    // Helper function to adjust color brightness (simple version)
    function adjustBrightness(hex, percent) {
        // This is a simplified version - in production you'd want proper color manipulation
        return hex; // Keep original for demo
    }

    // ---------- NEWSLETTER FORM HANDLING ----------
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                formMessage.textContent = '✓ Thanks for subscribing! Check your inbox.';
                formMessage.style.color = '#4CAF50';
                emailInput.value = '';
                
                // Optional: Add animation or tracking here
                console.log('Newsletter subscription:', email);
            } else {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#ff6b6b';
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ---------- CART/HEART INTERACTIONS ----------
    const navIcons = document.querySelectorAll('.nav-icons i');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Add active state or animation
            this.style.color = '#000';
            setTimeout(() => {
                this.style.color = '';
            }, 200);
            
            // Specific actions based on icon
            if (this.classList.contains('fa-heart')) {
                showTemporaryMessage('❤️ Added to wishlist!');
            } else if (this.classList.contains('fa-user')) {
                showTemporaryMessage('👤 Account page (demo)');
            } else if (this.classList.contains('fa-bookmark')) {
                showTemporaryMessage('🔖 Saved items (demo)');
            }
        });
    });

    // ---------- CATEGORY CARD CLICKS ----------
    const categoryCards = document.querySelectorAll('.cat-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            showTemporaryMessage(`🔍 Browsing ${category} category`);
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ---------- PRODUCT CARD QUICK ADD ----------
    // Using event delegation for dynamic product cards
    if (productGrid) {
        productGrid.addEventListener('click', function(e) {
            // Check if clicked on plus icon or product card
            if (e.target.classList.contains('fa-plus') || e.target.closest('.product-card')) {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const productName = productCard.querySelector('h4').textContent;
                    const productPrice = productCard.querySelector('.price').textContent;
                    
                    showTemporaryMessage(`✨ Added ${productName} (${productPrice}) to cart!`);
                    
                    // Animation for the plus icon
                    if (e.target.classList.contains('fa-plus')) {
                        e.target.style.transform = 'scale(1.3)';
                        setTimeout(() => {
                            e.target.style.transform = '';
                        }, 200);
                    }
                }
            }
        });
    }

    // ---------- SOCIAL ICON INTERACTIONS ----------
    const socialIcons = document.querySelectorAll('.social-icons i');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.classList[1].replace('fa-', '').replace('x-twitter', 'X');
            showTemporaryMessage(`📱 Follow us on ${platform} (demo)`);
        });
    });

    // ---------- HELPER FUNCTION FOR TEMPORARY MESSAGES ----------
    function showTemporaryMessage(message) {
        // Create temporary message element
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        msgDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #1e1e1e;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(msgDiv);
        
        // Remove after 2 seconds
        setTimeout(() => {
            msgDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(msgDiv);
            }, 300);
        }, 2000);
    }

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
        }
    `;
    document.head.appendChild(style);

    // ---------- SCROLL ANIMATION FOR HEADER ----------
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past 100px
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ---------- PRODUCT IMAGE HOVER EFFECT ----------
    // Add subtle mouse movement effect on hero image
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroImage.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }

    console.log('MODA website initialized successfully ✨');
});