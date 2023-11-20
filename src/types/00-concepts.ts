/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * TS basic concepts
 */

// 👉 Type Annotations
// What is Type Annotations?
// Type Annotations are types that are written as part of the source code.
// For example, string, number, boolean, null, undefined, object, any, unknown, never, void, Array, Function, etc.
//@ts-expect-error expected non used type
type TypeAnnotation = string;

// 👉 Literal Types
// What is Literal Types?
// Literal Types are types that represent exactly one value.
// For example, 'a' | 'b' | 1 | 2 | true | false | null | undefined.
//@ts-expect-error expected non used type
type Literal = 'a' | 'b' | 1 | 2 | true | false | null | undefined;

// 👉 Union Types
// What is Union Types?
// Union Types are types that can be one of several types.
// For example, string | number | boolean | null | undefined.
//@ts-expect-error expected non used type
type Union = string | number | boolean;
//@ts-expect-error expected non used type
type Union2 = 'a' | 'b' | 1 | 2 | true | false | null | undefined;

// 👉 Intersection Types
// What is Intersection Types?
// Intersection Types are types that combine several types into one.
// For example, { a: string } & { b: number }.
export type IntersectionExample = { aString: string } & { bNumber: number };

// FIXME: solve this error with Omit helper
interface Intersection2 extends IntersectionExample {
  aString: number;
}

//@ts-expect-error expected non used type
interface Intersection3 extends Omit<IntersectionExample, 'aString'> {
  aString: number
}

// 👉 Type Guards
// What is Type Guards?
// Type Guards are expressions that perform runtime checks that narrow the type of a variable.
// For example, typeof, instanceof, in, etc.
//@ts-expect-error expected non used type
const isString = (value: unknown): value is string => typeof value === 'string';

// 👉 Type Assertions
// What is Type Assertions?
// Type Assertions are expressions that tell the compiler to trust the developer.
// For example, value as string, <string>value.
const value: unknown = 'Hello World';
const str = value as string;

console.log(str.replace('hello', 'hi'));

// 👉 Discriminated Unions
// What is Discriminated Unions?
// Discriminated Unions are types that have a common, singleton type property — the discriminant.
// For example, type, kind, etc.
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

const getArea = (shape: Shape): number => {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
    default:
      throw new Error(`I don't know this shape`);
  }
};

const getArea2 = (shape: Shape): number | never => {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  } else if(shape.kind === 'square') {
    return shape.sideLength ** 2;
  }

  throw new Error(`I don't know this shape`);
};

// console.log(getArea2({ kind: 'rectangle' })); // -> 🚫 throw Error: I don't know this shape
console.log(getArea2({ kind: 'square', sideLength: 10 }));
console.log(getArea({ kind: 'circle', radius: 10 }));

// 👉 Index Signatures
// What is Index Signatures?
// Index Signatures are types that define the types allowed to index into an object.
// For example, [key: string]: string.
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ['Bob', 'Fred'];

console.log(myArray);

// Problem: Index Signatures
const myArray2: StringArray = ['Bob', 'Fred', 1];

console.log(myArray2);

// Solution: Index Signatures
interface NumberAndStringArray {
  [index: number]: number | string;
}
const myArray3: NumberAndStringArray = ['Bob', 'Fred', 1];

console.log(myArray3)

// Problem: Index Signatures
interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: string;
}


const myDict: NumberDictionary = {
  length: 1,
  name: 'name',
  '1': 1,
};

// Solution: Index Signatures
interface NumberDictionary2 {
  [index: string]: number | string;
  length: number;
  name: string;
}

const myDict2: NumberDictionary2 = {
  length: 1,
  name: 'name',
  '1': 1,
};

console.log(myDict2);

// 👉 Mapped Types

type Keys = 'option1' | 'option2';
type Flags = { [Property in Keys]: boolean };

const flags: Flags = { option1: true, option2: false };
//            ^?

console.log(flags);


const fruitCount = {
  apple: 1,
  banana: 3,
  pear: 4
};

// Expected Result
// type SingleFruitCount =
//   | {
//       apple: number
//     }
//   | {
//       banana: number
//     }
//   | {
//       pear: number
//     }
//    | {
//    otra: number
// }

type FruitCounts = typeof fruitCount;
//    ^?

// @ts-expect-error expected non used type
type FruitOptions = keyof FruitCounts;
//        ^?

// 👇 uncomment below
type SingleFruitCount = {
  //  ^?
  [FruitKey in keyof FruitCounts]: {
    [K in FruitKey]: FruitCounts[K];
  }
}[keyof FruitCounts];

const singleFruitCount: SingleFruitCount = {
  apple: 2,
}

console.log(singleFruitCount)


// ### Conditional Types - constrains
// What is Conditional Types?
// Conditional Types are types that depend on a condition.
// For example, T extends U ? X : Y.

// Simple Example.
type IsString<Type> = Type extends string ? true : false;

type isStringType = IsString<string>

const isString2: isStringType = true;
const isString3: IsString<number> = false;

//@ts-expect-error expected non used type
type ValidateIsString = IsString<{name: 1}>;
//     ^?

console.log(isString2);
console.log(isString3);




// 👀 🛑🛑🛑 Return here after generic types 01. 🛑🛑🛑 👀
// Advance Example with Generic Types.
interface Benefit {
  id: string;
  type: string;
  code?: number;
}

type BenefitConstraint = Benefit;


const adapterBenefits = <T extends BenefitConstraint>(benefits: T[]): Benefit[] => {
  let codeId = 1;

  return benefits.map((benefit) => ({
    id: benefit.id,
    type: benefit.type,
    code: codeId++,
  }))
}

const dataBenefits = [{ id: '1', type: 'type' }, { id: '2', type: 'type2' }, { id: '3', type: 'type3' }];
const dataPersons = [{ id: '1', name: 'name' }, { id: '2', name: 'name2' }, { id: '3', name: 'name3' }]

console.log(adapterBenefits(dataBenefits));
console.log(adapterBenefits(dataPersons)); // -> 🚫 Error: Type 'Person' is not assignable to type 'Benefit'.

// 👉 Conditional Types - constrains
type Flatten<T> = T extends Array<infer U> ? U : T;

export type Example = Flatten<Array<{name: string}>>;
//             ^?