// 图片数据
const imageData = {
    categories: [
        {
            id: "Chtholly",
            name: "珂朵莉",
            description: "末日时在做什么？有没有",
            coverImg: "img/Chtholly/Chtholly (1).jpg",
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
        Chtholly: Array.from({length: 42}, (_, i) => ({
            id: i + 1,
            title: "珂朵莉",
            imgPath: `img/Chtholly/Chtholly (${i+1}).jpg`,
            description: "珂朵莉的美丽图片",
            author: "插画师: 未知"
        })),
        scenes: Array.from({length: 36}, (_, i) => ({
            id: i + 1,
            title: "精美场景",
            imgPath: `img/scenes/scene (${i+1}).jpg`,
            description: "精美的动漫场景",
            author: "场景设计: 未知"
        })),
        fanart: Array.from({length: 28}, (_, i) => ({
            id: i + 1,
            title: "同人创作",
            imgPath: `img/fanart/fanart (${i+1}).jpg`,
            description: "粉丝创作的作品",
            author: "作者: 未知"
        })),
        fantasy: Array.from({length: 31}, (_, i) => ({
            id: i + 1,
            title: "奇幻世界",
            imgPath: `img/fantasy/fantasy (${i+1}).jpg`,
            description: "奇幻世界插画",
            author: "插画师: 未知"
        })),
        chibi: Array.from({length: 25}, (_, i) => ({
            id: i + 1,
            title: "Q版萌图",
            imgPath: `img/chibi/chibi (${i+1}).jpg`,
            description: "可爱的Q版角色",
            author: "插画师: 未知"
        }))
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