document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category') || 'Chtholly';

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

    // 设置图片总数
    document.getElementById('total-images').textContent = allImages.length;

    // 渲染图片
    function renderImages() {
        // 显示加载状态
        galleryGrid.innerHTML = `
                    <div class="loading">
                        <div class="loading-spinner"></div>
                        正在加载图片...
                    </div>
                `;
        galleryGrid.innerHTML = '';

        // 模拟网络延迟
        // setTimeout(() => {
        const imagesToShow = allImages.slice(0, visibleItems);

        if (imagesToShow.length === 0) {
            galleryGrid.innerHTML = `<div class="no-results">该分类下暂无图片，请返回首页选择其他分类。</div>`;
            loadMoreBtn.style.display = 'none';
            return;
        }

        galleryGrid.innerHTML = '';

        imagesToShow.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
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

        // 初始化弹窗功能
        initImageModal();
        // }, 100); // 800ms延迟模拟加载时间
    }

    // 初始化渲染
    renderImages();

    // 加载更多功能
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 8;
        renderImages();
    });

    // ============ 图片弹窗功能 ============ //
    function openModal(imgSrc) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');

        modal.style.display = "block";
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    function closeModal() {
        document.getElementById('imageModal').style.display = "none";
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }

    // 添加图片点击事件处理
    function initImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-img');

        galleryItems.forEach(img => {
            img.addEventListener('click', function () {
                openModal(this.src);
            });
        });

        // 支持ESC键关闭
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.getElementById('imageModal').style.display === 'block') {
                closeModal();
            }
        });
    }
});