---
layout: post
title: '[Core JS] 데이터 타입이란?'
date: 2020-05-01
author: changsun oh
tags: javascript CoreJS
comments: true
share: true
related: false
---

자바스크립트 데이터 타입을 왜 알아야 할까? 데이터 타입을 몰라도 상관없지 않을까? 
그리고 데이터 타입은 무엇이며? 실전에 과연 사용되는 개념일까?
스스로 질문해보고 답변해보자. 

먼저 데이터 타입이 무엇인지 알아보자. 문자 그대로의 의미는 데이터 + 타입 직역하면 데이터의 유형정도로 해석이 된다.
자바스크립트의 데이터의 유형 즉 데이터의 타입은 무엇이 있을까? 크게는 기본형, 참조형이 있다. 
기본형에는 Number, string, boolean, null, undefined이 있으며 
참조형에는 Array, Function, Date, RegExp(정규식), Map, Set이 있다.

데이터 타입이 구분되어 있는 이유는 무엇일까? 동작하는 방식이 다르기 때문인데. 
쉽게 데이터 복제시 기본형은 기본 그대로 값을 복사해서 넣어주는 반면, 참조형은 값이 담긴 주소값을 복사해서 전달하는 점이 다르다.

기본형과 참조형이 구분되어서 까지 데이터 타입이 있는 이유는 무엇일까? 바로 메모리 때문인데. 
메로리를 효율적으로 관리하고자 기본형과 참조형으로 나누어져 있다. ~~현재 메모리 용량이 많아져서 굳이 그럴필요가 있나 생각이 든다.~~

간단하게 메모리에 대해 알아보자.메모리는 컴퓨터의 기억공간으로 0,1로 이루어져있다. 0,1로 이루어져 있는 메모리의 한 조각을 비트라고 한다. 메모리는 많은 비트들로 구성되어 있다. 메모리에 데이터를 저장하고 읽으려면 어떻게 해야할까? 뭐가 되었든 간에 데이터를 저장하고 저장한 위치를 알아야 접근하여 저장된 데이터를 알수 있다.

메모리는 저장된 위치를 메모리 주솟값을 통해 구분하고 연결할수 있다. 우리는 어떻게 메모리에 접근하고 있을까? 바로 변수를 통해서 메모리에 접근하여 데이터를 읽어온다. 

```js
var a = 123;
```
컴퓨터 입장에서 바라보면 메모리 주소 `1000번지`에 이름이 `a` 이고 값이 `123`인 데이터가 저장된다.  
사람은 주소를 생각하지 않고 `a`라는 데이터에 `123`숫가 저장된다고 말한다.

일반적으로 변수를 선언할 때 데이터 타입을 적어 선언하는 경우가 있는 반면, 자바스크립트의 경우 데이터 타입을 적지 않고 변수를 선언한다. 이렇게 된 이유를 간단하게 설명하자면 과거에는 메모리의 크기가 크지 않아서 메모릴 효율적으로 관리할 필요가 있었다. 메모리 용량이 월등히 커진 상황에 등장한 자바스크립트는 상대적으로 메모리 관리에 대한 압박이 적었다. 그래서 메모리 공간을 좀더 넉넉하게 타입 상관없이 할당했습니다. 

### 자바스크립트 변수 선언과 데이터 할당

자바스크립트에서 변수 선언은 ES5 이전 var
ES6 이후 let, const가 추가 되었다. 
변수 선언과 데이터 할당은 어렵지 않다. 

```js
var a;    // 선언 
a = 1;    // 할당

let b;    // 선언
b = 1;    // 할당

const c;  // 선언
c = 3;    // 할당
```

컴퓨터 내부에서는 특정 주소에 공간 하나를 확보한다. 이후 그 공간의 이름을 a로 지정한다. 
여기까지가 변수 a의 선언 과정이다. 

이어서 할당 과정을 진행하는데 특정 주소에 8byte 만큼의 공간을 확보하여 데이터를 삽입힌다. 데이터 영역에서 특정 주소값에 1이라는 데이터를 할당하고. 
그 특정 주소값을 변수 영역에 넣어줌으로써 구현한다. 

4번째 줄 또한 동일하게 특정 주소에 공간 하나를 확보하여. 공간의 이름을 b로하고 특정 주소값에 1이라는 데이터를 할당할것 같지만. 앞서 1이라는 데이터를 가지고 있는 주소가 있으므로 그 주소를 참조한다. 

7번재 줄도 특정 주소에 공간을 만들어 이름이 c로 지정한 후 데이터가 3을 찾고 없으면 특정 주소에 데이터 3을 넣고 그주소를 할당한다. 

왜 이렇게 `데이터 영역`, `변수 영역`을 분리해 놓았을까? 그 이유는 중복된 데이터를 재활용하여 더욱더 많은 메모리를 사용할수 있기 때문이다. 
