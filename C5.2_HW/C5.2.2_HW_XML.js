const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`

function getResultObj (xmlString) {
  const parser = new DOMParser;
  const xmlDOM = parser.parseFromString(xmlString, "text/xml");
  const studentNode = xmlDOM.querySelectorAll("student");
  let result = {};
  result.list = [];
  studentNode.forEach(function (element, index) {
    let nameNode = element.querySelector("name");
    let firstNameNode = element.querySelector("first");
    let secondNameNode = element.querySelector("second");
    let ageNode = element.querySelector("age");
    let profNode = element.querySelector("prof");
    let langAttr = nameNode.getAttribute("lang");
    
    let obj = {
      name: firstNameNode.textContent + " " + secondNameNode.textContent,
      age: Number(ageNode.textContent),
      prof: profNode.textContent,
      lang: langAttr,
    };
    result.list.push(obj);
  });
  return result
};

const result = getResultObj(xmlString);
console.log(result);
