// build-all.js
const fs = require("fs-extra");
const csv = require("csv-parser");
const { execSync } = require("child_process");
const path = require("path");

const templatePath = path.join(__dirname, "template");
const buildPath = path.join(__dirname, "build");

async function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("websites.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

async function createApps() {
  const websites = await readCSV();

  for (const site of websites) {
    const appFolder = path.join(buildPath, site.domain);
    console.log(`\nCreating app for: ${site.domain}`);

    // 1. কপি টেমপ্লেট
    fs.copySync(templatePath, appFolder);

    // 2. src/data.json তৈরি
    const dataFilePath = path.join(appFolder, "src", "data.json");
    fs.writeFileSync(dataFilePath, JSON.stringify(site, null, 2));

    // 3. App.js এ data.json ইম্পোর্ট
    const appJsPath = path.join(appFolder, "src", "App.jsx");
    let appJsContent = fs.readFileSync(appJsPath, "utf-8");
    appJsContent = `
import data from "./data.json";
${appJsContent
  .replace("function App({ data })", "function App()")
  .replace("<Hero title={data.title} />", "<Hero title={data.title} />")
  .replace(
    "<Contact phone={data.phone} address={data.address} />",
    "<Contact phone={data.phone} address={data.address} />"
  )}
`;
    fs.writeFileSync(appJsPath, appJsContent);

    console.log(`Installing dependencies for ${site.domain}...`);
    execSync("npm install", { cwd: appFolder, stdio: "inherit" });

    console.log(`Building ${site.domain}...`);
    execSync("npm run build", { cwd: appFolder, stdio: "inherit" });
  }
}

createApps()
  .then(() => console.log("\nAll apps have been built successfully!"))
  .catch((err) => console.error("Error:", err));
