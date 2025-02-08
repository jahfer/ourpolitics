import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import { handleEnterAsClick } from 'support/util'

interface SelectableItemProps<T> {
  name: T,
  checked: boolean,
  className: string,
  onToggle: () => void,
  onRender: (item: T) => string,
}

function SelectableItem<T>({ name, checked, className, onToggle, onRender }: SelectableItemProps<T>) {
  return (
    <li key={`filterBar--${name}`} className="flex-grow">
      <label className={className} onKeyDown={handleEnterAsClick}>
        {onRender(name)}
        <input checked={checked} onChange={onToggle} type="checkbox" />
      </label>
    </li>
  )
}

interface SelectableListProps<T> {
  items: Array<T>,
  className?: string,
  selections: Map<T, boolean>,
  onUpdate: (selections: Map<T, boolean>) => void,
  onRender: (item: T) => string,
  enableToggleAll?: boolean,
  enableToggleNone?: boolean,
}

export default function SelectableList<T>({ items, className = "", selections, onUpdate, onRender, enableToggleAll = true, enableToggleNone = true }: SelectableListProps<T>) {
  const { t } = useTranslation();

  const updateSelections = (selections: Map<T, boolean>) => {
    onUpdate(selections);
  }

  return (
    <ul className={`list ${className}`}>
      {
        (enableToggleAll || enableToggleNone)
        ? (
          <li className="list--item policyTable--filterBar--item policyTable--filterBar--toggleAll">
            {
              enableToggleAll
              ? ([...selections.entries()].every(([_item, checked]) => checked) ? null : (
                <div className="policyTable--filterBar--toggle">
                  <a href="#" onKeyDown={handleEnterAsClick} onClick={(e) => { e.preventDefault(); updateSelections(new Map(items.map((item) => [item, true]))) }}>{t("select_all")}</a>
                </div>
              ))
              : null
            }
            {
              enableToggleNone
              ? ([...selections.entries()].every(([_item, checked]) => !checked) ? null : (
                <div className="policyTable--filterBar--toggle">
                  <a href="#" onKeyDown={handleEnterAsClick} onClick={(e) => { e.preventDefault(); updateSelections(new Map(items.map((item) => [item, false]))) }}>{t("select_none")}</a>
                </div>
              ))
              : null
            }
          </li>
        )
        : null
      }
      {
        [...selections.entries()].map(([item, checked]) => {
          return (
            <SelectableItem
              name={item}
              key={String(item)}
              className="list--item policyTable--filterBar--item"
              checked={checked}
              onRender={onRender}
              onToggle={() => updateSelections(new Map(selections.set(item, !checked)))} />
          )
        })
      }
    </ul>
  )
}
