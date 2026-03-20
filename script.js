// script.js
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContainer = document.getElementById('main-container');
const successScreen = document.getElementById('success-screen');
const bgMessagesContainer = document.getElementById('bg-messages-container');
const successMessage = document.getElementById('success-message');
const nextBtn = document.getElementById('next-btn');
const successImg = document.getElementById('success-img');

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
    { text: "เย้! ดีใจที่สูดดดดดดดดดดด", img: "https://i.pinimg.com/originals/f8/2f/6d/f82f6d8e11c243cd4a867657d1416a87.gif" },
    { text: "เค้าคิดถึงเธอมากๆเลยนะ", img: "https://i.pinimg.com/736x/39/d4/27/39d4271e2660c4193725a697ee8c9e6f.jpg" },
    { text: "ขอบคุณที่ยอมให้โอกาสเค้าอีกครั้ง ", img: "https://i.pinimg.com/736x/03/26/0b/03260be99ed6e815bda003ee8217ff2a.jpg" },
    { text: "สัญญาว่าจะทำตัวให้ดีขึ้น 🥺", img: "https://i.pinimg.com/1200x/fb/cc/43/fbcc43003276a217c2c80b241342f53c.jpg" },
    { text: "ขอบคุณจริงๆนะ เค้ารักเธอนะ 💖", img: "https://i.pinimg.com/736x/86/e0/47/86e047c1331c101d4a7e5dd9d0812ff9.jpg" }
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

    // สุ่มตำแหน่งให้กล่องข้อความไม่ทะลุขอบจอ (สมมติความกว้างกล่องสูงสุดน่าจะ 220px สูง 60px)
    const maxX = window.innerWidth - 240;
    const maxY = window.innerHeight - 80;

    // ตำแหน่งปลอดภัย
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
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

    // Create floating sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, Math.random() * 2000);
    }
    setInterval(createSparkle, 500);
}

yesBtn.addEventListener('click', showSuccess);

// การแสดงข้อความต่อเนื่องทีละประโยค
nextBtn.addEventListener('click', () => {
    currentMsgIndex++;
    if (currentMsgIndex < successFlow.length) {
        successMessage.style.opacity = '0';
        successImg.style.opacity = '0';
        setTimeout(() => {
            successMessage.innerText = successFlow[currentMsgIndex].text;
            if (successFlow[currentMsgIndex].img) {
                successImg.src = successFlow[currentMsgIndex].img;
            }
            successMessage.style.opacity = '1';
            successImg.style.opacity = '1';
            successImg.style.transition = 'opacity 0.3s ease';
        }, 300);

        if (currentMsgIndex === successFlow.length - 1) {
            // ซ่อนปุ่มเมื่อถึงข้อความสุดท้าย
            nextBtn.style.display = 'none';
        }
    }
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
