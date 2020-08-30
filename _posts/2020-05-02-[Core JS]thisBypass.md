---
layout: post
title: '[Core JS] this 우회방법'
date: 2020-05-02
author: changsun oh
tags: javascript CoreJS
comments: true
share: true
related: false
---
## 목표 
* this를 우회하는 3가지 방법을 이해한다. 
* 변수를 활용하여 this를 우회한다. 
* 화살표 함수를 이용하셔 this를 우회한다.
* call, apply, bind 메서드를 이용하여 this를 우회한다.

## this 우회 배경
* 상황에 따라 this가 결정된다. 
  *  this는 기본적으로 실행 컨텍스트가 생성될때 결정된다.
  *  함수 내부에서 this는 **전역 객체**로 결정된다. 
  *  메서드 내부에서 this는 **호출한 주체의 정보**로 결정된다.
  *  콜백 함수의 경우 **제어권을 가지는 함수**가 결정한다.
  *  생성자 함수에서 this는 **class 객체** 즉 자기자신이 된다.  
* 특정 상황에 맞는 this를 할 수 있게 된다.  
* 함수 내부에서는 this가 **전역 객체**로만 결정되는 오류를 해결 할 수 있다.

## 변수를 활용한 this 우회 

```javascript 
var object = {
    outer : function() {
        var self = this;
        var inner = function(){
            console.log('inner' + self);
        }
        console.log('outer' + this);
        inner();
    }
}

object.outer();

/* 실행결과 
outer[object Object]
inner[object Object]
*/ 
```
1. 먼저 전역 컨텍스트가 생성이되고 object 객체를 생성한다.  
  → 12 번째줄object객체의 메서드 outer() 실행 
2. outer() 실행 컨텍스트가 생성되면서 this는 호출한 주체인 object 를 바인딩 한다.
3. inner() 실행 컨텍스트가 생성되고 this는 window 를 바인딩 한다.  
  → 4 번째줄 console 실행 : inner object object  
  → 6 번째줄 console 실행 : outer object object

self라는 변수에 outer의 호출 객체를 바인딩한 **this(object)**를 할당함으로 inner함수에도 스코프 체인에 의해 **this(object)**에 접근할 수 있게 된다.  

## 화살표 함수를 이용한 this 우회

* ES6에서는 this가 전역객체를 바라보는 문제를 해결하고자, this를 바인딩하지 않는 화살표 함수가 생성
* ES6가 지원된다면 **화살표 함수**로 간단하게 구현하자

```javascript 
var object = {
    outer : function() {
        var inner = () => {
            console.log('inner' + self);
        }
        console.log('outer' + this);
        inner();
    }
}

object.outer();
```

1. 먼저 전역 컨텍스트가 생성이되고 object 객체를 생성한다. 
2. 12 번째줄object객체의 메서드 outer() 실행 
3. outer() 실행 컨텍스트가 생성되면서 this는 호출한 주체인 object 를 바인딩 한다.
4. inner() 실행 컨텍스트가 생성되면서 this는 바인딩 되지 않는다.  
5. this가 바인딩 되어 있지않으므로 상위 스코프의 this에 접근한다.
  → 4 번째줄 console 실행 : inner object object
6. 6 번째줄 console 실행 : outer object object


## call, apply, bind 메서드를 활용한 this 우회

### 1. call
> call 메서드는 주어진 **this**값 및 각각 전달된 인수와 함께 호출합니다. [출처 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

 * call 메서드는 this도 함께 전달한다.  
 * call 메서드를 활용하여 this 명시적으로 변경한다.
 * call 메서드는 형변화에 유용하다.

```javascript
let func = function ( a, b, c) {
  console.log(this, a,b,c);
}

func.call({ a:1 }, 1,2,3); // this를 {a:1}로 명시적으로 변경

/* 실행결과 
 {a:1}, 1, 2, 3
*/
```


 * call 메서드는 유사배열객체 NodeList 배열변환시 많이 사용된다.

```html
<div data-number="5"> 5 </div>
<div data-number="15"> 15 </div>
<div data-number="25"> 25 </div>
```

```javascript
var aDiv = Array.prototype.slice.call(document.querySelectorAll("div")) //변환
  .map( function(ele){ return Number(ele.dataset.number)});

/* 실행결과 
5
15
25
*/
```
1. document.querySelectorAll("div")는 유사배열 객체이다. 
2. 따라서 배열메서드인 map이 동작하지 않는다.
3. 이에따라 document.querySelectorAll("div")를 배열로 변환.
4. Array.prototype.slice를 이용해 배열을 반환받는다. 
5. 인풋값이 유사배열 객체 이므로 call() 함수를 사용하여 배열로 변환. 
6. 배열함수인 map을 이용하여 data-number의 값을 가져올수 있게 된다.

* call 메서드를 활용하여 전달인자(arguments)를 배열로 변환할수 있다.

```javascript
function func(){
  var argv = Array.slice.call(arguments);
  argv.forEach( ele => {
    console.log(ele);
  }); 
}

func(1,2,3,4,5);

/* 
실행결과 
1
2
3
4
5
*/
```
 1. arguments는 배열객체가 아니므로 forEach메서드가 없다.
 2. slice.call(arguments)을 사용해여 배열로 변환한다.
 3. forEach를 사용해 순회한다.  

### 2. apply

> apply 메서드는 주어진 **this**값과 배열(또는 유사배열 객체)로 제공되는 **arguments**로 함수를 호출합니다. [출처 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

 * apply 메서드도 call과 동일하게 this도 함께 전달한다.
 * apply 메서드는 call메서드와 다르게 인자로 배열을 전달한다.  
 * 인자로 배열을 넘길 때는 apply 함수가 유용하다.  
 * apply메서드는 형변화에 유용하다.  
   * ES6에서 **Array.from** 메서드가 유사배열 객체를 배열로 변환해 주고 있다.  

```javascript
let func = function ( a, b, c) {
  console.log(this, a,b,c);
}

func.apply({ a : 1}, [1,2,3]);

/* 실행결과 
 {a:1}, 1, 2, 3
*/
```
 * apply 함수를 이용한 최댓값, 최솟값 찾기
  
```javascript
let values = [1, 5, 2, 3, 9];

 // 굳이 this를 바인딩 할 필요가 없으므로 null값을 입력
let max = Math.max.apply(null, values);
let min = Math.min.apply(null, values);
console.log(max,min);

/* 실행결과
9, 1
*/
```

```javascript 
let max = Math.max(...values);
let min = Math.min(...values);
console.log(max,min);
```

### 3. bind  

> 메서드가 호출되면 새로운 함수를 생성, 첫 인자는 `this` 키워드를 설정 [출처 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

```javascript
let func = function(a,b,c){
  console.log(this, a,b,c);
}
func(1,2,3,4);

let bindFunc = func.bind({ x : 1});
bindFunc(1,2,3,4);
```


