import React, {useEffect, useRef} from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DndContext} from '@dnd-kit/react';
import {Draggable} from '../Draggable/DraggableExample';
import {Droppable} from '../Droppable/DroppableExample';
import {createRoot} from 'react-dom/client';

const ShadowDOMWrapper = ({children}) => {
  const hostRef = useRef(null);

  useEffect(() => {
    if (hostRef.current) {
      const shadowRoot = hostRef.current.attachShadow({mode: 'open'});
      const styleSlot = document.createElement('style');
      styleSlot.innerHTML = `
        :host {
          display: block;
          border: 1px solid #ccc;
          padding: 20px;
        }
      `;
      shadowRoot.appendChild(styleSlot);
      const contentRoot = document.createElement('div');
      shadowRoot.appendChild(contentRoot);

      const reactRoot = createRoot(contentRoot);
      reactRoot.render(children);
    }
  }, [children]);

  return <div ref={hostRef}></div>;
};

const ShadowDOMStory = () => (
  <DndContext>
    <ShadowDOMWrapper>
      <Draggable />
      <Droppable />
    </ShadowDOMWrapper>
  </DndContext>
);

const meta: Meta<typeof ShadowDOMStory> = {
  title: 'React/Shadow DOM',
  component: ShadowDOMStory,
};

export default meta;

type Story = StoryObj<typeof ShadowDOMStory>;

export const Example: Story = {
  name: 'Example',
};
