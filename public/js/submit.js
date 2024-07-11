// document.addEventListener('DOMContentLoaded', () => {
//   const checkBtn = document.getElementById('check-btn');
//   const nextBtn = document.getElementById('next-btn');

//   nextBtn.addEventListener('click', () => {
//     console.log('click');
//     // Add your logic for the next button here
//   });

//   checkBtn.addEventListener('click', () => {
//     console.log('click');
//     // Add your logic for the check button here
//   });

//   const textContainer = document.getElementById('spell-word');
//   const deleteKey = document.querySelector('.delete');
//   const spaceKey = document.querySelector('.space');
//   const capsLock = document.querySelector('.capslock');
//   const allKey = document.querySelectorAll('.key');
//   let isCaps = false;

//   let isTypingWithKeyboard = false;

//   // Function to update the cursor position
//   function updateCursor(cursorIndex) {
//     let content = textContainer.value;
//     content = content.replace('|', '');

//     if (cursorIndex >= 0 && cursorIndex <= content.length) {
//       textContainer.value = `${content.slice(0, cursorIndex)}|${content.slice(cursorIndex)}`;
//     }
//   }

//   // Function to handle typing
//   function handleTyping(text) {
//     let content = textContainer.value;
//     let cursorIndex = content.indexOf('|');

//     if (cursorIndex === -1) {
//       content += text;
//       cursorIndex = content.length;
//     } else {
//       content =
//         content.slice(0, cursorIndex) + text + content.slice(cursorIndex);
//       cursorIndex += text.length;
//     }

//     textContainer.value = content.replace('|', '');
//     updateCursor(cursorIndex); // Move cursor beside the last letter typed
//   }

//   // Add event listener for physical keyboard typing
//   document.addEventListener('keydown', event => {
//     const { key } = event;

//     // Set the flag for keyboard input
//     isTypingWithKeyboard = true;

//     if (key === 'Backspace') {
//       const cursorIndex = textContainer.value.indexOf('|');
//       if (cursorIndex > 0) {
//         textContainer.value =
//           textContainer.value.slice(0, cursorIndex - 1) +
//           textContainer.value.slice(cursorIndex);
//         updateCursor(cursorIndex - 1);
//       }
//     } else if (key === 'Enter') {
//       handleTyping('\n');
//     } else if (key === ' ') {
//       handleTyping('\u00A0');
//     } else if (key === 'CapsLock') {
//       capsLock.click();
//     } else if (key.length === 1) {
//       handleTyping(isCaps ? key.toUpperCase() : key.toLowerCase());
//     }
//   });

//   // Add event listeners for on-screen keyboard clicks
//   allKey.forEach(key => {
//     key.addEventListener('click', () => {
//       if (
//         key.classList.contains('delete') ||
//         key.classList.contains('enter') ||
//         key.classList.contains('space') ||
//         key.classList.contains('capslock')
//       ) {
//         return;
//       }

//       // Handle typing only if not typing with the keyboard
//       if (!isTypingWithKeyboard) {
//         handleTyping(key.innerText);
//       }

//       // Reset the flag after handling the click
//       isTypingWithKeyboard = false;
//     });
//   });

//   // Initialize cursor on load
//   updateCursor(0);

//   deleteKey.addEventListener('click', () => {
//     const textContainerContent = textContainer.value;
//     if (textContainerContent.length === 0) {
//       return;
//     }

//     const cursorIndex = textContainerContent.indexOf('|');
//     if (cursorIndex > 0) {
//       textContainer.value =
//         textContainerContent.slice(0, cursorIndex - 1) +
//         textContainerContent.slice(cursorIndex);
//       updateCursor(cursorIndex - 1);
//     }
//   });

//   spaceKey.addEventListener('click', () => {
//     handleTyping('\u00A0');
//   });

//   capsLock.addEventListener('click', () => {
//     if (isCaps) {
//       capsLock.classList.remove('active');
//       allKey.forEach(key => {
//         if (
//           key.classList.contains('delete') ||
//           key.classList.contains('enter') ||
//           key.classList.contains('space') ||
//           key.classList.contains('capslock')
//         ) {
//           return;
//         }
//         key.innerText = key.innerText.toLowerCase();
//       });
//     } else {
//       capsLock.classList.add('active');
//       allKey.forEach(key => {
//         if (
//           key.classList.contains('delete') ||
//           key.classList.contains('enter') ||
//           key.classList.contains('space') ||
//           key.classList.contains('capslock')
//         ) {
//           return;
//         }
//         key.innerText = key.innerText.toUpperCase();
//       });
//     }
//     isCaps = !isCaps;
//   });
// });
