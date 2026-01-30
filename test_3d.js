// Test if 3D transforms are working
const skillTags = document.querySelectorAll('.skill-tag');
const trackers = document.querySelectorAll('.skill-tag-container .tracker');

console.log('Skill tags found:', skillTags.length);
console.log('Trackers found:', trackers.length);

// Check if skill-tag is inside canvas
const firstSkillContainer = document.querySelector('.skill-tag-container');
if (firstSkillContainer) {
    const canvas = firstSkillContainer.querySelector('.skill-tag-canvas');
    const skillTag = canvas.querySelector('.skill-tag');
    console.log('Skill tag inside canvas:', !!skillTag);
}

// Check computed styles
if (skillTags[0]) {
    const styles = window.getComputedStyle(skillTags[0]);
    console.log('Skill tag position:', styles.position);
    console.log('Skill tag z-index:', styles.zIndex);
}

// Test hover on first tracker
if (trackers[0]) {
    trackers[0].dispatchEvent(new MouseEvent('mouseenter'));
    setTimeout(() => {
        const transform = window.getComputedStyle(skillTags[0]).transform;
        console.log('Transform on hover:', transform);
    }, 100);
}
