document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('work');
    
    // 获取作品信息
    const work = getWorkById(workId);
    if (!work) {
        window.location.href = 'index.html';
        return;
    }
    
    // 设置标题和描述
    document.getElementById('work-title').textContent = work.name;
    document.getElementById('work-desc').textContent = work.description;
    
    // 获取该作品的角色分类
    const characters = getCharactersByWork(workId);
    const container = document.getElementById('characters-container');
    
    // 渲染角色卡片
    characters.forEach((character, index) => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.style.animationDelay = `${index * 0.1}s`;
        
        characterCard.innerHTML = `
            <img src="${character.coverImg}" alt="${character.name}" class="character-img">
            <div class="character-overlay">
                <div class="character-title">${character.name}</div>
                <div class="character-count">${character.totalImages}张图片</div>
            </div>
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
            </div>
        `;
        
        // 添加点击事件
        characterCard.addEventListener('click', () => {
            window.location.href = `category.html?<header>
        <div class="header-content">
            <h1><i class="fas fa-star"></i> 珂学家的xp档案馆 <i class="fas fa-star"></i></h1>
            <p class="subtitle">我收集的老婆美图</p>
        </div>
    </header>=${character.id}`;
        });
        
        container.appendChild(characterCard);
    });
});