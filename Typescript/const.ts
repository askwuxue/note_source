const obj: object = {
  a: "a",
};

// type Foo = {
//   readonly a: "aaa";
// };

// let a: number = "2";

type Person = {
  name: string;
  age: number;
};

const me: Person = { name: "gzx", age: 16 };

type P = keyof typeof me;

const a: P = "age";

type TypeToNumber<T> = {
  [key in keyof T]: number;
};

const obj1: TypeToNumber<Person> = { name: 10, age: 10 };

type Foo<T> = T extends { t: infer Test } ? Test : string;

type One = Foo<number>;

type Two = Foo<{ t: boolean }>;

type Three = Foo<{ a: number; t: () => void }>; // () => void

// type Record<K extends keyof any, T> = {
//   [key in K]: T;
// };

const obj3: Record<string, string> = { name: "zhangsan", tag: "打工人" };
