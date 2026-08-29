# 12주차 · 구조체와 공용체(2)

지난 시간에는 서로 다른 종류의 값을 하나로 묶는 <strong>구조체(struct)</strong>를 배웠습니다.

이번 시간에는 구조체를 포인터와 연결하고, 비슷하게 생겼지만 메모리를 전혀 다르게 사용하는 <strong>공용체(union)</strong>를 배웁니다.

9주차와 10주차의 포인터가 다시 등장하지만 새로운 포인터 문법을 배우는 것은 아닙니다.

이미 배운 포인터를 구조체에 적용하는 것입니다.

<div class="big-check">
<strong>구조체 변수의 멤버는 점(.)으로 접근합니다.</strong><br><br>
<strong>구조체를 가리키는 포인터의 멤버는 화살표(-&gt;)로 접근합니다.</strong>
</div>

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 구조체 변수와 구조체 포인터의 차이
2. `.`과 `->`를 언제 사용하는지
3. 구조체의 주소를 함수에 전달하면 원본을 수정할 수 있다는 것
4. `typedef`로 구조체 이름을 간단하게 쓰는 방법
5. 공용체가 여러 멤버와 하나의 메모리 공간을 공유한다는 것
6. 구조체와 공용체의 가장 중요한 차이
7. 열거형 `enum`의 기본적인 쓰임
:::

---

## 1. 지난 시간의 구조체를 다시 봅시다

학생 한 명의 정보를 구조체로 묶었습니다.

```c
struct Student
{
    char name[20];
    int age;
    double score;
};
```

그리고 구조체 변수를 만들었습니다.

```c
struct Student s1 = {"민수", 20, 91.5};
```

멤버에 접근할 때는 점을 사용했습니다.

```c
printf("%s\n", s1.name);
printf("%d\n", s1.age);
printf("%.1f\n", s1.score);
```

이 코드에서 `s1`은 <strong>구조체 변수 그 자체</strong>입니다.

---

## 2. 구조체도 메모리에 저장됩니다

일반 변수와 마찬가지로 구조체 변수도 메모리에 놓입니다.

```c
struct Student s1;
```

`s1` 안에는 여러 멤버가 함께 들어 있습니다.

```text
s1
├─ name
├─ age
└─ score
```

그렇다면 구조체의 주소도 구할 수 있을까요?

물론입니다.

```c
&s1
```

일반 변수의 주소를 `&a`로 구했던 것과 같습니다.

---

## 3. 구조체를 가리키는 포인터 만들기

구조체 포인터는 다음처럼 선언합니다.

```c
struct Student *p;
```

그리고 구조체 변수 `s1`의 주소를 저장합니다.

```c
p = &s1;
```

한 줄로 쓸 수도 있습니다.

```c
struct Student *p = &s1;
```

![구조체 포인터가 구조체 변수를 가리키는 모습](/images/week12/struct-pointer.svg)

아주 쉽게 읽으면 다음과 같습니다.

```text
p는 s1의 위치를 기억한다.
```

---

## 4. 구조체 변수에는 `.`을 사용합니다

구조체 변수가 직접 있을 때는 점을 사용합니다.

```c
s1.age
s1.score
```

예제:

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
};

int main(void)
{
    struct Student s1 = {"민수", 20};

    printf("이름: %s\n", s1.name);
    printf("나이: %d\n", s1.age);

    return 0;
}
```

---

## 5. 구조체 포인터에는 `->`를 사용합니다

이번에는 포인터 `p`가 `s1`을 가리킵니다.

```c
struct Student *p = &s1;
```

포인터를 통해 `age` 멤버에 접근하려면 다음처럼 씁니다.

```c
p->age
```

`->`는 보통 <strong>화살표 연산자</strong>라고 부릅니다.

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
};

int main(void)
{
    struct Student s1 = {"민수", 20};
    struct Student *p = &s1;

    printf("이름: %s\n", p->name);
    printf("나이: %d\n", p->age);

    return 0;
}
```

실행 결과:

```text
이름: 민수
나이: 20
```

---

## 6. `.`과 `->`를 한눈에 비교합시다

![점 연산자와 화살표 연산자 비교](/images/week12/dot-arrow.svg)

가장 중요한 규칙은 이것입니다.

| 가지고 있는 것 | 멤버 접근 | 예 |
| --- | --- | --- |
| 구조체 변수 | `.` | `s1.age` |
| 구조체 포인터 | `->` | `p->age` |

<div class="big-check">
<strong>변수면 점(.)</strong><br><br>
<strong>포인터면 화살표(-&gt;)</strong>
</div>

처음에는 이 문장만 기억해도 충분합니다.

---

## 7. `p->age`의 실제 뜻

화살표 연산자는 완전히 새로운 기능은 아닙니다.

다음 두 표현은 같은 뜻입니다.

```c
p->age
```

```c
(*p).age
```

순서대로 읽어 보면:

```text
p        → 구조체의 주소
*p       → p가 가리키는 구조체 자체
(*p).age → 그 구조체의 age 멤버
```

이 표현이 자주 필요하기 때문에 C언어가 더 간단한 형태를 제공합니다.

```c
p->age
```

::: info 지금은 `p->age`를 사용하세요
`(*p).age`의 원리를 이해하는 것은 좋지만 실제 코드는 `p->age`가 훨씬 읽기 쉽습니다.
:::

---

## 8. 괄호가 중요한 이유

다음 코드는 올바른 표현입니다.

```c
(*p).age
```

그런데 이렇게 쓰면 뜻이 달라집니다.

```c
*p.age
```

점 연산자가 `*`보다 먼저 처리되므로 원하는 의미가 아닙니다.

따라서 포인터를 직접 역참조해서 멤버에 접근하려면 반드시 괄호가 필요합니다.

```c
(*p).age
```

하지만 더 간단하게:

```c
p->age
```

를 사용하면 됩니다.

---

## 9. 포인터를 통해 구조체 값을 바꿀 수 있습니다

```c
#include <stdio.h>

struct Student
{
    int age;
    double score;
};

int main(void)
{
    struct Student s1 = {20, 80.0};
    struct Student *p = &s1;

    p->age = 21;
    p->score = 95.5;

    printf("나이: %d\n", s1.age);
    printf("점수: %.1f\n", s1.score);

    return 0;
}
```

실행 결과:

```text
나이: 21
점수: 95.5
```

`p`가 `s1`의 실제 위치를 가리키고 있으므로 원본 `s1`이 변경됩니다.

---

## 10. 7주차의 값 복사와 다시 연결해 봅시다

7주차에서 일반 변수를 함수에 보내면 값이 복사된다고 배웠습니다.

```c
void change(int n)
{
    n = 100;
}
```

이 함수 안에서 `n`을 바꿔도 원래 변수는 바뀌지 않습니다.

하지만 <strong>주소를 전달하면</strong> 이야기가 달라집니다.

주소의 값 자체는 복사되어 전달되지만, 복사된 주소도 같은 원본을 가리킵니다.

그래서 포인터를 통해 원본을 수정할 수 있습니다.

---

## 11. 구조체를 함수에 값으로 전달하기

먼저 구조체 자체를 함수에 전달해 봅시다.

```c
#include <stdio.h>

struct Student
{
    int age;
};

void changeAge(struct Student student)
{
    student.age = 99;
}

int main(void)
{
    struct Student s1 = {20};

    changeAge(s1);

    printf("%d\n", s1.age);

    return 0;
}
```

실행 결과:

```text
20
```

함수의 `student`는 `s1`의 <strong>복사본</strong>이기 때문입니다.

---

## 12. 구조체의 주소를 함수에 전달하기

이번에는 구조체의 주소를 보냅니다.

```c
#include <stdio.h>

struct Student
{
    int age;
};

void changeAge(struct Student *student)
{
    student->age = 99;
}

int main(void)
{
    struct Student s1 = {20};

    changeAge(&s1);

    printf("%d\n", s1.age);

    return 0;
}
```

실행 결과:

```text
99
```

이제 원본이 바뀌었습니다.

호출할 때:

```c
changeAge(&s1);
```

함수에서 받을 때:

```c
void changeAge(struct Student *student)
```

멤버에 접근할 때:

```c
student->age
```

이 세 부분을 한 묶음으로 기억하세요.

---

## 13. 실습 · 구조체 포인터로 점수 올리기

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int score;
};

void addScore(struct Student *student, int value)
{
    student->score = student->score + value;
}

int main(void)
{
    struct Student s1 = {"영희", 70};

    addScore(&s1, 10);

    printf("%s: %d점\n", s1.name, s1.score);

    return 0;
}
```

실행 결과:

```text
영희: 80점
```

### 직접 바꿔 보기

1. 처음 점수를 `70`에서 `85`로 바꿉니다.
2. 더할 점수를 `10`에서 `5`로 바꿉니다.
3. `addScore(&s1, -10);`도 실행해 봅니다.

---

## 14. 구조체 배열과 포인터도 함께 사용할 수 있습니다

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int score;
};

int main(void)
{
    struct Student students[3] = {
        {"민수", 80},
        {"영희", 95},
        {"철수", 70}
    };

    struct Student *p = students;

    printf("%s %d\n", p->name, p->score);

    p++;

    printf("%s %d\n", p->name, p->score);

    return 0;
}
```

실행 결과:

```text
민수 80
영희 95
```

구조체 배열도 메모리에 연속해서 놓이므로 포인터를 다음 구조체 원소로 이동할 수 있습니다.

---

## 15. `typedef`를 다시 살펴봅시다

지난 시간에 `typedef`를 아주 잠깐 보았습니다.

구조체를 사용할 때 다음 문장은 조금 깁니다.

```c
struct Student s1;
struct Student s2;
struct Student s3;
```

`typedef`를 사용하면 짧게 만들 수 있습니다.

```c
typedef struct Student Student;
```

이제 이렇게 사용할 수 있습니다.

```c
Student s1;
Student s2;
Student s3;
```

![typedef로 구조체 이름을 짧게 만드는 모습](/images/week12/typedef-struct.svg)

`typedef`는 새로운 구조를 만드는 것이 아닙니다.

<strong>기존 자료형에 편한 이름을 하나 더 붙이는 것</strong>입니다.

---

## 16. 구조체 정의와 typedef를 한 번에 쓰기

실제로는 다음 형태도 많이 사용합니다.

```c
typedef struct
{
    char name[20];
    int age;
} Student;
```

이제 바로 다음처럼 선언합니다.

```c
Student s1;
```

전체 예제를 봅시다.

```c
#include <stdio.h>

typedef struct
{
    char name[20];
    int age;
} Student;

int main(void)
{
    Student s1 = {"민수", 20};

    printf("%s %d\n", s1.name, s1.age);

    return 0;
}
```

처음에는 어느 방식이든 한 가지를 골라 일관되게 사용하는 것이 좋습니다.

---

## 17. 이제 공용체를 배워 봅시다

공용체는 영어로 <strong>union</strong>이라고 합니다.

모양은 구조체와 매우 비슷합니다.

```c
union Data
{
    int number;
    double weight;
    char grade;
};
```

구조체와 비슷하게 여러 멤버를 적습니다.

그런데 메모리를 사용하는 방법은 완전히 다릅니다.

---

## 18. 구조체는 각 멤버가 자기 공간을 가집니다

구조체를 생각해 봅시다.

```c
struct Data
{
    int number;
    double weight;
    char grade;
};
```

개념적으로는 다음과 같습니다.

```text
number를 위한 공간
weight를 위한 공간
grade를 위한 공간
```

따라서 다음 세 값을 동시에 보관할 수 있습니다.

```c
data.number = 10;
data.weight = 3.5;
data.grade = 'A';
```

각 멤버가 자기 공간을 사용하기 때문입니다.

---

## 19. 공용체는 같은 공간을 같이 사용합니다

공용체에서는 멤버들이 <strong>하나의 메모리 공간을 공유</strong>합니다.

![구조체와 공용체의 메모리 차이](/images/week12/struct-vs-union.svg)

쉽게 비유하면:

```text
구조체 = 사람마다 자기 방이 있음
공용체 = 여러 사람이 하나의 방을 번갈아 사용
```

이 차이가 이번 주에서 가장 중요합니다.

<div class="big-check">
<strong>struct: 멤버마다 별도 공간</strong><br><br>
<strong>union: 모든 멤버가 같은 공간을 공유</strong>
</div>

---

## 20. 공용체 변수를 만들어 봅시다

```c
#include <stdio.h>

union Data
{
    int number;
    double weight;
    char grade;
};

int main(void)
{
    union Data data;

    data.number = 10;

    printf("number: %d\n", data.number);

    return 0;
}
```

실행 결과:

```text
number: 10
```

여기까지만 보면 구조체와 거의 같아 보입니다.

차이는 다른 멤버에 새 값을 저장할 때 나타납니다.

---

## 21. 공용체의 다른 멤버에 값을 저장해 봅시다

```c
#include <stdio.h>

union Data
{
    int number;
    double weight;
};

int main(void)
{
    union Data data;

    data.number = 10;
    printf("number: %d\n", data.number);

    data.weight = 3.5;
    printf("weight: %.1f\n", data.weight);

    return 0;
}
```

`number`와 `weight`가 같은 메모리를 사용합니다.

따라서 `weight`를 저장한 뒤에는 그 공간의 내용이 `weight`를 위한 비트 모습으로 바뀝니다.

![공용체에서 같은 메모리 공간이 새 값으로 바뀌는 모습](/images/week12/union-overwrite.svg)

::: warning 이전 멤버 값을 그대로 기대하면 안 됩니다
`data.weight = 3.5;`를 저장한 뒤 `data.number`를 원래의 10이라고 생각해서 사용하면 안 됩니다.

같은 메모리를 다른 방식으로 해석하게 되기 때문입니다.
:::

---

## 22. 공용체는 왜 사용할까요?

처음 배우면 이렇게 생각할 수 있습니다.

> “하나만 제대로 저장할 수 있다면 왜 쓰지?”

공용체는 <strong>한 순간에 여러 종류 중 하나만 필요할 때</strong> 유용할 수 있습니다.

예를 들어 어떤 데이터가 상황에 따라 다음 중 하나만 가진다고 생각해 봅시다.

```text
정수 값
실수 값
문자 값
```

세 종류를 항상 동시에 보관할 필요가 없다면 같은 메모리를 공유할 수 있습니다.

다만 어떤 종류의 값이 현재 저장되어 있는지 프로그램이 별도로 알아야 합니다.

---

## 23. 구조체와 공용체를 함께 사용하는 방법

실제로는 구조체 안에 “현재 어떤 값인가?”라는 표시와 공용체를 함께 두기도 합니다.

```c
enum ValueType
{
    TYPE_INT,
    TYPE_DOUBLE
};

union Value
{
    int intValue;
    double doubleValue;
};

struct Data
{
    enum ValueType type;
    union Value value;
};
```

이 구조에서 `type`을 보면 현재 공용체에 어떤 종류의 값이 들어 있는지 알 수 있습니다.

지금 당장 이 코드를 외울 필요는 없습니다.

<strong>공용체를 안전하게 쓰려면 현재 저장된 값의 종류를 함께 관리하는 경우가 많다</strong>는 것만 기억하세요.

---

## 24. `sizeof`로 크기 차이를 확인해 봅시다

다음 코드를 실행해 봅시다.

```c
#include <stdio.h>

struct StructData
{
    int number;
    double weight;
    char grade;
};

union UnionData
{
    int number;
    double weight;
    char grade;
};

int main(void)
{
    printf("struct 크기: %zu\n", sizeof(struct StructData));
    printf("union 크기: %zu\n", sizeof(union UnionData));

    return 0;
}
```

정확한 크기는 컴파일러와 환경에 따라 달라질 수 있습니다.

하지만 일반적으로:

```text
구조체 → 여러 멤버를 담을 공간이 필요
공용체 → 가장 큰 멤버가 들어갈 정도의 공유 공간이 필요
```

라고 이해하면 됩니다.

::: info 공용체 크기가 단순히 “가장 큰 멤버와 언제나 완전히 동일”하다고 외울 필요는 없습니다
정렬(alignment) 같은 규칙이 영향을 줄 수 있습니다.

이번 주에는 <strong>멤버가 같은 공간을 공유한다</strong>는 개념이 핵심입니다.
:::

---

## 25. 구조체와 공용체 비교표

| 구분 | 구조체 `struct` | 공용체 `union` |
| --- | --- | --- |
| 멤버 | 여러 개 | 여러 개 |
| 메모리 | 멤버별 공간 | 같은 공간 공유 |
| 여러 값 동시 보관 | 가능 | 독립적으로 동시 보관하는 용도 아님 |
| 멤버 접근 | `.` 또는 `->` | `.` 또는 `->` |
| 주요 목적 | 관련 데이터 묶기 | 여러 형태 중 하나의 데이터 표현 |

공용체도 변수 자체를 사용하면 점을 씁니다.

```c
data.number
```

공용체 포인터라면 화살표를 사용할 수 있습니다.

```c
p->number
```

---

## 26. 공용체 포인터도 구조체 포인터와 같습니다

```c
#include <stdio.h>

union Data
{
    int number;
    double weight;
};

int main(void)
{
    union Data data;
    union Data *p = &data;

    p->number = 100;

    printf("%d\n", data.number);

    return 0;
}
```

실행 결과:

```text
100
```

즉 `->`는 구조체 전용이라고 생각하기보다 <strong>구조체나 공용체를 가리키는 포인터로 멤버에 접근할 때</strong> 사용한다고 이해하면 좋습니다.

---

## 27. 열거형 `enum`도 알아봅시다

`enum`은 여러 개의 정수 상태에 의미 있는 이름을 붙일 때 사용합니다.

```c
enum Status
{
    READY,
    RUNNING,
    DONE
};
```

기본적으로 첫 값부터 정수 값이 차례로 대응됩니다.

```text
READY   → 0
RUNNING → 1
DONE    → 2
```

![enum으로 숫자 상태에 이름을 붙이는 모습](/images/week12/enum-flow.svg)

숫자 `2`라고만 쓰는 것보다 `DONE`이라고 쓰면 뜻을 이해하기 쉽습니다.

---

## 28. enum을 직접 사용해 봅시다

```c
#include <stdio.h>

enum Status
{
    READY,
    RUNNING,
    DONE
};

int main(void)
{
    enum Status status = RUNNING;

    if (status == RUNNING)
    {
        printf("현재 실행 중입니다.\n");
    }

    return 0;
}
```

실행 결과:

```text
현재 실행 중입니다.
```

`enum`도 결국 정수 계열 값이지만 코드의 뜻을 훨씬 읽기 쉽게 만들어 줍니다.

---

## 29. enum의 시작 숫자를 직접 정할 수도 있습니다

```c
enum Menu
{
    START = 1,
    LOAD = 2,
    EXIT = 3
};
```

또는 첫 값만 정해도 다음 값이 증가합니다.

```c
enum Menu
{
    START = 1,
    LOAD,
    EXIT
};
```

이 경우:

```text
START = 1
LOAD  = 2
EXIT  = 3
```

이 됩니다.

---

## 30. 구조체 안에 enum을 넣어 보기

```c
#include <stdio.h>

enum Status
{
    READY,
    RUNNING,
    DONE
};

typedef struct
{
    char name[20];
    enum Status status;
} Task;

int main(void)
{
    Task task = {"C언어 공부", RUNNING};

    printf("할 일: %s\n", task.name);

    if (task.status == RUNNING)
    {
        printf("상태: 진행 중\n");
    }

    return 0;
}
```

서로 배운 기능을 조합한 예제입니다.

```text
struct  → 여러 정보를 하나로 묶기
typedef → 자료형 이름을 편하게 만들기
enum    → 상태에 읽기 좋은 이름 붙이기
```

---

## 31. 실습 · 상품 정보를 포인터로 수정하기

```c
#include <stdio.h>

typedef struct
{
    char name[20];
    int price;
} Product;

void discount(Product *product, int amount)
{
    product->price = product->price - amount;
}

int main(void)
{
    Product item = {"키보드", 50000};

    discount(&item, 5000);

    printf("%s: %d원\n", item.name, item.price);

    return 0;
}
```

실행 결과:

```text
키보드: 45000원
```

### 직접 바꿔 보기

- 상품 이름을 바꿔 봅니다.
- 가격을 `80000`으로 바꿔 봅니다.
- 할인 금액을 `10000`으로 바꿔 봅니다.

---

## 32. 실습 · 공용체의 공유 공간 확인하기

```c
#include <stdio.h>

union Data
{
    int number;
    double real;
};

int main(void)
{
    union Data data;

    data.number = 100;
    printf("정수로 저장: %d\n", data.number);

    data.real = 7.5;
    printf("실수로 저장: %.1f\n", data.real);

    return 0;
}
```

여기서 중요한 것은 두 값을 동시에 따로 보관한 것이 아니라는 점입니다.

같은 공간을 차례대로 사용했습니다.

---

## 33. 일부러 틀려 봅시다 · 점과 화살표 혼동

다음 코드에는 문제가 있습니다.

```c
struct Student s1;
struct Student *p = &s1;

p.age = 20;
```

왜 잘못되었을까요?

<details>
<summary>정답 보기</summary>

`p`는 구조체 변수가 아니라 구조체를 가리키는 <strong>포인터</strong>입니다.

따라서 화살표를 사용합니다.

```c
p->age = 20;
```

</details>

---

## 34. 일부러 틀려 봅시다 · 구조체 변수에 화살표 사용

```c
struct Student s1;

s1->age = 20;
```

<details>
<summary>정답 보기</summary>

`s1`은 포인터가 아니라 구조체 변수입니다.

점 연산자를 사용해야 합니다.

```c
s1.age = 20;
```

</details>

---

## 35. 일부러 틀려 봅시다 · 공용체 값을 동시에 보관한다고 생각하기

```c
union Data data;

data.number = 10;
data.weight = 3.5;
```

이후에 `data.number`도 여전히 독립적으로 10을 보관한다고 생각하면 안 됩니다.

<details>
<summary>왜 그런가요?</summary>

`number`와 `weight`가 같은 메모리 공간을 공유하기 때문입니다.

`weight`에 새 값을 저장하면 같은 공간의 비트 내용이 바뀝니다.

</details>

---

## 36. 확인 문제 1 · 점과 화살표

다음 코드에서 빈칸에 들어갈 것은 무엇인가요?

```c
Student *p = &student;

printf("%d\n", p___age);
```

1. `.`
2. `->`
3. `&`
4. `*`

<details>
<summary>정답 보기</summary>

정답은 <strong>2번 `->`</strong>입니다.

`p`가 구조체 포인터이기 때문입니다.

</details>

---

## 37. 확인 문제 2 · 구조체와 공용체

다음 중 올바른 설명은 무엇인가요?

1. 구조체의 모든 멤버는 같은 메모리를 공유한다.
2. 공용체의 멤버는 각각 완전히 독립된 공간을 가진다.
3. 구조체는 멤버마다 공간을 가지고, 공용체는 멤버들이 같은 공간을 공유한다.
4. 구조체와 공용체는 메모리 사용 방법이 완전히 같다.

<details>
<summary>정답 보기</summary>

정답은 <strong>3번</strong>입니다.

</details>

---

## 38. 확인 문제 3 · 함수에 구조체 주소 전달

다음 프로그램의 출력값은 무엇인가요?

```c
typedef struct
{
    int age;
} Student;

void change(Student *p)
{
    p->age = 30;
}

int main(void)
{
    Student s = {20};
    change(&s);
    printf("%d\n", s.age);
}
```

<details>
<summary>정답 보기</summary>

정답은 <strong>30</strong>입니다.

함수에 `s`의 주소를 전달했으므로 함수가 원본 구조체를 수정할 수 있습니다.

</details>

---

## 39. 확인 문제 4 · enum

```c
enum Status
{
    READY,
    RUNNING,
    DONE
};
```

기본값을 따로 지정하지 않았다면 `DONE`은 몇인가요?

<details>
<summary>정답 보기</summary>

정답은 <strong>2</strong>입니다.

첫 항목 `READY`가 0에서 시작하고 하나씩 증가합니다.

</details>

---

## 40. 이번 주 핵심 요약

<div class="big-check">
<strong>구조체 변수 → 점(.)</strong><br><br>
<strong>구조체 포인터 → 화살표(-&gt;)</strong><br><br>
<strong>struct → 멤버별 별도 공간</strong><br><br>
<strong>union → 멤버들이 같은 공간 공유</strong>
</div>

그리고 다음 관계도 기억하세요.

```c
p->age
```

와

```c
(*p).age
```

는 같은 뜻입니다.

`typedef`는 자료형 이름을 편하게 만들고, `enum`은 숫자 상태에 의미 있는 이름을 붙이는 데 도움을 줍니다.

---

## 41. 다음 시간 예고

다음 13주차에서는 <strong>파일 처리 함수</strong>를 배웁니다.

프로그램이 종료되어도 데이터를 남기려면 메모리만으로는 부족합니다.

다음과 같은 내용을 배우게 됩니다.

```text
파일 열기
파일에 쓰기
파일에서 읽기
파일 닫기
```

화면과 키보드에서만 데이터를 주고받던 프로그램이 이제 실제 파일과 데이터를 주고받게 됩니다.
