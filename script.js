// script.js

// ==========================================
// 🎵 CREATOR SETTINGS (ตั้งค่าสำหรับผู้สร้าง) 🎵
// ==========================================
// ใส่ชื่อไฟล์เพลงที่ต้องการให้เล่นในหน้าตู้กาชาปอง
const GACHA_MUSIC_FILE = "2222.mp3"; // เปลี่ยนชื่อไฟล์ตรงนี้

// ใส่ชื่อไฟล์เพลง (เช่น .mp3, .mp4) ที่ต้องการให้เล่นตอนเป็นจดหมาย
// เช่น "music.mp3" หรือลิงก์เพลง ถ้าไม่มีปล่อยว่างเป็น ""
const BG_MUSIC_FILE = "1111.mp3"; // เปลี่ยนชื่อไฟล์ตรงนี้นะครับ
// ==========================================

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
    "เบื่อกันแล้วหรอ "
];

const successFlow = [
    { text: "ที่ๆเราไปเที่ยวคาเฟ่ด้วยกัน ถึงแม้เค้าจะถ่ายได้ไม่ดีแต่เค้าก็ตั้งใจนะะ", img: "1.jpg" },
    { text: "เค้าคิดถึงเธอมากๆเลยนะ ตอนปีใหม่ที่เราไปบ้านนัท ที่เธอบอกกกันว่าเรามาอยู่ด้วยกันทุกปีเลยนะ", img: "2.jpg" },
    { text: "วันเกิดเธอครั้งนั้นเค้าตั้งใจสั่งเค้กให้เธอเลยนะ ถึงแม้จะไม่ได้มีของขวัญให้เค้าขอโทษนะ", img: "3.jpg" },
    { text: "วันนั้นไปรอเธอที่คลินิกเธอหน้าสดแต่เค้าก็ชอบ", img: "4.jpg" },
    { text: "ขอบคุณจริงๆนะ ตอนนั้นเธอชวนออกมากินฮาจิบังจำได้ว่าเค้าใส่เสื้อยางรถยนต์ มีความสุขจริงๆ", img: "5.jpg" },
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
    { text: "วันที่เราเลิกกันแล้วเจอกันครั้งแรก", img: "24.jpg" },
    { text: "วันนั้นคือวันที่ไปคาเฟ่ เค้าได้รูปโปรใหม่เพราะเธอ", img: "25.jpg" },
    { text: "เอาโทรศัพท์เค้าไปถ่ายตอนไหนเนี่ย", img: "27.jpg" },
    { text: "เธอให้ถ่ายวันที่เธอลองเปลี่ยนลุคใหม่ เค้าชอบมากเธอใส่กระโปรงเป็นครั้งแรกที่เห็น", img: "31.jpg" },
    { text: "เธอใส่กระโปรงวันนี้เรามากินซูชิโรกันต่อด้วยกัน", img: "32.jpg" },
    { text: "แอบถ่ายตอนเธอมาหอเค้า มาทีไรหลับตลอด", img: "33.jpg" },
    { text: "เราไปปั่นเป็ดด้วยกันครั้งแรก เหนื่อยหน่อยๆแต่สนุกมาก", img: "34.jpg" },
    { text: "วันที่เรามารอคาราโอเกะ เค้าทำหน้างี้ตลอดเลย 5555 เมื่อก่อน", img: "35.jpg" },
    { text: "วันที่เรามารอคาราโอเกะ พร้อมจะร้องแทททูละ", img: "36.jpg" },
    { text: "กลับหลังจากกินหมูกะทะจ่าอู่ เราเดินกลับพร้อมท้องป่อง", img: "37.jpg" },
    { text: "เรากิน AKA ด้วยกัน นานๆทีกิน", img: "38.jpg" },
    { text: "ขากลับที่เราไปเล่นเกม ถ่ายรูป คาเฟ่สวยมาก", img: "39.jpg" },
    { text: "กินบุฟเฟ่ หมูเกาหลี จำได้แค่เหนียวมากแต่ฟิลดี", img: "40.jpg" },
    { text: "กินบุฟเฟ่ หมูเกาหลี ถ่ายตอนเผลอ", img: "41.jpg" },
    { text: "กินหมูกะทะ ตอนคบกันแรก เค้าเนิร์ดจัง", img: "42.jpg" },
    { text: "ราชินีหมูกะทะ ตัวจริง", img: "43.jpg" },
    { text: "กินย่างเนยยย อีกแล้ววววว", img: "45.jpg" },
    { text: "กินร้านอาหารที่สายหยุด เราไม่ได้กินนานละ ขนมหวานอร่อย", img: "46.jpg" },
    { text: "กิน EAT AM ARE เค้าชอบรูปนี้มากบอกไม่ถูกน่ารักกก", img: "47.jpg" },
    { text: "ตอนเราเจอกันแรกๆ เธอกินยำปลากระป๋องมั้ง กินเผ็ดๆ เหมือนตอนนั้นเราไปเดินห้างอะไรสักอย่าง", img: "48.jpg" },
    { text: "รูปแรกที่ยูเนี่ยนมอ ในอัลบั้มไลน์ ใส่ชุด น.ศ. ดั้วะ ยังติ๋มๆ", img: "49.jpg" },
    { text: "เรามากิน Pepper Launch เจอเธอแรกๆ ชอบใส่แมส", img: "50.jpg" },
    { text: "เจอกันตอนแรกสุดเลย หน้ากรม เธอใส่แมส ยิ้มแฉ่ง กินอาหารญี่ปุ่นนน", img: "51.jpg" },
    { text: "เค้ามาส่งเธอ จำได้ว่าเราน่าจะกอดกันครั้งแรก อยู่บน BTS", img: "52.jpg" },
    { text: "มาเที่ยว Union เรามานั่งรอคิวคาราโอเกะตรงบันไดเลื่อน เธอง่วงเลยให้เธอนอนซบไหล่", img: "53.jpg" },
    { text: "กิน Pepper Launch เหมือนเราจะกินตรงเซนลาดชั้นล่างสุด", img: "54.jpg" },
    { text: "เจอเธอครั้งแรกๆเหมือนกัน เรากินจำได้ว่าตำอะไรสักอย่าง", img: "55.jpg" },
    { text: "ขากลับที่จ่าอู่ ยิ้มเดินกลับย่อยอาหาร", img: "57.jpg" },
    { text: "เธอตอนเราไปเที่ยวและกลับ BTS ด้วยกัน", img: "30.jpg" },
];

const videoFlow = [
    { text: "มากินพาสต้ากันหน้ากรมเค้า", video: "19.mp4" },
    { text: "HNY ปีที่เราไปดูเบียดกัน ตอนแรกนึกว่าจะเป็นแบบอีแทวอน", video: "20.mp4" },
    { text: "พาเธอไปเล่นเครื่องเล่นที่เซนทรัลรามอินทรา", video: "21.mp4" },
    { text: "วันที่เราไปเล่นเกมด้วยกัน ถ่ายรูปด้วยกัน เธอเล่นไม่ค่อยเก่งเลยเค้าต้องรอ 555", video: "22.mp4" },
    { text: "เธอเอาโทรศัพท์เค้าไปเล่น ตอนนั้นอยู่ที่แมคโดนัลล", video: "23.mp4" },
    { text: "วันที่ไปฉลองวันเกิดเธอ เค้าประหม่ามาก หรูสุดๆ เธอสวยมากวันนั้น", video: "26.mp4" },
    { text: "เธอเอาโทรศัพท์เค้าไปเล่น ตอนนั้นอยู่ที่แมคโดนัลล", video: "23.mp4" },
    { text: "เราพยายามดูคอนเสิร์ตแทททูด้วยกันแต่สุดท้ายติดที่เลนข้างทาง", video: "28.mp4" },
    { text: "เราพยายามดูคอนเสิร์ตแทททูด้วยกันแต่สุดท้ายติดที่เลนข้างทาง", video: "29.mp4" },
    { text: "เธอฝึกพูดกับกล้องครั้งแรกๆ ไปกินย่างเนยยย", video: "44.mp4" },
    { text: "เราลองสั่งสติกเกอร์ ชื่อเพื่อน เอามาแปะหลังเคสเค้าที่ หอประชุมศิริกิต", video: "56.mp4" },
    { text: "เค้าขัดขวางไม่ให้ถ่ายยยยย", video: "58.mp4" },
    { text: "ย่างเนย โดนใช้ให้ไปเอาหมู", video: "59.mp4" },
    { text: "ขากลับ BTS น่ารักน่าชัง", video: "60.mp4" },
    { text: "กินบิงซูอ้วนนนน", video: "61.mp4" },
    { text: "เธอมาหอ ให้เล่นเกมปลูกผัก เด็กติดเกมจริงๆ", video: "62.mp4" },
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

// Combine items
const gachaPool = [...successFlow, ...videoFlow];
let remainingPool = [...gachaPool];
let drawnItems = [];

function showSuccess() {
    mainContainer.classList.add('hidden');
    bgMessagesContainer.style.display = 'none'; // ซ่อนข้อความพื้นหลังตอนกดตกลง
    successScreen.classList.remove('hidden');

    if (GACHA_MUSIC_FILE && gachaBgAudio) {
        gachaMusicControls.classList.remove('hidden');
        gachaBgAudio.play().catch(e => console.log("Audio play blocked by browser:", e));
    }

    // Create floating sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, Math.random() * 2000);
    }
    setInterval(createSparkle, 500);
}

yesBtn.addEventListener('click', showSuccess);

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

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 8000);
}

// --- Gacha Logic ---
const gachaBgAudio = document.getElementById('gacha-bg-audio');
const gachaMusicControls = document.getElementById('gacha-music-controls');
const gachaVolumeSlider = document.getElementById('gacha-volume-slider');

if (GACHA_MUSIC_FILE && gachaBgAudio) {
    gachaBgAudio.src = GACHA_MUSIC_FILE;
    gachaBgAudio.volume = gachaVolumeSlider.value / 100;
    
    gachaVolumeSlider.addEventListener('input', (e) => {
        gachaBgAudio.volume = e.target.value / 100;
    });
}

const drawGachaBtn = document.getElementById('draw-gacha-btn');
const nextLetterBtn = document.getElementById('next-letter-btn');
const gachaMachine = document.getElementById('gacha-machine');
const gachaModal = document.getElementById('gacha-modal');
const gachaResult = document.getElementById('gacha-result');
const letterScreen = document.getElementById('letter-screen');

drawGachaBtn.addEventListener('click', () => {
    if (remainingPool.length === 0) {
        alert("เปิดดูความทรงจำครบหมดแล้วน้าา 💖 (เดี๋ยวเริ่มใส่ตู้ให้ใหม่นะ)");
        remainingPool = [...gachaPool]; // Reset pool
    }

    // Shake animation
    gachaMachine.classList.add('shake');
    drawGachaBtn.disabled = true;

    setTimeout(() => {
        gachaMachine.classList.remove('shake');

        // Pick random item without replacement
        const randomIndex = Math.floor(Math.random() * remainingPool.length);
        const item = remainingPool.splice(randomIndex, 1)[0];

        // Add to history
        drawnItems.push(item);

        showGachaResult(item);
        drawGachaBtn.disabled = false;

    }, 600); // Wait for shake animation to finish
});

function showGachaResult(item) {
    gachaResult.innerHTML = '';

    const randRot = (Math.random() * 8 - 4).toFixed(1);
    gachaResult.style.setProperty('--rand-rot', randRot);
    gachaResult.style.transform = `rotate(${randRot}deg)`; // Apply immediately for modal

    if (item.video) {
        const video = document.createElement('video');
        video.src = item.video;
        video.controls = true;
        video.autoplay = true;
        gachaResult.appendChild(video);
    } else if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = "Memory";
        gachaResult.appendChild(img);
    }

    const text = document.createElement('div');
    text.className = 'polaroid-text';
    text.innerText = item.text;
    gachaResult.appendChild(text);

    gachaModal.classList.add('show');
}

gachaModal.addEventListener('click', (e) => {
    // Only close if we click outside the video controls
    if (e.target.tagName.toLowerCase() !== 'video') {
        gachaModal.classList.remove('show');
        // Pause video if playing
        const vid = gachaResult.querySelector('video');
        if (vid) vid.pause();
    }
});

// --- Navigation to Letter ---
let floatingImagesInterval;
const floatingImagesContainer = document.getElementById('floating-images-container');

function spawnFloatingImages() {
    if (!floatingImagesContainer || gachaPool.length === 0) return;
    
    // Spawn 3 random images/videos
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * gachaPool.length);
        const item = gachaPool[randomIndex];
        
        const el = document.createElement(item.video ? 'video' : 'img');
        el.src = item.video || item.img;
        if (item.video) {
            el.muted = true;
            el.autoplay = true;
            el.loop = true;
            el.playsInline = true;
        }
        
        el.classList.add('floating-image');
        
        // Randomize size based on screen width
        const isMobile = window.innerWidth < 600;
        const minSize = isMobile ? 45 : 80;
        const maxSize = isMobile ? 90 : 160;
        const size = Math.random() * (maxSize - minSize) + minSize; 
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        
        // Random horizontal start position
        const left = Math.random() * 80 + 5; // 5vw to 85vw to keep mostly on screen
        el.style.left = left + 'vw';
        
        // Randomize duration (speed)
        const duration = Math.random() * 8 + 12; // 12s to 20s
        el.style.animationDuration = duration + 's';
        
        // Random rotation
        const rotStart = parseFloat((Math.random() * 40 - 20).toFixed(1)) + 'deg';
        const rotEnd = parseFloat((Math.random() * 180 - 90).toFixed(1)) + 'deg';
        el.style.setProperty('--rot-start', rotStart);
        el.style.setProperty('--rot-end', rotEnd);
        
        // Random opacity max
        const maxOpacity = (Math.random() * 0.2 + 0.2).toFixed(2); // 0.2 to 0.4 opacity
        el.style.setProperty('--max-opacity', maxOpacity);
        
        floatingImagesContainer.appendChild(el);
        
        // Cleanup after animation finishes
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }
}

nextLetterBtn.addEventListener('click', () => {
    successScreen.classList.add('hidden');
    letterScreen.classList.remove('hidden');
    
    if (GACHA_MUSIC_FILE && gachaBgAudio) {
        gachaBgAudio.pause();
    }
    
    // Start floating images animation
    if (!floatingImagesInterval) {
        spawnFloatingImages(); // spawn first batch
        floatingImagesInterval = setInterval(spawnFloatingImages, 3500); // spawn 3 images every 3.5 seconds
    }
});

// --- History Logic ---
const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeHistoryBtn = document.getElementById('close-history-btn');
const historyGrid = document.getElementById('history-grid');

historyBtn.addEventListener('click', () => {
    historyGrid.innerHTML = '';
    if (drawnItems.length === 0) {
        historyGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; margin-top: 2rem; color: #ff66a3;">ยังไม่ได้สุ่มความทรงจำเลย ลองสุ่มดูก่อนนะ 💕</p>';
    } else {
        drawnItems.forEach((item) => {
            const el = document.createElement('div');
            el.className = 'history-item';

            let mediaHtml = '';
            if (item.video) {
                mediaHtml = `<video src="${item.video}" preload="metadata"></video>`;
            } else {
                mediaHtml = `<img src="${item.img}" alt="Memory">`;
            }

            el.innerHTML = `
                ${mediaHtml}
                <p>${item.text}</p>
            `;

            // Re-open gacha modal to view bigger
            el.addEventListener('click', () => {
                showGachaResult(item);
            });

            historyGrid.appendChild(el);
        });
    }
    historyModal.classList.remove('hidden');
});

closeHistoryBtn.addEventListener('click', () => {
    historyModal.classList.add('hidden');
});

// --- Envelope Logic ---
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelope-hint');
const bgAudio = document.getElementById('bg-audio');
const musicControls = document.getElementById('music-controls');
const volumeSlider = document.getElementById('volume-slider');

// Setup Audio
if (BG_MUSIC_FILE) {
    bgAudio.src = BG_MUSIC_FILE;
    bgAudio.volume = volumeSlider.value / 100;
    musicControls.classList.remove('hidden');

    volumeSlider.addEventListener('input', (e) => {
        bgAudio.volume = e.target.value / 100;
    });
}

envelopeWrapper.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        envelopeHint.innerText = "ตั้งใจอ่านนะ!!";
        if (BG_MUSIC_FILE) {
            bgAudio.play().catch(e => console.log("Audio play blocked by browser:", e));
        }
    }
});