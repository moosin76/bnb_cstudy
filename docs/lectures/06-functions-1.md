# 6주차 · 함수와 기억 클래스(1)

이번 시간에는 <strong>함수(function)</strong>를 조금 더 자세히 배웁니다.

우리는 이미 `printf()`, `scanf()` 같은 함수를 계속 사용해 왔습니다. 이제는 <strong>남이 만들어 둔 함수를 사용하는 것</strong>에서 한 걸음 더 나아가, **내가 필요한 함수를 직접 만들어 사용해 봅니다.**

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 함수는 특정한 일을 하나로 묶어 이름을 붙인 것이라는 점
2. 표준함수와 사용자 정의함수의 차이
3. 함수의 **정의 → 호출 → 실행 → 복귀** 흐름
4. 매개변수와 반환값의 아주 기본적인 의미
5. 함수 원형을 왜 적는지
6. 간단한 사용자 정의함수를 직접 만들 수 있다는 것
:::

---

## 1. 함수가 왜 필요한가요?

먼저 함수가 없는 프로그램을 생각해 봅시다.

화면에 구분선을 세 번 출력해야 한다고 해 보겠습니다.

```c
#include <stdio.h>

int main(void)
{
    printf("====================\n");
    printf("첫 번째 내용\n");
    printf("====================\n");
    printf("두 번째 내용\n");
    printf("====================\n");

    return 0;
}
```

같은 코드가 여러 번 반복됩니다.

```c
printf("====================\n");
```

이 정도는 짧아서 괜찮아 보이지만, 반복되는 코드가 10줄, 20줄이라면 어떨까요?

코드가 길어지고 수정하기도 어려워집니다.

그래서 <strong>자주 하는 일을 하나로 묶고 이름을 붙여 놓은 뒤 필요할 때 불러 사용</strong>합니다.

그 묶음이 바로 함수입니다.

<div class="big-check">
<strong>함수 = 특정한 일을 하나로 묶어 이름을 붙인 코드</strong>
</div>

---

## 2. 일상생활의 함수처럼 생각해 봅시다

자동판매기를 생각해 봅시다.

```text
① 돈을 넣는다.
② 음료 버튼을 누른다.
③ 자동판매기 내부에서 여러 작업이 진행된다.
④ 음료가 나온다.
```

우리는 자동판매기 내부에서 어떤 모터가 돌고 어떤 센서가 작동하는지 모두 알 필요가 없습니다.

그냥 <strong>버튼을 누르면 필요한 일이 처리되고 결과가 나온다</strong>는 것만 알면 사용할 수 있습니다.

함수도 비슷합니다.

<div class="function-machine">
  <div class="function-part input">필요한 값<br><small>입력</small></div>
  <div class="function-arrow">→</div>
  <div class="function-part work">함수<br><small>정해진 일을 처리</small></div>
  <div class="function-arrow">→</div>
  <div class="function-part output">결과<br><small>필요하면 돌려줌</small></div>
</div>

모든 함수가 반드시 값을 받거나 결과를 돌려주는 것은 아닙니다.

함수에 따라 다음과 같은 형태가 모두 가능합니다.

```text
값을 받지 않고 일만 하는 함수
값을 받아서 일하는 함수
값을 받아 계산한 결과를 돌려주는 함수
```

---

## 3. 우리는 이미 함수를 사용하고 있었습니다

첫 주부터 사용했던 코드를 다시 봅시다.

```c
printf("안녕하세요!\n");
```

여기에서 `printf`는 함수의 이름입니다.

```c
scanf("%d", &age);
```

여기에서 `scanf`도 함수의 이름입니다.

그리고 이것도 함수입니다.

```c
int main(void)
{
    return 0;
}
```

`main`도 함수입니다.

<div class="big-check">
<strong>main(), printf(), scanf() 모두 함수입니다.</strong>
</div>

차이가 있다면 누가 만들어 두었느냐에 있습니다.

---

## 4. 표준함수와 사용자 정의함수

함수는 크게 두 가지 관점으로 나누어 볼 수 있습니다.

| 종류 | 쉬운 설명 | 예 |
| --- | --- | --- |
| 표준함수 | C에서 사용할 수 있도록 미리 제공되는 함수 | `printf()`, `scanf()`, `sqrt()` |
| 사용자 정의함수 | 프로그래머가 직접 만들어 사용하는 함수 | `hello()`, `add()`, `printLine()` |

### 표준함수

이미 만들어져 있으므로 사용 방법을 알고 호출하면 됩니다.

```c
printf("안녕하세요!\n");
```

### 사용자 정의함수

우리가 직접 이름과 기능을 정해 만듭니다.

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

지금은 `void`가 조금 낯설 수 있습니다.

곧 한 조각씩 나누어 보겠습니다.

---

## 5. 표준함수는 어디에 들어 있나요?

표준함수는 종류에 따라 관련된 <strong>헤더 파일</strong>이 있습니다.

우리는 이미 다음 문장을 사용하고 있습니다.

```c
#include <stdio.h>
```

`stdio.h`에는 표준 입출력과 관련된 함수 선언이 들어 있습니다.

대표적으로 다음과 같은 함수가 있습니다.

```text
printf()
scanf()
getchar()
putchar()
```

다른 종류의 표준함수를 사용하려면 다른 헤더가 필요할 수 있습니다.

| 헤더 | 대표적인 용도 | 함수 예 |
| --- | --- | --- |
| `<stdio.h>` | 입출력 | `printf()`, `scanf()` |
| `<math.h>` | 수학 계산 | `sqrt()`, `pow()` |
| `<stdlib.h>` | 여러 일반 기능 | `abs()`, `rand()` |
| `<string.h>` | 문자열 처리 | `strlen()`, `strcmp()` |

::: info 지금 모두 외울 필요는 없습니다
중요한 것은 <strong>"표준함수마다 관련 헤더 파일이 있다"</strong>는 점입니다.

필요한 함수를 사용할 때 어떤 헤더가 필요한지 확인하면 됩니다.
:::

---

## 6. 표준함수 `sqrt()`를 사용해 봅시다

`sqrt()`는 숫자의 <strong>제곱근</strong>을 구하는 함수입니다.

예를 들어 25의 제곱근은 5입니다.

```text
5 × 5 = 25
```

`sqrt()`를 사용하려면 `<math.h>`를 포함합니다.

```c
#include <stdio.h>
#include <math.h>

int main(void)
{
    double result = sqrt(25.0);

    printf("25의 제곱근: %.1f\n", result);

    return 0;
}
```

실행 결과:

```text
25의 제곱근: 5.0
```

이 문장을 봅시다.

```c
sqrt(25.0)
```

아주 쉽게 읽으면 다음과 같습니다.

> `sqrt` 함수에게 `25.0`을 주고 계산을 부탁한다.

그리고 함수가 계산한 결과인 `5.0`이 돌아옵니다.

```c
result = sqrt(25.0);
```

그래서 `result` 변수에 결과를 저장할 수 있습니다.

---

## 7. `pow()`로 거듭제곱 계산하기

`pow()`도 `<math.h>`에서 사용하는 수학 함수입니다.

```c
pow(2.0, 3.0)
```

이 코드는 다음 계산을 의미합니다.

```text
2³ = 2 × 2 × 2 = 8
```

직접 실행해 봅시다.

```c
#include <stdio.h>
#include <math.h>

int main(void)
{
    double result = pow(2.0, 3.0);

    printf("2의 3제곱: %.0f\n", result);

    return 0;
}
```

실행 결과:

```text
2의 3제곱: 8
```

`sqrt()`는 값 하나를 받았고, `pow()`는 값 두 개를 받았습니다.

```c
sqrt(25.0)
pow(2.0, 3.0)
```

함수마다 필요한 값의 개수가 다를 수 있습니다.

---

## 8. 이제 우리 함수를 직접 만들어 봅시다

가장 단순한 사용자 정의함수를 만들어 보겠습니다.

```c
#include <stdio.h>

void hello(void)
{
    printf("안녕하세요!\n");
}

int main(void)
{
    hello();

    return 0;
}
```

실행 결과:

```text
안녕하세요!
```

우리가 직접 만든 함수는 이 부분입니다.

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

그리고 이 문장으로 함수를 사용했습니다.

```c
hello();
```

함수를 사용하는 것을 <strong>함수를 호출한다(call)</strong>고 표현합니다.

<div class="big-check">
<strong>hello(); = hello 함수를 호출한다</strong>
</div>

---

## 9. 함수가 실행되는 순서를 봅시다

앞의 프로그램을 실행하면 컴퓨터는 무조건 위에서 아래로 모든 함수를 실행하는 것이 아닙니다.

프로그램은 먼저 `main()`에서 시작합니다.

```c
int main(void)
{
    hello();
    return 0;
}
```

`hello();`를 만나면 잠시 `hello()` 함수로 이동합니다.

<div class="function-call-flow">
  <div class="call-step"><strong>① main 시작</strong><small>프로그램 시작</small></div>
  <div class="call-arrow">→</div>
  <div class="call-step"><strong>② hello 호출</strong><small>hello()로 이동</small></div>
  <div class="call-arrow">→</div>
  <div class="call-step"><strong>③ hello 실행</strong><small>인사말 출력</small></div>
  <div class="call-arrow">→</div>
  <div class="call-step"><strong>④ main 복귀</strong><small>호출한 다음 줄로 돌아옴</small></div>
</div>

`hello()`의 일이 끝나면 다시 `main()`으로 돌아옵니다.

```text
main 시작
   ↓
hello 호출
   ↓
hello의 코드 실행
   ↓
main으로 돌아옴
   ↓
다음 코드 실행
```

이 흐름은 앞으로 함수를 공부할 때 매우 중요합니다.

---

## 10. 함수를 여러 번 호출할 수 있습니다

함수를 한 번 만들면 필요할 때 여러 번 사용할 수 있습니다.

```c
#include <stdio.h>

void printLine(void)
{
    printf("====================\n");
}

int main(void)
{
    printLine();
    printf("첫 번째 내용\n");

    printLine();
    printf("두 번째 내용\n");

    printLine();

    return 0;
}
```

실행 결과:

```text
====================
첫 번째 내용
====================
두 번째 내용
====================
```

이제 구분선 모양을 바꾸고 싶다면 한 곳만 수정하면 됩니다.

```c
void printLine(void)
{
    printf("--------------------\n");
}
```

함수를 사용하는 큰 이유 중 하나입니다.

<div class="big-check">
<strong>반복되는 코드를 함수로 묶으면 코드가 짧아지고 수정도 쉬워집니다.</strong>
</div>

---

## 11. 함수의 기본 모양을 살펴봅시다

앞서 만든 함수를 다시 보겠습니다.

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

기본 모양은 다음과 같이 생각할 수 있습니다.

```text
반환형  함수이름(매개변수)
{
    실행할 코드
}
```

`hello()`에 대입해 보면:

```text
반환형      함수이름     매개변수
  ↓            ↓           ↓
void        hello        (void)
```

하나씩 알아봅시다.

---

## 12. 함수 이름

함수에도 이름을 붙입니다.

```c
hello
printLine
add
showMenu
```

함수 이름 규칙은 변수 이름 규칙과 비슷합니다.

가능한 예:

```text
hello
print_line
showMenu
add2
```

잘못된 예:

```text
2add
int
my-function
```

함수가 무슨 일을 하는지 알 수 있도록 의미 있는 이름을 붙이는 것이 좋습니다.

예를 들어:

```c
void a(void)
```

보다

```c
void printLine(void)
```

가 읽기 쉽습니다.

---

## 13. 반환형이란 무엇인가요?

함수가 일을 끝낸 뒤 **결과 값을 돌려줄 수도 있습니다.**

그 결과의 자료형을 반환형이라고 합니다.

예를 들어 정수 결과를 돌려주는 함수라면:

```c
int getNumber(void)
```

실수 결과를 돌려준다면:

```c
double getAverage(void)
```

아무 값도 돌려주지 않는다면:

```c
void hello(void)
```

여기에서 `void`는 쉽게 말하면 다음 뜻입니다.

> "이 함수는 결과 값을 따로 돌려주지 않습니다."

| 반환형 | 의미 |
| --- | --- |
| `int` | 정수 값을 돌려줌 |
| `double` | 실수 값을 돌려줌 |
| `char` | 문자 값을 돌려줌 |
| `void` | 돌려주는 값이 없음 |

---

## 14. `return`으로 값을 돌려줍니다

정수를 하나 돌려주는 함수를 만들어 봅시다.

```c
#include <stdio.h>

int giveNumber(void)
{
    return 100;
}

int main(void)
{
    int number = giveNumber();

    printf("받은 값: %d\n", number);

    return 0;
}
```

실행 결과:

```text
받은 값: 100
```

이 부분을 봅시다.

```c
return 100;
```

`giveNumber()` 함수를 호출한 곳으로 `100`을 돌려줍니다.

그래서 다음 문장은:

```c
int number = giveNumber();
```

결과적으로 다음처럼 생각할 수 있습니다.

```c
int number = 100;
```

### 반환형과 돌려주는 값은 어울려야 합니다

```c
int giveNumber(void)
{
    return 100;
}
```

반환형이 `int`이므로 정수 값을 돌려주는 것이 자연스럽습니다.

---

## 15. `void` 함수의 `return`

`void` 함수는 돌려주는 값이 없습니다.

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

필요하다면 다음처럼 값 없이 `return;`을 사용할 수도 있습니다.

```c
void hello(void)
{
    printf("안녕하세요!\n");
    return;
}
```

하지만 함수의 끝에 도달하면 자동으로 호출한 곳으로 돌아가기 때문에, 단순한 `void` 함수에서는 마지막 `return;`을 생략하는 경우도 많습니다.

::: info `main()`의 `return 0;`과 비교해 보세요
`main()`은 반환형이 `int`입니다.

```c
int main(void)
```

그래서 다음처럼 정수 `0`을 돌려줍니다.

```c
return 0;
```
:::

---

## 16. 함수에 값을 전달해 봅시다

이번에는 함수가 숫자를 하나 받아 사용하게 해 보겠습니다.

```c
#include <stdio.h>

void printNumber(int number)
{
    printf("받은 숫자: %d\n", number);
}

int main(void)
{
    printNumber(10);
    printNumber(20);
    printNumber(30);

    return 0;
}
```

실행 결과:

```text
받은 숫자: 10
받은 숫자: 20
받은 숫자: 30
```

이 함수의 모양을 봅시다.

```c
void printNumber(int number)
```

괄호 안의 다음 부분이 함수가 받을 값을 준비합니다.

```c
int number
```

이 `number`를 <strong>매개변수(parameter)</strong>라고 부릅니다.

그리고 다음 호출에서:

```c
printNumber(10);
```

함수에게 실제로 전달하는 `10` 같은 값을 <strong>인수(argument)</strong>라고 부릅니다.

<div class="function-parameter-compare">
  <div><strong>함수를 만들 때</strong><code>void printNumber(int number)</code><small>number = 매개변수</small></div>
  <div><strong>함수를 사용할 때</strong><code>printNumber(10);</code><small>10 = 인수</small></div>
</div>

::: tip 용어가 헷갈려도 괜찮습니다
처음에는 다음처럼 이해해도 충분합니다.

- 매개변수: 함수 안에서 값을 받아 둘 이름
- 인수: 함수를 호출할 때 실제로 넣어 주는 값

자료 전달 방법은 다음 주에 더 자세히 배웁니다.
:::

---

## 17. 두 개의 값을 받을 수도 있습니다

함수는 필요한 경우 값을 여러 개 받을 수 있습니다.

```c
#include <stdio.h>

void printSum(int a, int b)
{
    printf("합계: %d\n", a + b);
}

int main(void)
{
    printSum(3, 5);
    printSum(10, 20);

    return 0;
}
```

실행 결과:

```text
합계: 8
합계: 30
```

함수의 매개변수:

```c
int a, int b
```

호출할 때 전달하는 값:

```c
printSum(3, 5);
```

순서대로 전달된다고 우선 이해하면 됩니다.

```text
3 → a
5 → b
```

---

## 18. 값을 받고 결과도 돌려주는 함수

이제 가장 많이 보게 될 형태를 만들어 봅시다.

두 정수를 받아 더한 결과를 돌려주는 함수입니다.

```c
#include <stdio.h>

int add(int a, int b)
{
    int result = a + b;
    return result;
}

int main(void)
{
    int answer = add(3, 5);

    printf("결과: %d\n", answer);

    return 0;
}
```

실행 결과:

```text
결과: 8
```

전체 흐름은 다음과 같습니다.

```text
main에서 add(3, 5) 호출
          ↓
a에 3, b에 5가 들어감
          ↓
a + b 계산
          ↓
return 8
          ↓
main으로 8이 돌아옴
          ↓
answer에 8 저장
```

<div class="function-machine compact">
  <div class="function-part input">3, 5</div>
  <div class="function-arrow">→</div>
  <div class="function-part work">add()</div>
  <div class="function-arrow">→</div>
  <div class="function-part output">8</div>
</div>

---

## 19. 함수에서 바로 계산 결과를 돌려줄 수도 있습니다

앞의 코드는 이렇게 작성했습니다.

```c
int add(int a, int b)
{
    int result = a + b;
    return result;
}
```

조금 더 짧게 작성할 수도 있습니다.

```c
int add(int a, int b)
{
    return a + b;
}
```

둘 다 같은 결과를 돌려줍니다.

처음에는 긴 형태가 계산 과정을 이해하기 쉬울 수 있습니다.

익숙해진 뒤 짧게 바꾸어도 좋습니다.

---

## 20. 함수 원형이란 무엇인가요?

C언어에서는 컴퓨터가 함수를 사용하기 전에 그 함수의 모양을 미리 알아야 하는 경우가 있습니다.

다음 프로그램을 봅시다. 아래 코드는 **함수 원형이 없을 때 생길 수 있는 문제를 설명하기 위한 예제**입니다. 최신 C 컴파일러에서는 경고나 오류가 발생할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    hello();
    return 0;
}

void hello(void)
{
    printf("안녕하세요!\n");
}
```

사람은 아래쪽을 보면 `hello()`가 있다는 것을 알 수 있습니다.

하지만 컴파일러는 `main()`을 처리하는 시점에 아직 아래에 있는 `hello()`의 정확한 형태를 보지 못했습니다.

이럴 때 함수의 모양을 위쪽에 미리 알려 줄 수 있습니다.

```c
void hello(void);
```

이것을 **함수 원형(function prototype)** 또는 함수 선언이라고 합니다.

---

## 21. 함수 원형을 사용한 전체 프로그램

```c
#include <stdio.h>

void hello(void);

int main(void)
{
    hello();

    return 0;
}

void hello(void)
{
    printf("안녕하세요!\n");
}
```

세 부분으로 나누어 봅시다.

### ① 함수 원형

```c
void hello(void);
```

컴파일러에게 다음을 미리 알려 줍니다.

> "아래 어딘가에 `hello`라는 함수가 있습니다. 반환값도 없고 받을 값도 없습니다."

### ② 함수 호출

```c
hello();
```

함수를 실제로 사용합니다.

### ③ 함수 정의

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

함수가 실제로 무슨 일을 할지 작성합니다.

<div class="function-three-parts">
  <div><strong>원형</strong><small>이런 함수가 있어요</small></div>
  <div>→</div>
  <div><strong>호출</strong><small>그 함수를 사용해요</small></div>
  <div>→</div>
  <div><strong>정의</strong><small>실제 할 일을 적어요</small></div>
</div>

---

## 22. 함수 원형에서 중요한 것

함수 원형에는 함수의 기본 모양이 나타납니다.

```c
int add(int a, int b);
```

여기에서 알 수 있는 것은 다음과 같습니다.

```text
함수 이름: add
반환형: int
받는 값: int 두 개
```

원형에서는 매개변수 이름을 생략하기도 합니다.

```c
int add(int, int);
```

하지만 초보 단계에서는 이름을 적어 두는 편이 읽기 쉬울 수 있습니다.

```c
int add(int a, int b);
```

---

## 23. 직접 따라하기 · 두 수 중 큰 값 구하기

이번에는 두 숫자 중 큰 값을 돌려주는 함수를 만들어 봅시다.

```c
#include <stdio.h>

int getMax(int a, int b);

int main(void)
{
    int first;
    int second;
    int bigger;

    printf("첫 번째 숫자: ");
    scanf("%d", &first);

    printf("두 번째 숫자: ");
    scanf("%d", &second);

    bigger = getMax(first, second);

    printf("더 큰 값: %d\n", bigger);

    return 0;
}

int getMax(int a, int b)
{
    if (a > b)
    {
        return a;
    }

    return b;
}
```

실행 예:

```text
첫 번째 숫자: 12
두 번째 숫자: 7
더 큰 값: 12
```

지난 주에 배운 `if`가 함수 안에서도 그대로 사용됩니다.

함수는 새로운 언어가 아닙니다.

우리가 지금까지 배운 변수, 연산자, 제어문을 <strong>하나의 기능으로 묶어 놓는 방법</strong>이라고 생각하면 됩니다.

---

## 24. 함수 안에 반복문도 사용할 수 있습니다

함수 안에서 `for`도 사용할 수 있습니다.

```c
#include <stdio.h>

void printStars(int count);

int main(void)
{
    printStars(3);
    printStars(5);

    return 0;
}

void printStars(int count)
{
    int i;

    for (i = 0; i < count; i++)
    {
        printf("*");
    }

    printf("\n");
}
```

실행 결과:

```text
***
*****
```

호출할 때 숫자를 바꾸면 출력되는 별 개수도 달라집니다.

```c
printStars(10);
```

---

## 25. 함수를 사용하면 프로그램을 나누어 생각할 수 있습니다

큰 프로그램을 한 번에 생각하면 어렵습니다.

예를 들어 간단한 계산기 프로그램을 만든다고 해 봅시다.

함수 없이 생각하면:

```text
입력도 해야 하고
계산도 해야 하고
출력도 해야 하고
메뉴도 보여 줘야 하고
오류도 확인해야 하고...
```

복잡해 보입니다.

하지만 일을 나누면 조금 쉬워집니다.

```text
showMenu()       메뉴 보여주기
inputNumber()    숫자 입력받기
add()            더하기
subtract()       빼기
printResult()    결과 출력하기
```

이처럼 큰 일을 작은 일로 나누는 것이 함수 사용의 중요한 장점입니다.

<div class="big-check">
<strong>큰 문제를 작은 함수 여러 개로 나누면 프로그램을 이해하고 수정하기 쉬워집니다.</strong>
</div>

---

## 26. 함수 이름은 동작이 보이게 짓는 것이 좋습니다

함수 이름만 보고 무슨 일을 하는지 어느 정도 알 수 있으면 좋습니다.

예:

```text
printLine()      구분선을 출력한다
getMax()         큰 값을 구한다
showMenu()       메뉴를 보여 준다
calculateTotal() 합계를 계산한다
```

아래처럼 너무 짧고 의미 없는 이름은 프로그램이 커지면 이해하기 어렵습니다.

```text
a()
b()
f1()
```

영어 이름이 아직 익숙하지 않아도 자주 사용하는 단어부터 천천히 익히면 됩니다.

- 출력 → `print`, `show`
- 얻기 → `get`
- 계산 → `calculate`
- 더하기 → `add`
- 합계 → `total`, `sum`

---

## 27. 함수 안에서 만든 변수는 어떻게 될까요?

다음 코드를 봅시다.

```c
void test(void)
{
    int number = 10;
    printf("%d\n", number);
}
```

여기에서 `number`는 `test()` 함수 안에서 만들어졌습니다.

이런 변수는 기본적으로 그 함수 안에서 사용하는 변수입니다.

```c
int main(void)
{
    printf("%d\n", number);  // 그대로 사용할 수 없음
    return 0;
}
```

왜 그런지, 변수의 범위와 기억 방식은 다음 주 <strong>함수와 기억 클래스(2)</strong>에서 더 자세히 공부합니다.

::: tip 이번 주에는 이것만 기억하세요
함수 안에서 선언한 변수는 우선 <strong>그 함수 안에서 사용하는 자기 상자</strong>라고 생각하면 됩니다.
:::

---

## 28. 자주 하는 실수 · 함수 이름의 철자가 다릅니다

함수 정의:

```c
void hello(void)
{
    printf("안녕하세요!\n");
}
```

잘못된 호출:

```c
helo();
```

올바른 호출:

```c
hello();
```

C언어는 철자와 대소문자를 정확하게 구별합니다.

```text
hello
Hello
HELLO
```

모두 다른 이름입니다.

---

## 29. 자주 하는 실수 · 함수 원형 끝의 세미콜론

함수 원형에는 끝에 세미콜론이 있습니다.

```c
int add(int a, int b);
```

하지만 함수 정의의 첫 줄에는 세미콜론을 붙이지 않습니다.

```c
int add(int a, int b)
{
    return a + b;
}
```

둘을 비교해 봅시다.

```text
함수 원형: int add(int a, int b);   ← ; 있음
함수 정의: int add(int a, int b)    ← ; 없음
```

---

## 30. 자주 하는 실수 · 반환형과 `return`이 어울리지 않습니다

예를 들어 반환형이 `int`인 함수가 있습니다.

```c
int getNumber(void)
{
    return 10;
}
```

정상입니다.

그런데 값을 돌려줘야 하는 함수에서 `return` 값을 빠뜨리면 문제가 될 수 있습니다.

```c
int getNumber(void)
{
    // 정수 결과를 돌려줘야 하는데 값이 없음
}
```

초보 단계에서는 다음처럼 대응해서 생각하면 좋습니다.

```text
int 함수     → 정수 결과를 돌려줌
double 함수  → 실수 결과를 돌려줌
void 함수    → 결과 값을 돌려주지 않음
```

---

## 31. 일부러 틀린 코드를 고쳐 봅시다

### 문제 1 · 함수 이름

```c
#include <stdio.h>

void hello(void);

int main(void)
{
    Hello();
    return 0;
}

void hello(void)
{
    printf("안녕하세요!\n");
}
```

<details>
<summary><strong>정답 보기</strong></summary>

함수 이름은 `hello`인데 `Hello`로 호출했습니다.

```c
hello();
```

C언어는 대문자와 소문자를 구별합니다.

</details>

### 문제 2 · 함수 원형

```c
int add(int a, int b)

int main(void)
{
    return 0;
}
```

<details>
<summary><strong>정답 보기</strong></summary>

함수 원형으로 적으려는 것이라면 끝에 `;`이 필요합니다.

```c
int add(int a, int b);
```

</details>

### 문제 3 · 반환값

```c
int add(int a, int b)
{
    a + b;
}
```

<details>
<summary><strong>정답 보기</strong></summary>

계산 결과를 호출한 곳으로 돌려주려면 `return`을 사용합니다.

```c
int add(int a, int b)
{
    return a + b;
}
```

</details>

---

## 32. 종합 실습 · 사칙연산을 함수로 나누기

지난 주에 만들었던 계산을 함수로 나누어 봅시다.

```c
#include <stdio.h>

int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
double divide(int a, int b);

int main(void)
{
    int a;
    int b;

    printf("첫 번째 정수: ");
    scanf("%d", &a);

    printf("두 번째 정수(0 제외): ");
    scanf("%d", &b);

    printf("더하기: %d\n", add(a, b));
    printf("빼기: %d\n", subtract(a, b));
    printf("곱하기: %d\n", multiply(a, b));
    printf("나누기: %.2f\n", divide(a, b));

    return 0;
}

int add(int a, int b)
{
    return a + b;
}

int subtract(int a, int b)
{
    return a - b;
}

int multiply(int a, int b)
{
    return a * b;
}

double divide(int a, int b)
{
    return (double)a / b;
}
```

실행 예:

```text
첫 번째 정수: 10
두 번째 정수(0 제외): 4
더하기: 14
빼기: 6
곱하기: 40
나누기: 2.50
```

프로그램의 각 계산이 별도 함수로 나뉘어 있어서 어느 함수가 어떤 일을 하는지 쉽게 찾을 수 있습니다.

---

## 33. 오늘 배운 내용 확인하기

### 1번

함수란 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>

특정한 일을 하는 코드를 하나로 묶어 이름을 붙인 것이라고 이해하면 됩니다.

</details>

### 2번

`printf()`는 표준함수일까요, 사용자 정의함수일까요?

<details>
<summary><strong>정답 보기</strong></summary>

표준함수입니다.

</details>

### 3번

다음 코드에서 함수의 이름은 무엇인가요?

```c
int add(int a, int b)
{
    return a + b;
}
```

<details>
<summary><strong>정답 보기</strong></summary>

`add`입니다.

</details>

### 4번

다음 함수의 반환형은 무엇인가요?

```c
double getAverage(void)
```

<details>
<summary><strong>정답 보기</strong></summary>

`double`입니다.

</details>

### 5번

`void` 반환형은 이번 시간에 어떤 뜻으로 배웠나요?

<details>
<summary><strong>정답 보기</strong></summary>

함수가 호출한 곳으로 별도의 결과 값을 돌려주지 않는다는 뜻으로 배웠습니다.

</details>

### 6번

다음 중 함수 호출은 무엇인가요?

```text
A. int add(int a, int b);
B. add(3, 5);
C. int add(int a, int b) { return a + b; }
```

<details>
<summary><strong>정답 보기</strong></summary>

B의 `add(3, 5);`가 함수 호출입니다.

</details>

### 7번

함수 원형의 끝에는 보통 어떤 기호가 있나요?

<details>
<summary><strong>정답 보기</strong></summary>

세미콜론 `;`이 있습니다.

```c
int add(int a, int b);
```

</details>

### 8번

다음 함수가 돌려주는 값은 얼마일까요?

```c
int add(int a, int b)
{
    return a + b;
}
```

```c
add(10, 20)
```

<details>
<summary><strong>정답 보기</strong></summary>

30입니다.

</details>

### 9번

함수를 사용하면 어떤 장점이 있을까요?

<details>
<summary><strong>정답 보기</strong></summary>

반복되는 코드를 줄일 수 있고, 큰 프로그램을 작은 기능으로 나누어 이해하고 수정하기 쉬워집니다.

</details>

---

## 34. 이번 주 핵심 요약

오늘 모든 문법을 완벽하게 외울 필요는 없습니다.

아래 흐름만 확실히 잡아도 좋습니다.

<div class="big-check">
<strong>① 함수</strong>는 특정한 일을 하나로 묶어 이름을 붙인 코드입니다.<br><br>
<strong>② 표준함수</strong>는 미리 제공되는 함수이고, <strong>사용자 정의함수</strong>는 우리가 직접 만드는 함수입니다.<br><br>
<strong>③ 함수 호출</strong>을 만나면 해당 함수로 이동해 코드를 실행하고 다시 호출한 곳으로 돌아옵니다.<br><br>
<strong>④ 반환형</strong>은 함수가 어떤 종류의 결과를 돌려주는지 나타냅니다.<br><br>
<strong>⑤ 매개변수</strong>를 이용하면 함수가 값을 받아 사용할 수 있습니다.<br><br>
<strong>⑥ return</strong>을 이용하면 계산 결과를 호출한 곳으로 돌려줄 수 있습니다.<br><br>
<strong>⑦ 함수 원형</strong>은 컴파일러에게 함수의 모양을 미리 알려 줍니다.
</div>

### 다음 시간 예고

다음 시간에는 함수와 변수의 관계를 조금 더 자세히 봅니다.

- 함수에 값이 어떻게 전달되는가
- 지역변수와 전역변수
- 변수의 유효 범위
- 자동 변수와 정적 변수
- 기억 클래스

이번 주에 만든 함수 안의 변수가 <strong>언제 만들어지고 어디에서 사용할 수 있는지</strong>가 다음 시간부터 더 분명해집니다.
