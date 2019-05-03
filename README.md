# ts_snippets

## ts学习进阶

## 基础类型

### 布尔值
最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）
```
let bool: boolean = true;
```

### 数字
和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，Typescript还支持ECMAScript 2015中引入的二进制和八进制字面量。
```
let num: number = 12;
num = 0b1111011
num = 0o173
num = 0x7b
```

### 字符串
ts中也可使用es6中的模板字符串来定义多行文本和内嵌表达式
```
let str: string
str = `数值是${num}`
```

### 数组
TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
```
let arr1: number[]
arr1 = [5]
```
第二种方式是使用数组泛型，Array<元素类型>：
```
let arr2: Array<number> = [2,5,8]
```

### 元组 Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```
let tuple: [string, number, boolean]
tuple = ['a', 1, false]
```

### 枚举
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```
enum Roles {
    SUPER_ADMIN,
    ADMIN,
    USER
}
console.log(Roles.ADMIN);   // 1
```

### any 任意值
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```
let value: any
value = 'summer';
value = 12;
value = false
const arr4: any[] = [1, false]
```

### void 空值
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```
const consoleText = (text: string): void => {
    console.log(text)
}
```

### null和undefined
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。默认情况下null和undefined是所有类型的子类型。
```
let u: undefined;
u = undefined;
// u = 12

let n: null;
// n = 'string';
n = null;
```

### never
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
```
const errorFunc = (message: string): never => {
    throw new Error(message)
}
const infiniteFunc = (): never => {
    while(true) {

    }
}
let neverVariable = (() => {
    while(true) {

    }
})()
num = neverVariable
```

### 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
类型断言有两种形式。 其一是“尖括号”语法，另一个为as语法。
```
const getLength = (target: string | number): number => {
    if((<string>target).length || (target as string).length === 0) {
        return (<string>target).length
    } else {
        return target.toString().length
    }
}
```

## Symbols
自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。

symbol类型的值是通过Symbol构造函数创建的。
```
let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key

```
Symbols是不可改变且唯一的。
```
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的
```
像字符串一样，symbols也可以被用做对象属性的键。
```
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"
```
除了用户定义的symbols，还有一些已经众所周知的内置symbols。 内置symbols用来表示语言内部的行为。
* Symbol.hasInstance
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
* Symbol.isConcatSpreadable
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
* Symbol.iterator
方法，被for-of语句调用。返回对象的默认迭代器。
* Symbol.match
方法，被String.prototype.match调用。正则表达式用来匹配字符串。
* Symbol.replace
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。
* Symbol.search
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。
* Symbol.species
函数值，为一个构造函数。用来创建派生对象。
* Symbol.split
方法，被String.prototype.split调用。正则表达式来用分割字符串。
* Symbol.toPrimitive
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。
* Symbol.toStringTag
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。
* Symbol.unscopables
对象，它自己拥有的属性会被with作用域排除在外。

## 接口
接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

### 接口初探
```
interface NameInfo {
    firstName: string,
    lastName: string
}

const getFullName = ({ firstName, lastName}: NameInfo): string => {
    return `${firstName} ${lastName}`
}

getFullName({
    firstName: 'Jack',
    lastName: 'cool'
})
```

### 可选属性
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
```
interface Vegetable {
    color?: string,
    type: string
}

const getVegetables = ({ color, type}: Vegetable) => {
    return `A ${color ? (color + ' '): ''}${type}`
}

getVegetables({
    // color: 'green',
    type: 'Spinach' 
})
```

* 多余属性绕过检查
    * 类型断言

    ```
    let Juice = getVegetables({ color: 'orange', type: 'juice', price: '14/g' } as Vegetable);
    ```

    * 添加一个字符串索引签名

    ```
    interface Vegetable {
        color?: string,
        type: string,
        [propName: string]: any
    }
    ```

    * 将这个对象赋值给一个另一个变量

    ```
    const vegetableInfo = {
        color: 'orange',
         type: 'juice',
         size: '8kg'
    }
    let Juice = getVegetables(vegetableInfo)
    ```

### 只读属性
一些对象属性（数组同样适用）只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
```
interface Vegetable {
    color: string,
    readonly type: string
}
let juice: Vegetable = {
    type: 'juice'
}
juice.type = 'banana';  // error
```

### 函数类型
接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```
interface AddFunc {
    (num1: number, num2: number): boolean
}

let myAdd: AddFunc = (n1, n2) => {
    if (n1 > n2) {
        return true
    } else {
        return false
    }
}
```
