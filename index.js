import fs from "fs";
import path from "path";
import { LineChart } from "./src/chart.js";

const args = process.argv.slice(2);
const folderPath = args[0] || "mes";

(async () => {
  const data = {};

  try {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf8");

      const dataset = content.split(/\r?\n/).slice(2);
      const middleIndex = Math.ceil(dataset.length / 2);

      const firstHalf = dataset.slice(0, middleIndex);
      const secondHalf = dataset.slice(middleIndex);

      data[file] = {
        firstHalf,
        secondHalf,
      };
    });

    const chart = new LineChart();
    for (const [key, value] of Object.entries(data)) {
      await chart.getDoubleChart(
        [value.firstHalf, value.secondHalf],
        `${key.replace("MES", "png")}`,
        folderPath
      );
    }
  } catch (err) {
    console.error("Wystąpił błąd:", err);
  }
})();
