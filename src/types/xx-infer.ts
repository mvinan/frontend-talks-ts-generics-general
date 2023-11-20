/* eslint-disable @typescript-eslint/no-unused-vars */
// infer
// What is infer?
// infer is a keyword that is used in conditional types.
// infer is used to infer the type of a type variable.

type Flatten<T> = T extends Array<infer U> ? U : T;

// Example: Flatten the array type to the element type input:
// Array<{name: string}> or
// {name: string}[]
// output: {name: string}

export type Example = Flatten<{name: string}[]>;
//           ^?


// 👉  Example: Remove word keywords from interface
interface Person {
  'cool_name': string;
  'cool_age': number;
  'cool_job': string;
}

type RemoveCoolWord<T> = T extends `cool_${infer U}` ? U : T;
type RemoveCoolFromObject<T> = {
  [K in keyof T as RemoveCoolWord<K>]: T[K]
};

// Final Result
// @ts-expect-error no unused
type NormalizePersonType = RemoveCoolFromObject<Person>;
//         ^?


// 👉 Example: Validate includes from interface
type Includes<T extends readonly unknown[], U> = T extends readonly [infer A, ...infer B] ? A extends U ? true : Includes<B, U> : false;

// Final Result
//@ts-expect-error no unused
type IsStringInArray = Includes<['a', 'b', 'c'], 'a'>;
//         ^?

// Another Example
//@ts-expect-error no unused
type isTypeInObjectArray = Includes<[{type: 'electric'},  {type: 'fire'}], {type: 'electric'}>;
//     ^?

// 👉 Example of infer of conditional type and union type
type PokeActions = {
  type: 'SET_POKE',
  payload: {name: string, id: string}
} | {
  type: 'DELETE_POKE'
}

const sendAction = <Type extends PokeActions['type']>(...args: Extract<PokeActions, {type: Type}> extends {payload: infer TPayload} ? [Type, TPayload]: [Type]): void => {
  console.log(args);
}

// Final Result infer the payload type with discriminated union
sendAction('DELETE_POKE');

sendAction('SET_POKE', {name: 'pikachu', id: '18213hasd'})


// 👉 Here is another example

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropEventSource<Type extends Record<keyof Type, any>> = {
  on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function makeWatchedObject<Type extends Record<keyof Type, any>>(obj: Type): Type & PropEventSource<Type>


// Method with event and infer type
const person = makeWatchedObject({
  firstName: 'John',
  lastName: 'Papa',
  age: 26
});

person.on('firstNameChanged', newName => {
  console.log(`new name is ${newName.toUpperCase()}`);
});
