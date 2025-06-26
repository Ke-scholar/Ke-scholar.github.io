// 图片数据
const imageData = {
    categories: [
        {
            id: "characters",
            name: "人物角色",
            description: "各类动漫角色设计，包括主角、配角以及原创角色",
            coverImg: "img/characters/cover.jpg",
            totalImages: 42
        },
        {
            id: "scenes",
            name: "精美场景",
            description: "动漫中的精美场景，包括城市、自然景观和幻想世界",
            coverImg: "img/scenes/cover.jpg",
            totalImages: 36
        },
        {
            id: "fanart",
            name: "同人创作",
            description: "粉丝创作的作品，包括二次创作和同人插画",
            coverImg: "img/fanart/cover.jpg",
            totalImages: 28
        },
        {
            id: "fantasy",
            name: "奇幻世界",
            description: "充满魔法与幻想的异世界场景和角色",
            coverImg: "img/fantasy/cover.jpg",
            totalImages: 31
        },
        {
            id: "chibi",
            name: "Q版萌图",
            description: "可爱的Q版角色和萌系插画",
            coverImg: "img/chibi/cover.jpg",
            totalImages: 25
        }
    ],
    
    images: {
        characters: [
            {
                id: 1,
                title: "武士少女",
                imgPath: "img/characters/samurai_girl.jpg",
                description: "传统日式风格与现代设计的完美结合",
                author: "插画师: Sakura"
            },
            {
                id: 2,
                title: "学院偶像",
                imgPath: "img/characters/school_idol.jpg",
                description: "校园偶像系列主角设计，活力四射",
                author: "插画师: StarLight"
            },
            // 更多图片...
        ],
        
        scenes: [
            {
                id: 1,
                title: "未来都市",
                imgPath: "img/scenes/future_city.jpg",
                description: "霓虹灯光下的未来都市夜景，充满科幻感",
                author: "场景设计: CyberArt"
            },
            {
                id: 2,
                title: "樱花神社",
                imgPath: "img/scenes/sakura_shrine.jpg",
                description: "樱花盛开的古老神社场景，宁静而神圣",
                author: "场景设计: ZenArt"
            },
            // 更多图片...
        ],
        
        // 其他分类图片...
    }
};

// 获取所有分类
function getAllCategories() {
    return imageData.categories;
}

// 获取单个分类
function getCategoryById(id) {
    return imageData.categories.find(category => category.id === id);
}

// 获取分类下的图片
function getImagesByCategory(categoryId, limit = 8) {
    const images = imageData.images[categoryId] || [];
    return images.slice(0, limit);
}

// 获取所有图片
function getAllImagesByCategory(categoryId) {
    return imageData.images[categoryId] || [];
}