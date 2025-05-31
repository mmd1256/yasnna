document.addEventListener('DOMContentLoaded', function() {
    // تنظیم تاریخ آشنایی
    const firstDateString = "۱۴۰۲/۰۴/۱۵";
    const firstDate = new Date(2023, 6, 6); // تبدیل تاریخ شمسی به میلادی (ماه از صفر شروع می‌شود)
    updateTimeElapsed(firstDate);
    
    // آپدیت زمان سپری شده
    function updateTimeElapsed(startDate) {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // محاسبه سال، ماه و روز
        let years = Math.floor(diffDays / 365);
        let months = Math.floor((diffDays % 365) / 30);
        let days = Math.floor((diffDays % 365) % 30);
        
        // نمایش در صفحه
        document.querySelector('.days-count').textContent = diffDays.toString();
        
        let timeElapsedText = '';
        if (years > 0) {
            timeElapsedText += years + ' سال و ';
        }
        if (months > 0) {
            timeElapsedText += months + ' ماه و ';
        }
        timeElapsedText += days + ' روز';
        
        document.getElementById('time-elapsed').textContent = timeElapsedText;
    }
    
    // آپدیت روزانه
    setInterval(() => {
        updateTimeElapsed(firstDate);
    }, 86400000); // هر 24 ساعت
    
    // دکمه‌ها
    const loveButton = document.getElementById('love-button');
    const poemButton = document.getElementById('poem-button');
    const galleryButton = document.getElementById('gallery-button');
    const letterButton = document.getElementById('letter-button');
    const closeGalleryButton = document.getElementById('close-gallery');
    
    const poem = document.getElementById('poem');
    const gallery = document.getElementById('gallery');
    const letter = document.getElementById('love-letter');
    
    // نمایش شعر عاشقانه
    poemButton.addEventListener('click', function() {
        hideAllSections();
        poem.classList.toggle('hidden');
        poem.classList.toggle('visible');
        
        if (poem.classList.contains('visible')) {
            poemButton.innerHTML = '<i class="fas fa-times"></i> بستن شعر';
        } else {
            poemButton.innerHTML = '<i class="fas fa-feather"></i> شعر عاشقانه';
        }
    });
    
    // نمایش گالری عکس‌ها
    galleryButton.addEventListener('click', function() {
        hideAllSections();
        gallery.classList.remove('hidden');
        initSwiper();
    });
    
    // بستن گالری
    closeGalleryButton.addEventListener('click', function() {
        gallery.classList.add('hidden');
    });
    
    // نمایش نامه عاشقانه
    letterButton.addEventListener('click', function() {
        hideAllSections();
        letter.classList.toggle('hidden');
        letter.classList.toggle('visible');
        
        if (letter.classList.contains('visible')) {
            letterButton.innerHTML = '<i class="fas fa-times"></i> بستن نامه';
        } else {
            letterButton.innerHTML = '<i class="fas fa-envelope"></i> نامه عاشقانه';
        }
    });
    
    // مخفی کردن همه بخش‌ها
    function hideAllSections() {
        poem.classList.add('hidden');
        poem.classList.remove('visible');
        letter.classList.add('hidden');
        letter.classList.remove('visible');
        
        poemButton.innerHTML = '<i class="fas fa-feather"></i> شعر عاشقانه';
        letterButton.innerHTML = '<i class="fas fa-envelope"></i> نامه عاشقانه';
    }
    
    // دکمه دوستت دارم
    loveButton.addEventListener('click', function() {
        showHearts();
        playLoveSound();
        launchConfetti();
        
        // پیام‌های عاشقانه
        const messages = [
            "تو زیباترین اتفاق زندگی من هستی",
            "هر لحظه با تو بودن برایم یک رویاست",
            "دوستت دارم بیشتر از دیروز، کمتر از فردا",
            "تو تمام دنیای من هستی",
            "با تو بودن قشنگ‌ترین حس دنیاست",
            "قلبم برای تو می‌تپد",
            "تو را با تمام وجودم دوست دارم",
            "عشق تو زیباترین هدیه زندگی من است",
            "کنار تو بودن آرزوی هر روز من است"
        ];
        
        // انتخاب یک پیام تصادفی
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.querySelector('.message').textContent = randomMessage;
        
        // افکت ویژه
        document.querySelector('.message-container').style.animation = 'pulse 1s ease';
        setTimeout(() => {
            document.querySelector('.message-container').style.animation = '';
        }, 1000);
    });
    
    // ایجاد قلب‌های متحرک
    function showHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-animation');
        
        // تنظیم استایل قلب
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        // انتخاب تصادفی یک قلب
        const hearts = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        document.body.appendChild(heart);
        
        // حذف قلب بعد از اتمام انیمیشن
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // صدای قلب
    function playLoveSound() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('خطا در پخش صدا:', e));
    }
    
    // پخش موزیک پس‌زمینه
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>توقف موزیک</span>';
            }).catch(e => console.log('خطا در پخش موزیک:', e));
        } else {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span>پخش موزیک</span>';
        }
    });
    
    // راه‌اندازی اسلایدر گالری
    function initSwiper() {
        new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    
    // کانفتی
    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });
        
        myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e91e63', '#ff4081', '#f50057', '#c2185b', '#880e4f']
        });
    }
    
    // ایجاد قلب‌ها به صورت تصادفی
    setInterval(() => {
        if (Math.random() > 0.95) {
            createHeart();
        }
    }, 2000);
    
    // افکت تایپ برای نامه عاشقانه
    letterButton.addEventListener('click', function() {
        if (letter.classList.contains('visible')) {
            const paragraphs = letter.querySelectorAll('.letter-content p');
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, index * 500);
            });
        }
    });
    
    // اضافه کردن استایل برای انیمیشن قلب‌ها و نامه
    const style = document.createElement('style');
    style.innerHTML = `
        .heart-animation {
            position: fixed;
            z-index: 999;
            pointer-events: none;
            animation: float-heart 5s ease-in forwards;
            opacity: 0;
        }
        
        @keyframes float-heart {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .letter-content p {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // افکت ورود صفحه
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Three.js Background Effect
    if (typeof THREE !== 'undefined') {
        // Create a 3D background effect
        const createBackgroundEffect = () => {
            // Create scene, camera and renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            
            // Create container and append renderer
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-2';
            container.style.pointerEvents = 'none';
            container.appendChild(renderer.domElement);
            document.body.appendChild(container);
            
            // Create particles
            const particlesCount = 500;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particlesCount * 3);
            const colors = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i += 3) {
                // Position
                positions[i] = (Math.random() - 0.5) * 10;
                positions[i + 1] = (Math.random() - 0.5) * 10;
                positions[i + 2] = (Math.random() - 0.5) * 10 - 5;
                
                // Color
                const colorIndex = Math.floor(Math.random() * 3);
                if (colorIndex === 0) {
                    // Purple
                    colors[i] = 108/255;
                    colors[i + 1] = 34/255;
                    colors[i + 2] = 189/255;
                } else if (colorIndex === 1) {
                    // Pink
                    colors[i] = 255/255;
                    colors[i + 1] = 61/255;
                    colors[i + 2] = 127/255;
                } else {
                    // Cyan
                    colors[i] = 0/255;
                    colors[i + 1] = 229/255;
                    colors[i + 2] = 255/255;
                }
            }
            
            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.7
            });
            
            const particleSystem = new THREE.Points(particles, particleMaterial);
            scene.add(particleSystem);
            
            // Position camera
            camera.position.z = 5;
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                particleSystem.rotation.x += 0.0005;
                particleSystem.rotation.y += 0.0003;
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            animate();
        };
        
        // Initialize background effect
        createBackgroundEffect();
    }
    
    // Add confetti effect for special moments
    const addConfettiEffect = (element) => {
        if (typeof confetti !== 'undefined') {
            element.addEventListener('click', () => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6C22BD', '#FF3D7F', '#00E5FF']
                });
            });
        }
    };
    
    // Add confetti to special buttons
    const specialButtons = document.querySelectorAll('#message-btn, #music-btn');
    specialButtons.forEach(button => {
        addConfettiEffect(button);
    });
});
