const shell = require('shelljs')
const path = "C:/Users/guili/Desktop/formation/test_mouli";
const fs = require('fs')
const axios = require('axios')

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const members = require('./members.js');

shell.cd(path);

(async () => {
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const { name, mail, git } = member;
    const folder = git.split('/').pop().split('.').shift();

    console.log(`Name: ${name}`);
    console.log(`Mail: ${mail}`);
    console.log(`Git: ${git}`);
    console.log(`Folder: ${folder}`);
    
    //git clone folder from git

    await shell.exec(`git clone ${git}`);
    await sleep(10000);
    await shell.exec(`rename ${folder} exercices`);
    await sleep(5000);
    await shell.exec("npm run test");
    await sleep(5000);
    fs.rmdirSync("exercices", { recursive: true });
    try {fs.rmdirSync(folder, { recursive: true });} catch (e) {}
    await sleep(5000);
    await shell.exec(`rename test-report.html ${mail}.html`)
    await sleep(1000);

    const content = fs.readFileSync(`${mail}.html`, "utf8");

    //continue;
    axios.post("https://api.sendinblue.com/v3/smtp/email", {
      sender: {
        name : "Guilian Ganster",
        email: "guilian.ganster@gmail.com"
      },
      to: [{
        name: name,
        email: mail
      }],
      subject: "mouli",
      htmlContent: content
    }, {
      headers: {
        "Content-Type": "application/json",
        "api-key": "xxx"
      }
    })

    console.log('-----------------');
  }
})()