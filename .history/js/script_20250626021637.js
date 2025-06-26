document.addEventListener('DOMContentLoaded', function() {
    const categoriesGrid = document.querySelector('.categories-grid');
    const categories = getAllCategories();
    
    // 渲染分类卡片
    categories.forEach((category, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.category = category.id;
        
        // 添加动画延迟
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        
        categoryCard.innerHTML = `
            <img src="${category.coverImg}" alt="${category.name}" class="category-img">
            <div class="category-overlay">
                <div class="category-title">${category.name}</div>
                <div class="category-count">${category.totalImages}张图片</div>
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        `;
        
        // 添加点击事件
        categoryCard.addEventListener('click', () => {
            window.location.href = `category.html?category=${category.id}`;
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
});
// 灯箱功能
function showLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption || '';
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 关闭灯箱
document.querySelector('.close-btn').addEventListener('click', closeLightbox);

// 点击背景关闭灯箱
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// 为分类封面图添加点击事件
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('category-img')) {
        const categoryCard = e.target.closest('.category-card');
        const categoryName = categoryCard.querySelector('.category-title').textContent;
        showLightbox(e.target.src, categoryName);
    }
});