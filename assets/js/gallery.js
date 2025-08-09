// Gallery JavaScript for Isabella's Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    initializeImageProtection();
    initializeGallery();
    initializeModal();
    initializeFilters();
    console.log('📸 Galeria carregada com sucesso!');
});

// Add image protection to all images
function initializeImageProtection() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.draggable = false;
        img.oncontextmenu = () => false;
        img.onselectstart = () => false;
        img.ondragstart = () => false;
        img.onmousedown = (e) => {
            if (e.button === 2) { // Right click
                e.preventDefault();
                return false;
            }
        };
    });
}

let currentImageIndex = 0;
let filteredImages = [];

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Optimize gallery items load with better performance
    galleryItems.forEach((item, index) => {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
        
        // Add click event to open modal
        item.addEventListener('click', () => {
            openModal(item, index);
        });
        
        // Disable context menu on mobile to prevent opening in new tab
        item.addEventListener('contextmenu', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                return false;
            }
        });
        
        // Disable long press on mobile
        item.addEventListener('touchstart', function(e) {
            const startTime = Date.now();
            const touchStartHandler = () => {
                const touchDuration = Date.now() - startTime;
                if (touchDuration > 500) { // Long press detected
                    e.preventDefault();
                    return false;
                }
            };
            item.addEventListener('touchend', touchStartHandler, { once: true });
        });
    });
    
    // Load more functionality (simulated)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
    }
}

function initializeModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
        });
    });
}

function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Show item
            item.classList.remove('hidden');
            item.classList.add('visible');
            item.style.display = 'block';
        } else {
            // Hide item
            item.classList.remove('visible');
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
    
    // Update filtered images array for modal navigation
    updateFilteredImages(filter);
}

function updateFilteredImages(filter) {
    const allItems = document.querySelectorAll('.gallery-item');
    filteredImages = Array.from(allItems).filter(item => {
        const category = item.getAttribute('data-category');
        return (filter === 'all' || category === filter) && !item.classList.contains('hidden');
    });
}

function openModal(item, index) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const img = item.querySelector('img');
    const overlayContent = item.querySelector('.overlay-content');
    
    // Set modal content
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = overlayContent.querySelector('h3').textContent;
    modalDescription.textContent = overlayContent.querySelector('p').textContent;
    
    // Set current image index
    currentImageIndex = index;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    const galleryItems = filteredImages.length > 0 ? filteredImages : document.querySelectorAll('.gallery-item:not(.hidden)');
    
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = galleryItems.length - 1;
    }
    
    updateModalContent(galleryItems[currentImageIndex]);
}

function showNextImage() {
    const galleryItems = filteredImages.length > 0 ? filteredImages : document.querySelectorAll('.gallery-item:not(.hidden)');
    
    if (currentImageIndex < galleryItems.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }
    
    updateModalContent(galleryItems[currentImageIndex]);
}

function updateModalContent(item) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const img = item.querySelector('img');
    const overlayContent = item.querySelector('.overlay-content');
    
    // Add fade effect
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = overlayContent.querySelector('h3').textContent;
        modalDescription.textContent = overlayContent.querySelector('p').textContent;
        modalImage.style.opacity = '1';
    }, 150);
}

function loadMoreImages() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        // Here you would typically load more images from a server
        // For now, we'll just show a message
        loadMoreBtn.innerHTML = '<i class="fas fa-heart"></i> Todas as memórias carregadas!';
        loadMoreBtn.style.background = 'var(--accent-color)';
        loadMoreBtn.style.color = 'white';
        
        // You can add more gallery items dynamically here
        // Example:
        // const newItem = createGalleryItem('path/to/image.jpg', 'Title', 'Description', 'category');
        // galleryGrid.appendChild(newItem);
        
    }, 2000);
}

function createGalleryItem(imageSrc, title, description, category) {
    const item = document.createElement('div');
    item.className = 'gallery-item visible';
    item.setAttribute('data-category', category);
    
    item.innerHTML = `
        <img src="${imageSrc}" alt="${title}" loading="lazy">
        <div class="overlay">
            <div class="overlay-content">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add click event
    item.addEventListener('click', () => {
        const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(item);
        openModal(item, index);
    });
    
    return item;
}

// Initialize filtered images array with all items
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateFilteredImages('all');
    }, 1000);
});
