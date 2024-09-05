const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

  
    fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
        method: "GET",
        headers: {
            "X-Api-Key": "KY2o2ikEIDh555YyZcLmXA==sVnkps0MLis246M4"  
        }
    })
    .then(response => response.json())
    .then(data => {
        quoteText.innerText = data[0].quote; 
        authorName.innerText = data[0].author; 
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    })
    .catch(error => {
        console.error("Error fetching quote:", error);
        quoteText.innerText = "Failed to fetch a quote. Please try again.";
        authorName.innerText = "";
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`${quoteText.innerText} - ${authorName.innerText}`);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)} - ${encodeURIComponent(authorName.innerText)}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);


randomQuote();
