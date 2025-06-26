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