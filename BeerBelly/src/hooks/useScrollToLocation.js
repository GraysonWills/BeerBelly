import { useImperativeHandle } from 'react';

export const useScrollToLocation = (ref) => {
  useImperativeHandle(ref, () => ({
    scrollToLocation: (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }));
};
