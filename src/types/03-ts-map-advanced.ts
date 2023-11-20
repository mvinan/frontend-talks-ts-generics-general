/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DeepPrettify, Prettify } from "./types-helpers";

// 👉 Mapped Types
// What is Mapped Types?
// Mapped Types are a way of transforming keys into values on an object.
// For example, { [K in Keys]: boolean }.

// Example: Make all properties of an object optional
interface ColorVariants {
  primary: 'blue';
  secondary: 'red';
  tertiary: 'green';
}

//@ts-expect-error expected non used type
type PrimaryColorVariants = ColorVariants['primary']
//      ^?

//@ts-expect-error expected non used type
type NonPrimaryColorVariants = ColorVariants['secondary' | 'tertiary']
//         ^?

//@ts-expect-error expected non used type
type EveryColorVariants = ColorVariants[keyof ColorVariants]
//      ^?

type KeysOfColorVariants = keyof ColorVariants
//@ts-expect-error expected non used type
type PrettyfiedColorVariants = Prettify<KeysOfColorVariants>
//    ^?

type Letters = ['a', 'b', 'c'];
//@ts-expect-error expected non used type
type AOrB = Letters[0 | 1]
//   ^?
//@ts-expect-error expected non used type
type AB = Letters[number]
//   ^?

// 👉 Mapping Modifiers
// What is Mapping Modifiers?
// Mapping Modifiers are keywords that are used in Mapped Types.
// Mapping Modifiers are used to change the properties of the mapped type.
// For example, readonly. or -?. or +?.


// readonly = readonly
// -? = optional
// +? = nullable

type Mutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
};

type Readonly<Type> = {
  +readonly [Property in keyof Type]: Type[Property]
};

type Optional<Type> = {
  [Property in keyof Type]+?: Type[Property]
};

type Nullable<Type> = {
  [Property in keyof Type]-?: Type[Property]
};

//@ts-expect-error expected non used type
type ReadonlyPerson = Readonly<{
//   ^?
  name: string;
  age: number;
}>;

//@ts-expect-error expected non used type
type OptionalPerson = Optional<{
//   ^?
  name: string;
  age: number;
}>;

type NullablePerson = Nullable<{
//    ^?
  name: string;
  age?: number;
}>;

//@ts-expect-error expected non used type
type MutablePerson = Mutable<{
//   ^?
  readonly name: string;
  readonly age: number;
}>;

const mutablePerson: NullablePerson = {
  name: 'Saoirse',
  age: 26,
}

console.log(mutablePerson)


// Generic clean Type - Example with mapped types.
// Key Remapping via `as`

type CleanType<Type> = {
  [P in keyof Type as Type[P] extends (null | undefined) ? never : P]: Type[P]
};

type SafeType = CleanType<UnsafeType>;
//      ^?

const safeType: SafeType = {
  name: 'Saoirse',
  age: 26,
}

console.log(safeType)

// 👉 Deep Mapping via `as` and constrains

type DeepCleanType<Type> = {
  [P in keyof Type as Type[P] extends null | undefined ? never : P]: Type[P] extends object
    ? DeepCleanType<Type[P]>
    : Type[P]
};

type UnsafeType = {
  name: string;
  age: number;
  address: null;
};

type DeepNullishType = {
  name: string;
  age: number;
  address: {
    street: string;
    city: undefined;
    country: string;
    zip: null;
  };
  other: null;
}

type DeepCleanTypeResult = DeepCleanType<DeepNullishType>;
//        ^?

// @ts-expect-error expected non used type
type PrettifyCleanedResult = DeepPrettify<DeepCleanTypeResult>;
//    ^?

const deepCleanTypeResult: DeepCleanTypeResult = {
  name: 'Saoirse',
  age: 26,
  address: {
    street: 'Main Street',
    country: 'Ireland',
    // zip: null, // 👈🏻 Error
  },
}

console.log(deepCleanTypeResult)


// 👉 Key Remapping via `as`
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

interface DeepPerson {
  name: string;
  age: number;
  location: {
    country: string;
    city: string;
  };
}

// @ts-expect-error expected non used type
type LazyPerson = Getters<Person>;
//    ^?

// Making properties optionals in deep objects
type DeepOptional<Type> = {
  [P in keyof Type]+?: DeepOptional<Type[P]>
};

type DeepOptionalPerson = DeepOptional<{
  name: string;
  age: number;
  location: {
    country: string;
    city: string;
  };
}>;

const personalData: DeepOptionalPerson = {
  name: 'Saoirse',
  age: 26,
  location: {
    country: 'Ireland',
    // city: 'Dublin',
  },
}

// Result to learned

type Entity =
  | {
      type: "user"
    }
  | {
      type: "post"
    }
  | {
      type: "comment"
    };

type EntityWithId = {
//    ^?
  [EntityType in Entity["type"]]: {
    type: EntityType
  } & Record<`${EntityType}Id`, string>
}[Entity['type']]

export type EntityResult = Prettify<EntityWithId>
//            ^?

export const result: EntityWithId = {
  type: 'post',
  postId: '1',
}


//👉 Example of Locales
const locales = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact {user}',
    greetings: {
      morning: 'Good Morning {user}',
      saludito: 'Saludito',
    }
  }
}

type LocaleMap = typeof locales;

type LocaleName = keyof LocaleMap;

type Locale = LocaleMap[LocaleName];

const currentLocale: LocaleName = 'en'


// STEP 1
// declare function t(key: keyof Locale): string;

// t('greetings')


// STEP 2
// type PathInto<T> = 'home' | 'about' | 'greetings.morning' | 'greetings.afternoon' | 'greetings.evening';

// Solution PathInto
type PathInto<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? `${K & string}.${PathInto<T[K]> & string}`
    : K
}[keyof T];

type PathIntoLocale = PathInto<Locale>;
//         ^?

// // STEP 3
// // create a function that takes a path and returns the value
const getLocaleByPathSplit = (messages: Record<string, unknown>, path: Array<string>, index = 0): string => {
  const keys = path[index]
  if(keys === undefined) {
    return ''
  }
  const result = messages[keys]
  if(result === undefined) {
    return ''
  }
  if(typeof result === 'string') {
    return result
  }
  return getLocaleByPathSplit(Object(result), path, index + 1)
}


export function t(key: PathIntoLocale): string {
  return getLocaleByPathSplit(locales[currentLocale], key.split('.'))
}

console.log(t('greetings.saludito'))
