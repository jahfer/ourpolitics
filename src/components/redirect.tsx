import * as React from 'react';
import { useURL } from 'contexts/router-context';
import { useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
}

export default function Redirect({ to }: RedirectProps) {
  const { setURL } = useURL();
  const navigate = useNavigate();

  React.useEffect(() => {
    setURL({}, to);
    navigate(to, { replace: true });
  }, []);

  return null;
}