# 7주차 · 함수와 기억 클래스(2)

지난 시간에는 함수를 직접 만들고 호출하는 방법을 배웠습니다.

이번 시간에는 <strong>함수에게 값을 보내면 그 값이 어떻게 전달되는지</strong>, 그리고 <strong>변수가 어디에서 사용할 수 있고 얼마나 오래 기억되는지</strong>를 배웁니다.

처음에는 용어가 많아 보여도 핵심은 두 문장입니다.

<div class="big-check">
<strong>함수에 값을 보내면 기본적으로 값의 복사본이 전달됩니다.</strong><br><br>
<strong>변수는 만든 위치와 종류에 따라 사용할 수 있는 범위와 살아 있는 시간이 달라집니다.</strong>
</div>

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 함수에 전달한 값은 기본적으로 복사되어 전달된다는 것
2. 함수 안의 매개변수는 원래 변수와 별개의 변수라는 것
3. 지역변수와 전역변수의 차이
4. 변수의 <strong>범위(scope)</strong>와 <strong>수명(lifetime)</strong>의 의미
5. `auto`, `static`, `extern`, `register`의 기본적인 역할
6. `static` 지역변수가 함수 호출이 끝나도 값을 기억한다는 것
:::

---

## 1. 지난 시간의 함수를 다시 봅시다

다음 함수는 숫자 두 개를 받아 더한 결과를 돌려줍니다.

```c
int add(int a, int b)
{
    return a + b;
}
```

그리고 `main()`에서 이렇게 호출할 수 있습니다.

```c
int result = add(10, 20);
```

여기에서 `10`, `20`은 함수에게 보내는 값입니다.

함수 쪽에서는 이 값을 `a`, `b`라는 이름으로 받아 사용합니다.

```text
add(10, 20)
     ↓   ↓
     a   b
```

그렇다면 `a`와 `b`는 원래 변수 그 자체일까요?

아니면 복사된 값일까요?

이번 주는 이 질문에서 시작합니다.

---

## 2. C언어는 값을 복사해서 전달합니다

다음 프로그램을 실행해 봅시다.

```c
#include <stdio.h>

void changeNumber(int number)
{
    number = 100;
    printf("함수 안 number: %d\n", number);
}

int main(void)
{
    int score = 50;

    changeNumber(score);

    printf("main의 score: %d\n", score);

    return 0;
}
```

실행 결과:

```text
함수 안 number: 100
main의 score: 50
```

함수 안에서는 `number`를 100으로 바꿨습니다.

그런데 `main()`의 `score`는 여전히 50입니다.

왜 그럴까요?

`score` 자체가 함수로 이동한 것이 아니라 <strong>score에 들어 있던 값 50이 복사되어 <code>number</code>에 들어갔기 때문</strong>입니다.

<img class="lesson-figure" src="/images/week7/value-copy.svg" alt="main의 score 값이 함수의 number로 복사되고 number를 바꿔도 score는 그대로인 흐름">
<p class="image-caption">원본 변수와 함수의 매개변수는 서로 다른 상자입니다.</p>

<div class="big-check">
<strong>C 함수의 일반적인 인수 전달 = 값 복사</strong>
</div>

이 방식을 <strong>값에 의한 호출(call by value)</strong>이라고 부릅니다.

---

## 3. 종이에 복사해서 적는 것처럼 생각해 봅시다

내 수첩에 숫자 `50`이 적혀 있다고 생각해 봅시다.

친구가 자기 종이에 `50`을 똑같이 적습니다.

```text
내 수첩       친구 종이
  50    →       50
```

이제 친구가 자기 종이의 숫자를 `100`으로 바꿉니다.

```text
내 수첩       친구 종이
  50            100
```

내 수첩의 `50`은 바뀌지 않습니다.

함수의 값 전달도 비슷합니다.

::: info 꼭 기억하세요
함수의 매개변수는 호출한 쪽 변수와 같은 값을 가지고 있어도 <strong>별개의 변수</strong>입니다.
:::

---

## 4. 변수 이름이 같아도 같은 변수가 아닐 수 있습니다

다음 코드를 봅시다.

```c
#include <stdio.h>

void printScore(int score)
{
    printf("함수의 score: %d\n", score);
}

int main(void)
{
    int score = 80;

    printScore(score);

    return 0;
}
```

두 변수 모두 이름이 `score`입니다.

하지만 같은 변수는 아닙니다.

```text
main()의 score       → main 함수 안의 변수
printScore()의 score → printScore 함수의 매개변수
```

함수를 호출할 때 값 80이 복사될 뿐입니다.

---

## 5. 두 값을 보내도 각각 복사됩니다

```c
#include <stdio.h>

void showNumbers(int a, int b)
{
    a = a + 10;
    b = b + 20;

    printf("함수 안: a=%d, b=%d\n", a, b);
}

int main(void)
{
    int x = 1;
    int y = 2;

    showNumbers(x, y);

    printf("main: x=%d, y=%d\n", x, y);

    return 0;
}
```

실행 결과:

```text
함수 안: a=11, b=22
main: x=1, y=2
```

전달 과정은 다음처럼 생각하면 됩니다.

```text
x의 값 1 → 복사 → a

y의 값 2 → 복사 → b
```

`a`, `b`를 바꿔도 `x`, `y`는 바뀌지 않습니다.

---

## 6. 그러면 원래 변수를 바꾸는 방법은 없나요?

방법이 있습니다.

하지만 그 방법에는 <strong>변수의 주소와 포인터</strong>라는 개념이 필요합니다.

우리는 뒤에서 포인터를 별도로 배웁니다.

지금은 이렇게만 기억해 둡시다.

<div class="big-check">
<strong>이번 주:</strong> 값을 보내면 복사본이 전달된다.<br><br>
<strong>나중의 포인터:</strong> 변수의 위치(주소)를 전달하여 원본을 다루는 방법을 배운다.
</div>

포인터 코드를 지금 미리 외울 필요는 없습니다.

---

## 7. 지역변수란 무엇인가요?

함수나 `{ }` 블록 안에서 만든 변수를 <strong>지역변수(local variable)</strong>라고 합니다.

```c
int main(void)
{
    int age = 30;

    return 0;
}
```

여기에서 `age`는 `main()` 안에서 만든 지역변수입니다.

다른 함수 안에서도 지역변수를 만들 수 있습니다.

```c
void hello(void)
{
    int count = 3;
}
```

`count`는 `hello()`의 지역변수입니다.

<div class="big-check">
<strong>지역변수 = 특정 함수나 블록 안에서 만든 변수</strong>
</div>

---

## 8. 지역변수는 자기 구역 안에서 사용합니다

다음 코드는 잘못된 예입니다.

```c
#include <stdio.h>

void hello(void)
{
    int count = 3;
    printf("hello 안: %d\n", count);
}

int main(void)
{
    hello();

    printf("main에서 count: %d\n", count);  // 오류

    return 0;
}
```

`count`는 `hello()` 안에서 만들었습니다.

따라서 `main()`에서는 `count`를 직접 사용할 수 없습니다.

```text
hello() 영역
┌─────────────────┐
│ int count = 3;  │  ← 여기에서 사용 가능
└─────────────────┘

main() 영역
┌─────────────────┐
│ count ?         │  ← hello의 count는 보이지 않음
└─────────────────┘
```

이처럼 <strong>이름을 사용할 수 있는 범위</strong>를 <strong>범위(scope)</strong>라고 합니다.

---

## 9. 중괄호 `{ }`도 하나의 범위를 만들 수 있습니다

```c
#include <stdio.h>

int main(void)
{
    int a = 10;

    {
        int b = 20;
        printf("a=%d, b=%d\n", a, b);
    }

    printf("a=%d\n", a);

    return 0;
}
```

안쪽 블록의 `b`는 그 블록 안에서만 사용할 수 있습니다.

블록 밖에서 이렇게 쓰면 오류입니다.

```c
printf("%d\n", b);  // 오류
```

반면 바깥쪽에서 만든 `a`는 안쪽 블록에서도 사용할 수 있습니다.

---

## 10. 같은 이름의 지역변수를 각 함수에서 사용할 수 있습니다

```c
#include <stdio.h>

void first(void)
{
    int number = 10;
    printf("first: %d\n", number);
}

void second(void)
{
    int number = 20;
    printf("second: %d\n", number);
}

int main(void)
{
    first();
    second();

    return 0;
}
```

실행 결과:

```text
first: 10
second: 20
```

두 변수의 이름은 모두 `number`지만 서로 다른 함수에 있기 때문에 별개의 변수입니다.

---

## 11. 전역변수란 무엇인가요?

함수 바깥에 변수를 만들 수도 있습니다.

```c
#include <stdio.h>

int score = 100;

int main(void)
{
    printf("%d\n", score);
    return 0;
}
```

함수 바깥에 선언한 변수를 <strong>전역변수(global variable)</strong>라고 부릅니다.

```c
int score = 100;  // 전역변수

int main(void)
{
    int age = 30; // 지역변수
}
```

| 구분 | 선언 위치 | 기본적인 사용 범위 |
| --- | --- | --- |
| 지역변수 | 함수 또는 블록 안 | 해당 함수/블록 안 |
| 전역변수 | 함수 바깥 | 선언 위치 이후의 여러 함수에서 사용 가능 |

---

## 12. 여러 함수에서 전역변수를 사용할 수 있습니다

```c
#include <stdio.h>

int score = 0;

void addScore(void)
{
    score = score + 10;
}

void showScore(void)
{
    printf("점수: %d\n", score);
}

int main(void)
{
    addScore();
    addScore();
    showScore();

    return 0;
}
```

실행 결과:

```text
점수: 20
```

`score`는 함수 밖에 있기 때문에 `addScore()`와 `showScore()`가 함께 사용하고 있습니다.

---

## 13. 전역변수는 편하지만 많이 쓰면 헷갈릴 수 있습니다

전역변수는 여러 함수에서 사용할 수 있어 편리합니다.

하지만 너무 많이 사용하면 프로그램이 커졌을 때

```text
어느 함수가 score를 바꿨지?
왜 값이 갑자기 달라졌지?
```

처럼 원인을 찾기 어려워질 수 있습니다.

::: tip 처음에는 이렇게 생각하세요
가능하면 필요한 값은 함수의 매개변수와 반환값으로 주고받고, 전역변수는 <strong>정말 여러 곳에서 함께 관리해야 할 값</strong>에 신중하게 사용합니다.
:::

---

## 14. 지역변수와 전역변수의 이름이 같으면 어떻게 될까요?

```c
#include <stdio.h>

int number = 10;

int main(void)
{
    int number = 20;

    printf("%d\n", number);

    return 0;
}
```

실행 결과:

```text
20
```

`main()` 안에서는 가까운 곳에 있는 지역변수 `number`가 사용됩니다.

전역변수가 사라진 것은 아닙니다.

그 범위에서 같은 이름의 지역변수가 전역변수 이름을 가리고 있는 것입니다.

<div class="big-check">
같은 이름이 겹치면 <strong>현재 위치에서 더 가까운 변수를 먼저 본다</strong>고 이해하면 됩니다.
</div>

혼란을 줄이려면 처음에는 같은 이름을 일부러 겹치게 만들지 않는 것이 좋습니다.

---

## 15. 범위와 수명은 서로 다른 이야기입니다

여기에서 중요한 용어가 두 개 나옵니다.

### 범위(scope)

<strong>코드의 어디에서 그 변수 이름을 사용할 수 있는가</strong>입니다.

### 수명(lifetime)

<strong>프로그램 실행 중 그 변수가 언제부터 언제까지 존재하는가</strong>입니다.

<img class="lesson-figure" src="/images/week7/scope-lifetime.svg" alt="변수의 범위와 수명을 장소와 시간으로 비교한 그림">
<p class="image-caption">범위는 “어디에서?”, 수명은 “언제까지?”라고 질문하면 구분하기 쉽습니다.</p>

<div class="big-check">
<strong>범위 = 장소에 대한 질문</strong><br><br>
<strong>수명 = 시간에 대한 질문</strong>
</div>

---

## 16. 일반 지역변수는 함수가 실행될 때 준비됩니다

```c
void test(void)
{
    int number = 10;
    printf("%d\n", number);
}
```

일반적인 지역변수 `number`는 `test()`가 실행될 때 준비됩니다.

함수가 끝나면 그 호출에서의 역할도 끝납니다.

다음에 `test()`를 다시 호출하면 새로운 지역변수가 다시 준비됩니다.

```text
test() 호출 1
number 준비 → 사용 → 함수 종료

                 ↓ 다시 호출

test() 호출 2
number 새로 준비 → 사용 → 함수 종료
```

이 점이 곧 배울 `static` 지역변수와 가장 큰 차이입니다.

---

## 17. 기억 클래스란 무엇인가요?

교재에서는 <strong>기억 클래스(storage class)</strong>라는 용어가 나옵니다.

이름만 보면 어렵게 느껴질 수 있습니다.

처음에는 다음처럼 이해하면 됩니다.

> 변수를 어떤 방식으로 저장하고 사용할지에 관한 성격을 나타내는 키워드

이번 주에는 다음 네 가지를 봅니다.

| 키워드 | 처음 이해할 핵심 |
| --- | --- |
| `auto` | 일반적인 지역변수 |
| `static` | 값을 계속 기억할 수 있는 변수 |
| `extern` | 다른 곳에 정의된 변수를 사용하겠다고 알림 |
| `register` | 빠른 저장 장소 사용을 요청하던 전통적인 힌트 |

한꺼번에 외우지 말고 하나씩 실행해 봅시다.

---

## 18. `auto` · 가장 일반적인 지역변수

함수 안에서 평소처럼 만든 지역변수는 일반적으로 자동 저장 기간을 갖습니다.

```c
void test(void)
{
    int number = 10;
}
```

`auto`를 직접 적으면 다음과 같습니다.

```c
void test(void)
{
    auto int number = 10;
}
```

하지만 보통은 `auto`를 생략합니다.

```c
int number = 10;
```

::: info 왜 생략하나요?
함수 안의 일반 지역변수는 이미 기본적으로 이런 성격을 가지므로 굳이 `auto`를 적지 않아도 됩니다.
:::

---

## 19. 일반 지역변수는 호출할 때마다 다시 시작합니다

```c
#include <stdio.h>

void count(void)
{
    int number = 0;

    number++;
    printf("%d\n", number);
}

int main(void)
{
    count();
    count();
    count();

    return 0;
}
```

실행 결과:

```text
1
1
1
```

처음 보면 `1, 2, 3`이 나올 것 같지만 그렇지 않습니다.

`count()`가 호출될 때마다 이 문장이 다시 실행됩니다.

```c
int number = 0;
```

그래서 매번 0에서 시작해 1이 됩니다.

---

## 20. `static` 지역변수 · 값을 기억합니다

앞의 코드에 `static`을 붙여 봅시다.

```c
#include <stdio.h>

void count(void)
{
    static int number = 0;

    number++;
    printf("%d\n", number);
}

int main(void)
{
    count();
    count();
    count();

    return 0;
}
```

실행 결과:

```text
1
2
3
```

이번에는 값이 계속 증가합니다.

`static` 지역변수는 함수 호출이 끝나도 값을 유지합니다.

<img class="lesson-figure" src="/images/week7/static-memory.svg" alt="static 지역변수가 함수 호출 사이에서 값을 1, 2, 3으로 기억하는 그림">
<p class="image-caption">`static`은 함수 안에 있지만 값은 다음 호출까지 이어집니다.</p>

<div class="big-check">
<strong>일반 지역변수:</strong> 호출할 때마다 새로 준비<br><br>
<strong>static 지역변수:</strong> 이전 호출의 값을 기억
</div>

---

## 21. `static`은 언제 유용할까요?

함수를 몇 번 호출했는지 세고 싶다고 해 봅시다.

```c
#include <stdio.h>

void visit(void)
{
    static int count = 0;

    count++;
    printf("이 함수는 %d번 호출되었습니다.\n", count);
}

int main(void)
{
    visit();
    visit();
    visit();

    return 0;
}
```

실행 결과:

```text
이 함수는 1번 호출되었습니다.
이 함수는 2번 호출되었습니다.
이 함수는 3번 호출되었습니다.
```

전역변수로 만들지 않아도 함수 내부에서 값을 계속 기억할 수 있습니다.

---

## 22. `static` 지역변수도 지역변수입니다

이 부분은 중요합니다.

```c
void visit(void)
{
    static int count = 0;
}
```

`count`라는 이름은 여전히 `visit()` 안에서만 사용할 수 있습니다.

하지만 값은 함수 호출이 끝난 뒤에도 유지됩니다.

```text
범위 → visit() 안
수명 → 프로그램이 실행되는 동안 유지
```

즉 <strong>보이는 장소와 살아 있는 시간은 서로 다른 개념</strong>입니다.

---

## 23. 함수 밖의 `static`은 의미가 조금 다릅니다

함수 바깥의 변수에도 `static`을 붙일 수 있습니다.

```c
static int score = 100;
```

여러 `.c` 파일로 프로그램을 나눌 때는 이 변수를 **해당 소스 파일 내부에서 사용하도록 제한하는 데** 쓰일 수 있습니다.

::: tip 지금은 이렇게 구분하세요
- 함수 안의 `static` 지역변수 → **다음 호출에도 값을 기억**
- 함수 밖의 `static` 변수 → 여러 파일을 사용할 때 **해당 소스 파일 안에서 사용하도록 제한**

처음에는 첫 번째 의미를 더 중요하게 익히면 됩니다.
:::

---

## 24. `extern` · 실제 변수는 다른 곳에 있다고 알려주기

`extern`은 쉽게 말하면 다음과 같습니다.

> “이 변수의 실제 정의는 다른 곳에 있습니다. 여기에서도 그 변수를 사용하겠습니다.”

한 파일 안에서 단순한 모양을 먼저 봅시다.

```c
#include <stdio.h>

int score = 100;

void showScore(void)
{
    extern int score;
    printf("%d\n", score);
}

int main(void)
{
    showScore();
    return 0;
}
```

실행 결과:

```text
100
```

실제 변수를 만드는 정의는 이 부분입니다.

```c
int score = 100;
```

다음 문장은 새로운 `score`를 하나 더 만드는 것이 아니라 기존 `score`를 사용하겠다고 알립니다.

```c
extern int score;
```

---

## 25. `extern`은 여러 소스 파일에서 더 의미가 있습니다

프로그램이 커지면 코드를 여러 `.c` 파일로 나눌 수 있습니다.

예를 들어 `data.c`에 변수를 정의합니다.

**data.c**

```c
int score = 100;
```

다른 파일에서는 이렇게 사용할 수 있습니다.

**main.c**

```c
#include <stdio.h>

extern int score;

int main(void)
{
    printf("점수: %d\n", score);
    return 0;
}
```

두 파일을 같은 프로젝트에 넣어 함께 빌드하면 `main.c`가 `data.c`의 `score`를 사용할 수 있습니다.

::: info 지금은 개념만 알아도 충분합니다
`extern`을 보면 <strong>“실제 변수는 다른 곳에 있고 여기서는 그것을 사용한다”</strong>라고 읽을 수 있으면 충분합니다.
:::

---

## 26. `register` · 빠른 저장을 요청하던 전통적인 힌트

교재에서 다음과 같은 코드를 볼 수 있습니다.

```c
register int i;
```

과거에는 자주 사용하는 변수를 CPU가 빠르게 접근할 수 있는 <strong>레지스터(register)</strong>에 두어 달라는 힌트로 사용했습니다.

현대 컴파일러는 어떤 값을 레지스터에 둘지 스스로 매우 잘 판단합니다.

그래서 새 프로그램에서는 `register`를 직접 사용할 일이 거의 없습니다.

::: warning 시험과 실무를 구분해서 기억하세요
교재와 시험에서는 `register`의 의미를 알아야 할 수 있습니다.

실제 새 코드를 작성할 때는 보통 컴파일러의 최적화에 맡기고 일반 변수로 작성합니다.
:::

---

## 27. 네 가지 기억 클래스를 한 번에 비교해 봅시다

| 키워드 | 주로 보는 위치 | 핵심 기억법 |
| --- | --- | --- |
| `auto` | 함수/블록 안 | 일반 지역변수, 보통 생략 |
| `static` | 함수 안 또는 함수 밖 | 값을 유지하거나 파일 내부로 제한 |
| `extern` | 함수 안/밖 | 실제 정의가 다른 곳에 있음을 알림 |
| `register` | 함수/블록 안 | 빠른 저장을 요청하던 전통적 힌트 |

특히 이 두 가지를 확실히 비교해 봅시다.

```c
int number = 0;
```

호출할 때마다 다시 시작하는 일반 지역변수입니다.

```c
static int number = 0;
```

다음 호출에도 이전 값을 기억하는 지역변수입니다.

---

## 28. 직접 실습 · 일반 지역변수와 `static` 비교

아래 코드를 그대로 실행해 봅시다.

```c
#include <stdio.h>

void normalCount(void)
{
    int count = 0;
    count++;
    printf("일반: %d\n", count);
}

void staticCount(void)
{
    static int count = 0;
    count++;
    printf("static: %d\n", count);
}

int main(void)
{
    normalCount();
    normalCount();
    normalCount();

    printf("---\n");

    staticCount();
    staticCount();
    staticCount();

    return 0;
}
```

실행 결과:

```text
일반: 1
일반: 1
일반: 1
---
static: 1
static: 2
static: 3
```

### 한 부분만 바꿔 보기

다음 줄을

```c
count++;
```

이렇게 바꿔 보세요.

```c
count = count + 5;
```

일반 변수와 `static` 변수의 결과가 어떻게 달라지는지 확인합니다.

---

## 29. 직접 실습 · 값 전달 확인하기

```c
#include <stdio.h>

void doubleNumber(int number)
{
    number = number * 2;
    printf("함수 안: %d\n", number);
}

int main(void)
{
    int number = 7;

    printf("호출 전: %d\n", number);
    doubleNumber(number);
    printf("호출 후: %d\n", number);

    return 0;
}
```

실행 결과:

```text
호출 전: 7
함수 안: 14
호출 후: 7
```

왜 마지막 값이 14가 아니라 7일까요?

<details>
<summary><strong>정답 보기</strong></summary>

`main()`의 `number` 값 7이 함수의 매개변수 `number`로 복사되었기 때문입니다.

함수 안에서는 복사본만 14로 변경됩니다.

</details>

---

## 30. 일부러 틀려 보고 고쳐 봅시다

### 문제 1 · 지역변수를 다른 함수에서 사용했습니다

```c
#include <stdio.h>

void makeNumber(void)
{
    int number = 10;
}

int main(void)
{
    makeNumber();
    printf("%d\n", number);

    return 0;
}
```

무엇이 문제일까요?

<details>
<summary><strong>정답 보기</strong></summary>

`number`는 `makeNumber()` 안에서 만든 지역변수이므로 `main()`에서는 이름을 사용할 수 없습니다.

필요한 값을 `return`으로 돌려주는 식으로 바꿀 수 있습니다.

```c
#include <stdio.h>

int makeNumber(void)
{
    int number = 10;
    return number;
}

int main(void)
{
    int number = makeNumber();
    printf("%d\n", number);

    return 0;
}
```

</details>

### 문제 2 · `static`이 없는데 1, 2, 3이 나올 거라고 생각했습니다

```c
void count(void)
{
    int number = 0;
    number++;
    printf("%d\n", number);
}
```

이 함수를 세 번 호출하면 무엇이 출력될까요?

<details>
<summary><strong>정답 보기</strong></summary>

```text
1
1
1
```

호출할 때마다 `number`가 다시 0으로 준비되기 때문입니다.

</details>

### 문제 3 · 값 복사인데 원본이 바뀔 거라고 생각했습니다

```c
void change(int x)
{
    x = 999;
}
```

```c
int n = 10;
change(n);
```

호출 후 `n`의 값은 얼마일까요?

<details>
<summary><strong>정답 보기</strong></summary>

`10`입니다.

`x`에는 `n`의 값이 복사되어 들어갔기 때문에 `x`를 변경해도 `n`은 그대로입니다.

</details>

---

## 31. 오늘 배운 내용 확인하기

### 문제 1

C 함수에 일반 변수를 인수로 전달하면 기본적으로 무엇이 전달될까요?

<details>
<summary><strong>정답 보기</strong></summary>

변수에 들어 있는 <strong>값의 복사본</strong>이 전달됩니다.

</details>

### 문제 2

함수 안에서 만든 변수를 무엇이라고 하나요?

<details>
<summary><strong>정답 보기</strong></summary>

지역변수입니다.

</details>

### 문제 3

함수 바깥에서 만든 변수를 무엇이라고 하나요?

<details>
<summary><strong>정답 보기</strong></summary>

전역변수입니다.

</details>

### 문제 4

변수 이름을 사용할 수 있는 코드의 구역을 무엇이라고 하나요?

<details>
<summary><strong>정답 보기</strong></summary>

범위, 영어로 scope라고 합니다.

</details>

### 문제 5

함수 호출이 끝난 뒤에도 값을 기억하는 지역변수를 만들 때 주로 사용하는 키워드는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>

`static`입니다.

</details>

### 문제 6

다른 곳에 정의된 전역변수를 사용하겠다고 알릴 때 사용하는 키워드는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>

`extern`입니다.

</details>

---

## 32. 이번 주 핵심 요약

<div class="big-check">
<strong>① C 함수의 일반적인 인수 전달은 값 복사입니다.</strong><br><br>
<strong>② 매개변수를 바꿔도 호출한 쪽의 원래 변수는 자동으로 바뀌지 않습니다.</strong><br><br>
<strong>③ 지역변수는 함수나 블록 안에서 만들고 그 범위 안에서 사용합니다.</strong><br><br>
<strong>④ 전역변수는 함수 바깥에서 만들며 여러 함수가 함께 사용할 수 있습니다.</strong><br><br>
<strong>⑤ 범위(scope)는 어디에서 보이는지, 수명(lifetime)은 언제까지 존재하는지를 뜻합니다.</strong><br><br>
<strong>⑥ static 지역변수는 함수 호출이 끝나도 값을 기억합니다.</strong><br><br>
<strong>⑦ auto, static, extern, register의 기본 역할을 구분할 수 있어야 합니다.</strong>
</div>

다음 시간부터는 <strong>배열과 포인터</strong>를 배우기 시작합니다.

오늘 배운 “값의 복사본”과 “변수의 위치” 개념이 포인터를 이해하는 중요한 밑바탕이 됩니다.
