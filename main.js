// Morwal Service Centre - Main JavaScript
// Interactive functionality for service booking and e-commerce

class MorwalServiceCentre {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('morwalCart')) || [];
        this.bookingData = {};
        this.init();
    }

    init() {
        this.initAnimations();
        this.initCart();
        this.initBooking();
        this.initServiceCalculator();
        this.initScrollEffects();
        this.updateCartDisplay();
    }

    // Animation Initialization
    initAnimations() {
        // Hero text typewriter effect
        if (document.querySelector('.hero-text')) {
            new Typed('.hero-text', {
                strings: [
                    'Expert Bike & Scooty Care',
                    'Reliable Service, Genuine Parts',
                    'Your Trusted Two-Wheeler Partner'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }

        // Service cards animation
        anime({
            targets: '.service-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuart'
        });

        // Statistics counter animation
        this.animateCounters();
    }

    // Shopping Cart Functionality
    initCart() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productData = {
                    id: e.target.dataset.productId,
                    name: e.target.dataset.productName,
                    price: parseFloat(e.target.dataset.productPrice),
                    image: e.target.dataset.productImage,
                    quantity: 1
                };
                this.addToCart(productData);
            });
        });

        // Cart toggle
        const cartToggle = document.querySelector('.cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                this.toggleCart();
            });
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(product);
        }
        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification(product.name);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('morwalCart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('.cart-total');
        const cartItems = document.querySelector('.cart-items');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;

        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div>
                            <h4 class="font-medium text-sm">${item.name}</h4>
                            <p class="text-orange-600 font-bold">₹${item.price}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="morwal.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">-</button>
                        <span class="w-8 text-center">${item.quantity}</span>
                        <button onclick="morwal.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    toggleCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('translate-x-full');
        }
    }

    showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
        notification.textContent = `${productName} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Booking System
    initBooking() {
        const bookingForm = document.querySelector('#booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission();
            });
        }

        // Vehicle type selection
        const vehicleTypeSelect = document.querySelector('#vehicle-type');
        if (vehicleTypeSelect) {
            vehicleTypeSelect.addEventListener('change', (e) => {
                this.updateBrandOptions(e.target.value);
            });
        }
    }

    handleBookingSubmission() {
        const formData = new FormData(document.querySelector('#booking-form'));
        this.bookingData = Object.fromEntries(formData);
        
        // WhatsApp integration
        const message = this.generateBookingMessage();
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        
        // Show confirmation modal
        this.showBookingConfirmation();
        
        // Redirect to WhatsApp after delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
    }

    generateBookingMessage() {
        return `New Service Booking:
        
Name: ${this.bookingData.name}
Contact: ${this.bookingData.contact}
Vehicle: ${this.bookingData.vehicleType}
Brand/Model: ${this.bookingData.brandModel}
Service: ${this.bookingData.service}
Date: ${this.bookingData.date}
Time: ${this.bookingData.time}

Additional Notes: ${this.bookingData.notes || 'None'}`;
    }

    showBookingConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white p-8 rounded-lg max-w-md mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Booking Submitted!</h3>
                    <p class="text-gray-600 mb-4">Redirecting to WhatsApp to confirm your appointment...</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.remove();
        }, 3000);
    }

    // Service Calculator
    initServiceCalculator() {
        const serviceSelect = document.querySelector('#service-select');
        const additionalServices = document.querySelectorAll('.additional-service');
        
        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => this.updateServiceCost());
        }
        
        additionalServices.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateServiceCost());
        });
    }

    updateServiceCost() {
        const baseService = document.querySelector('#service-select')?.value || 0;
        const additionalServices = document.querySelectorAll('.additional-service:checked');
        
        let totalCost = parseFloat(baseService);
        additionalServices.forEach(service => {
            totalCost += parseFloat(service.dataset.price);
        });
        
        const costDisplay = document.querySelector('#total-cost');
        if (costDisplay) {
            costDisplay.textContent = `₹${totalCost.toFixed(2)}`;
            
            // Animate the price change
            anime({
                targets: costDisplay,
                scale: [1, 1.1, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    }

    // Scroll Effects
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter Animation
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        });
    }

    // Product Filtering (for shop page)
    filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
                anime({
                    targets: product,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 300
                });
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Search functionality
    searchProducts(query) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            if (productName.includes(query.toLowerCase())) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// Initialize the application
let morwal;
document.addEventListener('DOMContentLoaded', () => {
    morwal = new MorwalServiceCentre();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Utility functions
function showComingSoon() {
    alert('Coming Soon! This feature is under development.');
}

function callNow() {
    window.location.href = 'tel:+919876543210';
}

function openWhatsApp() {
    window.open('https://wa.me/919876543210', '_blank');
}