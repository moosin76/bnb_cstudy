# 5주차 · 선택 제어문과 반복 제어문

이번 시간부터 프로그램이 조금 더 **생각하는 것처럼** 움직이기 시작합니다.

지금까지는 위에서 아래로 한 줄씩 실행했습니다. 이제는 조건에 따라 어떤 문장은 실행하고 어떤 문장은 건너뛰거나, 같은 일을 여러 번 반복할 수 있습니다.

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 이해하면 충분합니다.

1. `if`로 조건에 따라 실행 여부를 정할 수 있다.
2. `if ~ else`로 둘 중 하나를 선택할 수 있다.
3. `switch`로 여러 선택지 중 하나를 고를 수 있다.
4. `while`, `do ~ while`, `for`로 같은 일을 반복할 수 있다.
5. `break`와 `continue`로 반복 흐름을 바꿀 수 있다.
:::

---

## 1. 제어문이란 무엇인가요?

보통 프로그램은 위에서 아래로 한 줄씩 실행됩니다.

```c
printf("첫 번째\n");
printf("두 번째\n");
printf("세 번째\n");
```

실행 결과:

```text
첫 번째
두 번째
세 번째
```

하지만 실제 프로그램은 항상 모든 문장을 똑같이 실행하지 않습니다.

예를 들어 영화관 입장 프로그램이라면 나이에 따라 결과가 달라질 수 있습니다.

```text
나이가 15세 이상인가?

예  → 입장할 수 있습니다.
아니오 → 입장할 수 없습니다.
```

또 어떤 일을 여러 번 해야 할 수도 있습니다.

```text
"안녕하세요"를 5번 출력하기
```

이처럼 프로그램의 실행 순서를 조절하는 문장을 <strong>제어문(control statement)</strong>이라고 합니다.

<div class="big-check">
<strong>선택 제어문</strong> = 조건에 따라 실행할 길을 고릅니다.<br><br>
<strong>반복 제어문</strong> = 같은 일을 여러 번 실행합니다.
</div>

---

## 2. `if` · 조건이 맞을 때만 실행하기

`if`는 영어로 <strong>"만약"</strong>이라는 뜻입니다.

일상생활 문장으로 먼저 생각해 봅시다.

```text
만약 비가 온다면
    우산을 가져간다.
```

C언어에서는 다음과 비슷하게 작성합니다.

```c
if (비가 온다)
{
    우산을 가져간다;
}
```

실제 C 코드에서는 조건을 계산할 수 있는 식으로 적습니다.

```c
if (age >= 20)
{
    printf("성인입니다.\n");
}
```

### `if`의 기본 모양

```c
if (조건)
{
    조건이 참일 때 실행할 문장;
}
```

조건이 참이면 `{ }` 안의 문장을 실행합니다.

조건이 거짓이면 `{ }` 안을 건너뜁니다.

<div class="control-flow choice-flow">
  <div class="flow-condition">조건이 참인가?</div>
  <div class="flow-branch yes">예 → 안의 문장 실행</div>
  <div class="flow-branch no">아니오 → 건너뜀</div>
</div>

---

## 3. 직접 실행해 봅시다 · 성인인지 확인하기

```c
#include <stdio.h>

int main(void)
{
    int age = 25;

    if (age >= 20)
    {
        printf("성인입니다.\n");
    }

    printf("프로그램을 종료합니다.\n");

    return 0;
}
```

실행 결과:

```text
성인입니다.
프로그램을 종료합니다.
```

이번에는 값을 바꿔 봅니다.

```c
int age = 15;
```

실행 결과:

```text
프로그램을 종료합니다.
```

`age >= 20`이 거짓이므로 `if` 안의 문장만 건너뜁니다.

그 아래에 있는 문장은 계속 실행됩니다.

---

## 4. 참과 거짓을 다시 기억해 봅시다

지난 시간에 관계 연산자를 배웠습니다.

```c
age >= 20
score == 100
number != 0
```

이런 식은 결과가 참 또는 거짓이 됩니다.

C언어에서는 보통 다음처럼 생각할 수 있습니다.

```text
0      → 거짓
0이 아님 → 참
```

따라서 아래 코드도 문법적으로 가능합니다.

```c
if (1)
{
    printf("항상 실행됩니다.\n");
}
```

`1`은 0이 아니므로 참으로 판단합니다.

::: warning 처음에는 조건식을 분명하게 적으세요
아래처럼 숫자만 넣는 코드는 학습 초기에 이해하기 어렵습니다.

```c
if (1)
```

처음에는 다음처럼 의미가 보이는 조건식을 사용하는 것이 좋습니다.

```c
if (age >= 20)
```
:::

---

## 5. `if ~ else` · 둘 중 하나를 고르기

이번에는 조건이 참일 때와 거짓일 때 각각 다른 일을 해봅시다.

일상 문장으로는 다음과 같습니다.

```text
만약 점수가 60점 이상이면
    합격
그렇지 않으면
    불합격
```

C언어에서는 `if ~ else`를 사용합니다.

```c
if (score >= 60)
{
    printf("합격입니다.\n");
}
else
{
    printf("불합격입니다.\n");
}
```

<div class="control-flow choice-flow two-way">
  <div class="flow-condition">score >= 60 ?</div>
  <div class="flow-branch yes">참 → 합격</div>
  <div class="flow-branch no">거짓 → 불합격</div>
</div>

둘 중 <strong>한쪽만</strong> 실행됩니다.

---

## 6. 실습 · 점수를 입력받아 합격 여부 출력하기

```c
#include <stdio.h>

int main(void)
{
    int score;

    printf("점수를 입력하세요: ");
    scanf("%d", &score);

    if (score >= 60)
    {
        printf("합격입니다.\n");
    }
    else
    {
        printf("불합격입니다.\n");
    }

    return 0;
}
```

실행 예:

```text
점수를 입력하세요: 75
합격입니다.
```

다시 실행해서 `50`도 입력해 봅니다.

```text
점수를 입력하세요: 50
불합격입니다.
```

---

## 7. `else if` · 선택지가 세 개 이상이라면

점수를 A, B, C처럼 여러 단계로 나누고 싶다면 어떻게 할까요?

`else if`를 이어서 사용할 수 있습니다.

```c
if (score >= 90)
{
    printf("A등급\n");
}
else if (score >= 80)
{
    printf("B등급\n");
}
else if (score >= 70)
{
    printf("C등급\n");
}
else
{
    printf("D등급\n");
}
```

위에서부터 차례대로 조건을 확인합니다.

예를 들어 `score`가 85라면:

```text
score >= 90 ? → 거짓
score >= 80 ? → 참
```

`B등급`을 출력하고 아래 조건들은 더 이상 확인하지 않습니다.

::: tip 순서가 중요합니다
다음처럼 작은 조건을 먼저 쓰면 문제가 생깁니다.

```c
if (score >= 70)
{
    printf("C등급\n");
}
else if (score >= 90)
{
    printf("A등급\n");
}
```

95점도 첫 번째 조건 `score >= 70`이 참이므로 C등급이 되어 버립니다.

범위를 나눌 때는 조건 순서를 꼭 확인하세요.
:::

---

## 8. `if` 안에 `if`를 넣을 수도 있습니다

제어문 안에 또 다른 제어문을 넣는 것을 <strong>중첩</strong>이라고 합니다.

예를 들어 나이가 20세 이상이고 회원인지 확인한다고 해봅시다.

```c
if (age >= 20)
{
    if (member == 1)
    {
        printf("성인 회원입니다.\n");
    }
}
```

하지만 지난 시간에 배운 논리 AND를 사용하면 더 간단하게 만들 수도 있습니다.

```c
if (age >= 20 && member == 1)
{
    printf("성인 회원입니다.\n");
}
```

둘 다 가능하지만, 조건이 단순하다면 아래 코드가 읽기 쉬운 경우가 많습니다.

---

## 9. `switch` · 값에 따라 여러 갈래로 선택하기

메뉴 번호처럼 특정 값에 따라 할 일을 나눌 때 `switch`를 사용할 수 있습니다.

예를 들어:

```text
1 → 새 게임
2 → 이어하기
3 → 종료
```

C언어에서는 다음과 같이 작성합니다.

```c
switch (menu)
{
case 1:
    printf("새 게임을 시작합니다.\n");
    break;

case 2:
    printf("게임을 이어합니다.\n");
    break;

case 3:
    printf("게임을 종료합니다.\n");
    break;

default:
    printf("잘못된 메뉴입니다.\n");
    break;
}
```

### 기본 모양

```c
switch (값)
{
case 값1:
    실행할 문장;
    break;

case 값2:
    실행할 문장;
    break;

default:
    어느 case에도 맞지 않을 때 실행할 문장;
    break;
}
```

::: info `default`는 꼭 있어야 하나요?
반드시 필요한 것은 아닙니다.

하지만 예상하지 못한 값이 들어왔을 때 안내할 수 있어서 초보 프로그램에서는 넣어 두는 것이 이해하기 좋습니다.
:::

---

## 10. `break`를 빼면 어떻게 될까요?

`switch`에서 `break`는 매우 중요합니다.

다음 코드를 봅시다.

```c
int menu = 1;

switch (menu)
{
case 1:
    printf("1번\n");

case 2:
    printf("2번\n");

case 3:
    printf("3번\n");
}
```

실행 결과:

```text
1번
2번
3번
```

`case 1`을 찾은 뒤 아래쪽으로 계속 실행되기 때문입니다.

보통 각 메뉴를 따로 처리하려면 `break`를 넣습니다.

```c
case 1:
    printf("1번\n");
    break;
```

<div class="big-check">
<strong>switch의 break</strong> = 여기까지 실행했으니 switch 밖으로 나가라는 뜻
</div>

---

## 11. `if`와 `switch`는 언제 사용하나요?

처음에는 이렇게 구분하면 편합니다.

| 상황 | 사용하기 편한 제어문 |
| --- | --- |
| 점수가 60 이상인가? | `if` |
| 나이가 20 이상이고 회원인가? | `if` |
| 1번, 2번, 3번 메뉴 중 무엇인가? | `switch` |
| 문자 `'A'`, `'B'`, `'C'` 중 무엇인가? | `switch` |

`switch`가 `if`보다 항상 좋은 것도 아니고, `if`가 항상 좋은 것도 아닙니다.

문제의 모양에 따라 읽기 쉬운 쪽을 고르면 됩니다.

---

## 반복 제어문 · 같은 일을 여러 번 실행하기

지금부터는 같은 일을 여러 번 실행하는 방법을 배웁니다.

---

## 12. 반복문은 왜 필요한가요?

`안녕하세요`를 5번 출력한다고 생각해 봅시다.

이렇게 작성할 수도 있습니다.

```c
printf("안녕하세요\n");
printf("안녕하세요\n");
printf("안녕하세요\n");
printf("안녕하세요\n");
printf("안녕하세요\n");
```

5번 정도는 가능하지만 100번이라면 매우 불편합니다.

반복문을 사용하면 다음처럼 표현할 수 있습니다.

```text
이 문장을 5번 반복해 주세요.
```

<div class="big-check">
<strong>반복문</strong> = 같은 일을 정해진 조건에 따라 여러 번 실행하는 문장
</div>

C언어에서 대표적인 반복문은 다음 세 가지입니다.

```text
while

do ~ while

for
```

---

## 13. `while` · 조건이 참인 동안 반복하기

`while`은 영어로 <strong>"~하는 동안"</strong>이라는 뜻입니다.

다음처럼 이해하면 쉽습니다.

```text
숫자가 5 이하인 동안
    숫자를 출력한다.
```

C언어 코드:

```c
int number = 1;

while (number <= 5)
{
    printf("%d\n", number);
    number++;
}
```

실행 결과:

```text
1
2
3
4
5
```

### `while`의 흐름

<div class="control-flow loop-flow">
  <div class="flow-condition">조건 확인</div>
  <div class="flow-branch yes">참 → 반복할 문장 실행</div>
  <div class="flow-return">다시 조건 확인 ↺</div>
  <div class="flow-branch no">거짓 → 반복 종료</div>
</div>

조건을 먼저 확인하고, 참인 동안 계속 반복합니다.

---

## 14. `while`을 한 단계씩 따라가 봅시다

코드:

```c
int number = 1;

while (number <= 3)
{
    printf("%d\n", number);
    number++;
}
```

처음에는:

```text
number = 1
```

첫 번째 반복:

```text
1 <= 3 → 참
1 출력
number++ → 2
```

두 번째 반복:

```text
2 <= 3 → 참
2 출력
number++ → 3
```

세 번째 반복:

```text
3 <= 3 → 참
3 출력
number++ → 4
```

다음 확인:

```text
4 <= 3 → 거짓
반복 종료
```

실행 결과:

```text
1
2
3
```

---

## 15. 반복 변수의 값을 바꾸는 것을 잊지 마세요

아래 코드를 봅시다.

```c
int number = 1;

while (number <= 5)
{
    printf("%d\n", number);
}
```

문제가 있습니다.

`number`가 계속 1이므로 조건은 영원히 참입니다.

```text
1 <= 5 → 참
1 <= 5 → 참
1 <= 5 → 참
...
```

이처럼 끝나지 않는 반복을 <strong>무한 반복</strong>이라고 합니다.

올바르게 끝내려면 반복할 때 값이 변해야 합니다.

```c
number++;
```

::: warning 프로그램이 끝없이 실행된다면
Visual Studio 콘솔 프로그램에서 실수로 무한 반복을 만들었다면 실행 중인 창을 닫거나 디버깅을 중지하면 됩니다.

오류가 나도 괜찮습니다. 반복문을 배우면서 누구나 한 번쯤 만나는 실수입니다.
:::

---

## 16. 실습 · 1부터 10까지 더하기

이번에는 반복하면서 값을 더해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int number = 1;
    int sum = 0;

    while (number <= 10)
    {
        sum = sum + number;
        number++;
    }

    printf("1부터 10까지의 합: %d\n", sum);

    return 0;
}
```

실행 결과:

```text
1부터 10까지의 합: 55
```

핵심은 이 부분입니다.

```c
sum = sum + number;
```

예를 들어 처음에는:

```text
sum = 0
number = 1

sum = 0 + 1 → 1
```

다음 반복에서는:

```text
sum = 1
number = 2

sum = 1 + 2 → 3
```

이런 식으로 합계를 계속 쌓습니다.

---

## 17. `do ~ while` · 일단 한 번 실행하고 조건 확인하기

`while`은 조건을 먼저 확인합니다.

하지만 `do ~ while`은 <strong>먼저 한 번 실행한 뒤</strong> 조건을 확인합니다.

기본 모양:

```c
do
{
    반복할 문장;
} while (조건);
```

맨 마지막에 세미콜론 `;`이 있다는 점도 확인하세요.

### 예제

```c
int number = 1;

do
{
    printf("%d\n", number);
    number++;
} while (number <= 3);
```

실행 결과:

```text
1
2
3
```

---

## 18. `while`과 `do ~ while`의 중요한 차이

다음 코드를 비교해 봅시다.

### `while`

```c
int number = 10;

while (number < 5)
{
    printf("실행되었습니다.\n");
}
```

처음부터 `10 < 5`가 거짓입니다.

따라서 한 번도 실행되지 않습니다.

### `do ~ while`

```c
int number = 10;

do
{
    printf("실행되었습니다.\n");
} while (number < 5);
```

실행 결과:

```text
실행되었습니다.
```

조건은 거짓이지만 먼저 실행하기 때문에 한 번은 출력됩니다.

<div class="operator-compare">
  <div class="operator-card"><strong>while</strong><span>조건부터 확인</span><small>0번 실행될 수도 있음</small></div>
  <div class="operator-card"><strong>do ~ while</strong><span>먼저 실행</span><small>최소 1번은 실행</small></div>
</div>

---

## 19. `for` · 횟수가 보이는 반복문

1부터 5까지 출력하는 프로그램을 이번에는 `for`로 만들어 봅시다.

```c
for (int i = 1; i <= 5; i++)
{
    printf("%d\n", i);
}
```

실행 결과:

```text
1
2
3
4
5
```

처음 보면 괄호 안이 복잡해 보입니다.

한 조각씩 나누면 됩니다.

```c
for (int i = 1; i <= 5; i++)
```

<div class="for-parts">
  <div><strong>① 시작</strong><code>int i = 1</code></div>
  <div><strong>② 계속할 조건</strong><code>i <= 5</code></div>
  <div><strong>③ 한 번 끝난 뒤</strong><code>i++</code></div>
</div>

쉽게 읽으면:

```text
i를 1부터 시작해서

i가 5 이하인 동안

한 번 실행할 때마다 i를 1씩 증가시킨다.
```

---

## 20. `for`문의 실행 순서

다음 코드를 기준으로 봅시다.

```c
for (int i = 1; i <= 3; i++)
{
    printf("%d\n", i);
}
```

실행 순서는 다음과 같습니다.

```text
① int i = 1       처음 한 번만 실행
        ↓
② i <= 3          조건 확인
        ↓ 참
③ printf          본문 실행
        ↓
④ i++             값 변경
        ↓
② 조건으로 돌아감
```

`i`가 4가 되면:

```text
4 <= 3 → 거짓
```

반복이 끝납니다.

---

## 21. 실습 · 원하는 횟수만큼 인사하기

```c
#include <stdio.h>

int main(void)
{
    int count;

    printf("몇 번 인사할까요? ");
    scanf("%d", &count);

    for (int i = 1; i <= count; i++)
    {
        printf("%d번째: 안녕하세요!\n", i);
    }

    return 0;
}
```

실행 예:

```text
몇 번 인사할까요? 3
1번째: 안녕하세요!
2번째: 안녕하세요!
3번째: 안녕하세요!
```

`3` 대신 `5`, `10` 등 다른 숫자를 입력해 봅니다.

---

## 22. `while`과 `for` 중 무엇을 써야 하나요?

둘 다 반복할 수 있습니다.

처음에는 다음 기준으로 생각하면 편합니다.

### 반복 횟수가 눈에 잘 보일 때

```text
10번 반복
1부터 100까지 반복
학생 30명을 반복
```

`for`가 읽기 편한 경우가 많습니다.

### 언제 끝날지 조건이 중심일 때

```text
사용자가 0을 입력할 때까지
체력이 0보다 큰 동안
비밀번호가 맞을 때까지
```

`while`이 자연스러운 경우가 많습니다.

하지만 반드시 이렇게만 써야 하는 규칙은 아닙니다.

---

## 23. 반복문 안에 반복문을 넣을 수 있습니다

`for` 안에 또 `for`를 넣을 수 있습니다.

이를 <strong>중첩 반복문</strong>이라고 합니다.

간단한 구구단 일부를 출력해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    for (int dan = 2; dan <= 3; dan++)
    {
        printf("[%d단]\n", dan);

        for (int number = 1; number <= 9; number++)
        {
            printf("%d x %d = %d\n", dan, number, dan * number);
        }
    }

    return 0;
}
```

먼저 바깥쪽 `dan`이 2가 됩니다.

그 상태에서 안쪽 `number`가 1부터 9까지 전부 반복합니다.

그 다음 바깥쪽 `dan`이 3이 되고, 안쪽 반복이 다시 1부터 9까지 실행됩니다.

::: tip 처음에는 중첩 반복문을 어려워해도 괜찮습니다
바깥 반복문이 한 번 움직일 때, 안쪽 반복문은 처음부터 끝까지 한 바퀴 돈다고 생각해 보세요.
:::

---

## 24. `break` · 반복문을 즉시 끝내기

앞에서 `switch`의 `break`를 봤습니다.

반복문에서도 `break`를 사용할 수 있습니다.

```c
for (int i = 1; i <= 10; i++)
{
    if (i == 5)
    {
        break;
    }

    printf("%d\n", i);
}
```

실행 결과:

```text
1
2
3
4
```

`i`가 5가 되는 순간 `break`를 만나 반복문이 끝납니다.

<div class="big-check">
<strong>break</strong> = 지금 있는 switch 또는 반복문에서 빠져나간다
</div>

---

## 25. `continue` · 이번 한 번만 건너뛰기

`continue`는 반복문 자체를 끝내지는 않습니다.

현재 반복만 건너뛰고 다음 반복으로 넘어갑니다.

```c
for (int i = 1; i <= 5; i++)
{
    if (i == 3)
    {
        continue;
    }

    printf("%d\n", i);
}
```

실행 결과:

```text
1
2
4
5
```

`3`일 때만 `printf()`를 건너뜁니다.

### `break`와 `continue` 비교

| 문장 | 뜻 |
| --- | --- |
| `break` | 반복문 자체를 끝냄 |
| `continue` | 이번 반복만 건너뛰고 다음 반복 계속 |

---

## 26. `goto` · 지정한 위치로 이동하기

교재의 기타 제어문에서 `goto`를 만날 수 있습니다.

`goto`는 프로그램 실행 위치를 지정한 이름으로 바로 이동시킵니다.

```c
#include <stdio.h>

int main(void)
{
    printf("첫 번째\n");
    goto end;

    printf("이 문장은 실행되지 않습니다.\n");

end:
    printf("끝\n");

    return 0;
}
```

실행 결과:

```text
첫 번째
끝
```

`goto end;`를 만나면 `end:`라고 표시된 위치로 이동합니다.

::: warning 실습에서는 자주 사용하지 않습니다
`goto`를 너무 많이 사용하면 프로그램 실행 흐름을 따라가기 어려워질 수 있습니다.

대부분의 일반적인 상황은 `if`, `for`, `while`, 함수 등을 이용해 더 읽기 쉽게 작성할 수 있습니다.

이번에는 <strong>"이런 제어문도 있다"</strong> 정도로 알아두면 충분합니다.
:::

---

## 27. 가장 많이 하는 실수 1 · `=`와 `==`

조건에서 값을 비교하려는데 `=`를 사용하는 실수가 매우 많습니다.

비교:

```c
if (score == 100)
```

대입:

```c
score = 100;
```

둘은 완전히 다릅니다.

<div class="operator-compare">
  <div class="operator-card danger"><code>=</code><span>값을 넣는다</span><small>대입 연산자</small></div>
  <div class="operator-card good"><code>==</code><span>같은지 비교한다</span><small>관계 연산자</small></div>
</div>

---

## 28. 가장 많이 하는 실수 2 · 세미콜론 위치

다음 코드를 봅시다.

```c
if (score >= 60);
{
    printf("합격\n");
}
```

`if` 조건 뒤에 세미콜론 `;`이 들어가 있습니다.

이 세미콜론 때문에 우리가 생각한 것과 다른 동작을 할 수 있습니다.

보통 원하는 형태는 이것입니다.

```c
if (score >= 60)
{
    printf("합격\n");
}
```

반복문에서도 마찬가지입니다.

```c
while (number <= 5);   // 주의
```

조건 뒤에 습관적으로 세미콜론을 붙이지 않도록 주의합니다.

---

## 29. 가장 많이 하는 실수 3 · 반복 횟수가 하나 차이 나는 문제

다음 두 코드를 비교해 봅시다.

```c
for (int i = 1; i <= 5; i++)
```

`1, 2, 3, 4, 5` → 5번 실행됩니다.

하지만:

```c
for (int i = 1; i < 5; i++)
```

`1, 2, 3, 4` → 4번 실행됩니다.

`<`와 `<=`를 헷갈리면 반복 횟수가 하나 달라지는 경우가 많습니다.

이런 실수를 프로그래밍에서는 흔히 <strong>off-by-one 오류</strong>라고 부릅니다.

용어를 외우기보다 <strong>시작값과 마지막 값을 직접 적어 확인하는 습관</strong>이 중요합니다.

---

## 30. 종합 실습 · 숫자 맞히기 기초

아직 난수를 배우지 않았으므로 정답을 미리 정해 놓겠습니다.

사용자가 정답을 맞힐 때까지 계속 입력받습니다.

```c
#include <stdio.h>

int main(void)
{
    int answer = 7;
    int number = 0;

    while (number != answer)
    {
        printf("1부터 10 사이의 숫자를 입력하세요: ");
        scanf("%d", &number);

        if (number == answer)
        {
            printf("정답입니다!\n");
        }
        else
        {
            printf("다시 시도해 보세요.\n");
        }
    }

    return 0;
}
```

실행 예:

```text
1부터 10 사이의 숫자를 입력하세요: 3
다시 시도해 보세요.
1부터 10 사이의 숫자를 입력하세요: 9
다시 시도해 보세요.
1부터 10 사이의 숫자를 입력하세요: 7
정답입니다!
```

이 프로그램에는 오늘 배운 내용이 함께 들어 있습니다.

```text
while      → 정답을 맞힐 때까지 반복
if         → 정답인지 검사
else       → 틀렸을 때 안내
!=         → 서로 다른지 비교
==         → 서로 같은지 비교
```

---

## 31. 일부러 틀려 보고 고쳐 봅시다

### 문제 1 · 비교 연산자

```c
int score = 80;

if (score = 80)
{
    printf("80점입니다.\n");
}
```

<details>
<summary><strong>정답 보기</strong></summary>

같은지 비교하려면 `=`가 아니라 `==`를 사용합니다.

```c
if (score == 80)
{
    printf("80점입니다.\n");
}
```

</details>

### 문제 2 · 무한 반복

```c
int number = 1;

while (number <= 5)
{
    printf("%d\n", number);
}
```

<details>
<summary><strong>정답 보기</strong></summary>

`number`의 값이 변하지 않습니다.

```c
int number = 1;

while (number <= 5)
{
    printf("%d\n", number);
    number++;
}
```

</details>

### 문제 3 · switch

```c
switch (menu)
{
case 1:
    printf("1번 메뉴\n");

case 2:
    printf("2번 메뉴\n");
}
```

<details>
<summary><strong>정답 보기</strong></summary>

각 메뉴만 실행하려는 목적이라면 `break`를 넣습니다.

```c
switch (menu)
{
case 1:
    printf("1번 메뉴\n");
    break;

case 2:
    printf("2번 메뉴\n");
    break;
}
```

</details>

---

## 32. 오늘 배운 내용 확인하기

### 1번

조건이 참일 때만 어떤 문장을 실행하려면 무엇을 사용하나요?

<details>
<summary><strong>정답 보기</strong></summary>
`if`를 사용합니다.
</details>

### 2번

`if ~ else`에서 두 부분이 동시에 실행될까요?

<details>
<summary><strong>정답 보기</strong></summary>
아닙니다. 조건에 따라 둘 중 한쪽이 실행됩니다.
</details>

### 3번

`while`과 `do ~ while`의 가장 큰 차이는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>
`while`은 조건을 먼저 확인하고, `do ~ while`은 본문을 먼저 실행한 뒤 조건을 확인합니다. 따라서 `do ~ while`의 본문은 최소 한 번 실행됩니다.
</details>

### 4번

다음 반복문은 몇 번 실행될까요?

```c
for (int i = 1; i <= 5; i++)
```

<details>
<summary><strong>정답 보기</strong></summary>
5번입니다. `i`는 1, 2, 3, 4, 5의 값을 가집니다.
</details>

### 5번

`break`와 `continue`의 차이는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>
`break`는 반복문을 끝내고, `continue`는 현재 반복만 건너뛴 뒤 다음 반복을 계속합니다.
</details>

### 6번

다음 코드가 끝없이 반복되는 이유는 무엇인가요?

```c
int i = 1;

while (i <= 5)
{
    printf("%d\n", i);
}
```

<details>
<summary><strong>정답 보기</strong></summary>
`i`의 값이 바뀌지 않기 때문입니다. 반복문 안에 `i++;`처럼 조건이 언젠가 거짓이 되도록 값을 변경하는 부분이 필요합니다.
</details>

---

## 33. 이번 주 핵심 요약

<div class="big-check">
<strong>① if</strong>는 조건이 참일 때 문장을 실행합니다.<br><br>
<strong>② if ~ else</strong>는 두 갈래 중 하나를 선택합니다.<br><br>
<strong>③ switch</strong>는 특정 값에 따라 여러 갈래로 나눌 때 편리합니다.<br><br>
<strong>④ while</strong>은 조건이 참인 동안 반복합니다.<br><br>
<strong>⑤ do ~ while</strong>은 먼저 한 번 실행하고 조건을 확인합니다.<br><br>
<strong>⑥ for</strong>는 시작값·조건·변화를 한 줄에서 볼 수 있어 횟수 반복에 자주 사용합니다.<br><br>
<strong>⑦ break</strong>는 반복을 끝내고, <strong>continue</strong>는 이번 반복만 건너뜁니다.
</div>

### 다음 시간 예고

다음 시간에는 프로그램의 기능을 작은 단위로 나누어 사용하는 <strong>함수</strong>를 본격적으로 배웁니다.

- 함수의 개념
- 표준 함수
- 사용자 정의 함수
- 함수 만들기와 호출하기

지금까지 `printf()`, `scanf()`처럼 만들어진 함수를 사용했다면, 다음 시간부터는 우리가 직접 함수를 만들어 봅니다.
