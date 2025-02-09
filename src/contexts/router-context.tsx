import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import * as Analytics from 'support/analytics';

type RouteHandler<T extends string> =
  T extends `/${infer Namespace}/:${infer Param}/:${infer Param}/:${infer Param}`
  ? (a: string, b: string, c: string) => React.ReactElement

  : T extends `/${infer Namespace}/:${infer Param}/${infer Namespace}/:${infer Param}`
  ? (a: string, b: string) => React.ReactElement

  : T extends `/${infer Namespace}/:${infer Param}/:${infer Param}`
  ? (a: string, b: string) => React.ReactElement

  : T extends `/${infer Namespace}/:${infer Param}`
  ? (a: string) => React.ReactElement

  : () => React.ReactElement;

type Route = { pathComponents: string[], handler: RouteHandler<string> };

export function route<T extends string>(
  path: T,
  handler: RouteHandler<T>
) : Route {
  const pathComponents = path.split('/').filter(part => part.length > 0);
  return { pathComponents, handler };
}

type HistoryEntry = {
  __op_id: number,
  uri: string,
  state: object
}

type RouterContextType = {
  history: Array<HistoryEntry>,
  setURL: (state: object, url?: string, extra?:{event_name?: string}) => void,
  setURLToPrevious: (onEmptyHistory: (() => void)) => void,
  updateURLState: (state: object) => void
}

export const RouterContext = createContext<RouterContextType>({
  history: [],
  setURL: () => {},
  setURLToPrevious: () => {},
  updateURLState: () => {},
});

export function useURL() {
  return useContext(RouterContext);
}

interface RouterProviderProps {
  routes: Route[];
}

function matchPath(pathComponents: string[], route: Route): boolean {
  if (pathComponents.length !== route.pathComponents.length) {
    return false;
  }

  for (let i = 0; i < pathComponents.length; i++) {
    const pathComponent = pathComponents[i];
    const routeComponent = route.pathComponents[i];
    if (routeComponent.startsWith(':')) {
      continue;
    }
    if (pathComponent !== routeComponent) {
      return false;
    }
  }

  return true;
}

function makeMount(pathComponents: string[], route: Route): () => React.ReactElement {
  const args: string[] = [];
  for (let i = 0; i < pathComponents.length; i++) {
    const pathComponent = pathComponents[i];
    const routeComponent = route.pathComponents[i];
    if (routeComponent.startsWith(':')) {
      args.push(pathComponent);
      continue;
    }
  }

  return () => route.handler(...(args as []));
}

function mountRoute(path: string, routes: Route[]): React.ReactElement {
  const pathComponents = path.split('/').filter(part => part.length > 0);
  console.log(pathComponents, routes.find(route => matchPath(pathComponents, route)))
  const route = routes.find(route => matchPath(pathComponents, route));

  if (!route) {
    throw new Error(`No route found for ${path}`);
  }

  const mount = makeMount(pathComponents, route);
  return mount();
}

let next_id = 0;

export function RouterProvider({ routes }: RouterProviderProps) {
  const path = location.pathname;
  const mount = React.useMemo(() => mountRoute(location.pathname, routes), [routes, path]);

  const [navHistory, setNavHistory] = useState<Array<HistoryEntry>>(() => {
    if (history.state && "__op_id" in history.state) {
      return [{...history.state}];
    } else {
      const entry = { __op_id: next_id++, uri: location.pathname, state: history.state };
      history.replaceState(entry, "");
      return [entry];
    }
  });

  const setURLToPrevious = (onEmptyHistory: (() => void)) => {
    const [_, ...tl] = navHistory;
    if (tl.length > 0) {
      setNavHistory([...tl]);
      history.back();
    } else {
      onEmptyHistory();
    }
  }

  const setURL = (state: object, url?: string, {event_name}:{event_name?: string} = {}) => {
    const clickEventName = event_name || url || location.pathname;
    Analytics.recordEvent(clickEventName);

    const entry = { __op_id: next_id++, uri: url || "", state };
    history.pushState(entry, "", url);
    setNavHistory([entry, ...navHistory]);
  }

  const updateURLState = (state: object) => {
    const [hd, ...tl] = navHistory;
    const entry = { ...hd, state };
    history.replaceState(entry, "");
    setNavHistory([entry, ...tl]);
  }

  React.useEffect(() => {
    const handler = (event: PopStateEvent) => {
      const state = event.state as HistoryEntry;

      const [hd, prev, ...rest] = navHistory;
      if (state.__op_id === hd.__op_id) {
        return;
      } else if (prev && state.__op_id === prev.__op_id) {
        setNavHistory([prev, ...rest]);
      } else {
        if ("id" in state) {
          setNavHistory([state, ...navHistory]);
        } else {
          setNavHistory([{ __op_id: next_id++, uri: location.pathname, state }, ...navHistory]);
        }
      }
    }

    addEventListener("popstate", handler);
    return (() => removeEventListener("popstate", handler))
  }, [navHistory]);

  const value = { setURL, setURLToPrevious, updateURLState, history: navHistory };

  return (
    <RouterContext.Provider value={value}>
      { mount }
    </RouterContext.Provider>
  );
}