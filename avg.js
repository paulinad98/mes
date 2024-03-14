import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const folderPath = args[0] || "mes/avg";
const deletedElementsCount = +args[1] || 2;

function generateCombinations(N, C) {
  const result = [];
  const numbers = Array.from({ length: N }, (_, i) => i);
  const setSize = N - C;

  const findCombinations = (start, combination) => {
    if (combination.length === setSize) {
      result.push([...combination]);
      return;
    }

    for (let i = start; i < numbers.length; i++) {
      combination.push(numbers[i]);
      findCombinations(i + 1, combination);
      combination.pop();
    }
  };

  findCombinations(0, []);
  return result;
}

(async () => {
  const mesData = [];
  const avgSet = [];

  try {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      if (!file.includes(".MES")) return;

      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf8");

      const dataset = content.split(/\r?\n/).slice(2);

      mesData.push(dataset);
    });

    const combinations = generateCombinations(
      mesData.length,
      deletedElementsCount
    );

    combinations.forEach((combination, combinationIndex) => {
      const avg = [];

      combination.forEach((mesIndex) => {
        for (let i = 0; i < mesData[mesIndex].length; i++) {
          avg[i] = (Number(avg[i]) || 0) + Number(mesData[mesIndex][i]);
        }
      });

      avgSet[combinationIndex] = avg.map(
        (n) => n / (mesData.length - deletedElementsCount)
      );
    });

    avgSet.forEach((avg, index) => {
      const name = `avg-${index}.MES`;
      const path = folderPath;

      fs.writeFileSync(path + "/" + name, avg.join("\n"));
    });
  } catch (err) {
    console.error("Wystąpił błąd:", err);
  }
})();
