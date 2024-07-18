import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/core";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Component() {
    const [fruits, setFruits] = React.useState({
      name: "apple",
      checked: true,
    });

    const onChange = () => {
      setFruits({ name: fruits.name, checked: !fruits.checked });
    };
    return (
      <div className='flex items-center gap-2'>
        <Checkbox
          name={fruits.name}
          value={fruits.name}
          checked={fruits.checked}
          onChange={() => onChange()}
        />
        <span className='text-base text-neutral-80 capitalize'>
          {fruits.name}
        </span>
      </div>
    );
  },
  args: {
    checked: false,
    name: "",
    disabled: false,
    value: "",
  },
};

export const Group: Story = {
  render: function Component() {
    const allFruits = [
      { name: "apple", checked: true },
      { name: "banana", checked: false },
      { name: "carrot", checked: false },
    ];
    const [fruits, setFruits] = React.useState(allFruits);

    const onChange = (index: number) => {
      setFruits(
        fruits.map((fruit, i) =>
          index === i ? { ...fruit, checked: !fruit.checked } : fruit
        )
      );
    };
    return (
      <div className='grid gap-2 h-fit'>
        {fruits.map((fruit, index) => (
          <div key={index.toString()} className='flex items-center gap-2'>
            <Checkbox
              name={fruit.name}
              value={fruit.name}
              checked={fruit.checked}
              onChange={() => onChange(index)}
            />
            <span className='text-base text-neutral-80 capitalize'>
              {fruit.name}
            </span>
          </div>
        ))}
      </div>
    );
  },
  args: {
    checked: false,
    name: "",
    disabled: false,
    value: "",
  },
};