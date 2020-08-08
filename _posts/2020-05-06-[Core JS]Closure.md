---
layout: post
title: '[Core JS] 클로저란?'
date: 2020-05-06
author: changsun oh
tags: javascript CoreJS
comments: true
share: true
related: false
---

클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다. [`출처 : MDN`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures), JS 대표 사이트인 MDN에서의 설명이다. 정의만 가지고는 이해하기 쉽지 않다. 왜냐하면 우리는 어휘적 환경이 어떤 의미를 가지고 있는지 모르기 때문이다. 

### 어휘적 환경`LexicalEnvironment`이란?

먼저 문자 그대로 의미를 살펴보자, `어휘적` + `환경`으로 영어로하면 `lexcial` + `Environment`이다.
`LexicalEnvironment`는 **실행 컨텍스트편** 에서 배웠다. 실행 컨텍스트에서 `LexicalEnvironment`는 유효범위인 스코프가 결정되며, 
스코프 체인이 가능하게 하는 역할을 한다고 배웠다. `LexicalEnvironment`으로 인해 스코프가 어떻게 동작하는지 확인해보자.

```javascript
var name = 'global';
var log = function () {
  console.log(name);
}

var outer = function() {
  name = 'outer';
  log();
}
outer();
```

1. 전역 컨텍스트 생성
  `LexicalEnvironment`
   environmentRecord : { name : 'global', log : f, outer : f}
   outerEnvironment : {}
   
2. outer 컨텍스트 생성 
  `LexicalEnvironment`
   environmentRecord : {}
   outerEnvironment : { name : 'global' -> 'outer', log : f, outer : f }

3. log 컨텍스트 생성 
   `LexicalEnvironment`
   environmentRecord : {}
   outerEnvironment : { name : 'global' -> 'outer', log : f, outer : f }

log()는 outer를 출력하게된다. 

위 코드를 약간만 수정해보자. 

```javascript
var name = 'global';
var log = function () {
  console.log(name);
}

var outer = function() {
  var name = 'outer';
  log();
}
outer();
```

1. 전역 컨텍스트 생성
  `LexicalEnvironment`
   environmentRecord : { name : 'global', log : f, outer : f}
   outerEnvironment : {}
   
2. outer 컨텍스트 생성 
  `LexicalEnvironment`
   environmentRecord : { name : 'outer' }
   outerEnvironment : { name : 'global', log : f, outer : f}

3. log 컨텍스트 생성 
   `LexicalEnvironment`
   environmentRecord : {}
   outerEnvironment : { name : 'global', log : f, outer : f}

log 컨텍스트에서 name은 'global'이므로 global을 출력하게 된다. 
이러한 현상으로 `스코프가 함수가 호출할 때가 아니라 선언할 때` 생긴다고 말씀하시는 분들도 있지만,
그것보다는 실행 컨텍스트가 어떻게 동작하는지 이해하고 접근한다면 훨씬 도움이 될꺼라 믿습니다. 

### 클로저란? 

> 클로저는 함수와 함수가 선언된 `어휘적 환경`의 `조합` 

예시로 좀더 정확하게 이해해보자. 

```javascript
function outer() {
  function inner(){
    console.log(++a);
  }
  var a = 1;
  inner();
  console.log(a);
}
outer(); 
```

즉 내부함수에서 외부함수의 변수에 접근할 수 있는 것이 바로 클로저의 역할이다.

```javascript
function outer() {
  var a = 0;
  function inner(){
    console.log(++a);
  }
  return inner();
}
outer(); 
outer();

실행결과 
1
1

8번째줄 outer 함수를 실행하면서 변수 a에 0을 할당한다 
이후 inner 함수에서 outer 함수 변수 a에 접근하여 1을 증가한값인 1을 출력한다. 
9번째줄 또한 outer 함수를 새로 실행하면서 변수 a에 0을 할당한다.
이후 동일하게 inner 함수에서 outer 함수 변수 a에 접근하여 1을 증가한값인 1을 출력한다. 
```

outer 함수가 종료된 이후에 inner함수를 호출할수 없는 코드이다. 
어찌보면 너무 당연한 말이지만, 이런경우도 있을수 있다. 
어떤경우에는 outer 함수가 종료된 이후에도 inner 함수를 호출 할 수 있다.
코드로 살펴보자. 

```javascript
function outer() {
  var a = 0;
  function inner(){
    console.log(++a);
  }
  return inner;
}
var smallInner = outer(); 
smallInner();
smallInner();

실행결과
1
2

8번째 줄 outer 함수를 실행하면서 변수 a에 0을 할당하고 inner 함수를 반환한다.
smallInner에는 inner함수가 들어가게 된다. 
이후 9번째 줄 smallInner가 변수 a에 접근 후 1을 증가하여 1을 출력한다. 
이후 10번째 줄 smallInner가 변수 a에 접근 후 1을 증가하여 2을 출력한다.
```
 inner함수가 outer함수가 종료된 이후에도 outer함수의 변수에 접근할 수 있다는 점이 신기하다.
 이런 기능이 가능한 이유는 바로 가비지 컬렉터의 역할 때문인데, 가비지 컬렉터는 어떤 값을 참조하는
 값이 하나라도 있다면 그 값을 수집 대상에 포함시키지 않기 때문이다.

즉 정리하면 
> 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우
> A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상을 말한다.

위의 예시만 봤을때 약간의 오해의 소지가 있다.
가장큰 오해의 소지로는 외부 변수를 참조하는 내부변수는 `return`한 경우에만 있다고 생각 한다.
`return` 없이도 클로저가 발생하는 다양한 경우를 예시로 확인해보자 

첫째 setInterval/setTiemout
```javascript
function outer () {
  var a = 0;
  var intarvalId = null;
  var inner = function(){
    if( a < 5)
      console.log(++a);
    else
      clearInterval(intarvalId);
  };
  intarvalId = setInterval(inner, 1000);
}
outer();

실행결과 
1
2
3
4
5

setInterval 함수의 첫번째 인자로 콜백함수인 inner 함수를 매개변수로 전달한다.
이때에도 클로저가 발생하여 외부함수에 a 변수를 찾고, 외부함수 outer에 a가 할당 되어 있으므로, 
a를 참조하여 실행한다. 
```

둘째 eventListenser
```javascript
function outer(){
  var count = 0;
  const button = document.createElement('button');
  button.innerHTML = "CLICK";
  button.addEventListener("click", function inner() {
    console.log(++count);
  })
  
  document.body.appendChild(button);
}

outer();
실행결과 
CLICK 버튼 클릭시 count 값 증가출력

button dom을 생성하여 이벤트를 생성한다. 이벤트 실행시 콜백함수로 inner함수를 실행하게된다.
inner함수는 count값을 증가후 console에 출력하는데, 이때 클로저가 발생하여 outer count에 접근하여
count값을 증가하여 출력할 수 있게 된다. 
```

> 이렇게 클로저는 return이라는 특수한 상황에만 발생하는 것이 아니다. 


### 클로저와 메모리 관리
지금까지 클로저에 대해 간단하게 알아보았다. 클로저로 실행이 끝난 외부 함수의 변수에 접근 할 수 있수 있다 배웠다.
좀더 정확하게는 `가비지 컬렉터`가 어떤 값을 하나라도 참조하는 값이 있다면, 그 값은 수집 대상에 포함시키지 않게 된다. 
이에따라 클로저를 사용하게 될수록 메모리 누수가 발생하게 된다. 이런 이유로 클로저 사용을 조심해야한다는 사람들도 있다.

이러한 메모리 누수를 해결하기 위한 간단한 관리방법을 알아보자. 
관리방법이라고 하니 엄청나 보이지만, 아주 간단하다. 클로저를 통해 접근한 지역변수를 다 사용했다면 메모리를 소모하지 않도록
참조 카운트를 0으로 만들면 된다. 그러면 언젠가 `가비지 컬렉터`가 수거해 갈 것이고, 소모되었던 메모리는 회수되게 된다. 
참조 카운트를 0으로 만드는 방법으로 `참조형`이 아닌 `기본형`데이터(null, undefined)를 할당하게된다. 
참조 카운트에 `기본형`데이터를 넣는다는것은 이전에 참조하고 있던 함수를 끊는다는 것과 동일한 의미를 가진다. 

앞에서 배웠던 예시들에 메모리 해제 코드를 추가해보자. 

```javascript
function outer() {
  var a = 0;
  function inner(){
    console.log(++a);
  }
  return inner;
}
var smallInner = outer(); 
smallInner();
smallInner();
// smallInner에 outer함수의 inner참조를 끊는다.  
smallInner = null;

function outer () {
  var a = 0;
  var intarvalId = null;
  var inner = function(){
    if( a < 5){
      console.log(++a);      
    }
    else{
      clearInterval(intarvalId);
      // inner 변수의 익명함수 참조를 끊는다. 
      inner = null;
    }
  };
  intarvalId = setInterval(inner, 1000);
}
outer();

function outer(){
  var count = 0;
  const button = document.createElement('button');
  button.innerHTML = "CLICK";
  button.addEventListener("click", function inner() {
    console.log(++count);
  })
  // 카운트의 제한이 없으므로 실별자의 참조를 끊을 수 없다.
  document.body.appendChild(button);
}
```

## 클로저의 활용 사례
지금까지 클로저에 대하 알아보았다. 클로저는 특정 조건에서 변수가 사라지지 않는 현상으로 배웠다. 그리고 변수가 사라지지
않아 메모리 누수가 있어 이러한 메모리 누수를 해결하는 방법 또한 알아보았다. 지금 부터는 배운 내용을 활용해보자.

### 첫째. 콜백 함수 내부에서 외부 데이터를 사용할때
```javascript 
var items = ["faith", "love", "hope"];
var $ul = document.createElement('ul');

items.forEach(function(item){
  var $li = document.createElement('li');
  $li.innerHTML = item;
  
  $li.addEventListener('click', function(){
    alert('click' + item);
  });

  $ul.appendChild($li);
})

document.body.appendChild($ul);
```
4번째줄 익명의 콜백함수는 items의 개수만큼 반복 후 종료한다. 
8번째줄 익명의 콜백함수는 item라는 외부변수를 사용하고 있으므로 클로저가 있다.
이에따라 4번째줄의 콜백함수의 실행컨텍스트가 끝났음에도 외부 변수인 item 에 접근할수 있게된다.

더나아가 8번째 줄 함수가 콜백 함수로만 쓰이는 것이 아니라, 다양하게 쓰이게 된다면 외부로 분리해야 하는 경우가 생긴다. 
```javascript
var items = ["faith", "love", "hope"];
var $ul = document.createElement('ul');

var alertItem = function(item){
  alert('click' + item);
}

items.forEach(function(item){
  var $li = document.createElement('li');
  $li.innerHTML = item;
  $li.addEventListener('click', alertItem);
  $ul.appendChild($li);
})

document.body.appendChild($ul);
```
실행결과 => click[object MouseEvent]

라는 만족스럽지 못한 결과를 가져온다. 
왜냐하면 콜백함수의 첫번째 인자는 addEventListener가 주입하기 때문이다. 
이러한 문제를 해결하기 위해서, 함수를 반환하고 인자의 값을 바꿀수 있도록 도와주는 
bind 메서드를 활용하여 간단하게 수정할 수 있다.
```javascript
var items = ["faith", "love", "hope"];
var $ul = document.createElement('ul');

var alertItem = function(item){
  alert('click' + item);
}

items.forEach(function(item){
  var $li = document.createElement('li');
  $li.innerHTML = item;
  $li.addEventListener('click', alertItem.bind(null, item));
  $ul.appendChild($li);
})

document.body.appendChild($ul);
```
하지만 this의 값이 바뀐다는 아쉬운 부분도 존재한다. 

this값이 바뀌면 안된다면, 고차함수를 활용하여 해결할 수 있다.

```javascript
var items = ["faith", "love", "hope"];
var $ul = document.createElement('ul');

var alertItem = function(item){
  return function() {
    alert('click' + item);
  } 
}

items.forEach(function(item){
  var $li = document.createElement('li');
  $li.innerHTML = item;
  $li.addEventListener('click', alertItem(item));
  $ul.appendChild($li);
})

document.body.appendChild($ul);
```
alertItem은 함수를 리턴한다. 리턴된 함수는 alert을 띄어주게된다. 
이때 item 값은 외부변수의 값을 참조하여 만들어지므로 클로저가 존재한다. 

이렇게 콜백 함수 내부에서, 외부 데이터를 사용하는 방법에 대해 알아보았다. 

### 둘째. 접근 권한 제어
`접근 권한`에는 `public`,`private`,`protected`로 총 3가지로 구성되어있다. 
간단하게 `public`은 내부 외부에서 모두 접근이 가능하며, `private`는 내부에서만 사용되고 외부에서는 
노출되지도 않아 접근조차 하지 못하게 하는 것을 의미한다. 

클로저는 외부 함수의 변수에 접근하는 현상을 의미하는데, return으로 외부 함수의 변수 접근할 수 있다는 걸 배웠다.
이처럼 클로저를 활용하면 외부 스코프에서 특정 함수 내부의 특정 변수에 대한 접근 권한을 부여할 수 있게 된다.
즉 return한 변수들은 `public`데이터가 되고, return 되지 않은 변수들은 `private`데이터가 된다. 

> return한 변수들은 `public`데이터가 되고, return 되지 않은 변수들은 `private`데이터가 된다. 

```javascript
function outer() {
  let a = 0;
  let inner = function () {
    let b = 0;
    console.log(++a, b);
  }
  return inner;
}
var outer2 = outer();
outer2();
```
앞서 공부했던 예시이다. outer함수는 외부로 부터 철저히 격리된 공간이다. 
outer함수를 실행할수는 있지만, outer함수 내부의 변수에는 접근할수 없다. 
만약 outer함수의 내부의 변수를 변경하고 싶으면 outer함수가 return한 정보로만 
접근 및 변경 할 수 있게 된다. 

inner함수는 내부 외부에서 모두 접근이 가능하고, outer함수의 a는 내부에서만 접근이 가능하므로
`public`데이터는 **inner()** 함수이며, `private`데이터는 **a** 임을 알수있다.

> return한 변수들은 공개 변수이며, 그렇지 않음 변수들은 비공개 변수가 된다.

### 셋째. 부분 적용 함수
부분 적용 함수는 문자 그대로 부분만 적용하여 기억하는 함수이다. 
다시말해 10개의 인자를 받는 함수가 있는데, 미리 5개의 인자만 받아 기억했다가 나중에 5개의 인자를
받으면 실행 결과를 얻을수 있게 되는 함수이다. this 우회할때 배웠던 bind 메서드의 실행결과 경우에 따라 부분 적용 함수가 된다. 

```js
var add = function(){
  var result = 0;
  for( var i = 0 ; i < arguments.length ; i++){
    result += arguments[i];
  }
  return result;
}

var addPartial = add.bind(null, 1, 2, 3, 4, 5); // bind 함수로 저장 
console.log(addPartial(6, 7, 8, 9, 10)) 
```
물론 위와 같은 방법으로 부분적용함수를 구현할 수 있으나, 실무에서 this의 값이 변경되는건 리스크다 크다. 
따라서 클로저를 활용하여 this의 값이 변경되지 않도록 구현해보자. 

```js
var partial = function(){
  // 인자값 저장
  var originalPartialArgs = arguments;
  // 첫번째 인자는 함수
  var func = originalPartialArgs[0];
  // 인자값 체크
  if(typeof func !== "function"){
    throw new Error('첫번째 인자가 함수가 아닙니다');
  }
  
  return function(){
    // 부분 함수의 인자 값
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    // 인자 값
    var restArgs = Array.prototype.slice.call(arguments);
    // 전달할 인자들을 모아 전달
    return func.apply(this, partialArgs.concat(restArgs));
  }
}

var add = function(){
  let value = 0;
  for( let i = 0 ; i < arguments.length; i++){
    value += arguments[i];
  }
  return value;
}

var addPartial = partial(add, 1,2,3);
console.log(addPartial(4,5));
```

부분함수를 사용하기 위한 적합한 예로 디바운스가 있다. 
디바운스는 동일한 이벤트가 많이 발생한 경우 전부처리하지 않고, 
마지막에 발생한 이벤트에 대해 한번만 처리한다.
프론트엔트 최적화에 큰 도움을 주는 기능이다. 

```js
let debounce = function (event, func, wait) {
  let timeoutId = null;
  return function (event) {
    var self = this;
    console.log(event, 'event 발생');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var resizeHandler = function (e) {
  console.log('wheel event 처리');
};

window.addEventListener('resize', debounce('resize', resizeHandler, 500));
```

실전에서 정말 많이 사용되는 함수! 꼭 이해하자 


### 넷째. 커링 함수 
여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 실행하게 끔 하는 함수 

커링함수의 의미를 알았지만, 실제적으로 개발단계에서 많이 사용해보지는 않았다.
굳이 여러개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 실행할 필요가 있을까? 

물론 책에서는 원하는 시점까지 지연시켰다가 실행하는 것이 요긴한 상황이라면 쓰기에 적합하다고 하지만,
그러한 경우가 얼마나 있을까? 그러한 경우로 Flux 아키텍처 구현체 중 Redux의 미들웨어에서 사용된다고 한다. 
아키텍처 공부할 때 유용하게 사용될수 있을꺼 같으니까 일단 개념적으로만이라도 알아두자 


> 참조 : 코어 자바스크립트 