export function bgMouseTracking() {
	var factor = 10;

	const app = document.getElementById('app')!;

	document.onmousemove = function (e) {
		// Adjust the division factor to control the movement speed
		var bgPosX = -e.clientX / factor + 'px';
		var bgPosY = -e.clientY / factor + 'px';

		app.style.backgroundPositionX = bgPosX;
		app.style.backgroundPositionY = bgPosY;
	};

}

export function typeText(text: string, el: HTMLElement, minDelay: number = 75, maxDelay: number = 175) {
	let index = 0;
	let emojiStartIndex: number = -1;
	let emojiEndIndex: number = -1;

	function typeNextCharacter() {
		// Base case: finished typing all characters or reached character limit
		if (index >= text.length) 
			return;

		if (text.includes('&#x', index) || text.includes('&#', index)) {
			// find the position of the emoji
			emojiStartIndex = text.indexOf('&#x', index) > -1 ? text.indexOf('&#x', index) : text.indexOf('&#', index);
			emojiEndIndex = text.indexOf(';', emojiStartIndex);
		}
		if (index === emojiStartIndex) {
			// emoji found, add it to the text container
			el.innerHTML += text.substring(emojiStartIndex, emojiEndIndex);
			index = emojiEndIndex;
		} else
			el.innerHTML += text[ index ];

		// Get a random delay for the next character
		const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
		setTimeout(typeNextCharacter, delay);
		index++;
	}

	// Start the typing effect
	typeNextCharacter();
}

// export function 



