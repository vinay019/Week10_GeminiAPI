const responsesDiv = document.getElementById("responses");
document.querySelector("form").addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
  event.preventDefault();

  const userPrompt = event.target.prompt.value.trim(); // make sure your input has name="prompt"
  console.log(userPrompt);

  if (!userPrompt) return; // optional guard

  try {
    const response = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }), // server expects "prompt"
    });

    const data = await response.json();
    console.log("server data:", data);

    const reply = data.reply ?? data; // handle { reply: "..."} or "..."
    const responseP = document.createElement("p");
    responseP.textContent = reply;
    responsesDiv.appendChild(responseP);
  } catch (err) {
    console.error("fetch error:", err);
  }
}
