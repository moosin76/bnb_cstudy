# 14주차 · 메모리 동적 할당

지금까지 배열을 만들 때는 보통 크기를 미리 정했습니다.

```c
int scores[5];
```

이 코드는 점수 5개를 저장할 공간을 미리 준비합니다.

그런데 프로그램을 실행하기 전에는 학생이 몇 명인지 모른다면 어떻게 해야 할까요?

```text
학생이 3명일 수도 있고,
100명일 수도 있고,
사용자가 직접 숫자를 입력할 수도 있습니다.
```

이럴 때 필요한 것이 <strong>동적 메모리 할당(dynamic memory allocation)</strong>입니다.

<div class="big-check">
<strong>동적 할당 = 프로그램을 실행하는 도중 필요한 만큼 메모리를 빌리는 것</strong>
</div>

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 왜 동적 메모리가 필요한지
2. `malloc()`으로 메모리를 빌리는 방법
3. `calloc()`과 `malloc()`의 차이
4. `realloc()`으로 크기를 바꾸는 방법
5. `free()`로 메모리를 반납해야 하는 이유
6. 동적 배열을 만들고 사용할 수 있는 방법
7. 구조체도 동적으로 만들 수 있다는 것
8. 메모리 누수와 댕글링 포인터가 왜 위험한지
:::

---

## 1. 고정 배열의 불편한 점부터 생각해 봅시다

다음 배열은 정수 5개를 저장합니다.

```c
int numbers[5];
```

크기가 정확히 5개라면 아무 문제가 없습니다.

하지만 사용자에게 개수를 입력받는 프로그램이라면 이야기가 달라집니다.

```text
몇 개의 점수를 입력하시겠습니까? 3
```

어떤 사람은 3을 입력하고, 어떤 사람은 30을 입력할 수 있습니다.

프로그램을 만들 때 필요한 크기를 미리 알 수 없습니다.

![고정 배열과 동적 메모리 비교](/images/week14/static-dynamic.svg)

동적 할당을 사용하면 실행 중 입력받은 숫자를 보고 그때 필요한 공간을 준비할 수 있습니다.

---

## 2. 메모리를 빌린다는 말은 무슨 뜻일까요?

호텔을 생각해 봅시다.

여행을 가기 전에 호텔 전체를 사지 않습니다.

필요한 기간 동안 방 하나를 빌리고, 사용이 끝나면 돌려줍니다.

동적 메모리도 비슷합니다.

```text
필요한 크기를 계산한다
        ↓
메모리를 빌린다
        ↓
사용한다
        ↓
다 사용하면 반납한다
```

<div class="big-check">
<strong>동적 메모리의 핵심은 “빌리고 반드시 돌려준다”입니다.</strong>
</div>

---

## 3. 스택과 힙을 아주 쉽게 구분해 봅시다

동적 메모리를 배우면 <strong>힙(heap)</strong>이라는 단어가 등장합니다.

지금은 다음 정도로만 이해하면 충분합니다.

| 영역 | 쉬운 설명 |
| --- | --- |
| 스택(Stack) | 함수의 지역변수 등이 주로 놓이는 공간 |
| 힙(Heap) | 프로그램이 실행 중 필요할 때 직접 빌려 쓰는 공간 |

![스택과 힙의 기본 구조](/images/week14/stack-heap.svg)

예를 들어:

```c
int *p;
```

라는 포인터 변수가 있고 `malloc()`으로 공간을 빌리면, `p`에는 힙에서 빌린 공간의 주소가 들어갑니다.

::: info 너무 깊게 외우지 않아도 됩니다
오늘의 핵심은 메모리 구조를 암기하는 것이 아닙니다.

<strong>malloc으로 빌린 공간은 포인터를 통해 사용한다</strong>는 점이 중요합니다.
:::

---

## 4. 동적 할당 함수는 `<stdlib.h>`에 있습니다

`malloc()`, `calloc()`, `realloc()`, `free()`를 사용하려면 다음 헤더를 포함합니다.

```c
#include <stdlib.h>
```

기본 프로그램은 다음처럼 시작할 수 있습니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    return 0;
}
```

---

## 5. `malloc()`은 메모리를 빌리는 함수입니다

가장 먼저 `malloc()`을 봅시다.

이름은 <strong>memory allocation</strong>에서 왔다고 생각하면 됩니다.

기본 형태:

```c
malloc(필요한 바이트 수)
```

예를 들어 정수 5개를 저장할 공간이 필요하다면:

```c
malloc(5 * sizeof(int))
```

이라고 적을 수 있습니다.

`sizeof(int)`는 정수 하나가 차지하는 크기를 구합니다.

---

## 6. 첫 번째 `malloc()` 프로그램

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int *p;

    p = malloc(5 * sizeof(int));

    if (p == NULL)
    {
        printf("메모리를 확보하지 못했습니다.\n");
        return 1;
    }

    p[0] = 10;
    p[1] = 20;
    p[2] = 30;
    p[3] = 40;
    p[4] = 50;

    printf("%d\n", p[2]);

    free(p);

    return 0;
}
```

실행 결과:

```text
30
```

처음 보면 길어 보입니다.

한 조각씩 나누어 보겠습니다.

---

## 7. `malloc()`의 반환값은 주소입니다

이 부분을 봅시다.

```c
p = malloc(5 * sizeof(int));
```

`malloc()`은 확보한 메모리의 <strong>첫 번째 위치 주소</strong>를 돌려줍니다.

그래서 주소를 저장할 포인터가 필요합니다.

```c
int *p;
```

그리고 그 포인터에 주소를 저장합니다.

```c
p = malloc(5 * sizeof(int));
```

9주차 포인터에서 배운 내용이 여기서 다시 사용됩니다.

---

## 8. 안전한 `malloc()` 사용 순서

![malloc 사용 순서](/images/week14/malloc-flow.svg)

코드로 다시 쓰면 다음 흐름입니다.

```c
int *p = malloc(5 * sizeof(int));

if (p == NULL)
{
    return 1;
}

/* p를 사용 */

free(p);
```

<div class="big-check">
<strong>malloc → NULL 확인 → 사용 → free</strong>
</div>

이 순서를 먼저 익히세요.

---

## 9. 왜 `NULL`을 확인해야 할까요?

컴퓨터가 항상 요청한 메모리를 줄 수 있는 것은 아닙니다.

메모리가 부족하면 `malloc()`은 정상적인 주소 대신 `NULL`을 돌려줍니다.

그래서 다음 확인이 필요합니다.

```c
if (p == NULL)
{
    printf("메모리 할당 실패\n");
    return 1;
}
```

`NULL`인데 `p[0]` 같은 코드를 사용하면 프로그램에 문제가 생길 수 있습니다.

---

## 10. C언어에서는 `malloc()` 앞에 형변환을 꼭 붙이지 않아도 됩니다

인터넷 예제에서 이런 코드를 볼 수 있습니다.

```c
int *p = (int *)malloc(5 * sizeof(int));
```

C언어에서는 `malloc()`이 돌려주는 `void *`를 다른 객체 포인터 형식으로 자동 변환할 수 있으므로 보통 다음처럼 써도 됩니다.

```c
int *p = malloc(5 * sizeof(int));
```

이 강의에서는 더 단순한 두 번째 형태를 사용하겠습니다.

::: info C++와 혼동하지 마세요
C++에서는 규칙이 다릅니다.

우리는 지금 <strong>C언어</strong>를 배우고 있습니다.
:::

---

## 11. `sizeof`를 함께 쓰는 이유

다음 두 코드를 비교해 봅시다.

```c
malloc(20)
```

```c
malloc(5 * sizeof(int))
```

정수 하나가 몇 바이트인지 숫자로 직접 외우기보다는 `sizeof(int)`를 사용하는 편이 좋습니다.

```c
int *p = malloc(count * sizeof(int));
```

이렇게 쓰면 필요한 정수 개수와 자료형이 코드에 그대로 보입니다.

또 다음처럼 포인터가 가리키는 자료형을 이용해 쓸 수도 있습니다.

```c
int *p = malloc(count * sizeof(*p));
```

처음에는 둘 중 더 읽기 쉬운 형태를 사용하면 됩니다.

---

## 12. 사용자에게 개수를 입력받아 동적 배열 만들기

이제 동적 할당이 필요한 진짜 예제를 만들어 봅시다.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int count;
    int *scores;

    printf("점수 개수: ");
    scanf("%d", &count);

    if (count <= 0)
    {
        printf("1 이상의 개수를 입력하세요.\n");
        return 1;
    }

    scores = malloc(count * sizeof(int));

    if (scores == NULL)
    {
        printf("메모리 할당 실패\n");
        return 1;
    }

    for (int i = 0; i < count; i++)
    {
        printf("%d번째 점수: ", i + 1);
        scanf("%d", &scores[i]);
    }

    printf("입력한 점수: ");

    for (int i = 0; i < count; i++)
    {
        printf("%d ", scores[i]);
    }

    printf("\n");

    free(scores);

    return 0;
}
```

이제 배열의 크기를 프로그램 작성자가 미리 정하지 않습니다.

사용자가 입력한 `count`에 따라 달라집니다.

---

## 13. 동적 메모리도 배열처럼 사용할 수 있습니다

이 부분을 보면:

```c
scores[i]
```

일반 배열과 똑같이 보입니다.

동적으로 확보한 연속 메모리도 포인터를 이용하면 배열처럼 접근할 수 있습니다.

```c
scores[0]
scores[1]
scores[2]
```

10주차에서 배운 관계도 그대로 성립합니다.

```c
scores[i]
```

와

```c
*(scores + i)
```

는 같은 원소를 가리킵니다.

---

## 14. 직접 실습 · 동적 배열의 합계와 평균

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int count;
    int *scores;
    int sum = 0;

    printf("학생 수: ");
    scanf("%d", &count);

    if (count <= 0)
    {
        return 1;
    }

    scores = malloc(count * sizeof(int));

    if (scores == NULL)
    {
        return 1;
    }

    for (int i = 0; i < count; i++)
    {
        scanf("%d", &scores[i]);
        sum += scores[i];
    }

    printf("합계: %d\n", sum);
    printf("평균: %.1f\n", (double)sum / count);

    free(scores);

    return 0;
}
```

### 수정해 보기

1. 최댓값도 구해 보세요.
2. 최솟값도 구해 보세요.
3. 60점 이상인 학생 수를 세어 보세요.

---

## 15. `free()`는 빌린 메모리를 돌려주는 함수입니다

이 문장이 매우 중요합니다.

```c
free(scores);
```

`malloc()`으로 빌린 메모리는 자동으로 우리가 원하는 순간에 반환되는 것이 아닙니다.

더 이상 필요하지 않을 때 `free()`로 반납해야 합니다.

```text
malloc() = 빌리기
free()   = 돌려주기
```

<div class="big-check">
<strong>동적 할당을 했으면 “어디에서 free할 것인가?”까지 같이 생각해야 합니다.</strong>
</div>

---

## 16. 메모리 누수란 무엇인가요?

다음 코드를 봅시다.

```c
int *p = malloc(100 * sizeof(int));
```

메모리를 빌렸습니다.

그런데 `free(p);` 없이 그 메모리를 더 이상 찾을 수 없게 되면, 프로그램이 그 공간을 계속 차지할 수 있습니다.

이런 문제를 <strong>메모리 누수(memory leak)</strong>라고 합니다.

쉽게 말하면:

```text
호텔 방을 빌림
→ 사용함
→ 체크아웃하지 않음
```

과 비슷합니다.

짧게 끝나는 프로그램에서는 눈에 잘 띄지 않을 수도 있지만, 오래 실행되는 프로그램에서는 큰 문제가 될 수 있습니다.

---

## 17. `free()`한 뒤에는 다시 사용하면 안 됩니다

다음 코드는 잘못된 사용입니다.

```c
int *p = malloc(sizeof(int));

*p = 10;
free(p);

printf("%d\n", *p);   // 잘못된 사용
```

`free(p);` 이후에는 그 메모리는 이미 반납되었습니다.

그런데 `p` 변수 안에는 예전 주소값이 남아 있을 수 있습니다.

이런 포인터를 <strong>댕글링 포인터(dangling pointer)</strong>라고 부릅니다.

![free 이후 포인터 상태](/images/week14/free-dangling.svg)

그래서 초보 단계에서는 다음 습관이 도움이 됩니다.

```c
free(p);
p = NULL;
```

---

## 18. `free(NULL)`은 괜찮습니다

C 표준에서:

```c
free(NULL);
```

은 아무 일도 하지 않습니다.

따라서 다음 패턴도 사용할 수 있습니다.

```c
free(p);
p = NULL;
```

그 후 실수로 다시 `free(p);`를 호출하더라도 `p`가 `NULL`이라면 그 호출 자체는 문제가 되지 않습니다.

하지만 가장 중요한 것은 <strong>소유한 메모리를 정확히 한 번 반납하는 구조</strong>를 만드는 것입니다.

---

## 19. `calloc()`은 0으로 초기화해서 빌립니다

`calloc()`도 동적 메모리를 확보합니다.

기본 형태:

```c
calloc(원소 개수, 원소 하나의 크기)
```

예:

```c
int *p = calloc(5, sizeof(int));
```

정수 5개 분량의 공간을 확보합니다.

그리고 확보한 메모리의 모든 비트를 0으로 초기화합니다.

![malloc과 calloc 비교](/images/week14/malloc-calloc.svg)

---

## 20. `malloc()`의 처음 값을 믿으면 안 됩니다

다음 코드는 좋지 않습니다.

```c
int *p = malloc(5 * sizeof(int));

printf("%d\n", p[0]);
```

`p[0]`에 우리가 값을 넣은 적이 없습니다.

`malloc()`으로 받은 메모리의 초기 내용은 정해져 있다고 생각하면 안 됩니다.

반드시 직접 값을 넣고 사용하세요.

```c
p[0] = 10;
```

또는 처음부터 0 상태가 필요하면 `calloc()`을 사용할 수 있습니다.

---

## 21. `calloc()` 예제

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int *numbers = calloc(5, sizeof(int));

    if (numbers == NULL)
    {
        return 1;
    }

    for (int i = 0; i < 5; i++)
    {
        printf("%d ", numbers[i]);
    }

    printf("\n");

    free(numbers);

    return 0;
}
```

일반적인 환경에서는 결과가 다음처럼 보입니다.

```text
0 0 0 0 0
```

---

## 22. `malloc()`과 `calloc()` 비교

| 함수 | 크기 지정 | 초기화 |
| --- | --- | --- |
| `malloc()` | 전체 바이트 수 | 초기 내용 보장 없음 |
| `calloc()` | 개수 × 한 원소 크기 | 모든 비트를 0으로 초기화 |

예:

```c
malloc(5 * sizeof(int));
```

```c
calloc(5, sizeof(int));
```

둘 다 정수 5개 분량의 메모리를 확보할 수 있습니다.

---

## 23. `realloc()`은 이미 빌린 공간의 크기를 바꿉니다

처음에는 정수 3개만 필요했는데 나중에 5개가 필요해졌다고 해 봅시다.

그럴 때 `realloc()`을 사용할 수 있습니다.

```c
realloc(기존 포인터, 새로운 바이트 수)
```

예:

```c
p = realloc(p, 5 * sizeof(int));
```

하지만 이 방법보다 더 안전한 패턴을 곧 보겠습니다.

![realloc으로 크기 변경](/images/week14/realloc.svg)

---

## 24. `realloc()`은 메모리를 다른 곳으로 옮길 수도 있습니다

기존 위치 바로 뒤에 충분한 빈 공간이 있으면 같은 자리에서 커질 수도 있습니다.

하지만 그렇지 않다면:

```text
새로운 더 큰 공간을 찾고
기존 내용을 옮긴 뒤
새 주소를 돌려줄 수도 있습니다.
```

그래서 `realloc()` 이후 주소가 이전과 반드시 같다고 생각하면 안 됩니다.

---

## 25. 위험한 `realloc()` 사용

다음 코드는 실패했을 때 문제가 생길 수 있습니다.

```c
p = realloc(p, newSize);
```

만약 `realloc()`이 실패하면 `NULL`을 돌려줄 수 있습니다.

그러면 `p`에 있던 원래 메모리 주소를 잃어버리게 됩니다.

원래 메모리는 여전히 할당된 상태인데, 그것을 찾을 방법이 없어질 수 있습니다.

이것은 메모리 누수로 이어질 수 있습니다.

---

## 26. 안전한 `realloc()` 패턴

임시 포인터를 사용합니다.

```c
int *temp = realloc(p, newCount * sizeof(int));

if (temp == NULL)
{
    printf("크기 변경 실패\n");
    free(p);
    return 1;
}

p = temp;
```

이렇게 하면 `realloc()`이 실패해도 기존 `p`의 주소를 바로 잃지 않습니다.

<div class="big-check">
<strong>realloc 결과는 임시 포인터로 먼저 확인한다.</strong>
</div>

---

## 27. `realloc()`로 배열 늘리기

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int *numbers = malloc(3 * sizeof(int));

    if (numbers == NULL)
    {
        return 1;
    }

    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;

    int *temp = realloc(numbers, 5 * sizeof(int));

    if (temp == NULL)
    {
        free(numbers);
        return 1;
    }

    numbers = temp;

    numbers[3] = 40;
    numbers[4] = 50;

    for (int i = 0; i < 5; i++)
    {
        printf("%d ", numbers[i]);
    }

    printf("\n");

    free(numbers);

    return 0;
}
```

실행 결과:

```text
10 20 30 40 50
```

---

## 28. 줄어든 크기 밖의 데이터는 사용할 수 없습니다

`realloc()`은 메모리를 크게 만들 수도 있고 작게 만들 수도 있습니다.

```c
p = realloc(p, 3 * sizeof(int));
```

예전에 10칸이었다고 해도 이제 3칸만 확보된 상태라면:

```c
p[3]
p[4]
```

같은 영역을 사용하면 안 됩니다.

동적 메모리도 <strong>현재 확보한 범위 안에서만</strong> 사용해야 합니다.

---

## 29. 동적 배열을 함수에 전달하기

동적 배열도 결국 포인터로 접근하므로 함수에 전달할 수 있습니다.

```c
#include <stdio.h>
#include <stdlib.h>

void printArray(const int *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }

    printf("\n");
}

int main(void)
{
    int *numbers = malloc(4 * sizeof(int));

    if (numbers == NULL)
    {
        return 1;
    }

    numbers[0] = 5;
    numbers[1] = 10;
    numbers[2] = 15;
    numbers[3] = 20;

    printArray(numbers, 4);

    free(numbers);

    return 0;
}
```

배열의 길이는 여전히 별도로 전달하는 것이 좋습니다.

---

## 30. 함수 안에서 동적 배열의 값을 바꾸기

```c
#include <stdio.h>
#include <stdlib.h>

void doubleValues(int *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] *= 2;
    }
}

int main(void)
{
    int *numbers = malloc(3 * sizeof(int));

    if (numbers == NULL)
    {
        return 1;
    }

    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;

    doubleValues(numbers, 3);

    printf("%d %d %d\n", numbers[0], numbers[1], numbers[2]);

    free(numbers);

    return 0;
}
```

실행 결과:

```text
20 40 60
```

---

## 31. 구조체 하나도 동적으로 만들 수 있습니다

12주차에서 배운 구조체와 연결해 봅시다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct
{
    char name[20];
    int age;
} Student;

int main(void)
{
    Student *student = malloc(sizeof(Student));

    if (student == NULL)
    {
        return 1;
    }

    strcpy(student->name, "민수");
    student->age = 20;

    printf("이름: %s\n", student->name);
    printf("나이: %d\n", student->age);

    free(student);

    return 0;
}
```

구조체 포인터이므로 멤버 접근에는 `->`를 사용합니다.

```c
student->name
student->age
```

---

## 32. 구조체 여러 개를 동적으로 만들기

학생 수를 실행 중에 입력받아 구조체 배열을 만들 수도 있습니다.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    int id;
    int score;
} Student;

int main(void)
{
    int count;

    printf("학생 수: ");
    scanf("%d", &count);

    if (count <= 0)
    {
        return 1;
    }

    Student *students = malloc(count * sizeof(Student));

    if (students == NULL)
    {
        return 1;
    }

    for (int i = 0; i < count; i++)
    {
        printf("학번과 점수: ");
        scanf("%d %d", &students[i].id, &students[i].score);
    }

    for (int i = 0; i < count; i++)
    {
        printf("%d번: %d점\n", students[i].id, students[i].score);
    }

    free(students);

    return 0;
}
```

이렇게 동적 할당은 배열, 포인터, 구조체가 모두 연결되는 부분입니다.

---

## 33. 함수가 메모리를 만들어서 돌려줄 수도 있습니다

다음처럼 함수를 만들 수 있습니다.

```c
#include <stdlib.h>

int *makeArray(int size)
{
    int *p = malloc(size * sizeof(int));
    return p;
}
```

사용하는 쪽에서는 반드시 실패 여부를 확인하고, 마지막에 반납해야 합니다.

```c
int *numbers = makeArray(10);

if (numbers == NULL)
{
    return 1;
}

/* 사용 */

free(numbers);
```

여기에서 중요한 것은 <strong>누가 free할 책임을 가지는가</strong>입니다.

이런 것을 메모리의 <strong>소유권</strong>이라는 관점으로 생각할 수 있습니다.

처음에는:

```text
메모리를 받은 쪽이 마지막에 free한다
```

라는 규칙을 명확히 정해 두는 것이 좋습니다.

---

## 34. 일부러 틀려 봅시다 · `free()`를 잊음

```c
void work(void)
{
    int *p = malloc(1000 * sizeof(int));

    if (p == NULL)
    {
        return;
    }

    p[0] = 10;
}
```

어떤 문제가 있을까요?

<details>
<summary>정답 보기</summary>

`malloc()`으로 메모리를 빌렸지만 `free(p);`가 없습니다.

함수가 끝난 뒤 지역 포인터 `p`는 사라지지만, 힙에서 빌린 메모리는 적절히 반납되지 않아 메모리 누수가 생길 수 있습니다.

```c
free(p);
```

를 사용이 끝난 위치에 넣어야 합니다.

</details>

---

## 35. 일부러 틀려 봅시다 · `free()` 후 사용

```c
int *p = malloc(sizeof(int));

*p = 50;
free(p);

*p = 100;
```

어떤 문제가 있을까요?

<details>
<summary>정답 보기</summary>

이미 반납한 메모리를 다시 사용하고 있습니다.

`free()` 이후 그 영역을 읽거나 쓰면 안 됩니다.

초보 단계에서는 다음처럼 정리하는 습관을 권합니다.

```c
free(p);
p = NULL;
```

</details>

---

## 36. 일부러 틀려 봅시다 · 두 번 `free()`

```c
int *p = malloc(sizeof(int));

free(p);
free(p);
```

같은 할당을 두 번 반납하려고 하는 잘못된 코드입니다.

<details>
<summary>정답 보기</summary>

동일한 메모리를 두 번 `free()`하면 프로그램의 동작이 정의되지 않습니다.

다음처럼 사용할 수 있습니다.

```c
free(p);
p = NULL;
```

그리고 이미 반납한 메모리를 다시 반납하지 않도록 프로그램 구조를 정리해야 합니다.

</details>

---

## 37. 일부러 틀려 봅시다 · 범위를 넘어감

```c
int *p = malloc(3 * sizeof(int));

p[0] = 10;
p[1] = 20;
p[2] = 30;
p[3] = 40;
```

`p[3]`은 네 번째 원소입니다.

하지만 확보한 공간은 3개뿐입니다.

<details>
<summary>정답 보기</summary>

사용 가능한 인덱스는 다음뿐입니다.

```text
0, 1, 2
```

동적 배열이라고 해서 범위를 넘어 사용해도 되는 것은 아닙니다.

</details>

---

## 38. 일부러 틀려 봅시다 · `malloc()` 실패 확인 안 함

```c
int *p = malloc(1000000 * sizeof(int));

p[0] = 10;
```

문제가 무엇일까요?

<details>
<summary>정답 보기</summary>

`malloc()`이 실패해 `NULL`을 돌려줄 가능성을 확인하지 않았습니다.

```c
if (p == NULL)
{
    return 1;
}
```

처럼 확인한 뒤 사용해야 합니다.

</details>

---

## 39. 일부러 틀려 봅시다 · `realloc()` 결과를 바로 덮어씀

```c
p = realloc(p, newSize);
```

문법 자체는 가능하지만 실패 처리까지 생각하면 위험할 수 있습니다.

<details>
<summary>더 안전한 코드 보기</summary>

```c
int *temp = realloc(p, newSize);

if (temp == NULL)
{
    /* 기존 p는 아직 유효 */
}
else
{
    p = temp;
}
```

실패했을 때 기존 주소를 잃지 않는 것이 핵심입니다.

</details>

---

## 40. 종합 실습 · 입력한 만큼 정수를 저장하기

아래 프로그램을 먼저 그대로 실행해 보세요.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int count;
    int *numbers;

    printf("정수 개수: ");
    scanf("%d", &count);

    if (count <= 0)
    {
        printf("잘못된 개수입니다.\n");
        return 1;
    }

    numbers = malloc(count * sizeof(int));

    if (numbers == NULL)
    {
        printf("메모리 할당 실패\n");
        return 1;
    }

    for (int i = 0; i < count; i++)
    {
        printf("정수 %d: ", i + 1);
        scanf("%d", &numbers[i]);
    }

    printf("역순 출력: ");

    for (int i = count - 1; i >= 0; i--)
    {
        printf("%d ", numbers[i]);
    }

    printf("\n");

    free(numbers);
    numbers = NULL;

    return 0;
}
```

### 수정 실습

다음 순서로 하나씩 바꿔 보세요.

```text
1. 정방향으로 출력하기
2. 합계 출력하기
3. 평균 출력하기
4. 가장 큰 수 출력하기
5. 짝수만 출력하기
```

---

## 41. 종합 실습 · 처음에는 3칸, 나중에는 더 늘리기

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int count = 3;
    int *numbers = malloc(count * sizeof(int));

    if (numbers == NULL)
    {
        return 1;
    }

    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;

    int newCount = 5;
    int *temp = realloc(numbers, newCount * sizeof(int));

    if (temp == NULL)
    {
        free(numbers);
        return 1;
    }

    numbers = temp;
    count = newCount;

    numbers[3] = 40;
    numbers[4] = 50;

    for (int i = 0; i < count; i++)
    {
        printf("%d ", numbers[i]);
    }

    printf("\n");

    free(numbers);

    return 0;
}
```

이 프로그램에서 가장 중요한 줄은 다음입니다.

```c
int *temp = realloc(numbers, newCount * sizeof(int));
```

실패할 수도 있으므로 임시 포인터를 사용합니다.

---

## 42. 오늘 배운 내용 확인하기

### 문제 1

`malloc()`을 사용하려면 어떤 헤더가 필요한가요?

1. `<stdio.h>`
2. `<stdlib.h>`
3. `<string.h>`
4. `<math.h>`

<details>
<summary>정답 보기</summary>

정답은 <strong>2번 `<stdlib.h>`</strong>입니다.

</details>

### 문제 2

다음 코드는 정수 몇 개 분량의 메모리를 요청하나요?

```c
malloc(10 * sizeof(int));
```

<details>
<summary>정답 보기</summary>

정수 <strong>10개</strong> 분량입니다.

</details>

### 문제 3

`malloc()`이 실패했을 때 돌려주는 값은 무엇인가요?

<details>
<summary>정답 보기</summary>

`NULL`입니다.

</details>

### 문제 4

동적으로 빌린 메모리를 반납하는 함수는 무엇인가요?

<details>
<summary>정답 보기</summary>

```c
free()
```

입니다.

</details>

### 문제 5

`malloc()`과 `calloc()`의 대표적인 차이는 무엇인가요?

<details>
<summary>정답 보기</summary>

`malloc()`은 공간을 확보하지만 초기 내용을 보장하지 않습니다.

`calloc()`은 공간을 확보하면서 모든 비트를 0으로 초기화합니다.

</details>

### 문제 6

다음 코드에서 잘못된 부분은 무엇인가요?

```c
int *p = malloc(sizeof(int));
free(p);
printf("%d\n", *p);
```

<details>
<summary>정답 보기</summary>

`free(p);` 이후 이미 반납한 메모리를 `*p`로 읽으려고 하고 있습니다.

</details>

### 문제 7

`realloc()`을 더 안전하게 사용하기 위해 왜 임시 포인터를 사용하나요?

<details>
<summary>정답 보기</summary>

`realloc()`이 실패해서 `NULL`을 반환했을 때 기존 메모리 주소를 잃지 않기 위해서입니다.

</details>

---

## 43. 이번 주 핵심 요약

<div class="big-check">
<strong>동적 메모리 핵심 네 단계</strong><br><br>
필요한 크기를 계산한다<br>
↓<br>
<code>malloc()</code> 또는 <code>calloc()</code>으로 빌린다<br>
↓<br>
포인터로 사용한다<br>
↓<br>
<code>free()</code>로 반납한다
</div>

그리고 다음 네 함수를 구분하세요.

| 함수 | 역할 |
| --- | --- |
| `malloc()` | 필요한 바이트만큼 메모리 확보 |
| `calloc()` | 메모리 확보 + 0으로 초기화 |
| `realloc()` | 이미 확보한 메모리 크기 변경 |
| `free()` | 확보한 메모리 반납 |

가장 중요한 습관은 다음입니다.

```c
int *p = malloc(count * sizeof(int));

if (p == NULL)
{
    return 1;
}

/* 사용 */

free(p);
p = NULL;
```

---

## 44. 다음 시간 예고

다음 15주차에서는 <strong>C++ 언어의 개요</strong>를 배웁니다.

C언어와 비슷해 보이지만 다음과 같은 새로운 표현이 등장합니다.

```text
cout / cin
namespace
참조(reference)
클래스(class)의 아주 기본적인 개념
```

이번 14주차까지 배우면 C언어의 주요 기초 주제를 한 바퀴 모두 경험한 것입니다.
