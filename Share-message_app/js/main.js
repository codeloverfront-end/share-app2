// // Target the inputs
const secretMessage = document.querySelector("#message");
const linkToSecret = document.querySelector("#link");
// Target the forms
const displaySecretMessage = document.querySelector(".secret");
const targetSecretForm = document.querySelector("#SM");
const targetSecretLink = document.querySelector("#LS");
// Target the font
const targetFontLink = document.querySelector(".fa-link");

// Target the balise "create your own message and h1"
const targetCreate = document.querySelector("#creator");
const targetH1 = document.querySelector("h1");
// // Making sure that only the first form is displayed
function homePage() {
  targetSecretLink.style.display = "none";
  displaySecretMessage.style.display = "none";
}
homePage();

// // If submitting the form where the secret message is contained, display only the form of the link
targetSecretForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let messageValue = secretMessage.value;
  console.log(messageValue);
  // // Making sure that the input isn't empty
  if (messageValue !== "") {
    // Encode it on base64
    const encoding64 = btoa(messageValue);
    if (encoding64) {
      console.log("Your message has been encoded on base 64");
    } else {
      if (!encoding64) {
        console.log("Your message hasn't been encoded on base 64");
      } else if (messageValue === "") {
        console.log("You didn't write any message");
      }
    }
    // Get the user input
    console.log("The secret form has been sent");
    targetSecretForm.style.display = "none";
    displaySecretMessage.style.display = "none";
    targetSecretLink.style.display = "block";
    // Hash my URL
    const url = new URL("https://mondomaine.com"); // Don't go on that link, when you will test the code : it's a site without any security measures
    try {
      url.hash = encoding64;
      secretMessage.value = url.href;
      console.log(url.href);
      linkToSecret.value = url.href;
      // if clicking on the link
      targetFontLink.addEventListener("click", () => {
        navigator.clipboard.writeText(linkToSecret.value);
        try {
          console.log("The link has been registered properly to the clipboard");
          alert("Your link has been well copied to the clipboard");
        } catch (error) {
          console.error("Error copying link to clipboard:", error);
          alert(
            "There has been a mistake on copying the link to clipboard, please try again"
          );
        }
      });
    } catch (error) {
      console.error("Error creating URL: ", error.message);
      if (url) {
        // To decode the message and display it on balise h1
        targetSecretForm.style.display = "none";
        displaySecretMessage.style.display = "none";
        targetSecretLink.style.display = "block";
        const encodingMessage = url.hash;
        const decodingMessage = atob(encodingMessage);
        targetH1.textContent = `${decodingMessage}`;
        // If I click on "create your own message"
        targetCreate.addEventListener("click", () => {
          homePage();
        });
      }
    }
  }
});
// Next step : managing the click on the symbol "link" to avoid copy and paste : done
// Next step : figuring out to access at the secret message
