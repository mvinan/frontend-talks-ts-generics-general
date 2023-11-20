/**
 * Generics are a way to create reusable components.
 */

// Simple Generic
// What is a Simple Generic?
// A Simple Generic is a type that is used to create reusable components.
// For example, Array<T> is a generic type that is used to create arrays.
// The T in Array<T> is a type variable.

// ==================  Mark learned: [] ================================ //
function echo(data: any) {
  return data;
}

console.log(echo('Max').length);
console.log(echo(27).length);
console.log(echo({ name: 'Max', age: 27 }).length);

// ### Better Generic
// What is a Better Generic?
// A Better Generic is a type that is used to create reusable components.

function betterEcho<T>(data: T) {
//                  ^?
  return data;
}

console.log(betterEcho('Max').length);
console.log(betterEcho<number>(27));
// console.log(betterEcho(27).length); // Error

// -> Other ways to syntax
// -> What are other ways to syntax?

// Example 1
const betterEchoArrowSyntax = <T>(data: T) => data;

console.log(betterEchoArrowSyntax('Max').length);
console.log(betterEcho<number>(27));

// Example 2
/**
 * EchoGenericType is a generic type that is used to create generic functions.
 * The T in EchoGenericType<T> is a type variable.
 * The (data: T) => T in EchoGenericType<T> is a function signature.
 */
type EchoGenericType = <T>(data: T) => T;

/**
 * A generic function that echoes the input data.
 * @param data - The data to be echoed.
 * @returns The input data.
 */
const betterEchoArrowSyntax2: EchoGenericType = (data) => data;
//                             ^?

console.log(betterEchoArrowSyntax2('Max').length);
console.log(betterEchoArrowSyntax2<number>(27));
console.log(betterEchoArrowSyntax2({name: 'Max', age: 30}).name)


// Generic Type Separate
type FromDataKeyGetValue = <TObj extends object, Key extends keyof TObj>(data: TObj, key: Key) => [Key, TObj[Key]];
const fromDataKeyGetValueEcho: FromDataKeyGetValue = (data, key) => [key, data[key]];

// With multiple generics
const fromDataKeyGetValue = <T extends object, K extends keyof T>(data: T, key: K): [K, T[K]] => [key, data[key]];

console.log(fromDataKeyGetValue({name: 'Max', age: 30}, 'name'))
console.log(fromDataKeyGetValueEcho({poke: 'Pikachu', id: '150', inPokedex: false}, 'inPokedex'))

// ==================  Mark learned: [] ================================ //
/**
 * Built-in Generics
 * TS Helpers
 */

// Built-in Generics
// What are Built-in Generics?
// Built-in Generics are generic types that are included in the TypeScript standard library.

// ### Array
// Array<T> is a generic type that is used to create arrays.
// The T in Array<T> is a type variable.

// Example.
const testResults: Array<number> = [1.94, 2.33];
const testResults2: number[] = [1.94, 2.33]; // -> shorter syntax
testResults.push(-2.99);
testResults2.push(5.89);
// testResults.push('stringWhatever'); // -> Error

// ### Tuple
// Tuple<T> is a generic type that is used to create tuples.
// The T in Tuple<T> is a type variable.

// Example.
const tuple: [number, string] = [1, 'stringWhatever'];
// const tuple: [number, string] = ['stringWhatever', 1]; // -> Error
// const tuple: [number, string] = [1, 'stringWhatever', 1]; // -> Error
// const tuple: [number, string] = [1]; // -> Error
// const tuple: [number, string] = []; // -> Error

console.log(tuple);

// ### ReadonlyTuple
// ReadonlyTuple<T> is a generic type that is used to create tuples.
// The T in ReadonlyTuple<T> is a type variable.

// Example.
const readonlyTuple: readonly [number, string] = [1, 'stringWhatever'];
// const readonlyTuple: readonly [number, string] = ['stringWhatever', 1]; // -> Error
// const readonlyTuple: readonly [number, string] = [1, 'stringWhatever', 1]; // -> Error
// const readonlyTuple: readonly [number, string] = [1]; // -> Error
// const readonlyTuple: readonly [number, string] = []; // -> Error

// Alternative syntax
type MyTuple = [number, string];
const readonlyTuple2: Readonly<MyTuple> = [1, 'stringWhatever'];

// console.log(readonlyTuple.push('newItem')); // -> Error
console.log(readonlyTuple)
console.log(readonlyTuple2)

// ### Readonly -> Best Option
// Readonly<T> is a generic function that is used to create readonly types.
// The T in Readonly<T> is a type variable.
// Example: ReadonlyArray<T>

// Example.
type ReadonlyPerson = Readonly<Person>;

const readonlyPerson: ReadonlyPerson = {
//                      ^?
  name: 'Max',
  age: 30,
};

// readonlyPerson.name = 'Manu'; // -> Error
console.log(readonlyPerson);

// ### Partial
// Partial<T> is a generic function that is used to create partial types.
// The T in Partial<T> is a type variable.

// Example.
interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;

const partialPerson: PartialPerson = {
//                      ^?
  name: 'Max',
};

console.log(partialPerson);

/**
 * ⭐⭐ Most used helpers ⭐⭐
 * 👉 Pick
 * 👉 Omit
 * 👉 Record
 * 👉 Exclude
 * 👉 Extract
 * 👉 NonNullable
 * 👉 Parameters
 * 👉 ReturnType
 * 👉 Required
 * 👉 Partial
 * 👉 React.FC
 * 👉 React.ComponentProps
 */

/**
 * Represents a person with a name and an age.
 * Initial interface version.
 */
interface Person {
  name: string;
  age: number;
}

// ### Pick
// Pick<T, K> is a generic function that is used to create types from existing types.
// The T in Pick<T, K> is a type variable.
// The K in Pick<T, K> is a type variable.

// Example.
interface Person {
  name: string;
  age: number;
}

type PickPerson = Pick<Person, 'name'>;
//        ^?

const pickPerson: PickPerson = {
  name: 'Max',
};

console.log(pickPerson);

// Alternative syntax with interface

// interface PickPerson2 extends Pick<Person, 'name'> {
//   pets: number;
// }
// const pickPerson2: PickPerson2 = {
//   name: 'Max',
//   pets: 3,
// };
// console.log(pickPerson2);

// ### Omit
// Omit<T, K> is a generic function that is used to create types from existing types.
// The T in Omit<T, K> is a type variable.
// The K in Omit<T, K> is a type variable.

// Example.
interface Person {
  name: string;
  age: number;
}

type OmitPerson = Omit<Person, 'age'>;

const omitPerson: OmitPerson = {
  name: 'Max',
};

console.log(omitPerson);


// ### Record
// Record<K, T> is a generic function that is used to create types from existing types.
// The T in Record<K, T> is a type variable.
// The K in Record<K, T> is a type variable.

type PersonIDs = '1acd' | '2acd' | '3acd';
type RecordPerson = Record<PersonIDs, Person>;

const recordPerson: RecordPerson = {
  '1acd': {
    name: 'Max',
    age: 10,
  },
  '2acd': {
    name: 'Pete',
    age: 20,
  },
  '3acd': {
    name: 'July',
    age: 30,
  },
};

console.log(recordPerson);

// Extra Example.

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const inputs: Record<
  keyof FormValues,
  {
    initialValues: string,
    label: string
  }
> = {
  name: {
    initialValues: 'Max',
    label: 'Name',
  },
  email: {
    initialValues: '',
    label: 'Email',
  },
  password: {
    initialValues: '',
    label: 'Password',
  }
};

console.log(inputs);

// ### Exclude
// Exclude<T, U> is a generic function that is used to create types from existing types.
// The T in Exclude<T, U> is a type variable.
// The U in Exclude<T, U> is a type variable.

// Example 1 List.
type PersonsList = 'Tom' | 'Eze' | 'Jen';
type ExcludePerson = Exclude<PersonsList, 'Eze'>;
const excludePerson: ExcludePerson = 'Tom';
console.log(excludePerson);

// Example 2 Alternative syntax with Omit only available with Union strings.
type PersonsList2 = 'Tom' | 'Eze' | 'Jen';
type OmitPersonExclude = Omit<PersonsList2, 'Tom'>;
const excludePerson2: OmitPersonExclude = 'Eze';
console.log(excludePerson2);

// Example 2 Object.
type PersonDataObj = ({name: 'Tom'} | {name: 'Eze'} | {name: 'Jen'}) & {age: number};
type ExcludePersonObj = Exclude<PersonDataObj, {name: 'Tom'}>;
const excludePersonWithObj: ExcludePersonObj = {name: 'Eze', age: 100};
console.log(excludePersonWithObj);

// ### Extract
// Extract<T, U> is a generic function that is used to create types from existing types.
// The T in Extract<T, U> is a type variable.
// The U in Extract<T, U> is a type variable.

// Example 1 List.
type PersonsList3 = 'Tom' | 'Eze' | 'Jen';
type ExtractPerson = Extract<PersonsList3, 'Eze'>;
const extractPerson: ExtractPerson = 'Eze';
console.log(extractPerson);

// Example 2 Object.
type PersonDataObj2 = ({name: 'Tom'} | {name: 'Eze'} | {name: 'Jen'}) & {age: number};
type ExtractPersonObj = Extract<PersonDataObj2, {name: 'Tom'}>;
const extractPersonWithObj: ExtractPersonObj = {name: 'Tom', age: 100};
console.log(extractPersonWithObj);

// NonNullable
// NonNullable<T> is a generic function that is used to create types from existing types.
// The T in NonNullable<T> is a type variable.

// Example.

type StringNullable = string | null | undefined;

type NonNullablePerson = NonNullable<StringNullable>;

const nonNullablePerson: NonNullablePerson = 'Max';
console.log(nonNullablePerson);

// Parameters
// Parameters<T> is a generic function that is used to create types from existing types.
// The T in Parameters<T> is a type variable.

// Example.

type PersonArgs = {
  name: string;
  age: number;
};
type PersonParametersFn = (person: PersonArgs) => void;

type ParametersPerson = Parameters<PersonParametersFn>;
//     ^?

const echoPersonArgs = (...args: ParametersPerson) => args
// const echoPersonArgs = (...args: ParametersPerson): PersonArgs => args[0]

console.log(echoPersonArgs({name:'Max', age: 30}))


// ReturnType
// ReturnType<T> is a generic function that is used to create types from existing types.
// The T in ReturnType<T> is a type variable.

// Example.

type PersonReturnType = ReturnType<typeof echoPersonArgs>;
//     ^?

const echoPersonReturnType = (): PersonReturnType => [{name:'Max', age: 30}]
// const echoPersonReturnType = (): PersonReturnType => ({name:'Max', age: 30}) // -> Error //TODO: make a change on return type of echoPersonArgs fn to make this work

// Log the return type of echoPersonReturnType
console.log(echoPersonReturnType())
