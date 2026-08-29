# 8주차 · 배열과 포인터(1)

이번 시간에는 <strong>배열(array)</strong>을 배웁니다.

배열은 처음 보면 `[]` 기호 때문에 어렵게 느껴질 수 있습니다. 하지만 핵심은 아주 단순합니다.

<div class="big-check">
<strong>배열 = 같은 종류의 값을 여러 개 저장하도록 상자를 줄지어 만들어 둔 것</strong>
</div>

예를 들어 학생 5명의 점수를 저장한다고 생각해 봅시다.

변수를 하나씩 만들면 이렇게 됩니다.

```c
int score1 = 90;
int score2 = 80;
int score3 = 70;
int score4 = 100;
int score5 = 85;
```

학생이 100명이라면 변수 100개를 만들어야 합니다.

배열을 사용하면 이렇게 한 줄로 묶을 수 있습니다.

```c
int score[5] = {90, 80, 70, 100, 85};
```

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 배열이 왜 필요한지
2. 배열의 번호가 `0`부터 시작한다는 점
3. 반복문으로 배열 전체를 처리하는 방법
4. 2차원 배열을 행과 열로 이해하는 방법
5. 문자 배열과 문자열의 관계
6. 문자열 끝에는 `\0`이라는 특별한 문자가 들어간다는 점
:::

---

## 1. 배열은 같은 종류의 상자를 여러 개 만든 것입니다

다음 배열을 봅시다.

```c
int score[5] = {90, 80, 70, 100, 85};
```

이 코드는 `int`형 상자 5개를 한꺼번에 만든 것입니다.

![score 배열의 인덱스가 0부터 4까지 붙는 모습](/images/week8/array-index.svg){.lesson-figure}

각 상자에는 번호가 붙어 있습니다.

이 번호를 <strong>인덱스(index)</strong>라고 합니다.

첫 번째 상자의 번호가 `1`이 아니라 `0`이라는 점이 가장 중요합니다.

---

## 2. 배열의 번호는 0부터 시작합니다

배열에 상자가 5개 있다면 번호는 다음과 같습니다.

```text
0, 1, 2, 3, 4
```

`1, 2, 3, 4, 5`가 아닙니다.

그래서 첫 번째 값은 다음과 같이 읽습니다.

```c
score[0]
```

두 번째 값은:

```c
score[1]
```

다섯 번째 값은:

```c
score[4]
```

<div class="big-check">
<strong>배열의 첫 번째 칸 = [0]</strong><br><br>
<strong>배열의 마지막 칸 = [배열 크기 - 1]</strong>
</div>

배열 크기가 5라면 마지막 칸은 `5 - 1`, 즉 `[4]`입니다.

### 사람의 순서와 배열 번호를 나란히 봅시다

| 사람이 세는 순서 | 배열 인덱스 |
| ---: | ---: |
| 첫 번째 | `[0]` |
| 두 번째 | `[1]` |
| 세 번째 | `[2]` |
| 네 번째 | `[3]` |
| 다섯 번째 | `[4]` |

처음에는 조금 어색하지만 배열을 쓸 때마다 금방 익숙해집니다.

---

## 3. 배열을 직접 만들어 봅시다

아래 코드를 그대로 복사해서 실행해 보세요.

```c
#include <stdio.h>

int main(void)
{
    int score[5] = {90, 80, 70, 100, 85};

    printf("첫 번째 점수: %d\n", score[0]);
    printf("두 번째 점수: %d\n", score[1]);
    printf("다섯 번째 점수: %d\n", score[4]);

    return 0;
}
```

실행 결과:

```text
첫 번째 점수: 90
두 번째 점수: 80
다섯 번째 점수: 85
```

배열도 변수이므로 값을 바꿀 수 있습니다.

```c
score[2] = 95;
```

`score[2]`는 세 번째 칸입니다.

따라서 원래 `70`이었던 값이 `95`로 바뀝니다.

### 한 부분만 바꿔 보기

첫 번째 점수를 `100`으로 바꿔 보세요.

```c
score[0] = 100;
```

---

## 4. 배열을 선언하는 기본 모양

배열의 기본 모양은 다음과 같습니다.

```text
자료형 배열이름[개수];
```

정수 5개를 저장하려면:

```c
int score[5];
```

실수 3개를 저장하려면:

```c
double height[3];
```

문자 10개를 저장하려면:

```c
char letter[10];
```

`[]` 안의 숫자는 <strong>몇 개의 칸을 만들 것인지</strong>를 나타냅니다.

::: info 배열에는 같은 자료형을 넣습니다
`int` 배열에는 정수, `double` 배열에는 실수, `char` 배열에는 문자를 저장합니다.

서로 다른 종류의 자료를 한꺼번에 묶는 방법은 11주차의 구조체에서 배웁니다.
:::

---

## 5. 배열을 만들면서 값을 넣을 수 있습니다

배열을 만들면서 처음 값을 넣는 것을 <strong>초기화</strong>라고 합니다.

```c
int number[5] = {10, 20, 30, 40, 50};
```

값의 개수를 보고 컴파일러가 배열 크기를 정하게 할 수도 있습니다.

```c
int number[] = {10, 20, 30, 40, 50};
```

이 배열의 크기는 자동으로 5가 됩니다.

일부 값만 넣으면 나머지는 0으로 초기화됩니다.

```c
int number[5] = {10, 20};
```

실제로는 다음과 같습니다.

```text
10, 20, 0, 0, 0
```

모두 0으로 시작하고 싶을 때는 다음 표현을 자주 씁니다.

```c
int number[5] = {0};
```

---

## 6. 배열과 반복문은 아주 잘 어울립니다

배열의 진짜 편리함은 반복문과 함께 사용할 때 나타납니다.

![for문의 i가 배열의 각 칸을 차례대로 선택하는 모습](/images/week8/array-loop.svg){.lesson-figure}

아래 코드를 실행해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int score[5] = {90, 80, 70, 100, 85};

    for (int i = 0; i < 5; i++)
    {
        printf("score[%d] = %d\n", i, score[i]);
    }

    return 0;
}
```

실행 결과:

```text
score[0] = 90
score[1] = 80
score[2] = 70
score[3] = 100
score[4] = 85
```

여기에서 `i`가 배열의 칸 번호 역할을 합니다.

```c
score[i]
```

`i`가 0이면 `score[0]`, 1이면 `score[1]`, 2이면 `score[2]`가 됩니다.

---

## 7. 왜 반복 조건이 `i < 5`인가요?

배열 크기가 5이면 사용할 수 있는 인덱스는 다음뿐입니다.

```text
0  1  2  3  4
```

그래서 반복문은 이렇게 씁니다.

```c
for (int i = 0; i < 5; i++)
```

만약 다음처럼 `<=`를 쓰면 어떻게 될까요?

```c
for (int i = 0; i <= 5; i++)
```

`i`가 마지막에 5가 됩니다.

그러면 존재하지 않는 다음 칸에 접근합니다.

```c
score[5]
```

::: danger 배열 범위를 벗어나면 안 됩니다
C언어는 배열 범위를 항상 자동으로 막아 주지 않습니다.

존재하지 않는 칸을 읽거나 쓰면 이상한 값이 나오거나 프로그램이 비정상적으로 동작할 수 있습니다.
:::

---

## 8. 배열에 값을 입력받아 봅시다

```c
#include <stdio.h>

int main(void)
{
    int number[5];

    for (int i = 0; i < 5; i++)
    {
        printf("%d번째 숫자 입력: ", i + 1);
        scanf("%d", &number[i]);
    }

    printf("입력한 숫자: ");

    for (int i = 0; i < 5; i++)
    {
        printf("%d ", number[i]);
    }

    printf("\n");

    return 0;
}
```

여기에서도 정수를 입력할 때는 값을 저장할 칸의 위치가 필요합니다.

```c
scanf("%d", &number[i]);
```

지금은 다음처럼 이해하면 충분합니다.

<div class="big-check">
<strong>&number[i] = number 배열의 i번째 칸 위치</strong>
</div>

주소와 포인터는 다음 주부터 본격적으로 배웁니다.

---

## 9. 배열의 합계를 구해 봅시다

```c
#include <stdio.h>

int main(void)
{
    int score[5] = {90, 80, 70, 100, 85};
    int sum = 0;

    for (int i = 0; i < 5; i++)
    {
        sum += score[i];
    }

    printf("합계: %d\n", sum);

    return 0;
}
```

실행 결과:

```text
합계: 425
```

반복할 때마다 배열의 값을 하나씩 꺼내 `sum`에 더합니다.

```text
0번째 값 90 더하기
1번째 값 80 더하기
2번째 값 70 더하기
3번째 값 100 더하기
4번째 값 85 더하기
```

---

## 10. 평균을 구해 봅시다

```c
#include <stdio.h>

int main(void)
{
    int score[5] = {90, 80, 70, 100, 85};
    int sum = 0;

    for (int i = 0; i < 5; i++)
    {
        sum += score[i];
    }

    double average = (double)sum / 5;

    printf("평균: %.1f\n", average);

    return 0;
}
```

실행 결과:

```text
평균: 85.0
```

`sum`과 `5`는 정수이므로 실수 나눗셈을 하기 위해 `(double)`을 붙였습니다.

---

## 11. 가장 큰 값을 찾아 봅시다

```c
#include <stdio.h>

int main(void)
{
    int score[5] = {90, 80, 70, 100, 85};
    int max = score[0];

    for (int i = 1; i < 5; i++)
    {
        if (score[i] > max)
        {
            max = score[i];
        }
    }

    printf("가장 높은 점수: %d\n", max);

    return 0;
}
```

처음에는 첫 번째 값을 가장 큰 값이라고 가정합니다.

```c
int max = score[0];
```

그다음 두 번째 값부터 차례대로 비교합니다.

---

## 12. 배열의 원소 개수를 구해 봅시다

배열의 전체 바이트 크기는 `sizeof`로 구할 수 있습니다.

다음 식은 배열 원소 개수를 구할 때 자주 사용합니다.

```c
int count = sizeof(score) / sizeof(score[0]);
```

뜻을 나누어 보면 어렵지 않습니다.

```text
배열 전체 크기 ÷ 한 칸의 크기 = 칸의 개수
```

완전한 예제:

```c
#include <stdio.h>

int main(void)
{
    int score[] = {90, 80, 70, 100, 85};
    int count = (int)(sizeof(score) / sizeof(score[0]));

    printf("원소 개수: %d\n", count);

    for (int i = 0; i < count; i++)
    {
        printf("%d ", score[i]);
    }

    printf("\n");

    return 0;
}
```

::: info 중요한 예고
이 계산법은 지금처럼 배열 자체가 보이는 곳에서는 잘 작동합니다.

배열을 함수의 매개변수로 전달하면 조금 다른 일이 생깁니다. 그 이유를 9~10주차의 포인터에서 다시 설명합니다.
:::

---

## 13. 2차원 배열은 표처럼 생각하면 됩니다

지금까지의 배열은 한 줄이었습니다.

```text
90  80  70  100  85
```

2차원 배열은 <strong>행과 열이 있는 표</strong>처럼 생각하면 쉽습니다.

```c
int score[2][3] = {
    {90, 80, 70},
    {100, 85, 95}
};
```

![2차원 배열의 행과 열](/images/week8/matrix.svg){.lesson-figure}

앞의 번호는 <strong>행</strong>, 뒤의 번호는 <strong>열</strong>입니다.

```c
score[행][열]
```

예를 들어:

```c
score[0][0]
```

첫 번째 행의 첫 번째 열이므로 `90`입니다.

```c
score[1][2]
```

두 번째 행의 세 번째 열이므로 `95`입니다.

여기에서도 행과 열 모두 0부터 시작합니다.

---

## 14. 2차원 배열은 반복문도 두 개 사용합니다

행을 움직이는 반복문과 열을 움직이는 반복문이 필요합니다.

```c
#include <stdio.h>

int main(void)
{
    int score[2][3] = {
        {90, 80, 70},
        {100, 85, 95}
    };

    for (int row = 0; row < 2; row++)
    {
        for (int col = 0; col < 3; col++)
        {
            printf("%d ", score[row][col]);
        }

        printf("\n");
    }

    return 0;
}
```

실행 결과:

```text
90 80 70
100 85 95
```

바깥쪽 반복문은 행을 하나씩 이동합니다.

안쪽 반복문은 그 행 안에서 열을 하나씩 이동합니다.

```text
행 0 → 열 0, 1, 2
행 1 → 열 0, 1, 2
```

---

## 15. 2차원 배열에 값을 입력해 봅시다

```c
#include <stdio.h>

int main(void)
{
    int number[2][3];

    for (int row = 0; row < 2; row++)
    {
        for (int col = 0; col < 3; col++)
        {
            printf("[%d][%d] 값 입력: ", row, col);
            scanf("%d", &number[row][col]);
        }
    }

    printf("\n입력 결과\n");

    for (int row = 0; row < 2; row++)
    {
        for (int col = 0; col < 3; col++)
        {
            printf("%d ", number[row][col]);
        }

        printf("\n");
    }

    return 0;
}
```

입력 위치도 두 개의 인덱스로 지정합니다.

```c
&number[row][col]
```

---

## 16. 문자도 배열에 저장할 수 있습니다

문자 한 개는 `char` 변수에 저장합니다.

```c
char letter = 'A';
```

문자 여러 개는 `char` 배열에 저장할 수 있습니다.

```c
char word[4] = {'C', 'A', 'T', '\0'};
```

마지막 `\0`은 특별한 의미가 있습니다.

---

## 17. 문자열은 문자 배열입니다

문자가 여러 개 이어진 것을 <strong>문자열(string)</strong>이라고 합니다.

예를 들면:

```text
Hello
Apple
Tom
```

C언어에서는 문자열을 문자 배열에 저장합니다.

```c
char name[] = "Tom";
```

겉으로 보이는 문자는 세 개입니다.

```text
T  o  m
```

하지만 실제 배열에는 네 칸이 있습니다.

![Tom 문자열 뒤에 널 문자 0이 저장되는 모습](/images/week8/string-null.svg){.lesson-figure}

마지막에는 `\0`이라는 특별한 문자가 자동으로 들어갑니다.

<div class="big-check">
<strong>문자열의 끝에는 \0이 들어갑니다.</strong>
</div>

---

## 18. `\0`은 무엇인가요?

`\0`은 <strong>널 문자(null character)</strong>라고 부릅니다.

화면에 글자로 출력되는 문자가 아닙니다.

컴퓨터에게 다음과 같이 알려 주는 표시라고 생각하면 됩니다.

> 문자열은 여기에서 끝났습니다.

예를 들어:

```c
char name[] = "Tom";
```

메모리에는 다음처럼 저장됩니다.

```text
'T'  'o'  'm'  '\0'
```

`printf("%s", name)`은 `T`부터 차례로 읽다가 `\0`을 만나면 출력을 멈춥니다.

---

## 19. 문자 한 개와 문자열은 다릅니다

문자 한 개에는 작은따옴표를 사용합니다.

```c
char letter = 'A';
```

문자열에는 큰따옴표를 사용합니다.

```c
char word[] = "A";
```

둘은 같은 것이 아닙니다.

| 표현 | 의미 | 실제 필요한 칸 |
| --- | --- | ---: |
| `'A'` | 문자 한 개 | 1칸 |
| `"A"` | 문자열 | 2칸: `'A'`, `'\0'` |

---

## 20. 문자열을 출력해 봅시다

문자열 출력에는 `%s`를 사용합니다.

```c
#include <stdio.h>

int main(void)
{
    char name[] = "Tom";

    printf("이름: %s\n", name);

    return 0;
}
```

실행 결과:

```text
이름: Tom
```

`printf()`는 배열 안의 문자를 읽다가 `\0`을 만나면 멈춥니다.

---

## 21. 문자열을 한 글자씩 읽을 수 있습니다

문자열도 결국 배열이므로 인덱스로 한 글자씩 읽을 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    char name[] = "Tom";

    printf("%c\n", name[0]);
    printf("%c\n", name[1]);
    printf("%c\n", name[2]);

    return 0;
}
```

실행 결과:

```text
T
o
m
```

문자열과 배열이 따로 떨어진 개념이 아니라는 점을 기억하세요.

<div class="big-check">
<strong>문자열 = char 배열 안에 문자들을 저장하고 마지막에 \0을 붙인 것</strong>
</div>

---

## 22. 문자열을 입력받아 봅시다

공백이 없는 짧은 단어는 `%s`로 입력할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    char name[20];

    printf("이름 입력: ");
    scanf("%19s", name);

    printf("안녕하세요, %s님!\n", name);

    return 0;
}
```

여기에서는 `name` 앞에 `&`를 쓰지 않았습니다.

```c
scanf("%19s", name);
```

왜 그런지는 다음 주 포인터에서 정확하게 배우게 됩니다.

지금은 다음 규칙만 기억하면 됩니다.

```text
정수 변수 입력 → &age
문자 배열 %s 입력 → name
```

`%19s`에서 `19`는 너무 긴 입력으로 배열을 넘치게 하지 않도록 최대 길이를 제한하는 역할을 합니다.

---

## 23. `%s` 입력은 공백에서 멈춥니다

다음처럼 입력한다고 생각해 봅시다.

```text
Hong Gil Dong
```

`scanf("%s", name)`은 첫 번째 공백에서 멈춥니다.

따라서 `Hong`까지만 저장됩니다.

공백이 포함된 한 줄은 `fgets()`로 받을 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    char name[50];

    printf("이름 입력: ");
    fgets(name, sizeof(name), stdin);

    printf("입력한 내용: %s", name);

    return 0;
}
```

::: info 지금은 이 차이만 기억하세요
- `scanf("%s", ...)` : 공백을 만나면 입력이 끝남
- `fgets()` : 공백을 포함한 한 줄을 받을 수 있음
:::

---

## 24. 문자열 길이는 `strlen()`으로 구할 수 있습니다

문자열 관련 함수는 `<string.h>`에 많이 들어 있습니다.

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char word[] = "Apple";

    printf("문자열 길이: %zu\n", strlen(word));

    return 0;
}
```

실행 결과:

```text
문자열 길이: 5
```

`strlen()`은 마지막 `\0`을 문자열 길이에 포함하지 않습니다.

---

## 25. `strlen()`과 `sizeof()`는 다릅니다

다음 문자열을 봅시다.

```c
char word[] = "Apple";
```

실제 문자 배열에는 다음 값이 들어 있습니다.

```text
A  p  p  l  e  \0
```

따라서:

```c
strlen(word)
```

결과는 `5`입니다.

```c
sizeof(word)
```

결과는 `6`입니다.

완전한 예제:

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char word[] = "Apple";

    printf("strlen: %zu\n", strlen(word));
    printf("sizeof: %zu\n", sizeof(word));

    return 0;
}
```

<div class="big-check">
<strong>strlen = 실제 문자열 글자 수</strong><br><br>
<strong>sizeof = 배열이 차지하는 전체 크기</strong>
</div>

---

## 26. 문자 배열의 내용을 바꿀 수도 있습니다

```c
#include <stdio.h>

int main(void)
{
    char word[] = "Cat";

    word[0] = 'B';

    printf("%s\n", word);

    return 0;
}
```

실행 결과:

```text
Bat
```

`word[0]`은 첫 번째 문자이므로 `C`가 `B`로 바뀐 것입니다.

---

## 27. 자주 하는 실수 · 배열 번호를 1부터 시작하기

처음 배우는 사람이 가장 많이 하는 실수입니다.

잘못된 생각:

```text
첫 번째 칸 = score[1]
```

올바른 생각:

```text
첫 번째 칸 = score[0]
```

다시 한번 연결해서 기억해 봅시다.

```text
1번째 → [0]
2번째 → [1]
3번째 → [2]
```

---

## 28. 자주 하는 실수 · 배열 범위를 넘기기

다음 배열이 있습니다.

```c
int number[5] = {10, 20, 30, 40, 50};
```

사용 가능한 칸은 다음뿐입니다.

```text
number[0]
number[1]
number[2]
number[3]
number[4]
```

다음은 범위를 벗어납니다.

```c
number[5]
```

C언어는 이것을 항상 친절한 오류로 알려 주지 않기 때문에 특히 조심해야 합니다.

---

## 29. 자주 하는 실수 · 문자열 공간을 너무 작게 만들기

`Hello`를 저장한다고 생각해 봅시다.

보이는 문자는 5개입니다.

하지만 문자열 끝의 `\0`까지 필요하므로 최소 6칸이 필요합니다.

```c
char word[6] = "Hello";
```

크기를 직접 계산하기 어렵다면 컴파일러가 정하도록 생략할 수도 있습니다.

```c
char word[] = "Hello";
```

---

## 30. 실습 · 5명의 점수 합계와 평균

```c
#include <stdio.h>

int main(void)
{
    int score[5];
    int sum = 0;

    for (int i = 0; i < 5; i++)
    {
        printf("%d번 학생 점수: ", i + 1);
        scanf("%d", &score[i]);
        sum += score[i];
    }

    double average = (double)sum / 5;

    printf("합계: %d\n", sum);
    printf("평균: %.1f\n", average);

    return 0;
}
```

### 한 부분씩 바꿔 보기

학생 수를 3명으로 바꿔 보세요.

<details>
<summary>정답 보기</summary>

배열 크기, 반복 횟수, 평균을 나눌 값을 모두 3으로 맞춥니다.

```c
int score[3];

for (int i = 0; i < 3; i++)
{
    ...
}

double average = (double)sum / 3;
```

</details>

---

## 31. 실습 · 이름을 한 글자씩 출력하기

```c
#include <stdio.h>

int main(void)
{
    char name[] = "Tom";

    for (int i = 0; name[i] != '\0'; i++)
    {
        printf("%c\n", name[i]);
    }

    return 0;
}
```

실행 결과:

```text
T
o
m
```

여기에서는 배열 크기를 직접 적지 않고 `\0`을 만날 때까지 반복합니다.

```c
name[i] != '\0'
```

앞에서 설정한 Consolas 글꼴 때문에 `!=`도 실제 입력해야 하는 두 문자 그대로 보입니다.

---

## 32. 일부러 틀려 보고 고쳐 봅시다

### 문제 1 · 잘못된 인덱스

```c
int number[3] = {10, 20, 30};
printf("%d\n", number[3]);
```

무엇이 문제일까요?

<details>
<summary>정답 보기</summary>

배열 크기는 3이지만 인덱스는 `0, 1, 2`까지만 사용할 수 있습니다.

세 번째 값은:

```c
number[2]
```

입니다.

</details>

### 문제 2 · 문자열 공간

```c
char word[5] = "Hello";
```

무엇이 부족할까요?

<details>
<summary>정답 보기</summary>

`Hello`는 5글자이고 마지막 `\0`까지 필요하므로 최소 6칸이 필요합니다.

```c
char word[6] = "Hello";
```

또는:

```c
char word[] = "Hello";
```

처럼 크기를 생략합니다.

</details>

### 문제 3 · 반복 횟수

```c
int number[5] = {10, 20, 30, 40, 50};

for (int i = 0; i <= 5; i++)
{
    printf("%d\n", number[i]);
}
```

<details>
<summary>정답 보기</summary>

조건을 다음처럼 바꿔야 합니다.

```c
for (int i = 0; i < 5; i++)
```

`i <= 5`이면 마지막에 존재하지 않는 `number[5]`까지 접근하게 됩니다.

</details>

---

## 33. 오늘 배운 내용 확인하기

### 문제 1

배열의 첫 번째 칸 인덱스는 무엇인가요?

<details><summary>정답 보기</summary>`0`입니다. 첫 번째 칸은 `array[0]`입니다.</details>

### 문제 2

`int number[5];`에서 마지막으로 사용할 수 있는 인덱스는 무엇인가요?

<details><summary>정답 보기</summary>`4`입니다. 배열 크기 5의 인덱스는 0~4입니다.</details>

### 문제 3

2차원 배열 `score[2][3]`을 쉽게 무엇처럼 생각할 수 있나요?

<details><summary>정답 보기</summary>2행 3열의 표처럼 생각할 수 있습니다.</details>

### 문제 4

C 문자열의 마지막에는 어떤 특별한 문자가 들어가나요?

<details><summary>정답 보기</summary>`\0` 널 문자가 들어갑니다.</details>

### 문제 5

문자 한 개 `'A'`와 문자열 `"A"`는 같은가요?

<details><summary>정답 보기</summary>다릅니다. 문자열 `"A"`에는 `A` 뒤에 `\0`도 들어갑니다.</details>

### 문제 6

`strlen("Apple")`의 결과는 몇인가요?

<details><summary>정답 보기</summary>5입니다. 마지막 `\0`은 문자열 길이에 포함하지 않습니다.</details>

---

## 34. 이번 주 핵심 요약

<div class="big-check">
<strong>① 배열은 같은 자료형의 값을 여러 개 저장합니다.</strong><br><br>
<strong>② 배열 인덱스는 0부터 시작합니다.</strong><br><br>
<strong>③ 배열과 for문을 함께 사용하면 여러 값을 쉽게 처리할 수 있습니다.</strong><br><br>
<strong>④ 2차원 배열은 행과 열이 있는 표처럼 생각하면 쉽습니다.</strong><br><br>
<strong>⑤ 문자열은 char 배열입니다.</strong><br><br>
<strong>⑥ 문자열의 마지막에는 \0이 들어갑니다.</strong>
</div>

이번 주에 모든 문법을 외우는 것보다 더 중요한 것은 <strong>배열의 칸을 머릿속에 그릴 수 있게 되는 것</strong>입니다.

다음 주에는 이 배열이 메모리 어디에 있는지, 그리고 그 위치를 저장하는 <strong>포인터(pointer)</strong>를 배웁니다.

처음에는 포인터가 어렵게 느껴질 수 있으므로 다음 주도 메모리 상자와 화살표 그림을 충분히 사용해서 설명합니다.
