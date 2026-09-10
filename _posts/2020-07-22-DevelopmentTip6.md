---
layout: post
title: '[Development Tip #6] 나머지 매개변수로 여러개 인수를 전달'
date: 2020-07-22T00:00:00.000Z
author: changsun oh
tags: Tip
comments: true
share: true
related: false
summary: 놓치기 쉬운 자바스크립트 실전 개발 팁 여섯 번째 이야기입니다.
---

## 목표 
* 확장성있는 매개변수 활용법을 이해한다.
* 나머지 매개변수로 여러개 인수를 전달하는 방법을 익힌다. 

## 확장성있는 매개변수 활용법 

```javascript
function validateCharacterCount( max, ...items){
    return items.every( item => item.length < max);
}

validateCharacterCount(5, "123", "1234", "12345");
```
나머지 매개 변수를 사용하여 하나라도 잘못된 값이 들어오면 false를 return한다.

