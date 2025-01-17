import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ListDataObject } from './types'

type ListContextValue<T> = {
  template: string
  isSelectable?: boolean
  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>
  expandedIds: string[]
  setExpandedIds: Dispatch<SetStateAction<string[]>>
  data: T[]
  idKey: T extends ListDataObject ? keyof T : string
  autoClose: boolean
  disabledRowsRef: MutableRefObject<string[]>
}

const ListContext = createContext<ListContextValue<unknown> | undefined>(
  undefined,
)

type ListProviderProps<T> = {
  template?: string
  isSelectable?: boolean
  children: ReactNode
  onSelectedIdsChange?: (selectedIds: string[]) => void
  selectedIds?: string[]
  data: T[]
  idKey: T extends ListDataObject ? keyof T : string
  autoClose?: boolean
}

export const ListProvider = <T,>({
  template = 'repeat(12, 1fr)',
  children,
  isSelectable,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  data,
  idKey,
  autoClose = false,
}: ListProviderProps<T>) => {
  const [selectedIds, setSelectedIds] = useState(selectedIdsProp ?? [])
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const onSelectedIdsChangeRef = useRef(onSelectedIdsChange)
  const disabledRowsRef = useRef<string[]>([])

  useEffect(() => {
    setSelectedIds(current =>
      selectedIdsProp && current !== selectedIdsProp
        ? selectedIdsProp
        : current,
    )
  }, [selectedIdsProp])

  useEffect(() => {
    onSelectedIdsChangeRef.current = onSelectedIdsChange
  }, [onSelectedIdsChange])

  const computedTemplate = useMemo(
    () => (isSelectable ? `50px ${template}` : template),
    [isSelectable, template],
  )

  const onChangeSelectedIds: Dispatch<SetStateAction<string[]>> = useCallback(
    (value: string[] | ((currentIds: string[]) => string[])) => {
      const newSelectedIds =
        typeof value !== 'function' ? value : value(selectedIds)
      if (onSelectedIdsChangeRef.current) {
        onSelectedIdsChangeRef.current(newSelectedIds)
      } else {
        setSelectedIds(newSelectedIds)
      }
    },
    [selectedIds],
  )

  const value = useMemo(
    () => ({
      template: computedTemplate,
      autoClose,
      expandedIds,
      setExpandedIds,
      isSelectable,
      setSelectedIds: onChangeSelectedIds,
      selectedIds,
      data,
      idKey,
      disabledRowsRef,
    }),
    [
      computedTemplate,
      expandedIds,
      isSelectable,
      selectedIds,
      onChangeSelectedIds,
      data,
      idKey,
      autoClose,
    ],
  )

  return (
    <ListContext.Provider value={value as ListContextValue<unknown>}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = <T extends ListDataObject = ListDataObject>() => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext should be used inside a List component')
  }

  return context as ListContextValue<T>
}
