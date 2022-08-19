import React, { ReactNode } from 'react';

import Box from '../Box/Box';
import { Sprinkles } from '../sprinkes.css';

interface StackProps {
  gap: Sprinkles['gap'];
  children: ReactNode;
}

export default function Stack({ gap, children }: StackProps) {
  return (
    <Box display="flex" flexDirection="column" gap={gap}>
      {React.Children.map(children, (child) => (
        <Box>{child}</Box>
      ))}
    </Box>
  );
}
