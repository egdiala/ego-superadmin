import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "@/components/core/Chart";

const meta = {
  title: "Charts/Pie",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ResponsivePie: Story = {
  render: function Component(args) {

    return (
        <PieChart
            className="w-full h-[48dvh] flex justify-center"
            data={args.data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.9}
            cornerRadius={3}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={3}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [
                    [
                        "darker",
                        0.2
                    ]
                ]
            }}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            enableArcLabels={false}
            arcLabelsRadiusOffset={0}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [
                    [
                        "darker",
                        2
                    ]
                ]
            }}
            motionConfig="wobbly"
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "row",
                    justify: false,
                    translateX: -800,
                    translateY: 0,
                    itemWidth: 93,
                    itemHeight: 50,
                    itemsSpacing: 0,
                    symbolSize: 15,
                    itemDirection: "left-to-right"
                }
            ]}
        />
    );
  },
  args: {
    data: [
        {
            "id": "php",
            "label": "php",
            "value": 107,
            "color": "hsl(267, 70%, 50%)"
        },
        {
            "id": "erlang",
            "label": "erlang",
            "value": 137,
            "color": "hsl(226, 70%, 50%)"
        },
        {
            "id": "elixir",
            "label": "elixir",
            "value": 394,
            "color": "hsl(222, 70%, 50%)"
        },
        {
            "id": "java",
            "label": "java",
            "value": 485,
            "color": "hsl(288, 70%, 50%)"
        },
        {
            "id": "hack",
            "label": "hack",
            "value": 76,
            "color": "hsl(222, 70%, 50%)"
        }
    ],
    className: ""
  },
};