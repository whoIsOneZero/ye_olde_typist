// Function to fetch transformed text from the cloud function
function fetchConvertedText(inputText) {
  console.log("Sending request with input text:", inputText);

  return fetch(
    "https://us-central1-ye-olde-typist.cloudfunctions.net/convert",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    }
  )
    .then((response) => {
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      return data.convertedText;
    })
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}

let typingTimeout;

// Function to transform text in the message box
function transformMessageBox() {
  const messageBox = document.querySelector('div[contenteditable="true"]');

  if (messageBox) {
    const originalText = messageBox.innerText;

    clearTimeout(typingTimeout);

    // Set a new timeout to perform the transformation after a delay
    typingTimeout = setTimeout(() => {
      fetchConvertedText(originalText).then((convertedText) => {
        if (convertedText) {
          messageBox.innerText = convertedText;
        }
      });
    }, 500);
  }
}

// Add an event listener to modify the text whenever the user types
document.addEventListener("input", (event) => {
  const messageBox = document.querySelector('div[contenteditable="true"]');
  if (messageBox && event.target === messageBox) {
    transformMessageBox();
  }
});

// Initialize on page load to apply transformations
transformMessageBox();
