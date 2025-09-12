let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

document.addEventListener("DOMContentLoaded", function() {
    updateCartBadge();
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("loginPassword");
    const toggleIcon = document.getElementById("toggleIcon");

    if (togglePassword && passwordInput && toggleIcon) {
        togglePassword.addEventListener("click", function() {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            toggleIcon.classList.toggle("bi-eye");
            toggleIcon.classList.toggle("bi-eye-slash");
        });
    }
});

function updateCartBadge() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartItems.length;
    }
}

function handleAddClick(button) {
    alert("Item added to cart!");

    const card = button.closest('.card');
    card.classList.add('added-to-cart');

    const itemName = card.querySelector('.card-title').textContent;
    const priceText = card.querySelector('p').textContent;
    const itemPrice = parseInt(priceText.replace(/[^\d]/g, ''));

    const existing = cartItems.find(item => item.name === itemName);
    if (!existing) {
        cartItems.push({
            name: itemName,
            price: itemPrice
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to localStorage
        updateCartBadge();
    }
}

function showCartModal() {
    const modalBody = document.getElementById('cart-modal-body');
    const totalPriceEl = document.getElementById('cart-total');
    modalBody.innerHTML = '';

    if (cartItems.length === 0) {
        modalBody.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceEl.textContent = '';
    } else {
        let total = 0;
        cartItems.forEach((item, index) => {
            modalBody.innerHTML += `<p><strong>${index + 1}.</strong> ${item.name} - ₹${item.price}</p>`;
            total += item.price;
        });
        totalPriceEl.textContent = 'Total: ₹' + total;
    }

    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function handleOrderClick() {
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const alertBox = document.getElementById('order-success-alert');
    if (alertBox) {
        alertBox.classList.remove('d-none');
    }

    // Clear cart
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartBadge();

    // Update UI
    const modalBody = document.getElementById('cart-modal-body');
    const totalPriceEl = document.getElementById('cart-total');
    modalBody.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceEl.textContent = '';

    // Hide modal
    setTimeout(() => {
        const cartModalEl = document.getElementById('cartModal');
        const cartModal = bootstrap.Modal.getInstance(cartModalEl);
        if (cartModal) cartModal.hide();
    }, 1000);

    // Hide alert
    setTimeout(() => {
        hideOrderAlert();
    }, 3000);
}

function hideOrderAlert() {
    const alertBox = document.getElementById('order-success-alert');
    if (alertBox) {
        alertBox.classList.add('d-none');
    }
}

function scrollImages(direction) {
    const container = document.getElementById("imageCarousel");
    if (container) {
        const scrollAmount = 200;
        container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}

//menu


function toggleMenu() {
    const menuSection = document.getElementById("menu");
    if (menuSection.style.display === "none" || menuSection.style.display === "") {
        menuSection.style.display = "block";
        menuSection.scrollIntoView({ behavior: "smooth" });
    } else {
        menuSection.style.display = "none";
    }
}