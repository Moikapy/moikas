// H.stories.ts|tsx

import type {Meta, Story} from '@storybook/react';

import H from './';

const meta: Meta<typeof H> = {
  component: H,
};

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const H1 = {
  render: () => <H type='1'>H1</H>,
};

export const H2 = {
  render: () => <H type='2'>H2</H>,
};

export const H3 = {
  render: () => <H type='3'>H3</H>,
};

export const H4 = {
  render: () => <H type='4'>H4</H>,
};

export const H5 = {
  render: () => <H type='5'>H5</H>,
};

export const H6 = {
  render: () => <H type='6'>H6</H>,
};
