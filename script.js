const texts = [
    "Hello, I am BALEX. Welcome to my website. I don't know what brought you here. But curiously lurking around is not a bad thing. Especially nowadays, with everything moving so quickly. And move quickly we will.",
    "If you want to play, we will play. You can’t really grow up until you have discovered the child within, my basketball coach used to say. And that stuck with me. And all the best lessons are learned from a playful story with a hard lesson carefully placed with, it seems.",
    "When I was in the army, the captain would scream out commands and we would all take it dead serious. We were not playing war. We were playing war for real. Just without the real part.",
    "Playing as a child felt real and you felt alive. Risk and reward could occur from only within the current game. And everything else could be forgotten. At least for the time being.",
    "Boom, snap back to reality. Dead serious shit. For real. Happening everywhere. All the time. But don’t forget to play. Play, play, play around as much as you can muster. It’s either that for the time being. Or not so much that, for other time beings.",
    "I like those dead serious games. Without the real part, initially. Those games that turn into real life scenarios, eventually. Play well now and you’ll be able to maneuver with low risks and high rewards. You're in it. It’s real."
];

let currentTextIndex = 0;
const typingSpeed = 60 / 2000; // 200 words per minute

let typingInProgress = false;

function typeText(element, text, delay, callback) {
    clearInterval(element.typeInterval); // Clear any existing intervals
    element.textContent = ''; // Clear the element's content before typing out the new text
    let index = 0;
    element.typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(element.typeInterval);
            if (callback) callback(); // Only call the callback if it's provided
        }
    }, delay);
}

function revealNewText() {
    if (currentTextIndex >= texts.length) return; // No more texts to reveal

    const initialTextElements = document.querySelectorAll('.initial-text');
    const text = texts[currentTextIndex];
    const button = document.getElementById('revealButton');

    button.style.display = 'none'; // Hide the button before typing starts

    // Split the text into paragraphs
    const paragraphs = text.split('\n');

    initialTextElements.forEach((element, index) => {
        // Retrieve the paragraph at the current index, or an empty string if none exists
        const paragraph = paragraphs[index] || ''; 
        typeText(element, paragraph, typingSpeed * 1000, () => {
            if (index === initialTextElements.length - 1) {
                button.style.display = 'inline-block'; // Display the button after typing completes
            }
        });
    });

    currentTextIndex++;
}




function revealInitialText() {
    const initialTextElements = document.querySelectorAll('.initial-text');
    const text = texts[currentTextIndex];
    initialTextElements.forEach((element, index) => {
        const paragraphs = text.split('\n');
        const paragraph = paragraphs[index] || ''; // Ensure paragraph exists, if not, use an empty string
        typeText(element, paragraph, typingSpeed * 1000, () => {
            if (index === initialTextElements.length - 1) {
                document.getElementById('revealButton').style.display = 'inline-block';
            }
        });
    });
    currentTextIndex++;
}

window.onload = function() {
    revealInitialText();
};

document.getElementById('revealButton').addEventListener('click', revealNewText);
