import { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { CountryData } from '../App';

interface BarChartData {
    chartData: CountryData []
}

export const BarChart:React.FC<BarChartData> = ({ chartData }) => {

    const rootRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {

        const root = am5.Root.new("chartdiv")

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft:0,
            paddingRight:1
        }))


        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        const xRenderer = am5xy.AxisRendererX.new(root, { 
            minGridDistance: 30, 
            minorGridEnabled: true
        });

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        const yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: yRenderer
        }));

        const series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });

        xAxis.data.setAll(chartData);
        series.data.setAll(chartData);

        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    },[chartData])

    return (
        <div ref={rootRef} id="chartdiv" style={{ width: "80%", height: "70vh" }}></div>
    )
}