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
            galleryItem.style.animationDelay = `${index * 0.1}s`;

            galleryItem.innerHTML = `
                <img src="${image.imgPath}" alt="${image.title}" class="gallery-img" onclick="doSomething()">

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

    function doSomething() {
        // 使用 document.body.appendChild() 方法将放大后的图片添加到当前窗口
        document.body.appendChild(createEnlargedImage());
    }

    function createEnlargedImage() {
        // 创建一个新的 img 元素来显示放大后的图片
        const enlargedImage = document.createElement('img');
        enlargedImage.src = this.src;
        enlargedImage.style.width = "100%";
        enlargedImage.style.height = "100%";
        return enlargedImage;
    }

    // // ============ 图片弹窗功能 ============ //
    // function openModal(imgSrc) {
    //     const modal = document.getElementById('imageModal');
    //     const modalImg = document.getElementById('modalImage');

    //     modal.style.display = "block";
    //     modalImg.src = imgSrc;
    //     document.body.style.overflow = 'hidden'; // 防止背景滚动

    //     // 添加点击关闭功能
    //     modal.addEventListener('click', closeModal);
    // }

    // function closeModal() {
    //     const modal = document.getElementById('imageModal');
    //     modal.style.display = "none";
    //     document.body.style.overflow = 'auto'; // 恢复背景滚动

    //     // 移除点击事件监听器
    //     modal.removeEventListener('click', closeModal);
    // }

    // // 添加图片点击事件处理
    // function initImageModal() {
    //     const galleryGrid = document.getElementById('category-gallery');

    //     galleryGrid.addEventListener('click', function (e) {
    //         if (e.target.classList.contains('gallery-img')) {
    //             openModal(e.target.src);
    //         }
    //     });

    //     // 支持ESC键关闭
    //     document.addEventListener('keydown', function (e) {
    //         if (e.key === 'Escape' && document.getElementById('imageModal').style.display === 'block') {
    //             closeModal();
    //         }
    //     });
    // }

    // // 初始化弹窗功能
    // initImageModal();
});