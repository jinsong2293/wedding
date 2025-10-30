        function createFlower() {
            const flower = document.createElement('div');
            flower.className = 'flower';
            const emojis = ['🌸', '💖', '✨']; // More varied emojis
            flower.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.animationDuration = Math.random() * 7 + 5 + 's'; // Longer, more varied duration
            flower.style.animationDelay = Math.random() * 2 + 's'; // Random delay for staggered fall
            flower.style.opacity = Math.random() * 0.6 + 0.4; // Varied opacity
            flower.style.fontSize = Math.random() * 15 + 15 + 'px'; // Varied size
            document.body.appendChild(flower);
            setTimeout(() => flower.remove(), 12000); // Longer removal time
        }

        // Create flowers at intervals
        setInterval(createFlower, 500); // More frequent flowers

        // Đếm ngược thời gian
        function updateCountdown() {
            const weddingDate = new Date('2025-12-06T18:00:00+07:00').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = 'Đã đến ngày trọng đại!';
            }
        }
        setInterval(updateCountdown, 1000);
      function toggleMusic() {
            var music = document.getElementById("weddingMusic");
            var musicIcon = document.querySelector(".music-control");
            if (music.paused) {
                music.play();
                musicIcon.textContent = "🔊"; // Speaker icon for playing
            } else {
                music.pause();
                musicIcon.textContent = "🔇"; // Muted speaker icon for paused
            }
        }

        const scriptURL = 'https://script.google.com/macros/s/AKfycbykWOllalbbKD1IuO9ptAAzBHpjaz2vr-YBJ-ugW_xta0a827BxBn8a0-eb_dmpa4vq/exec';
 // Thay bằng URL web app từ Google Apps Script
        const form = document.getElementById('rsvpForm');

        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        alert('Cảm ơn bạn! Xác nhận đã được gửi thành công.');
                        form.reset();
                    } else {
                        alert('Đã xảy ra lỗi, vui lòng thử lại.');
                    }
                })
                .catch(error => {
                    alert('Lỗi: ' + error.message);
                });
        });

        function cancelForm() {
            form.reset();
            alert('Đã hủy xác nhận.');
        }
         // Danh sách ảnh trong thư mục images
        const images = [
            'images/image1.jpg',
            'images/image2.jpg',
            'images/image3.jpg',
            'images/image5.jpg',
            'images/image6.jpg',
            'images/image7.jpg',
            'images/image8.jpg',
            'images/image4.jpg',
            'images/image9.jpg',
            'images/image10.jpg',
            'images/image11.jpg'
            // Thêm các đường dẫn ảnh khác ở đây
        ];

       let currentIndex = 0;
let rotationInterval;

// Hiển thị gallery với hiệu ứng mờ
async function displayGallery() {
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    
    // Thêm hiệu ứng mờ trước khi thay đổi
    row1.style.opacity = '0';
    row2.style.opacity = '0';
    
    // Đợi hiệu ứng hoàn tất
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Xóa nội dung cũ
    row1.innerHTML = '';
    row2.innerHTML = '';
    
    // Thêm ảnh mới
    for (let i = 0; i < 6; i++) {
        const imgIndex = (currentIndex + i) % images.length;
        const img = createThumbnail(images[imgIndex], imgIndex);
        
        if (i < 3) {
            row1.appendChild(img);
        } else {
            row2.appendChild(img);
        }
    }
    
    // Hiện lại với hiệu ứng mờ
    row1.style.opacity = '1';
    row2.style.opacity = '1';
}

// Tạo thumbnail
function createThumbnail(src, index) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-thumbnail';
    img.alt = `Khoảnh khắc ${index + 1}`;
    img.onerror = () => { img.src = 'https://via.placeholder.com/120x90?text=Ảnh+Lỗi'; };
    
    // Thêm sự kiện click để phóng to
    img.addEventListener('click', () => openModal(src));
    return img;
}

// Mở modal phóng to
function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    
    modalImg.src = src;
    modal.style.display = 'flex';
    
    // Đóng modal khi click × hoặc bên ngoài
    document.querySelector('.close-button').onclick = () => {
        modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Tự động xoay ảnh
function startRotation() {
    // Dừng interval cũ nếu có
    if (rotationInterval) clearInterval(rotationInterval);
    
    rotationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        displayGallery();
    }, 25000);
}
// Preload tất cả ảnh khi trang load
function preloadImages() {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}
// Tạm dừng khi hover
function setupGalleryHover() {
    const gallery = document.getElementById('gallery');
    gallery.addEventListener('mouseenter', () => clearInterval(rotationInterval));
    gallery.addEventListener('mouseleave', startRotation);
}

// Khởi tạo
window.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    displayGallery();
    startRotation();
});
 // Đảm bảo DOM đã load xong
document.addEventListener('DOMContentLoaded', function() {
    // Đếm ngược thời gian
    function updateCountdown() {
        // Sử dụng timezone Việt Nam (UTC+7)
        const weddingDate = new Date('2025-12-06T18:00:00+07:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Tính toán ngày, giờ, phút, giây
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Cập nhật giá trị lên DOM
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-container').innerHTML = 
                '<div class="text-2xl text-pink-600 font-bold py-4">Đã đến ngày trọng đại!</div>';
        }
    }

    // Chạy ngay lần đầu
    updateCountdown();
    
    // Cập nhật mỗi giây
    const countdownTimer = setInterval(updateCountdown, 1000);
});
