import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "@/components/core";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Forms/Radio Button",
  component: RadioButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Component() {
    const [isChecked, setIsChecked] = React.useState(false);
    const onChange = (e: any) => setIsChecked(!!e.target.value);

    return (
      <div className='flex items-center gap-2 h-fit'>
        <RadioButton
          name='food'
          value='French Fries'
          checked={isChecked}
          onChange={onChange}
        />
        <span className='text-base text-neutral-black'>French Fries</span>
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
    const [fruits, setFruits] = React.useState([
      { name: "apple", checked: false },
      { name: "banana", checked: false },
      { name: "carrot", checked: false },
    ]);
    const allFruits = React.useMemo(() => {
        return fruits;
    },[fruits])
    

    const onChange = (index: number) => {
      setFruits(
        fruits.map((fruit, i) =>
          index === i ? { ...fruit, checked: !fruit.checked } : fruit
        )
      );
    };
    return (
      <div className='grid gap-2 h-fit'>
        {allFruits.map((fruit, index) => (
          <div key={index.toString()} className='flex items-center gap-2'>
            <RadioButton
                name="fruity"
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