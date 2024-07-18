import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "@/components/core/Chart";

const meta = {
  title: "Charts/Line",
  component: LineChart,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ResponsiveLine: Story = {
  render: function Component(args) {

    return (
        <LineChart
            className="w-full h-[48dvh] flex justify-center"
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            colors={"hsla(93, 100%, 29%, 1)"}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0
            }}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            pointSize={11}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={"white"}
            pointLabel="data.yFormatted"
            crosshairType="bottom"
            enableTouchCrosshair={true}
            useMesh={true}
            pointLabelYOffset={-12}
            legends={[]}
            data={args.data}
        />
    );
  },
  args: {
    data: [
        {
            "id": "norway",
            "color": "hsla(93, 100%, 29%, 1)",
            "data": [
            {
                "x": "Jan",
                "y": 283
            },
            {
                "x": "Feb",
                "y": 139
            },
            {
                "x": "Mar",
                "y": 151
            },
            {
                "x": "Apr",
                "y": 237
            },
            {
                "x": "May",
                "y": 150
            },
            {
                "x": "Jun",
                "y": 157
            },
            {
                "x": "Jul",
                "y": 252
            },
            {
                "x": "Aug",
                "y": 69
            },
            {
                "x": "Sep",
                "y": 253
            },
            {
                "x": "Oct",
                "y": 276
            },
            {
                "x": "Nov",
                "y": 122
            },
            {
                "x": "Dec",
                "y": 17
            }
            ]
        }
      ],
      className: ""
  },
};