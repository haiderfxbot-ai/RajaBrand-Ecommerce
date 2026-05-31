/* ============================================
   Raja Brand — Shared UI System
   Powered by assets/css/style.css
   ============================================ */

// ===== PROFESSIONAL TOAST SYSTEM =====
(function() {
  let toastContainer = null;
  function getContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      toastContainer.id = 'rajaToastContainer';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  window.RajaToast = {
    show: function(msg, type, duration) {
      type = type || 'info';
      duration = duration || 3000;
      const container = getContainer();
      const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
      };

      const el = document.createElement('div');
      el.className = 'toast-item ' + type;
      el.innerHTML = '<span class="material-symbols-rounded toast-icon">' + (icons[type] || 'info') + '</span>'
        + '<span class="toast-msg">' + msg + '</span>'
        + '<button class="toast-close material-symbols-rounded" onclick="this.parentElement.remove()">close</button>';
      container.appendChild(el);
      requestAnimationFrame(function() { el.classList.add('show'); });

      if (duration > 0) {
        setTimeout(function() {
          el.classList.remove('show');
          setTimeout(function() { if (el.parentElement) el.remove(); }, 350);
        }, duration);
      }
      return el;
    },
    success: function(msg, dur) { return this.show(msg, 'success', dur); },
    error: function(msg, dur) { return this.show(msg, 'error', dur || 4000); },
    warning: function(msg, dur) { return this.show(msg, 'warning', dur); },
    info: function(msg, dur) { return this.show(msg, 'info', dur); }
  };
})();

// ===== PROFESSIONAL MODAL SYSTEM =====
(function() {
  let modalOverlay = null;
  let modalResolve = null;
  let modalReject = null;

  function getOverlay() {
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.className = 'modal-overlay';
      modalOverlay.id = 'rajaModalOverlay';
      document.body.appendChild(modalOverlay);
    }
    return modalOverlay;
  }

  function closeModal() {
    const overlay = getOverlay();
    overlay.classList.remove('show');
    overlay.innerHTML = '';
    if (modalReject) modalReject(null);
    modalResolve = null;
    modalReject = null;
  }

  window.RajaModal = {
    alert: function(msg, title, type) {
      return new Promise(function(resolve) {
        type = type || 'info';
        title = title || getDefaultTitle(type);
        const overlay = getOverlay();
        const icons = {
          success: 'check_circle',
          error: 'error',
          warning: 'warning',
          info: 'info'
        };

        overlay.innerHTML = '<div class="modal-box modal-alert">'
          + '<div class="modal-icon ' + type + '"><span class="material-symbols-rounded">' + (icons[type] || 'info') + '</span></div>'
          + '<div class="modal-title">' + title + '</div>'
          + '<div class="modal-msg">' + msg + '</div>'
          + '<div class="modal-actions"><button class="btn-primary" id="rajaModalOk">OK</button></div>'
          + '</div>';
        overlay.classList.add('show');

        document.getElementById('rajaModalOk').onclick = function() {
          closeModal();
          resolve();
        };
        modalResolve = resolve;
      });
    },

    confirm: function(msg, title, confirmText, cancelText) {
      return new Promise(function(resolve) {
        title = title || 'Confirm';
        confirmText = confirmText || 'Yes';
        cancelText = cancelText || 'No';
        const overlay = getOverlay();

        overlay.innerHTML = '<div class="modal-box modal-confirm">'
          + '<div class="modal-icon warning"><span class="material-symbols-rounded">help</span></div>'
          + '<div class="modal-title">' + title + '</div>'
          + '<div class="modal-msg">' + msg + '</div>'
          + '<div class="modal-actions">'
          + '<button class="btn-secondary" id="rajaModalCancel">' + cancelText + '</button>'
          + '<button class="btn-primary" id="rajaModalConfirm">' + confirmText + '</button>'
          + '</div></div>';
        overlay.classList.add('show');

        document.getElementById('rajaModalConfirm').onclick = function() { closeModal(); resolve(true); };
        document.getElementById('rajaModalCancel').onclick = function() { closeModal(); resolve(false); };
        modalResolve = resolve;
      });
    },

    prompt: function(msg, defaultValue, title) {
      return new Promise(function(resolve) {
        title = title || 'Input Required';
        defaultValue = defaultValue || '';
        const overlay = getOverlay();

        overlay.innerHTML = '<div class="modal-box modal-prompt">'
          + '<div class="modal-icon info"><span class="material-symbols-rounded">edit</span></div>'
          + '<div class="modal-title">' + title + '</div>'
          + '<div class="modal-msg">' + msg + '</div>'
          + '<input type="text" class="modal-prompt-input" id="rajaModalPromptInput" value="' + escapeHtml(defaultValue) + '" placeholder="Enter value..." autofocus>'
          + '<div class="modal-actions">'
          + '<button class="btn-secondary" id="rajaModalCancel">Cancel</button>'
          + '<button class="btn-primary" id="rajaModalConfirm">OK</button>'
          + '</div></div>';
        overlay.classList.add('show');

        document.getElementById('rajaModalConfirm').onclick = function() {
          const val = document.getElementById('rajaModalPromptInput').value;
          closeModal();
          resolve(val);
        };
        document.getElementById('rajaModalCancel').onclick = function() { closeModal(); resolve(null); };
        document.getElementById('rajaModalPromptInput').onkeydown = function(e) {
          if (e.key === 'Enter') document.getElementById('rajaModalConfirm').click();
        };
        setTimeout(function() {
          const inp = document.getElementById('rajaModalPromptInput');
          if (inp) inp.focus();
        }, 100);
        modalResolve = resolve;
      });
    },

    close: function() {
      closeModal();
    }
  };

  function getDefaultTitle(type) {
    var map = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Notice' };
    return map[type] || 'Notice';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();

// ===== LOADING OVERLAY =====
(function() {
  let loadingOverlay = null;
  function getOverlay() {
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      loadingOverlay.id = 'rajaLoadingOverlay';
      loadingOverlay.innerHTML = '<div class="loading-spinner"></div><div class="loading-text">Loading...</div>';
      document.body.appendChild(loadingOverlay);
    }
    return loadingOverlay;
  }

  window.RajaLoading = {
    show: function(msg) {
      const overlay = getOverlay();
      overlay.querySelector('.loading-text').textContent = msg || 'Loading...';
      overlay.classList.add('show');
    },
    hide: function() {
      const overlay = getOverlay();
      overlay.classList.remove('show');
    }
  };
})();

// ===== BACKWARD COMPATIBILITY: Old showToast → new system =====
// Some pages still define their own showToast. We patch it here.
// The new RajaToast.show is the recommended approach.

// ===== SHARED UTILITY FUNCTIONS =====
function formatPrice(amount) {
  return 'Rs. ' + Number(amount || 0).toLocaleString('en-PK');
}

function getCurrentUser() {
  var data = localStorage.getItem('raja_current_user');
  return data ? JSON.parse(data) : null;
}

function goBack() {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

function authGuard(redirect) {
  redirect = redirect || 'login.html';
  var user = getCurrentUser();
  if (!user) {
    window.location.href = redirect + '?redirect=' + window.location.pathname.split('/').pop();
    return false;
  }
  return true;
}

function formatDate(d) {
  var date = new Date(d);
  return date.toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatDateShort(d) {
  var date = new Date(d);
  return date.toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function getCartCount() {
  var cart = JSON.parse(localStorage.getItem('raja_cart') || '[]');
  return cart.reduce(function(sum, item) { return sum + (item.quantity || 1); }, 0);
}

function updateCartBadge() {
  var count = getCartCount();
  var badges = document.querySelectorAll('.cart-badge');
  badges.forEach(function(badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

function goToProduct(id) {
  localStorage.setItem('raja_selected_product', id);
  window.location.href = 'product-detail.html?id=' + id;
}

function seedDataIfEmpty() {
  if (!localStorage.getItem('raja_products')) {
    var products = [
      { id: 'p1', name: 'Khaadi 3-Piece Unstitched Embroidered Suit', category: 'womens-fashion', price: 4500, originalPrice: 6500, rating: 4.5, reviews: 234, image: 'https://picsum.photos/seed/khaadi1/400/500', images: ['https://picsum.photos/seed/khaadi1/400/500', 'https://picsum.photos/seed/khaadi1a/400/500', 'https://picsum.photos/seed/khaadi1b/400/500'], isNew: true, isFlashSale: true, discount: 31, stock: 25, description: 'Premium unstitched 3-piece suit from Khaadi. Features intricate embroidery on fine fabric. Includes shirt, dupatta, and trouser. Perfect for casual and formal occasions.', brand: 'Khaadi', dateAdded: '2024-05-01' },
      { id: 'p2', name: 'Sapphire Lawn 2024 Printed Collection', category: 'womens-fashion', price: 3200, originalPrice: 4000, rating: 4.3, reviews: 189, image: 'https://picsum.photos/seed/sapphire1/400/500', images: ['https://picsum.photos/seed/sapphire1/400/500', 'https://picsum.photos/seed/sapphire1a/400/500'], isNew: true, isFlashSale: true, discount: 20, stock: 40, description: 'Beautiful printed lawn collection by Sapphire. Lightweight and breathable fabric, ideal for summer.', brand: 'Sapphire', dateAdded: '2024-05-10' },
      { id: 'p3', name: 'J. 2-Piece Pret Collection - Summer Bliss', category: 'womens-fashion', price: 5990, originalPrice: 7990, rating: 4.7, reviews: 312, image: 'https://picsum.photos/seed/jdot1/400/500', images: ['https://picsum.photos/seed/jdot1/400/500', 'https://picsum.photos/seed/jdot1a/400/500', 'https://picsum.photos/seed/jdot1b/400/500'], isNew: false, isFlashSale: false, discount: 25, stock: 15, description: 'Ready-to-wear 2-piece pret from J. Stitched with precision and style.', brand: 'J.', dateAdded: '2024-04-15' },
      { id: 'p4', name: 'Sana Safinaz Luxury Unstitched 3-Piece', category: 'womens-fashion', price: 6500, originalPrice: 8500, rating: 4.8, reviews: 156, image: 'https://picsum.photos/seed/sana1/400/500', images: ['https://picsum.photos/seed/sana1/400/500', 'https://picsum.photos/seed/sana1a/400/500'], isNew: true, isFlashSale: false, discount: 24, stock: 10, description: 'Luxury unstitched 3-piece by Sana Safinaz. Premium quality fabric with modern design.', brand: 'Sana Safinaz', dateAdded: '2024-05-20' },
      { id: 'p5', name: 'Maria B Stitched Premium Collection 2024', category: 'womens-fashion', price: 4990, originalPrice: 6990, rating: 4.4, reviews: 278, image: 'https://picsum.photos/seed/mariab1/400/500', images: ['https://picsum.photos/seed/mariab1/400/500'], isNew: false, isFlashSale: true, discount: 29, stock: 20, description: 'Stitched premium collection from Maria B. Elegant design for special occasions.', brand: 'Maria B', dateAdded: '2024-03-10' },
      { id: 'p6', name: 'Nishat Linen Winter Collection 2024', category: 'womens-fashion', price: 3800, originalPrice: 4800, rating: 4.2, reviews: 145, image: 'https://picsum.photos/seed/nishat1/400/500', images: ['https://picsum.photos/seed/nishat1/400/500'], isNew: false, isFlashSale: false, discount: 21, stock: 30, description: 'Winter collection from Nishat Linen. Warm and stylish fabric for the cold season.', brand: 'Nishat Linen', dateAdded: '2024-02-20' },
      { id: 'p7', name: 'Alkaram Studio Premium Unstitched', category: 'womens-fashion', price: 4200, originalPrice: 5200, rating: 4.1, reviews: 198, image: 'https://picsum.photos/seed/alkaram1/400/500', images: ['https://picsum.photos/seed/alkaram1/400/500', 'https://picsum.photos/seed/alkaram1a/400/500'], isNew: false, isFlashSale: true, discount: 19, stock: 35, description: 'Premium unstitched fabric from Alkaram Studio. High quality and comfortable.', brand: 'Alkaram Studio', dateAdded: '2024-04-01' },
      { id: 'p8', name: 'Gul Ahmed Printed Lawn Suit', category: 'womens-fashion', price: 3500, originalPrice: 4500, rating: 4.6, reviews: 423, image: 'https://picsum.photos/seed/gulahmed1/400/500', images: ['https://picsum.photos/seed/gulahmed1/400/500', 'https://picsum.photos/seed/gulahmed1a/400/500'], isNew: true, isFlashSale: false, discount: 22, stock: 50, description: 'Beautiful printed lawn suit by Gul Ahmed. A summer essential with vibrant prints.', brand: 'Gul Ahmed', dateAdded: '2024-05-15' },
      { id: 'p9', name: 'Bonanza Satrangi Kurta Shalwar Stitched', category: 'mens-fashion', price: 2990, originalPrice: 3990, rating: 4.3, reviews: 167, image: 'https://picsum.photos/seed/bonanza1/400/500', images: ['https://picsum.photos/seed/bonanza1/400/500'], isNew: false, isFlashSale: true, discount: 25, stock: 30, description: 'Stitched kurta shalwar from Bonanza Satrangi. Comfortable and stylish for daily wear.', brand: 'Bonanza Satrangi', dateAdded: '2024-04-10' },
      { id: 'p10', name: 'Outfitters Men\'s Premium T-Shirt', category: 'mens-fashion', price: 1499, originalPrice: 1999, rating: 4.0, reviews: 89, image: 'https://picsum.photos/seed/outfitters1/400/500', images: ['https://picsum.photos/seed/outfitters1/400/500'], isNew: true, isFlashSale: false, discount: 25, stock: 45, description: 'Premium quality t-shirt from Outfitters. Soft fabric with modern fit.', brand: 'Outfitters', dateAdded: '2024-05-18' },
      { id: 'p11', name: 'Junaid Jamshed Kurta Shalwar - Classic White', category: 'mens-fashion', price: 3490, originalPrice: 4490, rating: 4.6, reviews: 234, image: 'https://picsum.photos/seed/junaid1/400/500', images: ['https://picsum.photos/seed/junaid1/400/500'], isNew: false, isFlashSale: false, discount: 22, stock: 25, description: 'Classic white kurta shalwar from Junaid Jamshed. Premium fabric with elegant design.', brand: 'Junaid Jamshed', dateAdded: '2024-03-20' },
      { id: 'p12', name: 'Samsung Galaxy A14 128GB', category: 'electronics', price: 32999, originalPrice: 39999, rating: 4.4, reviews: 567, image: 'https://picsum.photos/seed/samsung1/400/500', images: ['https://picsum.photos/seed/samsung1/400/500', 'https://picsum.photos/seed/samsung1a/400/500'], isNew: false, isFlashSale: true, discount: 18, stock: 20, description: 'Samsung Galaxy A14 with 128GB storage. Features a 6.6" display and 50MP camera.', brand: 'Samsung', dateAdded: '2024-03-01' },
      { id: 'p13', name: 'Huawei Nova 12i 256GB', category: 'electronics', price: 45999, originalPrice: 52999, rating: 4.5, reviews: 345, image: 'https://picsum.photos/seed/huawei1/400/500', images: ['https://picsum.photos/seed/huawei1/400/500', 'https://picsum.photos/seed/huawei1a/400/500'], isNew: true, isFlashSale: false, discount: 13, stock: 15, description: 'Huawei Nova 12i with 256GB storage. 108MP camera and 40W fast charging.', brand: 'Huawei', dateAdded: '2024-05-05' },
      { id: 'p14', name: 'Dawlance Microwave Oven 28L', category: 'electronics', price: 18500, originalPrice: 22500, rating: 4.2, reviews: 189, image: 'https://picsum.photos/seed/dawlance1/400/500', images: ['https://picsum.photos/seed/dawlance1/400/500'], isNew: false, isFlashSale: true, discount: 18, stock: 12, description: 'Dawlance 28L microwave oven with multiple cooking modes and auto-defrost.', brand: 'Dawlance', dateAdded: '2024-02-15' },
      { id: 'p15', name: 'Servis Cheetah Men\'s Sports Shoes', category: 'footwear', price: 2299, originalPrice: 2999, rating: 4.3, reviews: 678, image: 'https://picsum.photos/seed/servis1/400/500', images: ['https://picsum.photos/seed/servis1/400/500', 'https://picsum.photos/seed/servis1a/400/500'], isNew: false, isFlashSale: true, discount: 23, stock: 50, description: 'Servis Cheetah sports shoes. Comfortable and durable for daily wear and sports.', brand: 'Servis', dateAdded: '2024-04-05' },
      { id: 'p16', name: 'Khadim\'s Women\'s Khussa - Gold Embroidered', category: 'footwear', price: 1899, originalPrice: 2499, rating: 4.4, reviews: 345, image: 'https://picsum.photos/seed/khadims1/400/500', images: ['https://picsum.photos/seed/khadims1/400/500'], isNew: true, isFlashSale: false, discount: 24, stock: 35, description: 'Beautiful gold embroidered khussa from Khadim\'s. Traditional design with modern comfort.', brand: 'Khadim\'s', dateAdded: '2024-05-12' },
      { id: 'p17', name: 'Borjan Women\'s Heels - Elegance Collection', category: 'footwear', price: 3499, originalPrice: 4499, rating: 4.1, reviews: 156, image: 'https://picsum.photos/seed/borjan1/400/500', images: ['https://picsum.photos/seed/borjan1/400/500'], isNew: false, isFlashSale: false, discount: 22, stock: 20, description: 'Elegant heels from Borjan. Perfect for parties and formal events.', brand: 'Borjan', dateAdded: '2024-03-25' },
      { id: 'p18', name: 'Metro Casual Shoes for Men', category: 'footwear', price: 2799, originalPrice: 3499, rating: 4.0, reviews: 234, image: 'https://picsum.photos/seed/metro1/400/500', images: ['https://picsum.photos/seed/metro1/400/500'], isNew: true, isFlashSale: true, discount: 20, stock: 40, description: 'Comfortable casual shoes from Metro. Lightweight and stylish for everyday use.', brand: 'Metro', dateAdded: '2024-05-08' },
      { id: 'p19', name: 'Kids Branded Kurta Shalwar Set - Blue', category: 'kids', price: 1299, originalPrice: 1799, rating: 4.5, reviews: 123, image: 'https://picsum.photos/seed/kids1/400/500', images: ['https://picsum.photos/seed/kids1/400/500'], isNew: false, isFlashSale: false, discount: 28, stock: 30, description: 'Colorful kurta shalwar set for kids. Comfortable fabric with beautiful design.', brand: 'Kids Collection', dateAdded: '2024-04-20' },
      { id: 'p20', name: 'Kids Winter Jacket - Hooded', category: 'kids', price: 1999, originalPrice: 2599, rating: 4.3, reviews: 89, image: 'https://picsum.photos/seed/kids2/400/500', images: ['https://picsum.photos/seed/kids2/400/500'], isNew: true, isFlashSale: false, discount: 23, stock: 20, description: 'Warm hooded winter jacket for kids. Soft inner lining and durable outer shell.', brand: 'Kids Collection', dateAdded: '2024-05-02' },
      { id: 'p21', name: 'PEL Air Conditioner 1.5 Ton Inverter', category: 'electronics', price: 84999, originalPrice: 94999, rating: 4.6, reviews: 234, image: 'https://picsum.photos/seed/pel1/400/500', images: ['https://picsum.photos/seed/pel1/400/500'], isNew: true, isFlashSale: false, discount: 11, stock: 8, description: 'PEL 1.5 ton inverter AC with energy-saving technology and smart cooling.', brand: 'PEL', dateAdded: '2024-05-25' },
      { id: 'p22', name: 'Haq & Sons Embroidered Waistcoat', category: 'mens-fashion', price: 2499, originalPrice: 3299, rating: 4.2, reviews: 112, image: 'https://picsum.photos/seed/haq1/400/500', images: ['https://picsum.photos/seed/haq1/400/500'], isNew: false, isFlashSale: true, discount: 24, stock: 18, description: 'Hand-embroidered waistcoat from Haq & Sons. Perfect for Eid and weddings.', brand: 'Haq & Sons', dateAdded: '2024-03-15' },
      { id: 'p23', name: 'KitchenAid Blender 1.5L', category: 'home-kitchen', price: 5499, originalPrice: 6999, rating: 4.4, reviews: 178, image: 'https://picsum.photos/seed/kitchen1/400/500', images: ['https://picsum.photos/seed/kitchen1/400/500'], isNew: false, isFlashSale: false, discount: 21, stock: 25, description: 'Powerful 1.5L blender from KitchenAid. Ideal for smoothies, shakes, and grinding.', brand: 'KitchenAid', dateAdded: '2024-04-10' },
      { id: 'p24', name: 'ChenOne 6-Piece Towel Set', category: 'home-kitchen', price: 2999, originalPrice: 3999, rating: 4.1, reviews: 234, image: 'https://picsum.photos/seed/chen1/400/500', images: ['https://picsum.photos/seed/chen1/400/500'], isNew: true, isFlashSale: true, discount: 25, stock: 40, description: 'Premium 6-piece towel set from ChenOne. Soft, absorbent, and long-lasting.', brand: 'ChenOne', dateAdded: '2024-05-22' }
    ];
    localStorage.setItem('raja_products', JSON.stringify(products));
    localStorage.setItem('raja_wishlist', JSON.stringify([]));
    localStorage.setItem('raja_cart', JSON.stringify([]));
  }
  if (!localStorage.getItem('raja_categories')) {
    var categories = [
      { id: 'womens-fashion', name: "Women's Fashion", icon: 'checkroom', count: 8 },
      { id: 'mens-fashion', name: "Men's Fashion", icon: 'hiking', count: 6 },
      { id: 'kids', name: 'Kids', icon: 'child_care', count: 4 },
      { id: 'footwear', name: 'Footwear', icon: 'footwear', count: 5 },
      { id: 'electronics', name: 'Electronics', icon: 'smartphone', count: 6 },
      { id: 'home-kitchen', name: 'Home & Kitchen', icon: 'kitchen', count: 4 },
      { id: 'beauty', name: 'Beauty', icon: 'spa', count: 3 },
      { id: 'books', name: 'Books & Stationery', icon: 'menu_book', count: 3 }
    ];
    localStorage.setItem('raja_categories', JSON.stringify(categories));
  }
  if (!localStorage.getItem('raja_users')) {
    var users = [
      { id: 'u1', name: 'Admin', email: 'admin@raja.pk', password: 'admin123', phone: '0300-1234567', role: 'admin', address: '12 Mall Road, Lahore', city: 'Lahore', province: 'Punjab' }
    ];
    localStorage.setItem('raja_users', JSON.stringify(users));
  }
  if (!localStorage.getItem('raja_coupons')) {
    var coupons = [
      { code: 'RAJA10', discount: 10, minAmount: 1000, maxUses: 100, used: 0 },
      { code: 'SAVE20', discount: 20, minAmount: 3000, maxUses: 50, used: 0 },
      { code: 'NEWUSER', discount: 15, minAmount: 500, maxUses: 200, used: 0 }
    ];
    localStorage.setItem('raja_coupons', JSON.stringify(coupons));
  }
  if (!localStorage.getItem('raja_orders')) {
    localStorage.setItem('raja_orders', JSON.stringify([]));
  }
  if (!localStorage.getItem('raja_notifications')) {
    localStorage.setItem('raja_notifications', JSON.stringify([]));
  }
}

// ===== PASSWORD STRENGTH CHECKER =====
function checkPasswordStrength(password, barId, textId) {
  var bar = document.getElementById(barId);
  var text = document.getElementById(textId);
  if (!bar || !text) return;
  var score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  bar.className = 'strength-bar';
  if (score === 0 || password.length === 0) {
    bar.style.width = '0'; text.textContent = '';
  } else if (score === 1) {
    bar.classList.add('weak'); text.textContent = 'Weak'; text.style.color = '#ef4444';
  } else if (score === 2) {
    bar.classList.add('fair'); text.textContent = 'Fair'; text.style.color = '#f97316';
  } else if (score === 3) {
    bar.classList.add('good'); text.textContent = 'Good'; text.style.color = '#eab308';
  } else {
    bar.classList.add('strong'); text.textContent = 'Strong'; text.style.color = '#16A34A';
  }
}

// ===== EYE TOGGLE (Password visibility) =====
function togglePassword(inputId, iconId) {
  var input = document.getElementById(inputId);
  var icon = document.getElementById(iconId);
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

// ===== TOGGLE SIDEBAR/DRAWER =====
function toggleDrawer(drawerId, overlayId) {
  var drawer = document.getElementById(drawerId || 'drawer');
  var overlay = document.getElementById(overlayId || 'drawerOverlay');
  if (!drawer || !overlay) return;
  var isOpen = drawer.classList.contains('open') || !drawer.classList.contains('-translate-x-full');
  if (isOpen) {
    drawer.classList.add('-translate-x-full');
    drawer.classList.remove('open');
    overlay.classList.add('hidden');
  } else {
    drawer.classList.remove('-translate-x-full');
    drawer.classList.add('open');
    overlay.classList.remove('hidden');
  }
}

// ===== ADMIN LOGOUT =====
function adminLogout() {
  localStorage.removeItem('raja_admin_session');
  window.location.href = 'login.html';
}

// ===== GET/SET LOCAL STORAGE HELPERS =====
function getLS(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
}
function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
