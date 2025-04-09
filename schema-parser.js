
async function loadSchemaAndParseDialogue() {
    const schemaFile = new URLSearchParams(window.location.search).get("data") || "schema.xsd";
    const res = await fetch(schemaFile);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
  
    const statements = xml.getElementsByTagName("statement");
    const prompts = xml.getElementsByTagName("prompt");
  
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const prompt = prompts[i];
  
      let s = {
        role: stmt.getElementsByTagName("role")[0]?.textContent || "",
        caption: stmt.getElementsByTagName("caption")[0]?.textContent || "",
        sound: stmt.getElementsByTagName("sound")[0]?.textContent || ""
      };
  
      let p = null;
      if (prompt) {
        const answer = prompt.getElementsByTagName("answer")[0]?.textContent;
        const responses = Array.from(prompt.getElementsByTagName("response")).map(r => ({
          id: r.getElementsByTagName("id")[0]?.textContent,
          caption: r.getElementsByTagName("caption")[0]?.textContent,
          sound: r.getElementsByTagName("sound")[0]?.textContent
        }));
        p = { answer, responses };
      }
  
      dialogue.push({ statement: s, prompt: p });
    }
  
    renderStep();
  }
  
  window.onload = function () {
    if (window.scorm) scorm.init?.();
    loadSchemaAndParseDialogue();
  };
  