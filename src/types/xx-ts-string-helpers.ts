// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types

//Uppercase<StringType>
//Lowercase<StringType>
//Capitalize<StringType>
//Uncapitalize<StringType>

type LowercaseGreeting = "hello, world";

export type Greeting = Capitalize<LowercaseGreeting>;
//            ^?