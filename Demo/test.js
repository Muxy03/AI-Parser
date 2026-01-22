import { parseMarkdown } from "../AI-Parser/Practical-Solution/dist/index.js";
import fs from "fs";
import path from "path";

// CONSTANTS
const CONFIG = {
  demoDir: "Demo",
  reportDir: "Reports",
  actualDir: "Actual",
  outputFile: "reports.html",
};

const PATHS = {
  reports: path.join(CONFIG.demoDir, CONFIG.reportDir),
  actual: path.join(CONFIG.demoDir, CONFIG.actualDir),
  index: path.join(CONFIG.demoDir, CONFIG.outputFile),
};

const STYLES = `
  body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; padding: 50px; color: #333; }
  h1 { text-align: center; color: #1e88e5; margin-bottom: 40px; }
  
  /* List Styles */
  ul { list-style: none; padding: 0; max-width: 600px; margin: 0 auto; }
  li { background: #fff; margin-bottom: 15px; border-radius: 8px; padding: 15px 20px; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; }
  li:hover { transform: scale(1.02); }
  a { text-decoration: none; color: #1e88e5; font-weight: bold; font-size: 1.1rem; display: block; }
  a:hover { text-decoration: underline; }

  /* Diff Styles */
  .container { display: flex; flex-direction: column; align-items: center; }
  .status-badge { padding: 5px 10px; border-radius: 5px; font-size: 0.9rem; color: white; }
  .status-badge.passed { background-color: #2e7d32; }
  .status-badge.failed { background-color: #d32f2f; }
  
  pre { background: #eef; padding: 10px; border-radius: 5px; overflow-x: auto; }
  .diff { font-family: monospace; background: #fff; padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
  .diff .added { color: #155724; background-color: #d4edda; }
  .diff .removed { color: #721c24; background-color: #f8d7da; }
  .diff .unchanged { color: #666; opacity: 0.6; }
`;

const escapeHtml = (str) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const getHtmlTemplate = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${STYLES}</style>
</head>
<body>
  ${content}
</body>
</html>`;

const DirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

// FUNCTIONS

function compareContent(expectedHtml, actualHtml) {
  const expectedLines = expectedHtml.split(/\r?\n/);
  const actualLines = actualHtml.split(/\r?\n/);
  const maxLength = Math.max(expectedLines.length, actualLines.length);

  let isMatch = expectedHtml.replace(/\s+/g, ' ').trim() === actualHtml.replace(/\s+/g, ' ').trim();
  
  let diffHtml = "";
  if (!isMatch) {
    for (let i = 0; i < maxLength; i++) {
      const exp = expectedLines[i];
      const act = actualLines[i];

      if (exp === act) {
        if (exp !== undefined)
          diffHtml += `<div class="unchanged">${escapeHtml(exp)}</div>\n`;
      } else {
        if (exp !== undefined)
          diffHtml += `<div class="removed">- ${escapeHtml(exp)}</div>\n`;
        if (act !== undefined)
          diffHtml += `<div class="added">+ ${escapeHtml(act)}</div>\n`;
      }
    }
  }

  return {
    status: isMatch ? "PASSED" : "FAILED",
    diffHtml,
  };
}

function createReportFile(name, md, expected, actual, diffHtml, status) {
  const badgeClass = status === "PASSED" ? "passed" : "failed";

  const content = `
    <h1>Test: ${name} <span class="status-badge ${badgeClass}">${status}</span></h1>
    
    <h2>Markdown Input</h2>
    <pre>${escapeHtml(md)}</pre>

    <h2>Expected HTML</h2>
    <pre>${escapeHtml(expected)}</pre>

    <h2>Actual HTML</h2>
    <pre>${escapeHtml(actual)}</pre>
    
    <h2>Diff</h2>
    <div class="diff">
    ${diffHtml}
    </div>
    `;

  const fullHtml = getHtmlTemplate(`Report - ${name}`, content);

  DirectoryExists(PATHS.reports);
  fs.writeFileSync(path.join(PATHS.reports, `${name}.report.html`), fullHtml);

  return status;
}

function runTest(htmlPath, mdPath) {
  const baseName = path.basename(mdPath, ".md");

  if (!fs.existsSync(mdPath) || !fs.existsSync(htmlPath)) {
    console.warn(`Skipped: Missing files for ${baseName}`);
    return;
  }

  try {
    const mdContent = fs.readFileSync(mdPath, "utf8");
    const expectedHtml = fs.readFileSync(htmlPath, "utf8").toString();
    const actualHtml = parseMarkdown(mdContent).html;

    DirectoryExists(PATHS.actual);
    fs.writeFileSync(path.join(PATHS.actual, `${baseName}.actual.html`), actualHtml);

    const { status, diffHtml } = compareContent(expectedHtml, actualHtml);

    createReportFile(
      baseName,
      mdContent,
      expectedHtml,
      actualHtml,
      diffHtml,
      status,
    );
  } catch (err) {
    console.error(`Error processing ${baseName}:`, err);
  }
}

function generateIndexFile() {
  if (!fs.existsSync(PATHS.reports)) return;

  const reportFiles = fs
    .readdirSync(PATHS.reports)
    .filter((f) => f.endsWith(".report.html"));

  const listItems = reportFiles
    .map((file) => {
      const name = file.replace(".report.html", "");
      return `<li><a href="${CONFIG.reportDir}/${file}" target="_blank">${name}</a></li>`;
    })
    .join("\n");

  const content = `
    <h1>Test Execution Results</h1>
    <ul>${listItems || "<li>No reports found.</li>"}</ul>
  `;

  fs.writeFileSync(PATHS.index, getHtmlTemplate("All Test Reports", content));
  console.log(`\n Master report generated at: ${PATHS.index}`);
}

(function main() {
  const args = process.argv.slice(2);

  const validArgs = args.filter(
    (a) => a.endsWith(".html") || a.endsWith(".md"),
  );

  console.log("Starting Test Suite...\n");

  for (let i = 0; i < validArgs.length; i += 2) {
    const htmlFile = validArgs[i];
    const mdFile = validArgs[i + 1];

    if (htmlFile && mdFile) {
      runTest(htmlFile, mdFile);
    }
  }

  generateIndexFile();
})();
