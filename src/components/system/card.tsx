import * as React from 'react'

interface CardLinkProps {
  url: string,
  heading: string,
  subheading: string,
}

// todo: custom border colour?
function CardLink ({ url, heading, subheading }: CardLinkProps) {
  return (
    <li className="sidebar-link">
      <a target="_blank" href={url}>
        <h2 className="sidebar-link--title"> {heading} </h2>
        <div className="sidebar-link--meta"> {subheading} </div>
      </a>
    </li>
  )
}

interface CardLinkListProps {
  links: CardLinkProps[],
}

// todo: custom border colour?
export function CardLinkList ({ links }: CardLinkListProps) {
  return (
    <ul className="reference--list">
      {links.map((link, i) => <CardLink key={i} {...link} />)}
    </ul>
  )
}

interface CardBreadcrumbProps {
  text: string,
}

export function CardBreadcrumb({ text}: CardBreadcrumbProps) {
  return (
    <div className="modal--headingContainer">
      <div className="modal--headingInfo">
        <div className="modal--topicBox"> <p> {text} </p> </div>
      </div>
    </div>
  )
}

export enum HeadingLevel {
  H1, H2
}

interface CardHeadingProps {
  level: HeadingLevel,
  text: string,
  id?: string,
}

export function CardHeading({ level, text, id }: CardHeadingProps) {
  switch (level) {
    case HeadingLevel.H1:
      return (
        <h1 className="modal--heading modal--heading__primary" id={id}> {text} </h1>
      )
    case HeadingLevel.H2:
      return (
        <h2 className="modal--heading modal--heading__secondary" id={id}> {text} </h2>
      )
  }
}

interface CardProps {
  direction: "row" | "column",
  actions?: React.ReactNode,
  children?: React.ReactNode,
}

export function Card({ direction, actions, children }: CardProps) {
  let className = "policyModal";
  switch (direction) {
    case "row":
      break
    case "column":
      className += " policyModal--reference"
      break
  }

  return (
    <div className="card">
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

interface CardPrimaryContentProps {
  compact?: boolean,
  children?: React.ReactNode,
}

export function CardPrimaryContent({ compact=false, children }: CardPrimaryContentProps) {
  return (
    <div className={`modal--content ${compact ? "reference-modal--content" : ""}`}>
      { children }
    </div>
  )
}

interface CardAsideProps {
  title: string,
  children?: React.ReactNode,
}

export function CardAside({ title, children }: CardAsideProps) {
  return (
    <aside className="modal--sidebar">
      <section>
        <CardHeading level={HeadingLevel.H2} text={title} />
        {children}
      </section>
    </aside>
  )
}