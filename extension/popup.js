/* document.getElementById("convert-btn").addEventListener("click", function () {
  const inputText = document.getElementById("input-text").value;
  const outputText = convertToMedieval(inputText);
  document.getElementById("output-text").value = outputText;
});

function convertToMedieval(input) {
  let converted = input
    .replace(/\b(you|your)\b/g, "thou")
    .replace(/\b(are)\b/g, "art")
    .replace(/\b(is)\b/g, "be")
    .replace(/\b(am)\b/g, "be");
  return converted;
} */

document.getElementById("convert-btn").addEventListener("click", function () {
  const inputText = document.getElementById("input-text").value;

  console.log("Sending request with input text:", inputText);

  fetch("https://us-central1-ye-olde-typist.cloudfunctions.net/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: inputText }),
  })
    .then((response) => {
      console.log("Response received:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      document.getElementById("output-text").value = data.convertedText;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
