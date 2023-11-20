import type React from "react"
import { useState } from "react"

type Props = {
  title: string
  name?: string
}

export function GenericComponent(props: Props) {
  return (
    <div>{props.title}</div>
  )
}

export const GenericComponentShort = (props: Props) => <div>{props.title}</div>

export const GenericComponentLikeFC: React.FC<Props> = (props) => <p>{props.title}</p>

export const GenericComponentLikeFCDestructured: React.FC<Props> = ({ title }) => <p>{title}</p>

export const GenericFCDWithChildren: React.FC<Props & {children: React.ReactNode}> = ({ title, children }) => (
  <div>
    <h1>{title}</h1>
    <div>{children}</div>
  </div>
)


export const AlternativeFC = ({title}: {title: string}): React.ReactElement => <p>{title}</p>


// 👉 GenericComponents

// Basic - GenericComponent
export const GenericPropShort = <T extends {title: string}>({title}: T) => <p>{title}</p>
export const GenericProp = <T extends Props>({title}: T) => <p>{title}</p>

export const Example = () => {
  return (
    <div>
      <GenericPropShort
        title="Hello"
      />
      <GenericProp<{name: string}>
        title="Hello"
      />
    </div>
  )
}

// 👉 Real Generic Component
// List Generic Component render Props

type ListItem = {
  id: string
  title: string
  description: string
  code: string
  status: 'active' | 'inactive'
}

type ListProps<T> = {
  data: T[]
  renderItem: (item: T) => React.ReactNode
}

export const ListItemsComponent = <T extends {id: string, title: string}>(props: ListProps<T>) => {
  return (
    <div>
      {props.data.map(item => (props.renderItem(item)))}
    </div>
  )
}

export function ListItemsCart<T>({data, renderItem}: ListProps<T>): React.ReactElement {
  return (
    <div>
      {data.map(item => renderItem(item))}
    </div>
  )
}

// Implementations

// const dataItems: ListItem[] = [
//   {id: '1', title: 'Hello', description: 'Hello World', code: '123', status: 'active'},
//   {id: '2', title: 'World', description: 'Hello World', code: '123', status: 'active'},
// ]

const dataItems = [
  {id: '1', title: 'Hello', description: 'Hello World', code: '123', status: 'active'},
  {id: '2', title: 'World', description: 'Hello World', code: '123', status: 'active'},
]

function adapterTransform<T>(items: T[]): ListItem[] {
  return items.map(item => item) as ListItem[]
}

const newData = adapterTransform(dataItems)

export const MyList = () => {
  return (
    <div>
      <ListItemsComponent
        data={dataItems}
        renderItem={(item) => <div>{item.title}</div>}
      />
      <ListItemsCart
      // ^?
        data={dataItems}
        renderItem={(item) => <div>{item.status}</div>}
      />
      <ListItemsCart<ListItem>
      // ^?
        data={newData}
        renderItem={(item) => {
        if(item.status === 'active') {
          return <div>active</div>
        }

        return <div>inactive</div>
      }}
      />
    </div>
  )
}

// 👉 Generic Props - Discriminated Unions in react Props -> be careful with this
type SquareProps = {
  type: 'square'
  size?: number
}

type CircleProps = {
  type: 'circle'
  radius?: number
}

type ShapeProps = SquareProps | CircleProps

export const Shape: React.FC<ShapeProps> = (props) => {
  if (props.type === 'circle') {
    return <div>Circle has {props.radius}</div>
  } else if (props.type === 'square') {
    return <div>Square has {props.size}</div>
  }

  return null
}

export const ImplementationShapeContainer = () => {
  return (
    <div>
      <Shape type="square" size={10} />
      <Shape type="circle" radius={10} />

      {/* Error cases */}
      {/* <Shape type="square" radius={10} /> */}
      {/* <Shape type="circle" size={10} /> */}
    </div>
  )
}


// Solutions

const Square: React.FC<SquareProps> = ({type, size = 10}) => (<div>{type} has {size}</div>)
const Circle: React.FC<CircleProps> = ({type, radius = 20}) => (<div>{type} has {radius}</div>)

export const ShapeContainer = () => {
  return (
    <div>
      <Square type="square" />
      <Circle type="circle" />
    </div>
  )
}

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = async (aPromise: Promise<unknown>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] // as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}

export const ComponentWithHook = () => {
  // const [isLoading, load] = useLoading()
  const hookLoading = useLoading()
  // a[1] = true
  return <></>
}
