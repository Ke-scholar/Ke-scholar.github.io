document.addEventListener('DOMContentLoaded', function() {
    const worksGrid = document.querySelector('.works-grid');
    const works = getAllWorks();
    
    works.forEach((work, index) => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        workCard.style.animationDelay = `${index * 0.1}s`;
        
        workCard.innerHTML = `
            <img src="${work.coverImg}" alt="${work.name}" class="work-img">
            <div class="work-overlay">
                <div class="work-title">${work.name}</div>
                <div class="work-count">${work.totalCharacters}位角色</div>
            </div>
            <div class="work-info">
                <h3>${work.name}</h3>
                <p>${work.description}</p>
            </div>
        `;
        
        workCard.addEventListener('click', () => {
            window.location.href = `work.html?work=${work.id}`;
        });
        
        worksGrid.appendChild(workCard);
    });
});