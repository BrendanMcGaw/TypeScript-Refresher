// Explicit type (because we're explicitly saying that userName must be a number.)
let userName: number;

// Infers that the otherName variable's type will be a string.
let otherName = "Max";

userName = 34;

// Infers type is number
let userAge = 34;

// Infers type boolean.
let isValid = true;

type StringOrNum = string | number | boolean;
// string, number, boolean.
// | is or in typescript. Making userID a union type.
let userID: StringOrNum = "abc1";
userID = 123;
userID = true;

// Object based type safety.

type User = {
    name: string;
    age: number;
    isAdmin: boolean;
    id: string | number;
};

let user: User = {
    name: "Max",
    age: 34,
    isAdmin: true,
    id: "abc", // 123
};

// Inside the arrow brackets is the type allowed for the Array.
// let hobbies: Array<string | number>;
let hobbies: string[];

hobbies = ["Sports", "Cooking", "Reading"];

// Argument type assignment.
// the : after the arguments declares the return type.
// void should be used if the function doesn't return anything.
// Can also leave the return type as blank as the return type would be inferred.
function add(a: number, b: number): number | string {
    const result = a + b;
    console.log(result);
    return result;
}

// This is a custom type.
// type can be used for everything.
type AddFn = (a: number, b: number) => number | string;

// calcFn: () => is a type creation, not a value creation.
const calculate = (
    a: number,
    b: number,
    calcFn: AddFn // return type of called function is number.
) => {
    calcFn(a, b);
};

calculate(2, 5, add);

// interface can pretty much only be used for object types.
interface Credentials {
    password: string;
    email: string;
}

let creds: Credentials;

creds = {
    password: "abc",
    email: "blahblah@gmail.com",
};

// Only real use case for interfaces. But probably never use.
class AuthCredentials implements Credentials {
    email: string;
    password: string;
    userName: string;
}

function login(credentials: Credentials) {}

login(new AuthCredentials());

type Admin = {
    permissions: string[];
};

type AppUser = {
    userName: string;
};

// Creates a merged type.
type AppAdmin = Admin & AppUser;

let admin: AppAdmin = {
    permissions: ["Login"],
    userName: "Max",
};

// interface Admin {
//   permissions: string[];
// }

// interface Appuser {
//   userName: string;
// }

// interface AppAdmin extends Admin, AppUser {
//   permissions: ["Login"];
//   userName: "Max";
// }

// literal types -- Forces Role to be only one of these strings.
let role: "admin" | "user" | "editor"; // "admin", "user", "editor"

role = "admin";
role = "user";
role = "editor";

type Role = "admin" | "user" | "editor";

const performAction = (action: string | number, role: Role) => {
    // this is called a typeguard (Checks to see what concrete type is being used ie. typeof action === "string")
    if (role === "admin" && typeof action === "string") {
        // this allows TypeScript to perform "Type Narrowing". Basically narrows a broader union type down to a specific type.
        // do something only if admin present.
    }
};

// Generic types = Array a generic type argument must be passed with angle brackets
// This is a built in generic type, but we can make custom ones too!
let roles: Array<Role>;
roles = ["admin", "editor"];
// Generic types are basically types that work TOGETHER with ANOTHER type. As per the <Role> -- Works together just means that the type needs further information regarding the type of values that should be stored in the array. Etc..

// This is a custom generic type.
// Inside the angled brackets we declare our generic types <T> as a placeholder, can be any variable really.
type DataStorage<T> = {
    storage: T[]; // When I don't know what type of data is going to be stored, generic types rock. ie. T as a placeholder.
    add: (data: T) => void;
};

// Defines string as the type to be used in DataStorage
const textStorage: DataStorage<string> = {
    storage: [],
    add(data) {
        this.storage.push(data);
    },
};

const userStorage: DataStorage<User> = {
    storage: [],
    add(user) {},
};

function merge<T, U>(a: T, b: U) {
    return {
        ...a,
        ...b,
    };
}

const newUser = merge<{ name: string }, { age: number }>(
    { name: "Max" }, // = T type which is inferred to be a string.
    { age: 34 } // = U type which is inferred to be a number.
);

newUser.name;
