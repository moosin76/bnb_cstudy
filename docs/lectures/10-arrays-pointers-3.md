# 10주차 · 배열과 포인터(3)

지난 시간에는 포인터가 <strong>주소를 저장하는 변수</strong>라는 것을 배웠습니다.

이번 시간에는 8주차의 배열과 9주차의 포인터를 서로 연결합니다.

처음 보면 `arr`, `&arr[0]`, `p`, `*p`, `p + 1`처럼 비슷한 표현이 한꺼번에 등장해서 어렵게 느껴질 수 있습니다.

하지만 오늘의 핵심은 하나입니다.

<div class="big-check">
<strong>배열은 메모리에 연속해서 놓이고, 포인터는 그 배열의 각 칸을 주소를 따라 찾아갈 수 있습니다.</strong>
</div>

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 배열 이름을 첫 번째 원소의 주소처럼 사용할 수 있다는 것
2. `arr[i]`와 `*(arr + i)`가 같은 원소를 나타낸다는 것
3. 포인터에 1을 더하면 같은 자료형의 다음 원소로 이동한다는 것
4. 배열을 함수에 전달했을 때 원본 배열이 바뀔 수 있는 이유
5. 포인터 배열이 무엇인지
6. 이중 포인터 `**`가 무엇인지 아주 기본적인 구조
:::

---

## 1. 지난 시간의 포인터를 30초만 복습합시다

```c
int a = 10;
int *p = &a;
```

이 상태에서는 다음과 같습니다.

```text
a   → 10
&a  → a의 주소
p   → a의 주소
*p  → 10
```

즉 `p`는 `a`가 있는 위치를 알고 있습니다.

이번 시간에는 이 포인터가 <strong>배열의 여러 칸을 어떻게 찾아가는지</strong> 살펴봅니다.

---

## 2. 배열은 메모리에 나란히 놓입니다

다음 배열을 봅시다.

```c
int scores[4] = {70, 80, 90, 100};
```

우리는 8주차에서 다음처럼 생각했습니다.

```text
scores[0]  scores[1]  scores[2]  scores[3]
   70         80         90         100
```

중요한 점은 이 네 칸이 메모리에서 <strong>연속해서 나란히 놓인다</strong>는 것입니다.

그래서 첫 번째 칸의 위치를 알고 있다면 다음 칸도 찾아갈 수 있습니다.

---

## 3. 배열 이름은 첫 번째 원소의 주소처럼 사용할 수 있습니다

다음 코드를 봅시다.

```c
int scores[4] = {70, 80, 90, 100};
int *p = scores;
```

여기서는 `&scores[0]`을 쓰지 않고 그냥 `scores`를 넣었습니다.

배열 이름 `scores`는 대부분의 식에서 <strong>첫 번째 원소의 주소처럼 사용</strong>됩니다.

즉 다음 두 문장은 같은 첫 번째 원소를 가리킵니다.

```c
int *p = scores;
```

```c
int *p = &scores[0];
```

![배열 이름과 첫 번째 원소의 주소](/images/week10/array-pointer.svg)

<div class="big-check">
<strong>배열 이름 scores → 첫 번째 원소 scores[0]의 주소처럼 사용할 수 있음</strong>
</div>

::: info 정확히 말하면
배열 이름 자체가 포인터 변수인 것은 아닙니다.

하지만 대부분의 표현식에서 첫 번째 원소를 가리키는 포인터로 변환되어 사용됩니다.

처음 배우는 단계에서는 우선 <strong>"배열 이름은 첫 번째 칸의 주소처럼 사용할 수 있다"</strong>고 이해하면 충분합니다.
:::

---

## 4. 실제 주소를 출력해 확인해 봅시다

```c
#include <stdio.h>

int main(void)
{
    int scores[4] = {70, 80, 90, 100};

    printf("scores      = %p\n", (void *)scores);
    printf("&scores[0]  = %p\n", (void *)&scores[0]);

    return 0;
}
```

두 주소가 같게 나오는 것을 확인할 수 있습니다.

주소 숫자 자체는 컴퓨터마다 달라집니다.

중요한 것은 <strong>두 값이 같은 위치를 가리킨다</strong>는 점입니다.

---

## 5. 포인터로 배열의 첫 번째 값을 읽기

```c
#include <stdio.h>

int main(void)
{
    int scores[4] = {70, 80, 90, 100};
    int *p = scores;

    printf("%d\n", *p);

    return 0;
}
```

실행 결과:

```text
70
```

`p`는 `scores[0]`을 가리키므로:

```c
*p
```

는 결국:

```c
scores[0]
```

과 같은 값을 읽습니다.

---

## 6. `p + 1`은 무엇일까요?

이제 가장 중요한 부분입니다.

```c
p + 1
```

포인터에 1을 더하면 주소 숫자에 단순히 1바이트를 더하는 것이 아닙니다.

`p`가 `int`를 가리키고 있다면 <strong>다음 int 원소</strong>로 이동합니다.

![포인터 연산으로 다음 배열 칸으로 이동](/images/week10/pointer-move.svg)

쉽게 읽으면 다음과 같습니다.

```text
p       → 첫 번째 칸
p + 1   → 두 번째 칸
p + 2   → 세 번째 칸
```

---

## 7. 왜 자료형이 중요할까요?

포인터를 선언할 때 자료형을 적었습니다.

```c
int *p;
double *q;
char *r;
```

컴퓨터는 이 자료형을 보고 <strong>한 칸이 얼마나 큰지</strong> 판단합니다.

예를 들어 흔한 환경에서 `int`가 4바이트라면:

```text
int 포인터 p + 1
```

은 실제 주소가 다음 `int`가 있는 위치로 이동합니다.

반대로 `char`는 보통 1바이트이므로 `char *`는 한 글자 단위로 이동합니다.

::: warning 주소 숫자를 직접 계산하지 마세요
포인터 연산은 C가 자료형의 크기를 알아서 반영합니다.

초보 단계에서는 <strong>"+1 = 다음 같은 자료형의 칸"</strong>으로 이해하는 것이 가장 좋습니다.
:::

---

## 8. `*(p + 1)`로 다음 값을 읽을 수 있습니다

```c
#include <stdio.h>

int main(void)
{
    int arr[3] = {10, 20, 30};
    int *p = arr;

    printf("%d\n", *p);
    printf("%d\n", *(p + 1));
    printf("%d\n", *(p + 2));

    return 0;
}
```

실행 결과:

```text
10
20
30
```

표로 비교해 봅시다.

| 배열 표현 | 포인터 표현 | 값 |
| --- | --- | ---: |
| `arr[0]` | `*(arr + 0)` | 10 |
| `arr[1]` | `*(arr + 1)` | 20 |
| `arr[2]` | `*(arr + 2)` | 30 |

<div class="big-check">
<strong>arr[i] 와 *(arr + i)는 같은 배열 원소를 나타냅니다.</strong>
</div>

---

## 9. 왜 `arr[i]`가 더 많이 사용될까요?

다음 두 코드는 같은 원소를 읽습니다.

```c
arr[2]
```

```c
*(arr + 2)
```

대부분의 경우 `arr[2]`가 훨씬 읽기 쉽습니다.

그렇다면 왜 포인터 표현을 배울까요?

배열이 메모리와 어떻게 연결되는지 이해할 수 있고, 앞으로 함수·문자열·동적 메모리를 이해할 때 꼭 필요하기 때문입니다.

즉 실무 코드에서는 쉬운 표현을 쓰되 <strong>그 아래에서 주소가 어떻게 움직이는지 이해하는 것</strong>이 오늘의 목표입니다.

---

## 10. `p++`로 다음 칸으로 이동하기

다음 코드를 실행해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int arr[3] = {10, 20, 30};
    int *p = arr;

    printf("%d\n", *p);

    p++;
    printf("%d\n", *p);

    p++;
    printf("%d\n", *p);

    return 0;
}
```

실행 결과:

```text
10
20
30
```

`p++`가 실행될 때마다 다음 배열 원소로 이동한 것입니다.

---

## 11. 반복문과 포인터를 함께 사용하기

```c
#include <stdio.h>

int main(void)
{
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    for (int i = 0; i < 5; i++)
    {
        printf("%d\n", *(p + i));
    }

    return 0;
}
```

실행 결과:

```text
10
20
30
40
50
```

8주차에서는 이렇게 썼습니다.

```c
arr[i]
```

이번에는 같은 위치를 이렇게 찾아갑니다.

```c
*(p + i)
```

두 표현을 직접 비교해 보는 것이 중요합니다.

---

## 12. 직접 실습 · 같은 값을 두 방식으로 출력하기

다음 코드를 복사해서 실행해 보세요.

```c
#include <stdio.h>

int main(void)
{
    int arr[4] = {5, 10, 15, 20};

    for (int i = 0; i < 4; i++)
    {
        printf("arr[%d] = %d, 포인터 방식 = %d\n",
               i, arr[i], *(arr + i));
    }

    return 0;
}
```

실행 후 아래를 바꿔 보세요.

```c
int arr[4] = {100, 200, 300, 400};
```

두 방식의 출력값이 항상 같은지 확인합니다.

---

## 13. 포인터로 배열의 값을 바꿀 수도 있습니다

```c
#include <stdio.h>

int main(void)
{
    int arr[3] = {10, 20, 30};
    int *p = arr;

    *(p + 1) = 200;

    printf("%d %d %d\n", arr[0], arr[1], arr[2]);

    return 0;
}
```

실행 결과:

```text
10 200 30
```

`p + 1`은 두 번째 원소를 가리키고 있습니다.

따라서:

```c
*(p + 1) = 200;
```

은 다음과 같은 효과입니다.

```c
arr[1] = 200;
```

---

## 14. 이제 배열을 함수에 보내 봅시다

다음 프로그램을 실행해 보세요.

```c
#include <stdio.h>

void changeFirst(int arr[])
{
    arr[0] = 999;
}

int main(void)
{
    int numbers[3] = {10, 20, 30};

    changeFirst(numbers);

    printf("%d\n", numbers[0]);

    return 0;
}
```

실행 결과:

```text
999
```

여기서 처음 배우는 학생들이 많이 혼란스러워합니다.

7주차에서는 <strong>함수에 값을 보내면 복사본이 전달된다</strong>고 배웠기 때문입니다.

그런데 왜 원본 배열의 값이 바뀌었을까요?

---

## 15. 값 복사 규칙은 여전히 맞습니다

함수에 전달되는 것은 여전히 복사입니다.

다만 배열 이름을 함수 인수로 사용할 때는 <strong>첫 번째 원소를 가리키는 주소가 전달</strong>됩니다.

즉 주소가 복사됩니다.

![함수에 배열 주소가 전달되는 모습](/images/week10/array-function.svg)

두 주소값은 별개의 변수에 들어가지만, <strong>둘 다 같은 원본 배열을 가리킵니다.</strong>

그래서 함수 안에서 그 주소를 따라가 값을 변경하면 원본 배열이 바뀝니다.

<div class="big-check">
<strong>함수에 배열 전체가 복사되는 것이 아니라, 배열의 첫 원소를 가리키는 주소가 전달됩니다.</strong>
</div>

---

## 16. 배열 매개변수의 두 가지 표기

다음 함수 선언을 봅시다.

```c
void printArray(int arr[], int size)
```

함수의 매개변수에서는 다음처럼 적어도 같은 의미로 사용할 수 있습니다.

```c
void printArray(int *arr, int size)
```

즉 함수 매개변수 자리에서:

```c
int arr[]
```

는 배열 전체를 통째로 받는 것이 아니라, 첫 원소를 가리키는 포인터처럼 다뤄집니다.

초보 단계에서는 첫 번째 표기인 `int arr[]`가 배열을 받는 함수라는 사실을 알아보기 쉬우므로 자주 사용하겠습니다.

---

## 17. 배열의 크기도 같이 보내야 합니다

다음 함수를 봅시다.

```c
void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
}
```

왜 `size`가 따로 필요할까요?

함수는 `arr`만 받아서는 배열이 몇 칸인지 자동으로 알 수 없기 때문입니다.

그래서 흔히 다음처럼 호출합니다.

```c
int numbers[5] = {10, 20, 30, 40, 50};
printArray(numbers, 5);
```

---

## 18. 함수로 배열 전체 값을 두 배로 만들기

```c
#include <stdio.h>

void doubleValues(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2;
    }
}

int main(void)
{
    int numbers[5] = {1, 2, 3, 4, 5};

    doubleValues(numbers, 5);

    for (int i = 0; i < 5; i++)
    {
        printf("%d ", numbers[i]);
    }

    return 0;
}
```

실행 결과:

```text
2 4 6 8 10
```

함수 안에서 변경한 값이 `main()`의 배열에도 그대로 남습니다.

---

## 19. `sizeof`와 배열 매개변수는 주의해야 합니다

`main()` 안에서 실제 배열에 `sizeof`를 사용하면 배열 전체 크기를 구할 수 있습니다.

```c
int arr[5];
printf("%zu\n", sizeof(arr));
```

하지만 함수 매개변수의 `arr[]`는 실제로 포인터처럼 전달되므로 다음 방법으로 원소 개수를 구하면 안 됩니다.

```c
void test(int arr[])
{
    int count = sizeof(arr) / sizeof(arr[0]);   // 원하는 배열 길이가 아님
}
```

그래서 배열을 함수에 보낼 때 <strong>길이를 별도 매개변수로 함께 전달</strong>하는 습관을 들이는 것이 좋습니다.

---

## 20. 포인터 배열은 무엇인가요?

일반 배열은 보통 값을 여러 개 저장합니다.

```c
int numbers[3] = {10, 20, 30};
```

그렇다면 <strong>주소를 여러 개 저장하는 배열</strong>도 만들 수 있을까요?

가능합니다.

그것을 포인터 배열이라고 합니다.

```c
int *ptrs[3];
```

읽으면:

> `ptrs`는 int 포인터를 3개 저장하는 배열

입니다.

![포인터 배열의 구조](/images/week10/pointer-array.svg)

---

## 21. 정수 변수 세 개를 포인터 배열로 가리키기

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int b = 20;
    int c = 30;

    int *ptrs[3] = {&a, &b, &c};

    printf("%d\n", *ptrs[0]);
    printf("%d\n", *ptrs[1]);
    printf("%d\n", *ptrs[2]);

    return 0;
}
```

실행 결과:

```text
10
20
30
```

`ptrs[0]` 안에는 `a`의 주소가 있습니다.

따라서:

```c
*ptrs[0]
```

은 `a`의 실제 값을 읽습니다.

---

## 22. 문자열 목록에서 포인터 배열을 많이 볼 수 있습니다

다음 예제를 봅시다.

```c
#include <stdio.h>

int main(void)
{
    const char *names[3] = {
        "철수",
        "영희",
        "민수"
    };

    for (int i = 0; i < 3; i++)
    {
        printf("%s\n", names[i]);
    }

    return 0;
}
```

실행 결과:

```text
철수
영희
민수
```

각 `names[i]`는 문자열이 있는 위치를 가리킵니다.

지금은 `const`의 세부 규칙까지 외울 필요는 없습니다.

문자열 리터럴을 가리킬 때 실수로 내용을 변경하지 않도록 `const char *`를 사용한다고 알아두면 충분합니다.

---

## 23. 일반 배열과 포인터 배열을 구분합시다

이 둘은 생김새가 비슷합니다.

```c
int numbers[3];
```

```c
int *ptrs[3];
```

차이는 `*`입니다.

| 선언 | 각 칸에 저장되는 것 |
| --- | --- |
| `int numbers[3]` | 정수값 |
| `int *ptrs[3]` | 정수를 가리키는 주소 |

<div class="big-check">
<strong>포인터 배열 = 배열의 각 칸이 포인터인 배열</strong>
</div>

---

## 24. 이중 포인터란 무엇인가요?

이번에는 별표가 두 개인 표현을 살펴봅니다.

```c
int **pp;
```

처음 보면 매우 복잡해 보입니다.

하지만 앞에서 한 단계씩 따라가면 됩니다.

```text
일반 변수 a
↑
포인터 p가 a를 가리킴
↑
이중 포인터 pp가 p를 가리킴
```

즉 <strong>포인터를 가리키는 포인터</strong>가 이중 포인터입니다.

![이중 포인터의 연결 구조](/images/week10/double-pointer.svg)

---

## 25. 이중 포인터를 실제 코드로 봅시다

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;
    int **pp = &p;

    printf("a = %d\n", a);
    printf("*p = %d\n", *p);
    printf("**pp = %d\n", **pp);

    return 0;
}
```

실행 결과:

```text
a = 10
*p = 10
**pp = 10
```

왜 모두 10일까요?

```text
pp → p → a → 10
```

순서로 따라가기 때문입니다.

---

## 26. 별표를 한 번 따라갈 때마다 한 단계 이동합니다

다음 관계를 천천히 봅시다.

```c
int a = 10;
int *p = &a;
int **pp = &p;
```

이 상태에서:

```text
p      = a의 주소
*p     = a의 값

pp     = p의 주소
*pp    = p
**pp   = a의 값
```

처음에는 `**pp`를 한 번에 이해하려 하지 말고 별표를 한 단계씩 따라가면 됩니다.

---

## 27. 이중 포인터로 원본 값을 바꿔 보기

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;
    int **pp = &p;

    **pp = 500;

    printf("a = %d\n", a);

    return 0;
}
```

실행 결과:

```text
a = 500
```

`**pp`가 결국 `a`의 실제 값에 도착하기 때문입니다.

---

## 28. 이중 포인터는 왜 필요할까요?

지금 당장 복잡한 활용까지 알 필요는 없습니다.

앞으로 다음과 같은 상황에서 등장할 수 있습니다.

```text
포인터 변수 자체를 함수에서 바꾸고 싶을 때
문자열 목록을 다룰 때
동적 메모리 구조를 다룰 때
여러 단계로 연결된 자료구조를 다룰 때
```

이번 주에는 <strong>구조를 보고 따라갈 수 있는 것</strong>이 목표입니다.

---

## 29. 포인터 연산에서 넘어가면 안 되는 경계

다음 배열이 있다고 합시다.

```c
int arr[3] = {10, 20, 30};
```

다음은 배열 안의 원소를 가리킵니다.

```c
arr
arr + 1
arr + 2
```

하지만 배열 범위를 벗어난 위치의 값을 마음대로 읽으면 안 됩니다.

```c
printf("%d\n", *(arr + 100));   // 잘못된 접근
```

이런 코드는 실행 결과를 믿을 수 없고 프로그램이 잘못 동작할 수 있습니다.

<div class="big-check">
<strong>포인터는 강력하지만 반드시 자신이 가리켜도 되는 메모리 범위 안에서 사용해야 합니다.</strong>
</div>

---

## 30. 일부러 틀려 봅시다 · 포인터를 배열 밖으로 이동

```c
int arr[3] = {10, 20, 30};
int *p = arr;

p = p + 5;
printf("%d\n", *p);
```

무엇이 문제일까요?

<details>
<summary>정답 보기</summary>

`arr`에는 3개의 원소만 있습니다.

`p + 5`가 가리키는 위치의 값을 읽을 권한이 있다는 보장이 없습니다.

배열 안에서는 `arr[0]`, `arr[1]`, `arr[2]`에 해당하는 위치만 사용해야 합니다.

</details>

---

## 31. 일부러 틀려 봅시다 · 함수 안에서 배열 길이 계산

```c
void printArray(int arr[])
{
    int count = sizeof(arr) / sizeof(arr[0]);
}
```

왜 문제가 될까요?

<details>
<summary>정답 보기</summary>

함수 매개변수의 `arr[]`는 포인터처럼 전달됩니다.

따라서 `sizeof(arr)`는 원래 배열 전체의 크기를 알려주지 않습니다.

길이를 따로 받는 방식이 안전합니다.

```c
void printArray(int arr[], int size)
```

</details>

---

## 32. 일부러 틀려 봅시다 · 포인터 배열과 이중 포인터 혼동

다음 선언을 비교해 봅시다.

```c
int *ptrs[3];
```

```c
int **pp;
```

같은 뜻일까요?

<details>
<summary>정답 보기</summary>

같지 않습니다.

`int *ptrs[3]`는 <strong>포인터 3개가 들어 있는 배열</strong>입니다.

`int **pp`는 <strong>int 포인터 하나를 가리킬 수 있는 포인터 변수</strong>입니다.

둘 다 포인터와 관련되어 있지만 자료의 구조가 다릅니다.

</details>

---

## 33. 종합 실습 · 배열을 함수에서 수정하기

```c
#include <stdio.h>

void addTen(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] += 10;
    }
}

void printArray(const int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }

    printf("\n");
}

int main(void)
{
    int scores[5] = {60, 70, 80, 90, 100};

    printf("변경 전: ");
    printArray(scores, 5);

    addTen(scores, 5);

    printf("변경 후: ");
    printArray(scores, 5);

    return 0;
}
```

실행 결과:

```text
변경 전: 60 70 80 90 100
변경 후: 70 80 90 100 110
```

### 직접 바꿔 보기

먼저 다음 부분을 바꿔 보세요.

```c
arr[i] += 10;
```

다음처럼 변경합니다.

```c
arr[i] *= 2;
```

실행 결과가 어떻게 달라지는지 확인하세요.

---

## 34. 오늘 배운 내용 확인하기

### 문제 1

다음 배열에서 `*(arr + 1)`의 값은 무엇인가요?

```c
int arr[3] = {10, 20, 30};
```

<details><summary>정답 보기</summary>

정답은 <strong>20</strong>입니다.

`arr + 1`은 두 번째 원소를 가리킵니다.

</details>

### 문제 2

`arr[2]`와 같은 원소를 나타내는 표현은 무엇인가요?

1. `*arr + 2`
2. `*(arr + 2)`
3. `&arr + 2`
4. `arr * 2`

<details><summary>정답 보기</summary>

정답은 <strong>2번 `*(arr + 2)`</strong>입니다.

괄호 위치에 주의하세요.

</details>

### 문제 3

다음 선언의 뜻은 무엇인가요?

```c
int *ptrs[3];
```

<details><summary>정답 보기</summary>

`int`를 가리키는 포인터 3개를 저장하는 배열입니다.

</details>

### 문제 4

다음 코드에서 `**pp`의 값은 무엇인가요?

```c
int a = 50;
int *p = &a;
int **pp = &p;
```

<details><summary>정답 보기</summary>

정답은 <strong>50</strong>입니다.

`pp → p → a` 순서로 두 번 따라가면 a의 값에 도착합니다.

</details>

### 문제 5

배열을 함수에 전달할 때 배열 길이를 함께 전달하는 이유는 무엇인가요?

<details><summary>정답 보기</summary>

함수의 배열 매개변수는 포인터처럼 전달되므로 함수 안에서는 원래 배열이 몇 칸인지 자동으로 알 수 없기 때문입니다.

</details>

---

## 35. 이번 주 핵심 요약

<div class="big-check">
<strong>배열과 포인터의 핵심 관계</strong><br><br>
<code>arr</code> → 첫 번째 원소 주소처럼 사용<br>
<code>*arr</code> → 첫 번째 원소의 값<br>
<code>arr + 1</code> → 두 번째 원소의 위치<br>
<code>*(arr + i)</code> → <code>arr[i]</code>와 같은 원소
</div>

함수에 배열을 전달하면 <strong>첫 원소를 가리키는 주소가 전달</strong>되기 때문에 함수 안에서 원본 배열을 수정할 수 있습니다.

또한:

```c
int *ptrs[3];
```

는 포인터 배열,

```c
int **pp;
```

는 포인터를 가리키는 이중 포인터입니다.

오늘 모든 문법을 외우기보다 다음 그림을 머릿속에 그릴 수 있으면 충분합니다.

```text
배열의 첫 칸 → 다음 칸 → 다음 칸
      ↑
   포인터가 주소를 따라 이동
```

그리고 이중 포인터는:

```text
pp → p → a → 값
```

처럼 한 단계씩 따라갑니다.

---

## 36. 다음 시간 예고

다음 11주차에서는 <strong>구조체와 공용체(1)</strong>를 배웁니다.

지금까지는 같은 종류의 값을 배열로 묶었습니다.

다음 시간에는:

```text
이름 + 나이 + 점수
```

처럼 <strong>서로 다른 종류의 값을 하나의 묶음으로 만드는 구조체</strong>를 배우게 됩니다.
