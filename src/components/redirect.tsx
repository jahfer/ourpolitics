import * as React from 'react';
import { useURL } from 'contexts/router-context';

interface RedirectProps {
  to: string;
}

export default function Redirect({ to }: RedirectProps) {
  const { setURL } = useURL();

  React.useEffect(() => {
    setURL({}, to, "Redirect");
  }, []);

  return null;
}