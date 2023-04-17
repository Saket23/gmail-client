const synth = window.speechSynthesis;

const headerTitle = document.getElementById("header-title")

function speak(text) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(text);
  console.log(utterThis)
  utterThis.onend = function (event) {
    console.log("SpeechSynthesisUtterance.onend");
  };

  utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror", event);
  };

    const selectedOption = 'Google हिन्दी';
    const voices = synth.getVoices()

    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
            break;
        }
    }

  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);

}

function handleClick(e, data){
    speak(`You have received email from ${data.from} with subject ${data.subject} with email body as ${data.body}`);
}

window.onload = async () => {
    speak('Loading the first email')
    const response = await fetch("http://localhost:8000/api/mail/readFirstMail");
    const jsonData = await response.json();
    console.log(jsonData);
    const from = document.getElementById("from")
    const subject = document.getElementById("subject")
    const body  = document.getElementById("body")
    from.innerHTML = `From: ${jsonData.from}`;
    subject.innerHTML = `Subject: ${jsonData.subject}`;
    body.innerHTML = `Body: ${jsonData.body}`;
    headerTitle.innerHTML="Click anywhere to listen the first email";
    speak("Click anywhere to listen the first email");

    window.addEventListener("click", (e) => handleClick(e, jsonData));  
}
