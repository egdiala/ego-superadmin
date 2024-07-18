import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "@/components/core/Chart";

const meta = {
  title: "Charts/Bar",
  component: BarChart,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ResponsiveLine: Story = {
  render: function Component(args) {

    return (
        <BarChart
            className="w-full h-[48dvh] flex justify-center"
            keys={[
                "total value",
                "confirmed value",
                "pending value",
            ]}
            indexBy="label"
            colors={["hsla(93, 92%, 34%, 1)", "hsla(205, 85%, 74%, 1)", "hsla(35, 99%, 50%, 1)"]}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            padding={0.85}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickRotation: 0,
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: "middle",
                legendOffset: 40,
                truncateTickAt: 0
            }}
            enableLabel={false}
            labelSkipWidth={7}
            labelSkipHeight={12}
            legends={[]}
            role="application"
            data={args.data}
        />
    );
  },
  args: {
    data: [
        {
            "label": "Total",
            "total value": 16,
            "totalColor": "hsl(65, 70%, 50%)",
        },
        {
            "label": "Confirmed",
            "confirmed value": 5,
            "confirmedColor": "hsl(357, 70%, 50%)",
        },
        {
            "label": "Pending",
            "pending value": 11,
            "pendingColor": "hsl(73, 70%, 50%)",
        },
    ],
    className: ""
  },
};