/*
 * STYLEPOLO - Tienda Virtual de Polos
 * Archivo JavaScript principal con toda la lógica de la aplicación
 * Desarrollado por: [Tu Nombre]
 * Fecha: 2024
 * 
 * Este archivo contiene toda la lógica de la aplicación:
 * - Gestión del carrito de compras
 * - Sistema de autenticación y registro
 * - Renderizado de productos
 * - Notificaciones
 * - Persistencia de datos
 */

// Variables globales
let products = [];
let cart = [];
let currentUser = null;
let users = [];

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos directamente si no hay servidor
    loadProductsDirect();
    loadUsers();
    loadCart();
    updateUserStatus();
    initializeForms();
});

/**
 * Cargar productos directamente (sin servidor)
 */
function loadProductsDirect() {
    console.log('Cargando productos directamente...');
    
    // Productos cargados directamente en el código
    products = [
        {
            id: 1,
            name: "Polo Clásico Azul Marino",
            price: 89.90,
            description: "Polo clásico de algodón 100% premium, perfecto para uso diario. Cuello redondo y manga corta con acabado suave y transpirable.",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
            category: "clásico",
            stock: 15
        },
        {
            id: 2,
            name: "Polo Deportivo Performance",
            price: 129.90,
            description: "Polo deportivo de alto rendimiento con tecnología de secado rápido. Ideal para entrenamientos y actividades físicas intensas.",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
            category: "deportivo",
            stock: 12
        },
        {
            id: 3,
            name: "Polo Casual Blanco Premium",
            price: 99.90,
            description: "Polo casual blanco de algodón orgánico. Diseño minimalista perfecto para cualquier ocasión casual o elegante.",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
            category: "casual",
            stock: 20
        },
        {
            id: 4,
            name: "Polo Elegante Negro",
            price: 149.90,
            description: "Polo elegante negro con acabado premium. Perfecto para eventos formales y ocasiones especiales. Material de alta calidad.",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
            category: "elegante",
            stock: 8
        },
        {
            id: 5,
            name: "Polo Estampado Tropical",
            price: 119.90,
            description: "Polo con estampado tropical vibrante. Diseño único y llamativo perfecto para el verano y días soleados.",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&sat=50",
            category: "estampado",
            stock: 10
        },
        {
            id: 6,
            name: "Polo Rayas Marinas",
            price: 109.90,
            description: "Polo con rayas marinas clásicas. Diseño atemporal que nunca pasa de moda. Perfecto para uso casual y elegante.",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&sat=30",
            category: "rayas",
            stock: 18
        },
        {
            id: 7,
            name: "Polo Técnico Running",
            price: 159.90,
            description: "Polo técnico especializado para running. Material ultraligero con tecnología anti-humedad y ventilación avanzada.",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop&sat=40",
            category: "deportivo",
            stock: 14
        },
        {
            id: 8,
            name: "Polo Vintage Retro",
            price: 139.90,
            description: "Polo con diseño vintage retro inspirado en los años 80. Colores vibrantes y estilo único para los amantes de la moda retro.",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&sat=60",
            category: "vintage",
            stock: 6
        },
        {
            id: 9,
            name: "Polo Slim Fit Gris",
            price: 129.90,
            description: "Polo slim fit en gris elegante. Corte moderno que se adapta perfectamente al cuerpo. Ideal para looks contemporáneos.",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&sat=20",
            category: "slim",
            stock: 16
        },
        {
            id: 10,
            name: "Polo Colección Verano",
            price: 169.90,
            description: "Polo de la colección verano con colores vibrantes y diseño fresco. Material ligero y transpirable para los días calurosos.",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&sat=70",
            category: "verano",
            stock: 22
        },
        {
            id: 11,
            name: "Polo Premium Algodón",
            price: 189.90,
            description: "Polo premium de algodón egipcio de la más alta calidad. Suavidad excepcional y durabilidad superior.",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&sat=25",
            category: "premium",
            stock: 4
        },
        {
            id: 12,
            name: "Polo Edición Limitada",
            price: 249.90,
            description: "Polo de edición limitada con diseño exclusivo. Solo 50 unidades disponibles. Material premium y acabado artesanal.",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop&sat=80",
            category: "limitada",
            stock: 3
        }
    ];
    
    console.log('Productos cargados:', products.length);
    renderProducts();
    showToast(`Catálogo cargado: ${products.length} productos`, 'success');
}

/**
 * Cargar productos desde JSON (para cuando hay servidor)
 */
function loadProducts() {
    console.log('Iniciando carga de productos desde JSON...');
    
    fetch('products.json')
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            
            // Manejar diferentes estructuras de datos
            if (data.products) {
                products = data.products;
            } else if (Array.isArray(data)) {
                products = data;
            } else {
                console.error('Estructura de datos inesperada:', data);
                showToast('Error en la estructura de datos', 'error');
                return;
            }
            
            console.log('Productos procesados:', products.length);
            renderProducts();
            
            if (products.length > 0) {
                showToast(`Catálogo cargado: ${products.length} productos`, 'success');
            }
        })
        .catch(error => {
            console.error('Error cargando productos:', error);
            showToast('Error cargando productos. Usando productos por defecto.', 'warning');
            loadProductsDirect(); // Usar productos por defecto
        });
}

/**
 * Cargar usuarios desde JSON
 */
function loadUsers() {
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            users = data.users || data;
            console.log('Usuarios cargados:', users.length);
        })
        .catch(error => {
            console.error('Error cargando usuarios:', error);
        });
}

/**
 * Cargar carrito desde localStorage
 */
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

/**
 * Guardar carrito en localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Actualizar estado del usuario
 */
function updateUserStatus() {
    const userStatus = document.getElementById('userStatus');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser) {
        userStatus.textContent = `Bienvenido, ${currentUser.name || currentUser.username}`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        userStatus.textContent = 'No has iniciado sesión';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

/**
 * Mostrar modal de login
 */
function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

/**
 * Mostrar modal de registro
 */
function showRegisterModal() {
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();
    registerModal.show();
}

/**
 * Función de login
 */
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (!username || !password) {
        loginError.textContent = 'Por favor completa todos los campos';
        loginError.style.display = 'block';
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserStatus();
        
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        showToast(`¡Bienvenido, ${user.name || user.username}!`, 'success');
        console.log('Usuario logueado:', user);
    } else {
        loginError.textContent = 'Usuario o contraseña incorrectos';
        loginError.style.display = 'block';
    }
}

/**
 * Función de registro
 */
function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    // Validaciones
    if (!name || !email || !username || !password || !confirmPassword) {
        registerError.textContent = 'Por favor completa todos los campos';
        registerError.style.display = 'block';
        registerSuccess.style.display = 'none';
        return;
    }

    if (password !== confirmPassword) {
        registerError.textContent = 'Las contraseñas no coinciden';
        registerError.style.display = 'block';
        registerSuccess.style.display = 'none';
        return;
    }

    if (password.length < 6) {
        registerError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        registerError.style.display = 'block';
        registerSuccess.style.display = 'none';
        return;
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
        registerError.textContent = 'El usuario o email ya existe';
        registerError.style.display = 'block';
        registerSuccess.style.display = 'none';
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password,
        name: name,
        email: email,
        role: 'customer'
    };

    users.push(newUser);
    
    // Simular guardado en JSON (en una app real se enviaría al servidor)
    console.log('Nuevo usuario registrado:', newUser);
    
    registerError.style.display = 'none';
    registerSuccess.textContent = '¡Cuenta creada exitosamente! Ya puedes iniciar sesión';
    registerSuccess.style.display = 'block';
    
    setTimeout(() => {
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();
        showLoginModal();
    }, 2000);
}

/**
 * Función de logout
 */
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserStatus();
    showToast('Sesión cerrada correctamente', 'success');
}

/**
 * Mostrar imagen ampliada en modal
 */
function showImageModal(imageUrl) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageUrl;
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

/**
 * Renderizar productos (actualizado para imagen clickeable)
 */
function renderProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Cargando productos...</p>
                </div>
            </div>
        `;
        return;
    }

    const productsHTML = products.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card ${product.stock === 0 ? 'product-out-of-stock' : ''}">
                <div class="product-image position-relative" style="cursor:zoom-in;" onclick="showImageModal('${product.image}')">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.stock === 0 ? '<div class="out-of-stock-badge">Agotado</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">S/ ${product.price.toFixed(2)}</div>
                    ${product.stock > 0 ? `
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-2"></i>Agregar al Carrito
                        </button>
                    ` : `
                        <button class="add-to-cart-btn" disabled>
                            <i class="fas fa-times me-2"></i>Agotado
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = productsHTML;
}

/**
 * Agregar producto al carrito
 */
function addToCart(productId) {
    if (!currentUser) {
        showToast('Debes iniciar sesión para agregar productos', 'warning');
        showLoginModal();
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} agregado al carrito`, 'success');
}

/**
 * Remover producto del carrito
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('Producto removido del carrito', 'info');
}

/**
 * Actualizar cantidad de producto
 */
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

/**
 * Actualizar interfaz del carrito
 */
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !cartCount || !cartTotal) return;

    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Renderizar items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
        cartTotal.textContent = '0.00';
    } else {
        const itemsHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>S/ ${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        cartItems.innerHTML = itemsHTML;

        // Calcular total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

/**
 * Alternar visibilidad del carrito
 */
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (!cartSidebar) return;
    cartSidebar.classList.toggle('cart-open');
    // Forzar repaint para navegadores antiguos
    cartSidebar.style.display = 'block';
    setTimeout(() => {
        if (!cartSidebar.classList.contains('cart-open')) {
            cartSidebar.style.display = '';
        }
    }, 500);
}

/**
 * Vaciar carrito
 */
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    showToast('Carrito vaciado', 'info');
}

/**
 * Proceso de checkout
 */
function checkout() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío', 'warning');
        return;
    }

    if (!currentUser) {
        showToast('Debes iniciar sesión para realizar la compra', 'warning');
        showLoginModal();
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    showToast('Procesando compra...', 'success');
    
    setTimeout(() => {
        showToast(`¡Compra exitosa! Total: S/ ${total.toFixed(2)}`, 'success');
        clearCart();
        toggleCart();
    }, 2000);
}

/**
 * Scroll suave a productos
 */
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Remover toast después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);

    console.log('Toast mostrado:', type, message);
}

/**
 * Inicializar formularios
 */
function initializeForms() {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

/**
 * Manejar formulario de contacto
 */
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    showToast('Enviando mensaje...', 'success');
    
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        console.log('Formulario de contacto enviado:', { name, email, subject, message });
    }, 2000);
}

/**
 * Manejar formulario de newsletter
 */
function handleNewsletterForm(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    showToast('Suscribiendo...', 'success');
    
    setTimeout(() => {
        event.target.reset();
        showToast('¡Te has suscrito exitosamente! Recibirás nuestras ofertas.', 'success');
        console.log('Newsletter suscrito:', email);
    }, 1500);
}

/**
 * Scroll suave a secciones
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Exportar funciones para uso global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.clearCart = clearCart;
window.checkout = checkout;
window.scrollToProducts = scrollToProducts;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.login = login;
window.register = register;
window.logout = logout;
window.scrollToSection = scrollToSection; 
window.showImageModal = showImageModal; 