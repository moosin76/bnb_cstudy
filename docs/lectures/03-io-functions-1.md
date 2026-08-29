# 3주차 · 입·출력 함수와 연산자(1)

이번 시간에는 프로그램이 사람과 <strong>말을 주고받는 방법</strong>을 배웁니다.

지금까지는 프로그램이 정해진 내용을 화면에 보여 주기만 했습니다. 이제부터는 사용자가 직접 숫자나 문자를 입력하고, 프로그램이 그 값을 받아서 사용할 수 있습니다.

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 다섯 가지를 이해하면 충분합니다.

1. 함수는 <strong>미리 만들어 둔 일을 이름으로 불러 사용하는 것</strong>이라는 것
2. `printf()`로 화면에 글자와 값을 출력하는 방법
3. `scanf()`로 키보드 입력을 변수에 저장하는 방법
4. `%d`, `%f`, `%lf`, `%c`처럼 값의 종류에 맞는 표시를 사용하는 방법
5. `scanf()`에서 변수 앞에 `&`가 붙는 이유를 아주 간단히 설명할 수 있는 것
:::

---

## 1. 입력과 출력이란 무엇인가요?

먼저 두 단어부터 아주 쉽게 정리해 봅시다.

### 출력

<strong>컴퓨터가 사람에게 무엇인가를 보여 주는 것</strong>입니다.

```text
안녕하세요!
점수는 90점입니다.
```

C언어에서는 대표적으로 `printf()`를 사용합니다.

```c
printf("안녕하세요!\n");
```

### 입력

<strong>사람이 컴퓨터에게 값을 넣어 주는 것</strong>입니다.

예를 들어 프로그램이 이렇게 묻습니다.

```text
나이를 입력하세요:
```

사용자가 키보드로 다음과 같이 입력합니다.

```text
25
```

그러면 프로그램은 입력한 `25`를 변수에 저장해 사용할 수 있습니다.

<img class="lesson-figure" src="/images/week3/io-flow.svg" alt="사람이 키보드로 값을 입력하고 C 프로그램이 처리한 뒤 화면으로 결과를 출력하는 흐름">
<p class="image-caption">입력은 사람 → 프로그램, 출력은 프로그램 → 사람 방향으로 흐릅니다.</p>

<div class="big-check">
<strong>입력:</strong> 사람 → 컴퓨터<br><br>
<strong>출력:</strong> 컴퓨터 → 사람
</div>

---

## 2. 함수란 무엇인가요?

이번 주 교재에는 <strong>함수(function)</strong>라는 말이 등장합니다.

함수라고 하면 수학이 떠올라 어렵게 느껴질 수 있지만, 프로그래밍에서는 처음에 이렇게 생각하면 됩니다.

<div class="big-check">
<strong>함수 = 특정한 일을 하도록 미리 만들어 둔 기능</strong>
</div>

예를 들어 전자레인지의 <strong>시작 버튼</strong>을 생각해 봅시다.

버튼 하나를 누르면 전자레인지 내부에서는 여러 일이 일어납니다.

```text
전원을 켠다
→ 시간을 계산한다
→ 음식을 데운다
→ 시간이 끝나면 멈춘다
→ 소리를 낸다
```

우리는 이 모든 과정을 직접 명령하지 않습니다.

그냥 <strong>시작 버튼</strong>을 누릅니다.

C언어의 함수도 비슷합니다.

```c
printf("안녕하세요!\n");
```

화면에 글자를 보여 주기 위해 컴퓨터 내부에서 일어나는 일을 우리가 모두 만들 필요는 없습니다.

`printf()`라는 이미 준비된 기능을 불러 사용하면 됩니다.

---

## 3. 함수는 어떻게 사용하나요?

우리가 이미 사용한 문장을 다시 봅시다.

```c
printf("안녕하세요!\n");
```

크게 보면 다음과 같습니다.

```text
printf    ( "안녕하세요!\n" )
함수 이름        함수에게 전달할 값
```

- `printf` : 사용할 함수의 이름
- `( )` : 함수에 필요한 값을 전달하는 자리
- `"안녕하세요!\n"` : 함수에게 전달하는 값

함수에게 전달하는 값을 <strong>인수(argument)</strong>라고 부릅니다.

::: info 용어는 천천히 익히세요
지금은 `인수`라는 단어를 암기하는 것보다 <strong>“괄호 안에 함수가 사용할 값을 넣는다”</strong>라고 이해하는 것이 더 중요합니다.
:::

---

## 4. 표준 함수란 무엇인가요?

C언어에는 우리가 직접 만들지 않아도 사용할 수 있도록 미리 준비된 함수들이 있습니다.

이런 함수들을 <strong>표준 라이브러리 함수</strong>라고 부릅니다.

이번 주에 만날 대표적인 함수는 다음과 같습니다.

| 함수 | 하는 일 |
| --- | --- |
| `printf()` | 여러 형태의 값을 화면에 출력 |
| `putchar()` | 문자 한 글자를 출력 |
| `puts()` | 문자열을 출력하고 줄을 바꿈 |
| `scanf()` | 키보드에서 여러 형태의 값을 입력 |
| `getchar()` | 문자 한 글자를 입력 |
| `fgets()` | 한 줄의 문자열을 안전하게 입력할 때 사용 |

이 함수들은 입출력과 관련되어 있으므로 보통 다음 헤더 파일을 사용합니다.

```c
#include <stdio.h>
```

`stdio`는 <strong>standard input/output</strong>, 즉 <strong>표준 입출력</strong>과 관련된 이름입니다.

---

# 표준 출력 함수

## 5. `printf()`로 글자를 출력해 봅시다

가장 단순한 형태부터 봅니다.

```c
#include <stdio.h>

int main(void)
{
    printf("안녕하세요!\n");
    return 0;
}
```

실행 결과:

```text
안녕하세요!
```

따옴표 안에 적은 내용이 화면에 출력됩니다.

### 여러 줄 출력하기

```c
#include <stdio.h>

int main(void)
{
    printf("방송대 BnB스터디입니다.\n");
    printf("오늘은 입출력 함수를 공부합니다.\n");
    printf("천천히 따라오세요!\n");

    return 0;
}
```

실행 결과:

```text
방송대 BnB스터디입니다.
오늘은 입출력 함수를 공부합니다.
천천히 따라오세요!
```

`\n`은 <strong>줄 바꿈</strong>이었습니다.

---

## 6. `printf()`로 변수의 값을 출력하기

변수에 들어 있는 값도 출력할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    int age = 25;

    printf("나이는 %d세입니다.\n", age);

    return 0;
}
```

실행 결과:

```text
나이는 25세입니다.
```

여기에서 `%d` 부분에 `age`의 값이 들어가 출력됩니다.

```text
"나이는 %d세입니다.\n", age
         ↑                  ↑
      값이 들어갈 자리     실제 값
```

`%d`와 같은 표시를 <strong>서식 지정자(format specifier)</strong>라고 부릅니다.

---

## 7. 자주 사용하는 출력 서식 지정자

우선 아래 네 가지부터 익숙해지면 됩니다.

| 자료형 | 출력할 때 | 예 |
| --- | --- | --- |
| `int` | `%d` | `printf("%d", age);` |
| `double` | `%f` | `printf("%f", height);` |
| `char` | `%c` | `printf("%c", grade);` |
| 문자열 | `%s` | `printf("%s", name);` |

예제를 실행해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int age = 25;
    double height = 172.5;
    char grade = 'A';

    printf("나이: %d\n", age);
    printf("키: %f\n", height);
    printf("등급: %c\n", grade);

    return 0;
}
```

실행 결과는 다음과 비슷합니다.

```text
나이: 25
키: 172.500000
등급: A
```

### 소수점 자릿수 줄이기

`%f`로 출력하면 소수점 아래가 길게 나옵니다.

```c
printf("키: %.1f\n", height);
```

실행 결과:

```text
키: 172.5
```

`%.1f`의 `1`은 <strong>소수점 아래 한 자리까지 보여 달라</strong>는 뜻입니다.

```c
printf("%.2f\n", 3.141592);
printf("%.3f\n", 3.141592);
```

실행 결과:

```text
3.14
3.142
```

---

## 8. 여러 값을 한 번에 출력하기

`printf()` 하나에 여러 값을 넣을 수도 있습니다.

```c
#include <stdio.h>

int main(void)
{
    int age = 25;
    int score = 90;

    printf("나이: %d세, 점수: %d점\n", age, score);

    return 0;
}
```

실행 결과:

```text
나이: 25세, 점수: 90점
```

중요한 것은 <strong>서식 지정자와 뒤쪽 값의 순서</strong>입니다.

```text
나이: %d세, 점수: %d점
      ①             ②

age, score
 ①     ②
```

첫 번째 `%d`에는 `age`, 두 번째 `%d`에는 `score`가 들어갑니다.

---

## 9. `putchar()`로 문자 한 글자 출력하기

문자 한 글자만 출력할 때는 `putchar()`를 사용할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    putchar('A');
    putchar('\n');

    return 0;
}
```

실행 결과:

```text
A
```

`putchar()`는 이름 그대로 <strong>character 한 글자를 출력</strong>하는 함수라고 생각하면 쉽습니다.

---

## 10. `puts()`로 문자열 출력하기

`puts()`는 문자열을 출력할 때 사용할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    puts("안녕하세요!");
    puts("C언어를 공부합니다.");

    return 0;
}
```

실행 결과:

```text
안녕하세요!
C언어를 공부합니다.
```

`puts()`는 문자열을 출력한 뒤 **자동으로 줄을 바꿉니다.**

따라서 보통 문자열 끝에 `\n`을 따로 넣지 않아도 됩니다.

---

# 표준 입력 함수

## 11. `scanf()`로 숫자를 입력받아 봅시다

이제 사용자가 직접 숫자를 입력하게 해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int age;

    printf("나이를 입력하세요: ");
    scanf("%d", &age);

    printf("입력한 나이는 %d세입니다.\n", age);

    return 0;
}
```

실행하면 프로그램이 입력을 기다립니다.

```text
나이를 입력하세요: 25
입력한 나이는 25세입니다.
```

진행 과정을 나누어 보면 다음과 같습니다.

```text
① age라는 정수 변수 준비
② "나이를 입력하세요" 출력
③ 사용자가 25 입력 후 Enter
④ scanf()가 25를 age에 저장
⑤ printf()가 age의 값을 출력
```

---

## 12. `scanf("%d", &age);`를 한 조각씩 봅시다

처음 보면 이 문장이 특히 어렵습니다.

```c
scanf("%d", &age);
```

한꺼번에 외우지 말고 나눠 봅시다.

### `scanf`

입력을 받는 함수의 이름입니다.

### `"%d"`

<strong>정수 하나를 입력받겠다</strong>는 뜻입니다.

### `age`

입력받은 숫자를 저장할 변수입니다.

### `&age`

`age` 변수의 <strong>위치</strong>를 알려 주는 표현입니다.

<img class="lesson-figure" src="/images/week3/scanf-address.svg" alt="사용자가 입력한 값이 &age를 통해 age 변수에 저장되는 개념 그림">
<p class="image-caption">지금은 <code>&amp;age</code>를 “age 상자가 어디 있는지 알려 주는 위치표”라고 생각하면 충분합니다.</p>

::: warning `&`는 아직 깊게 공부하지 않습니다
`&`의 정확한 의미는 나중에 <strong>포인터</strong>를 배울 때 자세히 공부합니다.

지금은 `scanf()`로 일반 숫자 변수에 값을 받을 때 <strong>변수 이름 앞에 <code>&</code>를 붙인다</strong>고 익혀도 충분합니다.
:::

---

## 13. 출력의 `%f`와 입력의 `%lf`는 다릅니다

여기에서 초보자가 많이 헷갈리는 부분이 하나 있습니다.

`double` 변수를 <strong>출력</strong>할 때는 `%f`를 사용했습니다.

```c
printf("%f\n", height);
```

하지만 `double` 변수에 값을 <strong>입력</strong>받을 때는 `%lf`를 사용합니다.

```c
scanf("%lf", &height);
```

다음 표를 기억해 둡시다.

| 자료형 | `printf()` 출력 | `scanf()` 입력 |
| --- | --- | --- |
| `int` | `%d` | `%d` |
| `float` | `%f` | `%f` |
| `double` | `%f` | `%lf` |
| `char` | `%c` | `%c` |

<div class="big-check">
<strong>double 출력:</strong> <code>%f</code><br><br>
<strong>double 입력:</strong> <code>%lf</code>
</div>

### 실수 입력 실습

```c
#include <stdio.h>

int main(void)
{
    double height;

    printf("키를 입력하세요: ");
    scanf("%lf", &height);

    printf("입력한 키는 %.1fcm입니다.\n", height);

    return 0;
}
```

예:

```text
키를 입력하세요: 172.5
입력한 키는 172.5cm입니다.
```

---

## 14. 숫자 두 개를 한 번에 입력받기

`scanf()` 하나로 여러 값을 받을 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    int first;
    int second;

    printf("숫자 두 개를 입력하세요: ");
    scanf("%d %d", &first, &second);

    printf("첫 번째 숫자: %d\n", first);
    printf("두 번째 숫자: %d\n", second);

    return 0;
}
```

실행할 때 다음처럼 숫자 사이에 공백을 넣습니다.

```text
숫자 두 개를 입력하세요: 10 20
첫 번째 숫자: 10
두 번째 숫자: 20
```

서식 지정자와 변수의 순서를 맞춰야 합니다.

```text
"%d %d", &first, &second
 ①  ②       ①       ②
```

---

## 15. 입력받은 값으로 간단히 계산하기

아직 연산자를 본격적으로 배우기 전이지만, 더하기 정도는 이미 사용해 봤습니다.

```c
#include <stdio.h>

int main(void)
{
    int first;
    int second;
    int result;

    printf("첫 번째 숫자: ");
    scanf("%d", &first);

    printf("두 번째 숫자: ");
    scanf("%d", &second);

    result = first + second;

    printf("두 수의 합은 %d입니다.\n", result);

    return 0;
}
```

예를 들어 `10`과 `20`을 입력하면 다음처럼 나옵니다.

```text
첫 번째 숫자: 10
두 번째 숫자: 20
두 수의 합은 30입니다.
```

이제 프로그램이 단순히 정해진 답을 보여 주는 것이 아니라, **사람이 입력한 값에 따라 결과가 달라집니다.**

---

## 16. `getchar()`로 문자 한 글자 입력받기

문자 하나를 입력받는 간단한 함수로 `getchar()`가 있습니다.

```c
#include <stdio.h>

int main(void)
{
    int ch;

    printf("문자 하나를 입력하세요: ");
    ch = getchar();

    printf("입력한 문자: ");
    putchar(ch);
    putchar('\n');

    return 0;
}
```

예:

```text
문자 하나를 입력하세요: A
입력한 문자: A
```

여기서는 `getchar()`가 읽은 값을 `ch`라는 변수에 넣었습니다.

::: info 왜 `char`가 아니라 `int`인가요?
`getchar()`는 문자뿐 아니라 **입력 끝(EOF)** 같은 특별한 값도 표현해야 해서 반환값을 `int`로 받는 것이 올바른 사용법입니다.

지금은 코드 모양을 익혀 두고, 자세한 이유는 뒤에서 다시 만나도 됩니다.
:::

---

## 17. 문자열 한 줄을 입력받을 때

여러 글자로 된 이름이나 문장을 입력받을 때는 뒤에서 배열을 배운 후 훨씬 자연스럽게 이해할 수 있습니다.

예고만 간단히 보겠습니다.

```c
char name[50];
```

이런 공간을 만든 뒤 `fgets()`를 사용하면 한 줄을 입력받을 수 있습니다.

```c
fgets(name, sizeof(name), stdin);
```

지금은 이 코드를 외울 필요가 없습니다.

### 교재나 오래된 예제에서 `gets()`를 만난다면

오래된 C 교재나 예제에서는 다음 함수를 볼 수도 있습니다.

```c
gets(name);
```

하지만 `gets()`는 입력 공간의 크기를 확인하지 않아 위험하기 때문에 <strong>현재 C 표준에서는 제거된 함수</strong>입니다.

이 스터디에서는 `gets()`를 새 코드에 사용하지 않고, 나중에 문자열을 배울 때 `fgets()`를 사용합니다.

---

## 18. Visual Studio에서 `scanf` 경고가 나온다면

Visual Studio에서 표준 C 함수인 `scanf()`를 사용하면 환경이나 설정에 따라 다음과 비슷한 메시지를 볼 수 있습니다.

```text
'scanf': This function or variable may be unsafe.
Consider using scanf_s instead.
```

이것은 <strong>Microsoft Visual Studio가 자체적으로 더 안전한 함수인 <code>scanf_s()</code> 사용을 권하는 안내</strong>입니다.

교재에서는 표준 C 함수인 `scanf()`를 배우므로 이 스터디의 기본 설명도 `scanf()`를 기준으로 합니다.

### 실습 중 C4996 때문에 진행하기 어렵다면

소스 코드 **가장 위**, `#include`보다 앞에 다음 한 줄을 추가할 수 있습니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
```

전체 예:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main(void)
{
    int age;

    printf("나이를 입력하세요: ");
    scanf("%d", &age);

    printf("나이: %d세\n", age);
    return 0;
}
```

지난 주에 배운 `#define`이 실제로 사용되는 예이기도 합니다.

::: tip 시험과 실습을 구분해서 생각하세요
교재의 C 문법을 공부할 때는 <strong>표준 함수 <code>scanf()</code>의 사용법</strong>을 이해하는 것이 중요합니다.

Visual Studio의 `scanf_s()`는 Microsoft 환경에서 제공하는 보안 강화 함수이므로 필요할 때 별도로 익히면 됩니다.
:::

---

## 19. 입력할 때 자주 하는 실수

### 실수 1 · `&`를 빼먹음

잘못된 예:

```c
int age;
scanf("%d", age);
```

올바른 예:

```c
int age;
scanf("%d", &age);
```

### 실수 2 · 자료형과 서식 지정자가 맞지 않음

```c
int age;
scanf("%f", &age);   // 잘못된 조합
```

`age`는 `int`이므로 `%d`를 사용해야 합니다.

```c
scanf("%d", &age);
```

### 실수 3 · `double` 입력에 `%f`를 사용함

잘못된 예:

```c
double height;
scanf("%f", &height);
```

올바른 예:

```c
double height;
scanf("%lf", &height);
```

### 실수 4 · 숫자를 입력해야 하는데 글자를 입력함

```text
나이를 입력하세요: 스물다섯
```

`%d`는 정수를 읽으려고 기다리고 있으므로 이런 입력은 정상적으로 변환되지 않습니다.

처음 실습할 때는 화면에서 요구하는 자료형에 맞게 입력합니다.

---

## 20. 실습 · 내 정보 입력받기

아래 코드를 복사해서 실행해 봅시다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main(void)
{
    int age;
    double height;
    char grade;

    printf("나이를 입력하세요: ");
    scanf("%d", &age);

    printf("키를 입력하세요(cm): ");
    scanf("%lf", &height);

    printf("등급 한 글자를 입력하세요(A~F): ");
    scanf(" %c", &grade);

    printf("\n--- 입력 결과 ---\n");
    printf("나이: %d세\n", age);
    printf("키: %.1fcm\n", height);
    printf("등급: %c\n", grade);

    return 0;
}
```

예:

```text
나이를 입력하세요: 45
키를 입력하세요(cm): 168.5
등급 한 글자를 입력하세요(A~F): B

--- 입력 결과 ---
나이: 45세
키: 168.5cm
등급: B
```

### 그런데 `%c` 앞에 왜 공백이 있나요?

이 부분입니다.

```c
scanf(" %c", &grade);
```

`%c`는 Enter를 눌렀을 때 남은 **줄 바꿈 문자까지 문자 하나로 읽을 수 있습니다.**

앞에 공백을 넣으면 먼저 남아 있는 공백이나 줄 바꿈을 건너뛰고 실제 문자를 읽게 할 수 있습니다.

```text
"%c"   → 바로 다음 문자 하나를 읽음
" %c"  → 앞의 공백/줄 바꿈을 건너뛴 뒤 문자 하나를 읽음
```

처음에는 여러 입력 뒤에 문자 한 글자를 받을 때 <strong><code>" %c"</code>처럼 앞에 공백을 넣는다</strong>고 기억해도 좋습니다.

---

## 21. 일부러 틀려 보고 고쳐 봅시다

### 문제 1

아래 코드는 어디가 잘못되었을까요?

```c
int age;
scanf("%d", age);
```

<details>
<summary><strong>정답 보기</strong></summary>

`age` 앞에 `&`가 빠졌습니다.

```c
scanf("%d", &age);
```

</details>

### 문제 2

```c
double weight;
scanf("%f", &weight);
```

<details>
<summary><strong>정답 보기</strong></summary>

`weight`는 `double`이므로 `scanf()`에서는 `%lf`를 사용합니다.

```c
scanf("%lf", &weight);
```

</details>

### 문제 3

```c
int score = 90;
printf("점수는 %f점입니다.\n", score);
```

<details>
<summary><strong>정답 보기</strong></summary>

`score`는 `int`이므로 `%d`를 사용해야 합니다.

```c
printf("점수는 %d점입니다.\n", score);
```

</details>

---

## 22. 오늘 배운 내용 확인하기

### 1번

사람이 키보드로 값을 넣는 것은 입력일까요, 출력일까요?

<details>
<summary><strong>정답 보기</strong></summary>
입력입니다.
</details>

### 2번

화면에 여러 형태의 값을 출력할 때 사용하는 대표적인 함수는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>
`printf()`입니다.
</details>

### 3번

정수형 `int` 값을 `scanf()`로 입력받을 때 사용하는 서식 지정자는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>
`%d`입니다.
</details>

### 4번

다음 코드에서 `&age`는 처음에 어떻게 이해하면 좋을까요?

```c
scanf("%d", &age);
```

<details>
<summary><strong>정답 보기</strong></summary>
`age` 변수가 있는 위치를 `scanf()`에게 알려 주는 표현이라고 이해하면 됩니다.
</details>

### 5번

`double height`에 실수를 입력받을 때 올바른 코드는 무엇일까요?

- A. `scanf("%d", &height);`
- B. `scanf("%f", &height);`
- C. `scanf("%lf", &height);`

<details>
<summary><strong>정답 보기</strong></summary>
C입니다.

```c
scanf("%lf", &height);
```

</details>

### 6번

문자 한 글자를 출력하는 함수는 무엇인가요?

<details>
<summary><strong>정답 보기</strong></summary>
`putchar()`입니다.
</details>

---

## 23. 이번 주 핵심 요약

오늘 내용을 모두 외울 필요는 없습니다.

아래 내용만 다시 읽어 봅니다.

<div class="big-check">
<strong>① 함수</strong>는 특정 일을 하도록 미리 만들어 둔 기능입니다.<br><br>
<strong>② printf()</strong>는 화면에 값을 출력합니다.<br><br>
<strong>③ scanf()</strong>는 키보드 입력을 변수에 저장합니다.<br><br>
<strong>④ 서식 지정자</strong>는 값의 종류에 맞춰 사용합니다. int는 <code>%d</code>, double 입력은 <code>%lf</code>를 사용합니다.<br><br>
<strong>⑤ &amp;age</strong>는 지금 단계에서는 “age 변수의 위치를 알려 준다”라고 이해하면 충분합니다.<br><br>
<strong>⑥ getchar()/putchar()</strong>는 문자 한 글자의 입력과 출력에 사용할 수 있습니다.
</div>

### 다음 시간 예고

4주차에는 값을 계산하고 비교하는 <strong>연산자</strong>를 배웁니다.

- 산술 연산자 `+`, `-`, `*`, `/`, `%`
- 관계 연산자 `>`, `<`, `==`
- 논리 연산자 `&&`, `||`, `!`
- 대입 연산자
- 조건 연산자
- 비트 연산자

이번 주에 입력받은 숫자를 다음 주부터 훨씬 다양하게 계산해 볼 수 있습니다.

---

### 참고

- [Microsoft Learn · scanf 함수](https://learn.microsoft.com/ko-kr/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l)
- [Microsoft Learn · scanf_s 함수](https://learn.microsoft.com/ko-kr/cpp/c-runtime-library/reference/scanf-s-scanf-s-l-wscanf-s-wscanf-s-l)
