// script.js
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContainer = document.getElementById('main-container');
const successScreen = document.getElementById('success-screen');
const bgMessagesContainer = document.getElementById('bg-messages-container');

let noClickCount = 0;
const pleadingMessages = [
    "คิดถึงนะ 🥺",
    "ไม่กลับมาจริงง่าา 😭",
    "ง้ออยู่น้าา 💖",
    "ให้โอกาสเค้าหน่อยย 🎀",
    "รักเพื่อนนะ 💕",
    "เพื่อนใจร้ายย 🥺",
    "อย่าไปเลยยย 🌸",
    "เบื่อกันแล้วหรอ 🥰"
];

const successFlow = [
    { text: "เย้! ดีใจที่สูดดดดดดดดดดด ที่ๆเราไปเที่ยวคาเฟ่ด้วยกัน ถึงแม้เค้าจะถ่ายได้ไม่ดีแต่เค้าก็ตั้งใจนะะ", img: "1.jpg" },
    { text: "เค้าคิดถึงเธอมากๆเลยนะ ตอนปีใหม่ที่เราไปบ้านนัท ที่เธอบอกกกันว่าเรามาอยู่ด้วยกันทุกปีเลยนะ", img: "2.jpg" },
    { text: "ขอบคุณที่ยอมให้โอกาสเค้าอีกครั้ง วันเกิดเธอครั้งนั้นเค้าตั้งใจสั่งเค้กให้เธอเลยนะ ถึงแม้จะไม่ได้มีของขวัญให้เค้าขอโทษนะ", img: "3.jpg" },
    { text: "สัญญาว่าจะทำตัวให้ดีขึ้น วันนั้นไปรอเธอที่คลินิกเธอหน้าสดแต่เค้าก็ชอบ", img: "4.jpg" },
    { text: "ขอบคุณจริงๆนะ เค้ารักเธอนะ ตอนนั้นเธอชวนออกมากินฮาจิบังจำได้ว่าเค้าใส่เสื้อยางรถยนต์ มีความสุขจริงๆ", img: "5.jpg" },
    { text: "สัญญาว่าจะทำตัวให้ดีขึ้น มากินหมาล่าที่ยูเนี่ยนมอ เหมือนช่วงนั้นเธอมีงานที่มอเยอะ มานั่งกินไอติมที่แมคต่อด้วย", img: "6.jpg" },
    { text: "รูปนี้มาเกษตรแฟร์ มากินหมูกะทะหรือจิ้มจุ่มนี้ละตรงริมสระน้ำ นั่งคุยกับเธอเรื่อยเปื่อย", img: "7.jpg" },
    { text: "มากินฮาจิบัง เธอหน้าสดอีกแล้วเหมือนตอนนั้นหาร้านนั่งแล้วนึกไม่ออกเลยนั่งกินร้านนี้", img: "8.jpg" },
    { text: "ของขวัญวันครบรอบ 2.2 ปี เค้าสั่งดอกไม้จาก POPMART ให้เธอเค้าจำได้ว่าลงสตอรี่ด้วย ", img: "9.jpg" },
    { text: "จำได้ว่ามานั่งกิน Pepper Laucnh ครั้งแรกๆเลย เมื่อก่อนเราเจอกันบ่อยๆ", img: "10.jpg" },
    { text: "เธอเอาโทรศัพท์เค้าไปเซลฟี่เองสวยมาก ", img: "11.jpg" },
    { text: "เรากินพาสต้าหน้ากรมเค้า จำได้ว่าเราออกมาตอนดึก ถึงแม้เค้าจะใส่กางเกงขาสั้นเธอก็ไม่อาย", img: "12.jpg" },
    { text: "มากินบิงซู นั่งคุยนู้นนี้นั้น เธอหน้าสดบ่อยนะเมื่อก่อนนน ทำให้เค้าได้เปลี่ยนรูปโปรด้วย", img: "13.jpg" },
    { text: "ไปปั่นเป็ดกันตอนนั้น เธอว่าสนุกมากฟิลใหม่ๆ ", img: "14.jpg" },
    { text: "นั่งกินหมูกะทะ ที่เกษตรแฟร์เราไปกันบ่อยมากเหมือนอีเวนท์หลักเลย", img: "15.jpg" },
    { text: "เราไปที่ไกลไปนั่งเล่นเครื่องเกมกันสองคน จำได้ว่าขากลับเราพูดเรื่องเดินขึ้นเขา 5555", img: "16.jpg" },
    { text: "เธอพามากินจ่าอู่ ไอติมอร่อยย เธอชอบซดน้ำซุปหมูกะทะกิน", img: "17.jpg" },
    { text: "ขากลับตอนเครื่องเล่นเกม เราแวะกินบะหมี่อร่อยมาก พาเค้ากลับดึกครั้งแรกๆ", img: "18.jpg" },
];

const videoFlow = [
    { text: "HNY ปีที่เราไปดูเบียดกัน ตอนแรกนึกว่าจะเป็นแบบอีแทวอน", video: "19.mp4" },
    { text: "พาเธอไปเล่นเครื่องเล่นที่เซนทรัลรามอินทรา", video: "20.mp4" },
    { text: "มากินพาสต้ากันหน้ากรมเค้า", video: "21.mp4" }
];

let currentMsgIndex = 0;

// Entrance animation
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        mainContainer.classList.add('active');
    }, 100);
});

let scaleNo = 1;
noBtn.addEventListener('click', (e) => {
    noClickCount++;

    // ไม่ให้ปุ่มย้ายหนีแล้ว แต่ให้เล็กลงแทน (ลดทีละ 10% แต่ไม่ให้เล็กเกินไปจนกดไม่ได้)
    scaleNo = Math.max(0.4, scaleNo - 0.1);
    noBtn.style.transform = `scale(${scaleNo})`;
    noBtn.style.transition = 'transform 0.3s ease';

    // ขยายปุ่ม Yes นิดนึงเพื่อเชิญชวนให้กด
    const currentScaleMatch = yesBtn.style.transform.match(/scale\(([^)]+)\)/);
    const currentScale = currentScaleMatch ? parseFloat(currentScaleMatch[1]) : 1;
    const newScale = currentScale + 0.15;
    yesBtn.style.transform = `scale(${newScale})`;

    // ถ้าย้ายครบ 3 ครั้ง เริ่มเด้งข้อความแชทเป็นพื้นหลัง
    if (noClickCount >= 3) {
        spawnBackgroundMessage();

        // ครั้งแรกที่ครบ 3 ให้เปลี่ยนรูปและอ้อนเต็มที่
        if (noClickCount === 3) {
            document.querySelector('.kitty-img img').src = "https://media1.tenor.com/m/f3YhRerQ8jEAAAAd/hello-kitty.gif";
            document.querySelector('.title').innerHTML = "แงงง ยอมแล้ว 😭<br>กลับมาดีกันเถอะน้าาา ";
        }
    }
});

function spawnBackgroundMessage() {
    const msg = document.createElement('div');
    msg.classList.add('bg-message');
    msg.innerText = pleadingMessages[Math.floor(Math.random() * pleadingMessages.length)];

    // สุ่มตำแหน่งให้กล่องข้อความไม่ทะลุขอบจอ (รองรับจอมือถือ)
    const estimatedWidth = window.innerWidth < 400 ? 160 : 240;
    const maxX = Math.max(10, window.innerWidth - estimatedWidth);
    const maxY = Math.max(10, window.innerHeight - 80);

    // ตำแหน่งปลอดภัย
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);
    const rot = Math.random() * 20 - 10; // ให้กล่องเอียงนิดๆ แบบน่ารัก (-10 ถึง 10 องศา)

    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;
    msg.style.setProperty('--rot', rot);

    bgMessagesContainer.appendChild(msg);
}

function showSuccess() {
    mainContainer.classList.add('hidden');
    bgMessagesContainer.style.display = 'none'; // ซ่อนข้อความพื้นหลังตอนกดตกลง
    successScreen.classList.remove('hidden');

    const slider = document.getElementById('polaroid-slider');
    slider.innerHTML = '';

    successFlow.forEach((item, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';

        // Random slight rotation for natural polaroid look
        const randRot = (Math.random() * 8 - 4).toFixed(1);
        polaroid.style.setProperty('--rand-rot', randRot);

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = "Memory";
        img.draggable = false; // Prevent ghost drag on desktop

        const text = document.createElement('div');
        text.className = 'polaroid-text';
        text.innerText = item.text;

        polaroid.appendChild(img);
        polaroid.appendChild(text);
        slider.appendChild(polaroid);
    });

    videoFlow.forEach((item, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';

        // Random slight rotation for natural polaroid look
        const randRot = (Math.random() * 8 - 4).toFixed(1);
        polaroid.style.setProperty('--rand-rot', randRot);

        const video = document.createElement('video');
        video.src = item.video;
        video.controls = true;
        video.preload = "metadata";
        // Optionally add styling inline if needed, but css handles this now

        const text = document.createElement('div');
        text.className = 'polaroid-text';
        text.innerText = item.text;

        polaroid.appendChild(video);
        polaroid.appendChild(text);
        slider.appendChild(polaroid);
    });

    // Create floating sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, Math.random() * 2000);
    }
    setInterval(createSparkle, 500);
}

yesBtn.addEventListener('click', showSuccess);

// Drag to scroll logic for sliders (Desktop)
const sliders = [document.getElementById('polaroid-slider'), document.getElementById('cinema-slider')];

sliders.forEach(sl => {
    if (!sl) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    sl.addEventListener('mousedown', (e) => {
        // If the user clicks on the video, don't trigger the scroll drag
        if (e.target.tagName.toLowerCase() === 'video') return;

        isDown = true;
        sl.classList.add('active');
        startX = e.pageX - sl.offsetLeft;
        scrollLeft = sl.scrollLeft;
    });

    sl.addEventListener('mouseleave', () => {
        isDown = false;
        sl.classList.remove('active');
    });

    sl.addEventListener('mouseup', () => {
        isDown = false;
        sl.classList.remove('active');
    });

    sl.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sl.offsetLeft;
        const walk = (x - startX) * 2;
        sl.scrollLeft = scrollLeft - walk;
    });
});

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';

    // Randomize size slightly for depth
    const size = Math.random() * 6 + 3; // 3px to 9px
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    // Randomize speed
    sparkle.style.animationDuration = (Math.random() * 3 + 4) + 's';

    successScreen.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 8000);
}

// --- Movie Projection Logic ---
const videoUpload = document.getElementById('video-upload');
const movieModal = document.getElementById('movie-modal');
const closeMovieBtn = document.getElementById('close-movie');
const myVideo = document.getElementById('my-video');

if (videoUpload && movieModal && closeMovieBtn && myVideo) {
    videoUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            myVideo.src = fileURL;
            movieModal.classList.add('active');

            // Play video automatically when modal opens
            myVideo.play().catch(e => console.log('Autoplay blocked:', e));
        }
    });

    closeMovieBtn.addEventListener('click', () => {
        movieModal.classList.remove('active');
        myVideo.pause();
        myVideo.currentTime = 0;
        // Reset input so user can re-select the same or another video
        videoUpload.value = '';
    });
}

const slides = document.querySelectorAll('.movie-projector');

function updateActiveSlide() {
    slides.forEach(slide => slide.classList.remove('active'));

    let center = window.innerWidth / 2;

    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;

        if (Math.abs(center - slideCenter) < 100) {
            slide.classList.add('active');
        }
    });
}

document.getElementById('cinema-slider').addEventListener('scroll', updateActiveSlide);