// 1. قاعدة بيانات وهمية للمنتجات (يمكنك تعديل هذه البيانات بسهولة)
const products = [
    {
        id: 1,
        name: "بكج حماية شامل للايفون (كفر + زجاج + كاميرا) ضمان سنة",
        oldPrice: 159.00,
        newPrice: 89.00,
        discount: 44,
        image: "fa-shield-alt",
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: "ساعة ذكية Huawei Watch Fit 5 Pro - شاشة أموليد",
        oldPrice: 999.00,
        newPrice: 849.00,
        discount: 15,
        image: "fa-clock",
        rating: 4.9,
        reviews: 56
    },
    {
        id: 3,
        name: "كفر حماية شفاف مغناطيسي (MagSafe) مقاوم للاصفرار",
        oldPrice: 79.00,
        newPrice: 29.00,
        discount: 63,
        image: "fa-mobile-alt",
        rating: 4.5,
        reviews: 89
    },
    {
        id: 4,
        name: "سماعة بلوتوث لاسلكية مقاومة للماء مع ميكروفون مدمج",
        oldPrice: 199.00,
        newPrice: 149.00,
        discount: 25,
        image: "fa-headphones",
        rating: 4.7,
        reviews: 210
    },
    {
        id: 5,
        name: "شاحن جداري سريع 65 واط مع كيبل Type-C أصلي",
        oldPrice: 120.00,
        newPrice: 75.00,
        discount: 37,
        image: "fa-plug",
        rating: 4.6,
        reviews: 45
    },
    {
        id: 6,
        name: "حماية شاشة زجاج مقوى 9H خصوصية (Privacy) لجميع الموديلات",
        oldPrice: 49.00,
        newPrice: 19.00,
        discount: 61,
        image: "fa-eye-slash",
        rating: 4.4,
        reviews: 312
    }
];

// 2. متغيرات السلة
let cartCount = 0;

// 3. دالة لعرض المنتجات في الصفحة
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = ''; // مسح المحتوى الحالي

    products.forEach(product => {
        const productCard = `
            <div class="product-card bg-white rounded-xl border border-gray-100 relative group overflow-hidden">
                <!-- شارة الخصم -->
                <span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    خصم ${product.discount}%
                </span>
                
                <!-- أيقونة المفضلة -->
                <button class="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:shadow-md transition z-10">
                    <i class="far fa-heart"></i>
                </button>

                <!-- صورة المنتج (نستخدم أيقونة كبديل مؤقت) -->
                <div class="h-48 bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition">
                    <i class="fas ${product.image} text-6xl text-gray-300 group-hover:text-primary transition duration-300"></i>
                </div>

                <!-- تفاصيل المنتج -->
                <div class="p-4">
                    <h4 class="text-sm font-bold text-gray-800 mb-2 line-clamp-2 h-10 leading-relaxed">${product.name}</h4>
                    
                    <!-- التقييم -->
                    <div class="flex items-center gap-1 mb-3 text-yellow-400 text-xs">
                        ${getStars(product.rating)}
                        <span class="text-gray-400 mr-1">(${product.reviews})</span>
                    </div>

                    <!-- السعر -->
                    <div class="flex items-end gap-2 mb-4">
                        <span class="text-accent font-extrabold text-lg">${product.newPrice} ر.س</span>
                        <span class="text-gray-400 text-sm line-through mb-1">${product.oldPrice} ر.س</span>
                    </div>

                    <!-- زر الإضافة للسلة -->
                    <button onclick="addToCart(${product.id})" class="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 active:scale-95">
                        <i class="fas fa-cart-plus"></i> أضف للسلة
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}

// دالة مساعدة لرسم النجوم
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) stars += '<i class="fas fa-star"></i>';
        else if (i - 0.5 <= rating) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star text-gray-300"></i>';
    }
    return stars;
}

// 4. دالة إضافة منتج للسلة
function addToCart(productId) {
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    
    // تأثير حركي للزر
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
    btn.classList.add('bg-green-600');
    btn.classList.remove('bg-primary');
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('bg-green-600');
        btn.classList.add('bg-primary');
    }, 1500);

    // إظهار إشعار النجاح (Toast)
    showToast();
}

// 5. دالة إظهار الإشعار
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderProducts);

// ميزة بحث بسيطة (تصفية المنتجات)
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h4').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
