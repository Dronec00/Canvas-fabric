import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('react-modals');

interface PortalProps {
  children: React.ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  return root ? ReactDOM.createPortal(<>{children}</>, root) : null;
};