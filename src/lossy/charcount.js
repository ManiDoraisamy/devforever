const fs = require("fs");
const {openai} = require("../prompt");

function countCharactersUsingJS()
{
  const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  console.log('JS: ' + text.replace(/\r/g, '').length);
}

const system = `
Count every character including spaces and newlines 
i.e. the total length as written in the text.
Return only the number of characters.
Do not ask further questions.
  `.trim();

function countCharactersWithoutTool()
{ const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  return openai(system, text, {model:'gpt-5-mini', tools:[]})
  .then(response =>console.log('OpenAI without tool: ' + response));
}

function countCharactersWithTool()
{ const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  var tools = [
    {
      type: "code_interpreter",
      container: { type: "auto", memory_limit: "4g" }
    }
  ];
  return openai(system, text, {model:'gpt-5-mini', tools})
  .then(response =>console.log('OpenAI with tool: ' + response));
}

countCharactersUsingJS();
countCharactersWithoutTool();
countCharactersWithTool();

/* Results:

JS: 5352
OpenAI with tool: 5352
OpenAI without tool: 5349

*/