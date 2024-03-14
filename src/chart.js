import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs";
import sharp from "sharp";

const WIDTH = 3000;
const HEIGHT = 1200;
const BG_COLOR = "white";

export class LineChart {
  constructor() {
    this.chart = new ChartJSNodeCanvas({
      width: WIDTH,
      height: HEIGHT,
      backgroundColour: BG_COLOR,
    });
  }

  async getChartImage({ name = "", data, labels }) {
    return await this.chart.renderToBuffer({
      type: "line",
      data: {
        labels: labels || data,
        datasets: [
          {
            label: name,
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 1,
            pointRadius: 0,
          },
        ],
      },
    });
  }

  async getDoubleChart(datasets, name, path) {
    const chart1 = await this.getChartImage({ data: datasets[0] });
    const chart2 = await this.getChartImage({ data: datasets[1] });

    await sharp({
      create: {
        width: WIDTH,
        height: 2 * HEIGHT,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: chart1, top: 0, left: 0 },
        { input: chart2, top: HEIGHT, left: 0 },
      ])
      .toFile(`${path}/${name}`);
  }

  async saveChartImage({ name = "", data, labels }) {
    const image = await this.getChartImage({ name, data, labels });

    fs.writeFileSync(name, image);
  }
}
