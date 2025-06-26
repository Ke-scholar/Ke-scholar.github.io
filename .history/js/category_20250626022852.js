document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category') || 'characters';
    
    // 获取分类信息
    const category = getCategoryById(categoryId);
    if (!category) {
        window.location.href = 'index.html';
        return;
    }
    
    // 设置标题和描述
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-desc').textContent = category.description;
    
    // 获取图片数据
    const galleryGrid = document.getElementById('category-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let visibleItems = 8;
    const allImages = getAllImagesByCategory(categoryId);
    
    // 渲染图片
    function renderImages() {
        galleryGrid.innerHTML = '';
        
        const imagesToShow = allImages.slice(0, visibleItems);
        
        if (imagesToShow.length === 0) {
            galleryGrid.innerHTML = `<div class="no-results">该分类下暂无图片，请返回首页选择其他分类。</div>`;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        imagesToShow.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            // 添加动画延迟
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <img src="${image.imgPath}" alt="${image.title}" class="gallery-img">
                <div class="item-overlay">
                    <div class="item-title">${image.title}</div>
                </div>
                <div class="item-info">
                    <h3>${image.author}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // 显示/隐藏加载更多按钮
        loadMoreBtn.style.display = allImages.length > visibleItems ? 'block' : 'none';
    }
    
    // 初始化渲染
    renderImages();
    
    // 加载更多功能
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 8;
        renderImages();
    });
    
    // ============ 灯箱功能开始 ============ //
    let currentImageIndex = 0;
    
    // 显示灯箱
    function showLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        const image = allImages[index];
        lightboxImg.src = image.imgPath;
        lightboxCaption.textContent = image.title;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        currentImageIndex = index;
    }
    
    // 关闭灯箱
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }
    
    // 导航到下一张图片
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        showLightbox(currentImageIndex);
    }
    
    // 导航到上一张图片
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        showLightbox(currentImageIndex);
    }
    
    // 初始化灯箱事件
    function initLightbox() {
        // 关闭灯箱
        document.querySelector('.close-btn').addEventListener('click', closeLightbox);
        
        // 点击背景关闭灯箱
        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // 添加导航按钮
        const lightboxNav = document.createElement('div');
        lightboxNav.className = 'lightbox-nav';
        lightboxNav.innerHTML = `
            <div class="nav-btn prev-btn">&#10094;</div>
            <div class="nav-btn next-btn">&#10095;</div>
        `;
        document.getElementById('lightbox').appendChild(lightboxNav);
        
        // 添加导航事件
        document.querySelector('.prev-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            prevImage();
        });
        
        document.querySelector('.next-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            nextImage();
        });
        
        // 键盘导航支持
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('lightbox').style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            }
        });
    }
    
    // 初始化灯箱
    initLightbox();
    
    // 为图片添加点击事件
    galleryGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-img')) {
            const galleryItem = e.target.closest('.gallery-item');
            const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
            const index = items.indexOf(galleryItem);
            
            if (index !== -1) {
                showLightbox(index);
            }
        }
    });
    // ============ 灯箱功能结束 ============ //
});