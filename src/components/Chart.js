import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from "./ChartDraw";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedOx = event.target["ox"].value;
    const selectedOy = [
      event.target["oy-max"].checked,
      event.target["oy-min"].checked,
    ];

    const selectedChartType = event.target["chartType"].value;

    if (!selectedOy[0] && !selectedOy[1]) {
      setError("Выберите хотя бы одну метрику по оси OY.");
      return;
    }

    setError("");
    setOx(selectedOx);
    setOy(selectedOy);
    setChartType(selectedChartType);
    setData(createArrGraph(props.data, selectedOx));
  };

  const handleClear = () => {
    setData([]);
    setError("");
  };

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, (d) => d[key]);
    let arrGraph = [];

    for (let [groupName, groupItems] of groupObj) {
      let max = d3.max(groupItems, (d) => d["Высота"]);
      let min = d3.min(groupItems, (d) => d["Высота"]);
      arrGraph.push({ labelX: groupName, values: [max, min] });
    }

    if (key === "Год") {
      arrGraph.sort((a, b) => +a.labelX - +b.labelX);
    } else {
      arrGraph.sort((a, b) => a.labelX.localeCompare(b.labelX));
    }

    return arrGraph;
  };

  return (
    <fieldset className="visualization">
      <legend>Визуализация</legend>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Значение по оси OX:</p>
          <label>
            <input type="radio" name="ox" value="Страна" defaultChecked />
            Страна
          </label>
          <label>
            <input type="radio" name="ox" value="Год" />
            Год
          </label>
          <label>
            <input type="radio" name="ox" value="Город" />
            Город
          </label>
          <label>
            <input type="radio" name="ox" value="Тип" />
            Тип
          </label>
        </div>

        <div className="form-group">
          <p>Значение по оси OY:</p>
          <label>
            <input type="checkbox" name="oy-max" defaultChecked />
            Максимальная высота
          </label>
          <label>
            <input type="checkbox" name="oy-min" />
            Минимальная высота
          </label>
        </div>

        <div className="form-group">
            Тип диаграммы:
            <select name="chartType">
              <option value="scatter">Точечная диаграмма</option>
              <option value="bar">Гистограмма</option>
            </select>
        </div>

        <div>
          <button type="submit">Построить</button>
          <button type="button" onClick={handleClear}>Очистить</button>
        </div>
      </form>

      {error && <p className="visualization-error">{error}</p>}

      {data.length > 0 && (
        <ChartDraw data={data} oy={oy} chartType={chartType} />
      )}
    </fieldset>
  );
};

export default Chart;