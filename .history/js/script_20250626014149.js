// js/script.js
document.addEventListener('DOMContentLoaded', function () {
    // 图片数据
    const imageData = [
        {
            id: 1,
            title: "珂朵莉",
            category: "珂朵莉",
            imgPath: "img/Chth/珂朵莉(1).png",
            description: "传统日式风格与现代设计的完美结合",
            author: "插画师: Sakura"
        },
        {
            id: 2,
            title: "未来都市",
            category: "scenes",
            imgPath: "img/scenes/future_city.png",
            description: "霓虹灯光下的未来都市夜景，充满科幻感",
            author: "场景设计: CyberArt"
        },
        {
            id: 3,
            title: "魔法少女",
            category: "fanart",
            imgPath: "img/fanart/magical_girl.png",
            description: "粉丝创作的热门角色二次创作",
            author: "同人作者: Luna"
        },
        {
            id: 4,
            title: "龙之谷",
            category: "fantasy",
            imgPath: "img/fantasy/dragon_valley.png",
            description: "幻想世界中的巨龙栖息地，神秘而壮观",
            author: "概念艺术: FantasyWorks"
        },
        {
            id: 5,
            title: "猫咪少女",
            category: "chibi",
            imgPath: "img/chibi/cat_girl.png",
            description: "可爱的猫耳少女Q版形象，萌系风格",
            author: "角色设计: ChibiMaster"
        },
        {
            id: 6,
            title: "学院偶像",
            category: "characters",
            imgPath: "img/characters/school_idol.png",
            description: "校园偶像系列主角设计，活力四射",
            author: "插画师: StarLight"
        },
        {
            id: 7,
            title: "樱花神社",
            category: "scenes",
            imgPath: "img/scenes/sakura_shrine.png",
            description: "樱花盛开的古老神社场景，宁静而神圣",
            author: "场景设计: ZenArt"
        },
        {
            id: 8,
            title: "精灵森林",
            category: "fantasy",
            imgPath: "img/fantasy/elf_forest.png",
            description: "充满魔法的精灵栖息地，神秘而美丽",
            author: "概念艺术: Mythos"
        },
        {
            id: 9,
            title: "机甲少女",
            category: "fanart",
            imgPath: "img/fanart/mecha_girl.png",
            description: "科幻机甲与美少女的完美结合",
            author: "同人作者: TechArt"
        },
        {
            id: 10,
            title: "甜点精灵",
            category: "chibi",
            imgPath: "img/chibi/dessert_fairy.png",
            description: "甜点主题的Q版精灵，可爱又可口",
            author: "角色设计: SweetDream"
        },
        {
            id: 11,
            title: "剑士少年",
            category: "characters",
            imgPath: "img/characters/swordsman_boy.png",
            description: "勇敢的年轻剑士，踏上冒险之旅",
            author: "插画师: BraveHeart"
        },
        {
            id: 12,
            title: "海边小镇",
            category: "scenes",
            imgPath: "img/scenes/seaside_town.png",
            description: "宁静的海边小镇，温暖的阳光与海浪",
            author: "场景设计: OceanView"
        }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.nav-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');

    let currentCategory = 'all';
    let currentSearch = '';
    let visibleItems = 8;

    // 初始化显示图片
    renderGallery();

    // 分类筛选功能
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentCategory = button.dataset.category;
            visibleItems = 8;
            renderGallery();
        });
    });

    // 搜索功能
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 加载更多功能
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 4;
        renderGallery();
    });

    // 渲染画廊
    function renderGallery() {
        galleryGrid.innerHTML = '';

        const filteredImages = imageData.filter(image => {
            const matchesCategory = currentCategory === 'all' || image.category === currentCategory;
            const matchesSearch = !currentSearch ||
                image.title.toLowerCase().includes(currentSearch) ||
                image.description.toLowerCase().includes(currentSearch);

            return matchesCategory && matchesSearch;
        });

        const imagesToShow = filteredImages.slice(0, visibleItems);

        if (imagesToShow.length === 0) {
            galleryGrid.innerHTML = `<div class="no-results">没有找到匹配的图片，请尝试其他分类或关键词。</div>`;
            loadMoreBtn.style.display = 'none';
            return;
        }

        imagesToShow.forEach(image => {
            const categoryNames = {
                珂朵莉: "珂朵莉",
                scenes: "精美场景",
                fanart: "同人创作",
                fantasy: "奇幻世界",
                chibi: "Q版萌图"
            };

            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = image.category;

            // 添加动画延迟
            galleryItem.style.animationDelay = `${Math.random() * 0.3}s`;

            galleryItem.innerHTML = `
                <img src="${image.imgPath}" alt="${image.title}" class="gallery-img">
                <div class="item-overlay">
                    <div class="item-title">${image.title}</div>
                    <div class="item-category">${categoryNames[image.category]}</div>
                </div>
                <div class="item-info">
                    <h3>${image.author}</h3>
                    <p>${image.description}</p>
                </div>
            `;

            galleryGrid.appendChild(galleryItem);
        });

        // 显示/隐藏加载更多按钮
        loadMoreBtn.style.display = filteredImages.length > visibleItems ? 'block' : 'none';
    }

    // 执行搜索
    function performSearch() {
        currentSearch = searchInput.value.trim().toLowerCase();
        currentCategory = 'all';

        // 更新活动按钮
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            }
        });

        visibleItems = 8;
        renderGallery();
    }

    // 添加浮动动画到所有图片
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});