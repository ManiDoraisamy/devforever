const fs = require("fs");
const {openai} = require("../prompt");

function countCharactersUsingJS()
{
  var start = Date.now();
  const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  console.log('JS: ' + text.replace(/\r/g, '').length, 'in ' + (Date.now() - start) + 'ms');
}

const system = `
Count every character including spaces and newlines 
i.e. the total length as written in the text.
Return only the number of characters.
Do not ask further questions.
  `.trim();

function countCharactersWithoutTool()
{
  var start = Date.now();
  const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  return openai(system, text, {model:'gpt-5-mini', tools:[]})
  .then(response =>console.log('OpenAI without tool: ' + response, 'in ' + (Date.now() - start) + 'ms'));
}

function countCharactersWithTool()
{
  var start = Date.now();
  const text = fs.readFileSync("src/lossy/mother-tongue.md", "utf8");
  var tools = [
    {
      type: "code_interpreter",
      container: { type: "auto", memory_limit: "4g" }
    }
  ];
  return openai(system, text, {model:'gpt-5-mini', tools})
  .then(response =>console.log('OpenAI with tool: ' + response, 'in ' + (Date.now() - start) + 'ms'));
}

countCharactersUsingJS();
countCharactersWithoutTool();
countCharactersWithTool();

/* Results:

JS: 3443 in 1ms
OpenAI with tool: 3443 in 25849ms
OpenAI without tool: 3440 in 194271ms

*/