// 图片数据
const imageData = {
    works: [
        {
            id: "sukasuka",
            name: "末日三问",
            description: "末日时在做什么？有没有空？可以来拯救吗？",
            coverImg: "img/Chtholly/Chtholly (1).png",
            totalCharacters: 3
        },
        {
            id: "rezero",
            name: "Re:从零开始",
            description: "异世界冒险故事",
            coverImg: "img/works/rezero_cover.jpg",
            totalCharacters: 4
        },
        // 其他作品...
    ],

    characters: {
        sukasuka: [ // 对应作品ID
            {
                id: "Chtholly",
                name: "珂朵莉",
                description: "黄金妖精",
                coverImg: "img/Chtholly/Chtholly (1).png",
                totalImages: 42
            },
            // 其他角色...
        ],
        rezero: [
            {
                id: "Emilia",
                name: "爱蜜莉雅",
                description: "半妖精女主角",
                coverImg: "img/characters/Emilia_cover.jpg",
                totalImages: 35
            },
            // 其他角色...
        ]
    },

    images: {
        Chtholly: Array.from({ length: 42 }, (_, i) => ({
            id: i + 1,
            title: "珂朵莉",
            imgPath: `img/Chtholly/Chtholly (${i + 1}).png`,
            description: "末日三问女主",
            author: "插画师: 未知"
        })),
    }
};

function getAllWorks() {
    return imageData.works;
}

function getWorkById(id) {
    return imageData.works.find(work => work.id === id);
}

function getCharactersByWork(workId) {
    return imageData.characters[workId] || [];
}

// 获取所有分类
function getAllCharacters() {
    return imageData.characters;
}

// 获取单个分类
function getCharacterById(id) {
    return imageData.characters.find(character => character.id === id);
}

// 获取分类下的图片
function getImagesByCharacter(characterId, limit = 100) {
    const images = imageData.images[characterId] || [];
    return images.slice(0, limit);
}

// 获取所有图片
function getAllImagesByCharacter(characterId) {
    return imageData.images[characterId] || [];
}