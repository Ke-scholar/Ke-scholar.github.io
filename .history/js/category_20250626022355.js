// 灯箱功能
let currentImageIndex = 0;
let currentCategoryImages = [];

function showLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    const image = currentCategoryImages[index];
    lightboxImg.src = image.imgPath;
    lightboxCaption.textContent = image.title;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    
    currentImageIndex = index;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 导航到下一张图片
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
    showLightbox(currentImageIndex);
}

// 导航到上一张图片
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
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

// 在DOM加载完成后初始化灯箱
document.addEventListener('DOMContentLoaded', function() {
    // 确保在渲染图片后调用
    setTimeout(initLightbox, 0);
    
    // 为分类图片添加点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-img')) {
            const galleryItem = e.target.closest('.gallery-item');
            const items = Array.from(document.querySelectorAll('.gallery-item'));
            const index = items.indexOf(galleryItem);
            
            if (index !== -1) {
                currentCategoryImages = getAllImagesByCategory(categoryId);
                showLightbox(index);
            }
        }
    });
});