import { WorkflowFormAction } from '@/workflow/types/Workflow';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ComponentDecorator } from 'twenty-ui';
import { I18nFrontDecorator } from '~/testing/decorators/I18nFrontDecorator';
import { WorkflowStepActionDrawerDecorator } from '~/testing/decorators/WorkflowStepActionDrawerDecorator';
import { WorkflowEditActionFormFieldSettings } from '../WorkflowEditActionFormFieldSettings';
import { FieldMetadataType } from 'twenty-shared/types';

const meta: Meta<typeof WorkflowEditActionFormFieldSettings> = {
  title: 'Modules/Workflow/Actions/Form/WorkflowEditActionFormFieldSettings',
  component: WorkflowEditActionFormFieldSettings,
  decorators: [
    WorkflowStepActionDrawerDecorator,
    ComponentDecorator,
    I18nFrontDecorator,
  ],
};

export default meta;
type Story = StoryObj<typeof WorkflowEditActionFormFieldSettings>;

const mockAction: WorkflowFormAction = {
  id: 'form-action-1',
  type: 'FORM',
  name: 'Test Form',
  valid: true,
  settings: {
    input: [
      {
        id: 'field-1',
        name: 'text',
        label: 'Text Field',
        type: FieldMetadataType.TEXT,
        placeholder: 'Enter text',
        settings: {},
      },
    ],
    outputSchema: {},
    errorHandlingOptions: {
      retryOnFailure: { value: false },
      continueOnFailure: { value: false },
    },
  },
};

export const TextFieldSettings: Story = {
  args: {
    field: mockAction.settings.input[0],
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const typeSelect = await canvas.findByText('Text');
    expect(typeSelect).toBeVisible();

    const placeholderInput = await canvas.findByText('Enter text');
    expect(placeholderInput).toBeVisible();

    const closeButton = await canvas.findByRole('button');
    await userEvent.click(closeButton);
    expect(args.onClose).toHaveBeenCalled();
  },
};

export const NumberFieldSettings: Story = {
  args: {
    field: {
      id: 'field-2',
      name: 'number',
      label: 'Number Field',
      type: FieldMetadataType.NUMBER,
      placeholder: 'Enter number',
      settings: {},
    },
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const typeSelect = await canvas.findByText('Number');
    expect(typeSelect).toBeVisible();

    const placeholderInput = await canvas.findByText('Enter number');
    expect(placeholderInput).toBeInTheDocument();

    const closeButton = await canvas.findByRole('button');
    await userEvent.click(closeButton);
    expect(args.onClose).toHaveBeenCalled();
  },
};
