const apiKey = 'TY8tDd6pq-wS9Wbo73_2jfyKBdCGjOD-nHDmaPPA6zo'; 
const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const results = document.getElementById('results');
const showMoreBtn = document.getElementById('show-more-btn');
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const downloadButton = document.getElementById('downloadButton');
const closeModal = document.getElementById('closeModal');

let currentPage = 1;
let totalPages = 1;
let searchTerm = '';

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchTerm = searchQuery.value;
    currentPage = 1; 
    fetchPhotos(searchTerm, currentPage);
});

showMoreBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchPhotos(searchTerm, currentPage);
    }
});

async function fetchPhotos(query, page) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${apiKey}`);
    const data = await response.json();
    totalPages = data.total_pages;
    displayPhotos(data.results);
}

function displayPhotos(photos) {
    if (currentPage === 1) {
        results.innerHTML = '';
    }

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
            <img src="${photo.urls.small}" alt="${photo.alt_description}" data-fullsize="${photo.urls.full}" data-download="${photo.links.download}">
        `;
        photoElement.addEventListener('click', () => openModal(photo.urls.full, photo.links.download));
        results.appendChild(photoElement);
    });

    showMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
}

function openModal(imageUrl, downloadUrl) {
    modalImage.src = imageUrl;
    downloadButton.href = downloadUrl;
    photoModal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    photoModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === photoModal) {
        photoModal.style.display = 'none';
    }
});
